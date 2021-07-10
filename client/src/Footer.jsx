import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return(
        <footer>
            <div className = "container footer-content">
                <div className="row">
                    <div className="col-6 d-flex flex-row justify-content-left">
                        &#169; 2021 Anuprabha Bhardwaj
                    </div>
                    <div className="github-icon col-6 d-flex flex-row">
                        <a href="#"><FontAwesomeIcon icon = {faGithub} /></a>
                    </div>
                </div>
            </div>
        </footer>
    )

}

export default Footer;