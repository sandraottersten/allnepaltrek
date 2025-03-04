<script>
	import PeaksSmall from '$lib/svg/PeaksSmall.svelte';

	let { link, text } = $props();
</script>

<div class="group mb-2 mt-2 flex items-center gap-2">
	<PeaksSmall size="size-[24px] min-w-[24px]" />
	<a href={link} class="group-hover:text-orange">{text}</a>
</div>
