<script>
    import { onMount, afterUpdate } from 'svelte';
    import { thumbnailCachePath } from './hashing.js';
    export let media = {};
    export let parent = {};
    export let previewSize = 'smallest';
    export let selected = false;

    let previewImage = '/assets/loading.gif';
    let cssStyle = 'media';

    function loadPreviewImage() {
        previewImage = thumbnailCachePath(media, previewSize);
    };

    onMount(() => {
        loadPreviewImage();
    });

    afterUpdate(() => {
        /* This happens when in the MediaView when someone
         * selects a new image from the preview bar below.
         * Need to trigger an update of the preview image. */
        loadPreviewImage();
        if (selected) {
            cssStyle = 'media-selected';
        } else {
            cssStyle = 'media';
        }
    });
</script>

<style>
    #media {
        padding: 0.1em;
    }
    #media-selected {
        padding: 0.1em;
        border: 3px inset yellow;
        box-sizing: border-box;
    }
</style>

<a href={'/view/' + parent.path + '/' + media.name}>
    <img title={media.name} alt={media.name} src={previewImage} id={cssStyle}/>
</a>