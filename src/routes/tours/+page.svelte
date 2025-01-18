<script>
	import Hero from '$lib/blocks/Hero.svelte';
	import Peaks from '$lib/svg/Peaks.svelte';
	import TourCard from '$lib/pieces/TourCard.svelte';
	import { PortableText } from '@eirikk/portabletext-2-svelte-5';
	import LinkButton from '$lib/pieces/LinkButton.svelte';
	import Divider from '$lib/pieces/Divider.svelte';
	import Filter from '$lib/pieces/Filter.svelte';
	import PeaksSmall from '$lib/svg/PeaksSmall.svelte';
	import { urlFor } from '../../sanity/index';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let { data } = $props();
	const { general, intro, tours } = data;

	const imgMob = urlFor(intro.image).width(576).url();
	const imgSm = urlFor(intro.image).width(768).url();
	const imgMd = urlFor(intro.image).width(600).url();
	const imgLg = urlFor(intro.image).width(600).url();
	const imgXl = urlFor(intro.image).width(800).url();

	const categories = [
		{ label: 'All tours', value: 'all' },
		{ label: 'City tours', value: 'city' },
		{ label: 'Adventure', value: 'adventure' },
		{ label: 'Day hikes', value: 'hikes' }
	];

	let selectedCategory = $state(categories[0]);

	onMount(() => {
		const category = $page.url.searchParams.get('category');
		if (category) {
			const categoryObject = categories.find((r) => r.value === category);
			selectedCategory = categoryObject;
		}
	});

	let filteredTours = $derived.by(() => {
		return tours.filter(
			(tour) => tour.details.category === selectedCategory.value || selectedCategory.value === 'all'
		);
	});
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
</section>

<section
	class="x-margin y-margin relative z-20 -mt-8 flex flex-col rounded-t-[40px] bg-light pb-3 text-dark md:flex-row md:gap-24 md:pb-0"
>
	<div class="relative mb-8 flex flex-col justify-end gap-8 md:mb-0 md:w-2/3 md:gap-12">
		<h2>{intro.title}</h2>
		<span>
			<PortableText value={intro.text} />
		</span>
		<LinkButton label="Contact us" link="/" />
	</div>
	<div class="relative overflow-hidden rounded-3xl md:w-1/3">
		<img
			src={imgMob}
			srcset={`${imgMob} 576w, ${imgSm} 768w, ${imgMd} 600w, ${imgLg} 600w, ${imgXl} 800w`}
			alt={intro.image.attribution}
			class="size-full object-cover"
		/>
	</div>
</section>

<section class="y-margin">
	{#snippet slot1()}
		<div class="grid grid-cols-2 gap-2 md:grid-cols-6 md:gap-4">
			{#each categories as category}
				<button
					class="flex h-16 w-full items-center gap-1 rounded-full border px-4 md:h-28 md:flex-col md:justify-center md:gap-2 md:rounded-3xl md:text-lg {selectedCategory.value ===
					category.value
						? 'border-orange bg-orange text-light'
						: 'border-dark80 text-dark hover:bg-orange70'}"
					onclick={() => (selectedCategory = category)}
				>
					<span class="hidden size-6 md:block">
						<category.icon size="32" />
					</span>
					<span class="block size-6 md:hidden">
						<category.icon size="20" />
					</span>
					{category.name}
				</button>
			{/each}
		</div>
	{/snippet}
	<Divider />
	<div class="x-margin my-12 flex gap-24">
		<div class="hidden w-full grid-cols-2 gap-4 md:grid md:grid-cols-4 md:gap-x-12 md:gap-y-6">
			{#each categories as category}
				<button
					class="flex w-full items-center gap-4 border-b px-4 pb-3 md:gap-2 md:text-xl {selectedCategory.value ===
					category.value
						? 'border-orange text-orange'
						: 'border-dark30'}"
					onclick={() => (selectedCategory = category)}
				>
					<PeaksSmall
						size="size-[32px] min-w-[32px] md:size-[32px] md:min-w-[32px] {selectedCategory.value ===
						category.value
							? 'block'
							: 'hidden'}"
					/>

					{category.label}
				</button>
			{/each}
		</div>
	</div>

	<Filter {slot1} />

	<div class="x-margin grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-2">
		{#key filteredTours}
			{#each filteredTours as tour, i}
				<TourCard index={i} {tour} />
			{/each}
		{/key}
	</div>
</section>
