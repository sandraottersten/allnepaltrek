<script>
	import { urlFor } from '../../sanity/index';
	import { ChevronDown } from '@lucide/svelte';
	import { PortableText } from '@eirikk/portabletext-2-svelte-5';
	import TextLink from './TextLink.svelte';
	import { slide, fade } from 'svelte/transition';

	let { infoCard } = $props();

	const imgMob = urlFor(infoCard.image).width(800).height(1000).url();
	const imgSm = urlFor(infoCard.image).width(768).height(800).url();
	const imgMd = urlFor(infoCard.image).width(600).url();
	const imgLg = urlFor(infoCard.image).width(600).url();
	const imgXl = urlFor(infoCard.image).width(1500).url();

	let openImageText = $state(false);

	const getLink = () => {
		if (infoCard.link.page) {
			return '/' + infoCard.link.page.slug;
		} else return '/';
	};
</script>

<div class="x-margin y-margin hidden gap-16 md:flex">
	<div class="relative aspect-[16/8] w-2/3 overflow-hidden rounded-lg">
		<img
			src={imgMob}
			srcset={`${imgMob} 576w, ${imgSm} 768w, ${imgMd} 600w, ${imgLg} 600w, ${imgXl} 800w`}
			alt={infoCard.image.attribution}
			class="size-full object-cover saturate-[.80] filter"
		/>
	</div>
	<div class="flex h-full w-1/3 flex-col justify-end gap-5 bg-light80 py-8 text-dark backdrop-blur">
		<h3>{infoCard.title}</h3>
		<PortableText value={infoCard.text} />
		<TextLink link={getLink()} text={infoCard.link.linkText} />
	</div>
</div>

<div class="x-margin y-margin md:hidden">
	<div class="relative w-full">
		<div class="relative">
			<img
				src={imgMob}
				srcset={`${imgMob} 576w, ${imgSm} 768w`}
				alt={infoCard.image.attribution}
				class="size-full rounded-lg object-cover saturate-[.8] filter"
			/>
			<button
				class="absolute bottom-0 flex w-full items-center justify-between rounded-b-lg bg-light90 p-4 text-dark backdrop-blur"
				onclick={() => (openImageText = !openImageText)}
			>
				<span class="text-lg font-medium">{infoCard.title}</span>
				<ChevronDown color="#027B83" size={28} />
			</button>
		</div>
		{#if openImageText}
			<div class="flex flex-col gap-4 px-2 py-4" transition:slide>
				<PortableText value={infoCard.text} />
				<TextLink link={getLink()} text={infoCard.link.linkText} />
			</div>
		{/if}
	</div>
</div>
