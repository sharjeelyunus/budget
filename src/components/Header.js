import React from 'react';
import logo from '../assets/logo.png';
import { Avatar } from '@material-ui/core';
import './Header.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const Header = () => {
    const [user] = useAuthState(auth);

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const newDate = new Date();
    let date = newDate.getDate();
    const monthName = monthNames[newDate.getMonth()];


    return (
        <div className="header">
            <div className="header__logo">
                <img src={logo} alt="" />
                <h1>Budget</h1>
            </div>
            <div className="header__date">
                <span>{date} {monthName}</span>
            </div>
            <div className="header__user">
                <h2><span>Hello,</span> {user?.displayName}!</h2>
                <Avatar
                    onClick={() => auth.signOut()}
                    alt={user?.displayName}
                    src={user?.photoURL}
                    title="SignOut"
                />
            </div>
        </div>
    )
}

export default Header;
