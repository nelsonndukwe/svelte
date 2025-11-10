<script lang="ts">
	import { Checkbox, Label } from 'bits-ui';
	import type { Task } from '../database';
	import { Check, Minus } from 'lucide-svelte';
	import { format } from 'date-fns';
	import { toggleComplete } from '../stores/task.store';
	import { categoryState, priorityState, statusState } from '$lib/helpers';
	import TaskItem from './TaskItem.svelte';
	import { searchQuery, useDebounced } from '../stores/search.store';
	import { fade, fly, scale } from 'svelte/transition';

	let {
		data,
		title
	}: {
		data: Task[];
		title: string;
	} = $props();
	const debouncedValue = useDebounced(searchQuery, 400);

	const filteredData = $derived(() => {
		const query = $debouncedValue;

		if (!query || query.length < 3) {
			return data;
		}

		return data.filter(
			(item) =>
				item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)
		);
	});

	const calcCompetedPercentage = () => {
		const completedTasks = filteredData().filter((task) => task.isComplete);

		const percentage = (completedTasks.length / filteredData().length) * 100;

		if (isNaN(percentage)) {
			return 0;
		}

		return percentage;
	};
</script>

<div class=" rounded-[14px] p-3 w-full h-full bg-gray-200 dark:bg-gray-800 shadow-2xl">
	<div class="my-4 dark:text-white text-sm flex items-center justify-between">
		<p class="">{title} ({filteredData().length})</p>

		<p class="">{Math.round(calcCompetedPercentage())}% complete</p>
	</div>

	<div
		in:fly={{ y: 20, duration: 500, delay: 50 }}
		out:fade={{ duration: 500 }}
		class="rounded-2xl p-2 relative"
	>
		{#if filteredData().length === 0}
			<div class="text-center min-h-full dark:text-white">No task found</div>
		{:else}
			<div class="flex flex-col gap-y-3">
				{#each filteredData() as data (data.id)}
					<div
						in:fly={{ y: 20, duration: 300, delay: 50 }}
						out:fade={{ duration: 250 }}
						class="flex items-center justify-between rounded-md dark:bg-slate-600 bg-white p-2 hover:scale-95 transition-transform duration-300 ease-in-out"
					>
						<div class="flex gap-y-2 items-center space-x-3">
							<Checkbox.Root
								checked={data.isComplete}
								onCheckedChange={() => toggleComplete(data.id)}
								id={data.id}
								aria-labelledby="terms-label"
								class="border-mute dark:bg-gray-900 bg-foreground data-[state=unchecked]:border-border-input data-[state=unchecked]:bg-background data-[state=unchecked]:hover:border-dark-40 peer inline-flex size-[18px] items-center justify-center rounded-md border transition-all duration-150 ease-in-out active:scale-[0.98]"
								name={data.title}
								indeterminate={false}
							>
								{#snippet children({ checked, indeterminate })}
									<div class="text-background inline-flex items-center justify-center">
										{#if indeterminate}
											<Minus class="size-[15px]" />
										{:else if checked}
											<Check class="size-[15px] dark:text-white" />
										{/if}
									</div>
								{/snippet}
							</Checkbox.Root>

							<Label.Root
								id="terms-label"
								for="terms"
								class="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								<TaskItem label={data.title} title={'Task description'} task={data} />
							</Label.Root>
						</div>

						<div class="flex item-center gap-x-2">
							<div class="flex gap-x-2 items-center text-xs">
								{#if data.status}
									<p >{statusState[data.status]}</p>
								{/if}

								{#if data.priority}
									<p>{priorityState[data.priority]}</p>
								{/if}
								{#if data.category}
									<p>{categoryState[data.category]}</p>
								{/if}
							</div>

							<p class="text-black text-xs">
								<span class="text-xs text-black font-medium">Due: </span>
								{format(data.dueDate, 'do-MMM-yy')}
							</p>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
