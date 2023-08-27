import React from 'react'
import Category from './Category'

function Categories({ menuData }) {
    
    return (
        <>
            {menuData?.map((category, index) => (
                <Category key={category.id} category={category} categoryIndex={index} menuData={menuData}/>
            ))}
        </>
    )
}

export default Categories
