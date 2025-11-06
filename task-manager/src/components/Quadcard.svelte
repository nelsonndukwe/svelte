<script lang="ts">
	import type { Task } from '../database';
	let {
		data
	}: {
		data: Task;
	} = $props();
</script>

<div class="bg-accent dark:bg-gray-900 rounded-[14px] p-3 w-full h-full">
	<div class=" rounded-md bg-white p-2 dark:bg-gray-900">
		<p>{data.title}</p>
	</div>
</div>
