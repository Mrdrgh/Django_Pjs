import React, { useEffect, useState } from "react";
import Nav from "./navbar";
import api from "../api";
import BlogMiniature from "./myBlogs";

export default function Home() {
    const [blogs, setBlogs] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {getBlogs()}, [])
    const getBlogs = async () => {
        try {
            const res = await api.get('/api/blogs/')
            const data = res.data
            setBlogs(data)
        } catch (error) {
            setError(error);
        }
    };
    return (<> 
    <Nav name={['logout', 'profile']} />
    {error && <div className="alert alert-danger" role="alert">{error}</div>}
    {blogs.map(
        (blog) => {
            return <BlogMiniature
            title={blog.title}
            author={blog.author}
            content={blog.content}
            created_at={blog.created_at} />
        } 
    )}
    </>)
};