<script>
	import { urlFor } from '../../sanity/index';
	import Level from '../svg/Level.svelte';
	import Calendar from '../svg/Calendar.svelte';
	import PeaksSmall from '../svg/PeaksSmall.svelte';

	const { trek } = $props();
	const { cardImage, title, subtitle, description } = trek.general;
	const { duration, difficulty } = trek.details;
	const { slug } = trek.seo;
</script>

<a
	href={`/treks/${slug.current}`}
	class="aspect-h-4 aspect-w-3 relative w-full cursor-pointer overflow-hidden rounded-lg"
>
	<div class="aspect-none absolute bottom-6 left-6 right-auto top-auto z-20 h-min w-fit">
		<h3 class="text-light">{title}</h3>
		<p class="sub-small">{subtitle}</p>
		<p class="mt-3 w-3/4 text-light">{description}</p>
	</div>

	<PeaksSmall
		size="size-[32px] min-w-[32px] md:size-[42px] md:min-w-[42px] aspect-none absolute bottom-[1.3rem] left-auto right-4 top-auto z-20"
	/>

	<div
		class="aspect-none absolute bottom-auto left-auto right-4 top-0 z-20 flex h-min w-fit flex-col gap-0.5 rounded-b-md bg-dark70 px-4 pb-3 pt-6 text-sm uppercase text-light"
	>
		<div class="flex gap-2">
			<Level color="#FFFFFF" size="size-[16px]" />
			<p class="font-medium">{difficulty}</p>
		</div>
		<div class="flex gap-2">
			<Calendar color="#FFFFFF" size="size-[16px]" />
			<p class="font-medium">{duration} DAYS</p>
		</div>
	</div>

	<div class="bg-cardGradient absolute left-0 top-0 z-10 size-full"></div>
	<img
		src={urlFor(cardImage).width(800).url()}
		alt={cardImage.attribution}
		class="size-full object-cover"
	/>
</a>
