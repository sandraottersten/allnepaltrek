<script>
	import {
		Footprints,
		Calendar,
		SunSnow,
		Mountain,
		Route,
		ChartNoAxesColumnIncreasing
	} from 'lucide-svelte';
	import Divider from '$lib/pieces/Divider.svelte';
	import { PortableText } from '@eirikk/portabletext-2-svelte-5';
	import PeaksSmall from '$lib/svg/PeaksSmall.svelte';
	import { urlFor } from '../../sanity/index';

	const { details, description } = $props();
	const { distance, difficulty, duration, altitude, trekDays, season } = details;
</script>

<section
	id="overview"
	class="scroll-block flex w-full flex-col gap-12 rounded-3xl bg-light px-4 md:gap-16 md:px-0"
>
	<div>
		<h2 class="w-5/6">{description.title}</h2>
		<div class="my-12">
			<div class="my-4 flex items-center justify-between">
				<span class="flex gap-2">
					<ChartNoAxesColumnIncreasing />
					<p class="font-regular min-w-24 text-start capitalize">{difficulty}</p>
				</span>
				<button class="flex items-center gap-3 hover:text-orange">
					{'Read more'}
					<PeaksSmall size="size-[32px] min-w-[32px] md:size-[24px] md:min-w-[24px]" />
				</button>
			</div>
			<Divider />
			<section class="grid grid-cols-2 gap-3 rounded-lg py-4 md:grid-cols-4">
				<div class="flex items-center gap-2">
					<Calendar />
					<span class="border-l border-dark30 pl-2">
						<p class="font-medium">Duration</p>
						<p>{duration} days</p>
					</span>
				</div>
				<div class="flex items-center gap-2">
					<Footprints />
					<span class="border-l border-dark30 pl-2">
						<p class="font-medium">Days on trek</p>
						<p>{trekDays} days</p>
					</span>
				</div>
				<div class="flex items-center gap-2">
					<Route />
					<span class="border-l border-dark30 pl-2">
						<p class="font-medium">Distance</p>
						<p>{distance?.km}</p>
					</span>
				</div>
				<div class="flex items-center gap-2">
					<Mountain />
					<span class="border-l border-dark30 pl-2">
						<p class="font-medium">Max altitude</p>
						<p>{altitude?.meters}</p>
					</span>
				</div>
			</section>
		</div>

		<div class="my-12">
			<h3>Highlights of Ganja La pass trek</h3>
			<div class="mt-2 grid grid-cols-4 gap-3">
				{#each description.highlights as highlight}
					<div>
						<div class="group relative mb-3 aspect-[1/1]">
							<div
								class="absolute left-0 top-0 hidden size-full rounded-xl bg-dark70 p-3 backdrop-blur group-hover:flex"
							>
								<p class="text-sm font-light text-light">{highlight.description}</p>
							</div>
							<img
								src={urlFor(highlight.image).width(800).height(800).url()}
								alt={highlight.image.attribution}
								class="size-full rounded-xl object-cover"
							/>
						</div>
						<span class="text-md flex w-[65%] font-medium leading-tight">{highlight.title}</span>
					</div>
				{/each}
			</div>
		</div>

		<PortableText value={description.text} />
	</div>

	<div class="flex">
		<SunSnow />
		<div>
			<p>Best season:</p>
			<p>{season}</p>
		</div>
	</div>
</section>
