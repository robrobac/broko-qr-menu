import { Navigate, Route, Routes } from "react-router-dom";

import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase/config';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import { createContext, useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";

export const MenuContext = createContext()

function App() {
    const foodCategoriesQuery = query(collection(db, "menu/food/categories"))
    const [foodCategoriesAndItems, setFoodCategoriesAndItems] = useState([])
    console.log("Fetched Food", foodCategoriesAndItems)


    const drinkCategoriesQuery = query(collection(db, "menu/drink/categories"))
    const [drinkCategoriesAndItems, setDrinkCategoriesAndItems] = useState([])
    console.log("Fetched Drink", drinkCategoriesAndItems)

    const [isAuth, setIsAuth] = useState(null);
    onAuthStateChanged(auth, (user) => {
        setIsAuth(!!user)
    })

    useEffect(() => {
        const fetchFoodCategoriesAndItems = async () => {
            try {
                const querySnapshot = await getDocs(foodCategoriesQuery)
                const categoryData = querySnapshot.docs.map((doc) => doc.data())
                setFoodCategoriesAndItems(categoryData)

                // Fetch items for each category
                categoryData.forEach(async (category) => {
                    const itemsQuery = query(collection(db, `menu/food/categories/${category.id}/items`))
                    const itemsSnapshot = await getDocs(itemsQuery)
                    const itemsData = itemsSnapshot.docs.map((doc) => doc.data())

                    // Update the category object with the fetched items
                    category.items = itemsData

                    // Update the state to trigger a re-render
                    setFoodCategoriesAndItems([...categoryData])
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchFoodCategoriesAndItems()
    }, [])

    useEffect(() => {
        const fetchDrinkCategoriesAndItems = async () => {
            try {
                const querySnapshot = await getDocs(drinkCategoriesQuery)
                const categoryData = querySnapshot.docs.map((doc) => doc.data())
                setDrinkCategoriesAndItems(categoryData)

                // Fetch items for each category
                categoryData.forEach(async (category) => {
                    const itemsQuery = query(collection(db, `menu/drink/categories/${category.id}/items`))
                    const itemsSnapshot = await getDocs(itemsQuery)
                    const itemsData = itemsSnapshot.docs.map((doc) => doc.data())

                    // Update the category object with the fetched items
                    category.items = itemsData

                    // Update the state to trigger a re-render
                    setDrinkCategoriesAndItems([...categoryData])
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchDrinkCategoriesAndItems()
    }, [])

    return (
        <MenuContext.Provider value={{
            foodCategoriesAndItems,
            drinkCategoriesAndItems,
        }}>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={!isAuth ? <Login /> : <Navigate to="/admin" />} />
                    <Route path="/admin" element={isAuth ? <Admin /> : <Navigate to="/login" />} />
                </Routes>
            </div>
        </MenuContext.Provider>
    );
}

export default App;
