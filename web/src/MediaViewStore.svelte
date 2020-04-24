<script context='module'>
    import AlbumViewStore, { albumRoute } from './AlbumViewStore.svelte';
    import { writable } from 'svelte/store';
    import { dirname, basename } from 'path';

    export const currentMediaStore = writable('');

    function getAlbumPath(mediaPath) {
        return dirname(mediaPath);
    };

    export function mediaRoute(ctx, next) {
        let newMedia = '';

        if (ctx.params.media) {
            currentMediaStore.set(basename(ctx.params.media));
        }

        ctx.params.album = dirname(ctx.params.media);
        /* The album '.' was seen when loading media from
         * the root directory. */
        if (ctx.params.album == '.') {
            ctx.params.album = '';
        }
        albumRoute(ctx, next);
    };
</script>