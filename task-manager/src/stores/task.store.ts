import { derived, writable } from 'svelte/store';
import { tasks, type Category, type Priority, type Status, type Task } from '../database/index.js';
import { useId } from 'bits-ui';
import { categorizeAndSortTasks } from '$lib/helpers.js';

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
		const task = tasks.find((task) => String(task.id) === id);

		if (!task) {
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
	let task = null;
	await new Promise((resolve) => setTimeout(resolve, 3000));
	taskStore.update((tasks) => {
		const newTask = {
			id: useId(),
			...data,
			isComplete: false,
			createdAt: new Date()
		};

		const updatedTasks = [...tasks, newTask];
		task = newTask;
		return updatedTasks;
	});

	return {
		message: 'Task created successfully',
		status: 200,
		task
	};
};

export const sortedTasks = derived(taskStore, ($tasks) => {
	return categorizeAndSortTasks($tasks);
});

export const toggleComplete = (id: string) => {
	taskStore.update((tasks) => {
		const task = tasks.find((task) => task.id === id);

		if (!task) {
			throw new Error('Task not found');
		}
		console.log(`id`, { id, task });

		const updatedTasks = tasks.map((task) => {
			if (task.id === id) {
				return {
					...task,
					isComplete: !task.isComplete,
					status: !task.isComplete ? 'completed' : 'ongoing' as Status,
					updatedAt: new Date()
				};
			}
			return task;
		});

		return updatedTasks;
	});
};

export const getTask = (id: string) => {
	let singleTask: Task | null = null;

	taskStore.update((tasks) => {
		const task = tasks.find((task) => String(task.id) === id);

		if (!task) {
			return tasks;
		}

		singleTask = task;
		return tasks;
	});
	return singleTask;
};
