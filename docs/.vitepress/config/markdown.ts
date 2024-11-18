import { figure } from "@mdit/plugin-figure";
// import mathjax3 from 'markdown-it-mathjax3';
// import footnote from 'markdown-it-footnote';
import type { MarkdownOptions } from "vitepress";
import { groupIconMdPlugin } from "vitepress-plugin-group-icons";
import lightbox from "vitepress-plugin-lightbox";

export const markdown: MarkdownOptions = {
  // // Shiki主题, 所有主题参见: https://github.com/shikijs/shiki/blob/main/docs/themes.md
  theme: "one-dark-pro",
  lineNumbers: true, // 启用行号
  image: {
    // 开启图片懒加载
    lazyLoading: true,
  },
  config: (md) => {
    md.use(figure, { figcaption: "alt", copyAttrs: "^class$", lazy: true });
    md.use(groupIconMdPlugin);
    md.use(lightbox, {});
    md.use((md) => {
      const defaultRender = md.render;
      md.render = (...args) => {
        const [, env] = args;
        const isHomePage = env.path === "/" || env.relativePath === "index.md"; // 判断是否是首页
        if (isHomePage) {
          return defaultRender.apply(md, args); // 如果是首页，直接渲染内容
        }
        // 在每个 md 文件内容的开头插入组件，如果有H1标签添加在第一个H1后面
        const defaultContent = defaultRender.apply(md, args);
        const docMetaData = "<DocMetaData />\n";
        const newContent = defaultContent.replace(
          /<\/h1>/,
          `</h1> ${docMetaData}\n`
        );
        return defaultContent === newContent
          ? docMetaData + defaultContent
          : newContent;
      };
    });
  },
};
