<script>
	import '../app.css';
	import Footer from '$lib/blocks/Footer.svelte';
	import Navigation from '$lib/blocks/Navigation.svelte';
	import { page } from '$app/state';
	let { data, children } = $props();
</script>

<svelte:head>
  <title>{page?.data?.seo?.title}</title>
  <meta name="description" content={page?.data?.seo?.description} />
</svelte:head>

<Navigation {data} />
<div id="portal"></div>

{@render children()}
<Footer />
