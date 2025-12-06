<!-- BookingForm.svelte -->
<script>
	import Button from './Button.svelte';

	const { tours = [], treks = [] } = $props();

	let formData = $state({
		trek: '',
		tour: '',
		date: '',
		numberOfPeople: '',
		name: '',
		country: '',
		email: '',
		message: ''
	});

	const handleSubmit = async (event) => {
		event.preventDefault();
		// Here you would typically send the form data to your backend
		console.log('Booking form submitted:', formData);
		// Reset form after submission
		formData = {
			trek: '',
			tour: '',
			date: '',
			numberOfPeople: '',
			name: '',
			country: '',
			email: '',
			message: ''
		};
		alert('Thank you for your booking request! We will contact you soon.');
	};
</script>

<form onsubmit={handleSubmit} class="w-full space-y-6">
	<!-- Trek Selection -->
	<div>
		<label for="trek" class="text-gray-700 mb-1 block text-sm font-medium">
			Select Trek (Optional)
		</label>
		<select
			id="trek"
			bind:value={formData.trek}
			class="border-gray-300 h-11 w-full rounded-md border border-dark30 bg-light px-4 py-2 focus:border-blue focus:ring-2 focus:ring-blue"
		>
			<option value="">-- Select a trek --</option>
			{#each treks as trek}
				<option value={trek.value}>{trek.label}</option>
			{/each}
		</select>
	</div>

	<!-- Tour Selection -->
	<div>
		<label for="tour" class="text-gray-700 mb-1 block text-sm font-medium">
			Select Tour (Optional)
		</label>
		<select
			id="tour"
			bind:value={formData.tour}
			class="border-gray-300 h-11 w-full rounded-md border border-dark30 bg-light px-4 py-2 focus:border-blue focus:ring-2 focus:ring-blue"
		>
			<option value="">-- Select a tour --</option>
			{#each tours as tour}
				<option value={tour.value}>{tour.label}</option>
			{/each}
		</select>
	</div>

	<!-- Date -->
	<div class="flex gap-4 md:flex-row">
		<div class="w-1/2">
			<label for="date" class="text-gray-700 mb-1 block text-sm font-medium">
				Preferred Date <span class="text-red-500">*</span>
			</label>
			<input
				type="date"
				id="date"
				bind:value={formData.date}
				required
				min={new Date().toISOString().split('T')[0]}
				class="border-gray-300 h-11 w-full rounded-md border border-dark30 bg-light px-4 py-2 focus:border-blue focus:ring-2 focus:ring-blue"
			/>
		</div>

		<!-- Number of People -->
		<div class="w-1/2">
			<label for="numberOfPeople" class="text-gray-700 mb-1 block text-sm font-medium">
				Number of People <span class="text-red-500">*</span>
			</label>
			<input
				type="number"
				id="numberOfPeople"
				bind:value={formData.numberOfPeople}
				required
				min="1"
				max="20"
				class="border-gray-300 h-11 w-full rounded-md border border-dark30 bg-light px-4 py-2 focus:border-blue focus:ring-2 focus:ring-blue"
				placeholder="Enter number of people"
			/>
		</div>
	</div>
	<!-- Name -->
	<div>
		<label for="name" class="text-gray-700 mb-1 block text-sm font-medium">
			Full Name <span class="text-red-500">*</span>
		</label>
		<input
			type="text"
			id="name"
			bind:value={formData.name}
			required
			class="border-gray-300 h-11 w-full rounded-md border border-dark30 bg-light px-4 py-2 focus:border-blue focus:ring-2 focus:ring-blue"
			placeholder="Your full name"
		/>
	</div>

	<!-- Country -->
	<div>
		<label for="country" class="text-gray-700 mb-1 block text-sm font-medium">
			Country <span class="text-red-500">*</span>
		</label>
		<input
			type="text"
			id="country"
			bind:value={formData.country}
			required
			class="border-gray-300 h-11 w-full rounded-md border border-dark30 bg-light px-4 py-2 focus:border-blue focus:ring-2 focus:ring-blue"
			placeholder="Your country"
		/>
	</div>

	<!-- Email -->
	<div>
		<label for="email" class="text-gray-700 mb-1 block text-sm font-medium">
			Email Address <span class="text-red-500">*</span>
		</label>
		<input
			type="email"
			id="email"
			bind:value={formData.email}
			required
			class="border-gray-300 h-11 w-full rounded-md border border-dark30 bg-light px-4 py-2 focus:border-blue focus:ring-2 focus:ring-blue"
			placeholder="your.email@example.com"
		/>
	</div>

	<!-- Message -->
	<div>
		<label for="message" class="text-gray-700 mb-1 block text-sm font-medium">
			Additional Message (Optional)
		</label>
		<textarea
			id="message"
			bind:value={formData.message}
			rows="6"
			class="border-gray-300 h-11 w-full rounded-md border border-dark30 bg-light px-4 py-2 focus:border-blue focus:ring-2 focus:ring-blue"
			placeholder="Any special requests or questions?"
		></textarea>
	</div>

	<div class="pt-4">
		<Button label="Submit booking request" type="submit" />
	</div>
</form>
