import React, { createContext, useEffect, useState } from 'react'
import { scrollToTop } from '../helpers/scrollToTop'
import { ContentAdmin, ContentHome, Icon, Tab, Tabs, TabsContainer } from './styledComponents/StyledTabs'
import TabNavigation from './TabNavigation'
import TabContent from './TabContent'
import NewItemModal from './modals/newItemModal/NewItemModal'
import { ReactComponent as DrinkIcon } from "../icons/drinkicon.svg";
import { ReactComponent as FoodIcon } from "../icons/foodicon.svg";
import { ReactComponent as SearchIcon } from "../icons/searchicon.svg";
import SearchBar from './SearchBar'

export const ViewContext = createContext();

function CategoryTabs({homeMenuData, isAdmin}) {
    const [selectedTab, setSelectedTab] = useState("food")
    const [allAdminItems, setAllAdminItems] = useState([])  //  state array that hold all items to use them in search bar
    const [viewStyle, setViewStyle] = useState("card");


    useEffect(() => {
        //  Fetching data from Local Storage.
        const cachedData = localStorage.getItem("styleData");
        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            if (parsedData.viewStyle) {
                setViewStyle(parsedData.viewStyle)   
            } else {
                setViewStyle("card")
            }
            
            if (parsedData.selectedTab) {
                setSelectedTab(parsedData.selectedTab)
            } else {
                setSelectedTab("food")
            }
        }
    }, [])

    const handleSelectedTab = (tab) => {
        setSelectedTab(tab)
        //  Save data and timestamp to Local Storage.
        const dataToCache = {
            viewStyle: viewStyle,
            selectedTab: tab,
        };
        localStorage.setItem('styleData', JSON.stringify(dataToCache));
    }

    const handleViewStyle = (style) => {
        setViewStyle(style)
        //  Save data and timestamp to Local Storage.
        const dataToCache = {
            viewStyle: style,
            selectedTab: selectedTab,
        };
        localStorage.setItem('styleData', JSON.stringify(dataToCache));
    }

    //  Gathering all items at one place to handle search bar, newItem comes from AdminItems.jsx as an argument.
    const getAllAdminItems = (newItem) => {
        setAllAdminItems(prevAdminItems => {
            //  Checking if newItem have the same ID as one of existing items.
            const existingIndex = prevAdminItems.findIndex(item => item.id === newItem.id);
            if (existingIndex !== -1) {
                //  If an item with the same ID exists, replace it
                const updatedItems = [...prevAdminItems];
                updatedItems[existingIndex] = newItem;
                return updatedItems;
            } else {
                //  If the item doesn't exist, add it to the array
                return [...prevAdminItems, newItem];
            }
        });
    };

    //  Removes item from allAdminItems state. itemToRemove is passed from AdminItems.jsx as an argument.
    const removeAdminItem = (itemToRemove) => {
        setAllAdminItems((prevAdminItems) => {
            return prevAdminItems.filter((item) => item.id !== itemToRemove.id);
        });
    };

    //  On tab change scroll to top and reset the active category navigation
    useEffect(() => {
        scrollToTop();
    }, [selectedTab])
    
    return (
        <ViewContext.Provider value={{ viewStyle, handleViewStyle }}>
        <TabsContainer>
            <Tabs>
                <Tab
                onClick={() => handleSelectedTab("drink")}
                $isActive={selectedTab === "drink" ? "true" : undefined}>
                    <Icon $isActive={selectedTab === "drink" ? "true" : undefined}>
                        <DrinkIcon height="100%"/>
                    </Icon>
                </Tab>
                <Tab
                onClick={() => handleSelectedTab("food")}
                $isActive={selectedTab === "food" ? "true" : undefined}>
                    <Icon $isActive={selectedTab === "food" ? "true" : undefined}>
                        <FoodIcon height="100%"/>
                    </Icon>
                </Tab>
                <Tab style={{flex: "1"}}
                onClick={() => handleSelectedTab("search")}
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
                    <TabContent selectedTab={selectedTab} homeMenuData={homeMenuData} isAdmin={isAdmin} isDrink={true} getAllAdminItems={getAllAdminItems} removeAdminItem={removeAdminItem} />
                    <NewItemModal isDrink={true}/>
                </ContentAdmin>
                <ContentAdmin $isActive={selectedTab === "food" ? "true" : undefined}>
                    <TabNavigation selectedTab={selectedTab} homeMenuData={homeMenuData} />
                    <TabContent selectedTab={selectedTab} homeMenuData={homeMenuData} isAdmin={isAdmin} isDrink={false} getAllAdminItems={getAllAdminItems} removeAdminItem={removeAdminItem}/>
                    <NewItemModal isDrink={false}/>
                </ContentAdmin>
                <ContentAdmin $isActive={selectedTab === "search" ? "true" : undefined}>
                    <SearchBar allAdminItems={allAdminItems} selectedTab={selectedTab} removeAdminItem={removeAdminItem}/>
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
        </ViewContext.Provider>
    )
}

export default CategoryTabs


