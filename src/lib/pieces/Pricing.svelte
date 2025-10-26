<script>
	import { ChevronRight } from '@lucide/svelte';
	import Divider from '$lib/pieces/Divider.svelte';
	import TextLink from '$lib/pieces/TextLink.svelte';
	import LinkButton from '$lib/pieces/LinkButton.svelte';

	let { pricing = $bindable() } = $props();
	let expandedGroupDiscount = $state(false);
	const { cat1, cat2, cat3, cat4 } = pricing;
</script>

<div class="flex h-min flex-col items-center overflow-hidden rounded-lg border border-dark30">
	<div class="flex w-full items-end justify-between bg-dark80 p-4">
		<p class="font-medium text-light">14 days</p>
		<p class="text-5xl font-medium text-light md:text-3xl">US$ {pricing.cat1}</p>
	</div>
	<button
		class="flex w-full items-center justify-between px-5 py-4"
		onclick={() => (expandedGroupDiscount = !expandedGroupDiscount)}
	>
		{'Group discounts'}
		<ChevronRight color="#027B83" />
	</button>

	<div
		class="flex w-full flex-col gap-4 px-5 pb-4 pt-2 {expandedGroupDiscount ? 'block' : 'hidden'}"
	>
		<p class="flex text-nowrap border-b border-dark30 pb-2 leading-4">
			2 - 5 ppl <span class="mx-2 w-full flex-grow border-b border-light80"></span>${pricing.cat2}
		</p>
		<p class="flex text-nowrap border-b border-dark30 pb-2 leading-4">
			6 - 10 ppl <span class="mx-2 w-full flex-grow border-b border-light80"></span>${pricing.cat3}
		</p>
		<p class="flex text-nowrap border-b border-dark30 pb-2 leading-4">
			11 - 15 ppl <span class="mx-2 w-full flex-grow border-b border-light80"></span>${pricing.cat4}
		</p>
	</div>
	<Divider />
	<div class="flex flex-col gap-2 px-5 py-4">
		<p>If you have any questions, we are here to help.</p>
		<TextLink text="Contact us" link="/" />
	</div>
	<Divider />
	<LinkButton label="Book now" link="/" style="my-6" />
</div>
