<script>
	import { Calendar, MapPin } from '@lucide/svelte';
	import { PortableText } from '@eirikk/portabletext-2-svelte-5';
	import Pricing from '$lib/pieces/Pricing.svelte';
	const { details, description, pricing } = $props();
	const { region, duration } = $derived(details);
</script>

<section
	id="overview"
	class="scroll-block flex w-full flex-col gap-12 rounded-3xl bg-light px-4 md:gap-16 md:px-0"
>
	<div>
		<h2 class="text-center md:w-5/6 md:text-left">{description.title}</h2>
		<div class="mt-12">
			<section class="flex gap-12 py-4 md:gap-24">
				<div class="flex items-center gap-2">
					<Calendar />
					<span class="border-l border-dark30 pl-2">
						<p class="font-medium">Duration</p>
						<p>{duration}</p>
					</span>
				</div>
				<div class="flex items-center gap-2">
					<MapPin />
					<span class="border-l border-dark30 pl-2">
						<p class="font-medium">Region</p>
						<p>{region.title}</p>
					</span>
				</div>
			</section>
		</div>

		<div class="y-margin md:hidden">
			<Pricing {pricing} {duration} />
		</div>

		<div class="portable">
			<PortableText value={description.text} />
		</div>
	</div>
</section>
