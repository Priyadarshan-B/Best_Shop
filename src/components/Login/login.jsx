import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import InputBox from "../input";
import LoginImg from "../../assets/img/login2.jpg";

function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [showPassword, setshowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post('http://localhost:3000/login', { name, password })
            .then((response) => {
                const { data } = response;
                if (data === 'success') {
                    setShowPopup(true);
                    navigate('/dashboard');
                } else {
                    setErrorMessage('Invalid Username or Password');
                }
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage("An error occurred");
            });
    };

    const togglePasswordVisibility = () => {
        setshowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div
            style={{
                backgroundImage: `url(${LoginImg})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    // backgroundColor: "rgba(255, 255, 255, 0.2)", 
                    width: 'max-content',
                    padding: '90px 50px',
                    borderRadius: '10px',
                    boxShadow:'0 0 10px rgba(0, 0, 0, 0.3)',
                    height: "max-content",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    backdropFilter: "blur(10px)" 
                }}
            >
                <center>
                    <h1>Login</h1>
                </center>
                <div style={{ marginTop: 30 }}>
                    <InputBox label={'Username'} type={"username"} />
                    <br />
                    <InputBox label={'Password'} type={!showPassword ? "password" : "name"} />
                    <br />
                    <div style={{ display: "flex", gap: 10, alignItems: 'center' }}>
                        <input
                            id="show-pass"
                            onChange={togglePasswordVisibility}
                            style={{ padding: 0, height: 20, width: 20 }}
                            type="checkbox"
                        />
                        <label htmlFor="show-pass">{showPassword ? "Hide" : "Show"} Password</label>
                    </div>
                </div>
                <button
                    style={{
                        background: 'green',
                        border: 'none',
                        outline: "none",
                        marginTop: 20,
                        padding: 10,
                        fontSize: 17,
                        borderRadius: 8,
                        color: 'white',
                        letterSpacing: 1.4
                    }}
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
