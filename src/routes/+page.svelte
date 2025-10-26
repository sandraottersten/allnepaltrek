<script>
	import Hero from '$lib/blocks/Hero.svelte';
	import HeroVideo from '$lib/blocks/HeroVideo.svelte';
	import Silouette from '$lib/svg/Silouette.svelte';
	import LinkButton from '$lib/pieces/LinkButton.svelte';
	import TrekCard from '$lib/pieces/TrekCard.svelte';
	import TourCard from '$lib/pieces/TourCard.svelte';
	import Divider from '$lib/pieces/Divider.svelte';
	import InfoCard from '$lib/pieces/InfoCard.svelte';
	import Regions from '../lib/blocks/Regions.svelte';
	import Categories from '$lib/blocks/Categories.svelte';
	import { urlFor } from '../sanity';

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
	<Hero data={general} height="h-[100vh]" usps={heroUsps} />
	<!-- <HeroVideo data={general} height="h-[100vh]" /> -->
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
<Categories {categories} image={general.image} />

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

<section
	style:--image-mob={`url(${urlFor(general.image).width(800).url()})`}
	class="flex w-full overflow-hidden bg-[image:var(--image-mob)] bg-cover bg-fixed bg-center bg-no-repeat"
>
	<div class="y-margin flex w-full flex-col items-center bg-light80 backdrop-blur-sm">
		<p class="mb-8 w-[90%] text-center text-2xl font-medium text-dark70 md:w-[40rem] md:text-4xl">
			It's not the mountain we conquer but ourselves
		</p>
		<LinkButton label="See all treks" link="/treks" />
	</div>
</section>

<!-- <section
	style:--image-mob={`url(${urlFor(general.image).width(800).url()})`}
	class="flex w-full overflow-hidden bg-[image:var(--image-mob)] bg-cover bg-fixed bg-center bg-no-repeat saturate-[.80] filter"
>
	<div class="y-margin flex w-full flex-col items-center bg-dark30 backdrop-blur-md">
		<p class="mb-8 w-[90%] text-center text-2xl font-medium text-light md:w-[40rem] md:text-4xl">
			It's not the mountain we conquer but ourselves
		</p>
		<LinkButton label="See all treks" link="/treks" />
	</div>
</section> -->

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
