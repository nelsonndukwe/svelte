<script lang="ts">
	import { Avatar, Popover, Separator } from 'bits-ui';
	import { getCurrentUser, logout } from '../stores/auth.store';
	import { LogOut, Moon, Sun } from 'lucide-svelte';
	import { userPreferenceState } from '../stores/pref.store.js';
	import { goto } from '$app/navigation';

	const user = getCurrentUser();
	const handleThemeToggle = () => {
		userPreferenceState.update((state) => {
			const newTheme = state.theme === 'light' ? 'dark' : 'light';
			return { ...state, theme: newTheme };
		});
	};

	const handleLogout = async () => {
		await logout();
		goto('/');
	};
</script>

<div class="border sticky top-2 mb-2 z-50 bg-white rounded-full px-4 py-2 mx-auto w-[95%] bg-white">
	<div class="flex items-center justify-between">
		<h1 class="text-start font-extrabold text-2xl">Dashboard</h1>

		<Popover.Root>
			<Popover.Trigger
				class="inline-flex h-10 items-center
      justify-center rounded-input  px-2 text-[15px] font-medium whitespace-nowrap text-background shadow-mini transition-all select-none hover:cursor-pointer hover:bg-dark/95 active:scale-[0.98] dark:bg-accent"
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
							<Avatar.Fallback class="border-none border-muted text-xs text-black dark:text-white"
								>NN</Avatar.Fallback
							>
						</div>
					</Avatar.Root>

					<!-- <div class={`block space-y-1 text-sm font-normal`}>
					<p class="font-semibold">{user?.name}</p>
					<p class="text-start text-xs capitalize">{user?.role}</p>
				</div> -->
				</div>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content
					class="z-50 w-[150px] origin-(--bits-popover-content-transform-origin) rounded-[12px] border border-dark-10 bg-background p-2 shadow-popover data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 dark:bg-accent"
					sideOffset={8}
					alignOffset={20}
				>
					<button
						onclick={handleThemeToggle}
						class=" hover:text-primary flex cursor-pointer flex-row items-center gap-x-2 text-xs"
					>
						<div class="relative h-4 w-4">
							<Sun
								class={`absolute inset-0 size-4 transition-opacity duration-300 ease-in-out ${
									$userPreferenceState.theme === 'light' ? 'opacity-0' : 'opacity-100'
								}`}
							/>
							<Moon
								class={`absolute inset-0 size-4 transition-opacity duration-300 ease-in-out ${
									$userPreferenceState.theme === 'dark' ? 'opacity-0' : 'opacity-100'
								}`}
							/>
						</div>

						<p class="text-xs capitalize">
							{$userPreferenceState.theme === 'dark' ? 'Light' : 'Dark'} Mode
						</p>
					</button>
					<Separator.Root class="my-2 block h-px bg-dark-10" />
					<button
						onclick={handleLogout}
						class="flex cursor-pointer flex-row items-center gap-x-2 text-xs hover:text-red-600"
					>
						<LogOut class="size-4 text-red-700" />
						<p class="">Log out</p>
					</button>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	</div>
</div>
