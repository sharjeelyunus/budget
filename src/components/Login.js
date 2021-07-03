import React from 'react';
import logo from '../assets/logo.png';
import { auth, provider } from '../firebase';
import './Login.css';

const Login = () => {
    const signIn = e => {
        e.preventDefault();
        auth.signInWithPopup(provider).catch(error => alert(error.message));
    };

    return (
        <div className="login">
            <div className="login__logo">
                <h1>Budget</h1>
                <p>Keep track of all the transactions you make.</p>
            </div>
            <div className="login__container">
                <img src={logo} alt="" />
                <div className="login__button" onClick={signIn}>
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="" />
                    <button >Sign In With Google</button>
                </div>
            </div>
        </div>
    )
}

export default Login;
