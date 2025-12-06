<script>
	import { ChevronsRight } from '@lucide/svelte';
	const { label, link, fullWidth, style = '' } = $props();
</script>

<a
	href={link}
	class="flex h-12 items-center gap-4 rounded-lg bg-blue pl-6 pr-4 text-lg font-normal text-light {style} {fullWidth
		? 'w-full'
		: 'w-fit'}"
	>{label}
	<ChevronsRight size={28} />
</a>
