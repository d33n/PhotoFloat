<script>
    import { onMount } from 'svelte';
    import { thumbnailCachePath } from './hashing.js';
    export let media = {};

    let previewImage = '/assets/loading.gif';

    async function loadPreviewImage() {
        previewImage = thumbnailCachePath(media);
    };

    onMount(() => {
        loadPreviewImage();
    });
</script>

<style>
    #media-preview {
        float: left;
        display: block;
        text-align: center;
        font-size: 14px;
        background-repeat: no-repeat;
        background-position: top;
        padding: 0.1em;
    }
</style>

<div id='media-preview'>
    <img title={media.name} alt={media.name} src={previewImage}/>
    <p>{media.name}</p>
</div>