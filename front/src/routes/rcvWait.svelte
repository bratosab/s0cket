<script>
	let socket = new WebSocket("ws://localhost:8060");

	socket.onopen = async () => {
		console.log("WS OK");

		let rpc = new RTCPeerConnection({
			iceServers: [{ urls: ["stun:stun3.l.google.com:19302"] }],
		});

		let dataChannel;

		rpc.addEventListener("icecandidate", async (event) => {
			console.log("Remote ICE candidate: ", event.candidate);
			if (event.candidate) {
				event.candidate.usernameFragment = null; //Bypass ufrag verification
				await rpc.addIceCandidate(event.candidate);
			} 
			
		});

		rpc.addEventListener("datachannel", (e) => {
			console.log("Received dChannel");
			dataChannel = e.channel;
			receiveChannel.binaryType = "arraybuffer";
		});

		//Triggered when the server has acknowledged our request
		//TOFIX: plain doesn't fire
		socket.addEventListener("message", async (msg) => {
			let data = JSON.parse(msg.data);

			switch (data.type) {
				case "remoteDesc":
					console.log("remoteDesc");
					console.log(data.sdp);
					await rpc.setRemoteDescription(data.sdp);
					await rpc.createAnswer().then(async (answer) => {
						await rpc.setLocalDescription(answer);
						socket.send(
							JSON.stringify({
								type: "rcvDescAnswer",
								token: "123",
								answer: answer,
								sender: "root",
							})
						);
					});
					break;

				case "iceExchange":
					await rpc.addIceCandidate(e.candidate);
					break;

				case "requestError":
					console.log("reqErr");
					break;
			}
		});

		socket.onerror = (e) => {
			console.error(e);
		};

		//Send connection request with the requested session's token
		socket.send(
			JSON.stringify({
				type: "request",
				token: "123",
				sender: "root",
			})
		);
	};
</script>

<main>
	<p>Waiting for client to connect to session...</p>
</main>
