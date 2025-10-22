<script lang="ts">
	import { Eye, EyeOff, Mail, Lock } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	import { get } from 'svelte/store';
	import { validUsers } from '../stores/user.store.js';
	import { authUser } from '../stores/auth.store.js';

	let email = '';
	let password = '';
	let showPassword = false;
	let error = '';

	function handleLogin() {
		const users = get(validUsers);
		const user = users.find((u) => u.email === email && u.password === password);

		if (!user) {
			error = 'Invalid email or password';
			return;
		}

		// ✅ Save the authenticated user
		authUser.set(String(user.id));

		// ✅ Navigate to user dashboard
		goto(`/dashboard/${user.id}/overview`);
	}
</script>

<div class="flex items-center justify-center p-2">
	<div class="w-full max-w-md rounded-2xl bg-white p-8 transition-all">
		<h1 class="mb-6 text-center text-2xl font-semibold text-gray-800">Welcome Back 👋</h1>

		{#if error}
			<p class="mb-4 rounded-md bg-red-100 px-3 py-2 text-sm text-red-600">
				{error}
			</p>
		{/if}

		<form on:submit|preventDefault={handleLogin} class="flex w-full flex-col gap-4">
			<!-- Email -->
			<div class="relative w-full">
				<Mail class="absolute left-3 top-2.5 size-5 text-gray-400" />
				<input
					type="email"
					placeholder="Email address"
					bind:value={email}
					class="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
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
					class="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-10 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
					required
				/>
				<button
					type="button"
					class="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
					on:click={() => (showPassword = !showPassword)}
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
				Log In
			</button>
		</form>

		<p class="mt-4 text-center text-sm text-gray-600">
			Don’t have an account?
			<a href="/" class="font-medium text-blue-600 hover:underline">Sign up</a>
		</p>
	</div>
</div>
