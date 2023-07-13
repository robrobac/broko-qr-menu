import { Navigate, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/admin/Admin";
import { useState } from "react";
import "./App.scss"

function App() {

    //  Auth Check
    const [isAuth, setIsAuth] = useState(null);
    onAuthStateChanged(auth, (user) => {
        setIsAuth(!!user)
    })

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={!isAuth ? <Login /> : <Navigate to="/admin" />} />
                <Route path="/admin" element={isAuth ? <Admin /> : <Navigate to="/login" />} />
            </Routes>
        </div>
    );
}

export default App;
