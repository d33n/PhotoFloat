<script>
	import router from 'page';
	import AlbumView from './AlbumView.svelte';
	import MediaView from './MediaView.svelte';
	import AlbumViewStore, { albumRoute } from './AlbumViewStore.svelte';
	import MediaViewStore, { mediaRoute } from './MediaViewStore.svelte';
	import ErrorPage from './ErrorPage.svelte';
	import Navbar from './Navbar.svelte';

	import { basePath } from './config.js';

	let currentPage;
	let currentPath;

	function albums(ctx, next) {
		currentPage = AlbumView;
		albumRoute(ctx, next);
	}

	function media(ctx, next) {
		currentPage = MediaView;
		mediaRoute(ctx, next);
	}

	function notfound() {
		currentPage = ErrorPage;
	}

	function navigate(ctx, next) {
		currentPath = ctx.canonicalPath;
		next(ctx);
	}

	/* Router setup */
	router.base(basePath);

	/* Routing here */
	router('*', navigate);
	router('/', '/albumView');
	router('/albumView', albums);
	router('/albumView/:album*', albums);
	router('/view', '/');
	router('/view/:media*', media);
	router('*', notfound);

	/* Start Routing */
	router.start({'decodeURLComponents': false});
</script>

<Navbar {currentPath} />
<svelte:component this={currentPage}/>