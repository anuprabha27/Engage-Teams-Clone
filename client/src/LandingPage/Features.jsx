import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo,
    faWindowRestore,
    faComment,
    faUser
} from '@fortawesome/free-solid-svg-icons';

const Features = () => {
    return(
        <>
        <div className = "features d-flex flex-row">
            <div className = "first-feature">
                 <div className="circle">
                    <FontAwesomeIcon icon = {faVideo} className = "feature-icon"/>
                </div>
                <div className = "feature-text">
                    <h3>Video Calling</h3>
                    <p className = "subtext">Connect with friends, family, and colleagues with a single click</p>
                </div>
            </div>
            <div className="second-feature">
                <div className="circle">
                    <FontAwesomeIcon icon = {faWindowRestore} className = "feature-icon"/>
                </div>
                <div className = "feature-text">
                    <h3>Screen Sharing</h3>
                    <p className = "subtext">Share your entire screen, a window or a tab</p>
                </div>
            </div>
        </div>
        <div className = "features-other d-flex flex-row">
            <div className = "first-feature">
                    <div className="circle">
                        <FontAwesomeIcon icon = {faComment} className = "feature-icon"/>
                    </div>
                    <div className = "feature-text">
                        <h3>In-Call Chatting</h3>
                        <p className = "subtext">Send text messages to users in the video call</p>
                    </div>
            </div>
            <div className="second-feature">
                    <div className="circle">
                        <FontAwesomeIcon icon = {faUser} style = {{fontSize: "2rem",transform:"translate(27px,20px)"}}/>
                    </div>
                    <div className = "feature-text">
                        <h3>User Authentication</h3>
                        <p className = "subtext">Allow only authenticated users to join the video call</p>
                    </div>
            </div>
        </div>
        </>
    )
}
export default Features;