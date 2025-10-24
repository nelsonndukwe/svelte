import { screenSizeState } from '../stores/dashboard.store.js';
export const SIDEBAR_KEYBOARD_SHORTCUT = 'b'; // or any key you like

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

export function toggleSidebar() {
	screenSizeState.update((state) => {
		if (state.isMobile) {
			return { ...state, openMobile: !state.openMobile };
		} else {
			return { ...state, open: !state.open };
		}
	});
}
