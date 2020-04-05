<script>
    import { fade, slide } from 'svelte/transition';
    import { basename } from 'path';

    export let originalPath = '';
    export let media = {};

    let overlayVisible = false;
    let metadataVisible = false;

    function mouseEnterHandler(event) {
        overlayVisible = true;
    };

    function mouseLeaveHandler(event) {
        overlayVisible = false;
    };

    function showMetadata(event) {
        metadataVisible = true;
    };

    function hideMetadata(event) {
        metadataVisible = false;
    };

    function nopFormatter(input_data) {
        return input_data;
    };

    function leftPad(number, length) {
        let num = number + '';
        while (num.length < length) {
            num = '0' + num;
        }

        return num;
    }

    function dateFormatter(input_data) {
        let photoDate = new Date(input_data * 1000);
        photoDate = photoDate.toUTCString().replace(" GMT", "");

        if (media.timezone !== undefined) {
            let tz = media.timezone;
            if (tz == 0) {
                photoDate += ' Z';
            } else {
                let sign = '+';

                if (tz < 0) {
                    sign = '-';
                }

                tz = Math.abs(tz);
                let hours = Math.floor(tz);
                let minutes = Math.floor((tz - hours) * 60);
                photoDate += sign + leftPad(hours, 2) + ':' + leftPad(minutes, 2);
            }
        }

        return photoDate;
    };

    function resFormatter(input_data) {
        return input_data[0] + ' x ' + input_data[1];
    };

    function apertureFormatter(input_data) {
        return 'f/' + input_data;
    };

    function shutterFormatter(input_data) {
        return input_data + ' sec';
    };

    function keywordFormatter(input_data) {
        return input_data.join(', ');
    };

    let metadataFormatters = {
        'make':        {'prefix': 'Camera Maker', 'formatter': nopFormatter},
        'model':       {'prefix': 'Camera Model', 'formatter': nopFormatter},
        'lens':        {'prefix': 'Camera Lens', 'formatter': nopFormatter},
        'date':        {'prefix': 'Time Taken', 'formatter': dateFormatter},
        'size':        {'prefix': 'Resolution', 'formatter': resFormatter},
        'aperture':    {'prefix': 'Aperture', 'formatter': apertureFormatter},
        'focalLength': {'prefix': 'Focal Length', 'formatter': nopFormatter},
        'subjectDistanceRange':
            {'prefix': 'Subject Distance Range', 'formatter': nopFormatter},
        'iso':         {'prefix': 'ISO', formatter: nopFormatter},
        'fov':         {'prefix': 'FOV', formatter: nopFormatter},
        'shutter':     {'prefix': 'Shutter Speed', formatter: shutterFormatter},
        'exposureProgram':
                       {'prefix': 'Exposure Program', formatter: nopFormatter},
        'exposureCompensation':
                       {'prefix': 'Exposure Compensation', formatter: nopFormatter},
        'meteringMode':{'prefix': 'Metering Mode', formatter: nopFormatter},
        'lightSource': {'prefix': 'Light Source', formatter: nopFormatter},
        'flash':       {'prefix': 'Flash', formatter: nopFormatter},
        'orientation': {'prefix': 'Orientation', formatter: nopFormatter},
        'mimeType':    {'prefix': 'MIME Type', formatter: nopFormatter},
        'creator':     {'prefix': 'Photographer', formatter: nopFormatter},
        'caption':     {'prefix': 'Caption', formatter: nopFormatter},
        'keywords':    {'prefix': 'Keywords', formatter: keywordFormatter},
    }
</script>

<style>
    #overlay-box {
        display: flex;
        z-index: 1;
        width: 100vh;
        position: absolute;
        padding: 10px;
        margin: 3px;
        box-sizing: border-box;
    }
    #overlay-vis {
        display: flex;
        flex-direction: column;
        z-index: 2;
        background-color: #111111;
        border-radius: 5px;
        opacity: 0.75;
    }
    #overlay-header {
        display: flex;
        flex-direction: row;
    }
    #overlay-metadata {
        display: flex;
        flex-direction: column;
        margin: 0px;
        padding: 0px;
        text-align: left;
    }
    #overlay-entry {
        display: flex;
    }
</style>

<div id='overlay-box' on:mouseenter={mouseEnterHandler} on:mouseleave={mouseLeaveHandler}>
    {#if overlayVisible}
    <div id='overlay-vis' transition:fade>
        <div id='overlay-header'>
            <div id='overlay-entry'>
                {#if metadataVisible == false}
                <a on:click={showMetadata}>Show Metadata</a>
                {:else}
                <a on:click={hideMetadata}>Hide Metadata</a>
                {/if}
            </div>
            &nbsp|&nbsp
            <div id='overlay-entry'>
                <a href={originalPath} download={basename(originalPath)} type={media.mimeType}>Download Original</a>
            </div>
        </div>
        {#if metadataVisible}
            <div id='overlay-metadata' transition:slide>
            {#each Object.keys(media) as tag}
                <table style='width: 100%'>
                    {#if tag in metadataFormatters}
                    <tr>
                        <th align='left'>{metadataFormatters[tag].prefix}:</th>
                        <td align='right'>{metadataFormatters[tag].formatter(media[tag])}</td>
                    </tr>
                    {/if}
                </table>
            {:else}
                <p>No supported metadata found</p>
            {/each}
            </div>
        {/if}
    </div>
    {/if}
</div>