import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';
import './login.css'
import InputBox from "../input";
import LoginImg from "../../assets/img/login.png"

function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
/*     const { setUsername} = useContext(UserContext);
 */    const [showPopup, setShowPopup] = useState(false);
    const [showPassword, setshowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault(e);

        axios
            .post('http://localhost:3000/login', { name, password })
            .then((response) => {
                const { data } = response;
                if (data === 'success') {
/*                 setUsername(name);
 */                setShowPopup(true);
                    navigate('/dashboard');
                } else {
                    setErrorMessage('Invalid Username or Password');
                }
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage("An error occured");

            });
    };
    const togglePasswordVisibility = () => {
        setshowPassword((prevShowPassword) => !prevShowPassword);

    };

    return (
        <div style={{
            height: "100vh",
            backgroundColor: 'rgb(241 241 241)',
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <div style={{
                display: 'flex'
            }}>
                <form
                onSubmit={(e)=>{
                    e.preventDefault()
                }}
                    style={{
                        backgroundColor: "white",
                        width: 'max-content',
                        padding: '90px 50px',
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        height: "max-content",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}>
                    <center>
                        <h2>Login</h2>
                    </center>
                    <div style={{
                        marginTop: 30
                    }}>
                        <InputBox label={'Username'} type={"username"} />
                        <br />
                        <InputBox label={'Password'} type={!showPassword ?"password":"name"} />
                        <br />
                        <div style={{ display: "flex", gap: 10, alignItems: 'center' }} >
                            <input
                            id="show-pass"
                            onChange={togglePasswordVisibility}
                             style={{ padding: 0, height: 20, width: 20 }} type="checkbox" />
                            <label
                            htmlFor="show-pass"
                            >{showPassword ? "Hide" : "Show"} Password</label>
                        </div>
                    </div>
                    <button
                        style={{
                            background: 'linear-gradient(to right,#9181F4,#5038ED)',
                            border: 'none',
                            outline: "none",
                            marginTop: 20,
                            padding: 10,
                            fontSize: 17,
                            borderRadius: 8,
                            color: 'white',
                            letterSpacing: 1.4
                        }}
                    >Login</button>
                </form>
                <div className="login-img" />

            </div>
        </div>
    )

}
export default Login;