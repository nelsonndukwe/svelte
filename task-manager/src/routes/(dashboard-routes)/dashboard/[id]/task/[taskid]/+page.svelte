<script lang="ts">
	import { categoryState, priorityState, statusState } from '$lib/helpers';
	import { format } from 'date-fns';
	import type { Task } from '../../../../../../database';
	import type { PageProps } from './$types';
	import { Separator } from 'bits-ui';

	let { data }: PageProps = $props();

	const task = data.task as unknown as Task;
</script>

<div class="p-4 w-full h-full dark:text-white">
	<div class="flex items-center justify-between space-y-3">
		<h1 class="text-black dark:text-white text-lg md:text-2xl font-semibold">{task?.title}</h1>

		<p class="text-black dark:text-white text-base">
			<span class="text-black dark:text-white font-medium">Due:{' '}</span>{format(
				task.dueDate,
				'do-MMM-yy'
			)}
		</p>
	</div>

	<p class="text-sm my-3">{task.description}</p>

	<div class="flex flex-col gap-y-2 items-start text-xs  my-3">
		{#if task.status}
			<p class=""><span>Status: {' '}</span> {statusState[task.status]}</p>
		{/if}

		{#if task.priority}
			<p class=""><span>Priority: {' '}</span>{priorityState[task.priority]}</p>
		{/if}
		{#if task.category}
			<p class=""><span>Category: {' '}</span>{categoryState[task.category]}</p>
		{/if}
	</div>

	<div class="">
		<div class="text-sm">Task note and progress note</div>
        <Separator.Root class="my-2 block h-px bg-dark-10" />

		<ul class="flex flex-col gap-y-2 ">
			{#each task.notes as note (note.id)}
				<li class="text-sm">{note.note}</li>
			{/each}
		</ul>
	</div>
</div>
