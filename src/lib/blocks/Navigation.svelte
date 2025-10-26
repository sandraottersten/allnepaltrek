<script>
	import Logo from '$lib/svg/Logo.svelte';
	import Logo2 from '$lib/svg/Logo2.svelte';
	import { ChevronRight, Menu, X } from '@lucide/svelte';
	import WhatsApp from '$lib/svg/WhatsApp.svelte';
	import { onMount } from 'svelte';

	let { data } = $props();

	let isScrolling = $state(false);
	let lastScrollTop = $state(0);
	let scrollDown = $state(false);
	let showMobileMenu = $state(false);
	let expandedMenus = $state([]);
	let vh = $state(0);

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

	const treks = data.treks.links.map((r) => {
		return {
			label: r.title,
			link: `/treks?region=${r.region.id}`,
			subItems: [
				{ title: `All ${r.region.id} treks`, link: `/treks?region=${r.region.id}` },
				...r.region.treks.map((t) => ({ title: t.title, link: `/treks/${t.slug}` }))
			]
		};
	});

	const regions = data.regions.links.map((r) => {
		return {
			label: r.title,
			link: `/regions/${r.region.slug}`
		};
	});

	const tours = data.tours.links.map((r) => {
		return {
			label: r.title,
			link: `/tours?category=${r.id}`,
			subItems: [
				{ title: `All ${r.id} tours`, link: `/tours?category=${r.id}` },
				...r.tours.map((t) => ({ title: t.title, link: `/tours/${t.slug}` }))
			]
		};
	});

	let information = [
		{ label: 'Gear', link: '/travel-info/gear', subItems: null },
		{ label: 'Health & fitness', link: '/travel-info/health', subItems: null }
	];

	let menuItems = [
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
		{ label: 'Travel info', link: '/travel-info', subItems: information, id: 'info' }
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
	class="fixed left-0 z-50 hidden w-full flex-col shadow-md duration-300 md:flex
{scrollDown
		? 'translate-y-[-100%] transform'
		: lastScrollTop > 100
			? 'translate-y-[-58%] transform'
			: 'translate-y-0 transform'}"
>
	<div class="flex h-[64px] items-center justify-between bg-light pr-8">
		<a href="/" class="flex h-[64px] items-center border-r border-dark30 pl-10 pr-10">
			<Logo size="w-[64px]" textColor="#000000" /></a
		>
		<button class="flex h-12 items-center rounded-full bg-blue px-6 text-lg font-normal text-light">
			Book now
		</button>
	</div>
	<div class="w-full justify-between bg-dark80 text-light backdrop-blur-sm duration-300 md:flex">
		<div class="flex w-full flex-col justify-center">
			<!-- <div class="flex h-8 w-full items-center justify-end border-b border-dark30 pr-16">
			<span class="flex items-center text-sm">
				Bhim Guide <span class="ml-3 mr-2"><WhatsApp size="size-[20px]" color="#000000" /></span> +9779841356471
			</span>
		</div> -->
			<div class="flex w-full items-center px-10">
				<a href="/" class="mt-1 duration-300 {lastScrollTop > 150 ? 'block' : 'hidden'}">
					<Logo2 size="w-[100px]" textColor="#F8F8F8" />
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
					<button class="flex h-12 w-12 items-center justify-center rounded-full">
						<WhatsApp size="size-[30px]" color="#027B83" />
					</button>
				</nav>
			</div>
		</div>
	</div>
</header>

<header
	class="fixed inset-x-0 z-50 flex flex-col duration-300 sm:px-[3.5rem] md:hidden {lastScrollTop >
	vh
		? 'bg-light80 text-dark backdrop-blur-xl'
		: ' text-light'}
    {scrollDown ? 'translate-y-[-100%] transform' : 'translate-y-0 transform'}"
>
	<div
		class="flex items-center justify-between pl-3 pr-6 {lastScrollTop > vh
			? 'h-[3.5rem]'
			: 'h-[4rem]'}"
	>
		<a href="/">
			<Logo
				size={lastScrollTop > vh ? 'w-[50px]' : 'w-[70px] pt-3'}
				textColor={lastScrollTop > vh ? '#00171C' : '#F8F8F8'}
			/>
		</a>

		{#if showMobileMenu}
			<button onclick={toggleMobileMenu}><X color="#00171C" /></button>
		{:else}
			<button onclick={toggleMobileMenu}
				><Menu color={lastScrollTop > vh ? '#00171C' : '#F8F8F8'} /></button
			>
		{/if}
	</div>

	{#if showMobileMenu}
		<nav>
			<ul class="flex h-[calc(100vh-80px)] flex-col overflow-y-auto text-dark">
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
									? 'rotate-90 stroke-blue'
									: 'stroke-dark80'}
							/>
						{/if}
					</button>
					{#if item.subItems}
						<ul
							class="flex flex-col bg-light80 {expandedMenus.includes(item.label)
								? 'h-min'
								: 'h-0 overflow-hidden'}"
						>
							{#each item.subItems as subItem, i}
								<div class="flex flex-col">
									<button
										onclick={() => expandMenuItem(subItem.label)}
										class="flex h-12 min-h-12 min-w-max items-center justify-between text-nowrap px-4"
									>
										<span class="pr-8 text-dark">{subItem.label}</span>
										{#if subItem.subItems}
											<ChevronRight
												size={28}
												class={expandedMenus.includes(subItem.label)
													? 'rotate-90 text-blue'
													: 'stroke-dark80'}
											/>
										{/if}
									</button>
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
