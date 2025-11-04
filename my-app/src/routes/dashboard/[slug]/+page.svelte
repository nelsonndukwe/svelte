<script lang="ts">
	import Chart from '../../../components/Chart.svelte';
	import Header from '../../../components/Header.svelte';
	import { overviewData } from '../../../database/index.js';

	import type { PageProps } from './$types.js';

	let { data }: PageProps = $props();

	// const currentUser = getCurrentUser();
</script>

<div class="space-y-4 px-2">
	<Header
		title={`Nelosn`}
		content="Welcome to your Dashboard Overview. Here you can access all the key metrics and insights to effectively manage your users.

 "
	/>

	<h1>Hello World</h1>
</div>
