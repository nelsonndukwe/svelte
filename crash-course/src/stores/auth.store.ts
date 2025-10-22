import { writable } from 'svelte/store';
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
export function signup(credentials: { name: string; email: string; password: string }) {
	const { name, email, password } = credentials;
	const newUser = { id: Date.now(), name, email, password, createdAt: new Date().toISOString() };

	// updates users store

	validUsers.update((users) => {
		return [...users, newUser];
	});

	// update store
	authUser.set(String(newUser.id));
}

export function login(credentials: { email: string; password: string }) {
	const { email, password } = credentials;

	// search user data Json

	validUsers.update((users) => {
		const isUserValid = users.find((user) => user.email === email);
		if (!isUserValid) throw new Error('User not found');

		if (isUserValid.password !== password) throw new Error('Invalid password');
		authUser.set(String(isUserValid.id));
		return users;
	});
}

export function logout() {
	authUser.set(null);
}
