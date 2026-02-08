<script>
	import Hero from '$lib/blocks/Hero.svelte';
	import TourOverview from '$lib/blocks/TourOverview.svelte';
	import { ChevronRight } from '@lucide/svelte';
	import NavDropdown from '$lib/pieces/NavDropdown.svelte';
	import Included from '$lib/blocks/Included.svelte';
	import Gallery from '$lib/blocks/Gallery.svelte';
	import { PortableText } from '@eirikk/portabletext-2-svelte-5';
	import Pricing from '$lib/pieces/Pricing.svelte';

	let { data } = $props();
	let activeContent = $state('overview');

	const general = $derived(data.general);
	const description = $derived(data.description);
	const details = $derived(data.details);
	const gallery = $derived(data.gallery);
	const packageContent = $derived(data.packageContent);
	const pricing = $derived(data.pricing);
	const duration = $derived(data.details.duration);

	const content = [
		{ label: 'Overview', value: 'overview' },
		{ label: 'Gallery', value: 'gallery' },
		{ label: 'Program', value: 'program' },
		{ label: 'Included', value: 'included' }
	];

	let sections;

	$effect(() => {
		// Wait for DOM to be ready
		const updateSections = () => {
			sections = document.querySelectorAll('.scroll-block');
			handleScroll(); // Check initial state
		};

		// Use setTimeout to ensure DOM is ready
		const timeoutId = setTimeout(updateSections, 100);
		
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleScroll, { passive: true });

		return () => {
			clearTimeout(timeoutId);
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};
	});

	const handleScroll = () => {
		if (!sections || sections.length === 0) return;

		let currentSection = null;
		const viewportHeight = window.innerHeight;
		const threshold = viewportHeight / 3;

		sections.forEach(function (section) {
			const rect = section.getBoundingClientRect();
			
			// Check if section is in view (top is above threshold and bottom is below top of viewport)
			if (rect.top <= threshold && rect.bottom > 0) {
				// If no current section, or this section is higher up (more visible)
				if (!currentSection || rect.top > currentSection.rect.top) {
					currentSection = { id: section.id, rect };
				}
			}
		});

		// If we found a section in view, update activeContent
		if (currentSection) {
			activeContent = currentSection.id;
		}
	};
</script>

<section class="relative h-[82vh]">
	{#key general}
		<Hero data={general} height="h-[86vh]" />
	{/key}
</section>

<div
	class="relative z-20 flex rounded-t-[30px] md:rounded-t-[40px] bg-light py-12 text-dark md:flex-row md:px-16 md:py-20 lg:px-40 lg:py-24"
>
	<aside class="relative hidden w-full flex-col pt-10 md:flex md:w-[30%] md:pr-12 lg:pr-24">
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
								? 'text-blue'
								: 'text-dark'}">{con.label}</a
						>
					</li>
				{/each}
			</ul>

			<Pricing {pricing} {duration} />
		</div>
	</aside>

	<article
		class="flex flex-col gap-12 md:w-[70%] md:gap-20 md:border-l md:border-dark30 md:pl-10 lg:gap-24 lg:pl-24"
	>
		<TourOverview {details} {description} {pricing} />
		{#if gallery}
			<Gallery {gallery} />
		{/if}
		<section id="program" class="scroll-block x-margin portable md:px-0">
			<h2 class="mb-8">Program</h2>
			<PortableText value={description.program} />
		</section>
		<Included {packageContent} />
	</article>
	<div class="fixed bottom-4 right-4 z-50 md:hidden">
		<NavDropdown
			options={content}
			activeOption={activeContent}
			handleClick={(option) => (activeContent = option)}
		/>
	</div>
</div>
