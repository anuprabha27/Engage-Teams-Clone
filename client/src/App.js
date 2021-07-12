import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from './LandingPage/Landing';
import CreateRoom from "./Room/CreateRoom";
import LoginForm from './Login/Login';
import RegistrationForm from './Login/Register';
import {AuthProvider} from './Contexts/AuthContext';
import RoomFull from './Error/roomFull';
import Error404 from './Error/404';
import UserLeft from './Error/userLeft';
import UserLogin from './Error/userLogin';
import Room from "./Room/CallPage";
import Loki from 'lokijs';
import firebase from 'firebase';
import Chat from './Chats/Chats';
import ChatRoom from './Chats/ChatRoom';

function App() {
  // var db = new Loki('localdb.db',{
  //   env:"BROWSER",
  //   autosave:true,
  //   autoload:true,
  //   autoloadCallback:dbInitialize
  // });
  // function dbInitialize(){
  //     if(!db.getCollection('roomMsgs'))
  //         db.addCollection('roomMsgs');
  //     if(!db.getCollection('rooms'))
  //         db.addCollection('rooms');
  // }
  var db = firebase.firestore();
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route exact path = '/'>
              <Landing />
            </Route>
            <Route exact path = "/error/roomFull">
                < RoomFull />
              </Route>
            <Route exact path = '/login'>
              <LoginForm />
            </Route>
            <Route exact path = "/error/404">
                <Error404 />
            </Route>
            <Route exact path = "/error/userLeft">
                <UserLeft />
            </Route>
            <Route exact path = '/register'>
              <RegistrationForm />
            </Route>
            <Route exact path = '/startCall'>
              <CreateRoom />
            </Route>
            <Route exact path = '/chats'>
              <Chat db = {db}/>
            </Route>
            <Route exact path = '/chats/:id'>
              <ChatRoom db = {db} />
            </Route>
            <Route exact path="/:id">
              {localStorage.getItem('isLoggedIn')?<Room db = {db}/>:<UserLogin/>}
            </Route>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
