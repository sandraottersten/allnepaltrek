<script>
	import Hero from '$lib/blocks/Hero.svelte';
	import TrekCard from '$lib/pieces/TrekCard.svelte';
	import InfoCard from '$lib/pieces/InfoCard.svelte';
	import Dropdown from '$lib/pieces/Dropdown.svelte';
	import Filter from '$lib/pieces/Filter.svelte';
	import PeaksSmall from '$lib/svg/PeaksSmall.svelte';
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
	class="y-margin relative z-20 flex flex-col items-center bg-light pt-12 text-dark md:gap-24 md:pt-28 lg:pt-32"
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

	<div
		class="x-margin hidden w-4/5 grid-cols-2 gap-4 md:grid md:grid-cols-3 md:gap-x-12 md:gap-y-6"
	>
		{#each [categoryAll, ...categories] as category}
			<button
				class="flex h-[45px] w-full items-center gap-4 border-b px-4 pb-3 md:gap-2 md:text-lg {selectedFilter.id ===
				category.id
					? 'border-orange text-orange'
					: 'border-dark30'}"
				onclick={() => (selectedFilter = category)}
			>
				<PeaksSmall
					size="size-[32px] min-w-[32px] md:size-[24px] md:min-w-[24px] {selectedFilter.id ===
					category.id
						? 'block'
						: 'hidden'}"
				/>

				{category.name}
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
		<div class="hidden flex-col gap-2 md:flex md:flex-row md:gap-5">
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

		<div class="grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
			{#key filteredTreks}
				{#each filteredTreks as trek, i}
					<TrekCard index={i} {trek} />
				{/each}
			{/key}
		</div>
	</div>
	<InfoCard {infoCard} />
</section>
