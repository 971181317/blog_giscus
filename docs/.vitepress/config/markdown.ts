// import mathjax3 from 'markdown-it-mathjax3';
// import footnote from 'markdown-it-footnote';
import { figure } from '@mdit/plugin-figure';
import type { MarkdownOptions } from 'vitepress';
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons';
import lightbox from 'vitepress-plugin-lightbox';

export const markdown: MarkdownOptions = {
	// // Shiki主题, 所有主题参见: https://github.com/shikijs/shiki/blob/main/docs/themes.md
	// theme: {
	//   light: 'github-light',
	//   dark: 'github-dark-dimmed'
	// },
	lineNumbers: true, // 启用行号
	image: {
		// 开启图片懒加载
		lazyLoading: true,
	},
	theme: {},
	config: md => {
		md.use(figure, { figcaption: 'alt', copyAttrs: '^class$', lazy: true });
		md.use(groupIconMdPlugin);
		md.use(lightbox, {});
	},
};
