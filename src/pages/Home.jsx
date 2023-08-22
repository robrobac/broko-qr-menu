import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase/config'
import CategoryTabs from '../components/CategoryTabs'
import { AppContext } from '../App'
import Loading from '../components/Loading'
import useFetchAllData from '../hooks/useFetchAllData'
import useFetchAllDataWithSnapshot from '../hooks/useFetchAllDataWithSnapshot'
import { useAuthCheck } from '../hooks/useAuth'


function Home() {
    const {isLoading, handleLoading} = useContext(AppContext)
    const homeMenuData = useFetchAllData()

    const userMenuData = useFetchAllData()
    const adminMenuData = useFetchAllDataWithSnapshot()
    console.log("userMenuData", userMenuData)
    console.log("adminMenuData", adminMenuData)
    
    //  Setting loading state to true once the component mounts, then setting it to false once the ProductCard image is loaded.
    useEffect(() => {
        handleLoading(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div>
            <Loading loading={isLoading ? 1 : 0}/>
            <Header />
            <main>
                <CategoryTabs homeMenuData={homeMenuData}/>
            </main>
        </div>
    )
}

export default Home
