import React from 'react';
import Particles from './Particles';
import 'bootstrap/dist/css/bootstrap.min.css';
import './errorStyle.css'

const UserLogin = () => {
    const goToLoginPage = () => {
        window.location.href = "/login";
    }
    return(
        <>
            <div className = "error-page">
                <div className = "content">
                    <div className = "content-container">
                        <h1>User Not Logged In</h1>
                        <p>You need to be logged in to enter the video call.</p>
                    </div>
                </div>
                <div>
                    <button className = "btn btn-lg error-btn" onClick = {goToLoginPage}>Login page</button>
                </div>
                <Particles />
            </div>
        </>
    );
}

export default UserLogin;