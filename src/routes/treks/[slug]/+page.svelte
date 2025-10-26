<script>
	import Hero from '$lib/blocks/Hero.svelte';
	import TrekOverview from '$lib/blocks/TrekOverview.svelte';
	import { ChevronRight } from '@lucide/svelte';
	import Itinerary from '$lib/blocks/Itinerary.svelte';
	import NavDropdown from '$lib/pieces/NavDropdown.svelte';
	import Pricing from '$lib/pieces/Pricing.svelte';
	import Included from '$lib/blocks/Included.svelte';
	import Gallery from '$lib/blocks/Gallery.svelte';
	import Map from '$lib/blocks/Map.svelte';
	import Tours from '$lib/blocks/Tours.svelte';
	let { data } = $props();
	let activeContent = $state('overview');

	const general = $derived(data.general);
	const description = $derived(data.description);
	const details = $derived(data.details);
	const itinerary = $derived(data.itinerary);
	const gallery = $derived(data.gallery);
	const packageContent = $derived(data.packageContent);
	const pricing = $derived(data.pricing);
	const tours = $derived(data.tours);

	const content = [
		{ label: 'Overview', value: 'overview' },
		{ label: 'Gallery', value: 'gallery' },
		{ label: 'Itinerary', value: 'itinerary' },
		{ label: 'Map', value: 'map' },
		{ label: 'Included', value: 'included' },
		{ label: 'Combine with', value: 'tours' }
	];

	let sections;

	$effect(() => {
		sections = document.querySelectorAll('.scroll-block ');
		document.addEventListener('scroll', handleScroll);
		return () => {
			document.removeEventListener('scroll', handleScroll);
		};
	});

	const handleScroll = () => {
		sections.forEach(function (section) {
			var rect = section.getBoundingClientRect();
			const viewportHeight = window.innerHeight;

			if (rect.top <= viewportHeight / 3 && rect.bottom > 0) {
				activeContent = section.id;
			}
		});
	};
</script>

<section class="relative h-[77vh]">
	{#key general}
		<Hero data={general} height="h-[82vh]" />
	{/key}
</section>

<div
	class="relative z-20 flex rounded-t-[40px] bg-light text-dark md:flex-row md:px-16 md:py-20 lg:px-40 lg:py-24"
>
	<aside class="relative hidden w-full flex-col pt-10 md:flex md:w-[30%] md:pr-12 lg:pr-24">
		<div class="sticky top-20 flex h-fit flex-col gap-12">
			<ul class="flex flex-col">
				{#each content as con}
					<li class="flex items-center gap-1 border-t border-dark30 py-3">
						<span class={activeContent === con.value ? 'opacity-1' : 'opacity-0'}>
							<ChevronRight color="#027B83" />
						</span>
						<a
							href={`#${con.value}`}
							class="font-medium uppercase hover:text-blue {activeContent === con.value
								? 'text-blue'
								: 'text-dark'}">{con.label}</a
						>
					</li>
				{/each}
			</ul>

			<Pricing {pricing} />
		</div>
	</aside>

	<article class="md:w-[70%] md:border-l md:border-dark30 md:pl-10 lg:pl-24">
		{#key general}
			<TrekOverview {details} {description} />
			{#if gallery}
				<Gallery {gallery} />
			{/if}
			<Itinerary {itinerary} />
			{#if itinerary.map}
				<Map map={itinerary.map} image={general.image} />
			{/if}
			<Included {packageContent} />
			{#if tours && tours.length > 0}
				<Tours {tours} />
			{/if}
		{/key}
	</article>

	<div class="fixed bottom-4 right-4 z-50 md:hidden">
		<NavDropdown
			options={content}
			activeOption={activeContent}
			handleClick={(option) => (activeContent = option)}
		/>
	</div>
</div>
