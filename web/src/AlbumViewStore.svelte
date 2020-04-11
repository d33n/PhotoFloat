<script context="module">
	import { writable } from 'svelte/store';
    import { metadataHashPath } from './hashing.js';
    import router from 'page';

	export const currentAlbumStore = writable({'media': [], 'albums': []});
	export const childAlbums = writable([]);

	currentAlbumStore.subscribe(album => {
		childAlbums.set(album.albums);
	});

	async function loadAlbumJSON(jsonPath) {
		let json_loader = await fetch(jsonPath);
		let loadedJSON = await json_loader.json();
		currentAlbumStore.set(loadedJSON);
	};

	function loadAlbum(newAlbumPath) {
        let hashedPath = metadataHashPath(newAlbumPath);
		loadAlbumJSON(router.base() + '/cache/' + hashedPath + '.json');
	};

	export function albumRoute(ctx, next) {
		let newAlbum = '';

		if (ctx.params.album) {
			newAlbum = ctx.params.album;
		}

		loadAlbum(newAlbum);
	};
</script>
