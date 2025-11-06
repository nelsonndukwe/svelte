<script>
	import { Tabs } from 'bits-ui';
	import Login from '../../components/Login.svelte';
	import Signup from '../../components/Signup.svelte';
</script>

<div
	class="h-screen w-screen bg-gradient-to-b from-sky-100 via-sky-200 to-blue-200 dark:bg-background-alt"
>
	<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
		<Tabs.Root
			value="sign-in"
			class="rounded-xl border-muted bg-background-alt dark:bg-background dark:text-accent shadow-card h-max w-[390px] border p-3"
		>
			<Tabs.List
				class="rounded-9px bg-dark-10 shadow-mini-inset dark:bg-background grid w-full grid-cols-2 gap-1 p-1 text-sm font-semibold leading-[0.01em] dark:border dark:border-neutral-400/30"
			>
				<Tabs.Trigger
					value="sign-in"
					class="data-[state=active]:shadow-mini dark:data-[state=active]:bg-gray-800 h-8 rounded-[7px] bg-transparent py-2 data-[state=active]:bg-white "
					>Log in</Tabs.Trigger
				>
				<Tabs.Trigger
					value="sign-up"
					class="data-[state=active]:shadow-mini dark:data-[state=active]:bg-muted h-8 rounded-[7px] bg-transparent py-2 data-[state=active]:bg-white "
					>Create Account</Tabs.Trigger
				>
			</Tabs.List>

			<Tabs.Content value="sign-in" class="select-none pt-3">
				<Login />
			</Tabs.Content>

			<Tabs.Content value="sign-up" class="select-none pt-3">
				<Signup />
			</Tabs.Content>
		</Tabs.Root>
	</div>
</div>
