<script lang="ts">
	import { onMount } from 'svelte';
	import { writable, derived } from 'svelte/store';
	import Search from 'lucide-svelte/icons/search';
	import { deleteUser, validUsers } from '../stores/user.store.js';
	import ManageUser from './ManageUser.svelte';
	import ConfirmModal from './ConfirmModal.svelte';
	import { Dialog, Popover, Separator } from 'bits-ui';
	import Ellipsis from 'lucide-svelte/icons/ellipsis-vertical';
	import Pencil from 'lucide-svelte/icons/pencil';


	const query = writable('');
	let loading = $state(false);
	const filteredUsers = derived([validUsers, query], ([$users, $query]) => {
		if (!$query.trim()) return $users;

		const q = $query.toLowerCase();
		return $users.filter(
			(user) => user.name.toLowerCase().includes(q) || user.email.toLowerCase().includes(q)
		);
	});
	async function handleDelete(id: string) {
		loading = true;
		await new Promise((resolve) => setTimeout(resolve, 500));
		deleteUser(id);
		loading = false;
	}
</script>

<div class="rounded-lg bg-white p-4 shadow-md dark:bg-background overflow-auto scroll scrollbar-hide">
	<div class="mb-4 flex items-center justify-between">
		<h2 class="text-sm font-semibold text-gray-800 md:text-lg dark:text-accent">All Users</h2>

		<div class="relative">
			<input
				type="text"
				placeholder="Search users..."
				value={$query}
				oninput={(e) => query.set((e.target as HTMLInputElement).value)}
				class="rounded-md border border-gray-300 bg-gray-50 py-2 pr-3 pl-8 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 md:w-96"
			/>
			<Search class="absolute top-2.5 left-2 size-4 text-gray-400" />
		</div>

		<ManageUser label={'Add new user'} title={'Add new user'} />
	</div>

	<table class="min-w-full cursor-pointer rounded-2xl border text-sm text-gray-800">
		<thead class="rounded-xl bg-accent-foreground text-left dark:bg-background">
			<tr class="text-accent dark:text-accent">
				<th class="p-3 font-semibold">Name</th>
				<th class="p-3 font-semibold">Email</th>
				<th class="p-3 font-semibold">Role</th>
				<th class="p-3  font-semibold text-center">Actions</th>
			</tr>
		</thead>

		<tbody>
			{#each $filteredUsers as user (user.id)}
				<tr
					class="border-b transition-all duration-300 ease-in-out hover:bg-accent-foreground hover:text-white dark:text-white dark:hover:bg-gray-800"
				>
					<td class="p-2.5">{user.name}</td>
					<td class="p-2.5">{user.email}</td>
					<td class="p-2.5 capitalize">{user.role}</td>
					<td class="p-2.5 text-center">
						<Popover.Root>
							<Popover.Trigger
								class="inline-flex size-6 rounded-full hover:bg-gray-200 items-center
						  justify-center font-medium whitespace-nowrap text-background transition-all select-none hover:cursor-pointer active:scale-[0.98] "
							>
								<Ellipsis class="size-4 text-black dark:text-accent"/></Popover.Trigger
							>
							<Popover.Portal>
								<Popover.Content
									class="z-50 w-[150px] origin-(--bits-popover-content-transform-origin) rounded-[12px] border border-dark-10 bg-background p-2 shadow-popover data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 dark:bg-[#1A1A1A]"
									sideOffset={8}
									alignOffset={20}
								>
									<ConfirmModal
										title="Delete User"
										prompt="Do you want to delete this user"
										primarylabel="Delete"
										secondarylabel="Cancel"
										action={() => handleDelete(String(user.id))}
										{loading}
									/>

									<Separator.Root class="my-2 block h-px bg-dark-10" />
									<ManageUser  label={'Edit'} title={'Edit user profile'} {user} />
								</Popover.Content>
							</Popover.Portal>
						</Popover.Root>
					</td>
				</tr>
			{:else}
				<tr>
					<td colspan="4" class="p-4 text-center text-gray-400">No users found</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
