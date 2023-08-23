import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';


function useFetchAllDataWithSnapshot() {
    const [data, setData] = useState({ drink: [], food: [] });

    useEffect(() => {
        let categoryUnsubscribe = () => {};
        let drinkUnsubscribe = () => {};
        let foodUnsubscribe = () => {};

        const fetchData = async () => {
            drinkUnsubscribe = await fetchCategoryData('drink');
            foodUnsubscribe = await fetchCategoryData('food');
        };

        const fetchCategoryData = async (mainCategory) => {
            const categoriesPath = `menu/${mainCategory}/categories`;
            const categoriesQuery = query(collection(db, categoriesPath), orderBy('orderTimestamp', 'asc'));

            categoryUnsubscribe = onSnapshot(categoriesQuery, (categoriesSnapshot) => {
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

            return categoryUnsubscribe;
        };

        fetchData();

        return () => {
            // Unsubscribe from listeners when the component unmounts or auth state changes
            categoryUnsubscribe();
            drinkUnsubscribe();
            foodUnsubscribe();
        };
    }, []);

    return data;
}

export default useFetchAllDataWithSnapshot;
