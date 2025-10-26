<script>
	let { size, color = '#FFFFFF' } = $props();
</script>

<div class={size}>
	<svg
		width="100%"
		height="100%"
		viewBox="0 0 51 51"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<rect width="51" height="51" fill="none" />
		<path
			d="M27.8461 40.9984L43.3453 25.4992L27.8461 10M4 41.0004L19.4992 25.5012L4 10.002"
			stroke={color}
			stroke-width="9.53798"
		/>
	</svg>
</div>
