<script>
	import Hero from '$lib/blocks/Hero.svelte';
	import TourCard from '$lib/pieces/TourCard.svelte';
	import Filter from '$lib/pieces/Filter.svelte';
	import { ChevronsRight, Footprints, Landmark, PawPrint, Compass, Kayak } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let { data } = $props();
	const { general, intro, tours } = $derived(data);
	const usps = $derived([intro.usp1, intro.usp2, intro.usp3]);

	const categories = [
		{ label: 'All tours', value: 'all', icon: 'Compass' },
		{ label: 'City tours', value: 'city', icon: 'Landmark' },
		{ label: 'Adventure', value: 'adventure', icon: 'Kayak' },
		{ label: 'Safari', value: 'safari', icon: 'PawPrint' },
		{ label: 'Day hikes', value: 'hikes', icon: 'Footprints' }
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

<section class="relative h-[82vh]">
	<Hero data={general} height="h-[86vh]" />
</section>

<section
	class="relative z-20 flex flex-col items-center rounded-t-[30px] md:rounded-t-[40px] bg-light py-12 text-dark md:gap-24 md:py-20 lg:py-24"
>
	<div class="x-margin flex w-full flex-col items-center gap-8 md:gap-16">
		<h2 class="px-3 md:max-w-[50%] md:text-center">{intro.title}</h2>
		<div class="grid grid-cols-1 gap-8 px-3 md:grid-cols-3">
			{#each usps as usp}
				<div class="border-l border-dark30 pl-5">
					<p>{usp}</p>
				</div>
			{/each}
		</div>
	</div>

	{#snippet slot1()}
		<div class="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
			{#each categories as category}
				<button
					class="flex h-14 w-full items-center gap-1 rounded-lg border px-4 md:h-28 md:flex-col md:justify-center md:gap-2 md:rounded-xl md:text-lg {selectedCategory.value ===
					category.value
						? 'border-blue70 bg-blue70 text-light'
						: 'border-dark80 text-dark'}"
					onclick={() => (selectedCategory = category)}
				>
					<span class="hidden size-6 md:block">
						{#if category.icon === 'Footprints'}
							<Footprints size={32} />
						{:else if category.icon === 'Landmark'}
							<Landmark size={32} />
						{:else if category.icon === 'Kayak'}
							<Kayak size={32} />
						{:else if category.icon === 'PawPrint'}
							<PawPrint size={32} />
						{:else if category.icon === 'Compass'}
							<Compass size={32} />
						{:else}
							<Compass size={32} />
						{/if}
					</span>
					<span class="block size-6 md:hidden">
						{#if category.icon === 'Footprints'}
							<Footprints size={20} />
						{:else if category.icon === 'Landmark'}
							<Landmark size={20} />
						{:else if category.icon === 'Kayak'}
							<Kayak size={20} />
						{:else if category.icon === 'PawPrint'}
							<PawPrint size={20} />
						{:else if category.icon === 'Compass'}
							<Compass size={20} />
						{:else}
							<Compass size={20} />
						{/if}
					</span>
					{category.label}
				</button>
			{/each}
		</div>
	{/snippet}

	<Filter {slot1} selectedFilter={selectedCategory.label} />

	<div class="x-margin hidden w-4/5 grid-cols-2 gap-4 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-6">
		{#each categories as category}
			<button
				class="flex h-[56px] w-full items-center gap-2 rounded-lg px-4 md:gap-2 md:text-xl {selectedCategory.value ===
				category.value
					? 'bg-blue70 text-light'
					: 'bg-[#E3E3E3] hover:bg-blue40'}"
				onclick={() => (selectedCategory = category)}
			>
				{#if selectedCategory.value === category.value}
					<ChevronsRight size={32} />
				{/if}

				{category.label}
				<div class="ml-auto">
					{#if category.icon === 'Footprints'}
						<Footprints
							size={24}
							strokeWidth={1.5}
							class={selectedCategory.value === category.value ? 'text-light' : 'text-blue'}
						/>
					{:else if category.icon === 'Landmark'}
						<Landmark
							size={24}
							strokeWidth={1.5}
							class={selectedCategory.value === category.value ? 'text-light' : 'text-blue'}
						/>
					{:else if category.icon === 'Kayak'}
						<Kayak
							size={24}
							strokeWidth={1.5}
							class={selectedCategory.value === category.value ? 'text-light' : 'text-blue'}
						/>
					{:else if category.icon === 'PawPrint'}
						<PawPrint
							size={24}
							strokeWidth={1.5}
							class={selectedCategory.value === category.value ? 'text-light' : 'text-blue'}
						/>
					{:else if category.icon === 'Compass'}
						<Compass
							size={24}
							strokeWidth={1.5}
							class={selectedCategory.value === category.value ? 'text-light' : 'text-blue'}
						/>
					{:else}
						<Compass
							size={24}
							strokeWidth={1.5}
							class={selectedCategory.value === category.value ? 'text-light' : 'text-blue'}
						/>
					{/if}
				</div>
			</button>
		{/each}
	</div>

	<div class="t-margin x-margin grid grid-cols-1 gap-4 md:grid-cols-2">
		{#key filteredTours}
			{#each filteredTours as tour, i}
				<TourCard index={i} {tour} />
			{/each}
		{/key}
	</div>
</section>
