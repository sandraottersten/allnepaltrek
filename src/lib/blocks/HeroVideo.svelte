<script>
	import { urlFor } from '../../sanity/index';
	import Peaks from '$lib/svg/Peaks.svelte';
	import { fly } from 'svelte/transition';

	let { data, height, usps } = $props();

	let currentSlideItem = $state(0);

	$effect(() => {
		if (data.carousel && data.carousel.length > 0) {
			currentSlideItem = 0;
			const interval = setInterval(() => {
				currentSlideItem = (currentSlideItem + 1) % data.carousel.length;
			}, 5000);

			return () => {
				clearInterval(interval);
			};
		}
	});
</script>

<div
	class="relative flex w-screen {height} flex items-end justify-between overflow-hidden px-3 pb-12 md:px-10"
>
	<video class="absolute inset-0 h-full w-full object-cover" autoplay loop muted playsinline>
		<source src="/test1.mp4" type="video/mp4" />
	</video>

	<div class="z-20 flex w-full justify-between">
		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-2 text-light">
				{#each usps as text}
					<p class="text-lg">{text}</p>
				{/each}
			</div>

			{#if data.subtitle}
				<p class="text-3xl leading-[110%] text-light80 md:text-3xl lg:text-4xl xl:text-6xl">
					{data.subtitle}
				</p>
			{/if}
			<h1
				class="w-[calc(100vw-5rem)] font-semibold text-light sm:w-[36rem] md:w-[34rem] lg:w-[32rem] xl:w-[64rem]"
			>
				{data.title}
			</h1>
		</div>
		<Peaks size="w-[24vh] mb-[10vh]" />
	</div>

	<div class="bg-heroGradient3 absolute left-0 top-0 z-10 size-full"></div>
</div>
