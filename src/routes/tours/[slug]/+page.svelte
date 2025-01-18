<script>
	import Hero from '$lib/blocks/Hero.svelte';
	import TourOverview from '$lib/blocks/TourOverview.svelte';
	import LinkButton from '$lib/pieces/LinkButton.svelte';
	import { ChevronRight } from 'lucide-svelte';
	import NavDropdown from '$lib/pieces/NavDropdown.svelte';
	import Peaks from '$lib/svg/Peaks.svelte';
	import Included from '$lib/blocks/Included.svelte';
	import Gallery from '$lib/blocks/Gallery.svelte';
	import { PortableText } from '@eirikk/portabletext-2-svelte-5';

	let { data } = $props();
	let activeContent = $state('overview');

	const { general, description, details, gallery, packageContent } = data;
	const { cat1, cat2, cat3, cat4 } = data.pricing;

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
	<Hero data={general} height="h-[calc(100vh+2rem)]" />

	<div
		class="absolute bottom-[5rem] right-0 flex h-[6rem] items-end justify-center pb-8 sm:bottom-[13.5rem] sm:h-[calc(100vh-17.5rem)] sm:w-[24rem]"
	>
		<div class="size-[80px] sm:size-[120px] md:size-[270px]">
			<Peaks />
		</div>
	</div>
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

		<section class="flex h-min flex-col items-center gap-8">
			<div class="flex w-full flex-col gap-4">
				<span class="flex items-baseline justify-between border-b border-dark30 pb-2">
					<p class="font-medium">1 pax</p>
					<p class="text-5xl font-medium md:text-3xl">${cat1}</p>
				</span>
				<p class="flex text-nowrap border-b border-dark30 pb-2 leading-4">
					2 - 5 pax <span class="mx-2 w-full flex-grow border-b border-light80"></span>${cat2}
				</p>
				<p class="flex text-nowrap border-b border-dark30 pb-2 leading-4">
					6 - 10 pax <span class="mx-2 w-full flex-grow border-b border-light80"></span>${cat3}
				</p>
				<p class="flex text-nowrap border-b border-dark30 pb-2 leading-4">
					11 - 15 pax <span class="mx-2 w-full flex-grow border-b border-light80"></span>${cat4}
				</p>
			</div>
			<LinkButton label="Contact us" link="/" />
		</section>
	</aside>

	<article class="md:w-[70%] md:border-l md:border-dark30 md:pl-10 lg:pl-24">
		<TourOverview {details} {description} />
		{#if gallery}
			<Gallery {gallery} />
		{/if}
		<section id="program" class="y-margin">
			<h2>Program</h2>
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
