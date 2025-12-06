<script>
	import { urlFor } from '../../sanity/index';
	import PeaksSmall from '$lib/svg/PeaksSmall.svelte';
	import { fly } from 'svelte/transition';
	import LinkButton from '$lib/pieces/LinkButton.svelte';
	let { data, height, usps } = $props();

	const imgMob = urlFor(data.image).width(576).height(1000).url();
	const imgSm = urlFor(data.image).width(768).url();
	const imgMd = urlFor(data.image).width(2000).url();
	const imgLg = urlFor(data.image).width(2000).url();
	const imgXl = urlFor(data.image).width(3000).url();

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
		<!-- <LinkButton label="Go to treks" /> -->
	</div>

	<!-- {#if data.carousel}
		<div class="z-20 hidden overflow-hidden rounded-3xl bg-dark80 md:block">
			<div class="relative h-[400px] w-[300px] overflow-hidden rounded-3xl">
				<div class="absolute left-0 top-0 z-10 size-full bg-dark10"></div>
				{#each [data.carousel[currentSlideItem]] as item (currentSlideItem)}
					<img
						in:fly={{ duration: 2000, x: 200 }}
						src={urlFor(item.image).width(576).height(1000).url()}
						alt={item.image.attribution}
						class="size-full rounded-3xl object-cover"
					/>
				{/each}
			</div>
			<div class="flex h-14 items-center px-4">
				<a
					href={data.carousel[currentSlideItem].link}
					class="flex w-full justify-between text-light80 group-hover:text-orange"
				>
					{#each [data.carousel[currentSlideItem]] as item (currentSlideItem)}
						<span in:fly={{ duration: 2000, x: 60 }}>{item.title}</span>
					{/each}
					<PeaksSmall size="size-[24px]" />
				</a>
			</div>
		</div>
	{/if} -->

	<div class="absolute left-0 top-0 z-10 size-full bg-heroGradient3"></div>
</div>
