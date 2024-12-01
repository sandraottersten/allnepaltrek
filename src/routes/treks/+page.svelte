<script>
	import Hero from '$lib/blocks/Hero.svelte';
	import Peaks from '$lib/svg/Peaks.svelte';
	import TrekCard from '$lib/pieces/TrekCard.svelte';
	import { PortableText } from '@eirikk/portabletext-2-svelte-5';
	import LinkButton from '$lib/pieces/LinkButton.svelte';

	let { data } = $props();
	const { general, intro, introCard, treks } = data;
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
	<div class="y-margin relative ml-0 flex w-full flex-col gap-5 pr-6 md:w-3/5 md:pr-16 lg:pr-16">
		<h2 class="mb-5">{intro.title}</h2>
		<PortableText value={intro.text} />
	</div>

	<div
		class="z-20 mt-[-8rem] flex h-min w-2/5 flex-col items-center gap-8 rounded-3xl bg-light10 p-12 pt-12 text-light backdrop-blur md:mt-[-8rem] md:pt-16"
	>
		<h3 class="">{introCard.title}</h3>
		<PortableText value={introCard.text} />
		<LinkButton label="Contact us" link="/" />
	</div>
</section>

<section class="x-margin y-margin rounded-3xl bg-light">
	<p class="text-2xl font-medium">Choose your experience</p>
	<h2>Trekking packages</h2>
	<div class="mt-12 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
		{#each treks as trek}
			<TrekCard {trek} />
		{/each}
	</div>
</section>
