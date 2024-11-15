import DefaultTheme from 'vitepress/theme';
import 'virtual:group-icons.css';
import './style/index.scss';
import { DocBox, DocBoxCube, DocLinks } from '@theojs/lumen';
import { useData, useRoute } from 'vitepress';
import type { Theme } from 'vitepress';
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import googleAnalytics from 'vitepress-plugin-google-analytics';
import '@theojs/lumen/theme';
// @ts-ignore
import Layout from './Layout.vue';
// @ts-ignore
import Confetti from './components/Confetti.vue';
// @ts-ignore
import DocMetaData from './components/DocMetaData.vue';
// @ts-ignore
import HomeUnderline from './components/HomeUnderline.vue';
// @ts-ignore
import LinkCard from './components/LinkCard.vue';
// @ts-ignore
import MNavLinks from './components/MNavLinks.vue';

// @ts-ignore
export default {
	extends: DefaultTheme,
	// 扩展原有主题
	Layout: Layout,
	enhanceApp(ctx) {
		// 注册全局组件
		ctx.app.component('Confetti', Confetti);
		ctx.app.component('LinkCard', LinkCard);
		ctx.app.component('HomeUnderline', HomeUnderline);
		ctx.app.component('Box', DocBox);
		ctx.app.component('Links', DocLinks);
		ctx.app.component('BoxCube', DocBoxCube);
		ctx.app.component('DocMetaData', DocMetaData);
		ctx.app.component('MNavLinks', MNavLinks);
		googleAnalytics({
			id: 'G-X0FZSCQYVW', //跟踪ID，在analytics.google.com注册即可
		});
	},
	setup() {
		// Get frontmatter and route
		const { frontmatter } = useData();
		const route = useRoute();

		// giscus配置
		giscusTalk(
			{
				repo: 'soladxy/sola_blog_vitepress', //仓库
				repoId: 'R_kgDONNEoPw', //仓库ID
				category: 'Announcements', // 讨论分类
				categoryId: 'DIC_kwDONNEoP84CkI_d', //讨论分类ID
				mapping: 'pathname',
				inputPosition: 'top',
				lang: 'zh-CN',
				loading: 'lazy',
			},
			{
				frontmatter,
				route,
			},
			//默认值为true，表示已启用，此参数可以忽略；
			//如果为false，则表示未启用
			//您可以使用“comment:true”序言在页面上单独启用它
			true,
		);
	},
} satisfies Theme;
