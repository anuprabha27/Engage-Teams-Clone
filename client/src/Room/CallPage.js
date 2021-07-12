import React, { useEffect, useRef, useState } from "react";
import { useParams,useHistory } from "react-router";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import Chats from "./Chats";
import RoomOptions from './RoomOptions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import './CallPage.css'
import firebase from "firebase";

const StyledVideo = styled.video`
    height: 100%;
    width: 100%;
`;

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <StyledVideo className = "remote-video" playsInline autoPlay ref={ref} />
    );
}

const Room = (props) => {
    const [peers, setPeers] = useState([]);
    const [showChat,setShowChat] = useState(false);
    const [msgs,setMsgs] = useState([]);
    const [toggleAudio,setToggleAudio] = useState(false);
    const [toggleVideo,setToggleVideo] = useState(false);
    const [shareScreen,setShareScreen] = useState(false);
    const [fullScreenEnable,setFullScreenEnable] = useState(false);
    const [other,setOther] = useState('')
    const userStream = useRef();
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const inputRef = useRef();
    const roomOptionsRef = useRef();
    const screenTrackRef = useRef();
    const roomID = useParams().id;
    const history = useHistory();
    const meetingURL = `${window.location.pathname}`;

    const newUserName = localStorage.getItem('username');
    const userID = localStorage.getItem('id');
    localStorage.setItem('roomID',roomID);
    useEffect(() => {
        var rooms = props.db.collection("Rooms").doc(userID);
        rooms.get().then((doc) => {
            if(doc.exists){
                rooms.update({
                    Rooms: firebase.firestore.FieldValue.arrayUnion(roomID)
                });
            }else{
                props.db.collection("Rooms").doc(userID).set({
                    Rooms: [roomID]
                })
            }
        })
    },[])

    useEffect(() => {
        socketRef.current = io("/");
        navigator.mediaDevices.getUserMedia({ video: {height:window.innerHeight/2,width:window.innerWidth/2}, audio: {echoCancellation:true} }).then(stream => {
            if(userVideo.current)
                userVideo.current.srcObject = stream;
            userStream.current = stream;
            socketRef.current.emit("join room", {roomID,newUserName,userID});
            console.log("Joined the room");


            /* Perspective of the newly joined user */


            socketRef.current.on("other users", users => {
                console.log('Get other user (if any) in the room and set them as a peer');
                // playAudio();
                const peers = [];
                for(const prop in users){
                    console.log(`${prop} = ${users[prop]}`);
                    const userID = prop;
                    const username = users[prop].newUserName;
                    localStorage.setItem('otherUsername',username);
                    setOther(username);
                    console.log(other);
                    const peer = createPeer(userID,socketRef.current.id,stream);
                    peersRef.current.push({
                        peerID: userID,
                        userName: username,
                        peer,
                    })
                    peers.push({
                        peerID: userID,
                        userName: username,
                        peer,
                    });
                }
                setPeers(peers);
            })

            /* Perspective of user already in call */

            socketRef.current.on("new user joined", newUser => {
                console.log('New user joined the room');
                const peer = addPeer(newUser.signal, newUser.callerID, stream);
                localStorage.setItem('otherUsername',newUser.newUserName);
                setOther(newUser.newUserName);
                console.log(other);
                peersRef.current.push({
                    peerID: newUser.callerID,
                    userName: newUserName,
                    peer,
                })

                const peerObj = {
                    peerID: newUser.callerID,
                    userName: newUserName,
                    peer,
                }
                setPeers(users => [...users, peerObj]);
            });

            /*For new user */

            socketRef.current.on("signal response", userInRoom => {
                console.log("New user receives signaling data from user in the room");
                const item = peersRef.current.find(p => p.peerID === userInRoom.id);

                //accepting user's signaling data

                item.peer.signal(userInRoom.signal);
            });

            socketRef.current.on("user left",userID => {
                console.log("Peer left the room");
                localStorage.removeItem('otherUsername');
                const peerObj = peersRef.current.find(p=>p.peerID===userID);
                if(peerObj){
                    peerObj.peer.destroy();
                }
                const peers = peersRef.current.filter(p => p.peerID !== userID);
                peersRef.current = peers;
                setPeers(peers);
            });

            socketRef.current.on("receive-message",({msg,sender}) => {
                console.log("Received a new message");
                setMsgs((messages) => [...messages,{sender,msg}]);
            });

            socketRef.current.on("room full",() => {
                console.log("Room is full, unable to join");
                history.push("/error/roomFull");
            });
        })
    }, []);

        function createPeer(userInRoom, newUserID, stream) {
        const peer = new Peer({
            initiator: true,        //implies that signalling data is sent on creation of peer
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            console.log("New user sends signaling data to user already in the room");
            socketRef.current.emit("sending signal", { userInRoom, newUserID, newUserName, signal })
        })

        return peer;
    }

    function addPeer(newUserSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,       //implies that signaling data is sent on receiving an offer (accepting another user's signaling data)
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            console.log("User in room sends signaling data to new user");
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        console.log("User in room accepts new user's signaling data");
        peer.signal(newUserSignal);

        return peer;
    }


    const changeVideo = () => {
        console.log("Toggling user video");
        const val = !toggleVideo;
        const userVideoTrack = userVideo.current.srcObject.getVideoTracks()[0];
        setToggleVideo(val);
        userVideoTrack.enabled = toggleVideo;
    };

    const changeAudio = () => {
        console.log("Toggling user audio");
        const userAudioTrack = userVideo.current.srcObject.getAudioTracks()[0];
        const val = !toggleAudio;
        setToggleAudio(val);
        if (userAudioTrack) {
            userAudioTrack.enabled = toggleAudio;
          } else {
            userStream.current.getAudioTracks()[0].enabled = toggleAudio;
          }
    };

    const startPresenting = () => {
        if (!shareScreen) {
            navigator.mediaDevices
              .getDisplayMedia({ cursor: true })
              .then((stream) => {
                const screenTrack = stream.getTracks()[0];
      
                peersRef.current.forEach(({ peer }) => {
                  peer.replaceTrack(
                    peer.streams[0]
                      .getTracks()
                      .find((track) => track.kind === 'video'),
                    screenTrack,
                    userStream.current
                  );
                });

                screenTrack.onended = () => {
                  peersRef.current.forEach(({ peer }) => {
                    peer.replaceTrack(
                      screenTrack,
                      peer.streams[0]
                        .getTracks()
                        .find((track) => track.kind === 'video'),
                      userStream.current
                    );
                  });
                  userVideo.current.srcObject = userStream.current;
                  setShareScreen(false);
                };
      
                userVideo.current.srcObject = stream;
                screenTrackRef.current = screenTrack;
                setShareScreen(true);
              });
          } else {
            screenTrackRef.current.onended();
          }
    }

    const fullScreen = () => {
        if(showChat)
            setShowChat(false);
        document.body.requestFullscreen();
    } 

    document.onfullscreenchange = (event) => {
        const val = fullScreenEnable;
        setFullScreenEnable(!val);
        if(!fullScreenEnable)
            roomOptionsRef.current?.classList.add("hidden-options");
        else
            roomOptionsRef.current?.classList.remove("hidden-options");
    }

    function DisconnectCall(){
        localStorage.removeItem('otherUsername');
        window.location.href="/error/userLeft";
    }

    const toggleChat = () => {
        const val = !showChat;
        setShowChat(val);
    }
    const sendMessage = (e) => {
        console.log("Sending a message to everyone in the room");
        e.preventDefault();
        const msg = inputRef.current?.value;
        const userSocketID = socketRef.current?.id;
        var roomMsgs = props.db.collection("Message").doc(roomID);
        roomMsgs.get().then((doc) => {
            if(doc.exists){
                roomMsgs.update({
                    messages: firebase.firestore.FieldValue.arrayUnion({sender:userID,msg:msg,name:newUserName})
                })
            }else{
                props.db.collection("Message").doc(roomID).set({
                    messages: [{
                        sender:userID,
                        msg: msg,
                        name: newUserName
                    }]
                });
            }
        })
        socketRef.current.emit("send-message",{roomID,msg,sender: userSocketID,userID});
        if(inputRef.current)
            inputRef.current.value = '';
    }

    return (
        <div style = {{height: "100vh",width:"100%"}}>
            <div style = {{display:"flex",flexDirection: "row"}}>
                <div className = {showChat?"video-container-small":"video-container"}>
                        <>
                            <video className = "localVideo" muted ref={userVideo} autoPlay playsInline />
                            <div style = {{position: "absolute",bottom:"20px",right:"30px",color: "white",fontSize:"22px"}} >
                                You
                            </div>
                        </>
                    {peers.map((peer) => {
                        return (
                            <>
                                <Video className = "remoteVideo"  key={peer.peerID} peer={peer.peer} />
                                <div style = {{position:"absolute",bottom:"5px",left:"25px",color:"white",fontSize:"22px"}}>
                                    {other}
                                </div>
                            </>
                        );
                    })}
                </div>
                <div className = {showChat?"chat-visible":"chat-hidden"}>
                    <div style = {{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                        <div className = "chat-heading">
                            In-Call Messages
                        </div>
                        <div style = {{margin:"15px",cursor:"pointer"}}>
                            <FontAwesomeIcon onClick = {toggleChat} icon = {faTimes} />
                        </div>
                    </div>
                    <Chats messages = {msgs} userID = {socketRef.current?.id} otherUsername = {other} />
                    <div className = "input-form">
                        <form onSubmit = {sendMessage}>
                            <input
                            ref = {inputRef}
                            className = "message-input"
                            placeholder="Enter your message"
                            />
                            <button className ="message-submit-button" type="submit">
                                <FontAwesomeIcon icon = {faChevronRight} />
                            </button>
                        </form>
                    </div>
                </div>                
            </div>
            <RoomOptions showChat = {showChat} roomOptionsRef = {roomOptionsRef} 
                changeVideo = {changeVideo} DisconnectCall = {DisconnectCall} changeAudio = {changeAudio} 
                toggleChat = {toggleChat} fullScreen = {fullScreen} meetingURL = {meetingURL}
                startPresenting = {startPresenting} toggleAudio = {toggleAudio} toggleVideo = {toggleVideo}
            />
        </div>
    );
};

export default Room;
