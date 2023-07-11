import React from 'react'
import Logout from '../components/Logout'
import { Tab, Tabs } from 'react-bootstrap'
import Food from './Food'
import Drink from './Drink'
import CategoryNav from '../components/CategoryNav'


function Home() {
    return (
        <div>
            <h1>Broko Menu</h1>
            <Logout />
            <Tabs
            defaultActiveKey="food"
            id="justify-tab-example"
            className="mb-3"
            justify>
                <Tab eventKey="drink" title="Drink">
                    <CategoryNav category="drink"/>
                    <Drink />
                </Tab>
                <Tab eventKey="food" title="Food">
                    <CategoryNav category="food"/>
                    <Food />
                </Tab>
            </Tabs>
        </div>
    )
}

export default Home
