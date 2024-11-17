<script>
	let { align, pos, width, height } = $props();

	const alignment = align === 'horizontal' ? `border-b ${width}` : `border-r ${height}`;
</script>

<div class="border-light30 absolute {pos} {alignment}"></div>
