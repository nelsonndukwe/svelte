<script lang="ts">
	import Header from '../../../../components/Header.svelte';
	import MatrixQuadrant from '../../../../components/MatrixQuadrant.svelte';
	import { sortedTasks } from '../../../../stores/task.store';
	import type { PageProps } from './$types';
	import { getCurrentUser } from '../../../../stores/auth.store';

	const user = getCurrentUser();
	let { data }: PageProps = $props();
</script>

<div class="p-4 w-full h-full">
	<Header title={`Welcome Back, ${user?.name}`} content="Organize, Plan and Execute" />


<div class="">
	
</div>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-6 h-full mt-5">
		<div class="flex flex-col space-y-6">
			<MatrixQuadrant title="Urgent & Important" data={$sortedTasks.urgentImportant} />
			<MatrixQuadrant title="Urgent & Not Important" data={$sortedTasks.urgentNotImportant} />
		</div>

		<div class="flex flex-col space-y-6">
			<MatrixQuadrant title="Not Urgent & Important" data={$sortedTasks.notUrgentImportant} />
			<MatrixQuadrant
				title="Not Urgent & Not Important"
				data={$sortedTasks.notUrgentNotImportant}
			/>
		</div>
	</div>
</div>
