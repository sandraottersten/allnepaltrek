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
		<source src="/trekkers.mp4" type="video/mp4" />
	</video>

	<div class="z-20 flex flex-col items-center gap-4 pt-60">
		<h1 class="w-[calc(100vw-5rem)] text-center">
			{data.title}
		</h1>

		<p
			class="mb-8 text-center text-xl text-light80 sm:w-[36rem] md:w-[34rem] md:text-xl lg:w-[42rem] xl:w-[64rem]"
		>
			{data.subtitle}
		</p>
		<!-- <LinkButton label="Go to treks" /> -->
	</div>

	<div class="absolute left-0 top-0 z-10 size-full bg-heroGradient3"></div>
</div>
