<script>
	import Hero from '$lib/blocks/Hero.svelte';
	import Overview from '$lib/blocks/Overview.svelte';
	import LinkButton from '$lib/pieces/LinkButton.svelte';
	import Divider from '$lib/pieces/Divider.svelte';
	import { Check, ChevronRight } from 'lucide-svelte';
	import Itinerary from '$lib/blocks/Itinerary.svelte';
	import NavDropdown from '$lib/pieces/NavDropdown.svelte';
	import Peaks from '$lib/svg/Peaks.svelte';

	let { data } = $props();
	let activeContent = $state('Overview');

	const { general, description, details, itinerary, gallery } = data;
	const { cat1, cat2, cat3, cat4 } = data.pricing;

	const uspInPrice = ['25 years of experience', 'Certified local guides', 'Guaranteed departures'];

	const content = ['Overview', 'Itinerary', 'Included'];
</script>

<section class="relative h-[92vh]">
	<Hero data={general} height="h-[calc(100vh+2rem)]" />

	<div
		class="absolute bottom-[5rem] right-0 flex h-[6rem] items-end justify-center pb-8 sm:bottom-[13.5rem] sm:h-[calc(100vh-17.5rem)] sm:w-[24rem]"
	>
		<div class="size-[80px] sm:size-[120px] md:size-[270px]">
			<Peaks />
		</div>
	</div>
</section>

<div
	class="relative z-20 mt-20 flex rounded-t-[40px] bg-light text-dark md:flex-row md:px-16 md:py-20 lg:px-40 lg:py-24"
>
	<aside
		class="sticky top-12 hidden h-fit w-full flex-col gap-12 md:flex md:w-[30%] md:pr-12 lg:pr-24"
	>
		<section class="flex flex-col">
			{#each content as con}
				<div class="flex items-center gap-1 border-t border-dark30 py-3">
					<span class={activeContent === con ? 'opacity-1' : 'opacity-0'}>
						<ChevronRight color="#EE7430" />
					</span>
					<button
						onclick={() => (activeContent = con)}
						class="font-medium uppercase {activeContent === con ? 'text-orange' : 'text-dark'}"
						>{con}</button
					>
				</div>
			{/each}
		</section>

		<section class="flex h-min flex-col items-center gap-8">
			<p class="text-5xl font-medium md:text-5xl">${cat1}</p>

			<div class="flex w-full flex-col gap-4">
				<p class=" text-center font-medium">Group discounts</p>
				<p class="flex text-nowrap border-b border-dark30 pb-2 leading-4">
					2 - 5 pax <span class="mx-2 w-full flex-grow border-b border-light80"></span>${cat2}
				</p>
				<p class="flex text-nowrap border-b border-dark30 pb-2 leading-4">
					6 - 10 pax <span class="mx-2 w-full flex-grow border-b border-light80"></span>${cat3}
				</p>
				<p class="flex text-nowrap border-b border-dark30 pb-2 leading-4">
					11 - 15 pax <span class="mx-2 w-full flex-grow border-b border-light80"></span>${cat4}
				</p>
			</div>

			<div class="flex flex-col gap-3">
				{#each uspInPrice as usp}
					<div class="flex gap-2">
						<Check color="#EE7430" />
						<p>{usp}</p>
					</div>
				{/each}
			</div>
			<Divider />
			<LinkButton label="Contact us" link="/" />
		</section>
	</aside>

	<div class="md:w-[70%] md:border-l md:border-dark30 md:pl-10 lg:pl-24">
		{#if activeContent === 'Overview'}
			<Overview {details} {description} {gallery} />
		{:else if activeContent === 'Itinerary'}
			<Itinerary {itinerary} />
		{/if}
	</div>
	<div class="fixed bottom-4 right-4 z-50 md:hidden">
		<NavDropdown
			options={content}
			activeOption={activeContent}
			handleClick={(option) => (activeContent = option)}
		/>
	</div>
</div>
