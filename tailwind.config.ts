import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { syne: ['Syne', 'sans-serif'], sans: ['Bricolage Grotesque', 'sans-serif'], mono: ['JetBrains Mono', 'monospace'] },
      colors: { solana: { green: "#14F195", purple: "#9945FF" }, aura: { cyan: "#00E5FF", yellow: "#FFE500" } }
    },
  },
  plugins: [],
} satisfies Config;
