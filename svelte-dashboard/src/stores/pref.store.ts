import { writable } from 'svelte/store';

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const systemTheme = prefersDark ? 'dark' : 'light';

const savedPref = localStorage.getItem('user-pref');

const initial = savedPref
	? JSON.parse(savedPref)
	: {
			theme: systemTheme, // default to system theme
			user: null // no user logged in initially
		};

export const userPreferenceState = writable(initial);

userPreferenceState.subscribe((value) => {
	localStorage.setItem('user-pref', JSON.stringify(value));
	// Update Tailwind theme class
	document.documentElement.classList.toggle('dark', value.theme === 'dark');
});
