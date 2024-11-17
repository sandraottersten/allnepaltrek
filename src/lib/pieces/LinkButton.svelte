<script>
	const { label, link } = $props();
</script>

<a
	href={link}
	class="flex h-14 items-center rounded-full bg-orange px-10 text-xl font-semibold text-light"
	>{label}
</a>
