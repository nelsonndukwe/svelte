<script lang="ts">
	import { Dialog, Label, Separator } from 'bits-ui';
	import { createUser, editUser } from '../stores/user.store.js';
	import Trash from 'lucide-svelte/icons/trash';
	import X from 'lucide-svelte/icons/x';
	import Loader from 'lucide-svelte/icons/loader';
	import TriangleAlert from 'lucide-svelte/icons/triangle-alert';

	let {
		loading,
		title,
		primarylabel,
		secondarylabel,
		prompt,
		action
	}: {
		loading: boolean;
		title: string;
		primarylabel: string;
		secondarylabel: string;
		action: () => void;
		prompt: string;
	} = $props();

	let isOpen = $state(false);
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Trigger
		class="inline-flex w-full  items-center justify-start gap-x-1
     rounded-input px-2 py-2 text-xs
       font-semibold whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-hidden active:scale-[0.98]"
	>
		<Trash class="size-4 text-red-700" />

		<p class="text-red-500">Delete</p>
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
			<form onsubmit={action} class="flex w-full flex-col gap-4">
				<div class="flex w-full flex-col items-center justify-center text-center">
					<div class="text-red-500"><TriangleAlert class="size-8" /></div>
					<p class="text-base text-black dark:text-accent">{prompt}</p>
				</div>
				<div class="flex w-full items-center justify-between gap-4">
					<button
						type="button"
						onclick={() => (isOpen = false)}
						class="mt-2 w-full rounded-lg bg-red-300 py-2 font-semibold text-red-700 transition-all hover:bg-red-200 focus:ring-2 focus:ring-red-300"
					>
						{secondarylabel}
					</button>
					<button
						type="submit"
						class="mt-2 w-full rounded-lg bg-red-500 py-2 font-semibold text-white transition-all hover:bg-red-600 focus:ring-2 focus:ring-blue-300"
					>
						{#if loading}
							<div class="flex w-full justify-center">
								<Loader class="animate-spin items-center self-center" />
							</div>
						{:else}
							{primarylabel}
						{/if}
					</button>
				</div>
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
