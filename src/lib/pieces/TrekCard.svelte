<script>
	import { urlFor } from '../../sanity/index';
	import PeaksSmall from '$lib/svg/PeaksSmall.svelte';

	let { trek = $bindable() } = $props();
	const { cardImage, title, subtitle, description } = trek.general;
	const { duration, difficulty, tags } = trek.details;
	const { slug } = trek.seo;

	const getTag = (tag) => {
		switch (tag) {
			case 'short':
				return 'Short trek';
			case 'view':
				return 'Best views';
			case 'classic':
				return 'Classic';
			case 'offpath':
				return 'Off the beaten path';
			default:
				return '';
		}
	};
</script>

<a
	href={`/treks/${slug.current}`}
	class="group relative flex h-full w-full cursor-pointer flex-col"
>
	<div class="relative aspect-[380/400] overflow-hidden rounded-lg">
		<div class="invisible absolute bottom-4 right-4 z-20 group-hover:visible">
			<PeaksSmall size="size-[32px] min-w-[32px] md:size-[42px] md:min-w-[42px]" />
		</div>
		{#if tags}
			<div class="absolute right-0 top-0 z-20 rounded-lg bg-dark80 px-4 py-3 text-light">
				{getTag(tags[0])}
			</div>
		{/if}
		<div class="absolute left-0 top-0 z-10 size-full bg-dark10"></div>
		<img
			src={urlFor(cardImage).width(800).height(800).url()}
			alt={cardImage.attribution}
			class="size-full object-cover saturate-[.80] filter"
		/>
	</div>

	<div class="flex-1 px-1 py-5 md:px-0">
		<h3 class="group-hover:text-orange">{title}</h3>
		<p class="font-medium text-dark70">{subtitle}</p>
		<p class="mt-3">{description}</p>
	</div>

	<div class="my-5 flex gap-2 px-1 md:px-0">
		<div class="flex h-min w-fit flex-col rounded bg-dark10 px-4 py-1 text-sm uppercase text-dark">
			<p class="font-medium">{difficulty}</p>
		</div>
		<div class="flex h-min w-fit flex-col rounded bg-dark10 px-4 py-1 text-sm uppercase text-dark">
			<p class="font-medium">{duration} DAYS</p>
		</div>
	</div>
</a>
