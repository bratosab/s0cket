//TODO: Signaling
const WebSocket = require("ws");

const wss = new WebSocket.Server({port:8080});

wss.on("session", ()=>{})