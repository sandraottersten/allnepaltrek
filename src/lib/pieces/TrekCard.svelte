<script>
	import { urlFor } from '../../sanity/index';
	import { Calendar, ChartNoAxesColumnIncreasing } from '@lucide/svelte';
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
		{#if tags}
			<p class="absolute right-0 top-3 z-20 rounded-l-lg bg-dark px-4 py-2 text-light">
				{getTag(tags[0])}
			</p>
		{/if}
		<div class="absolute left-0 top-0 z-10 size-full bg-dark10"></div>
		<img
			src={urlFor(cardImage).width(800).height(800).url()}
			alt={cardImage.attribution}
			class="size-full object-cover saturate-[.80] filter duration-300 group-hover:scale-105"
		/>
	</div>

	<div class="flex-1 px-1 pb-5 pt-4">
		<h3 class="text-blue group-hover:text-blue">{title}</h3>
		<p class="font-medium text-dark70">{subtitle}</p>
		<p class="mt-3">{description}</p>
	</div>

	<div class="mb-5 flex gap-8 px-1">
		<div class="flex h-min w-fit items-center gap-2 text-sm uppercase">
			<ChartNoAxesColumnIncreasing size={18} strokeWidth={2} class="text-blue" />
			<p class="font-medium">{difficulty}</p>
		</div>
		<div class="flex h-min w-fit items-center gap-2 text-sm uppercase">
			<Calendar size={18} strokeWidth={2} class="text-blue" />
			<p class="font-medium">{duration} DAYS</p>
		</div>
	</div>
</a>
