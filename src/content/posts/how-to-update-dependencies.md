---
title: 如何更新 AstroPaper 的依赖
author: Sat Naing
pubDatetime: 2023-07-20T15:33:05.569Z
slug: how-to-update-dependencies
featured: false
draft: false
ogImage: ../../assets/images/forrest-gump-quote.png
tags:
  - FAQ
description: 如何更新项目依赖和 AstroPaper 模板。
---

更新项目的依赖可能很繁琐。然而，忽略更新项目依赖也不是一个好主意 😬。在这篇文章中，我将分享我通常如何更新项目，以 AstroPaper 为例。不过，这些步骤也适用于其他 js/node 项目。

![Forrest Gump Fake Quote](@/assets/images/forrest-gump-quote.png)

## 目录

## 更新包依赖

有几种方法可以更新依赖，我尝试过各种方法来找到最简单的路径。一种方法是使用 `npm install package-name@latest` 手动更新每个包。这是最直接的更新方式。然而，这可能不是最高效的选择。

我推荐的更新依赖方式是使用 [npm-check-updates 包](https://www.npmjs.com/package/npm-check-updates)。freeCodeCamp 上有一篇不错的[文章](https://www.freecodecamp.org/news/how-to-update-npm-dependencies/)介绍了这个工具，所以我不会解释它是什么以及如何使用它。相反，我将展示我的典型方法。

首先，全局安装 `npm-check-updates` 包。

```bash
npm install -g npm-check-updates
```

在进行任何更新之前，最好先检查所有可以更新的新依赖。

```bash
ncu
```

大多数情况下，补丁版本依赖的更新不会影响项目。所以，我通常通过运行 `ncu -i --target patch` 或 `ncu -u --target patch` 来更新补丁依赖。区别在于 `ncu -u --target patch` 会更新所有补丁，而 `ncu -i --target patch` 会提供选项来决定更新哪些包。由你决定采用哪种方法。

接下来是更新次要依赖。次要包的更新通常不会破坏项目，但最好还是检查相应包的发布说明。这些次要更新通常包含一些很酷的功能，可以应用到我们的项目中。

```bash
ncu -i --target minor
```

最后但同样重要的是，依赖中可能有一些主要版本的包更新。因此，通过运行以下命令检查其余的依赖更新：

```bash
ncu -i
```

如果有任何主要更新（或你仍然需要进行的某些更新），上述命令将输出那些剩余的包。如果包是主要版本更新，你必须非常小心，因为这很可能破坏整个项目。因此，请非常仔细地阅读相应的发布说明（或文档），并相应地进行更改。

如果你运行 `ncu -i` 后发现没有更多需要更新的包，那么***恭喜你！！！*** 你已经成功更新了项目中所有的依赖。

## 更新 AstroPaper 模板

像其他开源项目一样，AstroPaper 也在不断进化，包括错误修复、功能更新等。因此，如果你是一个使用 AstroPaper 作为模板的人，当有新版本发布时，你可能也想更新模板。

问题是，你可能已经根据自己的需求修改了模板。因此，我无法确切展示**"放之四海而皆准的完美方式"**来将模板更新到最新版本。不过，这里有一些更新模板而不破坏你仓库的提示。请记住，大多数情况下，更新包依赖可能就足够了。

### 需要注意的文件和目录

在大多数情况下，你可能不想覆盖的文件和目录是 `src/content/blog/`、`src/config.ts`、`src/pages/about.md`，以及其他资源和样式文件，如 `public/` 和 `src/styles/base.css`。

如果你只是对模板做了最小限度的修改，那么用最新的 AstroPaper 替换除上述文件和目录之外的所有内容应该没问题。这就像纯净的 Android 操作系统和其他供应商特定操作系统（如 OneUI）的关系。你对基础的修改越少，需要更新的内容就越少。

你可以逐个手动替换每个文件，或者使用 git 的魔力来更新所有内容。我不展示手动替换过程，因为它非常简单。如果你对那种直接但低效的方法不感兴趣，请继续听我说 🐻。

### 使用 Git 更新 AstroPaper

**重要！！！**

> 只有在你了解如何解决合并冲突时才执行以下操作。否则，你最好手动替换文件或仅更新依赖。

首先，将 astro-paper 添加为项目的远程仓库。

```bash
git remote add astro-paper https://github.com/satnaing/astro-paper.git
```

切换到一个新分支来更新模板。如果你知道自己在做什么并且对自己的 git 技能有信心，可以省略此步骤。

```bash
git checkout -b build/update-astro-paper
```

然后，通过运行以下命令从 astro-paper 拉取更改：

```bash
git pull astro-paper main
```

如果遇到 `fatal: refusing to merge unrelated histories` 错误，可以通过运行以下命令解决：

```bash
git pull astro-paper main --allow-unrelated-histories
```

运行上述命令后，你很可能会在项目中遇到冲突。你需要手动解决这些冲突，并根据需要进行必要的调整。

解决冲突后，彻底测试你的博客，确保一切正常运行。检查你的文章、组件以及你做的任何自定义修改。

对结果满意后，将更新分支合并到你的主分支（如果你在另一个分支中更新模板）。恭喜！你已成功将模板更新到最新版本。你的博客现在是最新的，准备大放异彩！🎉

## 总结

在本文中，我分享了一些关于更新依赖和 AstroPaper 模板的见解和流程。我真诚地希望这篇文章对你有价值，并能帮助你更有效地管理项目。

如果你有任何更新依赖/AstroPaper 的替代或改进方法，我很乐意听取你的意见。因此，请随时在仓库中发起讨论、给我发邮件或创建一个 issue。非常感谢你的意见和想法！

请理解我最近日程安排很忙，可能无法快速回复。但我保证会尽快回复你。😬

感谢你花时间阅读这篇文章，祝你的项目一切顺利！
