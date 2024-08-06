import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";


function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const response = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    const loadingBtn = (
        <button className="btn btn-primary" type="button" disabled>
            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span role="status">Loading...</span>
        </button>
    );

    return (
        <form onSubmit={handleSubmit}>
            <h1>{method === "login" ? "Login" : "Register"}</h1>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} name="username" />
                <div id="emailHelp" className="form-text">We'll never share your username, password or any credentials with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" value={password} id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} name="password" />
            </div>
            {loading ? loadingBtn : <button type="submit" className="btn btn-primary">Submit</button>}
        </form>
    );
}

export default Form;

