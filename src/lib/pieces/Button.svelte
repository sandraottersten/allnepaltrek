<script>
	const { label, type = 'button' } = $props();
</script>

<button
	{type}
	class="flex h-12 items-center rounded-lg bg-blue px-6 text-lg font-normal text-light"
>
	{label}
</button>
