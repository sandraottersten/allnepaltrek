<script>
	import Hero from '$lib/blocks/Hero.svelte';
	import Peaks from '$lib/svg/Peaks.svelte';
	import LinkButton from '$lib/pieces/LinkButton.svelte';
	import TrekCard from '$lib/pieces/TrekCard.svelte';
	import TourCard from '$lib/pieces/TourCard.svelte';
	import Divider from '$lib/pieces/Divider.svelte';
	import InfoCard from '$lib/pieces/InfoCard.svelte';
	import NepalMap from '$lib/svg/NepalMap.svelte';
	import PeaksSmall from '$lib/svg/PeaksSmall.svelte';
	import { urlFor } from '../sanity/index';
	import { PlusCircle } from 'lucide-svelte';

	let { data } = $props();
	const { general, intro, treks, regions, categories, tours } = data;
	let selectedRegion = $state();
	let selectedCategory = $state(categories[0]);
	let expandedCategories = $state([]);

	const imgMob = urlFor(general.image).width(2000).height(1000).url();

	const heroTexts = [
		'Packages and customized treks',
		'25 years of experience',
		'Local travel agency'
	];

	const nepalTitle = "Nepal's protected areas";
	const nepalText =
		'Between the high peaks and the lowlands, Nepal has a number of conservation areas and national parks to protect the flora and fauna. In these areas we find most of the trekking trails and destinations. Which area would you like to visit?';

	const usps = [intro.usp1, intro.usp2, intro.usp3];

	const toggleCategory = (cat) => {
		if (expandedCategories.includes(cat.id)) {
			const updatedCats = expandedCategories.filter((c) => c !== cat.id);
			expandedCategories = updatedCats;
		} else {
			expandedCategories.push(cat.id);
			selectedCategory = cat;
		}
	};
</script>

<section class="relative">
	<Hero data={general} height="h-[calc(100vh+2rem)]" />

	<div
		class="absolute bottom-[5rem] right-0 flex h-[6rem] items-end justify-center pb-8 sm:bottom-[13.5rem] sm:h-[calc(100vh-17.5rem)] sm:w-[24rem]"
	>
		<div class="size-[80px] sm:size-[120px] md:size-[270px]">
			<Peaks />
		</div>
	</div>

	<!-- <p
		class="absolute bottom-[0.8rem] left-0 w-[calc(100vw-5rem)] px-[1.5rem] text-sm font-thin uppercase text-orange70 md:left-[4rem] md:text-base"
	>
		{data.general.subtitle}
	</p> -->

	<div class="absolute bottom-[3rem] right-0 hidden flex-col sm:flex">
		{#each heroTexts as text}
			<div class="flex h-[3.5rem] w-[24rem] items-center border-t border-light30 pl-5 text-base">
				<p class="sub-small">{text}</p>
			</div>
		{/each}
	</div>

	<div
		class="absolute bottom-[4rem] left-0 flex flex-col gap-2 border-t border-light30 py-[3rem] sm:hidden"
	>
		{#each heroTexts as text}
			<div class="flex w-full items-center pl-6 text-sm">
				<p class="sub-small">{text}</p>
			</div>
		{/each}
	</div>
</section>

<section
	class="x-margin z-20 -mt-8 flex flex-col rounded-t-[40px] bg-light pt-0 text-dark md:gap-12"
>
	<div class="y-margin flex w-full flex-col items-center gap-16">
		<h2 class="px-3 md:max-w-[50%] md:text-center">{intro.title}</h2>
		<div class="grid grid-cols-1 gap-8 px-3 md:grid-cols-3">
			{#each usps as usp}
				<div class="border-l border-dark30 pl-5">
					<p>{usp}</p>
				</div>
			{/each}
		</div>
	</div>
	<InfoCard image={intro.image} />
</section>

<section class="y-margin flex flex-col gap-5">
	<h2 class="x-margin">Trekking packages</h2>
	<Divider />
	<p class="x-margin md:max-w-[60%]">
		Tell us about your interest and needs. We’ll work together with you to customize your trip just
		how you want it.
	</p>
	<div class="x-margin mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
		{#each treks as trek}
			<TrekCard {trek} />
		{/each}
	</div>
</section>

<div class="flex flex-col items-center gap-8 py-12">
	<p class="w-[90%] text-center text-3xl font-medium text-dark70 md:w-[40rem] md:text-4xl">
		It's not the mountain we conquer but ourselves
	</p>
	<LinkButton label="See all treks" link="/treks" />
</div>

<section class="x-margin y-margin flex gap-24">
	<div class="hidden h-[600px] w-full flex-1 md:flex">
		<img
			src={urlFor(selectedCategory.image).width(800).height(1000).url()}
			alt={selectedCategory.image.attribution}
			class="size-full rounded-3xl object-cover"
		/>
	</div>
	<div class="flex-[2_2_0%]">
		{#each categories as cat}
			<div
				class="flex gap-5 overflow-hidden border-t border-dark30 p-5 transition-[height] duration-700 {expandedCategories.includes(
					cat.id
				)
					? 'h-[200px]'
					: 'h-[72px]'}"
			>
				<button class="h-min" onclick={() => toggleCategory(cat)}>
					<PlusCircle size={32} color="#EE7430" strokeWidth={1} />
				</button>
				<div class="flex flex-col gap-5 md:w-1/2">
					<h3>{cat.name}</h3>
					<p>{cat.description}</p>
					<a href={`/treks?category=${cat.id}`} class="flex gap-2 hover:text-orange">
						Go to treks <PeaksSmall size="size-[24px] min-w-[24px]" /></a
					>
				</div>
			</div>
		{/each}
	</div>
</section>

<section
	style:--image-mob={`url(${imgMob})`}
	class="flex bg-[image:var(--image-mob)] bg-cover bg-fixed bg-center bg-no-repeat"
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

<section class="y-margin flex flex-col gap-5">
	<h2 class="x-margin">More of Nepal</h2>
	<Divider />
	<p class="x-margin md:max-w-[60%]">
		Tell us about your interest and needs. We’ll work together with you to customize your trip just
		how you want it.
	</p>
	<div class="x-margin mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2">
		{#each tours as tour}
			<TourCard {tour} />
		{/each}
	</div>
</section>
