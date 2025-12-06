<script>
	import Hero from '$lib/blocks/Hero.svelte';
	import Gallery from '$lib/blocks/Gallery.svelte';
	import { PortableText } from '@eirikk/portabletext-2-svelte-5';
	import ActivityCard from '$lib/pieces/ActivityCard.svelte';
	let { data } = $props();

	const general = $derived(data.general);
	const description = $derived(data.description);
	const gallery = $derived(data.gallery);
	const tours = $derived(data.tours);
	const treks = $derived(data.treks);
</script>

<section class="relative h-[77vh]">
	{#key general}
		<Hero data={general} height="h-[82vh]" />
	{/key}
</section>

<section
	class="x-margin relative z-20 flex flex-col rounded-t-3xl bg-light py-12 text-dark md:flex-row md:py-20 lg:py-24"
>
	<div class="md:w-[70%] md:border-r md:border-dark30 md:pr-10 lg:pr-24">
		<article class="rounded-3xlpx-4 portable flex w-full flex-col md:px-0">
			<h2 class="mb-12 text-center md:w-5/6 md:text-left">{description.title}</h2>
			<PortableText value={description.text} />
		</article>
		{#if gallery?.images.length > 3}
			<Gallery images={gallery.images} />
		{/if}
	</div>
	<aside class="top-12 hidden h-fit w-full flex-col gap-4 md:flex md:w-[30%] md:pl-12 lg:pl-16">
		<section class="flex flex-col gap-12">
			{#each treks as trek}
				<ActivityCard data={trek} link={`/treks/${trek.seo.slug.current}`} />
			{/each}
			{#each tours as tour}
				<ActivityCard data={tour} link={`/tours/${tour.seo.slug.current}`} />
			{/each}
		</section>
	</aside>
	<div class="mt-12 flex flex-col gap-12 md:hidden">
		{#each treks as trek}
			<ActivityCard data={trek} link={`/treks/${trek.seo.slug.current}`} />
		{/each}
		{#each tours as tour}
			<ActivityCard data={tour} link={`/tours/${tour.seo.slug.current}`} />
		{/each}
	</div>
</section>
