require('dotenv').config();
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './client/build')));

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
  });
}

const users = {};

const socketToRoom = {};

const usernames = {};

const usernamesSocket = {};

io.on('connection', socket => {
    socket.on("join room", ({roomID,newUserName,userID}) => {
        console.log("Called join room");
        /*A new peer tries to join the room specified by roomID 
            1. Check if the room already exists
                i. If it does, check the number of users already in the room 
                    a. If the number of users = 2, the room is at its maximum capacity => New user is denied entry into the room
                    b. If the number of users < 2, the new user is allowed to join the room => Their id is added to the list of users corresp. to
                       the room id
                ii. If not, create a new room and add current user to the list of users 
        */
        if (users[roomID]) {
            const length = users[roomID].length;
            if (length === 2) {
                socket.emit('room full');
                return;
            }
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        usernames[userID] = {newUserName};
        usernamesSocket[socket.id] = {newUserName};
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);
        const userNamesInRoom = {};
        usersInThisRoom.forEach(id => {
            userNamesInRoom[id] = usernamesSocket[id];
        })
        socket.emit("other users", userNamesInRoom);
    });

    socket.on("sending signal", newUser => {
        io.to(newUser.userInRoom).emit('new user joined', { signal: newUser.signal, callerID: newUser.newUserID, newUserName: newUser.newUserName });
    });

    
    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('signal response', { signal: payload.signal, id: socket.id });
    });

    /* Send a message to other users in the chat */

    socket.on('send-message', ({ roomID, msg, sender,userID }) => {
        const usersInThisRoom = users[roomID];
        usersInThisRoom?.forEach(id => {
            io.to(id).emit("receive-message",{msg,sender});
        })
    });

    /*
        When a user disconnects, remove the user from the list of current users corresp. to the roomID
    */

    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
        socket.broadcast.emit('user left',socket.id);
    });

});

server.listen(process.env.PORT || 8000, () => console.log('server is running on port 8000'));


