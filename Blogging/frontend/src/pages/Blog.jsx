import React, { useState } from "react";
import { Success, Error } from "../components/Error";
import Nav from "./navbar";

export default function Blog({ title, content, author, created_at, isFriend, author_id }) {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    console.log(title, content, author)
    const handleFollow = async (id) => {
        try {
            const response = await api.post(`/api/friendships/${id}/`);
            if (response.status === 201) {
                setSuccess("Successfully followed!");
            } else {
                setError(response.data.detail || "An error occurred while following the user.");
            }
        } catch (error) {
            setError(error.response?.data?.detail || error.toString());
        }
    };

    return (
        <>
            <Nav name='/home' />
            <div className="container mt-4 p-3">
                {success && <Success error={success} />}
                {error && <Error error={error} />}
                <div className="infosdiv row align-items-center">
                    <div className="col-md-8">
                        <h1 className="title">{title}</h1>
                        <span className="text-muted">{created_at}</span>
                    </div>
                    <div className="col-md-4 text-end">
                        <span className="author fw-bold">{author}</span>
                        {!isFriend && (
                            <button className="btn btn-primary ms-2" onClick={() => handleFollow(author_id)}>
                                +
                            </button>
                        )}
                    </div>
                </div>
                <div className="contentdiv p-3 mt-3 bg-light rounded shadow-sm hover-effect">
                    {content}
                </div>
            </div>
        </>
    );
}
