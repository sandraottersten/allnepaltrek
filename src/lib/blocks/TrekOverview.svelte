<script>
	import {
		Footprints,
		Calendar,
		PlusCircle,
		Mountain,
		Route,
		ChartNoAxesColumnIncreasing,
		Info
	} from 'lucide-svelte';
	import Divider from '$lib/pieces/Divider.svelte';
	import { PortableText } from '@eirikk/portabletext-2-svelte-5';
	import { urlFor } from '../../sanity/index';

	const { details, description } = $props();
	const { distance, difficulty, duration, altitude, trekDays } = details;
	let expandedHighlight = $state(-1);
	let highlightImage = $state(description.highlights?.[0]?.image);
</script>

<section
	id="overview"
	class="scroll-block b-margin flex w-full flex-col gap-12 rounded-3xl bg-light px-4 md:gap-16 md:px-0"
>
	<div>
		<h2 class="w-5/6">{description.title}</h2>
		<div class="my-12">
			<div class="my-4 flex items-center justify-between">
				<span class="flex items-center gap-4">
					<ChartNoAxesColumnIncreasing />
					<p class="text-start font-medium capitalize">{difficulty}</p>
					<Info color="#EE7430" size="18" />
				</span>
			</div>
			<Divider />
			<section class="grid grid-cols-2 gap-3 rounded-lg py-4 md:grid-cols-4">
				<div class="flex items-center gap-4">
					<Calendar />
					<span>
						<p class="font-medium">Duration</p>
						<p>{duration} days</p>
					</span>
				</div>
				<div class="flex items-center gap-4">
					<Footprints />
					<span>
						<p class="font-medium">Days on trek</p>
						<p>{trekDays} days</p>
					</span>
				</div>
				<div class="flex items-center gap-4">
					<Route />
					<span>
						<p class="font-medium">Distance</p>
						<p>{distance?.km}</p>
					</span>
				</div>
				<div class="flex items-center gap-4">
					<Mountain />
					<span>
						<p class="font-medium">Max altitude</p>
						<p>{altitude?.meters}</p>
					</span>
				</div>
			</section>
		</div>

		<div class="my-12">
			<section class="my-8 flex gap-12">
				{#if highlightImage}
					<div class="relative hidden h-[300px] w-full flex-1 md:flex">
						<div class="absolute left-0 top-0 z-10 size-full rounded-3xl bg-dark10"></div>
						<img
							src={urlFor(highlightImage).width(800).height(1000).url()}
							alt={highlightImage.attribution}
							class="size-full rounded-3xl object-cover"
						/>
					</div>
				{/if}
				<div class="flex-[2_2_0%]">
					{#each description.highlights as cat, i}
						<div
							class="flex gap-5 overflow-hidden border-dark30 p-5 transition-[height] duration-700
              {i !== 0 ? 'border-t' : ''}
              {expandedHighlight === i ? 'h-[200px]' : 'h-[72px]'}"
						>
							<button
								class="tranform h-min duration-150 {expandedHighlight === i
									? 'rotate-45'
									: 'rotate-0'}"
								onclick={() => {
									expandedHighlight === i ? (expandedHighlight = -1) : (expandedHighlight = i);
									expandedHighlight === i && (highlightImage = cat.image);
								}}
							>
								<PlusCircle size={32} color="#EE7430" strokeWidth={1} />
							</button>
							<div class="flex flex-col gap-5">
								<p class="h4">{cat.title}</p>
								<p>{cat.description}</p>
							</div>
						</div>
					{/each}
				</div>
			</section>
		</div>
		<!-- <div class="my-12">
			<h3>{`Highlights of ${description.trekName}`}</h3>
			<div class="mt-4 grid grid-cols-4 gap-3">
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
		</div> -->

		<div class="portable">
			<PortableText value={description.text} />
		</div>
	</div>
</section>
