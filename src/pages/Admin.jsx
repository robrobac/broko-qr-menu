import React from 'react'
import Header from '../components/Header';
import CategoryTabs from '../components/CategoryTabs';

function Admin() {
 
    return (
        <div>
            <header>
                <Header />
            </header>
            <main>
                <CategoryTabs isAdmin={true}/>
            </main>
        </div>
    )

}

export default Admin
