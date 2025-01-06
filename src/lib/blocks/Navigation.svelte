<script>
	import Logo from '$lib/svg/Logo.svelte';
	import { ChevronRight, Menu, X } from 'lucide-svelte';
	import WhatsApp from '$lib/svg/WhatsApp.svelte';

	let expanded = $state(false);
	let isScrolling = $state(false);
	let lastScrollTop = $state(0);
	let scrollDown = $state(false);
	let showMobileMenu = $state(false);
	let expandedMenus = $state([]);

	let everestTreks = [
		{ label: 'All Everest treks', link: '/treks?region=everest' },
		{ label: 'EBC classic route', link: '/treks/everest-base-camp-classic' },
		{ label: 'EBC Gokyo lakes', link: '/treks/everest-base-camp-gokyo' },
		{ label: 'EBC 3 passes', link: '/treks/everest-base-camp-3-passes' },
		{ label: 'Everest panorama', link: '/treks/everest-panorama-trek' }
	];

	let regions = [
		{ label: 'All treks', link: '/treks', subItems: null },
		{ label: 'Everest region', link: '/treks?region=everest', subItems: everestTreks },
		{ label: 'Annapurna region', link: '/treks?region=annapurna', subItems: null },
		{ label: 'Manaslu region', link: '/treks?region=manaslu', subItems: null },
		{ label: 'Langtang region', link: '/treks?region=langtang', subItems: null },
		{ label: 'Kanchenjunga region', link: '/treks?region=kanchenjunga', subItems: null }
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
</script>

<header
	class="fixed left-0 z-50 hidden h-14 w-full items-center justify-between rounded-b-[40px] pl-[1.5rem] sm:px-[3.5rem] md:flex {isScrolling &&
	lastScrollTop > 600
		? 'bg-dark80 backdrop-blur delay-500'
		: ''}
    {scrollDown
		? 'translate-y-[-150%] transform delay-500 duration-500'
		: 'translate-y-0 transform delay-500 duration-500'}"
>
	<a href="/"
		><Logo
			size={isScrolling && lastScrollTop > 600
				? 'w-[60px] duration-500 mt-0'
				: 'w-[90px] duration-500 delay-500 mt-10'}
		/></a
	>
	<nav class="flex h-full items-center justify-center gap-20">
		{#each menuItems as item}
			<div class="group relative flex h-full items-center">
				<a href={item.link} class="flex items-center gap-2 uppercase text-light">
					<span>{item.label}</span>
					{#if item.subItems}
						<ChevronRight size={24} class="stroke-light80 group-hover:stroke-orange" />
					{/if}
				</a>
				{#if item.subItems}
					<ul
						class="absolute -left-8 top-12 hidden flex-col rounded-lg bg-dark py-1 group-hover:flex"
					>
						{#each item.subItems as subItem, i}
							<div class="group/sub relative flex h-full flex-col">
								<a
									href={subItem.link}
									class="group/subitem flex h-12 min-w-max items-center justify-between text-nowrap pl-8 pr-6 hover:bg-light10"
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
										class="absolute -top-1 left-[calc(100%-8px)] hidden flex-col rounded-lg bg-dark py-1 group-hover/sub:flex"
									>
										{#each subItem.subItems as subItem, i}
											<div class="relative">
												<a
													href={subItem.link}
													class="group/subitem flex h-12 min-w-max items-center justify-between text-nowrap pl-8 pr-6 hover:bg-light10"
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
		<WhatsApp size="size-[24px]" color="#FFFFFF" />
	</nav>
</header>

<header
	class="fixed inset-x-0 z-50 flex flex-col sm:px-[3.5rem] md:hidden {isScrolling
		? 'bg-dark80 backdrop-blur'
		: showMobileMenu
			? 'bg-dark80 backdrop-blur'
			: ''} {showMobileMenu ? 'rounded-b-none' : 'rounded-b-3xl'}"
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
		<nav>
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
		</nav>
	{/if}
</header>

<style>
	:global(body.no-scroll) {
		overflow: hidden;
		margin: 0;
		height: 100%;
	}
</style>
