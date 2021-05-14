<script>
	let sc = new SignalingChannel();
	let rpc = new RTCPeerConnection({ iceServers: [{urls: ["stun:stun3.l.google.com:19302"]}]});
	rpc.createDataChannel("dataChannel");
</script>

<main>
	<p>Your invite link is:</p>
	<p>Waiting for peer to connect...</p>
</main>