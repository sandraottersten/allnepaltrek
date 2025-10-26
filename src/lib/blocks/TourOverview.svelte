<script>
	import { Calendar, MapPin } from '@lucide/svelte';
	import { PortableText } from '@eirikk/portabletext-2-svelte-5';

	const { details, description } = $props();
	const { region, duration, season } = details;
</script>

<section
	id="overview"
	class="scroll-block flex w-full flex-col gap-12 rounded-3xl bg-light px-4 md:gap-16 md:px-0"
>
	<div>
		<h2 class="w-5/6">{description.title}</h2>
		<div class="my-12">
			<section class="grid grid-cols-2 gap-3 rounded-lg py-4 md:grid-cols-4">
				<div class="flex items-center gap-2">
					<Calendar />
					<span class="border-l border-dark30 pl-2">
						<p class="font-medium">Duration</p>
						<p>{duration} days</p>
					</span>
				</div>
				<div class="flex items-center gap-2">
					<MapPin />
					<span class="border-l border-dark30 pl-2">
						<p class="font-medium">Region</p>
						<p>{region}</p>
					</span>
				</div>
			</section>
		</div>

		<div class="portable">
			<PortableText value={description.text} />
		</div>
	</div>
</section>
