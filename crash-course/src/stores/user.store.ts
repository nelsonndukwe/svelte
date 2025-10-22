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

// export const updateUserData = (data:{}) => {
// 	const getUsers = JSON.parse(localStorage.getItem('users') || '[]') as {
// 		id: string;
// 		name: string;
// 		email: string;
// 	}[];

// 	const user = getUsers.find((user) => user.id === id);

// 	if (!user) {
// 		throw new Error('User not found');
// 	}

// 	const newUsers = getUsers.map((user) => {
// 		if (user.id === id) {
// 			return {
// 				...user,
// 				name: 'Updated Name'
// 			};
// 		}
// 	});

// 	const updatedUsers = JSON.stringify(newUsers);
// 	localStorage.setItem('users', updatedUsers);
// 	return {
// 		data: user,
// 		message: 'User profile updated successfully',
// 		status: 200
// 	};
// };
