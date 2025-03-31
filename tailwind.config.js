/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Category colors
        category: {
          food: "hsl(var(--food))",
          travel: "hsl(var(--travel))",
          books: "hsl(var(--books))",
          outdoors: "hsl(var(--outdoors))",
          music: "hsl(var(--music))",
          shopping: "hsl(var(--shopping))",
          entertainment: "hsl(var(--entertainment))",
        },
        // Named colors for direct reference
        "soft-periwinkle": "#D0D4F9",
        "surface-white": "#F9F9FD",
        "deep-indigo": "#2B2D42",
        "accent-blue": "#7B91C9",
        "accent-lavender": "#9F9BC8",
        "signal-purple": "#6665A2",
        mint: "#B8E1DD",
        "soft-coral": "#F3BDB5",
        sand: "#E8DBC5",
        mist: "#DADBE9",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "periwinkle-sm": "0 1px 2px 0 rgba(208, 212, 249, 0.3)",
        "periwinkle-md": "0 4px 6px -1px rgba(208, 212, 249, 0.4), 0 2px 4px -1px rgba(208, 212, 249, 0.1)",
        "periwinkle-lg": "0 10px 15px -3px rgba(208, 212, 249, 0.5), 0 4px 6px -2px rgba(208, 212, 249, 0.1)",
        "blue-sm": "0 1px 2px 0 rgba(123, 145, 201, 0.3)",
        "blue-md": "0 4px 6px -1px rgba(123, 145, 201, 0.4), 0 2px 4px -1px rgba(123, 145, 201, 0.1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "pulse-colors": {
          "0%, 100%": { backgroundColor: "#D0D4F9" }, // Soft Periwinkle
          "25%": { backgroundColor: "#7B91C9" }, // Accent Blue
          "50%": { backgroundColor: "#9F9BC8" }, // Accent Lavender
          "75%": { backgroundColor: "#DADBE9" }, // Mist
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-colors": "pulse-colors 8s infinite",
      },
      backgroundImage: {
        "gradient-periwinkle": "linear-gradient(to right, #D0D4F9, #9F9BC8)",
        "gradient-blue-lavender": "linear-gradient(to right, #7B91C9, #9F9BC8)",
        "gradient-nav": "linear-gradient(to bottom, #D0D4F9, #C0C4E9)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

