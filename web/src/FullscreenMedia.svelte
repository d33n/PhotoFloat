<!-- Inspiration from: https://dev.to/ilia_mikhailov/let-s-build-a-svelte-fullscreen-component-32c6 -->
<script>
	let fullscreenVisible = false;
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
			exitFullscreen();
		} else {
			requestFullscreen(fullscreenContainer);
		}
		fullscreenVisible = !fullscreenVisible;
	};

</script>

<style>
	#fullscreen {
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>

{#if fullscreenSupport}
<a on:click={fsToggle} bind:this={fullscreenContainer}>Fullscreen
	{#if fullscreenVisible}
		<div id='fullscreen'>
			<slot {fullscreenVisible}/>
		</div>
	{/if}
</a>
{/if}