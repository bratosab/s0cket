<script>
	let file;

	function handleFileDragEnter(e){}

	function handleFileDragLeave(e){}

	function handleFileDrop(e){
		let dt = e.dataTransfer;
		file = dt.files[0];
	}

	function uploadFile(e){
		alert(1);
	}

</script>

<main>
	<div class="container mx-auto" on:dragenter={handleFileDragEnter} on:dragleave={handleFileDragLeave} on:drop={handleFileDrop}>
		<label for="fileSelector">Upload a file</label>
		<input type="file" name="fileSelector" bind:value={file}>
		<button type="submit" on:click|once={uploadFile}>Upload file</button>
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>