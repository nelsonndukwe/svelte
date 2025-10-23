<script lang="ts">
	import { getGreeting } from '$lib/helpers.js';

	export let title;
	export let content: string | undefined;

	const isSignedIn = true;

	// fetch current user
</script>

<div class="space-y-0.5 px-4">
	<div class="text-lg font-bold tracking-tight text-zinc-700 md:text-2xl">
		{title}
	</div>
	<p class="text-muted-foreground text-wrap text-sm md:text-base">
		{content}
	</p>
</div>
