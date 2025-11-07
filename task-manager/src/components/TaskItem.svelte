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
	import { onMount, type Snippet } from 'svelte';
	import { Heading, PencilIcon, Trash } from 'lucide-svelte';
	import { categoryState, priorityState, statusState } from '$lib/helpers.js';
	import type { Task } from '../database/index.js';
	import ConfirmModal from './ConfirmModal.svelte';
	import { deleteTasks } from '../stores/task.store.js';
	import ManageTask from './ManageTask.svelte';

	let {
		title,
		label,
		task
	}: {
		title: string;
		label: string;
		task: Task;
	} = $props();

	let isOpen = $state(false);
	let loading = $state(false);

	async function handleDelete(id: string) {
		loading = true;
		await new Promise((resolve) => setTimeout(resolve, 500));
		deleteTasks(id);
		loading = false;
	}
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Trigger class="dark:text-white">
		{label}
	</Dialog.Trigger>

	<Dialog.Portal>
		<Dialog.Overlay
			class="fixed inset-0 z-50 bg-black/80 task-[state=closed]:animate-out task-[state=closed]:fade-out-0 task-[state=open]:animate-in task-[state=open]:fade-in-0"
		/>

		<Dialog.Content
			class="fixed flex flex-col items-start top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-card-lg border bg-background p-5 shadow-popover outline-hidden task-[state=closed]:animate-out task-[state=closed]:fade-out-0 task-[state=closed]:zoom-out-95 task-[state=open]:animate-in task-[state=open]:fade-in-0 task-[state=open]:zoom-in-95 sm:max-w-[490px] md:w-full"
		>
			<Dialog.Title
				class="flex w-full items-center justify-center text-lg font-semibold tracking-tight dark:text-accent"
			>
				{title}
			</Dialog.Title>
			<Separator.Root class="-mx-5 mt-5 mb-6 block h-px bg-muted" />

			<div class="flex flex-col gap-y-4 border border-grey1 p-2 rounded-2xl w-full">
				<p class="text-sm">{task.title}</p>

				<p class="text-sm">{task.description}</p>

				<div class="flex flex-col gap-y-2 items-start text-xs">
					{#if task.status}
						<p class=""><span>Status: {' '}</span> {statusState[task.status]}</p>
					{/if}

					{#if task.priority}
						<p class=""><span>Priority: {' '}</span>{priorityState[task.priority]}</p>
					{/if}
					{#if task.category}
						<p class=""><span>Category: {' '}</span>{categoryState[task.category]}</p>
					{/if}
				</div>
			</div>

			<div class="self-end flex gap-x-2 items-center my-2">
				<div class="p-2 bg-purple-100 rounded-lg">
					<ManageTask  label="Edit" {task} />
				</div>
				<div class="p-2 bg-red-100 rounded-lg">
					<ConfirmModal
						title="Delete Task"
						prompt="Do you want to delete this Task"
						primarylabel="Delete"
						secondarylabel="Cancel"
						action={() => handleDelete(String(task.id))}
						{loading}
					/>
				</div>
			</div>

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
