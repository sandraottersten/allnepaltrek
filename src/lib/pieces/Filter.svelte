<script>
	import { Filter, X } from '@lucide/svelte';

	const { slot1, slot2 } = $props();
	let open = $state(false);
</script>

<div
	class="fixed bottom-4 right-3 z-50 flex flex-col rounded-full bg-light80 p-2 pl-3 backdrop-blur md:hidden"
>
	<button
		class="bg-transparent txt-normal flex h-10 items-center justify-between gap-1 rounded px-3 uppercase text-dark"
		onclick={() => (open = !open)}
	>
		{#if open}
			<X />
		{:else}
			<Filter />
		{/if}
		{'Filter'}
	</button>
</div>

{#if open}
	<div
		class="fixed bottom-20 right-3 z-50 flex w-[calc(100vw-1.5rem)] flex-col gap-4 rounded-3xl bg-light80 p-3 backdrop-blur md:hidden"
	>
		{@render slot2()}
		{@render slot1()}
	</div>
{/if}
