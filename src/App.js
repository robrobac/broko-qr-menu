import { Navigate, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase/config';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/admin/Admin";
import { createContext, useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import "./App.scss"

export const MenuContext = createContext()

function App() {
    //  Food
    const foodCategoriesQuery = query(collection(db, "menu/food/categories"))
    const [foodCategoriesAndItems, setFoodCategoriesAndItems] = useState([])

    //  Drink
    const drinkCategoriesQuery = query(collection(db, "menu/drink/categories"))
    const [drinkCategoriesAndItems, setDrinkCategoriesAndItems] = useState([])

    //  Auth Check
    const [isAuth, setIsAuth] = useState(null);
    onAuthStateChanged(auth, (user) => {
        setIsAuth(!!user)
    })

    //  Fetching food from database
    useEffect(() => {
        const fetchFoodCategoriesAndItems = async () => {
            try {
                //  Get food categories
                const querySnapshot = await getDocs(foodCategoriesQuery)
                const categoryData = querySnapshot.docs.map((doc) => doc.data())
                setFoodCategoriesAndItems(categoryData)

                //  get items for each category
                categoryData.forEach(async (category) => {
                    const itemsQuery = query(collection(db, `menu/food/categories/${category.id}/items`))
                    const itemsSnapshot = await getDocs(itemsQuery)
                    const itemsData = itemsSnapshot.docs.map((doc) => doc.data())

                    //  Update the category object with the fetched items
                    category.items = itemsData

                    //  Store the fetched data in state
                    setFoodCategoriesAndItems([...categoryData])
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchFoodCategoriesAndItems()
    }, [])

    //  Fetch drink from database
    useEffect(() => {
        const fetchDrinkCategoriesAndItems = async () => {
            try {
                //  Get drink categories
                const querySnapshot = await getDocs(drinkCategoriesQuery)
                const categoryData = querySnapshot.docs.map((doc) => doc.data())
                setDrinkCategoriesAndItems(categoryData)

                //  get items for each category
                categoryData.forEach(async (category) => {
                    const itemsQuery = query(collection(db, `menu/drink/categories/${category.id}/items`))
                    const itemsSnapshot = await getDocs(itemsQuery)
                    const itemsData = itemsSnapshot.docs.map((doc) => doc.data())

                    //  Update the category object with the fetched items
                    category.items = itemsData

                    //  store the fetched data in state
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
