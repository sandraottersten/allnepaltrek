<script>
	import { urlFor } from '../../sanity/index';
	let { data } = $props();
</script>

<section class="relative h-screen w-screen">
	<h1 class="font-poppins absolute bottom-1/3 text-4xl font-bold uppercase">{data.title}</h1>
	<img
		src={urlFor(data.image).width(2000).url()}
		alt={data.image.attribution}
		class="size-full object-cover"
	/>
</section>
