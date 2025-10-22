<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import { authUser } from '../stores/auth.store.js';
	import { validUsers } from '../stores/user.store.js';
	import { goto } from '$app/navigation';

	let { children } = $props();

	onMount(() => {
		const currentUser = $authUser;
		if (!currentUser) {
			console.warn('No authenticated user — redirecting to login');
			goto('/');
			return;
		}

		const matchedUser = $validUsers.find((user) => String(user.id) === currentUser);
		if (matchedUser) {
			goto(`/dashboard/${matchedUser.id}`);
		} else {
			console.warn('User not found in validUsers store');
			goto('/');
		}
	});
</script>

{@render children()}

<style lang="postcss">
	@reference "tailwindcss";
</style>
