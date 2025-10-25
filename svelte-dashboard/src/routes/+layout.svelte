<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import { authUser } from '../stores/auth.store.js';
	import { validUsers } from '../stores/user.store.js';
	import { goto } from '$app/navigation';

	let { children } = $props();
</script>

{@render children()}

<style lang="postcss">
	@reference "tailwindcss";
</style>
