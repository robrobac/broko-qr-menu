import React, { useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AdminDrink from './components/AdminDrink';
import AdminFood from './components/AdminFood';
import Logout from '../../components/Logout';
import AdminCategoryNav from '../../components/AdminCategoryNav';
import { collection, query } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase/config';
import NewItemModal from './components/newItemModal/NewItemModal'


function Admin() {
    const [childActiveCategory, setChildActiveCategory] = useState(true)

    //  On tab change scroll to top and reset the active category navigation
    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        
        setTimeout(() => {
            setChildActiveCategory(!childActiveCategory)
        }, 100);
    };

    const drinkCategoriesPath = "menu/drink/categories";
    const drinkCategoriesQuery = query(collection(db, drinkCategoriesPath));
    const [drinkCategories] = useCollectionData(drinkCategoriesQuery);

    const foodCategoriesPath = "menu/food/categories";
    const foodCategoriesQuery = query(collection(db, foodCategoriesPath));
    const [foodCategories] = useCollectionData(foodCategoriesQuery);

    return (
        <div>
            <header>
                <h1>Broko Menu</h1>
                <Logout />
            </header>
            <main>
                <Tabs
                onSelect={scrollToTop}
                defaultActiveKey="food"
                className="sticky-top tabs mt-2 pb-0"
                justify
                >
                    <Tab eventKey="drink" title="Drink" >
                        <AdminCategoryNav category="drink" refreshNav={childActiveCategory}/>
                        <AdminDrink categories={drinkCategories}/>
                        <NewItemModal isDrink={true}/>
                    </Tab>
                    <Tab eventKey="food" title="Food" >
                        <AdminCategoryNav category="food" refreshNav={childActiveCategory}/>
                        <AdminFood categories={foodCategories}/>
                        <NewItemModal isDrink={false}/>
                    </Tab>
                </Tabs>
            </main>
        </div>
    )

}

export default Admin
