import { Navigate, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { createContext, useState } from "react";
import "./App.scss"
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";


export const AuthContext = createContext();

function App() {

    //  Auth Check
    const [isAuth, setIsAuth] = useState(null);
    onAuthStateChanged(auth, (user) => {
        setIsAuth(!!user)
    })

    return (
        <AuthContext.Provider value={{
            isAuth,
        }}>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={!isAuth ? <Login /> : <Navigate to="/admin" />} />
                    <Route path="/admin" element={isAuth ? <Admin /> : <Navigate to="/login" />} />
                </Routes>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
