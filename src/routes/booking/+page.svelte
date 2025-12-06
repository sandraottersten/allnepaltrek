<!-- Booking page -->
<script>
	import BookingForm from '$lib/pieces/BookingForm.svelte';
	import Divider from '$lib/pieces/Divider.svelte';

	let { data } = $props();
	const { tours = [], treks = [] } = data;
</script>

<svelte:head>
	<title>Book Your Adventure | All Nepal Trek</title>
	<meta
		name="description"
		content="Book your trekking or tour adventure with All Nepal Trek. Secure your spot for an unforgettable journey through Nepal."
	/>
</svelte:head>

<section class="x-margin y-margin relative z-20 mt-24 flex flex-col bg-light text-dark">
	<h1 class="h2 mb-8">Booking</h1>
	<div class="flex flex-col gap-12 md:flex-row md:gap-20">
		<div class="flex-1 border-r-0 border-dark30 md:border-r md:pr-24">
			<BookingForm {tours} {treks} />
		</div>

		<div class="flex-1 space-y-8">
			<div>
				<h2 class="h3 mb-6">How to book</h2>
				<div class="ml-4 space-y-4">
					<ol class="list-outside list-decimal space-y-4">
						<li>Contact us with your inquiry, either by filling out this form or by email.</li>
						<li>We will reply and confirm all the details with you.</li>
						<li>You will receive an email with the order details and the total sum.</li>
						<li>Once you pay the 10% deposit, your trip is officially booked.</li>
						<li>
							The remaining balance will be paid by bank transfer or in cash upon arrival in Nepal.
						</li>
					</ol>
				</div>
			</div>

			<Divider />

			<div class="space-y-4">
				<h3 class="mb-6">Cancellation Policy</h3>
				<ul class="space-y-2">
					<li>Cancellations made 30+ days before departure: full refund minus processing fees</li>
					<li>Cancellations made 14-30 days before departure: 50% refund</li>
					<li>Cancellations made less than 14 days before departure: no refund</li>
				</ul>
			</div>
		</div>
	</div>
</section>
