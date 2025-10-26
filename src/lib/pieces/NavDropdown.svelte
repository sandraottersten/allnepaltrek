<script>
	import { ChevronRight } from '@lucide/svelte';

	const { activeOption, options, handleClick } = $props();
	let openList = $state(false);
</script>

<div
	class="flex flex-col-reverse rounded-full bg-blue70 p-2 pl-3 backdrop-blur {openList
		? 'rounded-[1.8rem]'
		: 'rounded-full'}"
>
	<div class="flex">
		<select class="hidden w-12">
			{#each options as option}
				<option value={option} class="w-12">
					{option}
				</option>
			{/each}
		</select>

		<button
			class="bg-transparent txt-normal flex h-10 items-center justify-between rounded px-2 uppercase text-light"
			onclick={() => (openList = !openList)}
		>
			{activeOption}
			<ChevronRight color="#FFFFFF" />
		</button>
	</div>

	{#if openList}
		<div>
			{#each options as option}
				{#if option !== activeOption}
					<button
						key={option}
						class="txt-normal flex h-10 w-full items-center justify-between whitespace-nowrap px-3 uppercase text-light"
						onclick={() => {
							handleClick(option);
							openList = false;
						}}
					>
						{option}
					</button>
				{/if}
			{/each}
		</div>
	{/if}
</div>
