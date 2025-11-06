<script lang="ts">
	import MatrixQuadrant from '../../../../components/MatrixQuadrant.svelte';
	import { sortedTasks } from '../../../../stores/task.store';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="p-4 w-full h-full">
	<!-- Eisenhower Matrix Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
		<!-- Top Row -->
		<div class="flex flex-col space-y-6">
			<MatrixQuadrant title="Urgent & Important" data={$sortedTasks.urgentImportant} />
			<MatrixQuadrant title="Urgent & Not Important" data={$sortedTasks.urgentNotImportant} />
		</div>

		<!-- Bottom Row -->
		<div class="flex flex-col space-y-6">
			<MatrixQuadrant title="Not Urgent & Important" data={$sortedTasks.notUrgentImportant} />
			<MatrixQuadrant title="Not Urgent & Not Important" data={$sortedTasks.notUrgentNotImportant} />
		</div>
	</div>
</div>
