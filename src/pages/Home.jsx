import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase/config'
import CategoryTabs from '../components/CategoryTabs'


function Home() {
    const [homeMenuData, setHomeMenuData] = useState()

    //  Fetching data from Firestore or LocalStorage, depending on the last edited timestamp. Fetched data is stored in homeMenuData state.
    useEffect(() => {

        //  Fetching data from Firestore if no Local Storage is available, after the fetch save the current data to Local Storage for later use.
        const fetchData = async (mainCategory) => {
            try {
                //  Categories path, query and snapshot.
                const menuPath = `menu/${mainCategory}/categories`;
                const menuQuery = query(collection(db, menuPath), orderBy("dateCreated", "asc"))
                const menuSnapshot = await getDocs(menuQuery)

                const categories = []

                const categoryPromises = menuSnapshot.docs.map(async (doc) => {
                    const categoryData = doc.data();

                    //  Category Items path, query and snapshot
                    const itemsPath = `menu/${mainCategory}/categories/${doc.id}/items`;
                    const itemsQuery = query(collection(db, itemsPath), orderBy("orderTimestamp", "asc"))
                    const itemsSnapshot = await getDocs(itemsQuery)

                    //  Fetching category's respective items and settings it as categoryData's items.
                    const items = itemsSnapshot.docs.map((itemDoc) => itemDoc.data());
                    categoryData.items = items;

                    return categoryData
                })

                //  Pushing all fetched data to categories object
                const categoryData = await Promise.all(categoryPromises);
                categories.push(...categoryData);

                console.log("fetched from firestore")
                return categories
                
            }
            catch (error) {
                console.log(error)
            }
        }

        //  Fetching all data either from Firebase or Local Storage
        const fetchAllData = async () => {
            let allData = null;

            //  Fetching data from Local Storage.
            const cachedData = localStorage.getItem("homeMenuData");

            if (cachedData) {
                const parsedData = JSON.parse(cachedData);

                //  Fetching last edited timestamp to handle data fetching from Firebase or Local Storage
                const lastEditedPath = "/menu/additional";
                const lastEditedQuery = doc(db, lastEditedPath)
                const lastEditedSnapshot = await getDoc(lastEditedQuery)
                const lastEdited = lastEditedSnapshot.data().lastedited;

                if (lastEdited < parsedData.timestamp) {
                    //  If last edited timestamp is after the timestamp of saving to Local Storage, fetch from Firebase since new data is available. If not then just fetch from Local Storage since data is same as before.
                    allData = parsedData.data;
                    console.log("fetched from local storage")
                }
            }

            if (!allData) {
                //  If no data is fetched from Local Storage, continue and fetch from Firestore then save to Local Storage.
                const drinkData = await fetchData("drink")
                const foodData = await fetchData("food")

                allData = {
                    drink: drinkData,
                    food: foodData,
                }

                //  Save data and timestamp to Local Storage.
                const dataToCache = {
                    data: allData,
                    timestamp: Date.now(),
                };
                localStorage.setItem('homeMenuData', JSON.stringify(dataToCache));

            }

            //  Save the data to homeMenuData State
            setHomeMenuData(allData)
            
        }

        fetchAllData()
    }, [])
    //  End of Fetching data from Firestore or LocalStorage.

    return (

        <div>
            <Header />
            <main>
                <CategoryTabs homeMenuData={homeMenuData}/>
            </main>
        </div>

    )
}

export default Home
