const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'), ...createGlobPatternsForDependencies(__dirname)],
    darkMode: ['selector', 'html[data-theme="dark"]'],
    important: true,
    theme: {
        colors: {
            // gray: {
            //     1000: 'var(--gray--1000)',
            //     900: 'var(--gray--900)',
            //     800: 'var(--gray--800)',
            //     700: 'var(--gray--700)',
            //     600: 'var(--gray--600)',
            //     500: 'var(--gray--500)',
            //     400: 'var(--gray--400)',
            //     300: 'var(--gray--300)',
            //     200: 'var(--gray--200)',
            //     100: 'var(--gray--100)',
            //     50: 'var(--gray--50)',
            // },
            // 'primary-contrast': {
            //     light: 'var(--gray-900)',
            //     dark: 'var(--gray-50)',
            // },
            // 'secondary-contrast': {
            //     light: 'var(--gray-800)',
            //     dark: 'var(--gray-300)',
            // },
            // 'tertiary-contrast': {
            //     light: 'var(--gray-700)',
            //     dark: 'var(--gray-300)',
            // },
            // 'quaternary-contrast': {
            //     light: 'var(--gray-500)',
            //     dark: 'var(--gray-400)',
            // },
            // 'quinary-contrast': {
            //     light: 'var(--gray-300)',
            //     dark: 'var(--gray-500)',
            // },
            // 'senary-contrast': {
            //     light: 'var(--gray-200)',
            //     dark: 'var(--gray-700)',
            // },
            // 'septenary-contrast': {
            //     light: 'var(--gray-100)',
            //     dark: 'var(--gray-800)',
            // },
            // 'octonary-contrast': {
            //     light: 'var(--gray-50)',
            //     dark: 'var(--gray-900)',
            // },
            'efx-red': 'oklch(45.66% 0.164 18.13)',
            'efx-gray': 'oklch(35.80% 0.023 245.93)',
        },
        fontFamily: {
            sans: ['"Inter"', 'sans-serif'],
        },
    },
    daisyui: {
        themes: [
            {
                light: {
                    ...require('daisyui/src/theming/themes')['light'],
                    // primary: 'oklch(54.48% 0.207 22.47)',
                    // secondary: 'oklch(45.66% 0.164 18.13)', // efx red
                    // '--rounded-btn': '1.9rem',
                    // '--rounded-box': '1rem'
                },
                dark: {
                    ...require('daisyui/src/theming/themes')['dark'],
                    // 'base-100': 'oklch(18.69% 0.006 196.63)'
                    //primary: 'oklch(54.48% 0.207 22.47)',
                    //secondary: 'oklch(45.66% 0.164 18.13)', // efx red
                    //'base-100': 'oklch(16.93% 0.004 285.95)',
                    // '--rounded-btn': '1.9rem',
                    // '--rounded-box': '1rem'
                },
            },
        ],
        darkTheme: 'dark',
        base: true,
        styled: true,
        utils: true,
        prefix: '',
        logs: true,
        themeRoot: ':root',
    },
    plugins: [
        require('daisyui'),
        plugin(({ addBase }) =>
            addBase({
                h1: {
                    fontFamily: 'Inter Tight',
                    fontSize: '2rem',
                    fontWeight: 600,
                    lineHeight: '2.75rem',
                    // marginBottom: '2rem',
                },
                h2: {
                    fontFamily: 'Inter Tight',
                    fontSize: '1.75rem',
                    fontWeight: 600,
                    lineHeight: '2.25rem',
                    // marginBottom: '1.5rem',
                },
                h3: {
                    fontFamily: 'Inter Tight',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    lineHeight: '2rem',
                    // marginBottom: '1rem',
                },
                h4: {
                    fontFamily: 'Inter Tight',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    lineHeight: '1.75rem',
                    // marginBottom: '0.75rem',
                },
                h5: {
                    fontFamily: 'Inter Tight',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    lineHeight: '1.5rem',
                    // marginBottom: '0.75rem',
                },
                h6: {
                    fontFamily: 'Inter Tight',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    lineHeight: '1.5rem',
                    // marginBottom: '0.75rem',
                },
            }),
        ),
    ],
};
