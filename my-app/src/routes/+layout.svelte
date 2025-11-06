<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={""} />
</svelte:head>

{@render children()}

<style lang="postcss">
	@reference "tailwindcss";
</style>

