import { useRef,useState,useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import './Chats.css';
import Header from '../Header';

export default function Chat(props) {
    const [lst,setLst] = useState([]);
    const id = localStorage.getItem('id');
    var rooms = props.db.getCollection('rooms');
    const history = useHistory();
    useEffect(() => {
        const userRooms = rooms?.findOne({userID:id});
        console.log(userRooms);
        if(userRooms){
            setLst(userRooms.rooms);
        }
    },[]);
    const changeSelection = (room,index) => {
        console.log("Calling change selection");
        history.push(`/chats/${room}`,{index:index+1});
    }
    return (
    <>
    <Header change = {true}/>
      <div style = {{width:"30%",height:"calc(100vh - 50px)",marginTop:"50px"}}>
        <div className="left" >
            <div style = {{textAlign:"center",color:"white",padding:"20px",backgroundColor:"#37517e",fontSize:"30px",fontWeight:"200"}}>Your Chats</div>
            <div className = "chat-list-container" style = {{height:"calc(100% - 96px)",width:"100%",overflowY:"scroll"}}>
                {lst.map((room,index) => {
                    return(
                        <div className = "chat-tab" onClick = {() => changeSelection(room,index)} style = {{width:"100%",height:"70px"}}>Room #{index+1}</div>
                    )
                })}
            </div>
        </div>
        </div>
        </>
    );
}