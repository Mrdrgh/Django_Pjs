import React, { useEffect, useState } from "react";
import api from "../api";
import Nav from "./navbar";

export default function Profile() {
    const [profile, setProfile] = useState({})
    const [error, setError] = useState("")
    useEffect(() => {getProfile()}, []);
    const getProfile = async () => {
        try {
            const res = await api.get("/api/profile/")
            const data = res.data
            setProfile(data);
        } catch (error) {
            setError(error);
        }
    }
    return (
        <>
        <Nav name={['logout']}/>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <h1>{profile.user}</h1>
        <p>{profile.bio}</p>
        <p>friends nbr : {profile.friends}</p>
        </>
    )
}