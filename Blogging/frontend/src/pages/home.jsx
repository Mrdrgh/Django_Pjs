import React, { useEffect, useState } from "react";
import Nav from "./navbar";
import api from "../api";
import BlogMiniature from "./myBlogs";

export default function Home() {
    const [blogs, setBlogs] = useState([])
    const [error, setError] = useState('')
    const [user, setUser] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getBlogs()
                await getUserProfile()
            } catch (error) {
                setError(error.toString())
            }
        }
        fetchData();
    }, []);

    const getBlogs = async () => {
        try {
            const res = await api.get('/api/blogs/')
            const data = res.data
            setBlogs(data)
        } catch (error) {
            setError(error);
        }
    };
    const getUserProfile = async () => {
        try {const res = await api.get('/api/profile/')
        setUser(res.data)} catch (error) {
            setError(error);
        }
    }
    const HandleClick = async (id) => {
        try {
            await api.post(`/api/friendships/${id}`)
            console.log("freindship request sent");
        } catch (error) {
            setError(error);
        }
    }
    return (<> 
    <Nav name='/home'
        profile_picture={user.profile_picture}
        username={user.user} 
        email={user.email}
    />
    {error && <div className="alert alert-danger" role="alert">{error}</div>}
    {blogs.map(
        (blog) => {
            return <BlogMiniature
            title={blog.title}
            author={blog.author_username}
            content={blog.content}
            created_at={blog.created_at}
            id={blog.author}
        HandleClick={() => {HandleClick}}
             />
        } 
    )}
    </>)
};