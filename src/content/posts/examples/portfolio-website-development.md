---
title: 我是如何开发我的个人作品集网站和博客的
author: Sat Naing
pubDatetime: 2022-03-25T16:55:12.000+00:00
slug: how-do-i-develop-my-portfolio-and-blog
featured: false
draft: false
tags:
  - NextJS
  - TailwindCSS
  - HeadlessCMS
  - Blog
description:
  "示例文章：我使用 NextJS 和无头 CMS 开发第一个作品集网站和博客的经验。"
timezone: "Asia/Yangon"
---

> 本文最初来自我的[博客文章](https://satnaing.dev/blog/posts/how-do-i-develop-my-portfolio-and-blog)。我放这篇文章是为了演示如何使用 AstroPaper 主题撰写博客文章。

我使用 NextJS 和无头 CMS 开发第一个作品集网站和博客的经验。

![构建作品集](https://satnaing.dev/_ipx/w_2048,q_75/https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1653050141%2FSatNaing%2Fblog_at_cafe_ei1wf4.jpg?url=https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1653050141%2FSatNaing%2Fblog_at_cafe_ei1wf4.jpg&w=2048&q=75)

## 动机

自从大学时期起，我就一直想着推出自己的网站，使用自定义域名（**satnaing.dev**）。但直到这个项目之前，这件事从未实现。我做过多个关于 Web 应用程序开发的项目和工作，但我并没有为此付出努力。

那么，"博客呢？"你可能会问。是的，博客也在我项目清单上有一段时间了。我一直想使用一些最新技术来做一个博客项目。然而，我一直在忙于工作和其它项目，所以博客项目始终没有启动。

这段时间，我倾向于以质量而非数量为重点来开发自己的项目。项目完成后，我通常会在 GitHub 仓库中放置一个合适的 readme 文件。但 GitHub 仓库的 readme 只适合技术方面（这只是我的想法）。我想写下我的经验和挑战。因此，我决定制作自己的博客。而且，在这一点上，我有足够的经验和信心来开发这个项目。

## 技术栈

在前端方面，我想使用 [React](https://reactjs.org/ "React 官方网站")。但仅靠 React 不足以做好 SEO；而且我还需要考虑路由、图片优化等诸多因素。所以，我选择了 [NextJS](https://nextjs.org/ "NextJS 官方网站") 作为我的主要前端技术栈。当然还有 TypeScript 用于类型检查。（据说当你习惯了 TypeScript 后，你会爱上它 😉）

在样式方面，我使用 [TailwindCSS](https://tailwindcss.com/ "Tailwind CSS 官方网站")。因为我喜欢 Tailwind 提供的开发者体验，而且与 MUI 或 React Bootstrap 等其他组件 UI 库相比，它具有很大的灵活性。

这个项目的所有内容都放在 GitHub 仓库中。我所有的博客文章（包括这篇）都是用 Markdown 文件格式编写的，因为我很习惯这种格式。但为了轻松编写 Markdown 及其 frontmatter，我使用了 [Forestry](https://forestry.io/ "Forestry 官方网站") 无头 CMS。这是一个基于 Git 的 CMS，可以提供 Markdown 和其他内容。因此，我可以使用 Markdown 或所见即所得编辑器来编写内容。此外，使用它编写 frontmatter 非常轻松。

图片和资源上传并存储在 [Cloudinary](https://cloudinary.com/ "Cloudinary 官方网站") 中。我通过 Forestry 连接 Cloudinary，并直接在仪表板中管理它们。

总之，以下是我在这个项目中使用的技术栈。

- 前端：NextJS (TypeScript)
- 样式：TailwindCSS
- 动画：GSAP
- CMS：Forestry 无头 CMS
- 部署：Vercel

## 功能特点

以下是我个人作品集和博客的某些功能

### SEO 友好

整个项目开发时都注重 SEO。我使用了合适的 meta 标签、描述和标题对齐方式。这个网站现在已被 Google 索引。

> 你可以通过关键词如 'sat naing dev' 在 Google 上搜索这个网站

![在 Google 上搜索 satnaing.dev](https://res.cloudinary.com/noezectz/image/upload/v1648231400/SatNaing/satnaing-on-google_asflq6.png "satnaing.dev 已被索引")

此外，由于正确使用了 meta 标签，这个网站分享到社交媒体时显示效果良好。

![satnaing.dev 分享到 Facebook 时的卡片布局](https://res.cloudinary.com/noezectz/image/upload/v1653106955/SatNaing/satnaing-dev-share-on-facebook_1_zjoehx.png "分享到 Facebook 时的卡片布局")

### 动态站点地图

站点地图在 SEO 中扮演着重要角色。因此，这个网站的每个页面都应包含在 sitemap.xml 中。每当我创建新内容、标签或分类时，我都会在网站上生成自动站点地图。

### 明暗主题

由于近年来暗色主题的流行，许多网站现在都默认包含暗色主题。当然，我的网站也支持明暗主题。

### 完全可访问

这个网站完全可访问。你可以仅使用键盘进行导航。我遵循了所有 a11y 增强最佳实践，包括在所有图片中添加 alt 文本、不跳过标题、使用语义化 HTML 标签、正确使用 aria 属性。

### 搜索框、分类与标签

所有博客内容都可以通过搜索框搜索。此外，内容可以按分类和标签进行筛选。这样，博客读者可以搜索并阅读他们真正想要的内容。

### 性能与 Lighthouse 评分

由于正确的开发和最佳实践，这个网站获得了非常好的性能和 Lighthouse 评分。以下是我网站的 Lighthouse 评分。

![satnaing.dev Lighthouse 评分](https://user-images.githubusercontent.com/53733092/159957822-7082e459-11e9-4616-8f1e-49d0881f7cbb.png "satnaing.dev Lighthouse 评分")

### 动画

最初我使用 [Framer Motion](https://www.framer.com/motion/ "Framer Motion") 为这个网站添加动画和微交互。然而，当我尝试使用一些复杂的动画和视差效果时，我发现与 Framer Motion 集成不太方便（也许我不太擅长和不习惯使用它）。因此，我决定使用 [GSAP](https://greensock.com/ "GSAP 动画库") 来实现所有动画。它是最流行的动画库之一，能够完成复杂和高级的动画。你可以在本网站的几乎每个页面上看到动画和微交互。

![satnaing.dev 网站的动画](https://res.cloudinary.com/noezectz/image/upload/v1653108324/SatNaing/ezgif.com-gif-maker_2_hehtlm.gif "satnaing.dev 网站")

## 结语

总之，这个项目给了我很多关于开发博客网站（SSG）的经验和信心。现在，我获得了基于 Git 的 CMS 及其与 NextJS 交互的知识。我还了解了 SEO、动态站点地图生成和 Google 索引流程。我将来会做出更好的项目。敬请期待！✌🏻

还有……最后但同样重要的是，我想对我的朋友 [Swann Fevian Kyaw](https://www.facebook.com/bon.zai.3910 "Swann Fevian Kyaw 的 Facebook 账号") (@[ToonHa](https://www.facebook.com/ToonHa-102639465752883 "ToonHa Facebook 页面")) 说声"谢谢"，他为我网站的 Hero 区域画了漂亮的插画。

## 项目链接

- 网站：[https://satnaing.dev/](https://satnaing.dev/ "https://satnaing.dev/")
- 博客：[https://satnaing.dev/blog](https://satnaing.dev/blog "https://satnaing.dev/blog")
- 仓库：[https://github.com/satnaing/my-portfolio](https://github.com/satnaing/my-portfolio "https://github.com/satnaing/my-portfolio")
