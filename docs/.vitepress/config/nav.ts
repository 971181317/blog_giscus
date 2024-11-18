import * as fs from "node:fs";
import * as path from "node:path";
import type { DefaultTheme } from "vitepress";

export const nav: DefaultTheme.Config["nav"] = [
  { text: "首页", link: "/" },
  { text: "导航", link: "/nav", activeMatch: "/nav/" },
  {
    text: "学习笔记",
    activeMatch: "/study-notes/",
    items: curDirItem("/study-notes"),
  },
  {
    text: "搭建指南",
    activeMatch: "/build/",
    items: curDirItem("/build"),
  },
  {
    text: "开发日志",
    activeMatch: "/dev/",
    items: [
      {
        text: "bilibiliToolChrome",
        link: "/dev/bilibiliToolChrome",
        activeMatch: "/dev/bilibili",
      },
      {
        text: "goHttpProMaxPlus",
        link: "/dev/goHttpProMaxPlus",
        activeMatch: "/dev/goHttpProMaxPlus",
      },
    ],
  },
  {
    text: "技术分享",
    link: findFirstMdFile("docs/technology/").replace("docs/", ""),
    activeMatch: "/technology/",
  },
];

function curDirItem(path: string): DefaultTheme.NavItemWithChildren["items"] {
  return fs.readdirSync(`docs${path}`).map((pkg) => {
    const curDir = `${path}/${pkg}`;
    return {
      text: `${pkg}`,
      link: findFirstMdFile(`docs${curDir}`).replace("docs/", ""),
      activeMatch: `${curDir}/`,
    };
  });
}

function findFirstMdFile(dir: string): string {
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const itemPath = path.join(dir, item.name);

    if (item.isFile() && path.extname(item.name) === ".md") {
      return itemPath; // 找到第一个 .md 文件，返回路径
    }

    if (item.isDirectory()) {
      const filePath = findFirstMdFile(itemPath);
      if (filePath) return filePath; // 如果子文件夹找到结果，直接返回
    }
  }
  return ""; // 如果没有找到 .md 文件，返回空
}
