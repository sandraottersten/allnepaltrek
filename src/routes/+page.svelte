<script>
	import Hero from '$lib/blocks/Hero.svelte';
	import Peaks from '$lib/svg/Peaks.svelte';
	import TrekCard from '$lib/pieces/TrekCard.svelte';
	import PeaksSmall from '$lib/svg/PeaksSmall.svelte';
	import { urlFor } from '../sanity/index';

	let { data } = $props();
	const { general, intro, treks } = data;

	const heroTexts = [
		'Packages and customized treks',
		'25 years of experience',
		'Local travel agency'
	];

	const imgMob = urlFor(intro.image).width(576).url();
	const imgSm = urlFor(intro.image).width(768).url();
	const imgMd = urlFor(intro.image).width(600).url();
	const imgLg = urlFor(intro.image).width(600).url();
	const imgXl = urlFor(intro.image).width(800).url();

	const usps = [intro.usp1, intro.usp2, intro.usp3];
</script>

<section class="size-screen relative">
	<Hero data={general} height="h-screen" />

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

	<div class="absolute bottom-[3rem] right-0 hidden flex-col sm:flex">
		{#each heroTexts as text}
			<div class="flex h-[3.5rem] w-[24rem] items-center border-t border-light30 pl-5 text-base">
				<p class="sub-small">{text}</p>
			</div>
		{/each}
	</div>

	<div
		class="absolute bottom-[4rem] left-0 flex flex-col gap-2 border-t border-light30 py-[3rem] sm:hidden"
	>
		{#each heroTexts as text}
			<div class="flex w-screen items-center pl-6 text-sm">
				<p class="sub-small">{text}</p>
			</div>
		{/each}
	</div>
</section>

<section class="flex flex-col bg-dark text-light md:flex-row md:gap-12">
	<div class="x-margin y-margin relative flex w-full flex-col gap-5 md:w-3/5">
		<h2 class="mb-5">{intro.title}</h2>
		{#each usps as usp}
			<div class="flex flex-col gap-2 md:flex-row md:gap-4">
				<PeaksSmall size="size-[32px] min-w-[32px] md:size-[42px] md:min-w-[42px]" />
				<p>{usp}</p>
			</div>
		{/each}
		<div class="bg-blue40 absolute right-[-50px] top-[-50px] size-[200px] blur-[58px] filter"></div>
	</div>
	<div class="w-full md:w-2/5">
		<img
			src={imgMob}
			srcset={`${imgMob} 576w, ${imgSm} 768w, ${imgMd} 600w, ${imgLg} 600w, ${imgXl} 800w`}
			alt={intro.image.attribution}
			class="size-full object-cover"
		/>
	</div>
</section>

<section class="x-margin y-margin">
	<h2>Trekking packages</h2>
	<div class="mt-12 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
		{#each treks as trek}
			<TrekCard {trek} />
		{/each}
	</div>
</section>
