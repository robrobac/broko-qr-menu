import React, { useContext, useEffect } from 'react'
import Header from '../components/Header'
import { AppContext } from '../App'
import useFetchAllData from '../hooks/useFetchAllData'
import MainTabs from '../components/MainTabs'

function Home() {
    const {isLoading, handleLoading} = useContext(AppContext)
    const userMenuData = useFetchAllData()
    
    //  Setting loading state to true once the component mounts, then setting it to false once the ProductCard image is loaded.
    useEffect(() => {
        handleLoading(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            {/* <Loading loading={isLoading ? 1 : 0}/> */}
            <Header/>
            <MainTabs isAdmin={false} userMenuData={userMenuData}/>
        </div>
    )
}

export default Home
