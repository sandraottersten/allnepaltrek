<script>
	import { urlFor } from '../../sanity/index';
	import { ChevronsRight } from '@lucide/svelte';
	let { tour } = $props();
	const { cardImage, title, description } = $derived(tour.general);
	const { duration } = $derived(tour.details);
	const { slug } = $derived(tour.seo);
</script>

<a href={`/tours/${slug.current}`} class="group flex h-full w-full cursor-pointer flex-col">
	<div class="relative h-full overflow-hidden rounded-lg">
		<img
			src={urlFor(cardImage).width(800).height(500).url()}
			alt={cardImage.attribution}
			class="size-full object-cover saturate-[.80] filter duration-300 group-hover:scale-105"
		/>
		<div
			class="absolute right-0 top-0 hidden h-full w-2/5 flex-col justify-end gap-5 bg-light80 p-6 text-dark backdrop-blur md:flex"
		>
			<p>{description}</p>
			<span class="group flex items-center gap-2">
				<div class="group mb-2 mt-2 flex items-center gap-1">
					<span class="text-blue">Read more</span>
					<ChevronsRight
						size={24}
						class="transform text-blue duration-200 group-hover:translate-x-1"
					/>
				</div>
			</span>
		</div>
	</div>

	<div class="flex justify-between px-3 py-3 text-lg font-medium">
		<p>{title}</p>
		<p>{duration}</p>
	</div>
	<hr class="border-1 w-full border-dark30 group-hover:border-blue" />

	<div class="gap-5p-6 flex flex-col justify-end p-3 text-dark md:hidden">
		<p>{description}</p>
		<span class="group flex items-center gap-2">
			<div class="group mb-2 mt-2 flex items-center gap-1">
				<span class="text-blue">Read more</span>
				<ChevronsRight
					size={24}
					class="transform text-blue duration-200 group-hover:translate-x-1"
				/>
			</div>
		</span>
	</div>
</a>
