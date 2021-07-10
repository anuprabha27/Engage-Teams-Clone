import React from 'react';
import Particles from '../Particles';
import "firebase/app";

import {auth} from '../firebase';
import firebase from 'firebase/app';
import Header from '../Header';

import {useState,useEffect} from 'react';
import reactDom from 'react-dom';
import './Login.css';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
    const history = useHistory();
    const [email,setemail] = useState();
    const [password,setpassword] = useState();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user){
                console.log(user);
                localStorage.setItem('isLoggedIn',true);
                if(localStorage.getItem('username')){
                    user.updateProfile({
                        displayName: localStorage.getItem('username')
                    }).then(() => {
                        console.log("Successfully updated!")
                    }).catch((err) => {
                        console.log(err);
                    })
                }
                if(user.displayName)
                    localStorage.setItem('username',user.displayName);
                // else    
                //     localStorage.setItem('username',user.email);
                localStorage.setItem('id',user.uid);
                history.push('/');
            }
        })
    },[]);

    const handleSubmit = (e) =>{
        e.preventDefault();
        e.target.reset();
        firebase.auth().signInWithEmailAndPassword(email,password).then(result => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        })
    }

    const goToRegister = () => {
        history.push('/register');
    }

    return(
        <div className = "login-page">
            <Header />
            <div class = "bg-particles">
                <Particles />
            </div>
            <div className = "login-form">
                <h1>Login Form</h1>
                <form style = {{width:"90%"}} onSubmit = {handleSubmit}>
                    <input type = "email" id = "email" className = "email" placeholder = "Enter your email" onChange = {(e) => {setemail(e.target.value)}} />
                    <input type = "password" id = "password" className = "password" placeholder = "Enter your password" onChange = {(e) => {setpassword(e.target.value)}} />
                    <div>
                        <button type = "submit" className = "btn btn-lg-danger" style = {{width:"40%",borderRadius:"10px",background: "linear-gradient(0.25turn, #233A87, #475EC6, #609CD2)",color:"white",fontSize:"30px",fontFamily:"Arial, Helvetica, sans-serif" }}>
                            Submit
                        </button>
                    </div>
                </form>
                <h3>Or</h3>
                <div className = "login-with-google" onClick = {()=>auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}>
                    <h2>Sign In with Google</h2>
                </div>
                <hr style = {{width:"80%",borderColor:"rgba(0,0,0,0.2)",borderWidth:"3px"}} />
                <div style = {{textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <h3>Don't have an account?</h3>
                    {/* style = {{cursor:"pointer",color:"blue"}} */}
                    <div style = {{height:"50px"}} className = "login-with-google" onClick = {goToRegister}>
                        <h3>Sign Up</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;