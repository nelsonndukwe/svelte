<script lang="ts">
	import type { PageProps } from './$types.js';

	let { data }: PageProps = $props();

	console.log({ data });
</script>

<h1 class="text-2xl text-red-400">Dynamic Dashboard</h1>
<p class="">{data.title}</p>
<p class="">{data.content}</p>

<style lang="postcss">
	@reference "tailwindcss";
</style>
