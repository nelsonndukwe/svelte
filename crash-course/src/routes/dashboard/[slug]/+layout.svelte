<script lang="ts">
	import type { LayoutProps } from './$types.js';
	import { getAllRoutes } from '$lib/data.js';
	import { Avatar } from 'bits-ui';
	import { screenSizeState } from '../../../stores/dashboard.store.js';
	import { derived } from 'svelte/store';
	import { Columns2 } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { SIDEBAR_KEYBOARD_SHORTCUT, toggleSidebar } from '$lib/helpers.js';
	import { authUser } from '../../../stores/auth.store.js';
	let { data, children }: LayoutProps = $props();

	onMount(() => {
		const handleKeyDown = (event) => {
			if (
				event.key.toLowerCase() === SIDEBAR_KEYBOARD_SHORTCUT &&
				(event.metaKey || event.ctrlKey)
			) {
				event.preventDefault();
				toggleSidebar();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	});

	const derivedState = derived(
		screenSizeState,
		($screenSize) => $screenSize.open || $screenSize.isMobile
	);
	const routes = getAllRoutes(data.slug);
</script>

<div class="flex h-screen bg-gray-100">
	<div
		class={`relative  h-full ${$derivedState ? 'w-[3.2rem]' : 'w-1/5'} 
		 ${$screenSizeState.openMobile ? 'fixed z-50' : 'hidden'} justify-between p-1 shadow-md
		 transition-all duration-300 ease-in-out md:static md:flex md:flex-col `}
	>
		<div
			onclick={() => toggleSidebar()}
			class={`relative my-1 flex cursor-pointer flex-row items-center justify-between overflow-hidden rounded-md border 
	  p-1 transition-all duration-500 ease-in-out
	  ${$derivedState ? 'w-full justify-center' : 'w-full justify-between'}`}
		>
			<p
				class={`text-md transform font-semibold capitalize
      text-black transition-all duration-300 ease-in-out
      ${$derivedState ? 'w-0 -translate-x-2 opacity-0' : 'w-auto translate-x-0 opacity-100'}`}
			>
				Untilled UI
			</p>

			<!-- Short Text (shown when collapsed) -->
			<p
				class={`text-md transform text-center font-semibold capitalize
      text-black transition-all duration-300 ease-in-out
      ${$derivedState ? 'w-auto translate-x-0 opacity-100' : 'w-0 translate-x-2 opacity-0'}`}
			>
				UI
			</p>
		</div>

		<div>
			<p class="p-1 text-xs md:text-sm">Menu</p>

			<ul class="flex flex-col items-start gap-y-2 overflow-hidden">
				{#each routes as route (route.title)}
					<a
						href={route.href}
						class="w-full items-center rounded-md transition-colors duration-300 hover:bg-gray-200 md:items-start"
					>
						<div
							class={`flex w-full items-center gap-x-2.5 p-2 transition-all duration-300 ease-in-out`}
						>
							<div class="w-max">
								<route.Icon class={`item-center size-5 self-center`} />
							</div>
							<li
								class={`overflow-hidden  text-sm font-normal text-blue-950
						transition-[width,opacity] duration-300 ease-in-out
						`}
							>
								{route.title}
							</li>
						</div>
					</a>
				{/each}
			</ul>
		</div>

		<div class="flex w-full cursor-pointer flex-row items-center gap-x-2">
			<Avatar.Root
				delayMs={200}
				class="data-[status=loaded]:border-foreground bg-muted text-muted-foreground size-8 rounded-full border text-[17px] font-medium uppercase data-[status=loading]:border-transparent"
			>
				<div
					class="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-transparent"
				>
					<Avatar.Image src="/avatar-1.png" alt="@huntabyte" />
					<Avatar.Fallback class="border-muted border-none text-sm">NN</Avatar.Fallback>
				</div>
			</Avatar.Root>

			<div class={`block space-y-1 text-sm font-normal ${$derivedState && 'hidden'}`}>
				<p class="font-semibold">{data.user?.name}</p>
				<p class="text-xs">{data.user?.role}</p>
			</div>
		</div>
	</div>

	<div class="relative mx-2 my-1 w-full rounded-lg bg-white p-1 shadow-md">
		<button onclick={() => toggleSidebar()} class=" fixed bottom-5 right-5 md:hidden">
			<Columns2 />
		</button>
		{@render children()}
	</div>
</div>
