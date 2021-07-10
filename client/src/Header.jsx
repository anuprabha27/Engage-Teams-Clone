import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect,useState } from 'react';
import { useHistory } from 'react-router';
import AOS from 'aos';
import "aos/dist/aos.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase';

const Header = () => {
    //get user from AuthContext

    const user = localStorage.getItem("isLoggedIn");

    const history = useHistory();


    //init for animate on scroll library
    useEffect(() => {
        AOS.init({
          duration : 2000
        });
      }, []);
      
    //function to change the color of header on scrolling
    useEffect(()=>{
        var myNav = document.getElementById('header');
        if(myNav){
            window.onscroll = function () { 
                if (window.scrollY > 50) {
                    myNav.classList.add("nav-colored");
                } 
                else {
                    myNav.classList.remove("nav-colored");
                }
            };
        }
      })
    
    //function to logout a user
    const handleLogout = async() => {
        await firebase.auth().signOut();
        localStorage.clear();
        history.push("/login");
    }

    //function to redirect to sign in page
    const showSignIn = () => {
        history.push("/login");
    }
    return (
        <header id = "header" className = "fixed-top" style = {{display:"flex",flexDirection:"row"}}>
            <div className = "container d-flex align-items-center logo" style = {{marginLeft:"100px"}}>
                <a href="/" className = "home-icon" data-aos="fade-down" data-aos-delay="20"><FontAwesomeIcon icon = {faQuoteLeft}/></a>
            </div>
            <div className = "container d-flex align-items-center logout-btn">
                <div onClick = {user?handleLogout:showSignIn} style = {{cursor: "pointer",marginTop:"12px"}} data-aos="fade-down" data-aos-delay="20">
                {user?"Logout":"Sign In"}
                </div>
            </div>
        </header>
    )
}

export default Header;