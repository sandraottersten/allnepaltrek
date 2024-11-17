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
	} from 'lucide-svelte';

	const { itinerary } = $props();
	let expanded = $state([]);

	const expandDay = (index) => {
		const indexString = index.toString();
		if (expanded.includes(indexString)) expanded = expanded.filter((ex) => ex !== indexString);
		else expanded.push(indexString);
	};

	console.log('ITINARARY', itinerary);
</script>

<article class="x-margin y-margin flex w-full flex-col md:w-2/3">
	<h2>The trek day by day</h2>
	<p class="mt-4">
		We have a prelimanary plan but it can always change due to weather, availability and your
		preferences.
	</p>
	<section class="mt-12 flex flex-col gap-6">
		{#each itinerary.days as day, i}
			<div>
				<div class="mb-2 flex w-full flex-col gap-1 md:mb-4 md:flex-row md:gap-8">
					<div class="flex w-10 min-w-10 items-center gap-1 md:flex-col md:gap-0">
						<p class="text-base font-medium text-orange md:text-xl">Day</p>
						<p class="text-base font-medium text-orange md:text-3xl">{i + 1}</p>
					</div>
					<div class="w-full">
						<div class="flex items-center md:text-nowrap">
							<h3 class="h4 flex-grow">{day.title}</h3>
							<div class="bg-dark30 mx-2 hidden h-[1px] w-full md:block"></div>
							<button class="min-w-6" onclick={() => expandDay(i)}>
								<ChevronRight color="rgba(0, 23, 28, 0.3)" />
							</button>
						</div>
						<div class="my-2 flex flex-wrap gap-x-8 gap-y-2 md:gap-12">
							{#if day.details.arrival}
								<div class="flex gap-2">
									<PlaneLanding size={20} />
									<p class="font-medium">Namaste</p>
								</div>
							{:else if day.details.departure}
								<PlaneTakeoff size={20} />
							{/if}
							{#if day.details.flight}
								<div class="flex gap-2">
									<Plane size={20} />
									<p class="font-medium">{day.details.transportTime}</p>
								</div>
							{:else if day.details.bus}
								<div class="flex gap-2">
									<Bus size={20} />
									<p class="font-medium">{day.details.transportTime}</p>
								</div>
							{:else if day.details.car}
								<div class="flex gap-2">
									<Car size={20} />
									<p class="font-medium">{day.details.transportTime}</p>
								</div>
							{/if}
							{#if day.details.distance}
								<div class="flex gap-2">
									<Footprints size={20} />
									<p class="font-medium">{day.details.distance.km}</p>
								</div>
							{/if}
							{#if day.details.trekTime}
								<div class="flex gap-2">
									<Timer size={20} />
									<p class="font-medium">{day.details.trekTime}</p>
								</div>
							{/if}
							{#if day.details.altitude}
								<div class="flex gap-2">
									<Mountain size={20} />
									<p class="font-medium">{day.details.altitude.meters}</p>
								</div>
							{/if}
						</div>
					</div>
				</div>
				{#if expanded.includes(i.toString())}
					<div class="md:ml-[4.5rem]">
						<PortableText value={day.text} />
					</div>
				{/if}
			</div>
		{/each}
	</section>
</article>
