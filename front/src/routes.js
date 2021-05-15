import Home from './routes/Home.svelte';
import fileUpload from './routes/FileUpload.svelte';
import NotFound from './routes/NotFound.svelte';
import rcvWait from './routes/rcvWait.svelte';
import sendWait from './routes/sendWait.svelte';

export default{
	'/':Home,
	'/fileUpload':fileUpload,
	'/waiting/receive': rcvWait,
	'/waiting/send': sendWait,
	'*': NotFound //catchall
}