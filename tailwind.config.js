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
			dark: '#271F30',
			// dark: '#00171C',
			dark80: 'rgba(39, 31, 48, 0.8)',
			dark70: 'rgba(39, 31, 48, 0.7)',
			dark30: 'rgba(39, 31, 48, 0.3)',
			dark10: 'rgba(39, 31, 48, 0.1)',
			// blue: '#073147',
			blue: '#027B83',
			blue70: 'rgba(2, 123, 131, 0.7)',
			blue40: 'rgba(2, 123, 131, 0.4)',

			orange: '#EE7430',
			orange70: 'rgba(2, 123, 131, 0.7)',
			white: '#FFFFFF',
			light: '#F8F8F8',
			light30: 'rgba(248, 248, 248, 0.3)',
			light40: 'rgba(248, 248, 248, 0.4)',
			light80: 'rgba(248, 248, 248, 0.8)',
			light90: 'rgba(248, 248, 248, 0.9)',
			light10: 'rgba(248, 248, 248, 0.1)'
		},
		extend: {
			fontFamily: {
				poppins: ['Poppins', 'sans'],
				notosans: ['Lato', 'sans']
			},
			backgroundImage: {
				cardGradient:
					'linear-gradient(179.67deg, rgba(0, 0, 0, 0.112) 59.34%, rgba(0, 0, 0, 0.359589) 70.98%, rgba(0, 0, 0, 0.7) 80.4%)',
				heroGradient3:
					'linear-gradient(207.57deg, rgba(0, 0, 0, 0) 23.01%, rgba(0, 23, 28, 0.6) 83.69%)',
				heroGradient2:
					'linear-gradient(191.08deg, rgba(0, 0, 0, 0) 4.04%, rgba(0, 23, 28, 0.6) 79.39%)',
				heroGradient:
					'linear-gradient(170.8deg, rgba(0, 0, 0, 0) 10.67%, rgba(0, 0, 0, 0.59) 102.38%)'
			}
		}
	},

	plugins: [aspectRatio]
};
