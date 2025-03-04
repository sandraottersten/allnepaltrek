<script>
	const { label, link, fullWidth } = $props();
</script>

<a
	href={link}
	class="flex h-14 items-center rounded-full bg-orange px-10 text-lg font-normal text-light {fullWidth
		? 'w-full'
		: 'w-fit'}"
	>{label}
</a>
