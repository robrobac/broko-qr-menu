import React, { useEffect, useRef, useState } from 'react'
import ProductCard from './ProductCard'
import { normalizeString } from '../helpers/normalizeString'
import { TabNav } from './styledComponents/StyledNavigation';
import { FormInput} from './styledComponents/StyledForm';

function SearchBar({homeMenuData, allAdminItems, selectedTab }) {
    const [allItems, setAllItems] = useState()  //  All items for Home page
    const [filteredItems, setFilteredItems] = useState()    //  Filtered items that will appear in search result
    const [searchValue, setSearchValue] = useState("")  //  Handling search input value
    console.log("allItems", allItems)
    console.log("filtered", filteredItems)

    const inputRef = useRef(null)   //  Search Input reference, handles onBlur for input in order to close virtual keyboard on scroll

    //  Since all admin data is loaded at once and then hidden depending on what we want to see I had to use this way to focus on search input once the search tab is unhidden.
    useEffect(() => {
        if (selectedTab === "search") {
            inputRef.current.focus();
        }
    }, [selectedTab])

    //  Fetching homeMenuData from Home.jsx and extracting separate items and storing them in the allItems state.
    useEffect(() => {
        //  have effect only if homeMenuData is passed from Home.jsx.
        if (homeMenuData) {
            const items = []
            //  Going deep in main category and each subcategory to reach its respective items and gather them all in one place.
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
            //  pushing items to allItems state.
            setAllItems(items)
        }
    }, [homeMenuData])

    //  Fetching data to use in admin search bar(the difference is that admin have live updates while home must refresh to spare reads with random users)
    useEffect(() => {
        if (allAdminItems) {
            setAllItems(allAdminItems)
        }
    }, [allAdminItems])

    //  use effect that filters data when searchValue is changed
    useEffect(() => {
        //  Normalizing the string to eliminate special characters for easier search
        const query = normalizeString(searchValue)

        //  if there's no query value, set filtered data to null, if there is query value then set filtered data to match search value
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue])

    //  event listeners for closing the virtual keyboard on touch outside the input field
    useEffect(() => {
        // Attach scroll event listener when component mounts
        window.addEventListener('touchstart', handleOutsideClick);

        // Detach scroll event listener when component unmounts
        return () => {
            window.removeEventListener('touchstart', handleOutsideClick);
        };
    }, []);

    //  function that handles tapping outside the input value in order to close virtual keyboard
    const handleOutsideClick = (e) => {
        // Blur input if the click is outside of the input element
        if (inputRef.current && !inputRef.current.contains(e.target)) {
            inputRef.current.blur();
        }
    };

    //  close virtual keyboard on enter
    const onEnter = (e) => {
        if (e.key === "Enter") {
            e.target.blur();
        }
    };

    return (
        <div>
            <TabNav >
                <FormInput ref={inputRef}
                autoFocus
                type="text"
                id="inputTitle"
                placeholder="Search Product"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyUp={onEnter}
                />
            </TabNav>
            {filteredItems?.map(item => (
                <ProductCard item={item} key={item.id}/>
            ))}
        </div>
    )
}

export default SearchBar
