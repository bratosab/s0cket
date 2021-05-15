<script>
import {push} from 'svelte-spa-router'
</script>

<main>
	<h1>s0cket!</h1>
	<div class="container mx-auto">
		<button on:click|once={()=> push("/fileUpload")}>Initiate a session</button>
		<button on:click|once={()=> push("/waiting/receive")}>Initiate download</button>
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>