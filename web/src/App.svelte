<script>
	import router from 'page';
	import AlbumView from './AlbumView.svelte';
	import MediaView from './MediaView.svelte';
	import AlbumViewStore, { albumRoute } from './AlbumViewStore.svelte';
	import MediaViewStore, { mediaRoute } from './MediaViewStore.svelte';
	import ErrorPage from './ErrorPage.svelte';
	import Styles from './Styles.svelte';

	let currentPage;

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

	router('/', '/albums');
	router('/albums', albums);
	router('/albums/:album*', albums);
	router('/view', '/');
	router('/view/:media*', media);
	router('*', notfound);
	router.start();
</script>

<svelte:component this={currentPage}/>