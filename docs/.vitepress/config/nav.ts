import type { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.Config['nav'] = [
	{ text: '首页', link: '/' },
	{ text: '导航', link: '/nav', activeMatch: '/nav/' },
	{ text: '学习笔记', link: '/study-notes', activeMatch: '/study-notes/' },
	{
		text: '搭建指南',
		activeMatch: '/build/',
		items: [
			{
				text: 'code-server',
				link: '/build/code-server/code-server Dokcer+Nginx 部署方法及踩坑',
				activeMatch: '/build/code-server/',
			},
			{
				text: 'ELK',
				link: '/build/ELK/单机%20Docker%20部署%20ELK',
				activeMatch: '/build/ELK/',
			},
			{
				text: 'hadoop',
				link: '/build/hadoop/单机%20Docker%20部署%20hadoop%20集群实践',
				activeMatch: '/build/hadoop/',
			},
			{
				text: 'Mysql',
				link: '/build/mysql/Docker部署MySQL',
				activeMatch: '/build/mysql/',
			},
			{
				text: 'VitePress',
				link: '/build/vitepress/01.前言',
				activeMatch: '/build/vitepress/',
			},
		],
	},
	{
		text: '开发日志',
		activeMatch: '/dev/',
		items: [
			{
				text: 'bilibiliToolChrome',
				link: '/dev/bilibili%20Tool%20Chrome',
				activeMatch: '/dev/bilibili',
			},
			{
				text: 'goHttp',
				link: '/dev/goHttpProMaxPlus',
				activeMatch: '/dev/goHttpProMaxPlus',
			},
		],
	},
	{
		text: '技术分享',
		link: '/technology/',
		activeMatch: '/technology/',
	},
];
