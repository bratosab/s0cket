import Home from './routes/Home.svelte';
import fileUpload from './routes/FileUpload.svelte';
import NotFound from './routes/NotFound.svelte';
import WaitReceive from './routes/UwaitForDownload.svelte';
import WaitUpload from './routes/UwaitForUpload.svelte';

export default{
	'/':Home,
	'/fileUpload':fileUpload,
	'/waiting/receive': WaitReceive,
	'/waiting/send': WaitUpload,
	'*': NotFound //catchall
}