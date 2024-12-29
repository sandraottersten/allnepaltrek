<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	let ref;
	let portal;
	let layout;

	onMount(() => {
		portal = document.createElement('div');
		portal.className = 'portal';
		layout = document.getElementById('portal');
		layout.appendChild(portal);
		portal.appendChild(ref);
		document.body.classList.add('no-scroll');
	});

	onDestroy(() => {
		if (browser) {
			layout.removeChild(portal);
			document.body.classList.remove('no-scroll');
		}
	});
</script>

<div class="portal-clone">
	<div bind:this={ref}>
		<slot></slot>
	</div>
</div>

<style>
	.portal-clone {
		display: block;
	}
</style>
