<script>
	import Hero from '$lib/blocks/Hero.svelte';
	import Overview from '$lib/blocks/Overview.svelte';
	import LinkButton from '$lib/pieces/LinkButton.svelte';
	import { Check, ChevronRight } from 'lucide-svelte';
	import Itinerary from '$lib/blocks/Itinerary.svelte';
	import Dropdown from '$lib/pieces/Dropdown.svelte';

	let { data } = $props();
	let activeTab = $state('Overview');

	const { general, description, details, itinerary } = data;
	const { cat1, cat2, cat3, cat4 } = data.pricing;

	const uspInPrice = [
		'25 years of experience',
		'Certified local guides',
		'Guaranteed departures',
		'Fully customizeable package'
	];

	const tabs = ['Overview', 'Itinerary', 'Included'];
</script>

<section class="relative h-[92vh]">
	<Hero data={general} height="h-[92vh]" />
</section>

<div class="relative flex flex-col-reverse md:flex-row">
	<div class="md:w-2/3">
		<div class="mb-4 hidden w-full flex-row gap-12 bg-dark70 pl-6 md:flex md:pl-16 lg:pl-32">
			{#each tabs as tab}
				<div class="flex w-[115px] items-center gap-1">
					<span class={activeTab === tab ? 'opacity-1' : 'opacity-0'}>
						<ChevronRight color="#EE7430" />
					</span>
					<button
						onclick={() => (activeTab = tab)}
						class="uppercase {activeTab === tab ? 'text-orange' : 'text-light'}">{tab}</button
					>
				</div>
			{/each}
		</div>
		{#if activeTab === 'Overview'}
			<Overview {details} {description} />
		{:else if activeTab === 'Itinerary'}
			<Itinerary {itinerary} />
		{/if}
	</div>
	<aside class="relative flex w-full justify-center bg-dark pb-4 md:w-1/3">
		<section
			class="z-20 mt-[-8rem] flex h-min w-[90%] flex-col items-center rounded-3xl bg-light10 pb-8 pt-12 text-light backdrop-blur md:mt-[-8rem] md:pt-16"
		>
			<div class="mb-8">
				<p class="text-5xl font-medium md:text-7xl">${cat1}</p>
			</div>

			<div class="flex w-full flex-col gap-4 bg-dark70 px-[16%] pb-6 pt-4">
				<p class=" text-center font-medium">Group discounts</p>
				<p class="flex text-nowrap leading-4">
					2 - 5 pax <span class="mx-2 w-full flex-grow border-b border-light80"></span>${cat2}
				</p>
				<p class="flex text-nowrap leading-4">
					6 - 10 pax <span class="mx-2 w-full flex-grow border-b border-light80"></span>${cat3}
				</p>
				<p class="flex text-nowrap leading-4">
					11 - 15 pax <span class="mx-2 w-full flex-grow border-b border-light80"></span>${cat4}
				</p>
			</div>

			<div class="mb-24 mt-8 flex flex-col gap-3">
				{#each uspInPrice as usp}
					<div class="flex gap-2">
						<Check color="#EE7430" />
						<p>{usp}</p>
					</div>
				{/each}
			</div>

			<LinkButton label="Contact us" link="/" />
		</section>
	</aside>
	<div class="fixed bottom-4 right-4 z-50 md:hidden">
		<Dropdown
			options={tabs}
			activeOption={activeTab}
			handleClick={(option) => (activeTab = option)}
		/>
	</div>
</div>
