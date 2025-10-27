<script lang="ts">
	import { roles, status } from '$lib/data.js';
	import { Dialog, Label, Separator } from 'bits-ui';
	import Eye from 'lucide-svelte/icons/eye';
	import EyeOff from 'lucide-svelte/icons/eye-off';
	import Mail from 'lucide-svelte/icons/mail';
	import Pencil from 'lucide-svelte/icons/pencil';
	import Loader from 'lucide-svelte/icons/loader';
	import X from 'lucide-svelte/icons/x';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import User from 'lucide-svelte/icons/user';
	import { createUser, editUser } from '../stores/user.store.js';
	import type { users } from '../database/index.js';
	import { onMount, type Snippet } from 'svelte';

	let {
		label,
		title,
		user
	}: {
		label: string;
		title: string;
		user?: (typeof users)[0] | null;
	} = $props();
	let email = $state('');
	let name = $state('');
	let responseState = $state<string | null>(null);
	let loading = $state(false);
	let selectedRole: string = $state('');
	let isOpen = $state(false);
	let selectedStatus: string = $state('');

	async function handleCreate() {
		loading = true;
		const payload = {
			name,
			email,
			role: selectedRole as (typeof users)[0]['role']
		};

		if (user) {
			const res = await editUser(String(user.id), {
				...payload,
				status: selectedStatus as (typeof users)[0]['status']
			});

			responseState = 'User edited successfully';
			loading = false;
			isOpen = false;
			return;
		}

		const newUser = await createUser(payload);
		if (!newUser) {
			responseState = 'Error creating user';
		}
		responseState = 'User created successfully';
		loading = false;
		isOpen = false;
	}

	function handleChange(event: Event, type: 'role' | 'status') {
		if (type === 'status') {
			const target = event.target as HTMLSelectElement;
			selectedStatus = target.value;
			return;
		}
		const target = event.target as HTMLSelectElement;
		selectedRole = target.value;
	}

	onMount(() => {
		if (!user) return;

		name = user.name;
		email = user.email;
		selectedRole = user?.role ?? '';
	});
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Trigger
		class={`inline-flex items-center justify-start gap-x-1 rounded-input px-2
     py-2 text-xs font-semibold whitespace-nowrap transition-colors
       focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-hidden active:scale-[0.98] dark:text-gray-200
	 ${!user && 'bg-blue-600 hover:bg-green-600'}  
	   `}
	>
		<Pencil class="size-4 text-black dark:text-gray-200" />
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
						value={name}
						oninput={(e) => (name = (e.target as HTMLInputElement).value)}
						class="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:bg-background-alt dark:text-white"
						required
					/>
				</div>
				<!-- Email -->
				<div class="relative w-full">
					<Mail class="absolute top-2.5 left-3 size-5 text-gray-400" />
					<input
						type="email"
						placeholder="Email address"
						value={email}
						oninput={(e) => (email = (e.target as HTMLInputElement).value)}
						class="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:bg-background-alt dark:text-white"
						required
					/>
				</div>

				<!-- Role -->
				<div class="relative w-full">
					<select
						value={selectedRole}
						onchange={(e) => handleChange(e, 'role')}
						class="peer block w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 pr-10 text-sm text-gray-700 shadow-sm transition-all duration-300 ease-in-out focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-background-alt dark:text-white"
					>
						<option class="rounded-md" value={''} disabled selected>Select role...</option>
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

				{#if user}<div class="relative w-full">
						<select
							value={selectedStatus}
							onchange={(e) => handleChange(e, 'status')}
							class="peer block w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 pr-10 text-sm text-gray-700 shadow-sm transition-all duration-300 ease-in-out focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-background-alt dark:text-white"
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
					</div>{/if}

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
