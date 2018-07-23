"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path")
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const app = express();
//initialize a simple http server
const server = http.createServer(app);

//client storage
var CLIENTS = [];

//accessing public folder
app.use(express.static(path.join(__dirname,'/public')));

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
    //store client that connect to this Server
    //push it to object CLIENTS
    CLIENTS.push(ws);

    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {
        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);

        //notify to all clients available
        for (var i = 0; i < CLIENTS.length; i++) {
          CLIENTS[i].send(`server received: ${message}`);
          console.log('message broadcast');
        }
    });
    //send immediatly a feedback to the incoming connection
    ws.send('Hi there, I am a WebSocket server');
});
//start our server
server.listen(process.env.PORT || 3030, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
//# sourceMappingURL=server.js.map
