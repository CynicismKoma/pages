---
author: Simon Smale
pubDatetime: 2024-01-03T20:40:08Z
modDatetime: 2024-01-08T18:59:05Z
title: 如何使用 Git Hooks 设置创建和修改日期
featured: false
draft: false
tags:
  - docs
  - FAQ
canonicalURL: https://smale.codes/posts/setting-dates-via-git-hooks/
description: 如何使用 Git Hooks 在 AstroPaper 中设置创建和修改日期
---

在这篇文章中，我将解释如何使用 pre-commit Git hook 自动填充 AstroPaper 博客主题 frontmatter 中的创建日期（`pubDatetime`）和修改日期（`modDatetime`）。

## 目录

## 处处可用

[Git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) 非常适合自动化任务，例如[添加](https://gist.github.com/SSmale/3b380e5bbed3233159fb7031451726ea)或[检查](https://itnext.io/using-git-hooks-to-enforce-branch-naming-policy-ffd81fa01e5e)分支名称到提交信息，或者[阻止你提交明文密码](https://gist.github.com/SSmale/367deee757a9b2e119d241e120249000)。它们最大的缺点是客户端 hook 是每台机器独立的。

你可以通过创建 `hooks` 目录并手动将它们复制到 `.git/hooks` 目录或设置符号链接来解决此问题，但这都需要你记住去设置，而这不是我擅长的事情。

由于这个项目使用 npm，我们可以利用一个名为 [Husky](https://typicode.github.io/husky/) 的包（AstroPaper 已安装）来自动安装 hooks。

> 更新！在 AstroPaper [v4.3.0](https://github.com/satnaing/astro-paper/releases/tag/v4.3.0) 中，pre-commit hook 已被移除，改为使用 GitHub Actions。不过，你可以轻松地[自行安装 Husky](https://typicode.github.io/husky/get-started.html)。

## Hook

由于我们希望这个 hook 在提交代码时运行以更新日期，并将这些更改作为我们更改的一部分，我们将使用 `pre-commit` hook。AstroPaper 项目已经设置好了这个 hook，但如果还没有，你需要运行 `npx husky add .husky/pre-commit 'echo "This is our new pre-commit hook"'`。

导航到 `hooks/pre-commit` 文件，我们将添加以下一个或两个片段。

### 文件编辑时更新修改日期

---

更新：

本节已更新了一个更智能的 hook 版本。它现在不会递增 `modDatetime`，直到文章发布。在首次发布时，将草稿状态设置为 `first`，然后见证奇迹发生。

---

```shell
# 已修改文件，更新 modDatetime
git diff --cached --name-status |
grep -i '^M.*\.md$' |
while read _ file; do
  filecontent=$(cat "$file")
  frontmatter=$(echo "$filecontent" | awk -v RS='---' 'NR==2{print}')
  draft=$(echo "$frontmatter" | awk '/^draft: /{print $2}')
  if [ "$draft" = "false" ]; then
    echo "$file modDateTime updated"
    cat $file | sed "/---.*/,/---.*/s/^modDatetime:.*$/modDatetime: $(date -u "+%Y-%m-%dT%H:%M:%SZ")/" > tmp
    mv tmp $file
    git add $file
  fi
  if [ "$draft" = "first" ]; then
    echo "First release of $file, draft set to false and modDateTime removed"
    cat $file | sed "/---.*/,/---.*/s/^modDatetime:.*$/modDatetime:/" | sed "/---.*/,/---.*/s/^draft:.*$/draft: false/" > tmp
    mv tmp $file
    git add $file
  fi
done
```

`git diff --cached --name-status` 从 git 中获取已暂存等待提交的文件。输出看起来像：

```shell
A       src/content/blog/setting-dates-via-git-hooks.md
```

开头的字母表示已执行的操作，在上面的例子中文件已被添加。已修改的文件有 `M`

我们将该输出通过管道传递给 grep 命令，查找已修改的每一行。行需要以 `M` 开头（`^(M)`），之后有任何数量的字符（`.*`），并以 `.md` 文件扩展名结尾（`.(md)$`）。这将过滤出不是已修改 markdown 文件的行 `egrep -i "^(M).*\.(md)$"`。

---

#### 改进 - 更精确

可以将其限制为仅查找 `blog` 目录中的 markdown 文件，因为这些文件是唯一会有正确 frontmatter 的文件。

---

正则表达式将捕获两个部分：字母和文件路径。我们将此列表通过管道传递给 while 循环，以遍历匹配的行，并将字母赋值给 `a`，路径赋值给 `b`。我们现在忽略 `a`。

要知道文件的草稿状态，我们需要它的 frontmatter。在以下代码中，我们使用 `cat` 获取文件内容，然后使用 `awk` 在 frontmatter 分隔符（`---`）处分割文件，并取第二个块（frontmatter，即 `---` 之间的部分）。然后再次使用 `awk` 查找 draft 键并打印其值。

```shell
  filecontent=$(cat "$file")
  frontmatter=$(echo "$filecontent" | awk -v RS='---' 'NR==2{print}')
  draft=$(echo "$frontmatter" | awk '/^draft: /{print $2}')
```

现在我们有了 `draft` 的值，我们将做三件事之一：将 modDatetime 设置为当前时间（当 draft 为 false 时 `if [ "$draft" = "false" ]; then`），清除 modDatetime 并将 draft 设置为 false（当 draft 设置为 first 时 `if [ "$draft" = "first" ]; then`），或者什么都不做（在任何其他情况下）。

接下来使用 sed 命令的部分对我来说有点神奇，因为我不经常使用它，它是从[另一篇做类似事情的博客文章](https://mademistakes.com/notes/adding-last-modified-timestamps-with-git/)中复制来的。本质上，它在文件的 frontmatter 标签（`---`）内查找 `pubDatetime:` 键，获取整行并将其替换为 `pubDatetime: $(date -u "+%Y-%m-%dT%H:%M:%SZ")/"`（相同的键和当前正确格式化的日期时间）。

这个替换是在整个文件的上下文中进行的，所以我们将其放入一个临时文件（`> tmp`），然后移动（`mv`）新文件覆盖旧文件的位置。然后将其添加到 git 中，就像我们自己做了更改一样准备提交。

---

#### 注意

要使 `sed` 正常工作，frontmatter 中需要已经存在 `modDatetime` 键。你还需要进行一些其他更改，以便应用能够使用空白日期构建，详见[下文](#空-moddatetime-的更改)。

---

### 为新文件添加日期

为新文件添加日期的过程与上述相同，但这次我们查找已添加（`A`）的行，并替换 `pubDatetime` 值。

```shell
# 新文件，添加/更新 pubDatetime
git diff --cached --name-status | egrep -i "^(A).*\.(md)$" | while read a b; do
  cat $b | sed "/---.*/,/---.*/s/^pubDatetime:.*$/pubDatetime: $(date -u "+%Y-%m-%dT%H:%M:%SZ")/" > tmp
  mv tmp $b
  git add $b
done
```

---

#### 改进 - 只循环一次

我们可以使用 `a` 变量在循环内切换，一次循环中要么更新 `modDatetime`，要么添加 `pubDatetime`。

---

## 填充 Frontmatter

如果你的 IDE 支持代码片段，你可以创建自定义代码片段来填充 frontmatter。[AstroPaper v4 默认会为 VSCode 提供一个。](https://github.com/satnaing/astro-paper/pull/206)

<video autoplay muted="muted" controls plays-inline="true" class="border border-skin-line">
  <source src="https://github.com/satnaing/astro-paper/assets/17761689/e13babbc-2d78-405d-8758-ca31915e41b0" type="video/mp4">
</video>

## 空 `modDatetime` 的更改

为了让 Astro 能够编译 markdown 并正常工作，它需要知道 frontmatter 中期望什么。它通过 `src/content/config.ts` 中的配置来实现。

要允许键存在但值为空，我们需要编辑第 10 行，添加 `.nullable()` 函数。

```ts
const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional(), // [!code --]
      modDatetime: z.date().optional().nullable(), // [!code ++]
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      readingTime: z.string().optional(),
    }),
});
```

为了阻止 IDE 在博客引擎文件中报错，我还做了以下操作：

1. 在 `src/layouts/Layout.astro` 的第 15 行添加 `| null`，使其变为：

   ```typescript
   export interface Props {
     title?: string;
     author?: string;
     description?: string;
     ogImage?: string;
     canonicalURL?: string;
     pubDatetime?: Date;
     modDatetime?: Date | null;
   }
   ```

2. 在 `src/components/Datetime.tsx` 的第 5 行添加 `| null`，使其变为：

   ```typescript
   interface DatetimesProps {
     pubDatetime: string | Date;
     modDatetime: string | Date | undefined | null;
   }
   ```
