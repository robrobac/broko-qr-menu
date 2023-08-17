import React, { useEffect, useRef, useState } from 'react'
import { Nav, TabNav } from './styledComponents/StyledNavigation';
import { NavigationButton } from './styledComponents/StyledButtons';
import { Link } from 'react-scroll';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useTranslation } from 'react-i18next';
import { handleTranslate } from '../helpers/handleTranslate';

function TabNavigation({selectedTab, homeMenuData}) {
    const [categories, setCategories] = useState([])
    const [activeCategory, setActiveCategory] = useState();
    const scrollContainerRef = useRef(null);
    const { i18n } = useTranslation()

    //  If homeMenuData is passed from CategoryTabs.jsx, set categories that will show in the navigation
    useEffect(() => {
        if (homeMenuData && selectedTab) {
            setCategories(homeMenuData[selectedTab])
        }

        //  if no homeMenuData is passed from CategoryTabs.jsx, get data from Firebase onSnapshot
        if (!homeMenuData) {
            const q = query(collection(db, `menu/${selectedTab}/categories`), orderBy("orderTimestamp", "asc"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const snapshotData = [];
                querySnapshot.forEach((doc) => {
                    snapshotData.push(doc.data());
                });
                setCategories(snapshotData)
            });
            return () => {
                unsubscribe();
            }
        }
    }, [selectedTab, homeMenuData])

    //  set initial active category
    useEffect(() => {
        if (categories?.length > 0) {
            setActiveCategory(categories[0].id)
        }
    }, [categories, selectedTab])

    //  Set new active category
    const handleActive = (e) => {
        setActiveCategory(e)
    }

    //  Horizontal scroll to active category
    useEffect(() => {
        if (activeCategory && scrollContainerRef.current) {
            const activeElement = scrollContainerRef.current.querySelector('.active');
            if (activeElement) {
                const containerWidth = scrollContainerRef.current.offsetWidth;
                const elementOffset = activeElement.offsetLeft;
                const elementWidth = activeElement.offsetWidth;
                const scrollOffset = elementOffset - (containerWidth - elementWidth) / 2;
                scrollContainerRef.current.scrollTo({
                    left: scrollOffset,
                    behavior: 'smooth',
                });
            }
        }
    }, [activeCategory, categories]);

    return (
        <TabNav ref={scrollContainerRef}>
            {categories?.map((category) => (
                <Nav key={category.id}>
                    <Link
                    activeClass='active'
                    onSetActive={() => handleActive(category.id)}
                    key={category.id}
                    to={category.id}
                    spy={true}
                    smooth={true}
                    offset={-133}
                    duration={200}>
                        <NavigationButton $isActive={activeCategory === category.id ? "true" : undefined}>
                            {handleTranslate(category.categoryEng, i18n) ? category.categoryEng : category.category}
                        </NavigationButton>
                    </Link>
                </Nav>
                ))}     
        </TabNav>
    ) 

    
}

export default TabNavigation
