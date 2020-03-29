<script>
    import { onMount, afterUpdate } from 'svelte';
    import { thumbnailCachePath } from './hashing.js';
    export let media = {};
    export let parent = {};
    export let previewSize = 'smallest';

    let previewImage = '/assets/loading.gif';

    function loadPreviewImage() {
        previewImage = thumbnailCachePath(media, previewSize);
    };

    function getCSSStyle() {
        if (previewSize == 'smallest') {
            return '';
        }

        if (media.size[0] > media.size[1]) {
            return "width: 100%; height: auto;";
        }

        return "width: auto; height: 100%;";
    };

    onMount(() => {
        loadPreviewImage();
    });

    afterUpdate(() => {
        /* This happens when in the MediaView when someone
         * selects a new image from the preview bar below.
         * Need to trigger an update of the preview image. */
        loadPreviewImage();
    });
</script>

<a href={'/view/' + parent.path + '/' + media.name}>
    <img title={media.name} alt={media.name} src={previewImage} style={getCSSStyle()}/>
</a>