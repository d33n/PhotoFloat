<!-- Inspiration from: https://dev.to/ilia_mikhailov/let-s-build-a-svelte-fullscreen-component-32c6 -->
<script>
	import { scale } from 'svelte/transition';
	let fullscreenVisible = false;
	let fullscreenCSS = 'hidden';
	let fullscreenContainer = null;

	// boring plain js fullscreen support stuff below
	const noop = () => {};

	const fullscreenSupport = !!(
		document.fullscreenEnabled ||
		document.webkitFullscreenEnabled ||
		document.mozFullScreenEnabled ||
		document.msFullscreenEnabled ||
		false
	);

	const exitFullscreen = (
		document.exitFullscreen ||
		document.mozCancelFullScreen ||
		document.webkitExitFullscreen ||
		document.msExitFullscreen ||
		noop
	).bind(document);

	const requestFullscreen = () => {
		const requestFS = (
			fullscreenContainer.requestFullscreen ||
			fullscreenContainer.mozRequestFullScreen ||
			fullscreenContainer.webkitRequestFullscreen ||
			fullscreenContainer.msRequestFullscreen ||
			noop
			).bind(fullscreenContainer);
		requestFS();
	};

	const fsToggle = () => {
		if (!fullscreenSupport) {
			return;
		}

		if (fullscreenVisible) {
			fullscreenCSS = 'hidden';
			fullscreenVisible = false;
			exitFullscreen();
		} else {
			fullscreenVisible = true;
			requestFullscreen(fullscreenContainer);
		}
	};

	function fullscreenChangeHandler() {
		/*
		 * Change the CSS on the fullscreen div at this time. This is called
		 * before exiting so this is the time to re-hide the div.
		 * This is also called once fully in fullscreen mode, so the div
		 * can be shown without any janky transition between the modes.
		 */
		if (fullscreenCSS == 'hidden') {
			fullscreenCSS = 'fullscreen';
		} else {
			fullscreenCSS = 'hidden';
		}
	};

</script>

<style>
	#hidden {
		display: none;
	}
	#fullscreen {
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>

{#if fullscreenSupport}
<a on:click={fsToggle} on:fullscreenchange={fullscreenChangeHandler} bind:this={fullscreenContainer}>Fullscreen
	{#if fullscreenVisible}
		<div id={fullscreenCSS} transition:scale>
			<slot {fullscreenVisible}/>
		</div>
	{/if}
</a>
{/if}