<!-- ContactForm.svelte -->
<script>
	import Button from './Button.svelte';

	let formData = {
		name: '',
		email: '',
		message: ''
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		// Here you would typically send the form data to your backend
		console.log('Form submitted:', formData);
		// Reset form after submission
		formData = {
			name: '',
			email: '',
			message: ''
		};
	};
</script>

<form on:submit={handleSubmit} class="w-full space-y-6">
	<div>
		<label for="name" class="text-gray-700 mb-1 block text-sm font-medium">Name</label>
		<input
			type="text"
			id="name"
			bind:value={formData.name}
			required
			class="border-gray-300 w-full rounded-md border border-dark30 bg-light px-4 py-2 focus:border-blue focus:ring-2 focus:ring-blue"
			placeholder="Your name"
		/>
	</div>

	<div>
		<label for="email" class="text-gray-700 mb-1 block text-sm font-medium">Email</label>
		<input
			type="email"
			id="email"
			bind:value={formData.email}
			required
			class="border-gray-300 w-full rounded-md border border-dark30 bg-light px-4 py-2 focus:border-blue focus:ring-2 focus:ring-blue"
			placeholder="your.email@example.com"
		/>
	</div>

	<div>
		<label for="message" class="text-gray-700 mb-1 block text-sm font-medium">Message</label>
		<textarea
			id="message"
			bind:value={formData.message}
			required
			rows="8"
			class="border-gray-300 w-full rounded-md border border-dark30 bg-light px-4 py-2 focus:border-blue focus:ring-2 focus:ring-blue"
			placeholder="How can we help you?"
		></textarea>
	</div>

	<Button label="Send Message" type="submit" />
</form>
