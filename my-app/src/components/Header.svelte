<script lang="ts">

	export let title;
	export let content: string | undefined;


	// fetch current user
</script>

<div class="space-y-0.5 px-2">
	<div
		class="dark:text-accent-foreground text-lg font-bold tracking-tight text-zinc-700 md:text-2xl"
	>
		{title}
	</div>
	<p class="text-foreground dark:text-accent text-wrap text-sm md:text-base">
		{content}
	</p>
</div>
