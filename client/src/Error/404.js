import React from 'react';
import Particles from './Particles';
import 'bootstrap/dist/css/bootstrap.min.css';
import './errorStyle.css'

const Error404 = () => {
    const backToHome = () => {
        window.location.href = "/";
    }
    return(
        <>
            <div className = "error-page">
                <div className = "content">
                    <div className = "content-container">
                        <h1 className = "h1-404">404</h1>
                        <p className = "p-404">Invalid room-name</p>
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

export default Error404;