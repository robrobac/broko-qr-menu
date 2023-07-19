import React, { useContext, useEffect, useState } from 'react'
import NewItemModal from './components/newItemModal/NewItemModal'
import CategoriesNav from './components/CategoriesNav'
import Categories from './components/Categories'
import { AuthContext } from '../../App'
import { Content, Tab, Tabs, TabsContainer } from '../../components/StyledTabs'

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
        <TabsContainer>
            <Tabs>
                <Tab
                onClick={() => setMainCategory("drink")}
                $isActive={mainCategory === "drink" ? "true" : undefined}>
                    DRINK
                </Tab>
                <Tab
                onClick={() => setMainCategory("food")}
                $isActive={mainCategory === "food" ? "true" : undefined}>
                    FOOD
                </Tab>
            </Tabs>
            <Content $isActive={mainCategory === "drink" ? "true" : undefined}>
                <CategoriesNav mainCategory={mainCategory}/>
                <Categories isDrink={true}/>
                {isAuth ? <NewItemModal isDrink={true}/> : ""}
            </Content>
            <Content $isActive={mainCategory === "food" ? "true" : undefined}>
                <CategoriesNav mainCategory={mainCategory}/>
                <Categories isDrink={false}/>
                {isAuth ? <NewItemModal isDrink={false}/> : ""}
            </Content>
        </TabsContainer>
    )
}

export default MainCategoryTabs
