<script lang="ts">
	import { getGreeting } from '$lib/helpers.js';
	import Header from '../../../../components/Header.svelte';
	import type { PageProps } from './$types.js';
	const greeting = getGreeting();
	let { data }: PageProps = $props();
</script>

<div class="">
	<Header
		title={greeting}
		content="Welcome to the Real-commerce Store Dashboard Overview. Here you can access all the key metrics and insights to effectively manage your store.

 "
	/>
</div>
