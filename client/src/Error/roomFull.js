import React from 'react';
import Particles from './Particles';
import 'bootstrap/dist/css/bootstrap.min.css';
import './errorStyle.css'

const RoomFull = () => {
    const backToHome = () => {
        window.location.href = "/";
    }
    return(
        <>
            <div className = "error-page">
                <div className = "content">
                    <div className = "content-container">
                        <h1>Meeting Room Full</h1>
                        <p>The meeting you are trying to join is at capacity. Try again later.</p>
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

export default RoomFull;