import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect,useState } from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";
import Features from './Features';
import Footer from '../Footer';
import Header from '../Header';
import Particles from '../Particles';
import img from '../Assets/Final-landing-page.png';
import '../App.css';

const Landing = () => {
    //init for animate on scroll library
    const user = localStorage.getItem('isLoggedIn');
    console.log(img)
    useEffect(() => {
        AOS.init({
          duration : 2000
        });
      }, []);

    
    return(
        <div style = {{height:"100vh"}}>

            <Header change = {false}/>
            <section id = "hero" className = "d-flex align-items-center justify-content-center">
                <div style = {{background:"linear-gradient(0.25turn, #233A87, #475EC6, #609CD2)"}}>
                    <Particles />
                </div>
                <div className = "container hero-container">
                    <div className = "row">
                        <div className = "landing-content col-12 col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-delay="100">
                            <h1>Teams Clone</h1>
                            <h2>
                                Browser-based real time video calling app. Start your next video call with a single click. 
                            </h2>
                            <div className = "d-flex justify-content-center justify-content-lg-start">
                                {/* <a href  ="/startCall" className = "btn-try-now">Try now</a> */}
                                <a href = {user?"/startCall":"/login"} className = "btn-try-now">Video Call</a>
                                <a href = {user?"/chats":"/login"} style = {{marginLeft:"35px"}} className = "btn-try-now">Chats</a>
                            </div>
                        </div>
                        <div className = "col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in-up" data-aos-delay="100">
                            <img className = "landing-img img-fluid" src={img}/>
                        </div>
                    </div>
                </div>
            </section>

            <Features />
            
            <Footer />

        </div>
    )
}

export default Landing;