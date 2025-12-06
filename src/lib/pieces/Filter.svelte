<script>
	import { ChevronUp, Sparkle, X } from '@lucide/svelte';

	let props = $props();
	let open = $state(false);

	$effect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<div class="fixed bottom-0 z-50 flex w-full flex-col bg-blue70 p-2 pl-3 backdrop-blur md:hidden">
	<button
		class="bg-blue80 txt-normal flex h-10 items-center justify-between gap-2 px-3 text-light"
		onclick={() => (open = !open)}
	>
		<span class="flex items-center gap-2">
			<Sparkle />
			Filter
			{#if props.selectedFilter}
				: {props.selectedFilter}
			{/if}
		</span>
		{#if open}
			<X />
		{:else}
			<ChevronUp />
		{/if}
	</button>
</div>

{#if open}
	<!-- Overlay -->
	<div
		class="fixed inset-0 z-40 bg-dark30 md:hidden"
		role="button"
		tabindex="0"
		aria-label="Close filter"
		onclick={() => (open = false)}
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				open = false;
			}
		}}
	></div>

	<!-- Filter Content -->
	<div
		class="fixed bottom-14 z-50 flex w-full flex-col gap-4 border-t border-dark30 bg-light p-3 md:hidden"
	>
		{#if props.slot2}
			{@render props.slot2()}
		{/if}
		{#if props.slot1}
			{@render props.slot1()}
		{/if}
	</div>
{/if}
