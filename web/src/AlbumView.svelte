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
		position: absolute;
		top: 2.5em;
		padding: 1em;
	}
	#photo-view {
		position: absolute;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        padding: 0 !important;
        text-align: center;
	}
</style>

<p>Albums from {currentAlbum.path} go here:</p>
<div id='album-view'>
	<div id='thumbnails'>
		{#each displayAlbums as album}
		<Album {album} parent={currentAlbum} path={generateAlbumPath(album)}/>
		{/each}
	</div>
</div>

{#if currentAlbum.media}
<p>Media:</p>
<div id='photo-view'>
	<div id='thumbnails'>
		{#each currentAlbum.media as media}
		<Media media={media}/>
		{/each}
	</div>
</div>
{/if}