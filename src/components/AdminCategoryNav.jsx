import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import "./AdminCategoryNav.scss"
import Stack from 'react-bootstrap/Stack';
import { Link } from 'react-scroll';
import { collection, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function AdminCategoryNav({mainCategory}) {

    const [activeCategory, setActiveCategory] = useState()

    const categoriesPath = `menu/${mainCategory}/categories`;
    const categoriesQuery = query(collection(db, categoriesPath));
    const [categories] = useCollectionData(categoriesQuery);
    console.log(activeCategory)
    const scrollContainerRef = useRef(null);

    

    //  set initial active category
    useEffect(() => {
        if (categories?.length > 0) {
            setActiveCategory(categories[0].id)
        }
    }, [categories, mainCategory])

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
        <ul className='categoryNav sticky-top pb-3 pt-3' style={{ top: "64px" }} ref={scrollContainerRef}>
            <Stack gap={3} direction='horizontal'>
                {categories?.map((category) => (
                    <Link
                    activeClass='active'
                    onSetActive={() => handleActive(category.id)}
                    key={category.id}
                    to={category.id}
                    spy={true}
                    smooth={true}
                    offset={-180}
                    duration={200}>
                        <Button
                        variant={`outline-primary ${activeCategory === category.id ? "active" : ""}`}
                        style={{ whiteSpace: 'nowrap', pointerEvents: "none", cursor: "pointer" }}>
                            {category.category}
                        </Button>
                    </Link>
                ))}
            </Stack>
        </ul>
    ) 

    
}

export default AdminCategoryNav
