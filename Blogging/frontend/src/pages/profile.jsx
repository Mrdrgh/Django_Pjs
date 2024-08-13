import React, { useEffect, useState, useRef } from "react";
import api from "../api";
import Nav from "./navbar";

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
            searchInputRef.current.focus();
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

    const FriendsModal = () => (
        <div className={`modal ${showFriendsModal ? 'd-block show' : ''}`} tabIndex="-1">
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
                        />
                        {filteredFriends.map((item) => (
                            <div key={item.id} className="d-flex justify-content-between align-items-center mb-3">
                                <p className="friend-name mb-0">{item.friend}</p>
                                <div className="d-flex">
                                    <button className="btn btn-sm btn-outline-primary me-2">Send Message</button>
                                    <button className="btn btn-sm btn-outline-danger">Remove Friend</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    if (loading) return <LoadingTemplate />;

    return (
        <>
            <Nav name={['logout', 'home']}/>

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
                        <h2 className="h5">Blogs</h2>
                        {blogs.length > 0 ? (
                            blogs.map((item) => (
                                <div key={item.id} className="card mb-3 shadow-box">
                                    <div className="card-body">
                                        <h3 className="card-title blog-title">{item.title}</h3>
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

            <FriendsModal />

            <style jsx>{`
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

                .blog-title {
                    font-family: 'Georgia', serif;
                    font-weight: bold;
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
                    transition: opacity 0.3s ease;
                    opacity: 0;
                    pointer-events: none;
                }

                .modal.show {
                    opacity: 1;
                    pointer-events: auto;
                }

                .modal-dialog {
                    transition: transform 0.3s ease;
                    transform: translateY(-50px);
                }

                .modal.show .modal-dialog {
                    transform: translateY(0);
                }
            `}</style>
        </>
    );
}