import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {useState,useEffect} from 'react';
import { useHistory } from 'react-router';
import Particles from '../Particles';
import "firebase/app";

import {auth} from '../firebase';
import firebase from 'firebase/app';
import Header from '../Header';
import './Login.css';

const RegistrationForm = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [username,setusername] = useState('');
    console.log(username);
    const history = useHistory();
    useEffect(()=>{
        auth.onAuthStateChanged(user => {
            console.log(user);
            console.log(username);
        })
    },[]);
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('username',username);
        //e.target.reset();
        firebase.auth().createUserWithEmailAndPassword(email,password).then((result) => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        })
    }
    return(
        <div className = "login-page">
            <Header />
            <div className = "registration-form">
                <h1>Registration Form</h1>
                <form className = "reg-form" onSubmit = {handleSubmit}>
                    <div style = {{display:"flex",flexDirection:"column",alignItems:"center"}}>
                        <input type = "text" placeholder = "Enter username" onChange = {(e)=>setusername(e.target.value)} id = "username" className = "username"/>
                        <input type = "email" placeholder = "Enter email" onChange = {(e)=>setEmail(e.target.value)} id = "email" className = "email"/>
                        <input type = "password" placeholder = "Enter password" onChange = {(e)=>setPassword(e.target.value)} id = "password" className = "password" />
                        <button className = "btn btn-lg-danger" type = "submit" style = {{width:"60%",borderRadius:"10px",background: "linear-gradient(0.25turn, #233A87, #475EC6, #609CD2)",color:"white",fontSize:"30px",fontFamily:"Arial, Helvetica, sans-serif" }}>Register now</button>
                    </div>
                </form>
                <h3 style = {{margin:"13px 0px"}}>Or</h3>
                <div className = "register-with-google" onClick = {()=>auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}>
                    <h2>Sign In with Google</h2>
                </div>
            </div>
            <div class = "bg-particles">
                <Particles />
            </div>
        </div>
    )
}

export default RegistrationForm;