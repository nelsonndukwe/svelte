import { writable } from 'svelte/store';

const isMobile = window.matchMedia('(max-width: 768px)').matches;
const open = false;
const openMobile = false;

export const screenSizeState = writable({ isMobile, open, openMobile });

screenSizeState.subscribe((value) => {
	localStorage.setItem('dashboard-state', JSON.stringify(value));
	window.addEventListener('resize', (event) => {
		if (event.target instanceof Window) {
			const isMobile = event.target.innerWidth <= 768;
			screenSizeState.update((state) => ({ ...state, isMobile }));
		}
	});
});
