<script lang="ts">
	import { getGreeting } from '$lib/helpers.js';
	import CardOverview from '../../../components/CardOverview.svelte';
	import Header from '../../../components/Header.svelte';
	import UserTable from '../../../components/UserTable.svelte';
	import { overviewData } from '../../../database/index.js';
	import { getCurrentUser } from '../../../stores/auth.store.js';
	import type { PageProps } from './$types.js';
	const greeting = getGreeting();
	let { data }: PageProps = $props();

	const currentUser = getCurrentUser();
</script>

<div class="space-y-4 px-2">
	<Header
		title={`${greeting} ${currentUser?.name}`}
		content="Welcome to your Dashboard Overview. Here you can access all the key metrics and insights to effectively manage your users.

 "
	/>
	<div class=" grid grid-cols-1 gap-4 md:grid-cols-4">
		{#each overviewData as metric (metric.category)}
			<CardOverview
				category={metric.category}
				amount={metric.amount}
				percentageChange={metric.percentageChange}
				isRevenue={metric.isRevenue}
			/>
		{/each}
	</div>

	<div class="h-10 md:h-[350px]">
		<div class="bg-accent h-full w-full rounded-[14px]"></div>
	</div>

	<div class="mb-4 h-full">
		<div class="bg-accent h-full w-full rounded-[14px] shadow-xl">
			<UserTable />
		</div>
	</div>
</div>
