import { derived, writable } from 'svelte/store';
import { tasks, type Category, type Priority, type Status } from '../database/index.js';
import { useId } from 'bits-ui';
import { computeTaskSortScore, priorityWeights } from '$lib/helpers.js';

// Load session from localStorage if available
const storedTasks = localStorage.getItem('tasks');

const initialTasks = storedTasks ? JSON.parse(storedTasks) : tasks;
export const taskStore = writable<typeof tasks>(initialTasks);

taskStore.subscribe((value) => {
	if (value) localStorage.setItem('tasks', JSON.stringify(value));
	else localStorage.removeItem('tasks');
});

export const deleteTasks = (id: string) => {
	taskStore.update((tasks) => {
		const task = tasks.find((task) => task.id === id);

		if (!task) {
			throw new Error('User not found');
		}

		return tasks.filter((task) => task.id !== id);
	});
	return {
		message: 'Task deleted successfully',
		status: 200
	};
};

export const editTask = async (
	id: string,
	payload: {
		title?: string;
		description?: string;
		category?: Category;
		priority?: Priority;
		status?: Status;
		dueDate: Date;
	}
) => {
	await new Promise((resolve) => setTimeout(resolve, 3000));

	taskStore.update((tasks) => {
		const currentUser = tasks.find((task) => String(task.id) === id);

		if (!currentUser) {
			return tasks;
		}

		const updatedTasks = tasks.map((task) => {
			if (String(task.id) === id) {
				return {
					...task,
					...payload
				};
			}
			return task;
		});

		return updatedTasks;
	});

	return {
		message: 'Task updated successfully',
		status: 200
	};
};

export const createTask = async (data: {
	title: string;
	description: string;
	category: Category;
	priority: Priority;
	status: Status;
	dueDate: Date;
}) => {
	let user = null;
	await new Promise((resolve) => setTimeout(resolve, 3000));
	taskStore.update((tasks) => {
		const newUser = {
			id: useId(),
			...data,
			isComplete: false,
			createdAt: new Date()
		};

		const updatedTasks = [...tasks, newUser];
		user = newUser;
		return updatedTasks;
	});

	return {
		message: 'Task created successfully',
		status: 200,
		user
	};
};

export const sortedTasks = derived(taskStore, ($tasks) => {
	return [...$tasks]
		.map((t) => ({
			...t,
			priorityValue: priorityWeights[t.priority],
			sortScore: computeTaskSortScore(t)
		}))
		.sort((a, b) => b.sortScore! - a.sortScore!);
});

