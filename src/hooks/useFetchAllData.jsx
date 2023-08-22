import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

function useFetchAllData() {
    const [allData, setAllData] = useState({});
    

    useEffect(() => {
        fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchAll = async () => {
        let fetchedData = null;

        const cachedData = localStorage.getItem("allData");

        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            fetchedData = await fetchLocalStorage(parsedData);
        }

        if (!fetchedData) {
            const drinkData = await fetchData("drink");
            const foodData = await fetchData("food");

            fetchedData = {
                drink: drinkData,
                food: foodData,
            };
            addToLocalStorage(fetchedData);
        }
        setAllData(fetchedData);
    };

    const fetchData = async (mainCategory) => {
        try {
            const menuPath = `menu/${mainCategory}/categories`;
            const menuQuery = query(collection(db, menuPath), orderBy("orderTimestamp", "asc"))
            const menuSnapshot = await getDocs(menuQuery)

            const categories = []

            const categoryPromises = menuSnapshot.docs.map(async (doc) => {
                const categoryData = doc.data();

                const itemsPath = `menu/${mainCategory}/categories/${doc.id}/items`;
                const itemsQuery = query(collection(db, itemsPath), orderBy("orderTimestamp", "asc"))
                const itemsSnapshot = await getDocs(itemsQuery)

                const items = itemsSnapshot.docs.map((itemDoc) => itemDoc.data());
                categoryData.items = items;

                return categoryData
            })

            const categoryData = await Promise.all(categoryPromises);
            categories.push(...categoryData);

            return categories
        }
        catch (error) {
            console.log("Firestore fetch failed", error)
        }
    }

    const fetchLocalStorage = async (parsedData) => {
        const lastEditedPath = "/menu/additional";
        const lastEditedQuery = doc(db, lastEditedPath);
        const lastEditedSnapshot = await getDoc(lastEditedQuery);
        const lastEdited = lastEditedSnapshot.data().lastedited;

        if (lastEdited < parsedData.timestamp) {
            return parsedData.data;
        }
        return null;
    }

    const addToLocalStorage = (data) => {
        const dataToCache = {
            data,
            timestamp: Date.now(),
        };
        localStorage.setItem('allData', JSON.stringify(dataToCache));
    };

    return allData;
}

export default useFetchAllData;
