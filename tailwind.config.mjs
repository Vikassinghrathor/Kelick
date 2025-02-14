/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "justify-center",
    "items-center",
    "lg:min-w-1/4",
    "w-1/2",
    "w-40",
    "w-2",
    "w-44",
    "w-[24px]",
    "w-[450px]",
    "h-[300px]",
    "h-[24px]",
    "h-2",
    "gap-2",
    "gap-4",
    "rounded-xl",
    "bg-light-gray-400",
    "bg-light-teal-100",
    "bg-light-gray-500",
    "bg-light-gray-300",
    "bg-light-purple-100",
    "bg-light-purple-200",
    "border-light-gray-200",
    "border-[1px]",
    "px-4",
    "mt-7",
    "text-white",
    "text-light-teal",
    "text-light-gray-300",
    "text-light-purple-100",
  ],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"], // Add Quicksand font here
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "light-gray": "#7A8484",
        "light-gray-100": "#F2F5F5",
        "light-gray-200": "#B3BEBE",
        "light-gray-300": "#5F6969",
        "light-gray-400": "#F9FCFC",
        "light-gray-500": "#F1F5F9",
        "dark-gray": "#2E3333",
        "primary-black": "#1A1A1A",
        "light-teal": "#02B9B0",
        "light-teal-100": "#E2FFFD",
        "light-purple-100": "#8318E7",
        "light-purple-200": "#F2E5FF",
      },
      animation: {
        "spin-ccw": "spin-ccw 2s linear infinite",
      },
      keyframes: {
        "spin-ccw": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
      },
    },
  },
  plugins: [],
};
