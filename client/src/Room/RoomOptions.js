import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faVideoSlash,
  faMicrophone,
  faPhone,
  faComment,
  faDesktop,
  faMicrophoneSlash,
  faExpand,
  faInfo
} from "@fortawesome/free-solid-svg-icons";
import "./CallPage.css"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'

const RoomOptions = ({
  startPresenting,
  toggleAudio,
  toggleVideo,
  meetingURL,
  showChat,
  roomOptionsRef,
  changeVideo,
  DisconnectCall,
  changeAudio,
  toggleChat,
  fullScreen
}) => {
  return(
    <div className = {showChat?"roomOptionsSmall":"roomOptions"} ref = {roomOptionsRef}>
        <OverlayTrigger
            trigger="click"
            key="top"
            placement="top"
            overlay={
                <Popover id={`popover-positioned-top`}>
                <Popover.Title as="h3">Meeting Info</Popover.Title>
                <Popover.Content>
                    Copy the link below and enter it on the start call page to invite others.
                </Popover.Content>
                <Popover.Content>
                    {meetingURL}
                </Popover.Content>
                </Popover>
            }
        >
            <div className = "roomCircle" >
                <FontAwesomeIcon className = "info-icon" icon = {faInfo} />
            </div>
        </OverlayTrigger>
        <div className = "center">
            <div className = "roomCircle" onClick = {changeVideo}>
                <FontAwesomeIcon className = {!toggleVideo?"video-icon":"video-slash-icon"} icon = {!toggleVideo?faVideo:faVideoSlash} />
            </div>
            <div className = "roomCircle" onClick = {DisconnectCall}>
                <FontAwesomeIcon className = "end-call-icon" icon = {faPhone}/>
            </div>
            <div className = "roomCircle" onClick = {changeAudio}>
                <FontAwesomeIcon className = {!toggleAudio?"audio-icon":"audio-slash-icon"} icon = {!toggleAudio?faMicrophone:faMicrophoneSlash} />
            </div>
        </div>
        <div className = "center"> 
            <div className = "roomCircle" onClick = {startPresenting}>
                <FontAwesomeIcon className = "present-icon" icon = {faDesktop} />
            </div>
            <div className = "roomCircle" onClick = {toggleChat}>
                <FontAwesomeIcon className = "chat-icon" icon = {faComment} />
            </div>
            <div className = "roomCircle" onClick = {fullScreen}>
                <FontAwesomeIcon style = {{transform: "translate(16px, 10px)"}} className = "full-screen-icon" icon = {faExpand} />
            </div>
        </div>
    </div>
  )
}

export default RoomOptions;