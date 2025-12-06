<script>
	import { urlFor } from '../../sanity';
	import { Footprints, Mountain, Timer, Binoculars, Bird } from '@lucide/svelte';
	let { categories, image } = $props();
</script>

<section class="flex w-full overflow-hidden bg-[#E3E3E3]">
	<div
		class="x-margin y-margin grid w-full grid-cols-1 gap-3 md:grid-cols-4 md:gap-5 lg:grid-cols-5"
	>
		{#each categories as category}
			<a
				href={`/treks?category=${category.id}`}
				class="group relative flex h-[92px] w-full flex-col justify-end gap-5 overflow-hidden rounded-lg bg-cover bg-center px-4 py-4 saturate-[.80] md:h-[400px]"
				style="background-image: url({urlFor(category.image).url()});"
			>
				<div class="absolute inset-0 bg-heroGradient3 transition-opacity group-hover:bg-none"></div>
				<div class="relative z-10 flex items-center gap-2">
					{#if category.icon === 'Footprints'}
						<Footprints size={20} strokeWidth={1.5} color="#F8F8F8" />
					{:else if category.icon === 'Mountain'}
						<Mountain size={20} strokeWidth={1.5} color="#F8F8F8" />
					{:else if category.icon === 'Timer'}
						<Timer size={20} strokeWidth={1.5} color="#F8F8F8" />
					{:else if category.icon === 'Binoculars'}
						<Binoculars size={20} strokeWidth={1.5} color="#F8F8F8" />
					{:else if category.icon === 'Bird'}
						<Bird size={20} strokeWidth={1.5} color="#F8F8F8" />
					{:else}
						<Mountain size={20} strokeWidth={1.5} color="#F8F8F8" />
					{/if}
					<span class="text-md text-center font-light text-light">{category.name}</span>
				</div>
			</a>
		{/each}
	</div>
</section>
