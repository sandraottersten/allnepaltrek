<script>
	import { urlFor } from '../../sanity';
	import EbcClassic from '$lib/svg/maps/EbcClassic.svelte';
	import Ebc3Passes from '$lib/svg/maps/Ebc3Passes.svelte';
	import MardiHimal from '$lib/svg/maps/MardiHimal.svelte';
	import ManasluCircuit from '../svg/maps/ManasluCircuit.svelte';

	let { map, image } = $props();
</script>

<section
	id="map"
	style:--image-mob={`url(${urlFor(image).width(800).url()})`}
	class="flex aspect-[1/1] w-full overflow-hidden rounded-3xl bg-[image:var(--image-mob)] bg-cover bg-fixed bg-center bg-no-repeat"
>
	<div class="flex w-full justify-center bg-dark80 backdrop-blur">
		{#if map === 'ebc-classic'}
			<EbcClassic size="w-full" />
		{:else if map === 'ebc-3passes'}
			<Ebc3Passes size="w-full" />
		{:else if map === 'mardi-himal'}
			<MardiHimal size="w-full" />
		{:else if map === 'manaslu-circuit'}
			<ManasluCircuit size="w-full" />
		{/if}
	</div>
</section>
