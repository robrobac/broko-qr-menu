import React, { useContext, useEffect, useRef, useState } from 'react'
import ProductCard from './ProductCard'
import { normalizeString } from '../helpers/normalizeString'
import { TabNav } from './styledComponents/StyledNavigation';
import { FormInput} from './styledComponents/StyledForm';
import AdminItems from './AdminItems';
import { CategoryItems } from './styledComponents/StyledCategory';
import { SearchMessage } from './styledComponents/StyledMisc';
import { ViewContext } from './CategoryTabs';
import { ViewButton, ViewContainer } from './styledComponents/StyledButtons';
import { ReactComponent as ListIcon } from "../icons/listicon.svg";
import { ReactComponent as CardIcon } from "../icons/cardicon.svg";
import { AppContext } from '../App';
import { useTranslation } from 'react-i18next';
import { LanguageIconSticky, LanguageSelect, LanguageSticky, LanguageTitleSticky, LanguageTitleWrap } from './styledComponents/styledHeader';
import { ReactComponent as GlobeIcon } from "../icons/globeicon.svg";

function SearchBar({homeMenuData, allAdminItems, selectedTab, removeAdminItem }) {
    const [allItems, setAllItems] = useState()  //  All items for Home page
    const [filteredItems, setFilteredItems] = useState([])    //  Filtered items that will appear in search result
    const [searchValue, setSearchValue] = useState("")  //  Handling search input value
    const { viewStyle, handleViewStyle } = useContext(ViewContext)
    const { handleLoading } = useContext(AppContext)
    const [selectedLanguage, setSelectedLanguage] = useState("hr")
    // eslint-disable-next-line no-unused-vars
    const [scrollY, setScrollY] = useState(0);
    const [showLanguageButton, setShowLanguageButton] = useState(false)

    const { t, i18n } = useTranslation()

    useEffect(() => {
        const handleScroll = () => {
          setScrollY(window.scrollY);
          setShowLanguageButton(window.scrollY >= 70);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    const inputRef = useRef(null)   //  Search Input reference, handles onBlur for input in order to close virtual keyboard on scroll

    //  Since all admin data is loaded at once and then hidden depending on what we want to see I had to use this way to focus on search input once the search tab is unhidden.
    useEffect(() => {
        if (selectedTab === "search") {
            inputRef.current.focus();
            handleLoading(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            setFilteredItems([]);
        } else {
            const filteredItems = allItems?.filter(item => {
                const titleMatch = normalizeString(item.title).includes(query);
                const titleEngMatch = normalizeString(item.titleEng).includes(query);
                const descriptionMatch = normalizeString(item.description).includes(query);
                const descriptionEngMatch = normalizeString(item.descriptionEng).includes(query);
                return titleMatch || descriptionMatch || titleEngMatch || descriptionEngMatch
            })
            setFilteredItems(filteredItems)
        }        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue, allItems])

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

    const handleLanguage = () => {
        if (selectedLanguage === "hr") {
            setSelectedLanguage("en")
            i18n.changeLanguage("en")

            const dataToCache = {
                selectedLanguage: "en",
            };

            localStorage.setItem('selectedLanguage', JSON.stringify(dataToCache));
        } else if (selectedLanguage === "en") {
            setSelectedLanguage("hr")
            i18n.changeLanguage("hr")

            const dataToCache = {
                selectedLanguage: "hr",
            };

            localStorage.setItem('selectedLanguage', JSON.stringify(dataToCache));
        }
    }

    const noResult = searchValue === "" ? t("Search food and drink menu") : filteredItems.length === 0 ? `${t("No results for")} "${searchValue}"` : ""

    return (
        <div style={{minHeight: "100vh"}}>
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
            <ViewContainer>
                <LanguageSticky $show={showLanguageButton ? "true" : undefined}>
                    <LanguageSelect onClick={() => handleLanguage()}>
                        <LanguageTitleWrap>
                            <LanguageTitleSticky $isActive={i18n?.language === "hr" ? "true" : undefined}>hr</LanguageTitleSticky>
                            <LanguageTitleSticky>|</LanguageTitleSticky>
                            <LanguageTitleSticky $isActive={i18n?.language === "en" ? "true" : undefined}>en</LanguageTitleSticky>
                        </LanguageTitleWrap>
                        <LanguageIconSticky>
                            <GlobeIcon/>
                        </LanguageIconSticky>
                    </LanguageSelect>
                </LanguageSticky>
                <ViewButton onClick={() => handleViewStyle("card")} $isActive={viewStyle === "card" ? "true" : undefined}>
                    <CardIcon height="100%" />
                </ViewButton>
                <ViewButton onClick={() => handleViewStyle("list")} $isActive={viewStyle === "list" ? "true" : undefined}>
                    <ListIcon height="100%" />
                </ViewButton>
            </ViewContainer>
            <SearchMessage>{noResult}</SearchMessage>
            {homeMenuData ? 
                filteredItems?.map((item) => (
                    <CategoryItems key={item.id}>
                        <ProductCard item={item} key={item.id} viewStyle={viewStyle}/>
                    </CategoryItems>
                ))
            : (
                <AdminItems filteredItems={filteredItems} removeAdminItem={removeAdminItem} isSearch={true}/>
            )}   
    </div>
    )
}

export default SearchBar
