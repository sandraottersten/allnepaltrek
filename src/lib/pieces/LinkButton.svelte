<script>
	import { ChevronsRight } from '@lucide/svelte';
	const { label, link, fullWidth, style = '' } = $props();
</script>

<a
	href={link}
	class="flex h-14 items-center gap-4 rounded-full bg-blue pl-10 pr-6 text-lg font-normal text-light {style} {fullWidth
		? 'w-full'
		: 'w-fit'}"
	>{label}
	<ChevronsRight size={28} />
</a>
