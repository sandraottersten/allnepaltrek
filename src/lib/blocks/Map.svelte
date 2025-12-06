<script>
	import { urlFor } from '../../sanity';
	import EbcClassic from '$lib/svg/maps/EbcClassic.svelte';
	import Ebc3Passes from '$lib/svg/maps/Ebc3Passes.svelte';
	import EverestPanorama from '$lib/svg/maps/EverestPanorama.svelte';
	import EbcGokyo from '$lib/svg/maps/EbcGokyo.svelte';
	import MardiHimal from '$lib/svg/maps/MardiHimal.svelte';
	import ManasluCircuit from '$lib/svg/maps/ManasluCircuit.svelte';
	import AbcClassic from '$lib/svg/maps/AbcClassic.svelte';
	import AbcPoonHill from '$lib/svg/maps/AbcPoonHill.svelte';
	import LangtangValley from '$lib/svg/maps/LangtangValley.svelte';
	import LangtangGosainkunda from '$lib/svg/maps/LangtangGosainkunda.svelte';
	import TamangHeritage from '$lib/svg/maps/TamangHeritage.svelte';
	let { map, image } = $props();
</script>

<section
	id="map"
	style:--image-mob={`url(${urlFor(image).width(800).url()})`}
	class="scroll-block flex aspect-[1/1] w-full overflow-hidden bg-[image:var(--image-mob)] bg-cover bg-fixed bg-center bg-no-repeat md:rounded-xl"
>
	<div class="flex w-full justify-center bg-light80 backdrop-blur">
		{#if map === 'ebc-classic'}
			<EbcClassic size="w-full" />
		{:else if map === 'ebc-3passes'}
			<Ebc3Passes size="w-full" />
		{:else if map === 'everest-panorama'}
			<EverestPanorama size="w-full" />
		{:else if map === 'mardi-himal'}
			<MardiHimal size="w-full" />
		{:else if map === 'ebc-gokyo'}
			<EbcGokyo size="w-full" />
		{:else if map === 'abc-classic'}
			<AbcClassic size="w-full" />
		{:else if map === 'abc-poonhill'}
			<AbcPoonHill size="w-full" />
		{:else if map === 'manaslu-circuit'}
			<ManasluCircuit size="w-full" />
		{:else if map === 'langtang-valley'}
			<LangtangValley size="w-full" />
		{:else if map === 'langtang-gosainkunda'}
			<LangtangGosainkunda size="w-full" />
		{:else if map === 'tamang-heritage'}
			<TamangHeritage size="w-full" />
		{/if}
	</div>
</section>
