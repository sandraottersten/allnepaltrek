<script>
	import Logo from '$lib/svg/Logo.svelte';

	let regions = [
		{ label: 'Everest region', link: '/treks?region=everest' },
		{ label: 'Annapurna region', link: '/treks?region=annapurna' },
		{ label: 'Manaslu region', link: '/treks?region=manaslu' },
		{ label: 'Langtang region', link: '/treks?region=langtang' },
		{ label: 'Kanchenjunga region', link: '/treks?region=kanchenjunga' }
	];

	let treks = [
		{ label: 'Short treks', link: '/treks?category=short' },
		{ label: 'Classic treks', link: '/treks?category=classic' },
		{ label: 'Best views', link: '/treks?category=view' },
		{ label: 'Peak climbs', link: '/treks?category=peak' },
		{ label: 'Hidden gems', link: '/treks?category=offpath' }
	];

	let tours = [
		{ label: 'Kathmandu tours', link: '/treks?category=short' },
		{ label: 'Pokhara tours', link: '/treks?category=classic' },
		{ label: 'Chitwan tours', link: '/treks?category=view' }
	];
</script>

<footer class="hidden flex-col bg-dark pb-6 pt-8 font-normal text-light80 md:flex md:pt-16">
	<div class="x-margin flex flex-col md:flex-row">
		<div class="w-[30%]">
			<a href="/"><Logo size="h-[80px] w-[100px] md:h-[140px] md:w-[186px]" /></a>
		</div>
		<div class="grid w-full grid-cols-1 md:w-[46rem] md:grid-cols-3">
			<ul class="flex flex-col gap-1">
				{#each treks as trek}
					<li><a href={trek.link}>{trek.label}</a></li>
				{/each}
			</ul>
			<ul class="flex flex-col gap-1">
				{#each regions as region}
					<li><a href={region.link}>{region.label}</a></li>
				{/each}
			</ul>
			<ul class="flex flex-col gap-1">
				{#each tours as tour}
					<li><a href={tour.link}>{tour.label}</a></li>
				{/each}
			</ul>
		</div>
	</div>
	<hr class="border-1 my-8 w-full border-light30" />
	<div class="x-margin flex flex-col md:flex-row">
		<div class="w-[30%]">
			<p>info@allnepaltrek.com</p>
			<p>+9779840055491</p>
		</div>
		<div class="grid w-full grid-cols-1 md:w-[46rem] md:grid-cols-3">
			<a href="/info">General info</a>
			<a href="/about">About us</a>
			<a href="/contact">Get in touch</a>
		</div>
	</div>
	<div class="mx-8 mt-12 flex justify-end">
		<p class="text-base font-normal text-light30">© 2024 All Nepal Trek</p>
	</div>
</footer>

<footer class="flex flex-col bg-dark pb-4 pt-8 font-normal text-light80 md:hidden md:pt-16">
	<div class="x-margin flex flex-col md:flex-row">
		<div class="mb-8 w-[30%]">
			<a href="/"><Logo size="h-[64px] w-[86px]" /></a>
		</div>
		<div class="grid w-full grid-cols-2">
			<ul class="flex flex-col gap-1">
				{#each treks as trek, i}
					<li class={i + 1 === treks.length ? 'mb-4' : ''}><a href={trek.link}>{trek.label}</a></li>
				{/each}
				{#each regions as region}
					<li><a href={region.link}>{region.label}</a></li>
				{/each}
			</ul>
			<ul class="flex flex-col gap-1 text-end">
				{#each tours as tour}
					<li><a href={tour.link}>{tour.label}</a></li>
				{/each}
				<li class="mt-4"><a href="/info">General info</a></li>
				<li><a href="/about">About us</a></li>
				<li><a href="/contact">Get in touch</a></li>
			</ul>
		</div>
	</div>
	<hr class="border-1 my-6 w-full border-light30" />
	<div class="x-margin flex flex-col md:flex-row">
		<div class="flex w-[30%] flex-col gap-1">
			<p>info@allnepaltrek.com</p>
			<p>+9779840055491</p>
		</div>
	</div>
	<p class="mx-4 mt-12 text-base font-normal text-light30">© 2024 All Nepal Trek</p>
</footer>
