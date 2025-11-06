<script lang="ts">
	import Quadcard from '../../../../components/Quadcard.svelte';
	import { sortedTasks } from '../../../../stores/task.store';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="">
	<div class="grid grid-cols-2">
		{#each $sortedTasks as task (task.id)}
			<Quadcard data={task} />
		{/each}
	</div>
</div>
