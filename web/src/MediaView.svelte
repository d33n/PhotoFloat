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
        padding: 0;
        margin: 0;
        height: 100%;
        display: flex;
        flex-flow: column;
        justify-content: flex-start;
        flex-shrink: 0;
    }
    #album-media {
        height: 165px;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        text-align: center;
        display: flex;
        flex-shrink: 0;
        max-height: 165px;
        flex-flow: row nowrap;
    }
    #media-view-container {
        display: flex;
        flex-flow: row;
        justify-content: center;
        background-color: #111111;
    }
    /* Adding overflow:hidden causes the image to be fixed in the page
     * but also extends the height of the div, looks like it's trying to
     * accomodate the <a> tag on the image... */
    #media-filler {
        min-width: 0;
        min-height: 0;
        flex-shrink: 1;
    }
    #preview-container {
        min-height: 0;
        display: flex;
        align-items: center;
        flex-flow: row;
        flex-shrink: 1;
    }
    #media-viewer {
        min-height: 0;
        flex-shrink: 1;
    }
</style>

{#if selectedMedia}
<div id='media-container'>
    <div id='album-media'>
        {#each currentAlbum.media as media}
        <Media {media} parent={currentAlbum} selected={media.name == selectedMedia.name}/>
        {/each}
    </div>
    <div id='media-view-container'>
        <div id='center-filler'/>
        <div id='preview-container'>
            <div id='media-viewer'>
                <Media media={selectedMedia} parent={currentAlbum} previewSize='largest' />
            </div>
        </div>
        <div id='center-filler'/>
    </div>
</div>
{/if}
