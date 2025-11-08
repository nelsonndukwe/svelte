import { writable, derived, type Readable } from 'svelte/store';

export const searchQuery = writable('');


export function useDebounced<T>(value: Readable<T>, delay = 300): Readable<T> {
	let timeout: ReturnType<typeof setTimeout> | null = null;

	return derived(value, ($value, set) => {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => set($value), delay);

		return () => {
			if (timeout) clearTimeout(timeout);
		};
	});
}

export function useThrottled<T>(value: Readable<T>, limit = 300): Readable<T> {
	let lastTime = 0;
	let scheduled: ReturnType<typeof setTimeout> | null = null;

	return derived(value, ($value, set) => {
		const now = Date.now();
		const diff = now - lastTime;

		if (diff >= limit) {
			lastTime = now;
			set($value);
		} else {
			if (scheduled) clearTimeout(scheduled);
			scheduled = setTimeout(() => {
				lastTime = Date.now();
				set($value);
			}, limit - diff);
		}
	});
}
