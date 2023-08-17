import React, { useContext, useEffect } from 'react'
import Header from '../components/Header';
import CategoryTabs from '../components/CategoryTabs';
import Loading from '../components/Loading';
import { AppContext } from '../App';

function Admin() {
    const {isLoading, handleLoading} = useContext(AppContext)

    //  Setting loading state to true once the component mounts, then setting it to false once the ProductCard image is loaded.
    useEffect(() => {
        handleLoading(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
 
    return (
        <div>
            <Loading loading={isLoading ? 1 : 0}/>
            <Header/>
            <main>
                <CategoryTabs isAdmin={true}/>
            </main>
        </div>
    )

}

export default Admin
