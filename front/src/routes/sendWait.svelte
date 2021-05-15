<script>

	let socket = new WebSocket("ws://localhost:8060");
	socket.onopen = async () => {
		console.log("WS OK");

		let rpc = new RTCPeerConnection({
			iceServers: [{ urls: ["stun:stun3.l.google.com:19302"] }],
		});

		let dataChannel = rpc.createDataChannel("sendDataChannel");
		dataChannel.binaryType = "arraybuffer";

		rpc.addEventListener("icecandidate", async (e) => {
			console.log("Local ICE candidate: ", e.candidate);

			//Emit ws message with candidate for the sender
			socket.send(JSON.stringify({
				type:"iceExchange",
				fromSender:true,
				token: "123",
				candidate: e.candidate
			}));
		});

		socket.addEventListener("rcvDescAnswer", async (e) => {
			await rpc.setRemoteDescription(e);
		});

		socket.onerror=(e)=>{
			console.error(e);
		}

		await rpc
			.createOffer()
			.then(async (offer) => {
				await rpc.setLocalDescription(offer);
			})
			.then(()=>{
				socket.send(
					JSON.stringify({
						type: "publish",
						token: "123",
						sdp: rpc.localDescription,
						sender: "root",
					})
				);
			})
			.catch((e) => {
				console.error(e);
			});
	};
</script>

<main>
	<p>Your invite link is:</p>
	<p>Waiting for peer to connect...</p>
</main>
