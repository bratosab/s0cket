//TODO: Signaling
const WebSocket = require("ws");

const wss = new WebSocket.Server({
	port: 8060,
	perMessageDeflate: {
		zlibDeflateOptions: {

			chunkSize: 1024,
			memLevel: 7,
			level: 3
		},
		zlibInflateOptions: {
			chunkSize: 10 * 1024
		},

		clientNoContextTakeover: true,
		serverNoContextTakeover: true,
		serverMaxWindowBits: 10,
		concurrencyLimit: 10,
		threshold: 1024
	}
});

let availSessions = {};

wss.on("listening", () => {
	console.log(`Started WS Server on ${wss.options.host}:${wss.options.port}`);
})

wss.on("connection", (ws, req) => {

	ws.on("message", (msg) => {
		let data = JSON.parse(msg);
		console.log(data.type);
		
		switch(data.type){

			case "publish": //Sender session publication
				console.log("ok")
				console.log(`Session Published: ${data.token}`);
				availSessions[data.token]={
					'ip':ws.remoteAddress,
					'sdp': data.sdp,
					'ws': ws //Sender ws
				};
				break;

			case "request": //Receiver session request
				if(availSessions[data.token]){
					console.debug(`Client connection to session ${data.token}`);
					ws.emit("remoteDesc", JSON.stringify(availSessions[data.token].sdp));
				}
				else{
					console.log(`session ${data.token} doesn't exist, discarding`);
					ws.emit("requestError", "Requested session doesn't exist");
				}
				break;
			
 			case "iceExchange":
				if(data.fromSender){ //Sender ICE -> receiver
					console.log("fromSender");
					availSessions[data.token].senderIceCandidate=data.candidate
				} else {
					console.log("fromRcv");
					availSessions[data.token].ws.emit("iceExchange", JSON.stringify(data.candidate));
				}
				break;

				case "rcvDescAnswer":
					console.log("rcvDescAnswer");
					availSessions[data.token].ws.emit("rcvDescAnswer", data.answer);
					break;
 		}
		
	});

	ws.on("close", (ws) => {
		console.log('Connection with client lost.');
	});

	console.log(`Current clients: ${wss.clients.size}`)
})

wss.on("close", () => {
	console.log("shutting down..")
})