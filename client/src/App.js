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
import firebase from 'firebase';
import Chat from './Chats/Chats';
import ChatRoom from './Chats/ChatRoom';

function App() {
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
              {localStorage.getItem('isLoggedIn')?<Chat db = {db}/>:<UserLogin/>}
            </Route>
            <Route exact path = '/chats/:id'>
              {localStorage.getItem('isLoggedIn')?<ChatRoom db = {db}/>:<UserLogin/>}
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
