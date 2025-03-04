<script>
	import Hero from '$lib/blocks/Hero.svelte';
	import TrekOverview from '$lib/blocks/TrekOverview.svelte';
	import LinkButton from '$lib/pieces/LinkButton.svelte';
	import { ChevronRight } from 'lucide-svelte';
	import Itinerary from '$lib/blocks/Itinerary.svelte';
	import NavDropdown from '$lib/pieces/NavDropdown.svelte';
	import Included from '$lib/blocks/Included.svelte';
	import Gallery from '$lib/blocks/Gallery.svelte';
	import Map from '$lib/blocks/Map.svelte';
	import AnimatedMap from '$lib/pieces/AnimatedMap.svelte';
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

<section class="relative">
	{#key general}
		<Hero data={general} height="h-[105vh]" />
		<AnimatedMap map={itinerary.map} />
	{/key}
</section>

<div
	class="z-20 -mt-10 flex rounded-t-3xl bg-light py-12 text-dark md:flex-row md:rounded-t-[40px] md:px-16 md:py-28 lg:px-40 lg:py-32"
>
	<aside class="relative hidden w-full flex-col pt-40 md:flex md:w-[30%] md:pr-12 lg:pr-24">
		<div class="sticky top-20 flex h-fit flex-col gap-12">
			<ul class="flex flex-col">
				{#each content as con}
					<li class="flex items-center gap-1 border-t border-dark30 py-3">
						<span class={activeContent === con.value ? 'opacity-1' : 'opacity-0'}>
							<ChevronRight color="#EE7430" />
						</span>
						<a
							href={`#${con.value}`}
							class="font-medium uppercase hover:text-orange {activeContent === con.value
								? 'text-orange'
								: 'text-dark'}">{con.label}</a
						>
					</li>
				{/each}
			</ul>

			<div class="flex h-min flex-col items-center gap-8">
				<div class="flex w-full flex-col gap-4">
					<span class="flex items-baseline justify-between border-b border-dark30 pb-2">
						<p class="font-medium">1 person</p>
						<p class="text-5xl font-medium md:text-3xl">${pricing.cat1}</p>
					</span>
					<p class="flex text-nowrap border-b border-dark30 pb-2 leading-4">
						2 - 5 ppl <span class="mx-2 w-full flex-grow border-b border-light80"
						></span>${pricing.cat2}
					</p>
					<p class="flex text-nowrap border-b border-dark30 pb-2 leading-4">
						6 - 10 ppl <span class="mx-2 w-full flex-grow border-b border-light80"
						></span>${pricing.cat3}
					</p>
					<p class="flex text-nowrap border-b border-dark30 pb-2 leading-4">
						11 - 15 ppl <span class="mx-2 w-full flex-grow border-b border-light80"
						></span>${pricing.cat4}
					</p>
				</div>
				<LinkButton label="Contact us" link="/" />
			</div>
		</div>
	</aside>

	<article class="md:w-[70%] md:border-l md:border-dark30 md:pl-10 lg:pl-24">
		{#key description}
			<TrekOverview {details} {description} />
		{/key}
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
	</article>

	<div class="fixed bottom-4 right-4 z-50 md:hidden">
		<NavDropdown
			options={content}
			activeOption={activeContent}
			handleClick={(option) => (activeContent = option)}
		/>
	</div>
</div>
