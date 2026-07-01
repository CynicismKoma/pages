---
pubDatetime: 2025-03-08T08:18:19.693Z
title: AstroPaper 5.0
slug: astro-paper-v5
featured: false
ogImage: ../../../assets/images/AstroPaper-v5.png
tags:
  - release
description: "AstroPaper v5：保持简洁外观，引擎盖下更新。"
---

期待已久的 AstroPaper v5 终于来了。AstroPaper v5 保持了同样简约干净的外观，但在引擎盖下进行了重大更新。

![AstroPaper v5](@/assets/images/AstroPaper-v5.png)

## 目录

## 主要变化

### 升级到 Astro v5 [#455](https://github.com/satnaing/astro-paper/pull/455)

AstroPaper 现在基于 Astro v5，带来了其所有新功能和改进。

### Tailwind v4

AstroPaper 已升级到 Tailwind v4，其中包含许多底层样式变化。`tailwind.config.js` 文件已被移除，现在所有配置都位于 `src/styles/global.css` 文件中。排版相关的样式已被提取并移至 `src/styles/typography.css`。

由于 TailwindCSS v4 的新行为，组件中 `<style>` 块内的样式已被移除，替换为内联 Tailwind 类。

此外，UI 中的配色方案已更新。新的调色板现在只包含五种颜色：

```css
:root,
html[data-theme="light"] {
  --background: #fdfdfd;
  --foreground: #282728;
  --accent: #006cac;
  --muted: #e6e6e6;
  --border: #ece9e9;
}

html[data-theme="dark"] {
  --background: #212737;
  --foreground: #eaedf3;
  --accent: #ff6b01;
  --muted: #343f60bf;
  --border: #ab4b08;
}
```

### 移除 React + Fuse.js，改用 Pagefind 搜索

在以前的版本中，React.js 和 Fuse.js 用于搜索功能和 OG 图片生成。在 AstroPaper v5 中，React.js 已被移除，替换为 [Pagefind](https://pagefind.app/)，一个静态站点搜索工具。

搜索体验与以前版本几乎相同，但得益于 Pagefind，现在所有内容（不仅仅是标题和描述）都被索引和搜索。

在开发模式下使用 Pagefind 的想法受到[这篇博客文章](https://chrispennington.blog/blog/pagefind-static-search-for-astro-sites/)的启发。

### 更新导入别名

导入别名已从 `@directory` 更新为 `@/directory`，这意味着你现在必须这样导入：

```astro
---
import { slugifyStr } from "@/utils/slugify";
import IconHash from "@/assets/icons/IconHash.svg";
---
```

### 切换到 `pnpm`

AstroPaper 已从 `npm` 切换到 `pnpm`，提供更快更高效的包管理。

### 用 Astro 的 SVG 组件替换图标/SVG

AstroPaper v5 将内联 SVG 替换为 Astro 的实验性 [SVG 组件](https://docs.astro.build/en/reference/experimental-flags/svg/)。此更新减少了 `socialIcons` 对象中预定义 SVG 代码的需求，使代码库更干净、更易于维护。

### 分离常量和配置

项目结构已重新组织。`src/config.ts` 文件现在仅包含 `SITE` 对象，它保存项目的主要配置。所有常量，如 `LOCALE`、`SOCIALS` 和 `SHARE_LINKS`，已移至 `src/constants.ts` 文件。

## 其他值得注意的变化

- 博客文章目录已从 `src/content/blog/` 更新为 `src/data/blog/`。
- 集合定义文件（`src/content/config.ts`）现已被 `src/content.config.ts` 替换。
- 各种依赖已升级以提升性能和安全性。
- 移除了 `IBM Plex Mono` 字体，切换到默认系统等宽字体。
- `返回`按钮的逻辑已更新。现在，AstroPaper v5 使用浏览器会话临时存储返回 URL，而不是触发浏览器的 history API。如果会话中不存在返回 URL，将重定向到首页。
- 还有一些细微的样式和布局变化。

## 结语

AstroPaper v5 带来了许多变化，但核心体验保持不变。在保持 AstroPaper 闻名的简洁极简设计的同时，享受更流畅、更高效的博客平台！

欢迎探索这些变化并分享你的想法。一如既往，感谢你的支持！

如果你喜欢这个主题，请考虑给仓库点个星。你也可以通过 GitHub Sponsors 支持我，或者如果你愿意，可以请我喝杯咖啡。当然，这些行为完全自愿，非强制。

尽情享受！

[Sat Naing](https://satnaing.dev/)
