<script>
	import { urlFor } from '../../sanity/index';
	import PeaksSmall from '$lib/svg/PeaksSmall.svelte';
	import { fly } from 'svelte/transition';

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
	style:--image-mob={`url(${imgMob})`}
	style:--image-sm={`url(${imgSm})`}
	style:--image-md={`url(${imgMd})`}
	style:--image-lg={`url(${imgLg})`}
	style:--image-xl={`url(${imgXl})`}
	class="relative flex w-screen {height} flex items-end justify-between overflow-hidden bg-[image:var(--image-mob)] bg-cover bg-fixed bg-center bg-no-repeat px-3 pb-16 sm:bg-[image:var(--image-sm)] md:bg-[image:var(--image-md)] md:px-10 lg:bg-[image:var(--image-lg)] xl:bg-[image:var(--image-xl)]"
>
	<div class="z-20 flex">
		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-2 text-light80">
				{#each usps as text}
					<p class="text-lg">{text}</p>
				{/each}
			</div>

			{#if data.subtitle}
				<p class="text-3xl leading-[110%] text-light80 md:text-3xl lg:text-4xl xl:text-6xl">
					{data.subtitle}
				</p>
			{/if}
			<h1 class="w-[calc(100vw-5rem)] sm:w-[36rem] md:w-[34rem] lg:w-[32rem] xl:w-[64rem]">
				{data.title}
			</h1>
		</div>
	</div>

	{#if data.carousel}
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
	{/if}

	<div class="absolute left-0 top-0 z-10 size-full bg-dark30"></div>
</div>
