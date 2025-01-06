<script>
	export const prerender = true;
	import '../app.css';
	import Footer from '$lib/blocks/Footer.svelte';
	import Navigation from '../lib/blocks/Navigation.svelte';
	let { children } = $props();
</script>

<Navigation />
<div id="portal"></div>

{@render children()}
<Footer />
