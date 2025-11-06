<script lang="ts">
	import Navbar from '../../../../components/Navbar.svelte';
	import type { LayoutProps } from './$types';
	import '../../../../app.css';

	let { data, children }: LayoutProps = $props();
</script>

<div class="">
	<Navbar />
	{@render children()}
</div>
