---
title: 我是如何用 React 开发我的终端风格作品集网站的
author: Sat Naing
pubDatetime: 2022-06-09T03:42:51Z
slug: how-do-i-develop-my-terminal-portfolio-website-with-react
featured: false
draft: false
tags:
  - JavaScript
  - ReactJS
  - ContextAPI
  - Styled-Components
  - TypeScript
description:
  "示例文章：使用 ReactJS、TypeScript 和 Styled-Components 开发类终端网站。
  包括自动补全、多主题、命令提示等功能。"
timezone: "Asia/Yangon"
---

> 本文最初来自我的[博客文章](https://satnaing.dev/blog/posts/how-do-i-develop-my-terminal-portfolio-website-with-react)。我放这篇文章是为了演示如何使用 AstroPaper 主题撰写博客文章。

使用 ReactJS、TypeScript 和 Styled-Components 开发类终端网站。包括自动补全、多主题、命令提示等功能。

![Sat Naing 的终端作品集](https://satnaing.dev/_ipx/w_2048,q_75/https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1654754125%2FSatNaing%2Fterminal-screenshot_gu3kkc.png?url=https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1654754125%2FSatNaing%2Fterminal-screenshot_gu3kkc.png&w=2048&q=75)

## 目录

## 介绍

最近，我开发并发布了我个人作品集和博客。我很高兴得到了一些好的反馈。今天，我想介绍我新的类终端作品集网站。它是使用 ReactJS 和 TypeScript 开发的。我的灵感来自 CodePen 和 YouTube。

## 技术栈

这个项目是一个前端项目，没有任何后端代码。UI/UX 部分是在 Figma 中设计的。对于前端用户界面，我选择了 React 而不是纯粹的 JavaScript 和 NextJS。为什么？

- 首先，我想编写声明式代码。使用 JavaScript 命令式地管理 HTML DOM 真的很繁琐。
- 其次，因为它是 React！它快速且可靠。
- 最后，我不需要 NextJS 提供的太多 SEO 功能、路由和图片优化。

当然还有 TypeScript 用于类型检查。

在样式方面，我采取了与平时不同的方法。我没有选择纯 CSS、Sass 或 TailwindCSS 这样的实用 CSS 框架，而是选择了 CSS-in-JS 的方式（Styled-Components）。虽然我知道 Styled-Components 已经有一段时间了，但我从未尝试过。所以，这个项目中 Styled-Components 的编写风格和结构可能不是很有条理或很好。

这个项目不需要非常复杂的状态管理。我只需使用 ContextAPI 来实现多主题和避免 props 逐层传递。

以下是技术栈的快速总结。

- 前端：[ReactJS](https://reactjs.org/ "React 网站")、[TypeScript](https://www.typescriptlang.org/ "TypeScript 网站")
- 样式：[Styled-Components](https://styled-components.com/ "Styled-Components 网站")
- UI/UX：[Figma](https://figma.com/ "Figma 网站")
- 状态管理：[ContextAPI](https://reactjs.org/docs/context.html "React ContextAPI")
- 部署：[Netlify](https://www.netlify.com/ "Netlify 网站")

## 功能特点

以下是该项目的一些功能。

### 多主题

用户可以切换多种主题。在撰写本文时，有 5 种主题；未来可能会添加更多主题。选定的主题保存在本地存储中，因此页面刷新时主题不会改变。

![设置不同主题](https://i.ibb.co/fSTCnWB/terminal-portfolio-multiple-themes.gif)

### 命令行补全

为了尽可能接近真实终端的外观和感觉，我添加了命令行补全功能，只需按 'Tab' 或 'Ctrl + i' 即可自动补全部分输入的命令。

![命令行补全演示](https://i.ibb.co/CQTGGLF/terminal-autocomplete.gif)

### 历史命令

用户可以通过按上箭头和下箭头返回到之前的命令或浏览之前输入的命令。

![使用上箭头返回到之前的命令](https://i.ibb.co/vD1pSRv/terminal-up-down.gif)

### 查看/清除命令历史

之前输入的命令可以通过在命令行中输入 'history' 来查看。所有命令历史和终端屏幕可以通过输入 'clear' 或按 'Ctrl + l' 来清除。

![使用 'clear' 或 'Ctrl + L' 命令清除终端](https://i.ibb.co/SJBy8Rr/terminal-clear.gif)

## 结语

这是一个非常有趣的项目，这个项目的一个特别之处在于我必须专注于逻辑而不是用户界面（尽管这有点像一个前端项目）。

## 项目链接

- 网站：[https://terminal.satnaing.dev/](https://terminal.satnaing.dev/ "https://terminal.satnaing.dev/")
- 仓库：[https://github.com/satnaing/terminal-portfolio](https://github.com/satnaing/terminal-portfolio "https://github.com/satnaing/terminal-portfolio")
