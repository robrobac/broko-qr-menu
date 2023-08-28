import React from 'react'
import Category from './Category'

function Categories({ menuData, isAdmin }) {
    
    return (
        <>
            {menuData?.map((category, index) => (
                <Category isAdmin={isAdmin} key={category.id} category={category} categoryIndex={index} menuData={menuData}/>
            ))}
        </>
    )
}

export default Categories
