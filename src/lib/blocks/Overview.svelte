<script>
	import {
		Footprints,
		Calendar,
		SunSnow,
		Mountain,
		Route,
		ChevronsRight,
		ChartNoAxesColumnIncreasing
	} from 'lucide-svelte';
	import { PortableText } from '@eirikk/portabletext-2-svelte-5';

	const { details, description } = $props();
	const { distance, difficulty, duration, altitude, trekDays, season } = details;
</script>

<article class="x-margin y-margin flex w-full flex-col gap-12 rounded-3xl bg-light md:gap-16">
	<section
		class="bg-dark10 flex flex-col gap-3 rounded-lg py-4 pl-4 md:flex-row md:justify-around md:pl-0"
	>
		<div class="flex items-center gap-2 md:flex-col md:justify-center md:gap-0">
			<Calendar />
			<p class="font-medium md:mt-2">Duration</p>
			<p>{duration} days</p>
		</div>
		<div class="flex items-center gap-2 md:flex-col md:justify-center md:gap-0">
			<Footprints />
			<p class="font-medium md:mt-2">Days on trek</p>
			<p>{trekDays} days</p>
		</div>
		<div class="flex items-center gap-2 md:flex-col md:justify-center md:gap-0">
			<Route />
			<p class="font-medium md:mt-2">Distance</p>
			<p>{distance.km} km</p>
		</div>
		<div class="flex items-center gap-2 md:flex-col md:justify-center md:gap-0">
			<Mountain />
			<p class="font-medium md:mt-2">Max altitude</p>
			<p>{altitude.meters} m</p>
		</div>
	</section>

	<section>
		<h2>{description.title}</h2>
		<button class="mb-8 mt-4 flex h-12 items-center gap-2 rounded-full border border-dark70 px-4">
			<ChartNoAxesColumnIncreasing />
			<span class="min-w-24 text-start">{difficulty}</span>
			<ChevronsRight color="#EE7430" />
		</button>
		<PortableText value={description.text} />
	</section>

	<div class="flex">
		<SunSnow />
		<div>
			<p>Best season:</p>
			<p>{season}</p>
		</div>
	</div>
</article>
