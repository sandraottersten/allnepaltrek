<script>
	import { urlFor } from '../../sanity/index';

	const { size, image, onclick, flex } = $props();
</script>

<button class="flex {flex ? 'flex-1' : ''} overflow-hidden" {onclick}>
	<img
		src={urlFor(image).width(800).url()}
		alt={image.attribution}
		class="{size} transform object-cover duration-150 hover:scale-105"
	/>
</button>
