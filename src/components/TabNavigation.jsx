import React, { useEffect, useRef, useState } from 'react'
import { Nav, TabNav } from './styledComponents/StyledNavigation';
import { NavigationButton } from './styledComponents/StyledButtons';
import { Link } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import { handleTranslate } from '../helpers/handleTranslate';

function TabNavigation({ isAdmin, userMenuData, adminMenuData, selectedTab }) {
    const [categories, setCategories] = useState([])
    const [activeCategory, setActiveCategory] = useState();
    const { i18n } = useTranslation()
    const scrollContainerRef = useRef(null);


    useEffect(() => {
        if (isAdmin) {
            setCategories(adminMenuData[selectedTab])
        }
        if (!isAdmin) {
            setCategories(userMenuData[selectedTab])
        }
    }, [adminMenuData, userMenuData, selectedTab])

    //  set initial active category
    useEffect(() => {
        if (categories?.length > 0) {
            setActiveCategory(categories[0].id)
        }
    }, [categories, selectedTab])

    //  Set new active category
    const handleActive = (e) => {
        setTimeout(() => {
            setActiveCategory(e);
        }, 501);
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
                    behavior: 'instant',
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
                    onSetActive={() => setActiveCategory(category.id)}
                    onClick={() => handleActive(category.id)}
                    key={category.id}
                    to={category.id}
                    spy={true}
                    smooth={true}
                    offset={-208}
                    duration={500}>
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
