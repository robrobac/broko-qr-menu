import React, { useContext, useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import NewItemModal from './components/newItemModal/NewItemModal'
import CategoriesNav from './components/CategoriesNav'
import Categories from './components/Categories'
import { AuthContext } from '../../App'

function MainCategoryTabs() {
    const [mainCategory, setMainCategory] = useState("food")
    const { isAuth } = useContext(AuthContext)

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
                <CategoriesNav mainCategory={mainCategory}/>
                <Categories isDrink={true}/>
                {isAuth ? <NewItemModal isDrink={true}/> : ""}
                
            </Tab>
            <Tab eventKey="food" title="Food" >
                <CategoriesNav mainCategory={mainCategory}/>
                <Categories isDrink={false}/>
                {isAuth ? <NewItemModal isDrink={false}/> : ""}
                
            </Tab>
        </Tabs>
    )
}

export default MainCategoryTabs
