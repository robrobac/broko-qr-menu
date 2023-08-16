import { Navigate, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { createContext, useState } from "react";
import "./App.scss"
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import NotFound from "./components/NotFound";




export const AppContext = createContext();

function App() {
    const [isAuth, setIsAuth] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    const handleLoading = (loading) => {
        setIsLoading(loading)
    }

    //  Auth Check
    onAuthStateChanged(auth, (user) => {
        setIsAuth(!!user)
    })

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
