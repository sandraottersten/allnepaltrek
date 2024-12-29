<script>
	import Hero from '$lib/blocks/Hero.svelte';
	import Peaks from '$lib/svg/Peaks.svelte';
	import LinkButton from '$lib/pieces/LinkButton.svelte';
	import TrekCard from '$lib/pieces/TrekCard.svelte';
	import Divider from '$lib//pieces/Divider.svelte';
	import InfoCard from '$lib/pieces/InfoCard.svelte';

	let { data } = $props();
	const { general, intro, treks } = data;

	const heroTexts = [
		'Packages and customized treks',
		'25 years of experience',
		'Local travel agency'
	];

	const usps = [intro.usp1, intro.usp2, intro.usp3];
</script>

<section class="relative">
	<Hero data={general} height="h-[calc(100vh+2rem)]" />

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
			<div class="flex w-full items-center pl-6 text-sm">
				<p class="sub-small">{text}</p>
			</div>
		{/each}
	</div>
</section>

<section
	class="x-margin z-20 -mt-8 flex flex-col rounded-t-[40px] bg-light pt-0 text-dark md:gap-12"
>
	<div class="y-margin flex w-full flex-col items-center gap-16">
		<h2 class="px-3 md:max-w-[50%] md:text-center">{intro.title}</h2>
		<div class="grid grid-cols-1 gap-8 px-3 md:grid-cols-3">
			{#each usps as usp}
				<div class="border-l border-dark30 pl-5">
					<p>{usp}</p>
				</div>
			{/each}
		</div>
	</div>
	<InfoCard image={intro.image} />
</section>

<section class="y-margin flex flex-col gap-5">
	<h2 class="x-margin">Trekking packages</h2>
	<Divider />
	<p class="x-margin md:max-w-[60%]">
		Tell us about your interest and needs. We’ll work together with you to customize your trip just
		how you want it.
	</p>
	<div class="x-margin mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
		{#each treks as trek}
			<TrekCard {trek} />
		{/each}
	</div>
	<div class="flex flex-col items-center gap-8 py-12">
		<p class="w-[90%] text-center text-3xl font-medium text-dark70 md:w-[40rem] md:text-4xl">
			It's not the mountain we conquer but ourselves
		</p>
		<LinkButton label="See all treks" link="/treks" />
	</div>
</section>
