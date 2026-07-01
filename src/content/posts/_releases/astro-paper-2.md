---
author: Sat Naing
pubDatetime: 2023-01-30T15:57:52.737Z
title: AstroPaper 2.0
slug: astro-paper-2
featured: false
ogImage: https://user-images.githubusercontent.com/53733092/215771435-25408246-2309-4f8b-a781-1f3d93bdf0ec.png
tags:
  - release
description: 借助 Astro v2 增强的 AstroPaper。类型安全的 markdown 内容、错误修复和更好的开发体验等。
---

Astro 2.0 已经发布，带来了一些很酷的功能、破坏性变更、开发者体验改进、更好的错误叠加层等等。AstroPaper 充分利用了这些很棒的功能，特别是 Content Collections API。

<!-- ![AstroPaper 2.0 介绍](https://user-images.githubusercontent.com/53733092/215683840-dc2502f5-8c5a-44f0-a26c-4e7180455056.png) -->

![AstroPaper 2.0 介绍](https://user-images.githubusercontent.com/53733092/215771435-25408246-2309-4f8b-a781-1f3d93bdf0ec.png)

## 目录

## 功能与变化

### 类型安全的 Frontmatter 和重新定义的博客 Schema

AstroPaper 2.0 的 markdown 内容 frontmatter 现在由于 Astro 的 Content Collections 而实现了类型安全。博客 schema 在 `src/content/_schemas.ts` 文件中定义。

### 博客内容的新位置

所有博客文章已从 `src/contents` 移动到 `src/content/blog` 目录。

### 新的 Fetch API

现在使用 `getCollection` 函数获取内容。不再需要指定内容的相对路径。

```ts
// 旧的内容获取方法
- const postImportResult = import.meta.glob<MarkdownInstance<Frontmatter>>(
  "../contents/**/**/*.md",);

// 新的内容获取方法
+ const postImportResult = await getCollection("blog");
```

### 改进搜索逻辑以获得更好的搜索结果

在旧版本的 AstroPaper 中，当有人搜索文章时，搜索的关键字是 `title`、`description` 和 `headings`（headings 指博客文章的所有 h1 ~ h6 标题）。在 AstroPaper v2 中，用户输入时将仅搜索 `title` 和 `description`。

### 重命名的 Frontmatter 属性

以下 frontmatter 属性已被重命名。

| 旧名称   | 新名称      |
| -------- | ---------- |
| datetime | pubDatetime |
| slug     | postSlug   |

### 博客文章的默认标签

如果博客文章没有任何标签（换句话说，未指定 frontmatter 属性 `tags`），则该文章将使用默认标签 `others`。但你可以在 `/src/content/_schemas.ts` 文件中设置默认标签。

```ts
// src/contents/_schemas.ts
export const blogSchema = z.object({
  // ---
  // 将 "others" 替换为你想要的任何内容
  tags: z.array(z.string()).default(["others"]),
  ogImage: z.string().optional(),
  description: z.string(),
});
```

### 新的预定义暗色配色方案

AstroPaper v2 有一个新的暗色配色方案（高对比度和低对比度），基于 Astro 的暗色 Logo。查看[此链接](https://astro-paper.pages.dev/posts/predefined-color-schemes#astro-dark)了解更多信息。

![新的预定义暗色配色方案](https://user-images.githubusercontent.com/53733092/215680520-59427bb0-f4cb-48c0-bccc-f182a428d72d.svg)

### 自动类排序

AstroPaper 2.0 包含使用 [TailwindCSS Prettier 插件](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier) 的自动类排序。

### 更新的文档和 README

所有 [#docs](https://astro-paper.pages.dev/tags/docs/) 博客文章和 [README](https://github.com/satnaing/astro-paper#readme) 都已针对 AstroPaper v2 进行了更新。

## 错误修复

- 修复了博客文章页面中损坏的标签
- 在标签页面中，面包屑的最后一部分现在已更新为小写以保持一致性
- 在标签页面中排除草稿文章
- 修复了页面重新加载后"onChange 值未更新"的问题
