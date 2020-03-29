<script>
    import { onMount, afterUpdate } from 'svelte';
    import { thumbnailCachePath } from './hashing.js';
    export let media = {};
    export let parent = {};
    export let previewSize = 'smallest';

    let previewImage = '/assets/loading.gif';
    let cssStyle = '';

    function loadPreviewImage() {
        previewImage = thumbnailCachePath(media, previewSize);
    };

    function updateCSSStyle() {
        if (previewSize == 'smallest') {
            cssStyle = '';
        } else if (media.size[0] > media.size[1]) {
            cssStyle = "width: 100%; height: auto;";
        } else {
            cssStyle = "width: auto; height: 100%;";
        }
    };

    onMount(() => {
        loadPreviewImage();
        updateCSSStyle();
    });

    afterUpdate(() => {
        /* This happens when in the MediaView when someone
         * selects a new image from the preview bar below.
         * Need to trigger an update of the preview image. */
        loadPreviewImage();
        updateCSSStyle();
    });
</script>

<a href={'/view/' + parent.path + '/' + media.name}>
    <img title={media.name} alt={media.name} src={previewImage} style={cssStyle}/>
</a>