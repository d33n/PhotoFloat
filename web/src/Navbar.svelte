<script>
    import { afterUpdate } from 'svelte';
    export let currentPath = '';

    let navbar = [];

    function generateNavbar(path) {
        let i = 0;

        navbar = [{'path': '', 'name': 'Photos'}];

        /* Remove the starting '/' and then build the navbar from
         * the rest of the path */
        path = path.substring(1, path.length);
        path = path.split('/');
        path.shift();

        for (let p of path) {
            /* Build the link based on the previous entry in the navbar */
            navbar.push({'path': navbar[i].path + '/' + p, 'name': p});
            i++;
        }

        /* Second pass to append /albums to every link */
        for (let p of navbar) {
            p.path = '/albums' + p.path;
        }
    }

    afterUpdate(() => {
        generateNavbar(currentPath);
    });
</script>

<div>
{#each navbar as link}
{#if link.name != 'Photos'}
&nbsp»
{/if}
<a href={link.path}>{link.name}</a>
{/each}
</div>