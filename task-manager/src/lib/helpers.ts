import type { Priority, Task } from '../database/index.js';
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
	return hoursUntilDue <= 48 && hoursUntilDue >= 0;
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

	const timeDiffHours = Math.max(0, 48 - hoursUntilDue);

	let dueScore = 0;

	if (timeDiffHours <= 48 && timeDiffHours >= 0) {
		dueScore = (timeDiffHours / 48) * 10;
	} else if (hoursUntilDue < 0) {
		// Considering overdue periods
		dueScore = 10;
	}

	const completePenalty = task.isComplete ? -5 : 0;

	return priorityScore * 10 + dueScore + completePenalty;
}

export function categorizeAndSortTasks(tasks: Task[]) {
	// Calculate score for each task
	const scoredTasks = tasks.map((t) => ({
		...t,
		sortScore: computeTaskSortScore(t)
	}));

	const quadrants = {
		urgentImportant: scoredTasks.filter((t) => isUrgent(t) && isImportant(t)),
		notUrgentImportant: scoredTasks.filter((t) => !isUrgent(t) && isImportant(t)),
		urgentNotImportant: scoredTasks.filter((t) => isUrgent(t) && !isImportant(t)),
		notUrgentNotImportant: scoredTasks.filter((t) => !isUrgent(t) && !isImportant(t))
	};

	// Sort tasks inside each quadrant (higher score = higher priority)
	for (const key in quadrants) {
		quadrants[key as keyof typeof quadrants].sort(
			(a, b) => (b.sortScore ?? 0) - (a.sortScore ?? 0)
		);
	}

	return quadrants;
}
