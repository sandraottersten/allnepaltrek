<script>
	import { urlFor } from '../../sanity/index';
	import PeaksSmall from '$lib/svg/PeaksSmall.svelte';

	let { tour } = $props();
	const { cardImage, title, description } = tour.general;
	const { duration } = tour.details;
	const { slug } = tour.seo;
</script>

<a href={`/tours/${slug.current}`} class="group flex h-full w-full cursor-pointer flex-col">
	<div class="relative h-full overflow-hidden rounded-3xl">
		<img
			src={urlFor(cardImage).width(800).height(500).url()}
			alt={cardImage.attribution}
			class="size-full object-cover"
		/>
		<div
			class="absolute right-0 top-0 hidden h-full w-2/5 flex-col justify-end gap-5 bg-dark70 p-8 text-light md:group-hover:flex"
		>
			<p>{description}</p>
			<span class="group flex items-center gap-2">
				<PeaksSmall size="size-[24px] min-w-[24px]" />
				<p class="group-hover:text-orange">Read more</p>
			</span>
		</div>
	</div>

	<div class="flex justify-between px-3 py-3 text-lg font-medium">
		<p>{title}</p>
		<p>{duration}</p>
	</div>
	<hr class="border-1 w-full border-dark30 group-hover:border-orange" />
</a>
