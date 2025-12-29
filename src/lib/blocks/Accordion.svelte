<script>
	import TextLink from '$lib/pieces/TextLink.svelte';
	import { slide, fade } from 'svelte/transition';
	import { urlFor } from '../sanity/index';
	import { CirclePlus, CircleMinus } from '@lucide/svelte';

	let { categories, selectedCategory } = $props();
</script>

<section class="x-margin b-margin flex gap-12">
	<div class="relative hidden h-[600px] w-full flex-1 md:flex">
		{#key selectedCategory.image}
			<img
				src={urlFor(selectedCategory.image).width(800).height(1000).url()}
				alt={selectedCategory.image.attribution}
				class="size-full rounded-lg object-cover saturate-[.8] filter"
				in:fade={{ duration: 300 }}
			/>
		{/key}
	</div>
	<div class="flex-[2_2_0%]">
		{#each categories as cat}
			<div
				key={cat.id}
				class="flex flex-col overflow-hidden {categories[0].id !== cat.id
					? 'border-t border-dark30'
					: ''} pt-5"
			>
				<div class="flex items-center gap-5 pb-5">
					<button class="h-min" aria-label="Toggle open/close category" onclick={() => toggleCategory(cat)}>
						{#if expandedCategory === cat.id}
							<CircleMinus aria-hidden="true" size={32} color="#EE7430" strokeWidth={1} />
						{:else}
							<CirclePlus aria-hidden="true" size={32} color="#EE7430" strokeWidth={1} />
						{/if}
					</button>
					<h3>{cat.name}</h3>
				</div>
				{#if expandedCategory === cat.id}
					<div class="flex flex-col gap-5 pb-5 pl-[3.2rem] md:w-2/3" transition:slide>
						<p>{cat.description}</p>
						<TextLink link={`/treks?category=${cat.id}`} text="Go to treks" />
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>
