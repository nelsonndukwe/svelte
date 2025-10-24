<script lang="ts">
	import { toggleSidebar } from '$lib/helpers.js';
	import Sidebar from '../../../components/Sidebar.svelte';
	import type { LayoutProps } from './$types.js';
	import Columns2 from 'lucide-svelte/icons/columns-2';

	let { data, children }: LayoutProps = $props();
</script>

<div class="flex h-screen bg-accent dark:bg-gray-900">
	<Sidebar slug={data.slug} user={data.user} />

	<div
		class="scroll relative mx-2 h-screen w-full overflow-auto bg-white p-1 shadow-md dark:bg-background"
	>
		<button
			onclick={() => toggleSidebar()}
			class="fixed right-5 bottom-5 flex size-8 justify-center rounded-md bg-foreground md:hidden dark:bg-accent"
		>
			<Columns2 class="size-6 self-center text-accent dark:text-foreground" />
		</button>

		{@render children()}
	</div>
</div>
