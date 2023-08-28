import { t } from 'i18next'
import React, { useEffect, useRef, useState } from 'react'
import { SearchMessage } from './styledComponents/StyledMisc';
import { CategoryItems } from './styledComponents/StyledCategory';
import Product from './Product';
import { normalizeString } from '../helpers/normalizeString'
import { TabNav } from './styledComponents/StyledNavigation';
import { FormInput } from './styledComponents/StyledForm';

function SearchBar({menuData, selectedTab, isAdmin}) {
    const [searchValue, setSearchValue] = useState("")  //  Handling search input value
    const [searchItems, setSearchItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])    //  Filtered items that will appear in search result

    const inputRef = useRef(null)

    useEffect(() => {
        setSearchValue("")
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [selectedTab])

    useEffect(() => {
        const allItems = []

        menuData["food"]?.forEach(category => {
            category.items?.forEach(item => {
                 allItems.push(item)
            })
        })
        menuData["drink"]?.forEach(category => {
            category.items?.forEach(item => {
                 allItems.push(item)
            })
        })
            
        setSearchItems(allItems)
    }, [menuData])

    //  use effect that filters data when searchValue is changed
    useEffect(() => {
        //  Normalizing the string to eliminate special characters for easier search
        const query = normalizeString(searchValue)
    
        //  if there's no query value, set filtered data to null, if there is query value then set filtered data to match search value
        if (!query) {
            setFilteredItems([]);
        } else {
            const filteredTitles = searchItems?.filter(item => {
                const titleMatch = normalizeString(item.title).includes(query);
                const titleEngMatch = normalizeString(item.titleEng).includes(query);
                return titleMatch || titleEngMatch
            })
            const filteredDescriptions = searchItems?.filter(item => {
                const descriptionMatch = normalizeString(item.description).includes(query);
                const descriptionEngMatch = normalizeString(item.descriptionEng).includes(query);
                return descriptionMatch || descriptionEngMatch
            })
            const filtered = [...filteredTitles, ...filteredDescriptions]

            const uniqueFiltered = Array.from(new Set(filtered));

            setFilteredItems(uniqueFiltered)
        }        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue, searchItems])
    
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

    const noResult = searchValue === "" ? t("Search food and drink menu") : filteredItems.length === 0 ? `${t("No results for")} "${searchValue}"` : ""


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
            <CategoryItems>
                {filteredItems?.map((item, index) => (
                        <Product item={item} key={item.id} isSearch={true} isAdmin={isAdmin}/>
                ))}
            </CategoryItems>
            <SearchMessage>{noResult}</SearchMessage>
        </div>
    )
}

export default SearchBar
