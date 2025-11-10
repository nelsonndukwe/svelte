import { describe, it, expect, beforeEach, vi } from 'vitest';
import { get } from 'svelte/store';
import type { Category, Priority, Status, Task } from '../database';
import {
	createTask,
	deleteTasks,
	editTask,
	getTask,
	taskStore,
	toggleComplete
} from '../stores/task.store';

const mockStorage: Record<string, string> = {};
vi.stubGlobal('localStorage', {
	getItem: vi.fn((key) => mockStorage[key] ?? null),
	setItem: vi.fn((key, val) => {
		mockStorage[key] = val;
	}),
	removeItem: vi.fn((key) => {
		delete mockStorage[key];
	}),
	clear: vi.fn(() => {
		for (const k in mockStorage) delete mockStorage[k];
	})
});

vi.mock('bits-ui', () => ({
	useId: () => 'mock-id-' + Math.random().toString(36).substring(2, 6)
}));

vi.mock('$lib/helpers.js', () => ({
	categorizeAndSortTasks: (tasks: Task[]) => tasks
}));

vi.mock('../database/index.js', () => ({
	tasks: [
		{
			id: 't1',
			title: 'Task One',
			description: 'First test task',
			category: 'work',
			priority: 'high',
			status: 'ongoing',
			isComplete: false,
			dueDate: new Date()
		}
	],
	type: {}
}));


describe('taskStore', () => {
	beforeEach(() => {
		localStorage.clear();
		taskStore.set([
			{
				id: 't1',
				title: 'Task One',
				description: 'First test task',
				category: 'work' as Category,
				priority: 'high' as Priority,
				status: 'ongoing' as Status,
				isComplete: false,
				dueDate: new Date(),
				createdAt: new Date()
			}
		]);
	});

	it('loads initial tasks correctly', () => {
		const value = get(taskStore);
		expect(value).toHaveLength(1);
		expect(value[0].title).toBe('Task One');
	});

	it('creates a new task', async () => {
		const data = {
			title: 'New Task',
			description: 'A test task',
			category: 'personal' as Category,
			priority: 'low' as Priority,
			status: 'ongoing' as Status,
			dueDate: new Date()
		};

		const result = await createTask(data);
		const value = get(taskStore);

		expect(result.status).toBe(200);
		expect(value.length).toBe(2);
		expect(value.find((t) => t.title === 'New Task')).toBeTruthy();
	});

	it('edits an existing task', async () => {
		await editTask('t1', {
			title: 'Updated Task Title',
			description: 'Updated description',
			category: 'work' as Category,
			priority: 'medium' as Priority,
			status: 'completed' as Status,
			dueDate: new Date()
		});

		const value = get(taskStore);
		expect(value[0].title).toBe('Updated Task Title');
		expect(value[0].status).toBe('completed');
	});

	it('deletes a task by id', () => {
		const result = deleteTasks('t1');
		const value = get(taskStore);

		expect(result.status).toBe(200);
		expect(value.find((t) => t.id === 't1')).toBeFalsy();
	});

	it('toggles completion of a task', () => {
		toggleComplete('t1');
		const value = get(taskStore);
		const task = value.find((t) => t.id === 't1');

		expect(task?.isComplete).toBe(true);
		expect(task?.status).toBe('completed');

		toggleComplete('t1');
		const toggledAgain = get(taskStore).find((t) => t.id === 't1');
		expect(toggledAgain?.isComplete).toBe(false);
		expect(toggledAgain?.status).toBe('ongoing');
	});

	it('retrieves a single task', () => {
		const task = getTask('t1') as unknown as Task;
		expect(task?.id).toBe('t1');
		expect(task?.title).toBe('Task One');
	});

	it('throws error when deleting nonexistent task', () => {
		expect(() => deleteTasks('unknown')).toThrowError('User not found');
	});
});
