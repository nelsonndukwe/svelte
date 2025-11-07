<script lang="ts">
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
	import {
		categoryOptions,
		priorityOptions,
		statusOptions,
		type Category,
		type Priority,
		type Status,
		type Task,
		type users
	} from '../database/index.js';
	import { onMount, type Snippet } from 'svelte';
	import { Heading } from 'lucide-svelte';
	import { createTask, editTask } from '../stores/task.store.js';

	let {
		label,
		task
	}: {
		label: string;
		task?: Task;
	} = $props();
	let title = $state('');
	let description = $state('');
	let status: string = $state('');
	let priority: string = $state('');
	let category: string = $state('');
	let dueDate: Date = $state(new Date());

	let responseState = $state<string | null>(null);
	let loading = $state(false);
	let isOpen = $state(false);

	async function handleCreate() {
		loading = true;
		const payload = {
			title,
			description,
			status: status as Status,
			priority: priority as Priority,
			category: category as Category,
			dueDate
		};

		if (task) {
			const res = await editTask(String(task.id), payload);

			responseState = 'Task edited successfully';
			loading = false;
			isOpen = false;
			return;
		}

		// Fix: Convert string inputs to appropriate enum types for createTask
		const newTask = await createTask(payload);
		if (!newTask) {
			responseState = 'Error creating task';
		} else {
			responseState = 'Task created successfully';
		}
		loading = false;
		isOpen = false;
	}

	function handleChange(event: Event, type: 'status' | 'priority' | 'category') {
		if (type === 'status') {
			const target = event.target as HTMLSelectElement;
			status = target.value;
			return;
		} else if (type === 'priority') {
			const target = event.target as HTMLSelectElement;
			priority = target.value;
			return;
		}
		const target = event.target as HTMLSelectElement;
		category = target.value;
	}

	onMount(() => {
		if (!task) return;

		title = task.title;
		description = task.description;
		status = task.status ?? '';
		priority = task.priority;
		category = task.category;
		dueDate = task.dueDate;
	});
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Trigger
		class={`inline-flex items-center bg justify-start gap-x-1 rounded-input px-2
     py-2 text-xs font-semibold whitespace-nowrap transition-colors
       focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-hidden active:scale-[0.98] dark:text-gray-200
	 ${!task && 'bg-gray-400 hover:bg-purple-600'}  
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
					<Heading class="absolute top-2.5 left-3 size-5 text-gray-400" />
					<input
						type="text"
						placeholder="Enter task title"
						value={title}
						oninput={(e) => (title = (e.target as HTMLInputElement).value)}
						class="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:bg-background-alt dark:text-white"
						required
					/>
				</div>
				<!-- Email -->
				<div class="relative w-full">
					<Mail class="absolute top-2.5 left-3 size-5 text-gray-400" />
					<textarea
						placeholder="Write description"
						value={description}
						oninput={(e) => (description = (e.target as HTMLTextAreaElement).value)}
						class="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:bg-background-alt dark:text-white"
						required
					/>
				</div>

				<!-- Role -->
				<div class="relative w-full">
					<select
						value={status}
						onchange={(e) => handleChange(e, 'status')}
						class="peer block w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 pr-10 text-sm text-gray-700 shadow-sm transition-all duration-300 ease-in-out focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-background-alt dark:text-white"
					>
						<option class="rounded-md" value={''} disabled selected>Select Task status...</option>
						{#each statusOptions as status (status.value)}
							<option value={status.value} class="capitalize">
								{status.label}
							</option>
						{/each}
					</select>

					<!-- Icon -->
					<ChevronDown
						class="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-gray-500 transition-transform duration-200 peer-focus:rotate-180"
					/>
				</div>

				<div class="relative w-full">
					<select
						value={priority}
						onchange={(e) => handleChange(e, 'priority')}
						class="peer block w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 pr-10 text-sm text-gray-700 shadow-sm transition-all duration-300 ease-in-out focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-background-alt dark:text-white"
					>
						<option class="rounded-md" value="" disabled selected
							>Select task priority level...</option
						>
						{#each priorityOptions as priority (priority.value)}
							<option value={priority.value} class="capitalize">
								{priority.label}
							</option>
						{/each}
					</select>

					<ChevronDown
						class="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-gray-500 transition-transform duration-200 peer-focus:rotate-180"
					/>
				</div>

				<div class="relative w-full">
					<select
						value={category}
						onchange={(e) => handleChange(e, 'category')}
						class="peer block w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 pr-10 text-sm text-gray-700 shadow-sm transition-all duration-300 ease-in-out focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-background-alt dark:text-white"
					>
						<option class="rounded-md" value="" disabled selected>Select Task category...</option>
						{#each categoryOptions as category (category.value)}
							<option value={category.value} class="capitalize">
								{category.label}
							</option>
						{/each}other
					</select>

					<ChevronDown
						class="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-gray-500 transition-transform duration-200 peer-focus:rotate-180"
					/>
				</div>
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
