/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				quattrocento: ['Quattrocento', 'sans-serif'],
				sacramento: ['Sacramento', 'cursive'],
				urbanist: ['Urbanist', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
