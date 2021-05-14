import Home from './routes/Home.svelte';
import fileUpload from './routes/FileUpload.svelte';
import notFound from './routes/NotFound.svelte';

export default{
	'/':Home,
	'/fileUpload':fileUpload,
	'*': notFound //catchall
}