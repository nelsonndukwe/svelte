<script lang="ts">
	import type { Task } from '../database';
	let {
		data,
		title
	}: {
		data: Task[];
		title: string;
	} = $props();
</script>

<div class=" rounded-[14px] p-3 w-full h-full bg-accent">
	<div class=" rounded-md bg-white p-2 dark:bg-gray-900">
		{#each data as data (data.id)}
			<p class=" border text-red">{data.title}</p>
		{/each}
	</div>
</div>
