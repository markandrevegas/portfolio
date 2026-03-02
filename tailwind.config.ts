// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
	darkMode: "class",
	content: ["./components/**/*.{vue,js,ts}", "./layouts/**/*.{vue,js,ts}", "./pages/**/*.{vue,js,ts}", "./app.vue"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "sans-serif"]
			},
			letterSpacing: {
				widest: ".25em"
			},
			colors: {
				palladian: "oklch(0.9352 0.0144 84.58)",
				abyssal: "oklch(0.264 0.0274 251.05)"
			}
		}
	},
	plugins: []
}

export default config
