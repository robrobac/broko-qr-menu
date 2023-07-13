import React from 'react'
import Logout from '../../components/Logout';
import MainCategoryTabs from './components/MainCategoryTabs';
import "./Admin.scss"


function Admin() {

    return (
        <div>
            <header>
                <h1>Broko Menu</h1>
                <Logout />
            </header>
            <main>
                <MainCategoryTabs />
            </main>
        </div>
    )

}

export default Admin
