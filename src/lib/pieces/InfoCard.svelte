<script>
	import { urlFor } from '../../sanity/index';
	import { ChevronDown } from 'lucide-svelte';
	import { PortableText } from '@eirikk/portabletext-2-svelte-5';
	import TextLink from './TextLink.svelte';

	let { infoCard } = $props();

	const imgMob = urlFor(infoCard.image).width(800).height(800).url();
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

<div class="x-margin y-margin hidden md:block">
	<div class="relative aspect-[16/10] w-full overflow-hidden rounded-3xl">
		<img
			src={imgMob}
			srcset={`${imgMob} 576w, ${imgSm} 768w, ${imgMd} 600w, ${imgLg} 600w, ${imgXl} 800w`}
			alt={infoCard.image.attribution}
			class="size-full object-cover"
		/>
		<div
			class="absolute right-0 top-0 flex h-full w-1/3 flex-col justify-end gap-5 bg-dark80 p-8 text-light backdrop-blur"
		>
			<h3>{infoCard.title}</h3>
			<PortableText value={infoCard.text} />
			<TextLink link={getLink()} text={infoCard.link.linkText} />
		</div>
	</div>
</div>

<div class="x-margin y-margin md:hidden">
	<div class="relative w-full overflow-hidden rounded-3xl">
		<img
			src={imgMob}
			srcset={`${imgMob} 576w, ${imgSm} 768w`}
			alt={infoCard.image.attribution}
			class="size-full object-cover"
		/>
		<div class="flex h-full flex-col justify-end gap-5 bg-dark80 p-4 px-6 text-light">
			<button
				class="flex items-center justify-between"
				onclick={() => (openImageText = !openImageText)}
			>
				<h3>{infoCard.title}</h3>
				<ChevronDown color="#EE7430" size={28} />
			</button>
			<div class={openImageText ? 'visible' : 'hidden'}>
				<PortableText value={infoCard.text} />
				<TextLink link={getLink()} text={infoCard.link.linkText} />
			</div>
		</div>
	</div>
</div>
