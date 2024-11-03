<script>
	import Hero from '$lib/blocks/Hero.svelte';

	let { data } = $props();
	console.log('DARA------->', data);
</script>

<Hero data={data.hero} />
