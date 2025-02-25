import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: ['class'],
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                overlay: {
                    DEFAULT:
                        'hsla(var(--overlay-color), var(--tw-bg-opacity,1))',
                },
                primary: {
                    DEFAULT: 'hsla(var(--primary), var(--tw-bg-opacity,1))',
                },
                'primary-text': {
                    DEFAULT:
                        'hsla(var(--primary-text), var(--tw-bg-opacity,1))',
                },
                'pure-white': 'hsla(0, 0%, 100%, 1)',
                'bright-turquoise':
                    'hsla(var(--bright-turquoise), var(--tw-bg-opacity,1))',
                'ultramarine-blue':
                    'hsla(var(--ultramarine-blue), var(--tw-bg-opacity,1))',
                'light-cyan': 'hsla(var(--light-cyan), var(--tw-bg-opacity,1))',
                'lavender-blue':
                    'hsla(var(--lavender-blue), var(--tw-bg-opacity,1))',
                'peach-pink': 'hsla(var(--peach-pink), var(--tw-bg-opacity,1))',
                'red-orange': 'hsla(var(--red-orange), var(--tw-bg-opacity,1))',
                'bright-gray':
                    'hsla(var(--bright-gray), var(--tw-bg-opacity,1))',
                black: 'hsla(var(--black), var(--tw-bg-opacity,1))',
                red: 'hsla(var(--red), var(--tw-bg-opacity,1))',
                'sky-blue': 'hsla(var(--sky-blue), var(--tw-bg-opacity,1))',
                'bright-cyan':
                    'hsla(var(--bright-cyan), var(--tw-bg-opacity,1))',
                'light-apricot':
                    'hsla(var(--light-apricot), var(--tw-bg-opacity,1))',
                'vivid-orange':
                    'hsla(var(--vivid-orange), var(--tw-bg-opacity,1))',
                'pastel-violet':
                    'hsla(var(--pastel-violet), var(--tw-bg-opacity,1))',
                'vivid-violet':
                    'hsla(var(--vivid-violet), var(--tw-bg-opacity,1))',
                'rich-black': 'hsla(var(--rich-black), var(--tw-bg-opacity,1))',
                gray: 'hsla(var(--gray), var(--tw-bg-opacity,1))',
                'border-color': 'hsla(var(--border-c), var(--tw-bg-opacity,1))',
                background: {
                    DEFAULT: 'hsla(var(--white), var(--tw-bg-opacity,1))',
                    foreground:
                        'hsla(var(--light-gray), var(--tw-bg-opacity,1))',
                },
                'light-gray': 'hsla(var(--light-gray), var(--tw-bg-opacity,1))',
                'lavender-mist':
                    'hsla(var(--lavender-mist), var(--tw-bg-opacity,1))',
                'solid-vivid-orange':
                    'hsla(var(--solid-vivid-orange), var(--tw-bg-opacity,1))',
                'solid-sunset-gold':
                    'hsla(var(--solid-sunset-gold), var(--tw-bg-opacity,1))',
                'solid-royal-purple':
                    'hsla(var(--solid-royal-purple), var(--tw-bg-opacity,1))',
                'solid-sky-blue':
                    'hsla(var(--solid-sky-blue), var(--tw-bg-opacity,1))',
                'solid-hot-pink':
                    'hsla(var(--solid-hot-pink), var(--tw-bg-opacity,1))',
                'solid-saffron-orange':
                    'hsla(var(--solid-saffron-orange), var(--tw-bg-opacity,1))',
                white: 'hsla(var(--white), var(--tw-bg-opacity,1))',
                border: 'hsl(var(--border))',
                ring: 'hsl(var(--ring))',
                sidebar: {
                    DEFAULT: 'hsl(var(--sidebar-background))',
                    foreground: 'hsl(var(--sidebar-foreground))',
                    primary: 'hsl(var(--sidebar-primary))',
                    'primary-foreground':
                        'hsl(var(--sidebar-primary-foreground))',
                    accent: 'hsl(var(--sidebar-accent))',
                    'accent-foreground':
                        'hsl(var(--sidebar-accent-foreground))',
                    border: 'hsl(var(--sidebar-border))',
                    ring: 'hsl(var(--sidebar-ring))',
                },
            },
            keyframes: {
                'accordion-down': {
                    from: {
                        height: '0',
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)',
                    },
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)',
                    },
                    to: {
                        height: '0',
                    },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1440px',
            },
        },
    },
    plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar')],
};
export default config;
