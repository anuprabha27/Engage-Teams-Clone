import { useLocation,useParams,useHistory } from "react-router";
import { useState,useEffect,useRef } from "react";
import UserAvatar from "react-user-avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import './Chats.css';
import io from 'socket.io-client'
import Header from '../Header';

const ChatRoom = (props) => {
    const [msgs,setMsgs] = useState([]);
    const [lst,setLst] = useState([]); 
    const [userJoined,setUserJoined] = useState(false);
    const [userLeft,setUserLeft] = useState(false);
    const [newMsg,setNewMsg] = useState(false);
    const location = useLocation();
    const roomID = useParams().id;
    const socketRef = useRef();
    const chatRef = useRef();
    const index = location.state.index;
    const id = localStorage.getItem('id');
    const userName = localStorage.getItem('username');
    var rooms = props.db.getCollection('rooms');
    const history = useHistory();

    useEffect(()=>{
        socketRef.current = io("/");
        socketRef.current?.emit("join chat room",{roomID,userName,id});
        socketRef.current.on("new user",(msg) => {
            setUserJoined(true);
        });

        socketRef.current.on("receive chat message",({msg,userName}) => {
            const roomMsgs = props.db.getCollection('roomMsgs');
            const currRoomMsgs = roomMsgs?.findOne({roomID:roomID});
            const messages = currRoomMsgs?.msgs;
            if(messages){
                messages.push({sender:userName,text:msg});
                roomMsgs.update(currRoomMsgs);
                setMsgs((messages) => [...messages,{userName,msg}]);
            }
            setNewMsg(true);
        });

        socketRef.current.on("user left",() => {setUserLeft(true)});
    },[]);

    useEffect(() => {
        const roomMsgs = props.db.getCollection('roomMsgs');
        const currRoomMsgs = roomMsgs?.findOne({roomID:roomID});
        const messages = currRoomMsgs?.msgs;
        if(currRoomMsgs){
            console.log(currRoomMsgs);
            setMsgs(messages);
        }
    },[]);
    useEffect(() => {
        const userRooms = rooms?.findOne({userID:id});
        console.log(userRooms);
        if(userRooms){
            setLst(userRooms.rooms);
        }
    },[]);
    const handleSubmit = (e) => {
      e.preventDefault();
      const msg = chatRef.current?.value;
      socketRef.current.emit('send chat message',{roomID,userName,msg});
      if(chatRef.current)
        chatRef.current.value = '';
       setNewMsg(true); 
    }
    const changeSelection = (room,index) => {
        console.log("Calling change selection");
        history.push(`/chats/${room}`,{index:index+1});
        window.location.reload();
    }

    return(
        <>
        <Header change = {true}/>
        <div className = "Chat" style = {{height:"calc(100vh - 50px)",marginTop:"50px"}}>
            <div className="left-chat" >
            <div style = {{textAlign:"center",color:"white",padding:"20px",backgroundColor:"#37517e",fontSize:"30px",fontWeight:"200"}}>Your Chats</div>
            <div className = "chat-list-container" style = {{height:"calc(100% - 96px)",width:"100%",overflowY:"scroll"}}>
                {lst.map((room,index) => {
                    return(
                        <div className = "chat-tab" onClick = {() => changeSelection(room,index)} style = {{width:"100%",height:"70px"}}>Room #{index+1}</div>
                    )
                })}
            </div>
        </div>
            <div className="right" >
                <div className = "message-box">
                    <div style = {{padding:"20px",textAlign:"center",fontSize:"30px",fontWeight:"200"}}>Room #{index}</div>
                    <div className = "user-messages">
                        {msgs.map(({sender,text},index) => {
                            if(sender === userName){
                                return(
                                    <div className = "my-message">
                                        <div className = "chat-username">
                                            You
                                        </div>
                                        <div style = {{display:"flex",alignItems:"center"}}>
                                            <div className = "message-text">
                                                {text}
                                            </div>
                                            <UserAvatar style = {{marginLeft:"10px"}} size = "48" name = {userName} />
                                        </div>
                                    </div>
                                )
                            }else{
                                return(
                                    <div className = "their-message">
                                        <div className = "chat-username">
                                            {sender}
                                        </div>
                                        <div style = {{display:"flex",alignItems:"center"}}>
                                        <UserAvatar style = {{marginRight:"10px"}} size = "48" name = {sender} />
                                            <div className = "message-text">
                                                {text}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <div style = {{    width: "100%",position: "fixed",bottom: "0",height: "70px"}}>
                        <form onSubmit = {handleSubmit} style = {{height:"100%"}}>
                            <input ref = {chatRef} type = "text" placeholder = "Enter message" className = "chat-room-message"/>
                            <button className ="message-submit-button" type="submit">
                                <FontAwesomeIcon icon = {faChevronRight} />
                            </button>
                        </form>
                    </div> 
                </div>
            </div>
        </div>
        </>
    )
}

export default ChatRoom;