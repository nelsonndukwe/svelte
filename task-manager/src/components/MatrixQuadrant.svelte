<script lang="ts">
	import { Checkbox, Label } from 'bits-ui';
	import type { Task } from '../database';
	import { Check, Minus } from 'lucide-svelte';
	import { format } from 'date-fns';
	import { toggleComplete } from '../stores/task.store';
	import { categoryState, priorityState, statusState } from '$lib/helpers';
	import TaskItem from './TaskItem.svelte';

	let {
		data,
		title
	}: {
		data: Task[];
		title: string;
	} = $props();
</script>

<div class=" rounded-[14px] p-3 w-full h-full bg-gray-200 shadow-2xl">
	<div class="my-4">{title}</div>

	<div class=" rounded-2xl p-2">
		<div class="flex flex-col gap-y-3">
			{#each data as data (data.id)}
				<div
					class="flex items-center justify-between rounded-md bg-white p-2 hover:scale-95 transition-transform duration-300 ease-in-out"
				>
					<div class="flex gap-y-2 items-center space-x-3">
						<Checkbox.Root
							checked={data.isComplete}
							onCheckedChange={(state) => toggleComplete(data.id)}
							id={data.id}
							aria-labelledby="terms-label"
							class="border-muted  bg-foreground data-[state=unchecked]:border-border-input data-[state=unchecked]:bg-background data-[state=unchecked]:hover:border-dark-40 peer inline-flex size-[18px] items-center justify-center rounded-md border transition-all duration-150 ease-in-out active:scale-[0.98]"
							name={data.title}
							indeterminate={false}
						>
							{#snippet children({ checked, indeterminate })}
								<div class="text-background inline-flex items-center justify-center">
									{#if indeterminate}
										<Minus class="size-[15px]" />
									{:else if checked}
										<Check class="size-[15px]" />
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
								<p class="">{statusState[data.status]}</p>
							{/if}

							{#if data.priority}
								<p class="">{priorityState[data.priority]}</p>
							{/if}
							{#if data.category}
								<p class="">{categoryState[data.category]}</p>
							{/if}
						</div>

						<p class="text-black text-xs">
							<span class="text-xs text-black font-medium">Due:{' '}</span>{format(
								data.dueDate,
								'do-MMM-yy'
							)}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
