import React, { useContext, useEffect, useState } from 'react'
import { Element } from 'react-scroll'
import { collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase/config'
import { DeleteButton, UpDownButton, ViewButton, ViewContainer } from './styledComponents/StyledButtons'
import EditCategoryModal from './modals/EditCategoryModal'
import { deleteObject, ref } from 'firebase/storage'
import AdminItems from './AdminItems'
import ProductCard from './ProductCard'
import { ReactComponent as TrashIcon } from "../icons/trashicon.svg";
import { CategoryContainer, CategoryControls, CategoryItems, CategoryTitle } from './styledComponents/StyledCategory'
import { ReactComponent as UpIcon } from "../icons/upicon.svg";
import { ReactComponent as DownIcon } from "../icons/downicon.svg";
import { getMiddleValue } from '../helpers/getMiddleValue'
import { ViewContext } from './CategoryTabs'
import { ReactComponent as ListIcon } from "../icons/listicon.svg";
import { ReactComponent as CardIcon } from "../icons/cardicon.svg";

function TabContent({selectedTab, homeMenuData, isAdmin, isDrink, getAllAdminItems, removeAdminItem}) {
    const [categories, setCategories] = useState([])
    const itemsLength = categories.length - 1
    const { viewStyle, handleViewStyle } = useContext(ViewContext)

    //  If homeMenuData is passed from CategoryTabs.jsx, set categories
    useEffect(() => {
        if (homeMenuData && selectedTab) {
            setCategories(homeMenuData[selectedTab])
        }
    }, [selectedTab, homeMenuData])

    //  if no homeMenuData is passed from CategoryTabs.jsx, get data from Firebase onSnapshot
    useEffect(() => {
        if (!homeMenuData) {
            const categoriesPath = isDrink ? "menu/drink/categories" : "menu/food/categories"
            const q = query(collection(db, categoriesPath), orderBy("orderTimestamp", "asc"));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    //  Handles delete of whole category
    const handleDeleteCategory = async (category) => {
        //  Confirmation before proceeding
        if (window.confirm("Deleting category will delete all its items, are you sure you want to proceed?")) {
            
            //  Get category subcollections items in order to delete them since Firebase doesn't delete subcollections
            const categoryItemsPath = `${category.categoryPath}/items`
            const categoryItemsQuery = query(collection(db, categoryItemsPath))
            const categoryItems = await getDocs(categoryItemsQuery)
            
            if (categoryItems) {
                //  If there's categoryItems 
                categoryItems.forEach(async (item) => {
                    //  For each item check if filePath have value, if yes then delete file on that path and then delete the item from the collection
                    if (item.data().filePath !== "") {
                        //  Get the file reference
                        const fileRef = ref(storage, item.data().filePath)
                        //  Delete file from the storage
                        await deleteObject(fileRef).then(() => {
                        }).catch((error) => {
                            console.log(error)
                        });
                    }
                    //  After and if the file is deleted from the storage, remove the item from the collection
                    await deleteDoc(doc(db, item.data().fullPath))
                })
            }
            //  Delete the category item from the collection
            await deleteDoc(doc(db, category.categoryPath));

            //  Update lastedited timestamp to handle fetching from firestore or local storage.
            await updateDoc(doc(db, "/menu/additional"), {lastedited: Date.now()})
        }
    }


    //  Handling manual item ordering with buttons UP and DOWN
    const handleReorder = async (item, direction) => {

        //  Getting moving item index and firebase ref
        const itemIndex = categories.findIndex(doc => doc.id === item.id )
        const docRef = doc(db, categories[itemIndex].categoryPath)

        //  If one item in array, do nothing.
        if (categories.length <= 1) {
            return
        }

        //  Handling move UP
        if (direction === "up") {

            //  If moving item is first, don't move UP
            if (itemIndex === 0) {
                return
            }

            //  If moving item is second in array
            if (itemIndex === 1) {
                const prevOrder1 = categories[1 - 1].orderTimestamp
                const middleValue = getMiddleValue(0, prevOrder1)
                //  Saving current scroll position to handle "scroll lock"
                try {
                    //  Updating moved item document's orderTimestamp
                    await updateDoc(docRef, {
                        orderTimestamp: middleValue,
                    })
                    //  Update lastedited timestamp to handle fetching from firestore or local storage.
                    await updateDoc(doc(db, "/menu/additional"), {lastedited: Date.now()})
                } catch (error) {
                    console.log(error)
                }
            }

            //  If moving item is neither first nor second in array
            if (itemIndex >= 2) {
                const prevOrder1 = categories[itemIndex - 1].orderTimestamp
                const prevOrder2 = categories[itemIndex - 2].orderTimestamp
                const middleValue = getMiddleValue(prevOrder1, prevOrder2)
                try {
                    //  Updating moved item document's orderTimestamp
                    await updateDoc(docRef, {
                        orderTimestamp: middleValue,
                    })
                    //  Update lastedited timestamp to handle fetching from firestore or local storage.
                    await updateDoc(doc(db, "/menu/additional"), {lastedited: Date.now()})
                } catch (error) {
                    console.log(error)
                }
            }

        //  Handling move DOWN
        } else if (direction === "down") {

            //  If moving item is last in the array
            if (itemIndex === itemsLength) {
                return
            }

            //  If moving item is second to last in the array
            if (itemIndex === itemsLength - 1) {
                const prevOrder1 = categories[itemsLength].orderTimestamp
                const middleValue = prevOrder1 + 10
                try {
                    //  Updating moved item document's orderTimestamp
                    await updateDoc(docRef, {
                        orderTimestamp: middleValue,
                    })
                    //  Update lastedited timestamp to handle fetching from firestore or local storage.
                    await updateDoc(doc(db, "/menu/additional"), {lastedited: Date.now()})
                } catch (error) {
                    console.log(error)
                }
            }

            //  If moving item is neither last nor second to last in the array
            else {
                const prevOrder1 = categories[itemIndex + 1].orderTimestamp
                const prevOrder2 = categories[itemIndex + 2].orderTimestamp
                const middleValue = getMiddleValue(prevOrder1, prevOrder2)
                try {
                    //  Updating moved item document's orderTimestamp
                    await updateDoc(docRef, {
                        orderTimestamp: middleValue,
                    })
                    //  Update lastedited timestamp to handle fetching from firestore or local storage.
                    await updateDoc(doc(db, "/menu/additional"), {lastedited: Date.now()})
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }

    return (
        <div>
            <ViewContainer>
                <ViewButton onClick={() => handleViewStyle("card")} $isActive={viewStyle === "card" ? "true" : undefined}>
                    <CardIcon height="100%" />
                </ViewButton>
                <ViewButton onClick={() => handleViewStyle("list")} $isActive={viewStyle === "list" ? "true" : undefined}>
                    <ListIcon height="100%" />
                </ViewButton>
            </ViewContainer>
            {categories?.map((category, index) => (
                <CategoryContainer key={category.id}>
                <Element key={category.id} name={category.id}>
                    <CategoryTitle id={category.id}>{category.category}</CategoryTitle>
                    {isAdmin ? (
                        <>
                        <CategoryControls>
                            <DeleteButton onClick={() => handleDeleteCategory(category)}>
                                <TrashIcon height="100%"/>
                            </DeleteButton>
                            <EditCategoryModal category={category} />
                                <UpDownButton $isActive={index === 0 ? "true" : undefined}>
                                    <UpIcon height="100%" onClick={() => handleReorder(category, "up")}/>
                                </UpDownButton>
                                <UpDownButton $isActive={index === itemsLength ? "true" : undefined}>
                                    <DownIcon height="100%" onClick={() => handleReorder(category, "down")}/>
                                </UpDownButton>
                        </CategoryControls>
                        <AdminItems category={category} getAllAdminItems={getAllAdminItems} removeAdminItem={removeAdminItem}/>
                        </>
                    ) : 
                        <CategoryItems>
                            {category.items?.map((item) => (
                                <ProductCard item={item} key={item.id} viewStyle={viewStyle}/>
                            ))}
                        </CategoryItems>
                    }
                </Element>
                </CategoryContainer>
            ))}
        </div>
    )
}

export default TabContent
