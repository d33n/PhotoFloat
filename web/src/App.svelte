<script>
	import router from 'page';
	import AlbumView from './AlbumView.svelte';
	import AlbumViewStore, { albumRoute } from './AlbumViewStore.svelte';
	import ErrorPage from './ErrorPage.svelte';
	import Styles from './Styles.svelte';

	let currentPage;

	function albums(ctx, next) {
		currentPage = AlbumView;
		albumRoute(ctx, next);
	}

	function notfound() {
		currentPage = ErrorPage;
	}

	router('/', '/albums');
	router('/albums', albums);
	router('/albums/:album*', albums);
	router('*', notfound);
	router.start();
</script>

<svelte:component this={currentPage}/>