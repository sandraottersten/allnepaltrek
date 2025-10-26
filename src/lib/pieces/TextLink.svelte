<script>
	import { ChevronsRight } from '@lucide/svelte';

	let { link, text, style = '' } = $props();
</script>

<div class={`group mb-2 mt-2 flex items-center gap-1 ${style}`}>
	<a href={link} class="text-blue">{text}</a>
	<ChevronsRight size={24} class="transform text-blue duration-200 group-hover:translate-x-1" />
</div>
