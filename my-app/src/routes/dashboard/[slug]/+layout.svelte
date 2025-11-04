<script lang="ts">
	import type { LayoutProps } from './$types.js';

	let { data, children }: LayoutProps = $props();
</script>

<div class=" dark:bg-gray-900">
	{@render children()}
</div>
