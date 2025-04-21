<script>
	import { urlFor } from '../../sanity/index';
	import NepalMap from '$lib/svg/NepalMap.svelte';
	import PeaksSmall from '$lib/svg/PeaksSmall.svelte';
	import TextLink from '$lib/pieces/TextLink.svelte';

	let { general, regions } = $props();

	let selectedRegion = $state(regions[0]);
	const imgMob = urlFor(general.image).width(2000).height(1000).url();
</script>

<section
	style:--image-mob={`url(${imgMob})`}
	class="hidden h-[100vh] bg-[image:var(--image-mob)] bg-cover bg-fixed bg-center bg-no-repeat md:flex"
>
	<div
		class="x-margin relative flex w-full flex-col justify-center gap-12 bg-light80 py-16 text-dark backdrop-blur"
	>
		<div class="flex justify-center">
			<NepalMap
				size="w-[80vw]"
				selected={selectedRegion?.id}
				onclick={(region) => (selectedRegion = regions.find((r) => r.id === region))}
			/>
		</div>
		<div class="absolute right-40 top-24 flex w-2/6 flex-col gap-5">
			<h3>{selectedRegion?.general.title}</h3>
			<p>{selectedRegion?.general.description}</p>
			{#if selectedRegion}
				<TextLink link={`/regions/${selectedRegion.seo.slug.current}`} text="Read more" />
			{/if}
		</div>
		{#if selectedRegion}
			<div class="absolute bottom-16 left-40 w-1/5">
				<img
					src={urlFor(selectedRegion?.general.image).width(1000).height(800).url()}
					alt={selectedRegion?.general.image.attribution}
					class="size-full rounded-lg object-cover saturate-[.8] filter"
				/>

				<p class="mt-4 border-y border-dark30 px-3 py-3">{selectedRegion.topTrek}</p>
				<a
					href={`/regions/${selectedRegion.seo.slug.current}`}
					class="flex justify-between border-b border-dark30 px-3 py-3 hover:text-orange"
					>See all treks <PeaksSmall size="size-[24px] min-w-[24px]" /></a
				>
			</div>
		{/if}
	</div>
</section>

<section
	style:--image-mob={`url(${imgMob})`}
	class="flex bg-[image:var(--image-mob)] bg-cover bg-fixed bg-center bg-no-repeat md:hidden"
>
	<div class="relative flex w-full flex-col gap-12 bg-light80 py-8 text-dark backdrop-blur">
		<div class="flex justify-center pr-4">
			<NepalMap
				size="w-[100vw]"
				selected={selectedRegion?.id}
				onclick={(region) => (selectedRegion = regions.find((r) => r.id === region))}
			/>
		</div>
		<div class="flex w-full flex-col gap-5 px-4">
			<h3>{selectedRegion?.general.title}</h3>
			<p>{selectedRegion?.general.description}</p>
			<TextLink link={`/regions/${selectedRegion.seo.slug.current}`} text="Read more" />
		</div>
		{#if selectedRegion}
			<div class="flex w-full gap-3 px-4">
				<div class="flex-1">
					<img
						src={urlFor(selectedRegion?.general.image).width(1000).height(800).url()}
						alt={selectedRegion?.general.image.attribution}
						class="size-full rounded-lg object-cover saturate-[.80] filter"
					/>
				</div>

				<div class="flex-1">
					<p class="mt-4 border-y border-dark30 px-3 py-3">Treks: 5</p>
					<a
						href={`/regions/${selectedRegion.seo.slug.current}`}
						class="flex justify-between border-b border-dark30 px-3 py-3"
						>See all treks <PeaksSmall size="size-[24px] min-w-[24px]" /></a
					>
				</div>
			</div>
		{/if}
	</div>
</section>
