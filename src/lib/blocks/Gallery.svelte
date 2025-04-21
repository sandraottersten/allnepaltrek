<script>
	import { urlFor } from '../../sanity/index';
	import Portal from '$lib/pieces/Portal.svelte';
	import GalleryImage from '$lib/pieces/GalleryImage.svelte';
	import { ChevronLeft, ChevronRight, X } from 'lucide-svelte';

	const { gallery } = $props();
	const { images } = gallery;
	let selectedImage = $state(-1);
	let showMobileGallery = $state(false);
</script>

{#if selectedImage >= 0}
	<Portal>
		<div
			class="fixed left-0 top-0 z-50 flex h-screen w-screen justify-center bg-dark80 p-12 backdrop-blur"
		>
			<div class="relative flex w-full justify-center">
				{#if selectedImage > 0}
					<button onclick={() => (selectedImage = selectedImage - 1)} class="">
						<ChevronLeft color="#FFFFFF" size={34} />
					</button>
				{/if}
				<img
					src={urlFor(images[selectedImage]).height(1800).url()}
					alt={images[selectedImage].attribution}
					class="h-400px rounded"
				/>
				{#if selectedImage < images.length - 1}
					<button onclick={() => (selectedImage = selectedImage + 1)} class="">
						<ChevronRight color="#FFFFFF" size={34} />
					</button>
				{/if}
				<button onclick={() => (selectedImage = -1)} class="absolute right-4 top-0">
					<X color="#FFFFFF" size={34} />
				</button>
			</div>
		</div>
	</Portal>
{/if}

{#if showMobileGallery}
	<Portal>
		<div class="fixed left-0 top-0 z-50 flex h-screen w-screen bg-dark80 backdrop-blur">
			<div class="relative flex flex-col gap-2 overflow-y-auto p-3">
				{#each images as image}
					<img
						src={urlFor(image).width(600).url()}
						alt={image.attribution}
						class="w-full rounded"
					/>
				{/each}
				<button
					onclick={() => (showMobileGallery = false)}
					class="fixed bottom-3 right-3 z-20 rounded-full bg-dark80 p-3"
				>
					<X color="#FFFFFF" size={34} />
				</button>
			</div>
		</div>
	</Portal>
{/if}

<div
	style:--image-mob={`url(${urlFor(images[0]).width(700).height(700).url()})`}
	class="flex h-80 items-center justify-center overflow-hidden rounded-lg bg-[image:var(--image-mob)] bg-cover bg-center bg-no-repeat md:hidden"
>
	<button
		class="flex rounded-full bg-dark80 px-6 py-3 text-light backdrop-blur"
		onclick={() => (showMobileGallery = true)}>View gallery</button
	>
</div>

{#if images.length === 3}
	<section
		id="gallery"
		class="relative mx-auto hidden flex-col gap-2 overflow-hidden rounded-lg md:flex"
	>
		<!-- row 1 -->
		<div class="flex h-[360px] flex-col gap-2 md:flex-row">
			<div class="flex-[2_2_0%] flex-row gap-2 md:flex">
				<GalleryImage
					image={images[0]}
					size="h-full w-full"
					flex
					onclick={() => (selectedImage = 0)}
				/>
			</div>
			<div class="flex flex-1">
				<GalleryImage image={images[1]} size="h-full" flex onclick={() => (selectedImage = 1)} />
			</div>
		</div>
		<!-- row 2 -->
		<div class="flex h-[360px] flex-col gap-2 md:flex-row">
			<div class="flex-1 flex-row gap-2 md:flex">
				<GalleryImage
					image={images[2]}
					size="h-full w-full"
					flex
					onclick={() => (selectedImage = 2)}
				/>
			</div>
		</div>
	</section>
{/if}

{#if images.length === 4}
	<section
		id="gallery"
		class="relative mx-auto hidden flex-col gap-2 overflow-hidden rounded-lg md:flex"
	>
		<!-- row 1 -->
		<div class="flex h-[360px] flex-col gap-2 md:flex-row">
			<div class="flex-[2_2_0%] flex-row gap-2 md:flex">
				<GalleryImage
					image={images[5]}
					size="h-full w-full"
					flex
					onclick={() => (selectedImage = 5)}
				/>
			</div>
			<div class="flex flex-1">
				<GalleryImage image={images[1]} size="h-full" flex onclick={() => (selectedImage = 1)} />
			</div>
		</div>
		<!-- row 2 -->
		<div class="flex h-[360px] flex-col gap-2 md:flex-row">
			<div class="flex flex-1">
				<GalleryImage image={images[2]} size="h-full" flex onclick={() => (selectedImage = 2)} />
			</div>
			<div class="flex-[2_2_0%] flex-row gap-2 md:flex">
				<GalleryImage
					image={images[3]}
					size="h-full w-full"
					flex
					onclick={() => (selectedImage = 3)}
				/>
			</div>
		</div>
	</section>
{/if}

{#if images.length === 5}
	<section
		id="gallery"
		class="relative mx-auto hidden flex-col gap-2 overflow-hidden rounded-lg md:flex"
	>
		<!-- row 1 -->
		<div class="flex flex-col gap-2 md:flex-row">
			<div class="flex flex-[2_2_0%] flex-col gap-2">
				<GalleryImage
					image={images[0]}
					size="h-[300px] w-full"
					onclick={() => (selectedImage = 0)}
				/>
				<div class="flex-1 flex-row gap-2 md:flex">
					<GalleryImage
						image={images[1]}
						size="h-[160px] w-full"
						flex
						onclick={() => (selectedImage = 1)}
					/>
					<GalleryImage
						image={images[2]}
						size="h-[160px] w-full"
						flex
						onclick={() => (selectedImage = 2)}
					/>
				</div>
			</div>
			<div class="flex flex-1 flex-col gap-2">
				<div class="flex-1 flex-col gap-2 md:flex">
					<GalleryImage image={images[3]} size="h-full" flex onclick={() => (selectedImage = 3)} />
				</div>
			</div>
		</div>

		<!-- row 2 -->
		<div class="flex h-[360px]">
			<div class="flex flex-1 flex-row">
				<GalleryImage
					image={images[4]}
					size="h-full w-full"
					flex
					onclick={() => (selectedImage = 4)}
				/>
			</div>
		</div>
	</section>
{/if}

{#if images.length === 6}
	<section
		id="gallery"
		class="relative mx-auto hidden flex-col gap-2 overflow-hidden rounded-lg md:flex"
	>
		<!-- row 1 -->
		<div class="flex flex-col gap-2 md:flex-row">
			<div class="flex flex-[2_2_0%] flex-col gap-2">
				<GalleryImage
					image={images[0]}
					size="h-[300px] w-full"
					onclick={() => (selectedImage = 0)}
				/>
				<div class="flex-1 flex-row gap-2 md:flex">
					<GalleryImage
						image={images[1]}
						size="h-[160px] w-full"
						flex
						onclick={() => (selectedImage = 1)}
					/>
					<GalleryImage
						image={images[2]}
						size="h-[160px] w-full"
						flex
						onclick={() => (selectedImage = 2)}
					/>
				</div>
			</div>
			<div class="flex flex-1 flex-col gap-2">
				<div class="flex-1 flex-col gap-2 md:flex">
					<GalleryImage image={images[3]} size="h-full" flex onclick={() => (selectedImage = 3)} />
				</div>
			</div>
		</div>

		<!-- row 2 -->
		<div class="flex h-[360px] flex-col gap-2 md:flex-row">
			<div class="flex flex-1">
				<GalleryImage image={images[4]} size="h-full" flex onclick={() => (selectedImage = 4)} />
			</div>
			<div class="flex-[2_2_0%] flex-row gap-2 md:flex">
				<GalleryImage
					image={images[5]}
					size="h-full w-full"
					flex
					onclick={() => (selectedImage = 5)}
				/>
			</div>
		</div>
	</section>
{/if}

{#if images.length === 7}
	<section
		id="gallery"
		class="relative mx-auto hidden flex-col gap-2 overflow-hidden rounded-lg md:flex"
	>
		<!-- row 1 -->
		<div class="flex flex-col gap-2 md:flex-row">
			<div class="flex flex-[2_2_0%] flex-col gap-2">
				<!-- img_01 -->
				<GalleryImage
					image={images[0]}
					size="h-[300px] w-full"
					onclick={() => (selectedImage = 0)}
				/>
				<div class="flex-1 flex-row gap-2 md:flex">
					<GalleryImage
						image={images[1]}
						size="h-[160px] w-full"
						flex
						onclick={() => (selectedImage = 1)}
					/>
					<GalleryImage
						image={images[2]}
						size="h-[160px] w-full"
						flex
						onclick={() => (selectedImage = 2)}
					/>
				</div>
			</div>
			<div class="flex flex-1 flex-col gap-2">
				<div class="flex-1 flex-col gap-2 md:flex">
					<GalleryImage image={images[3]} size="h-full" flex onclick={() => (selectedImage = 3)} />
				</div>
			</div>
		</div>

		<!-- row 2 -->
		<div class="flex h-[360px] gap-2">
			<GalleryImage image={images[4]} size="h-full" flex onclick={() => (selectedImage = 4)} />
			<GalleryImage image={images[5]} size="h-full" flex onclick={() => (selectedImage = 5)} />
			<GalleryImage image={images[6]} size="h-full" flex onclick={() => (selectedImage = 6)} />
		</div>
	</section>
{/if}

{#if images.length === 8}
	<section
		id="gallery"
		class="relative mx-auto hidden flex-col gap-2 overflow-hidden rounded-lg md:flex"
	>
		<!-- row 1 -->
		<div class="flex flex-col gap-2 md:flex-row">
			<div class="flex flex-[2_2_0%] flex-col gap-2">
				<GalleryImage
					image={images[0]}
					size="h-[300px] w-full"
					onclick={() => (selectedImage = 0)}
				/>
				<div class="flex-1 flex-row gap-2 md:flex">
					<GalleryImage
						image={images[1]}
						size="h-[160px] w-full"
						flex
						onclick={() => (selectedImage = 1)}
					/>
					<GalleryImage
						image={images[2]}
						size="h-[160px] w-full"
						flex
						onclick={() => (selectedImage = 2)}
					/>
				</div>
			</div>
			<div class="flex flex-1 flex-col gap-2">
				<div class="flex-1 flex-col gap-2 md:flex">
					<GalleryImage image={images[3]} size="h-full" flex onclick={() => (selectedImage = 3)} />
				</div>
			</div>
		</div>

		<!-- row 2 -->
		<div class="flex h-[360px] gap-2">
			<GalleryImage image={images[4]} size="h-full" flex onclick={() => (selectedImage = 4)} />
			<div class="flex flex-1 flex-col gap-2">
				<GalleryImage
					image={images[5]}
					size="w-full h-full"
					flex
					onclick={() => (selectedImage = 5)}
				/>
				<GalleryImage
					image={images[6]}
					size="w-full h-full"
					flex
					onclick={() => (selectedImage = 6)}
				/>
			</div>
			<GalleryImage image={images[7]} size="h-full" flex onclick={() => (selectedImage = 7)} />
		</div>
	</section>
{/if}
