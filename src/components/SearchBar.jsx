import React, { useEffect, useRef, useState } from 'react'
import ProductCard from './ProductCard'
import { normalizeString } from '../helpers/normalizeString'
import { TabNav } from './styledComponents/StyledNavigation';
import { FormInput} from './styledComponents/StyledForm';

function SearchBar({homeMenuData}) {
    const [allItems, setAllItems] = useState()
    const [filteredItems, setFilteredItems] = useState()
    console.log("Filtered", filteredItems)
    const [searchValue, setSearchValue] = useState("")

    const inputRef = useRef(null)

    useEffect(() => {
        const items = []
        homeMenuData?.drink.forEach(category => {
            category.items.forEach(item => {
                items.push(item)
            })
        })
        homeMenuData?.food.forEach(category => {
            category.items.forEach(item => {
                items.push(item)
            })
        })
        setAllItems(items)

    }, [homeMenuData])

    useEffect(() => {
        const query = normalizeString(searchValue)

        if (!query) {
            setFilteredItems(null);
        } else {
            const filteredItems = allItems?.filter(item => {
                const titleMatch = normalizeString(item.title).includes(query);
                const descriptionMatch = normalizeString(item.description).includes(query);
                return titleMatch || descriptionMatch
            })
            setFilteredItems(filteredItems)
        }        
    }, [searchValue])

    useEffect(() => {
        // Attach scroll event listener when component mounts
        window.addEventListener('touchstart', handleOutsideClick);

        // Detach scroll event listener when component unmounts
        return () => {
            window.removeEventListener('touchstart', handleOutsideClick);
        };
    }, []);

    const handleOutsideClick = (e) => {
        // Blur input if the click is outside of the input element
        if (inputRef.current && !inputRef.current.contains(e.target)) {
            inputRef.current.blur();
        }
    };

    const onEnter = (e) => {
        if (e.key === "Enter") {
            e.target.blur();
        }
    };

    return (
        <div>
            <TabNav >
                <FormInput ref={inputRef}
                required
                type="text"
                id="inputTitle"
                placeholder="Search Product"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyUp={onEnter}
                />
            </TabNav>
            {filteredItems?.map(item => (
                <ProductCard item={item}/>
            ))}
        </div>
    )
}

export default SearchBar
