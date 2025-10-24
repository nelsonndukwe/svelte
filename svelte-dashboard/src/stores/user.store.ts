import { writable } from 'svelte/store';
import { users } from '../database/index.js';

// Load session from localStorage if available
const storedUsers = localStorage.getItem('users');

const initialUsers = storedUsers ? JSON.parse(storedUsers) : users;
export const validUsers = writable<typeof users>(initialUsers);

validUsers.subscribe((value) => {
	if (value) localStorage.setItem('users', JSON.stringify(value));
	else localStorage.removeItem('users');
});

export const deleteUser = (id: string) => {
	validUsers.update((users) => {
		const currentUser = users.find((user) => user.id === Number(id));

		if (!currentUser) {
			throw new Error('User not found');
		}

		return users.filter((user) => user.id !== Number(id));
	});
	return {
		message: 'User deleted successfully',
		status: 200
	};
};

export const editUser = (id: string) => {
	validUsers.update((users) => {
		const currentUser = users.find((user) => user.id === Number(id));

		if (!currentUser) {
			throw new Error('User not found');
		}

		const updatedUsers = users.map((user) => {
			if (user.id === Number(id)) {
				return {
					...user,
					name: 'Updated Name'
				};
			}
			return user;
		});

		return updatedUsers;
	});

	return {
		message: 'User profile updated successfully',
		status: 200
	};
};

export const createUser = async (data: {
	name: string;
	email: string;
	role: (typeof users)[0]['role'];
}) => {
	let user = null;
	await new Promise((resolve) => setTimeout(resolve, 3000));
	validUsers.update((users) => {
		const newUser = {
			id: Date.now(),
			name: data.name,
			email: data.email,
			role: data.role,
			password: data.name,
			createdAt: new Date().toISOString()
		};

		const updatedUsers = [...users, newUser];
		user = newUser;
		return updatedUsers;
	});

	return {
		message: 'User profile created successfully',
		status: 200,
		user
	};
};
