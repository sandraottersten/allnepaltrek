<script>
	import EbcClassicSmall from '$lib/svg/maps/EbcClassicSmall.svelte';
	import Ebc3PassesSmall from '$lib/svg/maps/Ebc3PassesSmall.svelte';
	import MardiHimalSmall from '$lib/svg/maps/MardiHimalSmall.svelte';
	import ManasluCircuitSmall from '$lib/svg/maps/ManasluCircuitSmall.svelte';

	let { map } = $props();
	const size = 'h-[50vh]';
</script>

<div class="absolute bottom-20 right-20 z-30 hidden md:flex">
	{#if map === 'ebc-classic'}
		<EbcClassicSmall {size} />
	{:else if map === 'ebc-3passes'}
		<Ebc3PassesSmall {size} />
	{:else if map === 'mardi-himal'}
		<MardiHimalSmall {size} />
	{:else if map === 'manaslu-circuit'}
		<ManasluCircuitSmall {size} />
	{/if}
</div>
