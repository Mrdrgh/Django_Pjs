import { useState } from 'react'
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import Notfound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/home'

function RegisterLogout() {
    localStorage.clear()
    return <Register />
}

function Logout() {
    localStorage.clear();
    return <Navigate to='/login' />;
}

function App() {
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
        </Routes>
    </BrowserRouter>
}

export default App
