import React from 'react'
import Header from '../components/Header';
import CategoryTabs from '../components/CategoryTabs';

function Admin() {
 
    return (
        <div>
            <Header />
            <main>
                <CategoryTabs isAdmin={true}/>
            </main>
        </div>
    )

}

export default Admin
