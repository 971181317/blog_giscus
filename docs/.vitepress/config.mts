import { defineConfig } from "vitepress";
import { head } from "./config/head";
import { markdown } from "./config/markdown";
import { themeConfig } from "./config/theme";
import { vite } from "./config/vite";
import { metaData } from "./data";

// https://vitepress.dev/reference/site-config
// #region code
export default defineConfig({
  lang: metaData.lang,
  title: metaData.title,
  description: metaData.description,
  cleanUrls: true, //开启纯净链接
  lastUpdated: true,
  sitemap: {
    hostname: metaData.site,
  },
  metaChunk: true, //将页面元数据提取到单独的 JavaScript 块中，而不是内联在初始 HTML 中
  markdown: markdown,
  head: head,
  vite: vite,
  themeConfig: themeConfig,
});
// #endregion code
