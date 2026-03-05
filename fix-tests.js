const fs = require('fs');
const path = require('path');

console.log('✨ INITIATING AURA DESIGN SYSTEM INJECTION...');

const rootDir = process.cwd();

const ensureDir = (dirPath) => {
  const fullPath = path.join(rootDir, dirPath);
  if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true });
};

// 1. GENERATE GLOBALS.CSS (CSS Variables for Light/Dark Mode)
const cssPath = path.join(rootDir, 'app/globals.css'); // Adjust if using src/app/
const cssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* AURA Light Mode Tokens */
    --canvas: #F8F7F4;
    --surface: #FFFFFF;
    --primary-text: #1A1C23;
    --secondary-text: #6B6D76;
    --accent: #8B9D8E;
    --accent-hover: #7A8A7C;
    --border: #D8D1C5;
    
    /* Semantic */
    --success: #34C759;
    --warning: #FF9500;
    --error: #FF3B30;
    --info: #007AFF;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      /* AURA Dark Mode Tokens (Inverted for OLED efficiency) */
      --canvas: #000000;
      --surface: #1C1C1E;
      --primary-text: #F2F2F7;
      --secondary-text: #8E8E93;
      --accent: #A1B5A4;
      --accent-hover: #8B9D8E;
      --border: #38383A;
    }
  }

  body {
    background-color: var(--canvas);
    color: var(--primary-text);
    /* SF Pro Font Stack */
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
}

@layer utilities {
  .radius-continuous {
    border-radius: 14px;
    /* Webkit specific squircle for HIG accuracy */
    -webkit-border-radius: 14px;
  }
}
`;
fs.writeFileSync(cssPath, cssContent);

// 2. GENERATE TAILWIND CONFIG
const tailwindPath = path.join(rootDir, 'tailwind.config.ts');
const tailwindContent = `import type { Config } from "tailwindcss";

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
`;
fs.writeFileSync(tailwindPath, tailwindContent);

// 3. GENERATE THE HIG BUTTON COMPONENT
ensureDir('src/components/ui');
const buttonPath = path.join(rootDir, 'src/components/ui/Button.tsx');
const buttonContent = `'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', isLoading, children, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none radius-continuous h-[44px] md:h-[50px] px-5 text-[17px]";
    
    const variants = {
      primary: "bg-accent text-white hover:bg-accent-hover",
      secondary: "bg-surface text-primary border border-border shadow-sm hover:bg-black/5 dark:hover:bg-white/5",
      ghost: "bg-transparent text-primary hover:bg-black/5 dark:hover:bg-white/5",
      destructive: "bg-semantic-error/10 text-semantic-error hover:bg-semantic-error/20",
    };

    return (
      <button 
        ref={ref}
        className={\`\${baseStyles} \${variants[variant]} \${className}\`}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
`;
fs.writeFileSync(buttonPath, buttonContent);

console.log('✅ AURA SYSTEM INJECTED SUCCESSFULLY.');
console.log('Updated: globals.css, tailwind.config.ts');
console.log('Created: src/components/ui/Button.tsx');