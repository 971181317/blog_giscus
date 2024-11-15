import type { UserConfig } from 'vitepress';
import { groupIconVitePlugin } from 'vitepress-plugin-group-icons';

export const vite: UserConfig['vite'] = {
	plugins: [
		groupIconVitePlugin({
			customIcon: {
				'.mts': 'vscode-icons:file-type-typescript',
				'.cts': 'vscode-icons:file-type-typescript',
				'.go': 'vscode-icons:file-type-go-lightblue',
				go: 'vscode-icons:file-type-go-lightblue',
				golang: 'vscode-icons:file-type-go-lightblue',
				bash: 'logos:bash-icon',
				'.sh': 'logos:bash-icon',
				profile: 'vscode-icons:file-type-dotenv',
				'.xml': 'vscode-icons:file-type-xml',
				worker: 'vscode-icons:file-type-dotenv',
				'.java': 'vscode-icons:file-type-java',
				java: 'vscode-icons:file-type-java',
				'pom.xml': 'vscode-icons:file-type-maven',
				dockerfile: 'vscode-icons:file-type-docker2',
				nginx: 'logos:nginx',
				mysql: 'vscode-icons:file-type-mysql',
				'.sql': 'vscode-icons:file-type-sql',
			},
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
