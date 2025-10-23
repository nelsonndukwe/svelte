<script lang="ts">
	import { Eye, EyeOff, Mail, Lock, Loader } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	import { derived, get } from 'svelte/store';
	import { validUsers } from '../stores/user.store.js';
	import { authUser, login } from '../stores/auth.store.js';

	let email = $state('');
	let password = $state('');
	let showPassword = $state(false);
	let responseState = $state<string | null>(null);
	let loading = $state(false);

	async function handleLogin() {
		responseState = null;
		loading = true;
		const user = await login({ email, password });

		if (!user) {
			responseState = 'Invalid email or password';
			return;
		}

		// ✅ Save the authenticated user
		authUser.set(String(user.user?.id));
		responseState = user.message;
		email = '';
		password = '';
        loading = false;

		// ✅ Navigate to user dashboard
		goto(`/dashboard/${user.user?.id}`);
	}
</script>

<div class="flex items-center justify-center p-2">
	<div class="w-full max-w-md rounded-2xl bg-white p-8 transition-all">
		<h1 class="mb-6 text-center text-2xl font-semibold text-gray-800">Welcome Back 👋</h1>

		{#if responseState}
			<p class="mb-4 rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-600">
				{responseState}
			</p>
		{/if}

		<form onsubmit={handleLogin} class="flex w-full flex-col gap-4">
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
					Log In
				{/if}
			</button>
		</form>

		<p class="mt-4 text-center text-sm text-gray-600">
			Don’t have an account?
			<a href="/" class="font-medium text-blue-600 hover:underline">Sign up</a>
		</p>
	</div>
</div>
