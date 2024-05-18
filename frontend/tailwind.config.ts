import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        inter: 'Inter',
        'bio-t14b': 'var(--bio-t14b-font-family)',
        'bio-t16r': 'var(--bio-t16r-font-family)',
        'bio-t20b': 'var(--bio-t20b-font-family)',
        'body-t14r': 'var(--body-t14r-font-family)',
        'body-t16r': 'var(--body-t16r-font-family)',
        'headline-h14b': 'var(--headline-h14b-font-family)',
        'headline-h16b': 'var(--headline-h16b-font-family)',
        'headline-h20b': 'var(--headline-h20b-font-family)',
        'headline-h32b': 'var(--headline-h32b-font-family)',
        'headline-h44b': 'var(--headline-h44b-font-family)',
        link: 'var(--link-font-family)',
        'sub-headline-s12b': 'var(--sub-headline-s12b-font-family)',
      },
    },
  },
  plugins: [],
};
export default config;
