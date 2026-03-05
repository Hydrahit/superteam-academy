import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        surface: "var(--surface)",
        primary: "var(--primary-text)",
        secondary: "var(--secondary-text)",
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
        },
        border: "var(--border)",
        semantic: {
          success: "var(--success)",
          warning: "var(--warning)",
          error: "var(--error)",
          info: "var(--info)",
        }
      },
      spacing: {
        // HIG 8px Grid System
        tight: "8px",
        base: "16px",
        medium: "24px",
        large: "32px",
        xl: "48px",
        section: "64px",
        hero: "128px",
      },
      boxShadow: {
        'aura-card': '0px 4px 20px rgba(26, 28, 35, 0.05)',
      }
    },
  },
  plugins: [],
};
export default config;
