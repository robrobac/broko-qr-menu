import { Navigate, Route, Routes } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import "./App.scss"
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import NotFound from "./components/NotFound";
import "./i18next/i18next"
import { useAuthCheck } from "./hooks/useAuth";

export const AppContext = createContext();

function App() {
    const isAuth = useAuthCheck()
    const [isLoading, setIsLoading] = useState(true)

    // useEffect(() => {
    //     setTimeout(() => {
    //         setIsLoading(false)
    //     }, 10000)
    // }, [])

    const handleLoading = (loading) => {
        setTimeout(() => {
            setIsLoading(loading)
        }, 200)
    }

    return (
        <AppContext.Provider value={{ isAuth, isLoading, handleLoading }}>
            <div className="App">
                <Routes>
                    <Route path='*' element={<NotFound />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={!isAuth ? <Login /> : <Navigate to="/admin" />} />
                    <Route path="/admin" element={isAuth ? <Admin /> : <Navigate to="/login" />} />
                </Routes>
            </div>
        </AppContext.Provider>
    );
}

export default App;
