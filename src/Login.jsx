import React from 'react';
import serialize from 'form-serialize';
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = (e) => {
        e.preventDefault()
        let formData = serialize(e.target, { hash: true });
        if (login(formData["username"], formData["password"])) {
            navigate("/admin");
        } else {
            alert("Wrong username and password")
        }
    }

    return (
        <div>
            <h4 style={{ margin: "auto", width: "fit-content"}}>Admin Login</h4>
            <br></br>
            <form onSubmit={handleLogin}>
                <div style={{ margin: "auto", width: "fit-content"}}>
                    <label>Username </label>
                    <input 
                        name="username"
                        type="text"
                        required
                    />
                </div>
                <br></br>
                <div style={{ margin: "auto", width: "fit-content"}}>
                    <label>Password </label>
                    <input 
                        name="password"
                        type="password"
                        required
                    />
                </div>
                <br></br>
                <div style={{ margin: "auto", width: "fit-content"}}>
                    <input type="submit" value="Log In"/>
                </div>
            </form>
        </div>
    )
}

export default Login
