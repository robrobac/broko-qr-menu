import React, { useEffect, useState } from 'react'
import { scrollToTop } from '../helpers/scrollToTop'
import { ContentAdmin, ContentHome, Icon, Tab, Tabs, TabsContainer } from './styledComponents/StyledTabs'
import TabNavigation from './TabNavigation'
import TabContent from './TabContent'
import NewItemModal from './modals/newItemModal/NewItemModal'
import { ReactComponent as DrinkIcon } from "../icons/drinkicon.svg";
import { ReactComponent as FoodIcon } from "../icons/foodicon.svg";
import { ReactComponent as SearchIcon } from "../icons/searchicon.svg";
import SearchBar from './SearchBar'

function CategoryTabs({homeMenuData, isAdmin}) {
    const [selectedTab, setSelectedTab] = useState("food")
    const [allAdminItems, setAllAdminItems] = useState([])
    console.log("all admin items", allAdminItems)

    const getAllAdminItems = (items) => {
        setAllAdminItems(prevAdminItems => [...prevAdminItems, items]);
    };

    //  On tab change scroll to top and reset the active category navigation
    useEffect(() => {
        scrollToTop();
    }, [selectedTab])
    
    return (
        <TabsContainer>
            <Tabs>
                <Tab
                onClick={() => setSelectedTab("drink")}
                $isActive={selectedTab === "drink" ? "true" : undefined}>
                    <Icon $isActive={selectedTab === "drink" ? "true" : undefined}>
                        <DrinkIcon height="100%"/>
                    </Icon>
                </Tab>
                <Tab
                onClick={() => setSelectedTab("food")}
                $isActive={selectedTab === "food" ? "true" : undefined}>
                    <Icon $isActive={selectedTab === "food" ? "true" : undefined}>
                        <FoodIcon height="100%"/>
                    </Icon>
                </Tab>
                <Tab style={{flex: "1"}}
                onClick={() => setSelectedTab("search")}
                $isActive={selectedTab === "search" ? "true" : undefined}>
                    <Icon $isActive={selectedTab === "search" ? "true" : undefined}>
                        <SearchIcon height="100%"/>
                    </Icon>
                </Tab>
            </Tabs>
            {isAdmin ? (
                <>
                <ContentAdmin $isActive={selectedTab === "drink" ? "true" : undefined}>
                    <TabNavigation selectedTab={selectedTab} homeMenuData={homeMenuData} />
                    <TabContent selectedTab={selectedTab} homeMenuData={homeMenuData} isAdmin={isAdmin} isDrink={true} getAllAdminItems={getAllAdminItems}/>
                    <NewItemModal isDrink={true}/>
                </ContentAdmin>
                <ContentAdmin $isActive={selectedTab === "food" ? "true" : undefined}>
                    <TabNavigation selectedTab={selectedTab} homeMenuData={homeMenuData} />
                    <TabContent selectedTab={selectedTab} homeMenuData={homeMenuData} isAdmin={isAdmin} isDrink={false} getAllAdminItems={getAllAdminItems}/>
                    <NewItemModal isDrink={false}/>
                </ContentAdmin>
                <ContentAdmin $isActive={selectedTab === "search" ? "true" : undefined}>
                    <SearchBar allAdminItems={allAdminItems}/>
                </ContentAdmin>
                </>
            ) : (
                <>
                {selectedTab !== "search" ? (
                    <ContentHome>
                        <TabNavigation selectedTab={selectedTab} homeMenuData={homeMenuData}/>
                        <TabContent selectedTab={selectedTab} homeMenuData={homeMenuData} />
                     </ContentHome>
                ) : (
                    <ContentHome>
                        <SearchBar homeMenuData={homeMenuData}/>
                    </ContentHome>
                ) }
                </>
            )}  
            
        </TabsContainer>
    )
}

export default CategoryTabs


