<script>
	import { Check, X } from '@lucide/svelte';

	const { packageContent } = $props();
</script>

<section id="included" class="scroll-block y-margin flex w-full flex-col px-4 md:px-0">
	<h3>Cost includes</h3>
	<ul class="mb-12 mt-8 flex flex-col gap-3">
		{#each packageContent?.included as item, i}
			<li class="flex gap-3">
				<span class="mt-0.5 min-w-[20px]"><Check size="20" color="#4C855F" /></span>
				<p>{item}</p>
			</li>
		{/each}
	</ul>

	<h3>Cost excludes</h3>
	<ul class="mt-8 flex flex-col gap-3">
		{#each packageContent?.excluded as item, i}
			<li class="flex gap-3">
				<span class="mt-0.5 min-w-[20px]"><X size="20" color="#EE7430" /></span>
				<p>{item}</p>
			</li>
		{/each}
	</ul>
</section>
