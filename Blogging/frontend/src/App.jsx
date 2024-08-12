import { useState } from 'react'
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import Notfound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/home'
import Profile from './pages/profile'

function RegisterLogout() {
    localStorage.clear()
    console.log("went to register");
    return <Register />
}

function Logout() {
    localStorage.clear();
    console.log("log out");
    return <Navigate to='/login' />;
}

function App() {
    return (<>
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<RegisterLogout />} />
                <Route path='*' element={<Notfound />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='/' element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />
                <Route path='/profile' element={<Profile />} />
            </Routes>
        </BrowserRouter>
    </>)
}

export default App
