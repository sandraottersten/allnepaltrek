<script>
	import { urlFor } from '../../sanity/index';
	import Line from '$lib/pieces/Line.svelte';

	let { data, height } = $props();

	const imgMob = urlFor(data.image).width(576).url();
	const imgSm = urlFor(data.image).width(768).url();
	const imgMd = urlFor(data.image).width(1024).url();
	const imgLg = urlFor(data.image).width(1440).url();
	const imgXl = urlFor(data.image).width(2000).url();
</script>

<div class="relative flex w-screen {height}">
	<div
		class="absolute bottom-[17.5rem] flex w-[calc(100vw-5rem)] flex-col gap-4 pl-[1.5rem] sm:bottom-1/4 sm:w-[36rem] sm:pl-[3.5rem] md:w-[34rem] lg:w-[37rem] xl:w-[64rem]"
	>
		<h1>
			{data.title}
		</h1>

		{#if data.subtitle}
			<h2 class="text-light80">{data.subtitle}</h2>
		{/if}
	</div>

	<img
		src={imgMob}
		srcset={`${imgMob} 576w, ${imgSm} 768w, ${imgMd} 1024w, ${imgLg} 1440w, ${imgXl} 2000w`}
		sizes="100vw"
		alt={data.image.attribution}
		class="size-full object-cover"
	/>
	<Line align="horizontal" pos="top-[4rem] left-0" width="w-full" />
	<!-- <Line align="horizontal" pos="bottom-[4rem] sm:bottom-[3rem] left-0" width="w-full" /> -->
	<Line align="vertical" pos="top-0 right-[5rem] sm:right-[24rem]" height="h-full" />
</div>
