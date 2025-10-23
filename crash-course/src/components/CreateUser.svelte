<script lang="ts">
	import { Dialog, Label, Separator } from 'bits-ui';
	import { Eye, EyeOff, Mail, Lock, Loader, X } from 'lucide-svelte';

	let {
		isOpen,
		label,
		title,
		description
	}: { isOpen: boolean; label: string; title: string; description: string } = $props();
	let email = $state('');
	let password = $state('');
	let showPassword = $state(false);
	let responseState = $state<string | null>(null);
	let loading = $state(false);

	async function handleCreate() {}
</script>

<Dialog.Root>
	<Dialog.Trigger
		class="rounded-input text-accent bg-foreground
        shadow-mini hover:bg-dark/95 focus-visible:ring-foreground focus-visible:ring-offset-background focus-visible:outline-hidden
        inline-flex h-6 items-center  justify-center whitespace-nowrap px-3 py-4 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] md:h-8 md:py-2 md:text-sm"
	>
		{label}
	</Dialog.Trigger>
	<Dialog.Portal>
		<Dialog.Overlay
			class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"
		/>

		<Dialog.Content
			class="rounded-card-lg bg-background shadow-popover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 outline-hidden fixed left-[50%] top-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] border p-5 sm:max-w-[490px] md:w-full"
		>
			<Dialog.Title
				class="flex w-full items-center justify-center text-lg font-semibold tracking-tight"
			>
				{title}
			</Dialog.Title>
			<Separator.Root class="bg-muted -mx-5 mb-6 mt-5 block h-px" />
			<Dialog.Description class="text-foreground-alt text-sm">
				{description}
			</Dialog.Description>

			<form onsubmit={handleCreate} class="flex w-full flex-col gap-4">
				<!-- Email -->
				<div class="relative w-full">
					<Mail class="absolute left-3 top-2.5 size-5 text-gray-400" />
					<input
						type="email"
						placeholder="Email address"
						bind:value={email}
						class="dark:bg-background-alt w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
						required
					/>
				</div>

				<!-- Password -->
				<div class="relative w-full">
					<Lock class="absolute left-3 top-2.5 size-5 text-gray-400" />
					<input
						type={showPassword ? 'text' : 'password'}
						placeholder="Password"
						bind:value={password}
						class="dark:bg-background-alt w-full rounded-lg border border-gray-300 py-2 pl-10 pr-10 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
						required
					/>
					<button
						type="button"
						class="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
						onclick={() => (showPassword = !showPassword)}
					>
						{#if showPassword}
							<EyeOff class="size-5" />
						{:else}
							<Eye class="size-5" />
						{/if}
					</button>
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
				class="focus-visible:ring-foreground focus-visible:ring-offset-background focus-visible:outline-hidden absolute right-5 top-5 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]"
			>
				<div>
					<X class="text-foreground size-5" />
					<span class="sr-only">Close</span>
				</div>
			</Dialog.Close>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
