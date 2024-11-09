import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar';
import type { UserConfig } from 'vitepress';
import { groupIconVitePlugin } from 'vitepress-plugin-group-icons';

export const vite: UserConfig['vite'] = {
	plugins: [
		groupIconVitePlugin(),
		AutoSidebar({
			// You can also set options to adjust sidebar data
			// see option document below
			titleFromFile: true,
			ignoreIndexItem: true,
		}),
	],
	css: {
		preprocessorOptions: {
			// vite中sass警告JS API过期
			scss: {
				api: 'modern-compiler', // 或 "modern"，"legacy"
			},
		},
	},
};
