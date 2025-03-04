<script>
	import HeroVideo from '$lib/blocks/HeroVideo.svelte';
	import Peaks from '$lib/svg/Peaks.svelte';
	import LinkButton from '$lib/pieces/LinkButton.svelte';
	import TrekCard from '$lib/pieces/TrekCard.svelte';
	import TourCard from '$lib/pieces/TourCard.svelte';
	import Divider from '$lib/pieces/Divider.svelte';
	import InfoCard from '$lib/pieces/InfoCard.svelte';
	import PeaksSmall from '$lib/svg/PeaksSmall.svelte';
	import { urlFor } from '../sanity/index';
	import { PlusCircle } from 'lucide-svelte';
	import Regions from '../lib/blocks/Regions.svelte';

	let { data } = $props();
	const { general, intro, infoCard, treks, regions, categories, tours } = data;

	let selectedCategory = $state(categories[0]);
	let expandedCategories = $state([categories[0].id]);

	const usps = [intro.usp1, intro.usp2, intro.usp3];

	const heroUsps = [
		'Local travel agency',
		'25 years of experience',
		'Packages and customized treks'
	];

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
	<HeroVideo data={general} height="h-[105vh]" usps={heroUsps} />
</section>

<section
	class="x-margin relative z-20 -mt-10 flex flex-col rounded-t-3xl bg-light pt-12 text-dark md:gap-12 md:rounded-t-[40px] md:pt-28 lg:pt-32"
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

<div class="flex flex-col items-center gap-8 py-12">
	<p class="w-[90%] text-center text-3xl font-medium text-dark70 md:w-[40rem] md:text-4xl">
		It's not the mountain we conquer but ourselves
	</p>
	<LinkButton label="See all treks" link="/treks" />
</div>

<section class="x-margin y-margin flex gap-24">
	<div class="relative hidden h-[600px] w-full flex-1 md:flex">
		<div class="absolute left-0 top-0 z-10 size-full rounded-3xl bg-dark10"></div>
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
