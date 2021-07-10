import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import {nanoid} from "nanoid";
import Header from "../Header";
import Footer from "../Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

const StartCall = () => {
  const history = useHistory();

  const [link,setLink] = useState('/');

  const startCall = () => {
    const uid = nanoid();
    // localStorage.setItem('roomID',uid);
    history.push(`/${uid}`);
  };

  const handleSubmit = () => {
    // if(link.length<21)
    //   history.push('/error/404');
    // if(link.length>21)
    //   history.push('/error/404');
    // localStorage.setItem('roomID',uid);
    history.push(link);
  }

  return (
    <div className="call-page">
      <Header />
      <section id = "start-call">
                <div className = "container">
                    <div className = "row">
                        <div className = "call-content col-12" data-aos="zoom-in-up" data-aos-delay="20">
                            <h2>
                              Premium video meetings
                            </h2> 
                            <h2>
                              Now free for everyone.
                            </h2>
                        </div>
                        <div className="call-content col-12" data-aos="zoom-in-up" data-aos-delay="20">
                          <button type = "button" className = "call-btn btn btn-lg btn-info" onClick = {startCall}>Start call</button>
                        </div>
                        <hr style = {{borderColor: "rgba(255,255,255,0.7)",width:"100%",marginTop:"30px"}} />
                        <div className="call-content col-5" data-aos="zoom-in-up" data-aos-delay="20">
                          <h3>Enter link to join a meeting</h3>
                        </div>
                        <div className = "call-content col-7" style={{alignItems:"center"}} data-aos="zoom-in-up" data-aos-delay="20">
                          <form onSubmit = {handleSubmit}>
                            <input type="text" placeholder="Meeting link" onChange = {(e) => setLink(e.target.value)} id = "link" className = "link" 
                            style = {{height: "7vh",width: "70%"}} />
                            <button className = "submit-btn btn btn-lg btn-info" style={{paddingLeft:"10px",marginBottom:"10px"}} type = "submit">Submit</button>
                          </form>
                        </div>
                    </div>
                </div>
            </section>
      <Footer />
    </div>
  );
};
export default StartCall;