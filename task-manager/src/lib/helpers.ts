import type { Category, Priority, Status, Task } from '../database/index.js';
export const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

export const getGreeting = (): string => {
	const currentTime = new Date();
	const currentHour = currentTime.getHours();

	if (currentHour >= 5 && currentHour < 12) {
		return 'Good morning';
	} else if (currentHour >= 12 && currentHour < 18) {
		return 'Good afternoon';
	} else if (currentHour >= 18 && currentHour < 22) {
		return 'Good evening';
	} else {
		return 'Good night';
	}
};

export function isUrgent(task: Task): boolean {
	if (!task.dueDate) return false;
	const now = Date.now();
	const due = new Date(task.dueDate).getTime();
	const hoursUntilDue = (due - now) / (1000 * 60 * 60);
	return (hoursUntilDue <= 48 && hoursUntilDue >= 0 || hoursUntilDue <= 0) ;
}

export function isImportant(task: Task): boolean {
	const priorityValue = getPriorityValue(task.priority);
	return priorityValue >= 3;
}

export const priorityWeights: Record<Priority, number> = {
	High: 3,
	Medium: 2,
	Low: 1
};

export function getPriorityValue(priority: Priority): number {
	return priorityWeights[priority] || 0;
}
export function computeTaskSortScore(task: Task): number {
	const priorityScore = getPriorityValue(task.priority);

	const now = new Date().getTime();
	const due = new Date(task.dueDate).getTime();
	const hoursUntilDue = (due - now) / (1000 * 60 * 60);

	let dueScore = 0;

	if (hoursUntilDue <= 0) {
		// Overdue → maximum urgency
		dueScore = 10;
	} else if (hoursUntilDue <= 48) {
		// Within next 48 hours — scale inversely:
		// due in 0h → 10 points, due in 48h → near 0
		dueScore = Math.max(0, ((48 - hoursUntilDue) / 48) * 10);
	} else {
		// More than 48h away — very low urgency
		dueScore = 0;
	}

	// Combine with priority weight (multiplied for greater separation)
	const finalScore = priorityScore * 10 + dueScore;

	return finalScore;
}

export function categorizeAndSortTasks(tasks: Task[]) {
	const scoredTasks = tasks.map((t) => ({
		...t,
		sortScore: computeTaskSortScore(t)
	}));

	const quadrants = {
		urgentImportant: scoredTasks
			.filter((t) => isUrgent(t) && isImportant(t))
			.sort((a, b) => (b.sortScore ?? 0) - (a.sortScore ?? 0)),

		notUrgentImportant: scoredTasks
			.filter((t) => !isUrgent(t) && isImportant(t))
			.sort((a, b) => (b.sortScore ?? 0) - (a.sortScore ?? 0)),

		urgentNotImportant: scoredTasks
			.filter((t) => isUrgent(t) && !isImportant(t))
			.sort((a, b) => (b.sortScore ?? 0) - (a.sortScore ?? 0)),

		notUrgentNotImportant: scoredTasks
			.filter((t) => !isUrgent(t) && !isImportant(t))
			.sort((a, b) => (b.sortScore ?? 0) - (a.sortScore ?? 0))
	};

	return quadrants;
}

export const statusState: Record<Status, string> = {
	pending: '⏳ Pending',
	ongoing: '🚧 Ongoing',
	completed: '✅ Completed'
};

export const priorityState: Record<Priority, string> = {
	High: '🔴 High',
	Medium: '🟡 Medium',
	Low: '🟢 Low'
};

export const categoryState: Record<Category, string> = {
	Work: '💼 Work',
	Personal: '🏠 Personal',
	Finance: '💰 Finance',
	Other: '🗂️ Other'
};
