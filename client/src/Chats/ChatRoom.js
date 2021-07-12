import { useLocation,useParams,useHistory } from "react-router";
import { useState,useEffect,useRef } from "react";
import UserAvatar from "react-user-avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase";
import './Chats.css';
import Header from '../Header';

const ChatRoom = (props) => {
    const [msgs,setMsgs] = useState([]);
    const [lst,setLst] = useState([]); 
    const [newMsg,setNewMsg] = useState();
    const location = useLocation();
    const roomID = useParams().id;
    const chatRef = useRef();
    const index = location.state.index;
    const id = localStorage.getItem('id');
    const userName = localStorage.getItem('username');
    const history = useHistory();

    useEffect(() => {
        const roomMsgs = props.db.collection('Message').doc(roomID);
        roomMsgs.get().then((doc) => {
            if(doc.exists){
                roomMsgs.onSnapshot((doc) => {
                    const msgs = doc.data().messages;
                    setMsgs(msgs);
                    console.log(msgs);
                })
            }
        })
    },[]);
    useEffect(() => {
        var rooms = props.db.collection('Rooms').doc(id);
        rooms.get().then((doc) => {
            if(doc.exists){
                const userRooms = doc.data().Rooms;
                setLst(userRooms);
                console.log(doc.data().Rooms);
            }
        })
    },[]);
    const handleSubmit = (e) => {
      e.preventDefault();
      const msg = chatRef.current?.value;
      const roomMsgs = props.db.collection('Message').doc(roomID);
      roomMsgs.get().then((doc) => {
          if(doc.exists){
            roomMsgs.update({
                messages: firebase.firestore.FieldValue.arrayUnion({
                    sender: id,
                    msg: msg,
                    name: userName
                })
            });
          }
      })
       chatRef.current.value = '';
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
            <div className="right">
                <div className = "message-box" style = {{overflowY:"scroll"}}>
                    <div style = {{padding:"20px",textAlign:"center",fontSize:"30px",fontWeight:"200"}}>Room #{index}</div>
                    <div className = "user-messages">
                        {msgs.map(({sender,msg,name},index) => {
                            console.log(msg);
                            if(sender === id){
                                return(
                                    <div className = "my-message">
                                        <div className = "chat-username">
                                            You
                                        </div>
                                        <div style = {{display:"flex",alignItems:"center"}}>
                                            <div className = "message-text">
                                                {msg}
                                            </div>
                                            <UserAvatar style = {{marginLeft:"10px"}} size = "48" name = {userName} />
                                        </div>
                                    </div>
                                )
                            }else{
                                return(
                                    <div className = "their-message">
                                        <div className = "chat-username">
                                            {name}
                                        </div>
                                        <div style = {{display:"flex",alignItems:"center"}}>
                                        <UserAvatar style = {{marginRight:"10px"}} size = "48" name = {name} />
                                            <div className = "message-text">
                                                {msg}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                         <div style = {{    width: "100%",position: "fixed",bottom: "0",height: "65px"}}>
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
        </div>
        </>
    )
}

export default ChatRoom;