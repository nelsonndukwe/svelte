<script lang="ts">
	import { roles, status } from '$lib/data.js';
	import { Dialog, Label, Separator } from 'bits-ui';
	import { Eye, EyeOff, Mail, Lock, Loader, X, ChevronDown, User } from 'lucide-svelte';
	import { createUser } from '../stores/user.store.js';
	import type { users } from '../database/index.js';

	let {
		label,
		title,
		description
	}: { isOpen: boolean; label: string; title: string; description: string } = $props();
	let email = $state('');
	let name = $state('');
	let responseState = $state<string | null>(null);
	let loading = $state(false);
	let selectedRole: string = $state('');
	let isOpen = $state(false);

	async function handleCreate() {
		loading = true;
		const payload = {
			name,
			email,
			role: selectedRole as (typeof users)[0]['role']
		};

		const user = await createUser(payload);
		if (!user) {
			responseState = 'Error creating user';
		}
		responseState = 'selectedRole: ' + selectedRole;
		console.log(`payload`, payload);
		loading = false;
		isOpen = false;
	}

	function handleChange(event: Event, type: 'role' | 'status') {
		// if (type === 'status') {
		// 	const target = event.target as HTMLSelectElement;
		// 	selectedStatus = target.value;
		// 	return;
		// }
		const target = event.target as HTMLSelectElement;
		selectedRole = target.value;
	}
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Trigger
		class="inline-flex h-6 items-center justify-center rounded-input
        bg-foreground px-3 py-4 text-xs font-semibold
        whitespace-nowrap text-accent shadow-mini  transition-colors hover:bg-dark/95 focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-hidden active:scale-[0.98] md:h-8 md:py-2 md:text-sm dark:bg-accent dark:text-background"
	>
		{label}
	</Dialog.Trigger>
	<Dialog.Portal>
		<Dialog.Overlay
			class="fixed inset-0 z-50 bg-black/80 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
		/>

		<Dialog.Content
			class="fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-card-lg border bg-background p-5 shadow-popover outline-hidden data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-[490px] md:w-full"
		>
			<Dialog.Title
				class="flex w-full items-center justify-center text-lg font-semibold tracking-tight dark:text-accent"
			>
				{title}
			</Dialog.Title>
			<Separator.Root class="-mx-5 mt-5 mb-6 block h-px bg-muted" />
			{#if responseState}
				<Dialog.Description class="py-2 text-sm text-foreground-alt">
					<p class="mb-4 rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-600">
						{responseState}
					</p>
				</Dialog.Description>
			{/if}
			<form onsubmit={handleCreate} class="flex w-full flex-col gap-4">
				<!-- Name -->
				<div class="relative w-full">
					<User class="absolute top-2.5 left-3 size-5 text-gray-400" />
					<input
						type="text"
						placeholder="Enter full name"
						bind:value={name}
						class="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:bg-background-alt"
						required
					/>
				</div>
				<!-- Email -->
				<div class="relative w-full">
					<Mail class="absolute top-2.5 left-3 size-5 text-gray-400" />
					<input
						type="email"
						placeholder="Email address"
						bind:value={email}
						class="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:bg-background-alt"
						required
					/>
				</div>

				<!-- Role -->
				<div class="relative w-full">
					<select
						bind:value={selectedRole}
						onchange={(e) => handleChange(e, 'role')}
						class="peer block w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 pr-10 text-sm text-gray-700 shadow-sm transition-all duration-300 ease-in-out focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:ring-blue-500"
					>
						<option class="rounded-md" value="" disabled selected>Select role...</option>
						{#each roles as role (role.key)}
							<option value={role.key} class="capitalize">
								{role.label}
							</option>
						{/each}
					</select>

					<!-- Icon -->
					<ChevronDown
						class="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-gray-500 transition-transform duration-200 peer-focus:rotate-180"
					/>
				</div>

				<!-- <div class="relative w-full">
					<select
						bind:value={selectedStatus}
						onchange={(e) => handleChange(e, 'status')}
						class="peer block w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 pr-10 text-sm text-gray-700 shadow-sm transition-all duration-300 ease-in-out focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:ring-blue-500"
					>
						<option class="rounded-md" value="" disabled selected>Select Status...</option>
						{#each status as item (item.key)}
							<option value={item.key} class="capitalize">
								{item.label}
							</option>
						{/each}
					</select>

					<ChevronDown
						class="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-gray-500 transition-transform duration-200 peer-focus:rotate-180"
					/>
				</div> -->

				<button
					type="submit"
					class="mt-2 w-full rounded-lg bg-blue-500 py-2 font-semibold text-white transition-all hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
				>
					{#if loading}
						<div class="flex w-full justify-center">
							<Loader class="animate-spin items-center self-center" />
						</div>
					{:else}
						Submit
					{/if}
				</button>
			</form>

			<Dialog.Close
				class="absolute top-5 right-5 rounded-md focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-hidden active:scale-[0.98]"
			>
				<div>
					<X class="size-5 text-foreground" />
					<span class="sr-only">Close</span>
				</div>
			</Dialog.Close>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
