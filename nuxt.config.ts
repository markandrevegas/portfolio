import { defineNuxtConfig } from "nuxt/config"
import tsconfigPaths from "vite-tsconfig-paths"

/*if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}*/

// Extend the NuxtConfig type
declare module "nuxt/schema" {
	interface NuxtConfig {
		content?: {
			[key: string]: unknown
		}
		fonts?: {
			provider?: string
			assets?: {
				[key: string]: unknown
			}
			families?: Array<{
				name: string
				weights?: number[]
				styles?: string[]
				subsets?: string[]
				variants?: string[]
				[key: string]: unknown
			}>
		}
		image?: {
			quality?: number
			domains?: string[]
			providers?: {
				[key: string]: {
					name: string
					provider: string
					options?: {
						baseURL?: string
						[key: string]: unknown
					}
				}
			}
		}
		nitro?: {
			preset?: string
			externals?: {
				inline?: string[]
				[key: string]: unknown
			}
			[key: string]: unknown
		}
		routeRules?: {
			[key: string]: {
				isr?: number | boolean
				ssr?: boolean
				cache?: {
					maxAge?: number
					[key: string]: unknown
				}
				[key: string]: unknown
			}
		}
	}

	interface NuxtOptions {
		image?: NuxtConfig["image"]
	}
}

export default defineNuxtConfig({
	dir: {
		app: "app"
	},
	app: {
		baseURL: "/portfolio/",
		head: {
			link: [
				{ rel: "icon", type: "image/png", href: "/favicon-96x96.png", sizes: "96x96" },
				{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
				{ rel: "shortcut icon", href: "/favicon.ico" },
				{ rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" }
			],
			meta: [{ name: "apple-mobile-web-app-title", content: "Scratch" }]
		}
	},
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	css: ["~/assets/css/tailwind.css"],
	components: [
		{
			path: "~/components",
			pathPrefix: false
		}
	],
	modules: ["@nuxtjs/color-mode", "@nuxtjs/tailwindcss", "@nuxt/fonts", "@nuxt/image", "@nuxt/eslint", "@nuxt/icon", "@nuxt/content"],
	fonts: {
		provider: "google",
		assets: {},
		families: [
			{
				name: "Jost",
				weights: [100, 200, 300, 400, 500, 600, 700]
			},
			{
				name: "Inter",
				weights: [100, 200, 300, 400, 500, 600, 700, 800, 900]
			}
		]
	},
	image: {
		providers: {
			placehold: {
				name: "placehold",
				provider: "ipx",
				options: {
					baseURL: "https://placehold.co/48x48"
				}
			}
		},
		domains: ["placehold.co"],
		quality: 80
	},
	runtimeConfig: {
		unsplashAccessKey: process.env.NUXT_UNSPLASH_ACCESS_KEY,
		contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID,
		contentfulAccessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
		public: {
			wpBase: process.env.WP_URL || "https://content.local",
			apiPrefix: "/portfolio/api/wp",
			// wpBase: "/portfolio/api/wp",
			contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID,
			contentfulAccessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
			unsplashBase: process.env.NUXT_UNSPLASH_BASE || "https://api.unsplash.com",
			fonts: {
				selfHosted: false
			}
		}
	},
	vite: {
		server: {
      allowedHosts: ["portfolio.local"]
    },
		plugins: [tsconfigPaths()]
	},
	nitro: {
		preset: "node-server",
		externals: {
			inline: ["ipx", "ofetch"]
		},
		devProxy: {
			"/portfolio/api/wp": {
				target: "https://content.local",
				changeOrigin: true,
				secure: false,
				// Ensure the /wp-json part is appended correctly
				rewrite: (path) => path.replace(/^\/portfolio\/api\/wp/, '')
			}
		}
	},
	content: {},
	routeRules: {
		"/": { ssr: true }
	}
})
