<script lang="ts">
	import Header from '../../components/Header.svelte';
	import '../../app.css';

	let { children } = $props();
</script>

<div class="app">

	<main>
		{@render children()}
	</main>
</div>

<style lang="postcss">
	@reference "tailwindcss";
</style>
