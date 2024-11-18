// .vitepress/data/footerData.ts

import type { FooterData } from "@theojs/lumen";
import { metaData } from "./metaData";

export const Footer_Data: FooterData = {
  beian: {
    icp: "陇ICP备2021001255号-1",
    police: "京公网安备11010802044795",
    showIcon: true,
  },
  author: { name: metaData.author, link: metaData.site },
  /*group: [
		{
			title: '外部链接',
			icon: 'fas fa-link', // `iconify`或者 `fortawesome` 图标
			style: 'rgba(255, 87, 51, 1)',
			links: [
				{ name: '示例1', href: 'https://', icon: 'fas fa-book' },
				{ name: '示例2', href: 'https://' },
			],
		},
		{
			title: '内部链接',
			target: '_self', // `target`默认打开方式为 _blank , 为 _self 时不会显示外部链接图标
			icon: 'fas fa-link',
			style: 'rgba(255, 87, 51, 1)',
			links: [
				{ name: '示例1', icon: 'fas fa-book', href: '/docs' },
				{ name: '示例2', href: '/page' },
			],
		},
	],*/
};
