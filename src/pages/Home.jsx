import React, { useState } from 'react'
import Logout from '../components/Logout'
import { Tab, Tabs } from 'react-bootstrap'
import Food from './Food'
import Drink from './Drink'
import CategoryNav from '../components/CategoryNav'
import "./Home.scss"


function Home() {
    const [childActiveCategory, setChildActiveCategory] = useState(true)

    //  On tab change scroll to top and reset the active category navigation
    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        
        setTimeout(() => {
            setChildActiveCategory(!childActiveCategory)
        }, 100);
    };

    return (
        <div>
            <header>
                <h1>Broko Menu</h1>
                <Logout />
            </header>
            <main>
                <Tabs
                onSelect={scrollToTop}
                defaultActiveKey="food"
                id="justify-tab-example"
                className="sticky-top tabs mt-2 pb-0"
                justify
                >
                    <Tab eventKey="drink" title="Drink" >
                        <CategoryNav category="drink" refreshNav={childActiveCategory}/>
                        <Drink />
                    </Tab>
                    <Tab eventKey="food" title="Food" >
                        <CategoryNav category="food" refreshNav={childActiveCategory}/>
                        <Food /> 
                    </Tab>
                </Tabs>
            </main>
            <footer className='sticky-bottom'>
                <p>footer</p>
            </footer>
        </div>
    )
}

export default Home
