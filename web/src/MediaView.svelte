<script>
    import AlbumViewStore, { albumRoute, currentAlbumStore } from './AlbumViewStore.svelte';
    import MediaViewStore, { currentMediaStore } from './MediaViewStore.svelte';
    import Media from './Media.svelte';

    let currentAlbum = {'media': []};
    let mediaPath = '';
    let selectedMedia = null;

    function loadMediaFromAlbum() {
        for  (let m of currentAlbum.media) {
            if (m.name == mediaPath) {
                selectedMedia = m;
                console.log('Loading media:' + selectedMedia);
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
</style>

{#if selectedMedia}
<Media media={selectedMedia} parent={currentAlbum} previewSize='largest' />
{/if}