import React from 'react'
import Category from './Category'

function Categories({ menuData, isAdmin }) {
    
    return (
        <div>
            {menuData?.map((category, index) => (
                <Category isAdmin={isAdmin} key={category.id} category={category} categoryIndex={index} menuData={menuData}/>
            ))}
        </div>
    )
}

export default Categories
