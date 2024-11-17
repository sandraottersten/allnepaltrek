import aspectRatio from '@tailwindcss/aspect-ratio';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: {
			sm: '768px',
			md: '1024px',
			lg: '1440px',
			xl: '1620px'
		},
		colors: {
			dark: '#00171C',
			dark70: 'rgba(0, 23, 28, 0.7)',
			dark30: 'rgba(0, 23, 28, 0.3)',
			dark10: 'rgba(0, 23, 28, 0.1)',
			blue: '#073147',
			blue70: 'rgba(7, 49, 71, 0.7)',
			blue40: 'rgba(7, 49, 71, 0.4)',
			orange: '#EE7430',
			orange70: 'rgba(238, 116, 48, 0.7)',
			light: '#FFFFFF',
			light30: 'rgba(255, 255, 255, 0.3)',
			light80: 'rgba(255, 255, 255, 0.8)',
			light10: 'rgba(255, 255, 255, 0.1)'
		},
		extend: {
			fontFamily: {
				poppins: ['Poppins', 'sans']
			},
			backgroundImage: {
				cardGradient:
					'linear-gradient(179.67deg, rgba(0, 0, 0, 0.112) 59.34%, rgba(0, 0, 0, 0.359589) 70.98%, rgba(0, 0, 0, 0.7) 80.4%)'
			}
		}
	},

	plugins: [aspectRatio]
};
