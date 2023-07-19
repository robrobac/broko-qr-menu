import React from 'react'
import MainCategoryTabs from './admin/MainCategoryTabs'
import Header from '../components/Header'

function Home() {

    return (
        <div>
            <Header />
            <main>
                <MainCategoryTabs />
            </main>
        </div>
    )
}

export default Home
