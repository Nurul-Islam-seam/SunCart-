import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config & { daisyui?: any } = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 20px rgba(99,102,241,0.25)',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        suncart: {
          'primary': '#7c3aed',
          'secondary': '#fb923c',
          'accent': '#06b6d4',
          'neutral': '#111827',
          'base-100': '#ffffff',
          '--rounded-box': '1rem',
        },
      },
    ],
  },
};

export default config;
