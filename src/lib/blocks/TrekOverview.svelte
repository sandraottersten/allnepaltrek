<script>
	import {
		Footprints,
		Calendar,
		CirclePlus,
		Mountain,
		Route,
		ChartNoAxesColumnIncreasing,
		Info,
		CircleMinus
	} from '@lucide/svelte';
	import Divider from '$lib/pieces/Divider.svelte';
	import { PortableText } from '@eirikk/portabletext-2-svelte-5';
	import { urlFor } from '../../sanity/index';
	import { slide } from 'svelte/transition';
	import Pricing from '$lib/pieces/Pricing.svelte';

	const { details, description, pricing } = $props();
	const { distance, difficulty, duration, altitude, trekDays } = details;
	let expandedHighlight = $state(-1);
	let highlightImage = $state(description.highlights?.[0]?.image);
</script>

<section
	id="overview"
	class="scroll-block b-margin flex w-full flex-col gap-12 rounded-3xl bg-light px-4 md:gap-16 md:px-0"
>
	<div>
		<h2 class="text-center md:w-5/6 md:text-left">{description.title}</h2>
		<div class="my-12">
			<div class="my-4 flex items-center justify-between">
				<span class="flex items-center gap-4">
					<ChartNoAxesColumnIncreasing />
					<p class="text-start font-medium capitalize">{difficulty}</p>
					<!-- <Info color="#027B83" size="24" /> -->
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

		<div class="md:hidden">
			<Pricing {pricing} {duration} />
		</div>

		<div class="my-12">
			<section class="my-8 flex flex-col gap-2 md:flex-row md:gap-12">
				{#if highlightImage}
					<div class="relative h-[300px] w-full flex-1 md:flex">
						<div class="absolute left-0 top-0 z-10 size-full bg-dark10"></div>
						<img
							src={urlFor(highlightImage).width(800).height(1000).url()}
							alt={highlightImage.attribution}
							class="size-full rounded-lg object-cover saturate-[.80] filter"
						/>
					</div>
				{/if}
				<div class="flex-[2_2_0%]">
					{#each description.highlights as cat, i}
						<div
							key={cat.title}
							class="flex flex-col overflow-hidden pt-5
              {i !== 0 ? 'border-t border-dark30' : ''}"
						>
							<button
								class="flex items-center gap-5 pb-5"
								onclick={() => {
									expandedHighlight === i ? (expandedHighlight = -1) : (expandedHighlight = i);
									expandedHighlight === i && (highlightImage = cat.image);
								}}
							>
								{#if expandedHighlight === i}
									<CircleMinus size={32} color="#027B83" strokeWidth={1} />
								{:else}
									<CirclePlus size={32} color="#027B83" strokeWidth={1} />
								{/if}
								<p class="h4">{cat.title}</p>
							</button>
							{#if expandedHighlight === i}
								<div class="flex flex-col gap-5 pb-5 pl-[3.2rem]" transition:slide>
									<p>{cat.description}</p>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</section>
		</div>

		<div class="portable">
			<PortableText value={description.text} />
		</div>
	</div>
</section>
