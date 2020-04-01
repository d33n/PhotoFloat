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
            p.name = p.name.replace("%20", " ");
        }
    }

    afterUpdate(() => {
        generateNavbar(currentPath);
    });
</script>

<style>
    #header {
        display: flex;
        flex-direction: row;
        width: 100%;
    }
    #navbar {
        height: 1.3em;
        flex-grow: 0;
        flex-shrink: 0;
    }
    #middle-filler {
        flex-grow: 1;
        flex-shrink: 1;
    }
    #about {
        flex-direction: row-reverse;
        text-shadow: rgba(0, 0, 0, 0.5) -1px 0, rgba(0, 0, 0, 0.3) 0 -1px,
                     rgba(255, 255, 255, 0.5) 0 1px, rgba(0, 0, 0, 0.3) -1px -2px;
        color: #ffad27;
    }
</style>

<div id='header'>
    <div id='navbar'>
        {#each navbar as link}
            {#if link.name != 'Photos'}
            &nbsp»
            {/if}
            <a href={link.path}>{link.name}</a>
        {/each}
    </div>
    <div id='middle-filler'/>
    <div id='about'>
        Powered by <a href='https://github.com/mremallin/PhotoFloat' target='_blank'>PhotoFloat</a>
    </div>
</div>
