<script>
	import Logo from '$lib/svg/Logo.svelte';
	import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-svelte';
	import WhatsApp from '$lib/svg/WhatsApp.svelte';
	import PeaksSmall from '$lib/svg/PeaksSmall.svelte';
	import { on } from 'svelte/events';
	import { onMount } from 'svelte';

	let { data } = $props();

	let expanded = $state(false);
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
			subItems: [{ label: 'All treks', link: '/treks' }, ...treks]
		},
		{ label: 'Regions', link: '/regions', subItems: regions },
		{
			label: 'Tours',
			link: '/tours',
			subItems: [{ label: 'All tours', link: '/tours' }, ...tours]
		},
		{ label: 'Travel info', link: '/travel-info', subItems: information }
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
	class="fixed left-0 z-50 hidden w-full justify-between rounded-b-[40px] px-10 md:flex {lastScrollTop >
	vh
		? 'bg-light80 text-dark shadow-2xl backdrop-blur-xl'
		: ' text-light'}"
>
	<a href="/" class="px-2 py-3"
		><Logo
			size={lastScrollTop > vh ? 'w-[50px]' : 'w-[80px]'}
			textColor={lastScrollTop > vh ? '#00171C' : '#F8F8F8'}
		/></a
	>

	<nav class="group/menu relative flex h-full">
		<ul class="flex gap-5 rounded-lg py-1">
			{#each menuItems as item}
				<div class="group relative flex h-full items-center">
					<a
						href={item.link}
						class="flex h-12 min-w-max items-center justify-between gap-2 text-nowrap px-5"
					>
						<span>{item.label}</span>
						{#if item.subItems}
							<ChevronRight
								size={24}
								class=" group-hover:stroke-orange {lastScrollTop > vh
									? 'stroke-dark30'
									: 'stroke-light30'}"
							/>
						{/if}
					</a>
					{#if item.subItems}
						<ul
							class="absolute top-12 hidden flex-col rounded-lg bg-light py-1 text-dark shadow-2xl backdrop-blur-xl group-hover:flex"
						>
							{#each item.subItems as subItem, i}
								<div class="group/sub relative flex h-full flex-col">
									<a
										href={subItem.link}
										class="group/subitem flex h-12 items-center gap-3 text-nowrap pl-3 pr-6 hover:bg-light10"
									>
										<ChevronLeft
											size={24}
											class=" {i > 0 ? 'stroke-dark30 group-hover/sub:stroke-orange' : 'opacity-0'}"
										/>
										<span>{subItem.label}</span>
									</a>
									{#if subItem.subItems}
										<ul
											class="absolute -top-1 right-[100%] hidden flex-col rounded-lg bg-light80 py-1 text-dark shadow-2xl backdrop-blur-xl group-hover/sub:flex"
										>
											{#each subItem.subItems as subItem, i}
												<div class="relative">
													<a
														href={subItem.link}
														class="group/subitem flex h-12 min-w-max items-center justify-between text-nowrap pl-8 pr-6 hover:bg-light10"
													>
														<span class="pr-8">{subItem.title}</span>
													</a>
													<hr
														class="border-1 w-full {i === 0 ? 'h-[1px] border-light10' : 'hidden'}"
													/>
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
		</ul>

		<!-- <div class="group/contact relative flex min-h-14 min-w-10 items-center justify-center">
			<WhatsApp size="size-[24px] cursor-pointer" color="#FFFFFF" />
			<div
				class="absolute right-[calc(100%-70px)] top-12 hidden flex-col rounded-lg bg-dark pb-1 text-light group-hover/contact:flex"
			>
				<div class="flex flex-col gap-1 px-6 py-4">
					<p>Ask Bhim</p>
					<p>+9779841356471</p>
				</div>
				<hr class="border-1 h-[1px] w-full border-light10" />
				<div>
					<a
						href={'/contact'}
						class="group/subitem flex h-12 min-w-max items-center justify-between text-nowrap px-6 hover:bg-light10"
					>
						<span class="pr-4 text-light">{'Contact page'}</span>
						<PeaksSmall size="size-[24px]" />
					</a>
				</div>
			</div>
		</div> -->
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
														<span class="pr-8 text-light">{subItem.title}</span>
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
