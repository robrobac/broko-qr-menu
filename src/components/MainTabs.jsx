import React, { createContext, useEffect, useState } from 'react'
import { scrollToTop } from '../helpers/scrollToTop'
import { ContentAdmin, ContentHome, Icon, Tab, Tabs, TabsContainer } from './styledComponents/StyledTabs'
import { ReactComponent as DrinkIcon } from "../icons/drinkicon.svg";
import { ReactComponent as FoodIcon } from "../icons/foodicon.svg";
import { ReactComponent as SearchIcon } from "../icons/searchicon.svg";
import TabNavigation from './TabNavigation';
import Categories from './Categories';
import NewItemModal from './modals/newItemModal/NewItemModal';

export const AdminContext = createContext()

export default function MainTabs({isAdmin, menuData}) {
    const [selectedTab, setSelectedTab] = useState("food")

    //  On tab change scroll to top and reset the active category navigation
    useEffect(() => {
        scrollToTop();
    }, [selectedTab])

    const handleSelectedTab = (tab) => {
        setSelectedTab(tab)

        if (tab === "search") {
            return
        }
        const dataToCache = {
            selectedTab: tab,
        };
        localStorage.setItem('selectedTab', JSON.stringify(dataToCache));
    }
    
    return (
        <AdminContext.Provider value={{isAdmin}}>
        <TabsContainer>
            <Tabs>
                <Tab
                onClick={() => handleSelectedTab("drink")}
                $isActive={selectedTab === "drink"}>
                    <Icon $isActive={selectedTab === "drink"}>
                        <DrinkIcon height="100%"/>
                    </Icon>
                </Tab>
                <Tab
                onClick={() => handleSelectedTab("food")}
                $isActive={selectedTab === "food"}>
                    <Icon $isActive={selectedTab === "food"}>
                        <FoodIcon height="100%"/>
                    </Icon>
                </Tab>
                <Tab style={{flex: "1"}}
                onClick={() => handleSelectedTab("search")}
                $isActive={selectedTab === "search"}>
                    <Icon $isActive={selectedTab === "search"}>
                        <SearchIcon height="100%"/>
                    </Icon>
                </Tab>
            </Tabs>
            <ContentHome $isActive={selectedTab === "drink"}>
                <TabNavigation menuData={menuData["drink"]} selectedTab={selectedTab}/>
                <Categories menuData={menuData["drink"]} selectedTab={"drink"}/>
                {isAdmin && <NewItemModal isDrink={true}/>}
            </ContentHome>
            <ContentHome $isActive={selectedTab === "food"}>
                <TabNavigation menuData={menuData["food"]} selectedTab={selectedTab}/>
                <Categories menuData={menuData["food"]} selectedTab={"food"}/>
                {isAdmin && <NewItemModal isDrink={false}/>}
            </ContentHome>
        </TabsContainer>
        </AdminContext.Provider>
        
    )
}

