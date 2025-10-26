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

	const content = [
		{ label: 'Overview', value: 'overview' },
		{ label: 'Gallery', value: 'gallery' },
		{ label: 'Program', value: 'program' },
		{ label: 'Included', value: 'included' }
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

<section class="relative h-[92vh]">
	{#key general}
		<Hero data={general} height="h-[105vh]" />
	{/key}
</section>

<div
	class="relative z-20 mt-20 flex rounded-t-[40px] bg-light text-dark md:flex-row md:px-16 md:py-20 lg:px-40 lg:py-24"
>
	<aside
		class="sticky top-20 hidden h-fit w-full flex-col gap-12 md:flex md:w-[30%] md:pr-12 lg:pr-24"
	>
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

		<Pricing {pricing} />
	</aside>

	<article class="md:w-[70%] md:border-l md:border-dark30 md:pl-10 lg:pl-24">
		<TourOverview {details} {description} />
		{#if gallery}
			<Gallery {gallery} />
		{/if}
		<section id="program" class="y-margin portable">
			<h3>Program</h3>
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
