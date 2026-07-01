---
author: Sat Naing
pubDatetime: 2024-01-04T09:30:41.816Z
title: AstroPaper 4.0
slug: "astro-paper-v4"
featured: false
ogImage: ../../../assets/images/AstroPaper-v4.png
tags:
  - release
description: "AstroPaper v4：确保更流畅、功能更丰富的博客体验。"
---

大家好！祝大家新年快乐 🎉，2024 年一切顺利！我们很高兴地宣布 AstroPaper v4 发布，这是一次重大更新，引入了一系列新功能、改进和错误修复，以提升您的博客体验。非常感谢所有贡献者为实现版本 4 所提供的宝贵投入和努力！

![AstroPaper v4](@/assets/images/AstroPaper-v4.png)

## 目录

## 主要变化

### 升级到 Astro v4 [#202](https://github.com/satnaing/astro-paper/pull/202)

AstroPaper 现在利用了 Astro v4 的强大功能。不过，这是一个微妙的升级，不会破坏大多数 Astro 用户的体验。

![Astro v4](https://astro.build/_astro/header-astro-4.YunweN9V_OmV0l.webp)

### 用 Astro Content `slug` 替换 `postSlug` [#197](https://github.com/satnaing/astro-paper/pull/197)

博客内容 schema 中的 `postSlug` 在 AstroPaper v4 中不再可用。最初 Astro 没有 `slug` 机制，因此我们必须自己解决。自 Astro v3 起，它支持内容集合和 slug 功能。现在，我们认为是时候采用 Astro 开箱即用的 `slug` 功能了。

**_文件：src/content/blog/astro-paper-4.md_**

```bash
---
author: Sat Naing
pubDatetime: 2024-01-01T04:35:33.428Z
title: AstroPaper 4.0
slug: "astro-paper-v4" # 如果未指定 slug，将使用文件名 'astro-paper-4'。
# slug: "" ❌ 不能为空字符串
---
```

`slug` 的行为现在略有不同。在早期版本的 AstroPaper 中，如果博客文章（markdown 文件）中未指定 `postSlug`，则该博客文章的标题会被 slugify 并用作 `slug`。然而，在 AstroPaper v4 中，如果未指定 `slug` 字段，将使用 markdown 文件名作为 `slug`。需要记住的一点是，`slug` 字段可以省略，但不能为空字符串（slug: "" ❌）。

如果你正在从 AstroPaper v3 升级到 v4，请确保将 `src/content/blog/*.md` 文件中的 `postSlug` 替换为 `slug`。

## 新功能

### 添加内容创建代码片段 [#206](https://github.com/satnaing/astro-paper/pull/206)

AstroPaper 现在包含用于新博客文章的 VSCode 代码片段，无需手动复制粘贴 frontmatter 和内容结构（目录、标题、摘要等）。

在此处阅读更多关于 VSCode 代码片段的信息。

<video autoplay muted="muted" controls plays-inline="true" class="border border-skin-line">
  <source src="https://github.com/satnaing/astro-paper/assets/53733092/136f1903-bade-40a2-b6bb-285a3c726350" type="video/mp4">
</video>

### 在博客文章中添加修改日期 [#195](https://github.com/satnaing/astro-paper/pull/195)

通过在博客文章中显示修改日期，让读者了解最新更新。这不仅让用户对文章的时效性建立信任，还有助于提高博客的 SEO。

![AstroPaper 中的最后修改日期功能](https://github.com/satnaing/astro-paper/assets/53733092/cc89585e-148e-444d-9da1-0d496e867175)

如果你进行了修改，可以在博客文章中添加 `modDatetime`。现在，文章的排序行为略有不同。所有文章同时按 `pubDatetime` 和 `modDatetime` 排序。如果一篇文章同时有 `pubDatetime` 和 `modDatetime`，其排序位置将由 `modDatetime` 决定。如果没有，则仅考虑 `pubDatetime` 来确定文章的排序顺序。

### 实现返回顶部按钮 [#188](https://github.com/satnaing/astro-paper/pull/188)

通过新实现的返回顶部按钮，增强博客详情页面上的用户导航体验。

![AstroPaper 中的返回顶部按钮](https://github.com/satnaing/astro-paper/assets/53733092/79854957-7877-4f19-936e-ad994b772074)

### 在标签文章中增加分页 [#201](https://github.com/satnaing/astro-paper/pull/201)

通过标签文章中添加的分页功能，改善内容组织和导航，使用户更容易探索相关内容。这确保了如果某个标签有很多文章，读者不会被所有标签相关的文章淹没。

<video autoplay loop="loop" muted="muted" plays-inline="true" class="border border-skin-line">
  <source src="https://github.com/satnaing/astro-paper/assets/53733092/9bad87f5-dcf5-4b79-b67a-d6c7244cd616" type="video/mp4">
</video>

### 动态生成 robots.txt [#130](https://github.com/satnaing/astro-paper/pull/130)

AstroPaper v4 现在动态生成 robots.txt 文件，让你对搜索引擎索引和网络爬虫有更多控制。此外，站点地图 URL 也会被添加到 `robot.txt` 文件中。

### 添加 Docker-Compose 文件 [#174](https://github.com/satnaing/astro-paper/pull/174)

通过添加 Docker-Compose 文件，管理你的 AstroPaper 环境变得前所未有的简单，简化了部署和配置。

## 重构与错误修复

### 将 Slugified 标题替换为非 Slugified 标签名称 [#198](https://github.com/satnaing/astro-paper/pull/198)

为了提高清晰度、用户体验和 SEO，标签页面中的标题（`Tag: some-tag`）不再被 slugify（`Tag: Some Tag`）。

![非 Slugified 标签名称](https://github.com/satnaing/astro-paper/assets/53733092/2fe90d6e-ec52-467b-9c44-95009b3ae0b7)

### 实现 100svh 作为最小高度 ([79d569d](https://github.com/satnaing/astro-paper/commit/79d569d053036f2113519f41b0d257523d035b76))

我们已将 body 上的最小高度更新为使用 100svh，为移动用户提供更好的用户体验。

### 将站点 URL 作为单一事实来源 [#143](https://github.com/satnaing/astro-paper/pull/143)

站点 URL 现在是单一事实来源，简化了配置并避免不一致。在此 [PR](https://github.com/satnaing/astro-paper/pull/143) 及其相关 issue(s) 中阅读更多信息。

### 解决亮色模式下的不可见文本代码块问题 [#163](https://github.com/satnaing/astro-paper/pull/163)

我们修复了亮色模式下的不可见文本代码块问题。

### 解码面包屑中的 Unicode 标签字符 [#175](https://github.com/satnaing/astro-paper/pull/175)

面包屑中标签的最后一部分现在已解码，使非英文字符显示更好。

### 更新 LOCALE 配置以覆盖更多语言区域 ([cd02b04](https://github.com/satnaing/astro-paper/commit/cd02b047d2b5e3b4a2940c0ff30568cdebcec0b8))

LOCALE 配置已更新，以覆盖更广泛的语言区域，满足更多元化受众的需求。

## 结语

我们相信这些更新将显著提升你的 AstroPaper 体验。感谢每一位做出贡献、解决问题和给 AstroPaper 标星的人。我们期待看到你用 AstroPaper v4 创建的精彩内容！

博客愉快！

[Sat Naing](https://satnaing.dev) <br/>
AstroPaper 的创建者
