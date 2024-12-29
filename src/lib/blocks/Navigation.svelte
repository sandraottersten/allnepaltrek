<script>
	import Logo from '$lib/svg/Logo.svelte';
	import { ChevronRight, Mountain, Menu, X } from 'lucide-svelte';

	let expanded = $state(false);
	let isScrolling = $state(false);
	let lastScrollTop = $state(0);
	let scrollDown = $state(false);
	let showMobileMenu = $state(false);
	let expandedMenus = $state([]);

	let everestTreks = [
		{ label: 'All Everest treks', link: '/treks/?region=everest' },
		{ label: 'EBC classic route', link: '/treks/everest-base-camp-classic' },
		{ label: 'EBC Gokyo lakes', link: '/treks/everest-base-camp-gokyo' },
		{ label: 'EBC 3 passes', link: '/treks/everest-base-camp-3-passes' },
		{ label: 'Everest panorama', link: '/treks/everest-panorama-trek' }
	];

	let regions = [
		{ label: 'All treks', link: '/treks', subItems: null },
		{ label: 'Annapurna region', link: '/treks?region=annapurna', subItems: null },
		{ label: 'Everest region', link: '/treks?region=everest', subItems: everestTreks },
		{ label: 'Langtang region', link: '/treks?region=langtang', subItems: null },
		{ label: 'Other regions', link: '/treks?region=other', subItems: null },
		{ label: 'Short treks', link: '/treks?type=short', subItems: null }
	];

	let destinations = [
		{ label: 'All destinations', link: '/destination', subItems: null },
		{ label: 'Annapurna', link: '/destination?region=annapurna', subItems: null },
		{ label: 'Everest', link: '/destination?region=everest', subItems: null },
		{ label: 'Langtang', link: '/destination?region=langtang', subItems: null },
		{ label: 'Manaslu', link: '/destination?region=manaslu', subItems: null },
		{ label: 'Makalu', link: '/destination?region=makalu', subItems: null }
	];

	let information = [
		{ label: 'Gear', link: '/travel-info/gear', subItems: null },
		{ label: 'Health & fitness', link: '/travel-info/health', subItems: null }
	];

	let menuItems = [
		{ label: 'Trekking', link: '/treks', subItems: regions },
		{ label: 'Destinations', link: '/destinations', subItems: destinations },
		{ label: 'Travel info', link: '/travel-info', subItems: information },
		{ label: 'Contact', link: '/contact', subItems: null }
	];

	$effect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	const handleScroll = () => {
		if (window.scrollY > lastScrollTop) {
			scrollDown = true;
		} else if (window.scrollY < lastScrollTop) {
			scrollDown = false;
		}
		lastScrollTop = window.scrollY <= 0 ? 0 : window.scrollY;

		if (window.scrollY > 60) {
			if (!isScrolling) {
				isScrolling = true;
			}
		} else {
			if (isScrolling) {
				isScrolling = false;
			}
		}
	};

	const expandMenuItem = (label) => {
		if (expandedMenus.includes(label)) expandedMenus = expandedMenus.filter((l) => l !== label);
		else expandedMenus.push(label);
	};

	const toggleMobileMenu = () => {
		showMobileMenu = !showMobileMenu;
		window.document.body.classList.toggle('no-scroll');
		if (!showMobileMenu) expandedMenus = [];
	};

	$inspect(expandedMenus);
</script>

<nav
	class="fixed left-0 top-4 z-50 hidden h-[4rem] items-center pl-[1.5rem] sm:px-[3.5rem] md:flex {isScrolling
		? 'inset-x-0 mx-auto w-max justify-center rounded-full bg-dark80 backdrop-blur'
		: 'w-full justify-between '}"
>
	<a href="/"><Logo size="h-[56px] w-[60px]" /></a>
	<div class="mx-20 flex h-full items-center justify-center {isScrolling ? 'gap-16' : 'gap-20'}">
		{#each menuItems as item}
			<div class="group relative flex h-full items-center">
				<a href={item.link} class="flex items-center gap-2 uppercase text-light">
					<span>{item.label}</span>
					{#if item.subItems}
						<ChevronRight size={28} class="stroke-dark30 group-hover:stroke-orange" />
					{/if}
				</a>
				{#if item.subItems}
					<ul
						class="absolute -left-8 top-14 hidden flex-col rounded-3xl bg-dark80 py-3 !backdrop-blur group-hover:flex"
					>
						{#each item.subItems as subItem, i}
							<div class="group/sub relative flex h-full flex-col">
								<a
									href={subItem.link}
									class="group/subitem flex h-12 min-w-max items-center justify-between text-nowrap pl-8 pr-6 hover:bg-dark70"
								>
									<span class="pr-8 text-light">{subItem.label}</span>
									<ChevronRight
										size={28}
										class="stroke-dark30 group-hover/sub:stroke-orange {expanded
											? 'rotate-90'
											: ''}"
									/>
								</a>
								{#if subItem.subItems}
									<ul
										class="absolute -top-3 left-[calc(100%-8px)] hidden flex-col rounded-3xl bg-dark80 py-3 backdrop-blur group-hover/sub:flex"
									>
										{#each subItem.subItems as subItem, i}
											<div class="relative">
												<a
													href={subItem.link}
													class="group/subitem flex h-12 min-w-max items-center justify-between text-nowrap pl-8 pr-6 hover:bg-dark70"
												>
													<span class="pr-8 text-light">{subItem.label}</span>
												</a>
												<div class="w-full {i === 0 ? 'h-[1px] bg-light10' : 'hidden'}"></div>
											</div>
										{/each}
									</ul>
								{/if}
								<div class="w-full {i === 0 ? 'h-[1px] bg-light10' : 'hidden'}"></div>
							</div>
						{/each}
					</ul>
				{/if}
			</div>
		{/each}
	</div>
	<div>
		<Mountain size={28} />
	</div>
</nav>

<nav
	class="fixed inset-x-0 top-3 z-50 mx-auto flex w-[calc(100vw-1.5rem)] flex-col sm:px-[3.5rem] md:hidden {isScrolling
		? 'bg-dark80 backdrop-blur'
		: showMobileMenu
			? 'bg-dark80 backdrop-blur'
			: ''} {showMobileMenu ? 'rounded-xl' : 'rounded-full'}"
>
	<div class="flex h-[3.5rem] items-center justify-between pl-3 pr-6">
		<a href="/"><Logo size="h-[36px] w-[60px]" /></a>

		{#if showMobileMenu}
			<button onclick={toggleMobileMenu}><X color="#FFFFFF" /></button>
		{:else}
			<button onclick={toggleMobileMenu}><Menu color="#FFFFFF" /></button>
		{/if}
	</div>

	{#if showMobileMenu}
		<ul class="flex h-[calc(100vh-80px)] flex-col overflow-y-auto text-light">
			{#each menuItems as item}
				<button
					onclick={() => expandMenuItem(item.label)}
					class="flex h-12 min-h-12 min-w-max items-center justify-between text-nowrap px-4 uppercase"
				>
					<span>{item.label}</span>
					{#if item.subItems}
						<ChevronRight
							size={28}
							class={expandedMenus.includes(item.label)
								? 'rotate-90 stroke-orange'
								: 'stroke-light80'}
						/>
					{/if}
				</button>
				{#if item.subItems}
					<ul
						class="flex flex-col bg-dark30 {expandedMenus.includes(item.label)
							? 'h-min'
							: 'h-0 overflow-hidden'}"
					>
						{#each item.subItems as subItem, i}
							<div class="flex flex-col">
								<button
									onclick={() => expandMenuItem(subItem.label)}
									class="flex h-12 min-h-12 min-w-max items-center justify-between text-nowrap px-4"
								>
									<span class="pr-8 text-light">{subItem.label}</span>
									{#if subItem.subItems}
										<ChevronRight
											size={28}
											class={expandedMenus.includes(subItem.label)
												? 'rotate-90 stroke-orange'
												: 'stroke-light80'}
										/>
									{/if}
								</button>
								{#if subItem.subItems}
									<ul
										class="flex flex-col bg-dark {expandedMenus.includes(subItem.label)
											? 'h-full'
											: 'h-0 overflow-hidden'}"
									>
										{#each subItem.subItems as subItem, i}
											<div class="relative">
												<a
													href={subItem.link}
													class="flex h-12 min-w-max items-center justify-between text-nowrap pl-8 pr-6"
												>
													<span class="pr-8 text-light">{subItem.label}</span>
												</a>
											</div>
										{/each}
									</ul>
								{/if}
							</div>
						{/each}
					</ul>
				{/if}
			{/each}
		</ul>
	{/if}
</nav>

<style>
	:global(body.no-scroll) {
		overflow: hidden;
		margin: 0;
		height: 100%;
	}
</style>
