<script>
    import AlbumViewStore, { albumRoute, currentAlbumStore } from './AlbumViewStore.svelte';
    import MediaViewStore, { currentMediaStore } from './MediaViewStore.svelte';
    import Media from './Media.svelte';
    import { tick } from 'svelte';

    let currentAlbum = {'media': []};
    let mediaPath = '';
    let selectedMedia = null;

    function loadMediaFromAlbum() {
        for  (let m of currentAlbum.media) {
            if (m.name == mediaPath) {
                selectedMedia = m;
            }
        }
    };

    currentAlbumStore.subscribe(value => {
        currentAlbum = value;
        console.log('Loaded album: ' + JSON.stringify(currentAlbum, null, 2));
        loadMediaFromAlbum();
    });

    currentMediaStore.subscribe(value => {
        mediaPath = value;
        console.log('Attempting to load: ' + mediaPath);
    });
</script>

<style>
    #media-viewer {
        position: absolute;
        bottom: 150px;
        top: 1.75em;
        overflow: hidden;
        margin-bottom: 0.5em;
        background-color: #111111;
        left: 0;
        right: 0;
        text-align: center;
    }
    #album-media {
        position: absolute;
        bottom: 0;
        height: 150px;
        overflow: auto;
        text-align: center;
    }
</style>

{#if selectedMedia}
<div id='media-viewer'>
<Media media={selectedMedia} parent={currentAlbum} previewSize='largest' />
</div>
<div id='album-media'>
{#each currentAlbum.media as media}
<Media {media} parent={currentAlbum} />
{/each}
</div>
{/if}