import type { HeadConfig } from 'vitepress';
import { metaData } from '../data';

export const head: HeadConfig[] = [
	[
		'link',
		{
			rel: 'icon',
			href: metaData.icon,
		},
	],
	['meta', { name: 'author', content: metaData.author }],
	['meta', { name: 'keywords', content: '淺い空的小站, 知识库, 博客, 分享' }],

	['meta', { name: 'HandheldFriendly', content: 'True' }],
	['meta', { name: 'MobileOptimized', content: '320' }],

	['meta', { property: 'og:type', content: 'website' }],
	['meta', { property: 'og:locale', content: metaData.locale }],
	['meta', { property: 'og:title', content: metaData.title }],
	['meta', { property: 'og:description', content: metaData.description }],
	['meta', { property: 'og:site', content: metaData.site }],
	['meta', { property: 'og:site_name', content: metaData.title }],
	[
		'script',
		{
			async: '',
			src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1451634554731623',
			crossorigin: 'anonymous',
		},
	],
];
