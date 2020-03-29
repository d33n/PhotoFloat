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
        width: 100%;
    }
    #media-viewer {
        margin-left: auto;
        margin-right: auto;
    }
    #album-media {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 153px;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        text-align: center;
    }
</style>

{#if selectedMedia}
<div id='media-container'>
    <div id='media-viewer'>
        <Media media={selectedMedia} parent={currentAlbum} previewSize='largest' />
    </div>
    <div id='album-media'>
        <div id='thumbnails'>
        {#each currentAlbum.media as media}
        <Media {media} parent={currentAlbum} selected={media.name == selectedMedia.name}/>
        {/each}
        </div>
    </div>
</div>
{/if}