import { defineNuxtConfig } from "nuxt/config"
import tsconfigPaths from "vite-tsconfig-paths"

import fs from 'fs'
import path from 'path'

const pagesPath = path.join(process.cwd(), 'public/data/pages.json')
let routes: string[] = ['/']

try {
  const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf-8'))
  routes = ['/', ...pages.map((page: any) => page.slug)]
} catch (error) {
  console.warn('Could not load pages.json for prerendering')
}


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
		baseURL: process.env.NUXT_APP_BASE_URL || '/',
    buildAssetsDir: '/_nuxt/',
		pageTransition: { name: "page", mode: "out-in" },
		head: {
			link: [
				{ rel: "icon", type: "image/png", href: "favicon-96x96.png", sizes: "96x96" },
				{ rel: "icon", type: "image/svg+xml", href: "favicon.svg" },
				{ rel: "shortcut icon", href: "favicon.ico" },
				{ rel: "apple-touch-icon", sizes: "180x180", href: "apple-touch-icon.png" }
			],
			meta: [{ name: "apple-mobile-web-app-title", content: "Portfolio" }]
		}
	},
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	css: ["~/assets/css/tailwind.css"],
	experimental: {
    inlineSSRStyles: false
  },
	components: [
		{
			path: "~/components",
			pathPrefix: false
		}
	],
	modules: ["@nuxtjs/color-mode", "@nuxtjs/tailwindcss", "@nuxt/fonts", "@nuxt/image", "@nuxt/eslint", "@nuxt/icon"],
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
		public: {
			wpBase: process.env.WP_BASE_URL || "https://content.local",
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
		preset: "static",
		externals: {
			inline: ["ipx", "ofetch"]
		},
		devProxy: {
			"/api/wp": {
				target: "https://content.local",
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api\/wp/, "")
			}
		},
		prerender: {
      routes: routes,
      crawlLinks: false
    }
	},
	build: {
    extractCSS: true
  }
})
