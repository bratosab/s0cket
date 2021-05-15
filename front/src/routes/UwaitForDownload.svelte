<script>
	let socket = new WebSocket("ws://localhost:8060");
	socket.onopen = async () => {
		console.log("WS OK");

		let rpc = new RTCPeerConnection({
			iceServers: [{ urls: ["stun:stun3.l.google.com:19302"] }],
		});

		let dataChannel = rpc.createDataChannel("sendDataChannel");
		dataChannel.binaryType = "arraybuffer";

		localConnection.addEventListener("icecandidate", async (event) => {
			console.log("Local ICE candidate: ", event.candidate);
			await remoteConnection.addIceCandidate(event.candidate);
		});

		await rpc
			.createOffer()
			.then(async (offer) => {
				console.log(offer);
				await rpc.setLocalDescription(offer);
				socket.send(
					JSON.stringify({
						type: "publish",
						token: "123",
						type: "file-offer",
						sdp: rpc.localDescription,
						sender: "root",
					})
				);
				return offer;
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
