<script>
	import { urlFor } from '../../sanity/index';
	import Line from '$lib/pieces/Line.svelte';

	let { data, height } = $props();

	const imgMob = urlFor(data.image).width(576).height(1000).url();
	const imgSm = urlFor(data.image).width(768).url();
	const imgMd = urlFor(data.image).width(2000).url();
	const imgLg = urlFor(data.image).width(2000).url();
	const imgXl = urlFor(data.image).width(3000).url();
</script>

<div
	style:--image-mob={`url(${imgMob})`}
	style:--image-sm={`url(${imgSm})`}
	style:--image-md={`url(${imgMd})`}
	style:--image-lg={`url(${imgLg})`}
	style:--image-xl={`url(${imgXl})`}
	class="relative flex w-screen {height} flex items-end overflow-hidden bg-[image:var(--image-mob)] bg-cover bg-fixed bg-center bg-no-repeat pb-8 sm:bg-[image:var(--image-sm)] md:bg-[image:var(--image-md)] lg:bg-[image:var(--image-lg)] xl:bg-[image:var(--image-xl)]"
>
	<div
		class=" z-20 flex w-[calc(100vw-5rem)] flex-col gap-4 pl-[1.5rem] sm:w-[36rem] sm:pl-[3.5rem] md:w-[34rem] lg:w-[37rem] xl:w-[64rem]"
	>
		<h1>
			{data.title}
		</h1>

		{#if data.subtitle}
			<h2 class="text-light80">{data.subtitle}</h2>
		{/if}
	</div>

	<div class="absolute left-0 top-0 z-10 size-full bg-heroGradient"></div>

	<Line align="vertical" pos="top-0 right-[5rem] sm:right-[24rem]" height="h-full" />
</div>
