<script>
	import { urlFor } from '../../sanity/index';
	import PeaksSmall from '$lib/svg/PeaksSmall.svelte';
	import Divider from './Divider.svelte';

	let { trek = $bindable() } = $props();
	const { cardImage, title, subtitle, description } = trek.general;
	const { duration, difficulty } = trek.details;
	const { slug } = trek.seo;
</script>

<a
	href={`/treks/${slug.current}`}
	class="group relative flex h-full w-full cursor-pointer flex-col"
>
	<div class="relative aspect-[380/400] overflow-hidden rounded-3xl">
		<div class="invisible absolute bottom-4 right-4 z-20 group-hover:visible">
			<PeaksSmall size="size-[32px] min-w-[32px] md:size-[42px] md:min-w-[42px]" />
		</div>
		<!-- <div class="absolute left-0 top-0 z-10 size-full bg-cardGradient"></div> -->
		<img
			src={urlFor(cardImage).width(800).height(800).url()}
			alt={cardImage.attribution}
			class="size-full object-cover"
		/>
	</div>

	<div class="flex-1 py-5">
		<h3>{title}</h3>
		<p class="sub-small">{subtitle}</p>
		<p class="mt-3">{description}</p>
	</div>

	<div class="my-5 flex gap-2">
		<div
			class="flex h-min w-fit flex-col rounded-full bg-dark10 px-4 py-1 text-sm uppercase text-dark"
		>
			<p class="font-medium">{difficulty}</p>
		</div>
		<div
			class="flex h-min w-fit flex-col rounded-full bg-dark10 px-4 py-1 text-sm uppercase text-dark"
		>
			<p class="font-medium">{duration} DAYS</p>
		</div>
	</div>
	<hr class="border-1 w-full border-dark30 group-hover:border-orange" />
</a>
