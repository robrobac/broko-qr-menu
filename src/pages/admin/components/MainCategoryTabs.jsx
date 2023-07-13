import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import AdminCategoryNav from '../../../components/AdminCategoryNav'
import NewItemModal from './newItemModal/NewItemModal'
import DrinkItems from './DrinkItems'
import FoodItems from './FoodItems'

function MainCategoryTabs() {
    const [mainCategory, setMainCategory] = useState("food")

    //  On tab change scroll to top and reset the active category navigation
    useEffect(() => {
        const scrollToTop = () => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        };
        scrollToTop()
    }, [mainCategory])
    
    return (
        <Tabs
        onSelect={(k) => setMainCategory(k)}
        activeKey={mainCategory}
        className="sticky-top tabs mt-2 pb-0"
        justify>
            <Tab eventKey="drink" title="Drink" >
                <AdminCategoryNav mainCategory={mainCategory}/>
                <DrinkItems />
                <NewItemModal isDrink={true}/>
            </Tab>
            <Tab eventKey="food" title="Food" >
                <AdminCategoryNav mainCategory={mainCategory}/>
                <FoodItems />
                <NewItemModal isDrink={false}/>
            </Tab>
        </Tabs>
    )
}

export default MainCategoryTabs
