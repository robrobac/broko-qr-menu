import React, { useEffect, useState } from 'react'
import Category from './Category'
import { CategoryItems } from './styledComponents/StyledCategory'

function Categories({ isAdmin, userMenuData, adminMenuData, selectedTab }) {
    const [categories, setCategories] = useState([])
    const categoriesLength = categories?.length - 1

    useEffect(() => {
        if (isAdmin) {
            setCategories(adminMenuData[selectedTab])
        }
        if (!isAdmin) {
            setCategories(userMenuData[selectedTab])
        }
    }, [adminMenuData, userMenuData, selectedTab])


    return (
        <>
            {categories?.map((category, index) => (
                <Category key={category.id} isAdmin={isAdmin} category={category} categoryIndex={index} categoriesLength={categoriesLength}/>
            ))}
        </>
    )
}

export default Categories
