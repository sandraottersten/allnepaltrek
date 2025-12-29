<script>
	import { urlFor } from '../../sanity/index';
	import { Calendar } from '@lucide/svelte';
	let { tours } = $props();
</script>

<div id="tours" class="scroll-block y-margin px-4 md:px-0">
	<h2>Combine with</h2>
	<p class="my-4">
		Want to combine your trekking with a tour? Immerse in culture on city tours or get an adrenaline rush on an adventure activity.
	</p>
	<div class="my-16 flex flex-col gap-5">
		{#each tours as tour}
			<a
				href={`/tours/${tour.seo.slug.current}`}
				class="flex flex-col-reverse gap-5 border-b border-dark30 pb-4 md:flex-row"
			>
				<div class="flex flex-col justify-end flex-1">
					<h3 class="text-blue group-hover:text-blue">{tour.general.title}</h3>
					<p class="mt-3">{tour.general.description}</p>
					<div class="mt-5 flex gap-8 px-1">
						<div class="flex h-min w-fit items-center gap-2 text-sm uppercase">
							<Calendar size={18} strokeWidth={2} class="text-blue" />
							<p class="font-medium">{tour.details.duration}</p>
						</div>
					</div>
				</div>

				<div class="relative h-full overflow-hidden rounded-lg flex-1">
					<div class="absolute left-0 top-0 z-10 size-full bg-dark10"></div>
					<img
						src={urlFor(tour.general.cardImage).width(800).height(500).url()}
						alt={tour.general.cardImage.attribution}
						class="size-full object-cover"
					/>
				</div>
			</a>
		{/each}
	</div>
</div>
