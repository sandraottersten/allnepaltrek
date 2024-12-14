<script>
	import Hero from '$lib/blocks/Hero.svelte';
	import Peaks from '$lib/svg/Peaks.svelte';
	import TrekCard from '$lib/pieces/TrekCard.svelte';
	import { PortableText } from '@eirikk/portabletext-2-svelte-5';
	import LinkButton from '$lib/pieces/LinkButton.svelte';
	import Dropdown from '$lib/pieces/Dropdown.svelte';
	import Filter from '$lib/pieces/Filter.svelte';
	import { Footprints, Mountain, Timer } from 'lucide-svelte';

	let { data } = $props();
	const { general, intro, introCard, treks } = data;

	const regions = [
		{ label: 'All regions', value: 'all' },
		{ label: 'Everest region', value: 'everest' },
		{ label: 'Annapurna region', value: 'annapurna' },
		{ label: 'Langtang region', value: 'langtang' },
		{ label: 'Other regions', value: 'other' }
	];

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

	const categories = [
		{
			label: 'All treks',
			value: 'all',
			icon: Mountain,
			title: 'Trekking packages',
			text: 'Explore Nepal’s trekking havens, from the snow-capped majestic peaks of Himalaya to the lush flowering forests of the valleys. Trekking in Nepal is an unforgettable journey through breathtaking scenery, rich cultural heritage and and genuine hospitality.'
		},
		{
			label: 'Classic treks',
			value: 'classic',
			icon: Footprints,
			title: 'Follow the footsteps',
			text: 'Explore Nepal’s trekking havens, from the snow-capped majestic peaks of Himalaya to the lush flowering forests of the valleys. Trekking in Nepal is an unforgettable journey through breathtaking scenery, rich cultural heritage and and genuine hospitality.'
		},
		{ label: 'Short treks', value: 'short', icon: Timer, title: 'Trekking packages', text: '' },
		{ label: 'Peak climbs', value: 'peak', icon: Mountain, title: 'Trekking packages', text: '' },
		{ label: 'Best views', value: 'view', icon: Mountain, title: 'Trekking packages', text: '' },
		{
			label: 'Of the beaten path',
			value: 'off',
			icon: Mountain,
			title: 'Trekking packages',
			text: ''
		}
	];

	let selectedFilter = $state(categories[0]);
	let selectedRegion = $state(regions[0]);
	let selectedDuration = $state(durations[0]);
	let selectedDifficulty = $state(difficulties[0]);

	const checkDuration = (trek) => {
		const duration = Number(trek.details.duration);

		if (duration < 10) return 'short';
		if (duration > 10 && duration < 16) return 'medium';
		if (duration > 16) return 'long';
	};

	let filteredTreks = $derived.by(() => {
		return treks
			.filter(
				(trek) => trek.details.tags.includes(selectedFilter.value) || selectedFilter.value === 'all'
			)
			.filter(
				(trek) => selectedRegion.value === trek.details.region || selectedRegion.value === 'all'
			)
			.filter(
				(trek) =>
					selectedDifficulty.value === trek.details.difficulty || selectedDifficulty.value === 'all'
			)
			.filter(
				(trek) => selectedDuration.value === checkDuration(trek) || selectedDuration.value === 'all'
			);
	});

	$inspect(filteredTreks);
</script>

<section class="relative">
	<Hero data={general} height="h-[92vh]" />

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

<section class="x-margin relative flex flex-col text-light md:flex-row md:gap-12">
	<div class="y-margin relative ml-0 flex w-full flex-col gap-5 md:w-3/5 md:pr-16 lg:pr-16">
		<h2 class="mb-5">{intro.title}</h2>
		<PortableText value={intro.text} />
	</div>

	<div
		class="md: z-20 flex h-min w-full flex-col items-center gap-8 rounded-3xl bg-light10 p-6 pt-12 text-light backdrop-blur md:mt-[-8rem] md:w-2/5 md:p-12 md:pt-16"
	>
		<h3 class="">{introCard.title}</h3>
		<PortableText value={introCard.text} />
		<LinkButton label="Contact us" link="/" />
	</div>
</section>

<section class="x-margin y-margin rounded-3xl bg-light">
	{#snippet slot1()}
		<div class="grid grid-cols-2 gap-2 md:grid-cols-6 md:gap-4">
			{#each categories as category}
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
					{category.label}
				</button>
			{/each}
		</div>
	{/snippet}

	<div class="grid grid-cols-2 gap-2 md:grid-cols-6 md:gap-4">
		{#each categories as category}
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
				{category.label}
			</button>
		{/each}
	</div>

	<Filter {slot1} {slot2} />

	<div class="mb-8 flex w-full flex-col gap-4 md:mt-16 md:w-2/3">
		<h2>{selectedFilter.title}</h2>
		<p class="">{selectedFilter.text}</p>
	</div>

	{#snippet slot2()}
		<div class="flex flex-col gap-2 md:flex-row md:gap-4">
			<Dropdown
				options={regions}
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

	<div class="flex flex-col gap-2 md:flex-row md:gap-4">
		<Dropdown
			options={regions}
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

	<div class="mt-12 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
		{#key filteredTreks}
			{#each filteredTreks as trek, i}
				<TrekCard index={i} bind:trek={filteredTreks[i]} />
			{/each}
		{/key}
	</div>
</section>
