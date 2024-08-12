import { Children, useEffect, useState } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import {jwtDecode} from "jwt-decode"
import api from "../api"
import { Navigate } from "react-router-dom";


export default function ProtectedRoute({props}) {
    const [isAuth, setIsAuth] = useState(null)

    useEffect(auth().catch(() => setIsAuth(false)), [])
    const refreshToken =  async () => {
        try {
            const refreshToken = localStorage.getItem(REFRESH_TOKEN)
            const res = await api.post('/api/token/refresh/', {"refresh": refreshToken})
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuth(true)
            } else {
                setIsAuth(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuth(false);
        }
    }
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuth(false);
            return
        }
        const decoded = jwtDecode(token)
        const expiration = decoded.exp
        const now = Date.now() / 1000
        if (expiration < now) {
            await refreshToken()
        } else {
            setIsAuth(true);
        }

    }
    return isAuth ? props : <Navigate to='/login' />;
}