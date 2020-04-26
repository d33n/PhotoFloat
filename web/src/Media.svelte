<script>
    import { onMount, afterUpdate } from 'svelte';
    import { thumbnailCachePath } from './hashing.js';
    import MediaOverlay from './MediaOverlay.svelte';
    import router from 'page';

    export let media = {};
    export let parent = {};
    export let previewSize = 'smallest';
    export let selected = false;

    let previewImage = router.base() + '/assets/loading.gif';
    let imgStyle = 'media';
    let aStyle = 'media';

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
            imgStyle = 'media-selected';
        } else if (previewSize == 'largest') {
            imgStyle = 'media-preview';
        } else {
            imgStyle = 'media';
        }
    });

    function get_parent_path(parent) {
        /* An extra '/' on the path is a problem for the
         * root path when the path is ''. Only for children
         * of the root do we need to append the '/'. */
        if (parent != undefined && parent.path != '') {
            return parent.path + '/';
        }

        return '';
    }
</script>

<style>
    #media {
        display: flex;
    }
    #media-preview {
        display: flex;
        object-fit: contain;
    }
    #media-selected {
        border: 3px inset yellow;
        box-sizing: border-box;
    }
</style>

{#if previewSize == 'largest'}
    <MediaOverlay originalPath={router.base() + '/albums/' + get_parent_path(parent) + media.name} {media} fullscreenImage={previewImage}/>
{/if}
<a href={router.base() + '/view/' + get_parent_path(parent) + media.name} id={aStyle}>
    <img title={media.name} alt={media.name} src={previewImage} id={imgStyle}/>
</a>