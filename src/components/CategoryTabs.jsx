import React, { useEffect, useState } from 'react'
import { scrollToTop } from '../helpers/scrollToTop'
import { ContentAdmin, ContentHome, Tab, Tabs, TabsContainer } from './StyledTabs'
import TabNavigation from './TabNavigation'
import TabContent from './TabContent'
import NewItemModal from './newItemModal/NewItemModal'

function CategoryTabs({homeMenuData, isAdmin}) {
    const [selectedTab, setSelectedTab] = useState("food")

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
                    DRINK
                </Tab>
                <Tab
                onClick={() => setSelectedTab("food")}
                $isActive={selectedTab === "food" ? "true" : undefined}>
                    FOOD
                </Tab>
            </Tabs>
            {isAdmin ? (
                <>
                <ContentAdmin $isActive={selectedTab === "drink" ? "true" : undefined}>
                    <TabNavigation selectedTab={selectedTab} homeMenuData={homeMenuData} />
                    <TabContent selectedTab={selectedTab} homeMenuData={homeMenuData} isAdmin={isAdmin} isDrink={true}/>
                    <NewItemModal isDrink={true}/>
                </ContentAdmin>
                    <ContentAdmin $isActive={selectedTab === "food" ? "true" : undefined}>
                    <TabNavigation selectedTab={selectedTab} homeMenuData={homeMenuData} />
                    <TabContent selectedTab={selectedTab} homeMenuData={homeMenuData} isAdmin={isAdmin} isDrink={false}/>
                    <NewItemModal isDrink={false}/>
                </ContentAdmin>
                </>
            ) : (
                <ContentHome $isActive={selectedTab === "drink" ? "true" : undefined}>
                    <TabNavigation selectedTab={selectedTab} homeMenuData={homeMenuData} />
                    <TabContent selectedTab={selectedTab} homeMenuData={homeMenuData}/>
                </ContentHome>
            )}  
            
        </TabsContainer>
    )
}

export default CategoryTabs


