<script>
	import { PortableText } from '@eirikk/portabletext-2-svelte-5';
	import {
		ChevronRight,
		PlaneLanding,
		PlaneTakeoff,
		Plane,
		Bus,
		Car,
		Footprints,
		Mountain,
		Timer
	} from '@lucide/svelte';

	const { itinerary } = $props();
	let expanded = $state([]);

	const expandDay = (index) => {
		const indexString = index.toString();
		if (expanded.includes(indexString)) expanded = expanded.filter((ex) => ex !== indexString);
		else expanded.push(indexString);
	};

	const expandAllDays = () => {
		const numberArray = Array.from({ length: itinerary.days.length }, (_, index) =>
			index.toString()
		);
		expanded = numberArray;
	};
</script>

<div
	id="itinerary"
	class="scroll-block y-margin flex w-full flex-col rounded-3xl bg-light px-4 md:px-0"
>
	<h2>Day to day itinerary</h2>
	<p class="my-4 md:w-2/3">
		The itinerary is a preliminary plan and it can always change due to weather conditions,
		availability and your preferences.
	</p>
	<div class="mt-4 flex items-center gap-2 md:justify-end">
		<button class="text-sm text-blue hover:text-dark30" onclick={expandAllDays}>
			Expand all
		</button>
		<span class="text-dark30">|</span>
		<button class="text-sm text-blue hover:text-dark30" onclick={() => (expanded = [])}>
			Collapse all
		</button>
	</div>
	<section class="mt-8 flex flex-col gap-4">
		{#each itinerary.days as day, i}
			<div>
				<div class="mb-2 flex w-full flex-col gap-1 md:mb-2 md:flex-row md:gap-8">
					<div class="mt-0.5 flex gap-1">
						<p class="h4 whitespace-nowrap text-blue">
							Day {i + 1}
						</p>
					</div>
					<div class="w-full">
						<div class="flex items-center md:text-nowrap">
							<p class="h4 flex-grow">{day.title}</p>
							<div class="mx-2 hidden h-[1px] w-full bg-dark30 md:block"></div>
							<button
								class="group flex size-8 min-w-8 items-center justify-center"
								onclick={() => expandDay(i)}
							>
								<ChevronRight
									size={28}
									class="stroke-dark30 group-hover:stroke-blue {expanded.includes(i.toString())
										? 'rotate-90'
										: ''}"
								/>
							</button>
						</div>
						<div class="my-1 flex flex-wrap gap-x-8 gap-y-2 md:gap-12">
							{#if day.details?.arrival}
								<div class="flex gap-2">
									<PlaneLanding size={20} />
									<p>Namaste</p>
								</div>
							{:else if day.details?.departure}
								<PlaneTakeoff size={20} />
							{/if}
							{#if day.details?.flight}
								<div class="flex gap-2">
									<Plane size={20} />
									<p>{day.details.transportTime}</p>
								</div>
							{:else if day.details?.bus}
								<div class="flex gap-2">
									<Bus size={20} />
									<p>{day.details?.transportTime}</p>
								</div>
							{:else if day.details?.car}
								<div class="flex gap-2">
									<Car size={20} />
									<p>{day.details.transportTime}</p>
								</div>
							{/if}
							{#if day.details?.distance}
								<div class="flex gap-2">
									<Footprints size={20} />
									<p>{day.details.distance.km}</p>
								</div>
							{/if}
							{#if day.details?.trekTime}
								<div class="flex gap-2">
									<Timer size={20} />
									<p>{day.details.trekTime}</p>
								</div>
							{/if}
							{#if day.details?.altitude}
								<div class="flex gap-2">
									<Mountain size={20} />
									<p>{day.details.altitude.meters}</p>
								</div>
							{/if}
						</div>
					</div>
				</div>
				{#if expanded.includes(i.toString())}
					<div class="pb-2 md:ml-[5.5rem]">
						<PortableText value={day.text} />
					</div>
				{/if}
			</div>
		{/each}
	</section>
</div>
