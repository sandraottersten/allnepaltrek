<script>
	import { ChevronDown } from 'lucide-svelte';

	const { activeOption, options, handleClick } = $props();
	let openList = $state(false);
</script>

<div class="relative flex w-full flex-col border-b border-dark30 p-1 pl-3 md:w-[214px]">
	<div class="flex">
		<select class="hidden w-12">
			{#each options as option}
				<option value={option.value} class="w-12">
					{option.value}
				</option>
			{/each}
		</select>

		<button
			class="bg-transparent txt-normal flex h-10 w-full items-center justify-between rounded text-dark"
			onclick={() => (openList = !openList)}
		>
			{activeOption.label}
			<ChevronDown color="#EE7430" />
		</button>
	</div>

	{#if openList}
		<div class="absolute left-0 top-14 z-20 w-full rounded bg-light p-2">
			{#each options as option}
				{#if option.value !== activeOption.value}
					<button
						key={option.value}
						class="txt-normal flex h-10 w-full items-center justify-between whitespace-nowrap px-3 text-dark hover:bg-orange70"
						onclick={() => {
							handleClick(option);
							openList = false;
						}}
					>
						{option.label}
					</button>
				{/if}
			{/each}
		</div>
	{/if}
</div>
