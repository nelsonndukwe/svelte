<script lang="ts">
	import Header from '../../../../components/Header.svelte';
	import MatrixQuadrant from '../../../../components/MatrixQuadrant.svelte';
	import { sortedTasks } from '../../../../stores/task.store';
	import type { PageProps } from './$types';
	import { getCurrentUser } from '../../../../stores/auth.store';
	import { derived, writable } from 'svelte/store';
	import { Search } from 'lucide-svelte';
	import ManageTask from '../../../../components/ManageTask.svelte';
	import { searchQuery, useDebounced } from '../../../../stores/search.store';

	const user = getCurrentUser();
	let { data }: PageProps = $props();


</script>

<div class="p-4 w-full h-full">
	<Header title={`Welcome Back, ${user?.name}`} content="Organize, Plan and Execute" />

	<div class="mb-4 flex justify-between w-full items-center rounded-md p-1">
		<h3 class="text-sm font-semibold text-gray-800 md:text-lg dark:text-accent">All Tasks</h3>

		<div class="relative items-center my-2">
			<input
				type="text"
				placeholder="Search Tasks..."
				value={$searchQuery}
				oninput={(e) => searchQuery.set((e.target as HTMLInputElement).value)}
				class="rounded-2xl border dark:bg-gray-900 dark:text-white border-gray-300 bg-gray-50 py-2 pr-3 pl-8 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 md:w-96"
			/>
			<Search class="absolute top-2.5 left-2 size-4 text-gray-400" />
		</div>

		<ManageTask label="Add Task" />
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-6 md:h-full mt-5">
		<div class="flex flex-col md:h-full">
			<MatrixQuadrant title="Urgent & Important" data={$sortedTasks.urgentImportant} />
		</div>

		<div class="flex flex-col md:h-full">
			<MatrixQuadrant title="Not Urgent & Important" data={$sortedTasks.notUrgentImportant} />
		</div>

		<div class="flex flex-col md:h-full">
			<MatrixQuadrant title="Urgent & Not Important" data={$sortedTasks.urgentNotImportant} />
		</div>

		<div class="flex flex-col md:h-full">
			<MatrixQuadrant
				title="Not Urgent & Not Important"
				data={$sortedTasks.notUrgentNotImportant}
			/>
		</div>
	</div>
</div>
