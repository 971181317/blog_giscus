import type { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.Config['nav'] = [
	{ text: '首页', link: '/' },
	{
		text: '技术',
		items: [
			{
				text: 'VitePress',
				link: '/vitepress',
				activeMatch: '/vitepress/',
			},
		],
	},
	{ text: 'VitePress', link: 'https://vitepress.dev/zh/' },
	{
		text: '关于',
		items: [
			{
				text: '关于知识库',
				link: '/about/index.mts',
				activeMatch: '/about/index.mts',
			},
			{ text: '关于我', link: '/about/me', activeMatch: '/about/me' },
		],
		activeMatch: '/about/', // // 当前页面处于匹配路径下时, 对应导航菜单将突出显示
	},
];
