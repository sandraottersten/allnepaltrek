<script>
	import { urlFor } from '../../sanity/index';
	import PeaksSmall from '$lib/svg/PeaksSmall.svelte';
	import { fly } from 'svelte/transition';
	import LinkButton from '$lib/pieces/LinkButton.svelte';
	let { data, height, usps } = $props();

	const imgMob = $derived(urlFor(data.image).width(576).height(1000).url());
	const imgSm = $derived(urlFor(data.image).width(768).url());
	const imgMd = $derived(urlFor(data.image).width(2000).url());
	const imgLg = $derived(urlFor(data.image).width(2000).url());
	const imgXl = $derived(urlFor(data.image).width(3000).url());

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
	class="relative flex w-screen {height} flex items-end justify-center overflow-hidden px-3 pb-12 md:px-10"
>
	<img
		src={imgXl}
		alt={data.image.attribution || 'Hero image'}
		class="absolute left-0 top-0 size-full object-cover saturate-[.8] filter"
	/>
	<div class="z-20 flex flex-col items-center gap-4 pt-60">
		<h1 class="text-center md:w-[75%]">
			{data.title}
		</h1>

		<p
			class="mb-8 text-center text-xl text-light80 sm:w-[36rem] md:w-[34rem] md:text-xl lg:w-[42rem] xl:w-[64rem]"
		>
			{data.subtitle}
		</p>
	</div>

	<div class="absolute left-0 top-0 z-10 size-full bg-heroGradient3"></div>
</div>
