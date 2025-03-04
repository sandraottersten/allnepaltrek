<script>
	import Hero from '$lib/blocks/Hero.svelte';
	import TourCard from '$lib/pieces/TourCard.svelte';
	import Divider from '$lib/pieces/Divider.svelte';
	import Filter from '$lib/pieces/Filter.svelte';
	import PeaksSmall from '$lib/svg/PeaksSmall.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let { data } = $props();
	const { general, intro, tours } = data;
	const usps = [intro.usp1, intro.usp2, intro.usp3];

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
	<Hero data={general} height="h-[105vh]" />
</section>

<section
	class="y-margin relative z-20 -mt-8 flex flex-col rounded-t-[40px] bg-light pb-3 text-dark md:flex-row md:gap-24 md:pb-0"
>
	<div class="x-margin flex w-full flex-col items-center gap-16">
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

	<div class="x-margin my-12 flex w-3/5 gap-24">
		<div class="hidden w-full grid-cols-2 gap-4 md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-6">
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
