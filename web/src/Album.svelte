<script>
    import { onMount } from 'svelte';
    import { metadataHashPath, thumbnailCachePath } from './hashing.js';
    import { basename } from 'path';
    import router from 'page';

	export let album = {};
	export let path = '';
    export let parent = '';

    let albumMetadata = {};
    let albumImage = router.base() + '/assets/loading.gif';

    async function loadAlbum() {
        let hashed_path = '';
        if (parent.path == '') {
            hashed_path = metadataHashPath(album.path);
        } else {
            hashed_path = metadataHashPath(parent.path + "/" + album.path);
        }
        let album_loader = await fetch (router.base() + '/cache/' + hashed_path + '.json');
        let albumJSON = await album_loader.json();
        album = albumJSON;
        loadAlbumPreviewImage();
    };

    /* For a given album, recurse and find the first media to use
     * for a preview image */
    async function findFirstMedia(search_album) {
        if (search_album && search_album.media.length > 0) {
            return search_album.media[0];
        }
        if (search_album && search_album.albums.length > 0) {
            let m = null;
            for (let subalbum of search_album.albums) {
                let subalbumMetadataLoader = await fetch (router.base() + '/cache/' + metadataHashPath(search_album.path + '/' + subalbum.path) + '.json');
                let albumJSON = await subalbumMetadataLoader.json()
                m = await findFirstMedia(albumJSON);
                if (m != null) {
                    break;
                }
            }
            return m;
        }

        return null;
    };

    async function loadAlbumPreviewImage() {
        let media = await findFirstMedia(album);
        albumImage = thumbnailCachePath(media);
    };

    onMount(() => {
        loadAlbum();
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
    <img title={basename(album.path)} alt={basename(album.path)} src={albumImage}/>
    <p>{basename(album.path)}</p>
</a>