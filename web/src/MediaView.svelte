<script>
    import AlbumViewStore, { albumRoute, currentAlbumStore } from './AlbumViewStore.svelte';
    import MediaViewStore, { currentMediaStore } from './MediaViewStore.svelte';
    import Media from './Media.svelte';
    import { tick } from 'svelte';
    import router from 'page';

    let currentAlbum = {'media': []};
    let mediaPath = '';
    let selectedMedia = null;
    let currentMediaIndex = 0;
    let backLink = '';
    let nextLink = '';

    function updateLinks() {
        if (currentMediaIndex == 0) {
            backLink = '';
        } else {
            backLink = router.base() + '/view/' + currentAlbum.path.replace("%20", " ") + '/' + currentAlbum.media[currentMediaIndex-1].name;
        }
        if (currentMediaIndex == currentAlbum.media.length-1) {
            nextLink = '';
        } else {
            nextLink = router.base() + '/view/' + currentAlbum.path.replace("%20", " ") + '/' + currentAlbum.media[currentMediaIndex+1].name;
        }
    }

    function loadMediaFromAlbum() {
        let i = 0;
        for (let m of currentAlbum.media) {
            if (m.name == mediaPath) {
                currentMediaIndex = i;
                selectedMedia = m;
                updateLinks();
            }
            i++;
        }
    };

    function handleKeyPress(event) {
        let key = event.key;
        if (key == "ArrowLeft" || key == "Left") {
            if (backLink != '') {
                router(backLink);
            }
        } else if (key == "ArrowRight" || key == "Right") {
            if (nextLink != '') {
                router(nextLink);
            }
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
        flex-shrink: 0;
        flex-flow: column;
        justify-content: flex-start;
    }
    #album-media {
        overflow-x: auto;
        white-space: nowrap;
        text-align: center;
        display: flex;
        flex: 0 0 auto;
    }
    #album-thumbs {
        display: flex;
        overflow-x: auto;
        min-height: 165px;
        max-height: 165px;
        height: 165px;
        margin-top: auto;
        margin-bottom: 0px;
    }
    @media handheld, only screen and (max-height: 480px) {
        #album-media {
            display: none;
        }
    }
    #media-view-container {
        display: flex;
        flex-flow: row;
        justify-content: center;
        background-color: #111111;
        flex: 1 1 auto;
        min-width: 0;
        min-height: 0;
        overflow: hidden;
    }
    /* Adding overflow:hidden causes the image to be fixed in the page
     * but also extends the height of the div, looks like it's trying to
     * accomodate the <a> tag on the image... */
    #media-filler {
        display: flex;
        min-width: 0;
        min-height: 0;
        flex-shrink: 1;
        justify-content: center;
        align-content: center;
    }
    #preview-container {
        min-height: 0;
        display: flex;
        align-items: center;
        flex-flow: row;
        flex-shrink: 1;
    }
    #media-viewer {
        flex-shrink: 1;
        display: flex;
        flex: 1;
        max-height: 100%;
        max-width: 100%;
    }
    #next,
    #back {
        display: flex;
        justify-content: left;
        align-items: center;
        font-size: 10em;
        line-height: 0;
        font-weight: bold;
        opacity: 0.35;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=35)";
        filter: alpha(opacity=35);
    }
</style>

<svelte:window on:keydown={handleKeyPress}/>

{#if selectedMedia}
<div id='media-container'>
    <div id='album-thumbs'>
        <div id='album-media'>
        {#each currentAlbum.media as media}
        <Media {media} parent={currentAlbum} selected={media.name == selectedMedia.name}/>
        {/each}
        </div>
    </div>
    <div id='media-view-container'>
        <div id='media-filler'>
            <a id="back" href={backLink}><p/>&lsaquo;</a>
        </div>
        <div id='preview-container'>
            <div id='media-viewer'>
                <Media media={selectedMedia} parent={currentAlbum} previewSize='largest' />
            </div>
        </div>
        <div id='media-filler'>
            <a id="next" href={nextLink}><p/>&rsaquo;</a>
        </div>
    </div>
</div>
{/if}
