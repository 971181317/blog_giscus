import * as fs from "node:fs";
import type { DefaultTheme } from "vitepress";
import { generateSidebar } from "vitepress-sidebar";
import type { VitePressSidebarOptions } from "vitepress-sidebar";

export const sidebar: DefaultTheme.Sidebar = generateSidebar([
  ...curDirSidebar("build"),
  ...curDirSidebar("study-notes"),
  {
    documentRootPath: "docs",
    scanStartPath: "technology",
    resolvePath: "/technology",
    collapsed: false,
    // useTitleFromFileHeading: true,
    removePrefixAfterOrdering: true,
    prefixSeparator: ".", // 去除数组前缀
    sortMenusOrderNumericallyFromTitle: true,
  },
]);

/**
 * path路径侧边栏从当前层级生成
 *
 * @param path
 */
function curDirSidebar(path: string): VitePressSidebarOptions[] {
  return fs.readdirSync(`docs/${path}`).map((pkg) => {
    return {
      documentRootPath: "docs",
      scanStartPath: `${path}/${pkg}`,
      resolvePath: `/${path}/${pkg}/`,
      collapsed: false,
      // useTitleFromFileHeading: true,
      removePrefixAfterOrdering: true,
      prefixSeparator: ".", // 去除数组前缀
      sortMenusOrderNumericallyFromTitle: true,
    };
  });
}
