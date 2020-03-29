<script>
    import { onMount } from 'svelte';
    import { thumbnailCachePath } from './hashing.js';
    export let media = {};
    export let parent = {};
    export let previewSize = 'smallest';

    let previewImage = '/assets/loading.gif';

    async function loadPreviewImage() {
        previewImage = thumbnailCachePath(media, previewSize);
    };

    onMount(() => {
        loadPreviewImage();
    });
</script>

<style>
    #media-thumb {
        float: left;
        display: block;
        text-align: center;
        font-size: 14px;
        background-repeat: no-repeat;
        background-position: top;
        padding: 0.1em;
    }
</style>

<a href={'/view/' + parent.path + '/' + media.name} id='media-thumb'>
    <img title={media.name} alt={media.name} src={previewImage}/>
    <p>{media.name}</p>
</a>