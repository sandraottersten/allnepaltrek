<script>
	import Hero from '$lib/blocks/Hero.svelte';
	import TrekCard from '$lib/pieces/TrekCard.svelte';
	import InfoCard from '$lib/pieces/InfoCard.svelte';
	import Dropdown from '$lib/pieces/Dropdown.svelte';
	import Divider from '$lib/pieces/Divider.svelte';
	import Filter from '$lib/pieces/Filter.svelte';
	import { ChevronsRight, Footprints, Mountain, Timer, Binoculars, Bird } from '@lucide/svelte';
	import { page } from '$app/stores';

	let { data } = $props();
	const { general, intro, categories, treks, infoCard, regions } = $derived(data);
	const usps = $derived([intro.usp1, intro.usp2, intro.usp3]);
	const allRegions = $derived([{ label: 'All regions', value: 'all' }, ...regions]);

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
	let selectedRegion = $state(null);
	let selectedDuration = $state(durations[0]);
	let selectedDifficulty = $state(difficulties[0]);
	let openDropdownId = $state(null);
	$inspect(selectedFilter.name);

	const allCategories = $derived([categoryAll, ...categories]);

	$effect(() => {
		const region = $page.url.searchParams.get('region');
		if (region) {
			const regionObject = allRegions.find((r) => r.value === region);
			if (regionObject) selectedRegion = regionObject;
		} else if (selectedRegion === null && allRegions[0]) {
			selectedRegion = allRegions[0];
		}
		const category = $page.url.searchParams.get('category');
		if (category) {
			const categoryObject = allCategories.find((c) => c.id === category);
			if (categoryObject) selectedFilter = categoryObject;
		}
	});

	const checkDuration = (trek) => {
		const duration = Number(trek.details.duration);

		if (duration < 10) return 'short';
		if (duration > 10 && duration < 16) return 'medium';
		if (duration > 16) return 'long';
	};

	let filteredTreks = $derived.by(() => {
		const regionValue = selectedRegion?.value ?? 'all';
		return treks
			.filter(
				(trek) => trek.details.tags?.includes(selectedFilter.id) || selectedFilter.id === 'all'
			)
			.filter(
				(trek) => regionValue === trek.details.region.id || regionValue === 'all'
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

	<div class="x-margin hidden w-4/5 grid-cols-2 gap-4 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-6">
		{#each [categoryAll, ...categories] as category}
			<button
				class="flex h-[56px] w-full items-center gap-2 rounded-lg px-4 md:gap-2 md:text-lg {selectedFilter.id ===
				category.id
					? 'bg-blue text-light'
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

	{#snippet slot1()}
		<div class="grid grid-cols-2 gap-2 md:grid-cols-6 md:gap-4">
			{#each [categoryAll, ...categories] as category}
				<button
					class="flex h-14 w-full items-center gap-1 rounded-lg border px-4 md:h-28 md:flex-col md:justify-center md:gap-2 md:rounded-xl md:text-lg {selectedFilter.id ===
					category.id
						? 'border-blue bg-blue text-light'
						: 'border-dark80 text-dark'}"
					onclick={() => (selectedFilter = category)}
				>
					<span class="hidden size-6 md:block">
						{#if category.icon === 'Footprints'}
							<Footprints size={32} />
						{:else if category.icon === 'Mountain'}
							<Mountain size={32} />
						{:else if category.icon === 'Timer'}
							<Timer size={32} />
						{:else if category.icon === 'Binoculars'}
							<Binoculars size={32} />
						{:else if category.icon === 'Bird'}
							<Bird size={32} />
						{:else}
							<Mountain size={32} />
						{/if}
					</span>
					<span class="block size-6 md:hidden">
						{#if category.icon === 'Footprints'}
							<Footprints size={20} />
						{:else if category.icon === 'Mountain'}
							<Mountain size={20} />
						{:else if category.icon === 'Timer'}
							<Timer size={20} />
						{:else if category.icon === 'Binoculars'}
							<Binoculars size={20} />
						{:else if category.icon === 'Bird'}
							<Bird size={20} />
						{:else}
							<Mountain size={20} />
						{/if}
					</span>
					{category.name}
				</button>
			{/each}
		</div>
	{/snippet}

	{#snippet slot2()}
		<div class="flex flex-col gap-2 md:flex-row md:gap-4">
			<Dropdown
				id="region-mobile"
				options={allRegions}
				activeOption={selectedRegion}
				handleClick={(option) => (selectedRegion = option)}
				maxHeight={319}
				openId={openDropdownId}
				setOpenId={(id) => (openDropdownId = id)}
			/>
			<Dropdown
				id="difficulty-mobile"
				options={difficulties}
				activeOption={selectedDifficulty}
				handleClick={(option) => (selectedDifficulty = option)}
				openId={openDropdownId}
				setOpenId={(id) => (openDropdownId = id)}
			/>
			<Dropdown
				id="duration-mobile"
				options={durations}
				activeOption={selectedDuration}
				handleClick={(option) => (selectedDuration = option)}
				openId={openDropdownId}
				setOpenId={(id) => (openDropdownId = id)}
			/>
		</div>
	{/snippet}

	<Filter {slot1} {slot2} selectedFilter={selectedFilter.name} />

	<div class="x-margin">
		<div class="hidden flex-row items-end gap-2 md:flex md:gap-5">
			<Dropdown
				id="region-desktop"
				options={allRegions}
				activeOption={selectedRegion}
				handleClick={(option) => (selectedRegion = option)}
				openId={openDropdownId}
				setOpenId={(id) => (openDropdownId = id)}
			/>
			<Dropdown
				id="difficulty-desktop"
				options={difficulties}
				activeOption={selectedDifficulty}
				handleClick={(option) => (selectedDifficulty = option)}
				openId={openDropdownId}
				setOpenId={(id) => (openDropdownId = id)}
			/>
			<Dropdown
				id="duration-desktop"
				options={durations}
				activeOption={selectedDuration}
				handleClick={(option) => (selectedDuration = option)}
				openId={openDropdownId}
				setOpenId={(id) => (openDropdownId = id)}
			/>
			<div class="ml-auto mr-0 text-blue">
				{filteredTreks.length} treks
			</div>
		</div>

		<div class="t-margin grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
