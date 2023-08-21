import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

function useFetchAllDataWithSnapshot() {
    const [data, setData] = useState({ drink: [], food: [] });

    useEffect(() => {
        const fetchData = async () => {
            const fetchCategoryData = async (mainCategory) => {
                const categoriesPath = `menu/${mainCategory}/categories`;
                const categoriesQuery = query(collection(db, categoriesPath), orderBy('orderTimestamp', 'asc'));

                const unsubscribe = onSnapshot(categoriesQuery, (categoriesSnapshot) => {
                    const categoryData = [];

                    categoriesSnapshot.forEach((categoryDoc) => {
                        const category = categoryDoc.data();
                        category.id = categoryDoc.id;

                        const itemsPath = `menu/${mainCategory}/categories/${category.id}/items`;
                        const itemsQuery = query(collection(db, itemsPath), orderBy('orderTimestamp', 'asc'));

                        onSnapshot(itemsQuery, (itemsSnapshot) => {
                            const items = [];
                            itemsSnapshot.forEach((itemDoc) => {
                                items.push(itemDoc.data());
                            });

                            category.items = items;

                            setData((prevData) => ({
                                ...prevData,
                                [mainCategory]: [...categoryData],
                            }));
                        });

                        categoryData.push(category);
                    });
                });

                return unsubscribe;
            };

            const drinkUnsubscribe = await fetchCategoryData('drink');
            const foodUnsubscribe = await fetchCategoryData('food');

            return () => {
                drinkUnsubscribe();
                foodUnsubscribe();
            };
        };

        fetchData();
    }, []);

    return data;
}

export default useFetchAllDataWithSnapshot;
