<script>
    import AlbumViewStore, { childAlbums, currentAlbumStore } from './AlbumViewStore.svelte';
    import Album from './Album.svelte';
    import Media from './Media.svelte';
    import { tick } from 'svelte';
    import router from 'page';

    let displayAlbums = [];
    let currentAlbum = {'media': []};

    childAlbums.subscribe(async value => {
        /* Flush the existing albums on the page when
         * they change.
         * Seems to be a bug somewhere in here.
         * Going from root -> Album seems to add all elements but
         * doesn't always update the first one. Page reload or back button
         * don't hit this issue. */
        displayAlbums = [];
        await tick();
        displayAlbums = value;
    });

    currentAlbumStore.subscribe(value => {
        currentAlbum = value;
    });

    function generateAlbumPath(album) {
        let path = router.base() +'/albumView/';
        if (currentAlbum.path != '') {
            path += currentAlbum.path + '/';
        }
        return path += album.path
    }
</script>

<style>
    #album-view {
        display: flex;
        flex-wrap: wrap;
        overflow-y: auto;
    }
    #subalbums {
        clear: both;
        padding-top: 1.5em;
        overflow-y: auto;
    }
</style>

<div id='album-view'>
{#if currentAlbum.media}
    {#each currentAlbum.media as media}
    <Media media={media} parent={currentAlbum}/>
    {/each}
{/if}
</div>

<div id='subalbums'>
    {#if displayAlbums.length > 0}
        <p>Albums</p>
        {#each displayAlbums as album}
        <Album {album} parent={currentAlbum} path={generateAlbumPath(album)}/>
        {/each}
    {/if}
</div>