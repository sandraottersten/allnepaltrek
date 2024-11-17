<script>
	import Logo from '$lib/svg/Logo.svelte';
	import Menu from '$lib/svg/Menu.svelte';
</script>

<div
	class="absolute left-0 top-0 z-50 flex h-[4rem] w-full items-center justify-between px-[1.5rem]"
>
	<nav class="hidden w-screen items-center md:flex">
		<Logo size="h-[56px] w-[60px]" />
		<div class="flex h-full w-full items-center justify-center gap-20 pt-3">
			<a href="/treks">Trekking</a>
			<a href="/destinations">Destinations</a>
			<a href="/travel-info">Travel info</a>
			<a href="/contact">Contact</a>
		</div>
	</nav>

	<div class="flex w-screen items-center justify-between md:hidden">
		<Logo size="h-[56px] w-[60px]" />
		<Menu size="size-[36px]" />
	</div>
</div>

<style>
	a {
		@apply uppercase text-light;
	}
</style>
