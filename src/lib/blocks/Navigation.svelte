<script>
	import Logo from '$lib/svg/Logo.svelte';
	import Logo2 from '$lib/svg/Logo2.svelte';
	import { ChevronRight, Menu, X } from '@lucide/svelte';
	import WhatsApp from '$lib/svg/WhatsApp.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import LinkButton from '$lib/pieces/LinkButton.svelte';
	let { data } = $props();

	let isScrolling = $state(false);
	let lastScrollTop = $state(0);
	let scrollDown = $state(false);
	let showMobileMenu = $state(false);
	let expandedMenus = $state([]);
	let vh = $state(0);
	let showWhatsApp = $state(false);

	onMount(() => {
		vh = window.innerHeight;
		window.addEventListener('resize', () => {
			vh = window.innerHeight;
		});
		return () => {
			window.removeEventListener('resize', () => {
				vh = window.innerHeight;
			});
		};
	});

	const treks = $derived(
		data.treks.links.map((r) => ({
			label: r.title,
			link: `/treks?region=${r.region.id}`,
			subItems: [
				{ title: `All ${r.region.id} treks`, link: `/treks?region=${r.region.id}` },
				...r.region.treks.map((t) => ({ title: t.title, link: `/treks/${t.slug}` }))
			]
		}))
	);

	const regions = $derived(
		data.regions.links.map((r) => ({
			label: r.title,
			link: `/regions/${r.region.slug}`
		}))
	);

	const tours = $derived(
		data.tours.links.map((r) => ({
			label: r.title,
			link: `/tours?category=${r.id}`,
			subItems: [
				{ title: `All ${r.id} tours`, link: `/tours?category=${r.id}` },
				...r.tours.map((t) => ({ title: t.title, link: `/tours/${t.slug}` }))
			]
		}))
	);

	let information = [
		{ label: 'Gear', link: '/travel-info/gear', subItems: null },
		{ label: 'Health & fitness', link: '/travel-info/health', subItems: null }
	];

	let menuItems = $derived([
		{
			label: data.treks.title,
			link: '/treks',
			id: 'treks',
			subItems: [{ label: 'All treks', link: '/treks' }, ...treks]
		},
		{
			label: 'Tours',
			link: '/tours',
			id: 'tours',
			subItems: [{ label: 'All tours', link: '/tours' }, ...tours]
		},
		{ label: 'Regions', link: '/regions', subItems: regions, id: 'regions' },
		{ label: 'Travel info', link: '/travel-info', subItems: information, id: 'info' },
		{ label: 'Contact', link: '/contact', subItems: null, id: 'contact' }
	]);

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

	const closeMobileMenu = () => {
		showMobileMenu = false;
		window.document.body.classList.remove('no-scroll');
		expandedMenus = [];
	};

	let currentPath = $state('');

	$effect(() => {
		const path = $page.url.pathname;
		if (currentPath !== path) {
			currentPath = path;
			if (showMobileMenu) {
				closeMobileMenu();
			}
		}
	});
</script>

<header
	class="fixed left-0 z-50 hidden w-full flex-col shadow-md duration-300 md:flex
{scrollDown
		? 'translate-y-[-100%] transform'
		: lastScrollTop > 100
			? 'translate-y-[-58%] transform'
			: 'translate-y-0 transform'}"
>
	<div class="flex h-[64px] items-center justify-between bg-light90 pr-8">
		<a href="/" aria-label="Go to start page" class="flex h-[64px] items-center border-r border-dark30 pl-10 pr-10">
			<Logo aria-hidden="true" size="w-[64px]" textColor="#000000" /></a
		>
		<div class="flex items-center gap-2">
			{#if showWhatsApp}
				<a
					href={`https://wa.me/9779841356471`}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center space-x-2"
				>
					<span class="text-blue hover:underline">+9779841356471</span>
				</a>
			{/if}
			<button
				class="flex h-12 w-12 items-center justify-center rounded-full"
        aria-label="Contact us on WhatsApp"
				onclick={() => (showWhatsApp = !showWhatsApp)}
			>
				<WhatsApp aria-hidden="true" size="size-[30px]" color="#027B83" />
			</button>
			<LinkButton label="Book now" link="/booking" />
		</div>
	</div>
	<div class="w-full justify-between bg-dark80 text-light backdrop-blur-sm duration-300 md:flex">
		<div class="flex w-full flex-col justify-center">
			<div class="flex w-full items-center px-10">
				<a href="/" aria-label="Go to start page"class="mt-1 duration-300 {lastScrollTop > 150 ? 'block' : 'hidden'}">
					<Logo2 aria-hidden="true" size="w-[100px]" textColor="#F8F8F8" />
				</a>
				<nav class="group/menu relative ml-auto mr-0 flex h-full items-center gap-5">
					<ul class="flex gap-5 rounded-lg">
						{#each menuItems as item}
							<div class="group relative flex h-full items-center">
								<a
									href={item.link}
									class="flex h-12 min-w-max items-center justify-between gap-2 text-nowrap px-5 text-lg"
								>
									<span>{item.label}</span>
									{#if item.subItems}
										<ChevronRight size={24} class=" stroke-light30 group-hover:stroke-blue" />
									{/if}
								</a>
								{#if item.subItems}
									<ul
										class="absolute -left-1 top-12 hidden flex-col rounded-lg bg-light py-1 text-dark shadow-xl backdrop-blur-xl group-hover:flex"
									>
										{#each item.subItems as subItem, i}
											<div class="group/sub relative flex h-full flex-col">
												<a
													href={subItem.link}
													class="group/subitem flex h-12 items-center justify-between text-nowrap pl-6 pr-4 hover:bg-dark10"
												>
													<span class={subItem.subItems && 'pr-3'}>{subItem.label}</span>
													<ChevronRight
														size={24}
														class={i > 0 && subItem.subItems
															? 'stroke-dark30 group-hover/sub:stroke-blue'
															: 'opacity-0'}
													/>
												</a>
												{#if subItem.subItems}
													<ul
														class="absolute -top-1 left-[100%] hidden flex-col rounded-lg bg-light py-1 text-dark backdrop-blur-xl group-hover/sub:flex"
													>
														{#each subItem.subItems as subItem, i}
															<div class="relative">
																<a
																	href={subItem.link}
																	class="group/subitem flex h-12 min-w-max items-center justify-between text-nowrap pl-8 pr-6 hover:bg-dark10"
																>
																	<span class="pr-8">{subItem.title}</span>
																</a>
																<hr
																	class="border-1 w-full {i === 0
																		? 'h-[1px] border-dark10'
																		: 'hidden'}"
																/>
															</div>
														{/each}
													</ul>
												{/if}
												<div
													class="w-full {i === 0 && ['treks', 'tours'].includes(item.id)
														? 'h-[1px] bg-dark10'
														: 'hidden'}"
												></div>
											</div>
										{/each}
									</ul>
								{/if}
							</div>
						{/each}
					</ul>
				</nav>
			</div>
		</div>
	</div>
</header>

<!-- mobile -->
<header
	class="fixed inset-x-0 z-50 flex flex-col backdrop-blur-xl duration-300 sm:px-[3.5rem] md:hidden
    {scrollDown && lastScrollTop > 200
		? 'translate-y-[-100%] transform'
		: 'translate-y-0 transform'}"
>
	<div class="flex h-[3.5rem] items-center justify-between bg-light90 pl-3 pr-6 text-dark">
		<a href="/" aria-label="Go to start page">
			<Logo aria-hidden="true" size="w-[50px]" textColor="#00171C" />
		</a>

		{#if showMobileMenu}
			<button onclick={toggleMobileMenu}><X color="#00171C" /></button>
		{:else}
			<button onclick={toggleMobileMenu}><Menu color="#00171C" /></button>
		{/if}
	</div>
	{#if !showMobileMenu && lastScrollTop < 200}
		<div class="h-[28px] w-full bg-dark80 text-light backdrop-blur-sm"></div>
	{/if}

	{#if showMobileMenu}
		<nav>
			<ul class="flex h-[calc(100vh-80px)] flex-col overflow-y-auto bg-light90 text-dark">
				{#each menuItems as item}
					<li class="flex flex-col">
						<div class="flex h-12 min-h-12 items-center">
							<a
								href={item.link}
								class="flex min-w-max flex-1 items-center justify-between text-nowrap px-4"
							>
								<span>{item.label}</span>
							</a>
							{#if item.subItems}
								<button
									onclick={() => expandMenuItem(item.label)}
									class="flex h-12 items-center justify-center px-2"
								>
									<ChevronRight
										size={28}
										class={expandedMenus.includes(item.label)
											? 'rotate-90 stroke-blue'
											: 'stroke-dark80'}
									/>
								</button>
							{/if}
						</div>
						{#if item.subItems}
							<ul
								class="flex flex-col bg-light80 {expandedMenus.includes(item.label)
									? 'h-min'
									: 'h-0 overflow-hidden'}"
							>
								{#each item.subItems as subItem, i}
									<div class="flex flex-col">
										<div class="flex h-12 min-h-12 items-center">
											<a
												href={subItem.link}
												class="flex min-w-max flex-1 items-center justify-between text-nowrap px-4"
											>
												<span class="text-dark">{subItem.label}</span>
											</a>
											{#if subItem.subItems}
												<button
													onclick={() => expandMenuItem(subItem.label)}
													class="flex h-12 items-center justify-center px-2"
												>
													<ChevronRight
														size={28}
														class={expandedMenus.includes(subItem.label)
															? 'rotate-90 stroke-blue'
															: 'stroke-dark80'}
													/>
												</button>
											{/if}
										</div>
										{#if subItem.subItems}
											<ul
												class="flex flex-col bg-light {expandedMenus.includes(subItem.label)
													? 'h-full'
													: 'h-0 overflow-hidden'}"
											>
												{#each subItem.subItems as subItem, i}
													<div class="relative">
														<a
															href={subItem.link}
															class="flex h-12 min-w-max items-center justify-between text-nowrap pl-8 pr-6"
														>
															<span class="pr-8 text-dark">{subItem.title}</span>
														</a>
													</div>
												{/each}
											</ul>
										{/if}
									</div>
								{/each}
							</ul>
						{/if}
					</li>
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
