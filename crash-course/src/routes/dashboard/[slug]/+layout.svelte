<script lang="ts">
	import type { LayoutProps } from './$types.js';
	import { getAllRoutes } from '$lib/data.js';
	import { Avatar, Popover, Separator } from 'bits-ui';
	import { screenSizeState } from '../../../stores/dashboard.store.js';
	import { userPreferenceState } from '../../../stores/pref.store.js';
	import { derived } from 'svelte/store';
	import { Columns2, LogOut, Sun, Moon } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { SIDEBAR_KEYBOARD_SHORTCUT, toggleSidebar } from '$lib/helpers.js';
	import { authUser, logout } from '../../../stores/auth.store.js';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
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

	const handleLogout = async () => {
		await logout();
		goto( "/" );
	};

	const handleThemeToggle = () => {
		userPreferenceState.update((state) => {
			const newTheme = state.theme === 'light' ? 'dark' : 'light';
			return { ...state, theme: newTheme };
		});
	};
	const routes = getAllRoutes(data.slug);
</script>

<div class="flex h-screen bg-accent dark:bg-gray-900">
	<div
		class={`relative h-full ${$derivedState ? 'w-[3.2rem]' : 'w-1/5'} 
		 ${$screenSizeState.openMobile ? 'fixed z-50' : 'hidden'} justify-between p-1 shadow-md
		 transition-all duration-300 ease-in-out md:static md:flex md:flex-col `}
	>
		<div
			onclick={() => toggleSidebar()}
			class={`relative my-1 dark:border-accent shadow-md flex cursor-pointer flex-row items-center justify-between overflow-hidden rounded-md border 
	  p-1 transition-all duration-500 ease-in-out
	  ${$derivedState ? 'w-full justify-center' : 'w-full justify-between'}`}
		>
			<p
				class={`text-md  dark:text-white transform font-semibold capitalize
      text-black transition-all duration-300 ease-in-out
      ${$derivedState ? 'w-0 -translate-x-2 opacity-0' : 'w-auto translate-x-0 opacity-100'}`}
			>
				Untilled UI
			</p>

			<!-- Short Text (shown when collapsed) -->
			<p
				class={`text-md dark:text-white transform text-center font-semibold capitalize
      text-black transition-all duration-300 ease-in-out
      ${$derivedState ? 'w-auto translate-x-0 opacity-100' : 'w-0 translate-x-2 opacity-0'}`}
			>
				UI
			</p>
		</div>

		<div>
			<p class="p-1 text-xs md:text-sm">Menu</p>

			<ul class="flex flex-col items-start gap-y-3 overflow-hidden">
				{#each routes as route (route.title)}
					<a
						href={route.href}
						class="w-full items-center rounded-md transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-600 md:items-start"
					>
						<div
							class={`flex w-full items-center gap-x-2.5 p-2 transition-all duration-300 ease-in-out`}
						>
							<div class="w-max">
								<route.Icon class={`item-center size-5 self-center dark:text-accent`} />
							</div>
							<li
								class={`dark:text-gray-300 overflow-hidden  text-sm font-normal text-blue-950
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

		<Popover.Root>
			<Popover.Trigger
				class="rounded-input bg-dark dark:bg-accent
			  text-background shadow-mini hover:bg-dark/95 inline-flex h-10 select-none items-center justify-center whitespace-nowrap px-2 text-[15px] font-medium transition-all hover:cursor-pointer active:scale-[0.98]"
			>
				<div class="flex w-full cursor-pointer flex-row items-center gap-x-2">
					<Avatar.Root
						delayMs={200}
						class="data-[status=loaded]:border-foreground bg-muted text-muted-foreground size-6 rounded-full border text-[17px] font-medium uppercase data-[status=loading]:border-transparent"
					>
						<div
							class="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-transparent"
						>
							<Avatar.Image src="/avatar-1.png" alt="@huntabyte" />
							<Avatar.Fallback class="dark:text-white border-muted border-none text-xs">NN</Avatar.Fallback>
						</div>
					</Avatar.Root>

					<div class={`block space-y-1 text-sm font-normal ${$derivedState && 'hidden'}`}>
						<p class="font-semibold">{data.user?.name}</p>
						<p class="text-xs">{data.user?.role}</p>
					</div>
				</div>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content
					class="border-dark-10 bg-background dark:bg-accent shadow-popover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--bits-popover-content-transform-origin) z-50 w-[150px] rounded-[12px] border p-2"
					sideOffset={8}
					alignOffset={20}
				>
					<div
						onclick={handleThemeToggle}
						class=" flex cursor-pointer flex-row items-center gap-x-2 text-xs hover:text-primary"
					>
					<div class="relative h-4 w-4">
						<Sun
							class={`size-4 absolute inset-0 transition-opacity duration-300 ease-in-out ${
								$userPreferenceState.theme === 'light' ? 'opacity-100' : 'opacity-0'
							}`}
						/>
						<Moon
							class={`size-4 absolute inset-0 transition-opacity duration-300 ease-in-out ${
								$userPreferenceState.theme === 'dark' ? 'opacity-100' : 'opacity-0'
							}`}
						/>
					</div>
				
						<p class="text-xs capitalize">{$userPreferenceState.theme} Mode </p>
					</div>
					<Separator.Root class="bg-dark-10 my-2 block h-px" />
					<div
						onclick={handleLogout}
						class="flex cursor-pointer flex-row items-center gap-x-2 text-xs hover:text-red-600"
					>
						<LogOut class="size-4 text-red-700" />
						<p class="">Log out</p>
					</div>

				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	</div>

	<div class="relative mx-2 my-1 w-full rounded-lg bg-white p-1 shadow-md">
		<button onclick={() => toggleSidebar()} class=" fixed bottom-5 right-5 md:hidden">
			<Columns2 />
		</button>
		{@render children()}
	</div>
</div>
