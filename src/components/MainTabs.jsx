import React, { createContext, useEffect, useState } from 'react'
import { scrollToTop } from '../helpers/scrollToTop'
import { ContentAdmin, ContentHome, Icon, Tab, Tabs, TabsContainer } from './styledComponents/StyledTabs'
import { ReactComponent as DrinkIcon } from "../icons/drinkicon.svg";
import { ReactComponent as FoodIcon } from "../icons/foodicon.svg";
import { ReactComponent as SearchIcon } from "../icons/searchicon.svg";
import TabNavigation from './TabNavigation';
import Categories from './Categories';

export const ViewContext = createContext();

export default function MainTabs({isAdmin, userMenuData, adminMenuData}) {
    const [selectedTab, setSelectedTab] = useState("food")
    const [allAdminItems, setAllAdminItems] = useState([])  //  state array that hold all items to use them in search bar
    

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
            <ContentHome>
                <TabNavigation isAdmin={isAdmin} userMenuData={userMenuData} adminMenuData={adminMenuData} selectedTab={selectedTab}/>
                <Categories isAdmin={isAdmin} userMenuData={userMenuData} adminMenuData={adminMenuData} selectedTab={selectedTab}/>
            </ContentHome>
        </TabsContainer>
        
    )
}

