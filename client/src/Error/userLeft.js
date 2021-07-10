import React from 'react';
import Particles from './Particles';
import 'bootstrap/dist/css/bootstrap.min.css';
import './errorStyle.css'

const UserLeft = () => {
    const backToHome = () => {
        localStorage.removeItem('roomID');
        window.location.href = "/";
    }
    const backToCall = () => {
        const room = localStorage.getItem('roomID');
        window.location.href = `${window.location.origin}/${room}`;
    }
    return(
        <>
            <div className = "error-page">
                <div className = "content">
                    <div className = "content-container">
                        <h1>You left the meeting</h1>
                        <p>Click here to rejoin</p>
                        <button className = "btn btn-lg return-btn" onClick = {backToCall}>Rejoin meeting</button>
                    </div>
                </div>
                <div>
                    <button className = "btn btn-lg error-btn" onClick = {backToHome}>Back to homepage</button>
                </div>
                <Particles />
            </div>
        </>
    );
}

export default UserLeft;