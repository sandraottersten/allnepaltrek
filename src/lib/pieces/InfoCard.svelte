<script>
	import { urlFor } from '../../sanity/index';
	import PeaksSmall from '$lib/svg/PeaksSmall.svelte';
	import { ChevronDown, ChevronRight } from 'lucide-svelte';

	let { image, title, text, link } = $props();

	const imgMob = urlFor(image).width(800).height(800).url();
	const imgSm = urlFor(image).width(768).height(800).url();
	const imgMd = urlFor(image).width(600).url();
	const imgLg = urlFor(image).width(600).url();
	const imgXl = urlFor(image).width(1500).url();

	let openImageText = $state(false);
</script>

<div class="relative hidden w-full overflow-hidden rounded-3xl md:block">
	<img
		src={imgMob}
		srcset={`${imgMob} 576w, ${imgSm} 768w, ${imgMd} 600w, ${imgLg} 600w, ${imgXl} 800w`}
		alt={image.attribution}
		class="size-full object-cover"
	/>
	<div
		class="absolute right-0 top-0 flex h-full w-1/3 flex-col justify-end gap-5 bg-dark70 p-8 text-light"
	>
		<h3>Everest base camp</h3>
		<p>
			To enjoy the view of the higest mountain on earth is on many people's bucket list. The most
			popular way to do it is to walk the classic trail to the legendary Everest base camp, a
			journey of 12 days. There are also easier alternatives as well as more challenging ones. All
			of them takes you through the Khumbu region with its snow-capped peaks and vibrant Sherpa
			culture, reaching iconic landmarks like Namche Bazaar and Tengboche Monastery. Trekking to
			Base Camp is a rewarding challenge that tests your limits and creates memories for life.
		</p>
		<span class="group flex items-center gap-2">
			<PeaksSmall size="size-[24px] min-w-[24px]" />
			<a href="/treks" class="group-hover:text-orange">Go to the treks</a>
		</span>
	</div>
</div>

<div class="relative w-full overflow-hidden rounded-3xl md:hidden">
	<img
		src={imgMob}
		srcset={`${imgMob} 576w, ${imgSm} 768w`}
		alt={image.attribution}
		class="size-full object-cover"
	/>
	<div class="flex h-full flex-col justify-end gap-5 bg-dark80 px-6 py-4 text-light">
		<button
			class="flex items-center justify-between"
			onclick={() => (openImageText = !openImageText)}
		>
			<h3>Everest base camp</h3>
			<ChevronDown color="#EE7430" size={28} />
		</button>
		<div class={openImageText ? 'visible' : 'hidden'}>
			<p>
				To enjoy the view of the higest mountain on earth is on many people's bucket list. The most
				popular way to do it is to walk the classic trail to the legendary Everest base camp, a
				journey of 12 days. There are also easier alternatives as well as more challenging ones. All
				of them takes you through the Khumbu region with its snow-capped peaks and vibrant Sherpa
				culture, reaching iconic landmarks like Namche Bazaar and Tengboche Monastery. Trekking to
				Base Camp is a rewarding challenge that tests your limits and creates memories for life.
			</p>
			<span class="group mt-5 flex items-center gap-2">
				<PeaksSmall size="size-[24px] min-w-[24px]" />
				<a href="/treks" class="group-hover:text-orange">Go to the treks</a>
			</span>
		</div>
	</div>
</div>
