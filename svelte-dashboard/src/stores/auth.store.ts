import { get, writable } from 'svelte/store';
import { validUsers } from './user.store.js';
// Load session from localStorage if available
const storedUser = localStorage.getItem('user');
const initial = storedUser ? JSON.parse(storedUser) : null;

export const authUser = writable<string | null>(initial);

authUser.subscribe((value) => {
	if (value) localStorage.setItem('user', JSON.stringify(value));
	else localStorage.removeItem('user');
});

// Simple auth functions
export async function signup(credentials: { name: string; email: string; password: string }) {
	await new Promise((resolve) => setTimeout(resolve, 2000));

	const { name, email, password } = credentials;
	const newUser = { id: Date.now(), name, email, password, createdAt: new Date().toISOString() };
	let userExists = false;
	// updates users store
	validUsers.update((users) => {
		const isUserExists = users.find((user) => user.email === email);

		if (isUserExists) {
			userExists = true;
			return users;
		}
		authUser.set(String(newUser.id));
		return [...users, newUser];
	});

	// update store
	if (userExists) {
		return {
			newUser: null,
			status: 'error',
			message: 'User already exists'
		};
	}
	authUser.set(String(newUser.id));
	return {
		newUser,
		status: 'success',
		message: 'User registered successfully'
	};
}

export async function login(credentials: { email: string; password: string }) {
	await new Promise((resolve) => setTimeout(resolve, 2000));

	const { email, password } = credentials;
	const isUserValid = get(validUsers).find((user) => user.email === email);

	if (!isUserValid) {
		return {
			status: 'error',
			message: 'user not found',
			user: null
		};
	}

	if (isUserValid.password !== password) {
		{
			return {
				status: 'error',
				message: 'Invalid credentials',
				user: null
			};
		}
	}
	authUser.set(String(isUserValid.id));
	return {
		status: 'success',
		message: 'Log in successful',
		user: isUserValid
	};
}

export async function logout() {
	await new Promise((resolve) => setTimeout(resolve, 2000));
	authUser.set(null);
}

export const getCurrentUser = () => {
	const userId = get(authUser);

	if (!userId) return null;

	const user = get(validUsers).find((user) => String(user.id) === userId);

	return user;
};
