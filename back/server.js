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
		console.info("sessionPublish");
		console.log(JSON.parse(msg));

		availSessions[msg.token] = {
			'ip': req.socket.remoteAddress,
			'sdp': msg.sdp
		};
	});

	ws.on("close", (ws) => {
		console.log('Connection with client lost.');
	});


	ws.on("publish", (ws, req) => {
		let data = JSON.parse(msg.data)
		console.log("sessionPublish");
		console.log(data);
		availSessions["TOKEN"] = req.socket.remoteAddress;
	});

	console.log(`Current clients: ${wss.clients.size}`)
})

wss.on("close", () => {
	console.log("shutting down..")
})