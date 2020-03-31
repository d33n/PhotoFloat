<script>
    import AlbumViewStore, { albumRoute, currentAlbumStore } from './AlbumViewStore.svelte';
    import MediaViewStore, { currentMediaStore } from './MediaViewStore.svelte';
    import Media from './Media.svelte';
    import { tick } from 'svelte';

    let currentAlbum = {'media': []};
    let mediaPath = '';
    let selectedMedia = null;

    function loadMediaFromAlbum() {
        let i = 0;
        for (let m of currentAlbum.media) {
            if (m.name == mediaPath) {
                selectedMedia = m;
            }
            i++;
        }
    };

    currentAlbumStore.subscribe(value => {
        currentAlbum = value;
        loadMediaFromAlbum();
    });

    currentMediaStore.subscribe(value => {
        mediaPath = value;
    });
</script>

<style>
    #media-container {
        margin: 0;
        height: 100%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        flex-shrink: 0;
    }
    #album-media {
        height: 153px;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        text-align: center;
        flex-shrink: 0;
        max-height: 153px;
    }
    #media-viewer {
        min-height: 0;
        flex-shrink: 1;
        height: 100%;
        align-items: flex-start;
        /* Note there is an issue with centering the main photo being viewed.
         * CSS centering is based off of the size before scaling which
         * seems to skew the location of the image on screen.
         * Adding 'display: flex' to this div causes centering to work
         * but the image now expands past the size of the div... */
        align-self: center;
    }
</style>

{#if selectedMedia}
<div id='media-container'>
    <div id='album-media'>
        <div id='thumbnails'>
        {#each currentAlbum.media as media}
        <Media {media} parent={currentAlbum} selected={media.name == selectedMedia.name}/>
        {/each}
        </div>
    </div>
    <div id='media-viewer'>
        <Media media={selectedMedia} parent={currentAlbum} previewSize='largest' />
    </div>
</div>
{/if}