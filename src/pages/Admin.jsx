import React, { useContext, useEffect } from 'react'
import Header from '../components/Header';
import { AppContext } from '../App';
import useFetchAllDataWithSnapshot from '../hooks/useFetchAllDataWithSnapshot'
import MainTabs from '../components/MainTabs';

function Admin() {
    const {isLoading, handleLoading} = useContext(AppContext)
    const adminMenuData = useFetchAllDataWithSnapshot();

    //  Setting loading state to true once the component mounts, then setting it to false once the ProductCard image is loaded.
    useEffect(() => {
        handleLoading(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
 
    return (
        <div>
            {/* <Loading loading={isLoading ? 1 : 0}/> */}
            <Header/>
            <MainTabs isAdmin={true} menuData={adminMenuData}/>
        </div>
    )
}

export default Admin
