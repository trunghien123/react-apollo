import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from 'src/services/authService';
import { remove } from 'src/utils/cookie';
import logo from './../../assets/images/logo-react-icon.png';

const Header = () => {
    const navigate = useNavigate();
    const isLogin = AuthService.isLoggedIn();
    const handleLogout = () => {
        remove("react_apollo_token");
        alert("Logout successfully!!!")
        navigate('/');
    }
    useEffect(() => {
        console.log(isLogin);
    }, [isLogin])
    return (
        <div className="header">
            <div className="header_logo">
                <Link to="/"><img src={logo} alt="logo" /></Link>
            </div>
            <div className="header_authenticate">
                {
                    !isLogin ? (
                        <>
                            <Link to="/sign-up" className="header_authenticate-sigup">Sign Up</Link>
                            <Link to="/sign-in" className="header_authenticate-signin">Sign In</Link>
                        </>
                    ) :
                        <>
                            <Link to="/my-profile" >My Profile</Link>
                            <a href="" onClick={handleLogout} >Logout</a>
                        </>
                }
            </div>
        </div>
    );
};

export default Header;