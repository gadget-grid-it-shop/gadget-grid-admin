/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary": "var(--primary)",
        "bright-turquoise": "var(--bright-turquoise)",
        "ultramarine-blue": "var(--ultramarine-blue)",
        "light-cyan": "var(--light-cyan)",
        "lavender-blue": "var(--lavender-blue)",
        "peach-pink": "var(--peach-pink)",
        "red-orange": "var(--red-orange)",
        "dim-gray": "var(--dim-gray)",
        "black": "var(--black)",
        "sky-blue": "var(--sky-blue)",
        "bright-cyan": "var(--bright-cyan)",
        "light-apricot": "var(--light-apricot)",
        "vivid-orange": "var(--vivid-orange)",
        "pastel-violet": "var(--pastel-violet)",
        "vivid-violet": "var(--vivid-violet)",
        "rich-black": "var(--rich-black)",
        "gray": "var(--gray)",
        "light-gray": "var(--light-gray)",
        "lavender-mist": "var(--lavender-mist)",
        "solid-vivid-orange": "var(--solid-vivid-orange)",
        "solid-sunset-gold": "var(--solid-sunset-gold)",
        "solid-royal-purple": "var(--solid-royal-purple)",
        "solid-sky-blue": "var(--solid-sky-blue)",
        "solid-hot-pink": "var(--solid-hot-pink)",
        "solid-saffron-orange": "var(--solid-saffron-orange)",
        "white": "var(--white)",
      }
    },
  },
  plugins: [

  ],
};
