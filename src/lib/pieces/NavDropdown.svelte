<script>
	const { options, handleClick, activeOption } = $props();
</script>

<nav class="fixed bottom-0 left-0 right-0 z-50 bg-blue70 backdrop-blur">
	<div class="no-scrollbar flex gap-4 overflow-x-auto">
		{#each options as option}
			<a
				href={`#${option.value}`}
				class="txt-normal hover:bg-blue60 flex-shrink-0 rounded-full px-4 py-4 text-light transition-colors {activeOption ===
				option.value
					? 'underline underline-offset-4'
					: ''}"
				onclick={() => handleClick(option.value)}
			>
				{option.label}
			</a>
		{/each}
	</div>
</nav>

<style>
	/* Hide scrollbar but keep functionality */
	.no-scrollbar {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
	.no-scrollbar::-webkit-scrollbar {
		display: none; /* Chrome, Safari and Opera */
	}
</style>
