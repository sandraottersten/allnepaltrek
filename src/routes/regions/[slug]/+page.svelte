<script>
	import Hero from '$lib/blocks/Hero.svelte';
	import PeaksSmall from '$lib/svg/PeaksSmall.svelte';
	import Gallery from '$lib/blocks/Gallery.svelte';
	import { PortableText } from '@eirikk/portabletext-2-svelte-5';

	let { data } = $props();

	const { general, description, treks, gallery } = data;
</script>

<section class="relative h-[92vh]">
	{#key general}
		<Hero data={general} height="h-[105vh]" />
	{/key}
</section>

<div
	class="relative z-20 mt-20 flex rounded-t-[40px] bg-light pt-12 text-dark md:flex-row md:px-16 md:py-20 lg:px-40 lg:py-24"
>
	<div class="md:w-[70%] md:border-r md:border-dark30 md:pr-10 lg:pr-24">
		<article class="flex w-full flex-col gap-12 rounded-3xl bg-light px-4 md:gap-16 md:px-0">
			<h2 class="w-5/6">{description.title}</h2>
			<PortableText value={description.text} />
		</article>
		{#if gallery?.images.length > 3}
			<Gallery images={gallery.images} />
		{/if}
	</div>
	<aside
		class="sticky top-12 hidden h-fit w-full flex-col gap-4 md:flex md:w-[30%] md:pl-12 lg:pl-16"
	>
		<section class="flex flex-col">
			{#each treks as trek}
				<div class="flex flex-col border-t border-dark30 py-3">
					<div class="flex items-center gap-2">
						<PeaksSmall size="size-[24px] min-w-[24px]" />
						<p class="h4">{trek.general.title}</p>
					</div>
					<p>{trek.general.subtitle}</p>
					<p class="mt-1 text-sm">{trek.general.description}</p>
				</div>
			{/each}
		</section>
	</aside>
</div>
