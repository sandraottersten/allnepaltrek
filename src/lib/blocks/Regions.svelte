<script>
	import { urlFor } from '../../sanity/index';
	import NepalMap from '$lib/svg/NepalMap.svelte';
	import PeaksSmall from '$lib/svg/PeaksSmall.svelte';

	let { general, regions } = $props();

	let selectedRegion = $state();

	const imgMob = urlFor(general.image).width(2000).height(1000).url();

	const nepalTitle = "Nepal's protected areas";
	const nepalText =
		'Between the high peaks and the lowlands, Nepal has a number of conservation areas and national parks to protect the flora and fauna. In these areas we find most of the trekking trails and destinations. Which area would you like to visit?';
</script>

<section
	style:--image-mob={`url(${imgMob})`}
	class="hidden bg-[image:var(--image-mob)] bg-cover bg-fixed bg-center bg-no-repeat md:flex"
>
	<div class="relative flex w-full flex-col gap-12 bg-dark70 px-14 py-16 text-light backdrop-blur">
		<h2 class="text-light">Regions</h2>
		<div class="flex justify-center">
			<NepalMap
				size="w-[70vw]"
				selected={selectedRegion?.id}
				onclick={(region) => (selectedRegion = regions.find((r) => r.id === region))}
			/>
		</div>
		<div class="absolute right-32 top-32 flex w-2/6 flex-col gap-5">
			<h3>{selectedRegion?.general.title || nepalTitle}</h3>
			<p>{selectedRegion?.general.description || nepalText}</p>
			{#if selectedRegion}
				<a
					href={`/regions/${selectedRegion.seo.slug.current}`}
					class="flex gap-2 hover:text-orange"
				>
					Read more <PeaksSmall size="size-[24px] min-w-[24px]" /></a
				>
			{/if}
		</div>
		{#if selectedRegion}
			<div class="absolute bottom-16 left-16 w-1/5">
				<img
					src={urlFor(selectedRegion?.general.image).width(1000).height(800).url()}
					alt={selectedRegion?.general.image.attribution}
					class="size-full rounded-3xl object-cover"
				/>

				<p class="mt-4 border-y border-light30 px-3 py-3">Area: 38478</p>
				<a
					href={`/regions/${selectedRegion.seo.slug.current}`}
					class="flex justify-between border-b border-light30 px-3 py-3"
					>Treks: 5 <PeaksSmall size="size-[24px] min-w-[24px]" /></a
				>
			</div>
		{/if}
	</div>
</section>

<section
	style:--image-mob={`url(${imgMob})`}
	class="flex bg-[image:var(--image-mob)] bg-cover bg-fixed bg-center bg-no-repeat md:hidden"
>
	<div class="relative flex w-full flex-col gap-12 bg-dark70 px-4 py-8 text-light backdrop-blur">
		<h2 class="text-light">Regions</h2>
		<div class="flex justify-center">
			<NepalMap
				size="w-[100vw]"
				selected={selectedRegion?.id}
				onclick={(region) => (selectedRegion = regions.find((r) => r.id === region))}
			/>
		</div>
		<div class="flex w-full flex-col gap-5">
			<h3>{selectedRegion?.general.title || nepalTitle}</h3>
			<p>{selectedRegion?.general.description || nepalText}</p>
			{#if selectedRegion}
				<a
					href={`/regions/${selectedRegion.seo.slug.current}`}
					class="flex gap-2 hover:text-orange"
				>
					Read more <PeaksSmall size="size-[24px] min-w-[24px]" /></a
				>
			{/if}
		</div>
		{#if selectedRegion}
			<div class="flex w-full gap-3">
				<div class="flex-1">
					<img
						src={urlFor(selectedRegion?.general.image).width(1000).height(800).url()}
						alt={selectedRegion?.general.image.attribution}
						class="size-full rounded-3xl object-cover"
					/>
				</div>

				<div class="flex-1">
					<p class="mt-4 border-y border-light30 px-3 py-3">Treks: 5</p>
					<a
						href={`/regions/${selectedRegion.seo.slug.current}`}
						class="flex justify-between border-b border-light30 px-3 py-3"
						>Go to treks <PeaksSmall size="size-[24px] min-w-[24px]" /></a
					>
				</div>
			</div>
		{/if}
	</div>
</section>
