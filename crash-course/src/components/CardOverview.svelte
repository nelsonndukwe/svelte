<script>
	import { DollarSign, Hash } from 'lucide-svelte';

	export let category;
	export let amount;
	export let percentageChange;
	export let isRevenue = false;
</script>

<div class="bg-accent dark:bg-gray-900 rounded-[14px] p-3">
	<div class=" rounded-md bg-white p-2 dark:bg-gray-900">
		<div class="flex flex-row items-center gap-x-2 py-1">
			<div class=" flex size-5 items-center justify-center rounded-md border bg-gray-200">
				{#if isRevenue}
					<DollarSign class="text-foreground dark:text-background h-4 w-4" />
				{:else}
					<Hash class="text-foreground dark:text-background h-4 w-4" />
				{/if}
			</div>

			<div class="text-foreground dark:text-accent text-sm font-medium">{category}</div>
		</div>

		<div class="w-full rounded-xl bg-white p-1 py-2 shadow-md dark:bg-gray-900">
			<div class="w-full text-base font-bold text-gray-400">
				{#if isRevenue}
					NGN {Number(amount).toLocaleString()}
				{:else}
					{Number(amount).toLocaleString()}
				{/if}
			</div>
			<div class="flex items-center gap-x-1 w-full">
				<div class={`flex items-center rounded-md bg-green-100 dark:bg-green-300 p-1 text-xs text-green-800`}>
					{percentageChange}%
				</div>
				<p class="text-xs font-medium text-gray-400">
					{' '}
					vs last month
				</p>
			</div>
		</div>
	</div>
</div>
