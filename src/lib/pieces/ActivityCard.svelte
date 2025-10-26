<script>
	import { urlFor } from '../../sanity/index';
	import { Calendar, ChartNoAxesColumnIncreasing, ChevronsRight } from '@lucide/svelte';
	let { data, link } = $props();
</script>

<a href={link} class="group flex flex-col">
	<div class="overflow-hidden rounded-lg">
		<img
			src={urlFor(data.general.cardImage).width(800).height(500).url()}
			alt={data.general.cardImage.attribution}
			class="size-full object-cover transition-all duration-300 group-hover:scale-105"
		/>
	</div>
	<h3 class="mt-3 text-xl text-blue group-hover:text-blue">{data.general.title}</h3>
	<p class="font-medium text-dark70">{data.general.subtitle}</p>
	<p class="my-2">{data.general.description}</p>
	<div class="flex w-full items-center justify-between border-t border-dark30 pt-2">
		<div class="flex">
			{#if data.details.difficulty}
				<div class="flex h-min w-fit items-center gap-2 text-sm uppercase">
					<ChartNoAxesColumnIncreasing size={18} strokeWidth={2} class="text-blue" />
					<p class="mr-8 font-medium">{data.details.difficulty}</p>
				</div>
			{/if}
			{#if data.details.duration}
				<div class="flex h-min w-fit items-center gap-2 text-sm uppercase">
					<Calendar size={18} strokeWidth={2} class="text-blue" />
					<p class="font-medium">{data.details.duration}</p>
				</div>
			{/if}
		</div>
		<ChevronsRight size={24} class="transform text-blue duration-200 group-hover:translate-x-1" />
	</div>
</a>
