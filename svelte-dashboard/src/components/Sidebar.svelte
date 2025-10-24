<script lang="ts">
	import { getAllRoutes } from '$lib/data.js';
	import Columns2 from 'lucide-svelte/icons/columns-2';
	import LogOut from 'lucide-svelte/icons/log-out';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

	import { userPreferenceState } from '../stores/pref.store.js';
	import { logout } from '../stores/auth.store.js';
	import { derived } from 'svelte/store';
	import { screenSizeState } from '../stores/dashboard.store.js';
	import { goto } from '$app/navigation';
	import { Avatar, Popover, Separator } from 'bits-ui';
	import { onMount } from 'svelte';
	import { SIDEBAR_KEYBOARD_SHORTCUT, toggleSidebar } from '$lib/helpers.js';
	import type { users } from '../database/index.js';

	export let slug: string;
	export let user: (typeof users)[0];
	const derivedState = derived(
		screenSizeState,
		($screenSize) => $screenSize.open || $screenSize.isMobile
	);

	const handleLogout = async () => {
		await logout();
		goto('/');
	};

	const handleThemeToggle = () => {
		userPreferenceState.update((state) => {
			const newTheme = state.theme === 'light' ? 'dark' : 'light';
			return { ...state, theme: newTheme };
		});
	};

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
	const routes = getAllRoutes(slug);
</script>

<div
	class={`scroll relative h-screen overflow-auto ${$derivedState ? 'w-[3.2rem]' : 'w-1/5'} 
 ${$screenSizeState.openMobile ? 'fixed z-50' : 'hidden'} justify-between p-1 shadow-md
 transition-all duration-300 ease-in-out md:static md:flex md:flex-col `}
>
	<div
		onclick={() => toggleSidebar()}
		class={`relative my-1 flex cursor-pointer flex-row items-center justify-between overflow-hidden rounded-md border p-1 shadow-md 
transition-all duration-500 ease-in-out dark:border-accent
${$derivedState ? 'w-full justify-center' : 'w-full justify-between'}`}
	>
		<p
			class={`text-md  transform font-semibold text-black capitalize
transition-all duration-300 ease-in-out dark:text-white
${$derivedState ? 'w-0 -translate-x-2 opacity-0' : 'w-auto translate-x-0 opacity-100'}`}
		>
			Untilled UI
		</p>

		<!-- Short Text (shown when collapsed) -->
		<p
			class={`text-md transform text-center font-semibold text-black capitalize
transition-all duration-300 ease-in-out dark:text-white
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
					class="w-full items-center rounded-md transition-colors duration-300 hover:bg-gray-200 md:items-start dark:hover:bg-gray-600"
				>
					<div
						class={`flex w-full items-center gap-x-2.5 p-2 transition-all duration-300 ease-in-out`}
					>
						<div class="w-max">
							<route.Icon class={`item-center size-5 self-center dark:text-accent`} />
						</div>
						<li
							class={`overflow-hidden text-sm  font-normal text-blue-950 transition-[width,opacity]
                duration-300 ease-in-out dark:text-gray-300
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
			class="inline-flex h-10 items-center
      justify-center rounded-input bg-dark px-2 text-[15px] font-medium whitespace-nowrap text-background shadow-mini transition-all select-none hover:cursor-pointer hover:bg-dark/95 active:scale-[0.98] dark:bg-accent"
		>
			<div class="flex w-full cursor-pointer flex-row items-center gap-x-2">
				<Avatar.Root
					delayMs={200}
					class="size-6 rounded-full border bg-muted text-[17px] font-medium text-muted-foreground uppercase data-[status=loaded]:border-foreground data-[status=loading]:border-transparent"
				>
					<div
						class="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-transparent"
					>
						<Avatar.Image src="/avatar-1.png" alt="@huntabyte" />
						<Avatar.Fallback class="border-none border-muted text-xs dark:text-white"
							>NN</Avatar.Fallback
						>
					</div>
				</Avatar.Root>

				<div class={`block space-y-1 text-sm font-normal ${$derivedState && 'hidden'}`}>
					<p class="font-semibold">{user?.name}</p>
					<p class="text-start text-xs capitalize">{user?.role}</p>
				</div>
			</div>
		</Popover.Trigger>
		<Popover.Portal>
			<Popover.Content
				class="z-50 w-[150px] origin-(--bits-popover-content-transform-origin) rounded-[12px] border border-dark-10 bg-background p-2 shadow-popover data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 dark:bg-accent"
				sideOffset={8}
				alignOffset={20}
			>
				<div
					onclick={handleThemeToggle}
					class=" hover:text-primary flex cursor-pointer flex-row items-center gap-x-2 text-xs"
				>
					<div class="relative h-4 w-4">
						<Sun
							class={`absolute inset-0 size-4 transition-opacity duration-300 ease-in-out ${
								$userPreferenceState.theme === 'light' ? 'opacity-100' : 'opacity-0'
							}`}
						/>
						<Moon
							class={`absolute inset-0 size-4 transition-opacity duration-300 ease-in-out ${
								$userPreferenceState.theme === 'dark' ? 'opacity-100' : 'opacity-0'
							}`}
						/>
					</div>

					<p class="text-xs capitalize">{$userPreferenceState.theme} Mode</p>
				</div>
				<Separator.Root class="my-2 block h-px bg-dark-10" />
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
