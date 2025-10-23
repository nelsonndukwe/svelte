<script lang="ts">
	import { onMount } from 'svelte';
	import { writable, derived } from 'svelte/store';
	import { Search } from 'lucide-svelte';
	import { deleteUser, validUsers } from '../stores/user.store.js';
	import CreateUser from './CreateUser.svelte';
	import Dropdown from './Dropdown.svelte';

	let query = $state('');

	// Derived store for filtered results
	const filteredUsers = derived(validUsers, ($users) => {
		if (!query) return $users;
		return $users.filter(
			(user) =>
				user.name.toLowerCase().includes(query.toLowerCase()) ||
				user.email.toLowerCase().includes(query.toLowerCase())
		);
	});

	function handleDelete(id: string) {
		if (confirm('Are you sure you want to delete this user?')) {
			deleteUser(id);
		}
	}
</script>

<div class="dark:bg-background rounded-lg bg-white p-4 shadow-md">
	<div class="mb-4 flex items-center justify-between">
		<h2 class="text-sm font-semibold text-gray-800 md:text-lg">All Users</h2>

		<div class="relative">
			<input
				type="text"
				placeholder="Search users..."
				bind:value={query}
				class="rounded-md border border-gray-300 bg-gray-50 py-2 pl-8 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 md:w-96"
			/>
			<Search class="absolute left-2 top-2.5 size-4 text-gray-400" />
		</div>

		<CreateUser isOpen={true} label={"Add new user"} title={"Add new user"} description={"Create and add new user"} />
	</div>

	<table class="min-w-full cursor-pointer rounded-2xl border text-sm text-gray-800">
		<thead class="bg-accent-foreground dark:bg-background rounded-xl text-left">
			<tr class="text-accent dark:text-gray-400">
				<th class="p-3 font-semibold">Name</th>
				<th class="p-3 font-semibold">Email</th>
				<th class="p-3 font-semibold">Role</th>
				<th class="p-3 text-right font-semibold">Actions</th>
			</tr>
		</thead>

		<tbody>
			{#each $filteredUsers as user (user.id)}
				<tr
					class="hover:bg-accent-foreground border-b transition-all duration-300 ease-in-out hover:text-white dark:text-white dark:hover:bg-gray-800"
				>
					<td class="p-2.5">{user.name}</td>
					<td class="p-2.5">{user.email}</td>
					<td class="p-2.5 capitalize">{user.role}</td>
					<td class="p-2.5 text-right">
						<!-- <Dropdown /> -->
                        
                         <CreateUser isOpen={true} label={"Edit"} title={"Edit user profile"} description={"Edit and modify user"} />

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
