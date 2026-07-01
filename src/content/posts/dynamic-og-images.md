---
author: Sat Naing
pubDatetime: 2022-12-28T04:59:04.866Z
modDatetime: 2026-06-03T00:00:00.000Z
title: AstroPaper 博客文章中的动态 OG 图片生成
slug: dynamic-og-image-generation-in-astropaper-blog-posts
featured: false
draft: false
tags:
  - docs
  - release
description: AstroPaper v1.4.0 的新功能，引入博客文章动态 OG 图片生成。
---

AstroPaper v1.4.0 的新功能，引入博客文章动态 OG 图片生成。

![AstroPaper 博客文章中的动态 OG 图片生成](/posts/dynamic-og-image-generation-in-astropaper-blog-posts/index.png)

## 目录

## 介绍

OG 图片（又称社交图片）在社交媒体互动中扮演着重要角色。如果你不知道 OG 图片是什么，它是我们在 Facebook、Discord 等社交媒体上分享网站 URL 时显示的图片。

> 用于 Twitter 的社交图片技术上不称为 OG 图片。不过，在本文中，我将使用 OG 图片这一术语来指代所有类型的社交图片。

## 默认/静态 OG 图片（旧方式）

AstroPaper 已提供了一种向博客文章添加 OG 图片的方式。作者可以在 frontmatter 的 `ogImage` 中指定 OG 图片。即使作者没有在 frontmatter 中定义 OG 图片，也会使用默认 OG 图片作为后备（本例中为 `public/default-og.jpg`）。但问题是默认 OG 图片是静态的，这意味着每篇未在 frontmatter 中包含 OG 图片的博客文章都将始终使用相同的默认 OG 图片，尽管每篇文章的标题/内容各不相同。

## 动态 OG 图片

为每篇文章生成动态 OG 图片使作者无需为每篇博客文章指定 OG 图片。此外，这还可以防止后备 OG 图片在所有博客文章中完全相同。

在 AstroPaper v1.4.0 中，使用了 Vercel 的 [Satori](https://github.com/vercel/satori) 包进行动态 OG 图片生成。

在 AstroPaper v6+ 中，保持了同样的思路（Satori 渲染 SVG，然后通过 [Sharp](https://sharp.pixelplumbing.com/) 生成 PNG），但字体来自 Astro 的**字体**配置，并通过 [`experimental_getFontFileURL()`](https://astro.build/blog/astro-620/) 加载，因此 OG 生成可以重用与网站相同的字体管线。

动态 OG 图片将在构建时为以下博客文章生成：

- 在 frontmatter 中未包含 OG 图片
- 未标记为草稿

## AstroPaper 动态 OG 图片的结构

动态 OG 图片包括**博客文章标题**、**作者名称**和**网站标题**。作者名称和网站标题从 `astro-paper.config.ts` 中的 `site.author` 和 `site.title` 获取。标题从博客文章 frontmatter 的 `title` 生成。

![示例动态 OG 图片链接](https://user-images.githubusercontent.com/53733092/209704501-e9c2236a-3f4d-4c67-bab3-025aebd63382.png)

### 非拉丁字符的问题

> [!CAUTION]
> 包含非拉丁字符的标题无法开箱即用地正确显示。请切换到覆盖你书写系统的 Google 字体族，并同时包含 **400** 和 **700** 字重——Satori 使用独立的缓冲区处理常规和粗体，缺少任一都会导致渲染不匹配。

```ts file="astro.config.ts"
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  fonts: [
    {
      // 示例：日文覆盖范围（根据你的读者需求选择）
      name: "Noto Sans JP",
      cssVariable: "--font-google-sans-code",
      provider: fontProviders.google(),
      fallbacks: ["monospace"],
      weights: [400, 700],
      styles: ["normal", "italic"],
      formats: ["woff", "ttf"],
    },
  ],
});
```

如果你更改了 `cssVariable`，还要更新以下文件中的匹配键：

- `src/pages/og.png.ts`
- `src/pages/posts/[...slug]/index.png.ts`

> 查看[这个 PR](https://github.com/satnaing/astro-paper/pull/318) 获取更多信息。

> [!WARNING] 注意事项
>
> - **构建时间**会随内容量增长——每篇符合条件的文章在构建时生成一张 PNG。v6 中的生成速度更快（PR [#632](https://github.com/satnaing/astro-paper/pull/632)），但在非常大的网站上，你可以通过 `astro-paper.config.ts` 中的 `features.dynamicOgImage: false` 禁用它。
> - **从右到左的语言**暂不支持。
> - **标题中的表情符号**可能存在问题——有些可能无法正确渲染。
