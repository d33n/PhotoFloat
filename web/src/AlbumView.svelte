<script>
	import AlbumViewStore, { childAlbums, currentAlbumStore } from './AlbumViewStore.svelte';
	import Album from './Album.svelte';
	import Media from './Media.svelte';

	let displayAlbums = [];
	let currentAlbum = {'media': []};

	childAlbums.subscribe(value => {
		/* Flush the existing albums on the page when
		 * they change.
		 * Seems to be a bug somewhere in here.
		 * Going from root -> Album seems to add all elements but
		 * doesn't always update the first one. Page reload or back button
		 * don't hit this issue. */
		displayAlbums = [];
		displayAlbums = value;
	});

	currentAlbumStore.subscribe(value => {
		currentAlbum = value;
	});

	function generateAlbumPath(album) {
		let path = '/albums/';
		if (currentAlbum.path != '') {
			path += currentAlbum.path + '/';
		}
		return path += album.path
	}
</script>

<style>
	#album-view {
	}
	#subalbums {
		clear: both;
		padding-top: 1.5em;
	}
</style>

<div>
	<div id='album-view'>
	{#if currentAlbum.media}
		{#each currentAlbum.media as media}
		<Media media={media} parent={currentAlbum}/>
		{/each}
	{/if}
	</div>

	<div id='subalbums'>
		<p>Subalbums of {currentAlbum.path}:</p>
		{#each displayAlbums as album}
		<Album {album} parent={currentAlbum} path={generateAlbumPath(album)}/>
		{/each}
	</div>
</div>