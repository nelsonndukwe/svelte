<script lang="ts">
	import { Avatar, DropdownMenu } from 'bits-ui';
	import { DotSquare } from 'lucide-svelte';
	import CreateUser from './ManageUser.svelte';

	let notifications = $state<boolean>(false);
	let isOpen = $state(true);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class="border-input text-foreground shadow-btn hover:bg-muted inline-flex h-10 w-10 select-none items-center justify-center rounded-full border text-sm font-medium active:scale-[0.98]"
	>
		<DotSquare class="text-foreground h-6 w-6" />
	</DropdownMenu.Trigger>
	<DropdownMenu.Portal>
		<DropdownMenu.Content
			class="border-muted bg-background shadow-popover outline-hidden focus-visible:outline-hidden w-[229px] rounded-xl border px-1 py-1.5"
			sideOffset={8}
		>
			<DropdownMenu.Item
				class="rounded-button data-highlighted:bg-muted ring-0! ring-transparent! flex h-10 select-none items-center py-3 pl-3 pr-1.5 text-sm font-medium focus-visible:outline-none"
			>
				<div class="flex items-center">
					<!-- <UserCircle class="text-foreground-alt mr-2 size-5" /> -->
					Edit
				</div>
			</DropdownMenu.Item>
			<DropdownMenu.Item
				class="rounded-button data-highlighted:bg-muted ring-0! ring-transparent! flex h-10 select-none items-center py-3 pl-3 pr-1.5 text-sm font-medium focus-visible:outline-none"
			>
				<div class="flex items-center">
					<!-- <Cardholder class="text-foreground-alt mr-2 size-5" /> -->
					Delete
				</div>
			</DropdownMenu.Item>
			<DropdownMenu.Item
				class="rounded-button data-highlighted:bg-muted ring-0! ring-transparent! flex h-10 select-none items-center py-3 pl-3 pr-1.5 text-sm font-medium focus-visible:outline-none"
			>
				<div class="flex items-center">
					<GearSix class="text-foreground-alt mr-2 size-5" />
					Settings
				</div>
				<div class="ml-auto flex items-center gap-px">
					<kbd
						class="rounded-button border-dark-10 bg-background-alt text-muted-foreground shadow-kbd inline-flex size-5 items-center justify-center border text-xs"
					>
						⌘
					</kbd>
					<kbd
						class="rounded-button border-dark-10 bg-background-alt text-muted-foreground shadow-kbd inline-flex size-5 items-center justify-center border text-[10px]"
					>
						S
					</kbd>
				</div>
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
