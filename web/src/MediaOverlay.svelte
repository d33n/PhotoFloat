<script>
    import { fade } from 'svelte/transition';

    let visible = false;

    function mouseEnterHandler(event) {
        visible = true;
    };

    function mouseLeaveHandler(event) {
        visible = false;
    };
</script>

<style>
    #overlay-box {
        display: flex;
        z-index: 1;
        position: absolute;
        width: 100%;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-right: 10px;
        padding-left: 10px;
        margin: 3px;
        box-sizing: border-box;
    }
    #overlay-vis {
        display: flex;
        z-index: 2;
        background-color: #111111;
        border-radius: 5px;
        opacity: 0.75;
    }
    #overlay-center {
        display: flex;
        min-width: 0;
        min-height: 0;
        flex-shrink: 1;
        justify-content: center;
        align-content: center;
    }
    #overlay-entry {
        display: flex;
    }
</style>

<div id='overlay-box' on:mouseenter={mouseEnterHandler} on:mouseleave={mouseLeaveHandler}>
    {#if visible}
    <div id='overlay-vis' transition:fade>
        <div id=overlay-center/>
        <div id='overlay-entry'>
            <a>Show Metadata</a>
        </div>
        &nbsp|&nbsp
        <div id='overlay-entry'>
            <a>Download Original</a>
        </div>
        <div id='overlay-center'/>
    </div>
    {/if}
</div>