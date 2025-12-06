<!-- Contact page -->
<script>
	import ContactForm from '$lib/pieces/ContactForm.svelte';
	import Divider from '$lib/pieces/Divider.svelte';
	import { urlFor } from '../../sanity/index';
	import { PortableText } from '@eirikk/portabletext-2-svelte-5';
	import WhatsApp from '$lib/svg/WhatsApp.svelte';
	import { Mail } from '@lucide/svelte';

	let { data } = $props();
	const { general, formSection, form } = data;

	const imgMob = urlFor(formSection.image).width(800).height(1000).url();
	const imgSm = urlFor(formSection.image).width(768).height(800).url();
	const imgMd = urlFor(formSection.image).width(600).url();
	const imgLg = urlFor(formSection.image).width(600).url();
	const imgXl = urlFor(formSection.image).width(1500).url();
</script>

<svelte:head>
	<title>Contact Us | All Nepal Trek</title>
	<meta
		name="description"
		content="Get in touch with All Nepal Trek for your trekking and tour inquiries. We're here to help plan your perfect Nepal adventure."
	/>
</svelte:head>

<section class="x-margin y-margin relative z-20 mt-24 flex flex-col bg-light text-dark md:gap-12">
	<h1 class="h2">We are here to help</h1>
	<div class="portable max-w-[50rem] pb-8">
		<PortableText value={general.text} />
	</div>
	<Divider />

	<div class="mx-auto grid gap-8 py-8 md:grid-cols-2 md:gap-40">
		<div class="space-y-8">
			<div>
				<div class="portable">
					<PortableText value={formSection.text} />
				</div>
			</div>

			<div class="flex flex-col gap-4 md:flex-row md:gap-12">
				<div class="flex items-center gap-2">
					<Mail size="28" color="#027B83" />
					<a
						href={`mailto:${formSection.email}`}
						class="text-orange-500 hover:text-orange-600 transition-colors duration-200"
					>
						{formSection.email}
					</a>
				</div>

				<div class="flex items-center gap-2">
					<WhatsApp size="size-[30px]" color="#027B83" />
					<a
						href={`https://wa.me/${formSection.phone}`}
						target="_blank"
						rel="noopener noreferrer"
						class="text-green-600 hover:text-green-700 duration-20 inline-flex items-center space-x-2 transition-colors"
					>
						<span>{formSection.phone}</span>
					</a>
				</div>
			</div>

			<img
				src={imgMob}
				srcset={`${imgMob} 576w, ${imgSm} 768w, ${imgMd} 600w, ${imgLg} 600w, ${imgXl} 800w`}
				alt={formSection.image.attribution}
				class="rounded-lg saturate-[.80] filter"
			/>
		</div>

		<div>
			<h2 class="mb-6">{form.title}</h2>
			<ContactForm />
		</div>
	</div>
</section>
