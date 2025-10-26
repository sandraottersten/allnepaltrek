<script>
	import Hero from '$lib/blocks/Hero.svelte';
	import TrekCard from '$lib/pieces/TrekCard.svelte';
	import InfoCard from '$lib/pieces/InfoCard.svelte';
	import Dropdown from '$lib/pieces/Dropdown.svelte';
	import Divider from '$lib/pieces/Divider.svelte';
	import Filter from '$lib/pieces/Filter.svelte';
	import { ChevronsRight, Footprints, Mountain, Timer, Binoculars, Bird } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let { data } = $props();
	const { general, intro, categories, treks, infoCard, regions } = data;
	const usps = [intro.usp1, intro.usp2, intro.usp3];
	const allRegions = [{ label: 'All regions', value: 'all' }, ...regions];

	const difficulties = [
		{ label: 'All difficulties', value: 'all' },
		{ label: 'Easy', value: 'easy' },
		{ label: 'Moderate', value: 'moderate' },
		{ label: 'Challenging', value: 'challenging' },
		{ label: 'Strenuous', value: 'strenuous' }
	];

	const durations = [
		{ label: 'All durations', value: 'all' },
		{ label: '1-5 days', value: 'short' },
		{ label: '6-13 days', value: 'medium' },
		{ label: '14-20 days', value: 'long' }
	];

	const categoryAll = {
		name: 'All treks',
		id: 'all',
		title: 'Trekking packages',
		description:
			'Explore Nepals trekking havens, from the snow-capped majestic peaks of Himalaya to the lush flowering forests of the valleys. Trekking in Nepal is an unforgettable journey through breathtaking scenery, rich cultural heritage and and genuine hospitality.'
	};

	let selectedFilter = $state(categoryAll);
	let selectedRegion = $state(allRegions[0]);
	let selectedDuration = $state(durations[0]);
	let selectedDifficulty = $state(difficulties[0]);

	onMount(() => {
		const region = $page.url.searchParams.get('region');
		if (region) {
			const regionObject = allRegions.find((r) => r.value === region);
			selectedRegion = regionObject;
		}
		const category = $page.url.searchParams.get('category');
		if (category) {
			const categoryObject = allRegions.find((r) => r.value === category);
			selectedFilter = categoryObject;
		}
	});

	const checkDuration = (trek) => {
		const duration = Number(trek.details.duration);

		if (duration < 10) return 'short';
		if (duration > 10 && duration < 16) return 'medium';
		if (duration > 16) return 'long';
	};

	let filteredTreks = $derived.by(() => {
		return treks
			.filter(
				(trek) => trek.details.tags?.includes(selectedFilter.id) || selectedFilter.id === 'all'
			)
			.filter(
				(trek) => selectedRegion.value === trek.details.region.id || selectedRegion.value === 'all'
			)
			.filter(
				(trek) =>
					selectedDifficulty.value === trek.details.difficulty || selectedDifficulty.value === 'all'
			)
			.filter(
				(trek) => selectedDuration.value === checkDuration(trek) || selectedDuration.value === 'all'
			);
	});
</script>

<section class="relative">
	<Hero data={general} height="h-[100vh]" />
</section>

<section
	class="y-margin relative flex flex-col items-center pt-12 text-dark md:gap-24 md:pt-28 lg:pt-32"
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

	<div class="x-margin hidden w-4/5 grid-cols-2 gap-4 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-6">
		{#each [categoryAll, ...categories] as category}
			<button
				class="flex h-[56px] w-full items-center gap-2 rounded-lg px-4 md:gap-2 md:text-lg {selectedFilter.id ===
				category.id
					? 'bg-blue70 text-light'
					: 'bg-[#E3E3E3] hover:bg-blue40'}"
				onclick={() => (selectedFilter = category)}
			>
				{#if selectedFilter.id === category.id}
					<ChevronsRight size={32} />
				{/if}

				{category.name}
				<div class="ml-auto">
					{#if category.icon === 'Footprints'}
						<Footprints
							size={24}
							strokeWidth={1.5}
							class={selectedFilter.id === category.id ? 'text-light' : 'text-blue'}
						/>
					{:else if category.icon === 'Mountain'}
						<Mountain
							size={24}
							strokeWidth={1.5}
							class={selectedFilter.id === category.id ? 'text-light' : 'text-blue'}
						/>
					{:else if category.icon === 'Timer'}
						<Timer
							size={24}
							strokeWidth={1.5}
							class={selectedFilter.id === category.id ? 'text-light' : 'text-blue'}
						/>
					{:else if category.icon === 'Binoculars'}
						<Binoculars
							size={24}
							strokeWidth={1.5}
							class={selectedFilter.id === category.id ? 'text-light' : 'text-blue'}
						/>
					{:else if category.icon === 'Bird'}
						<Bird
							size={24}
							strokeWidth={1.5}
							class={selectedFilter.id === category.id ? 'text-light' : 'text-blue'}
						/>
					{:else}
						<Mountain
							size={24}
							strokeWidth={1.5}
							class={selectedFilter.id === category.id ? 'text-light' : 'text-blue'}
						/>
					{/if}
				</div>
			</button>
		{/each}
	</div>

	<Filter {slot1} {slot2} />

	{#snippet slot1()}
		<div class="grid grid-cols-2 gap-2 md:grid-cols-6 md:gap-4">
			{#each [categoryAll, ...categories] as category}
				<button
					class="flex h-16 w-full items-center gap-1 rounded-full border px-4 md:h-28 md:flex-col md:justify-center md:gap-2 md:rounded-3xl md:text-lg {selectedFilter.value ===
					category.value
						? 'border-orange bg-orange text-light'
						: 'border-dark80 text-dark hover:bg-orange70'}"
					onclick={() => (selectedFilter = category)}
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

	{#snippet slot2()}
		<div class="flex flex-col gap-2 md:flex-row md:gap-4">
			<Dropdown
				options={allRegions}
				activeOption={selectedRegion}
				handleClick={(option) => (selectedRegion = option)}
			/>
			<Dropdown
				options={difficulties}
				activeOption={selectedDifficulty}
				handleClick={(option) => (selectedDifficulty = option)}
			/>
			<Dropdown
				options={durations}
				activeOption={selectedDuration}
				handleClick={(option) => (selectedDuration = option)}
			/>
		</div>
	{/snippet}

	<div class="x-margin">
		<div class="hidden flex-row items-end gap-2 md:flex md:gap-5">
			<Dropdown
				options={allRegions}
				activeOption={selectedRegion}
				handleClick={(option) => (selectedRegion = option)}
			/>
			<Dropdown
				options={difficulties}
				activeOption={selectedDifficulty}
				handleClick={(option) => (selectedDifficulty = option)}
			/>
			<Dropdown
				options={durations}
				activeOption={selectedDuration}
				handleClick={(option) => (selectedDuration = option)}
			/>
			<div class="ml-auto mr-0 text-blue">
				{filteredTreks.length} treks
			</div>
		</div>

		<div class="grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
			{#key filteredTreks}
				{#each filteredTreks as trek, i}
					<TrekCard index={i} {trek} />
				{/each}
			{/key}
		</div>
	</div>
	<div>
		<Divider />
		<InfoCard {infoCard} />
	</div>
</section>
