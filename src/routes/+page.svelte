<script>
	import HeroVideo from '$lib/blocks/HeroVideo.svelte';
	import TextLink from '$lib/pieces/TextLink.svelte';
	import Peaks from '$lib/svg/Peaks.svelte';
	import Silouette from '$lib/svg/Silouette.svelte';
	import LinkButton from '$lib/pieces/LinkButton.svelte';
	import TrekCard from '$lib/pieces/TrekCard.svelte';
	import TourCard from '$lib/pieces/TourCard.svelte';
	import Divider from '$lib/pieces/Divider.svelte';
	import InfoCard from '$lib/pieces/InfoCard.svelte';
	import PeaksSmall from '$lib/svg/PeaksSmall.svelte';
	import { urlFor } from '../sanity/index';
	import { PlusCircle, MinusCircle } from 'lucide-svelte';
	import Regions from '../lib/blocks/Regions.svelte';
	import { slide, fade } from 'svelte/transition';

	let { data } = $props();
	const { general, intro, infoCard, treks, regions, categories, tours } = data;

	let selectedCategory = $state(categories[0]);
	let expandedCategory = $state(categories[0].id);

	const usps = [intro.usp1, intro.usp2, intro.usp3];

	const heroUsps = [
		'Local travel agency',
		'25 years of experience',
		'Packages and customized treks'
	];

	const toggleCategory = (cat) => {
		if (expandedCategory === cat.id) {
			expandedCategory = '';
		} else {
			expandedCategory = cat.id;
			selectedCategory = cat;
		}
	};
</script>

<section class="relative">
	<HeroVideo data={general} height="h-[100vh]" usps={heroUsps} />
</section>

<section
	class="x-margin relative z-20 flex flex-col rounded-t-3xl bg-light pt-12 text-dark md:gap-12 md:pt-28 lg:pt-32"
>
	<div class="flex w-full flex-col items-center gap-16">
		<h2 class="px-3 md:max-w-[50%] md:text-center">{intro.title}</h2>
		<div class="grid grid-cols-1 gap-8 px-3 md:grid-cols-3">
			{#each usps as usp}
				<div class="border-l border-dark30 pl-5">
					<p>{usp}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<InfoCard {infoCard} />

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

<div class="flex flex-col items-center py-6 md:py-12">
	<p class="mb-8 w-[90%] text-center text-2xl font-medium text-dark70 md:w-[40rem] md:text-4xl">
		It's not the mountain we conquer but ourselves
	</p>
	<LinkButton label="See all treks" link="/treks" />
	<Silouette size="w-screen md:mt-8" />
</div>

<section class="x-margin b-margin flex gap-12">
	<div class="relative hidden h-[600px] w-full flex-1 md:flex">
		{#key selectedCategory.image}
			<img
				src={urlFor(selectedCategory.image).width(800).height(1000).url()}
				alt={selectedCategory.image.attribution}
				class="size-full rounded-lg object-cover saturate-[.8] filter"
				in:fade={{ duration: 300 }}
			/>
		{/key}
	</div>
	<div class="flex-[2_2_0%]">
		{#each categories as cat}
			<div
				key={cat.id}
				class="flex flex-col overflow-hidden {categories[0].id !== cat.id
					? 'border-t border-dark30'
					: ''} pt-5"
			>
				<div class="flex items-center gap-5 pb-5">
					<button class="h-min" onclick={() => toggleCategory(cat)}>
						{#if expandedCategory === cat.id}
							<MinusCircle size={32} color="#EE7430" strokeWidth={1} />
						{:else}
							<PlusCircle size={32} color="#EE7430" strokeWidth={1} />
						{/if}
					</button>
					<h3>{cat.name}</h3>
				</div>
				{#if expandedCategory === cat.id}
					<div class="flex flex-col gap-5 pb-5 pl-[3.2rem] md:w-2/3" transition:slide>
						<p>{cat.description}</p>
						<TextLink link={`/treks?category=${cat.id}`} text="Go to treks" />
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>

<Regions {general} {regions} />

<section class="y-margin flex flex-col items-center gap-5">
	<div class="flex w-full flex-col gap-5">
		<h2 class="x-margin">More of Nepal</h2>
		<Divider />
		<p class="x-margin md:max-w-[60%]">
			Tell us about your interest and needs. We’ll work together with you to customize your trip
			just how you want it.
		</p>
	</div>
	<div class="x-margin my-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2">
		{#each tours as tour}
			<TourCard {tour} />
		{/each}
	</div>
	<LinkButton label="See all tours" link="/tours" />
</section>
