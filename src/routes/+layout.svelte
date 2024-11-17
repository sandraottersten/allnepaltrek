<script>
	export const prerender = true;
	import '../app.css';
	import Navigation from '$lib/blocks/Navigation.svelte';
	let { children } = $props();
</script>

<Navigation />
{@render children()}
