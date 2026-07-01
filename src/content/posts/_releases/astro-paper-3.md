---
author: Sat Naing
pubDatetime: 2023-09-25T10:25:54.547Z
title: AstroPaper 3.0
slug: astro-paper-v3
featured: false
ogImage: https://github.com/satnaing/astro-paper/assets/53733092/1ef0cf03-8137-4d67-ac81-84a032119e3a
tags:
  - release
description: "AstroPaper 3.0 版本：借助 Astro v3 和无缝视图过渡提升您的 Web 体验"
---

我们很高兴地宣布 AstroPaper v3 发布了，它包含了许多新功能、增强和错误修复，以提升您的 Web 开发体验。让我们深入了解这个版本的亮点：

![AstroPaper v3](@/assets/images/AstroPaper-v3.png)

## 目录

## 功能与变化

### Astro v3 集成

<video autoplay loop="loop" muted="muted" plays-inline="true">
  <source src="https://github.com/satnaing/astro-paper/assets/53733092/18fdb604-1ca3-41a0-8372-1367759091ff" type="video/mp4">
  <!-- <source src="/assets/docs/astro-paper-v3-view-transitions-demo.mp4" type="video/mp4"> -->
</video>

AstroPaper 现在完全支持 [Astro v3](https://astro.build/blog/astro-3/)，提供改进的性能和渲染速度。

此外，我们增加了对 Astro 的 [ViewTransitions API](https://docs.astro.build/en/guides/view-transitions/) 的支持，允许您在视图之间创建引人入胜的动态过渡。

在"最近文章"区域中，只显示非精选文章，以避免重复并更好地支持 ViewTransitions API。

### 更新 OG 图片生成逻辑

![示例 OG 图片](https://user-images.githubusercontent.com/40914272/269252964-a0dc6735-80f7-41ed-8e74-4d4d70f96891.png)

我们更新了自动 OG 图片生成的逻辑，使其更加可靠和高效。此外，它现在支持文章标题中的特殊字符，确保准确、灵活且引人注目的社交媒体预览。

`SITE.ogImage` 现在是可选的。如果未指定，AstroPaper 将使用 `SITE.title`、`SITE.desc` 和 `SITE.website` 自动生成 OG 图片。

### 主题 meta 标签

已添加 theme-color meta 标签，以动态适应主题切换，确保无缝的用户体验。

> 注意顶部的区别

**_AstroPaper v2 主题切换_**

<video autoplay loop="loop" muted="muted" plays-inline="true">
  <source src="https://github.com/satnaing/astro-paper/assets/53733092/3ab5a1e8-1891-4264-a5bb-0ded69143c1a" type="video/mp4">
</video>

**_AstroPaper v3 主题切换_**

<video autoplay loop="loop" muted="muted" plays-inline="true">
  <source src="https://github.com/satnaing/astro-paper/assets/53733092/8ac9deb8-d1f8-4029-86bd-6aa0def380b4" type="video/mp4">
</video>

## 其他变化

### Astro Prettier 插件

Astro Prettier 插件已默认安装，以保持项目整洁有序。

### 细微样式变化

单行代码块换行问题已解决，使您的代码片段看起来更整洁。

更新了导航栏样式 CSS，以允许在导航中添加更多导航链接。

## 升级到 AstroPaper v3

> 本部分仅适用于那些想从旧版本升级到 AstroPaper v3 的用户。

本节将帮助您从 AstroPaper v2 迁移到 AstroPaper v3。

在阅读本节的其余内容之前，您可能还想查看[这篇文章](https://astro-paper.pages.dev/posts/how-to-update-dependencies/)了解升级依赖和 AstroPaper 的相关信息。

## 选项 1：全新安装（推荐）

在此版本中，进行了大量更改——用较新的 API 替换旧的 Astro API、错误修复、新功能等。因此，如果您没有进行大量自定义，应遵循此方法。

**_第 1 步：保留所有已更新的文件_**

保留所有已经更新的文件非常重要。这些文件包括：

- `/src/config.ts`（v3 中未改动）
- `/src/styles/base.css`（v3 中有微小变化；如下所述）
- `/src/assets/`（v3 中未改动）
- `/public/assets/`（v3 中未改动）
- `/content/blog/`（这是您的博客内容目录 🤷🏻‍♂️）
- 您所做的任何其他自定义修改。

```css
/* 文件：/src/styles/base.css */
@layer base {
  /* 其他代码 */
  ::-webkit-scrollbar-thumb:hover {
    @apply bg-skin-card-muted;
  }

  /* 旧代码
  code {
    white-space: pre;
    overflow: scroll;
  } 
  */

  /* 新代码 */
  code,
  blockquote {
    word-wrap: break-word;
  }
  pre > code {
    white-space: pre;
  }
}

@layer components {
  /* 其他代码 */
}
```

**_第 2 步：将其他所有内容替换为 AstroPaper v3_**

在此步骤中，将除上述文件/目录（加上您自定义的文件/目录）之外的*所有内容*替换为 AstroPaper v3。

**_第 3 步：Schema 更新_**

请记住，`/src/content/_schemas.ts` 已被 `/src/content/config.ts` 替换。

此外，`/src/content/config.ts` 不再导出 `BlogFrontmatter` 类型。

因此，文件中所有的 `BlogFrontmatter` 类型都需要更新为 `CollectionEntry<"blog">["data"]`。

例如：`src/components/Card.tsx`

```ts
// AstroPaper v2
import type { BlogFrontmatter } from "@content/_schemas";

export interface Props {
  href?: string;
  frontmatter: BlogFrontmatter;
  secHeading?: boolean;
}
```

```ts
// AstroPaper v3
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}
```

## 选项 2：使用 Git 升级

此方法不推荐大多数用户使用。如果可以，你应该采用"选项 1"。只有在你了解如何解决合并冲突并且知道自己在做什么时才这样做。

实际上，我已经为此写了一篇博客文章，你可以[在此查看](https://astro-paper.pages.dev/posts/how-to-update-dependencies/#updating-astropaper-using-git)。

## 结语

准备好探索 AstroPaper v3 令人兴奋的新功能和改进了吗？现在就开始[使用 AstroPaper](https://github.com/satnaing/astro-paper) 吧。

有关其他错误修复和集成更新，请查看[发布说明](https://github.com/satnaing/astro-paper/releases/tag/v3.0.0)了解更多信息。

如果你在升级过程中遇到任何错误或困难，请随时在 [GitHub](https://github.com/satnaing/astro-paper) 上创建 issue 或发起讨论。
