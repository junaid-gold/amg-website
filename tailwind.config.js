/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme"

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    fontFamily: {
      "theme-font-extra-bold": [
        "NeueHaasDisplayBlack",
        ...defaultTheme.fontFamily.sans,
      ],
      "theme-font-bold": [
        "NeueHaasDisplayBold",
        ...defaultTheme.fontFamily.sans,
      ],
      "theme-font-light": [
        "NeueHaasDisplayLight",
        ...defaultTheme.fontFamily.sans,
      ],
      "theme-font-thin": [
        "NeueHaasDisplayThin",
        ...defaultTheme.fontFamily.sans,
      ],
      "theme-font-medium": [
        "NeueHaasDisplayMediu",
        ...defaultTheme.fontFamily.sans,
      ],
      "theme-font-roman": [
        "NeueHaasDisplayRoman",
        ...defaultTheme.fontFamily.sans,
      ],
      "theme-font-light-italic": [
        "NeueHaasDisplayLightItalic",
        ...defaultTheme.fontFamily.sans,
      ],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontSize: {
      xs: "0.7rem",
      sm: "0.8rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    extend: {
      boxShadow: {
        ...defaultTheme.boxShadow,
        "theme-shadow": "0px -10.48px 10.48px 0px #8883F01A",
        "selected-shadow": "0px 0px 19.2px 0px #9747FF66",
        "selected-shadow-hover": "0px 0px 19.2px 0px #999",
      },
      colors: {
        white: "#F8F7F3",
        errorText: "#e11900",
        "container-bg": "#F8F7F3",
        "theme-gray": "#EBEAE2",
        "theme-green": "#48BF71",
        "theme-black": "#100F0F",
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        slideIn: "slideIn 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
