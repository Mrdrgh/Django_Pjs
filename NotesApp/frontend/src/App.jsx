import React from "react"
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Register from "./pages/register"
import NotFound from "./pages/notFount"
import Home from "./pages/home"
import Notes from "./pages/notes"
import Login from "./pages/login"
import ProtectedRoute from "./components/protectedRoute"

function Logout() {
    localStorage.clear();
    return (<Navigate to="/login"/>);
}

function RegisterLogout() {
    localStorage.clear()
    return <Register />
}
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route 
                        path="/"
                        Component={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route 
                        path="/api/user/register"
                        Component={
                            <RegisterLogout />
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter> 
        </>
    )
}

export default App
