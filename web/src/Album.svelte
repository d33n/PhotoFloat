<script>
    import { onMount } from 'svelte';
    import { metadataHashPath, thumbnailCachePath } from './hashing.js';

	export let album = {};
	export let path = '';
    export let parent = '';

    let albumMetadata = {};
    let albumImage = '/assets/loading.gif';

    async function loadAlbumMetadata() {
        let hashed_path = '';
        if (parent.path == '') {
            hashed_path = metadataHashPath(album.path);
        } else {
            hashed_path = metadataHashPath(parent.path + "/" + album.path);
        }
        let album_loader = await fetch ('/cache/' + hashed_path + '.json');
        let albumJSON = await album_loader.json();
        album = albumJSON;
        loadAlbumPreviewImage();
    };

    async function loadAlbumPreviewImage() {
        if (album.media && album.media.length > 0) {
            albumImage = thumbnailCachePath(album.media[0]);
        }
    };

    onMount(() => {
        loadAlbumMetadata();
    });
</script>

<style>
    #album-button {
        float: left;
        display: block;
        text-align: center;
        font-size: 14px;
        background-repeat: no-repeat;
        background-position: top;
        padding: 0.5em;
    }
</style>

<a href={path} id='album-button'>
    <img title={album.path} alt={album.path} src={albumImage}/>
    <p>{album.path}</p>
</a>