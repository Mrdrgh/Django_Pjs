import React, { useEffect, useState, useRef } from "react";
import api from "../api";
import Nav from "./navbar";
//TODO add update and delete blog options
export default function Profile() {
    const [profile, setProfile] = useState({});
    const [error, setError] = useState("");
    const [friends, setFriends] = useState([]);
    const [filteredFriends, setFilteredFriends] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [showFriendsModal, setShowFriendsModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const searchInputRef = useRef(null);

    const handleRemoveFriend = async (friendId) => {
        try {
            await api.delete(`/api/friendships/delete/${friendId}/`);
            setFriends(friends.filter(friend => friend.id !== friendId));
            setFilteredFriends(filteredFriends.filter(friend => friend.id !== friendId));
        } catch (error) {
            setError("Failed to remove friend: " + error.toString());
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [profileRes, friendsRes, blogsRes] = await Promise.all([
                    api.get("/api/profile/"),
                    api.get('/api/friendships/'),
                    api.get('/api/user_blogs/')
                ]);

                setProfile(profileRes.data);
                setFriends(friendsRes.data);
                setFilteredFriends(friendsRes.data);
                setBlogs(blogsRes.data);
            } catch (error) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setFilteredFriends(
            friends.filter(friend =>
                friend.friend.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, friends]);

    useEffect(() => {
        if (showFriendsModal && searchInputRef.current) {
            setTimeout(() => searchInputRef.current.focus(), 100);
        }
    }, [showFriendsModal]);

    const LoadingTemplate = () => (
        <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading your profile...</p>
        </div>
    );

    function FriendsModal() {
        return (
        <div className={`modal fade ${showFriendsModal ? 'show' : ''}`} style={{display: showFriendsModal ? 'block' : 'none'}} tabIndex="-1">
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Friends List ({friends.length})</h5>
                        <button type="button" className="btn-close" onClick={() => setShowFriendsModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <input
                            ref={searchInputRef}
                            type="text"
                            className="form-control mb-3"
                            placeholder="Search friends..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onBlur={(e) => e.target.focus()} // Keep focus on the input
                        />
                        {filteredFriends.map((item) => (
                            <div key={item.id} className="d-flex justify-content-between align-items-center mb-3">
                                <p className="friend-name mb-0">{item.friend}</p>
                                <div className="d-flex">
                                    <button className="btn btn-sm btn-outline-primary me-2">Send Message</button>
                                    <button 
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => {handleRemoveFriend(item.id);}}
                                    >
                                        Remove Friend
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        );
    };

    if (loading) return <LoadingTemplate />;

    return (
        <>
            <Nav name={'/profile'}
            />

            {error && <div className="alert alert-danger" role="alert">Error: {error}</div>}

            <div className="container mt-4">
                <div className="row">
                    {/* User Profile Section */}
                    <div className="col-lg-4">
                        <div className="profile-section mb-4">
                            <div className="profile-pic-container mx-auto mb-3">
                                <img src={profile.profile_picture} className="img-fluid profile-pic" alt="Profile" />
                            </div>
                            <h1 className="h4 text-center mb-2">{profile.user}</h1>
                            <div className="bio-box shadow-box p-3">
                                <p>{profile.bio}</p>
                            </div>
                        </div>

                        {/* Friends Section */}
                        <div className="friends-section">
                            <button 
                                className="btn btn-primary mb-3 w-100"
                                onClick={() => setShowFriendsModal(true)}
                            >
                                Show Friends ({friends.length})
                            </button>
                        </div>
                    </div>

                    {/* Blogs Section */}
                    <div className="col-lg-8">
                        <h2 className="blogs-header">Blogs</h2>
                        <div className="blogs-container">
                            {blogs.length > 0 ? (
                                blogs.map((item) => (
                                    <div key={item.id} className="card mb-3 shadow-box">
                                        <div className="card-body">
                                            <h3 className="card-title blog-title">{item.title} <p>{item.created_at}</p></h3>
                                            <p className="card-text">{item.content}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No blogs to show.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {FriendsModal()}

            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Playfair+Display:wght@700&display=swap');

                .profile-pic-container {
                    width: 150px;
                    height: 150px;
                }

                .profile-pic {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    object-fit: cover;
                }

                .bio-box {
                    border: 2px solid #ddd;
                    border-radius: 10px;
                }

                .shadow-box {
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                    transition: box-shadow 0.3s ease-in-out;
                }

                .shadow-box:hover {
                    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
                }

                .blogs-header {
                    font-family: 'Poppins', serif;
                    font-size: 2.5rem;
                    text-align: center;
                    margin-bottom: 1rem;
                }

                .blogs-container {
                    max-height: 600px;
                    overflow-y: auto;
                    padding-right: 15px;
                }

                .blog-title {
                    font-family: 'Poppins', sans-serif;
                    font-weight: 600;
                    font-size: 1.5rem;
                }

                .friend-name {
                    font-family: 'Poppins', sans-serif;
                    font-weight: 600;
                    font-size: 1.2rem;
                }

                .btn-outline-primary, .btn-outline-danger {
                    font-family: 'Poppins', sans-serif;
                    font-size: 0.8rem;
                    padding: 0.25rem 0.5rem;
                }

                .modal {
                    background-color: rgba(0, 0, 0, 0.5);
                }

                .modal.fade .modal-dialog {
                    transition: transform 0.3s ease-out, opacity 0.3s ease-out;
                    transform: scale(0.9);
                    opacity: 0;
                }

                .modal.show .modal-dialog {
                    transform: scale(1);
                    opacity: 1;
                }
                `}
            </style>
        </>
    );
}