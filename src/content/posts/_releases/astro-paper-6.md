---
pubDatetime: 2026-05-17T07:15:45.792Z
title: AstroPaper 6.0
slug: astro-paper-v6
featured: true
ogImage: assets/AstroPaper-v6.png
tags:
  - release
description: "AstroPaper v6：基于 Astro v6、Tailwind v4 和全新配置系统的从头重写。"
---

AstroPaper v6 是一次基于 Astro v6、Tailwind CSS v4 和 TypeScript v6 的完整重写。此版本用单一统一配置文件替换了旧的 `SITE` / `constants.ts` 配置，并在代码库中引入了若干结构性改进。

![AstroPaper v6](assets/AstroPaper-v6.png)

## 目录

## 主要变化

### 升级到 Astro v6

AstroPaper 现在搭载 Astro v6.3，其中包括：

- **稳定的 Content Layer API** — `glob()` 加载器取代了旧的 `type: "content"` 集合模式。
- **稳定的字体 API** — `experimental.fonts` 已升级为 `astro.config.ts` 中的顶级 `fonts` 键。
- **TypeScript v6** — 完全支持最新的 TypeScript 编译器。

### 新的统一配置系统

`src/config.ts` 中的扁平 `SITE` 对象和单独的 `constants.ts` 文件已被项目根目录的单个 `astro-paper.config.ts` 文件取代。使用 `defineAstroPaperConfig()` 获取完整的 IntelliSense 支持：

```ts file="astro-paper.config.ts"
import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://your-site.com/",
    title: "AstroPaper",
    description: "…",
    author: "Your Name",
    lang: "en",
    timezone: "UTC",
    googleVerification: "your-verification-value",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000, // 毫秒
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: { enabled: true, url: "https://github.com/…/edit/main/" },
    search: "pagefind",
  },
  socials: [{ name: "github", url: "https://github.com/…" }],
  shareLinks: [{ name: "x", url: "https://x.com/intent/post?url=" }],
});
```

所有选项——站点元数据、分页、功能标志、社交链接和分享链接——现在都位于一个文件中。

### 稳定的字体 API

字体配置已从 `experimental.fonts` 升级为 `astro.config.ts` 中的顶级 `fonts` 键，与 Astro v6 的稳定 API 保持一致：

```ts file="astro.config.ts"
export default defineConfig({
  fonts: [
    {
      name: "Google Sans Code",
      cssVariable: "--font-google-sans-code",
      provider: fontProviders.google(),
      weights: [300, 400, 500, 600, 700],
      styles: ["normal", "italic"],
    },
  ],
});
```

### MDX 支持

现在包含了 `@astrojs/mdx`。文章可以使用 `.mdx` 扩展名来嵌入组件、使用 JSX 表达式以及从其他文件导入。内容加载器模式 `**/[^_]*.{md,mdx}` 会自动包含两种格式。

### 内容集合重组

博客文章已从 `src/data/blog/` 移至 `src/content/posts/`，与 Astro 约定保持一致。`src/content/pages/` 下新增的 `pages` 集合涵盖独立页面（关于等）。`posts` 集合使用 Astro 的 `glob()` 加载器——不再使用带有 `type: "content"` 的 `defineCollection`：

```ts file="src/content.config.ts"
const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      author: z.string(),
      pubDatetime: z.date(),
      title: z.string(),
      tags: z.array(z.string()).default(["others"]),
      description: z.string(),
      // …
    }),
});
```

### 设计令牌系统

v5 的 5 令牌调色板已扩展到 `src/styles/theme.css` 中的 7 个令牌。令牌被定义为 CSS 自定义属性，并通过 `@theme inline` 注册到 Tailwind v4：

```css file="src/styles/theme.css"
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
}

:root,
[data-theme="light"] {
  --background: #fdfdfd;
  --foreground: #282728;
  --accent: #006cac;
  --accent-foreground: #ffffff;
  --muted: #e6e6e6;
  --muted-foreground: #6b7280;
  --border: #ece9e9;
}

[data-theme="dark"] {
  --background: #212737;
  --foreground: #eaedf3;
  --accent: #ff6b01;
  --accent-foreground: #ffffff;
  --muted: #343f60;
  --muted-foreground: #afb9ca;
  --border: #ab4b08;
}
```

`theme.css` 是由 `global.css` 导入的独立文件。两个新令牌是 `--accent-foreground` 和 `--muted-foreground`。

### i18n 字符串提取

所有 UI 字符串已提取到 `src/i18n/lang/en.ts`，使用 `UIStrings` 接口。添加新语言只需在 `src/i18n/lang/` 中新建一个文件：

```ts file="src/i18n/lang/en.ts"
export default {
  nav: { home: "首页", posts: "文章" /* … */ },
  post: { publishedAt: "发布于" /* … */ },
  /* … */
} satisfies UIStrings;
```

`tplStr()` 助手处理参数化字符串，使翻译人员可以自由重新排列标记。

### 基础路径和子目录部署支持

所有内部链接都通过 `getRelativeLocaleUrl()` 和 `withBase.ts` 助手（`stripLocale`、`stripBase`、`getAssetPath`）。部署到子目录（例如 `/astro-paper`）无需手动更新链接。

### 通过配置进行 Google 站点验证

设置 Google 站点验证的首选方式是通过 `astro-paper.config.ts` 中的 `site.googleVerification`：

```ts file="astro-paper.config.ts"
export default defineAstroPaperConfig({
  site: {
    // …
    googleVerification: "your-google-site-verification-value",
  },
});
```

`PUBLIC_GOOGLE_SITE_VERIFICATION` 环境变量仍然支持作为后备方案，适用于不希望将值提交到配置文件的情况。

```bash file=".env"
PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-site-verification-value
```

当两者都设置时，`site.googleVerification` 优先。

## 其他值得注意的变化

- 更新并重命名了助手/工具函数。
- 相邻文章导航（上一篇/下一篇）现在在 `getStaticPaths` 中一次性计算并作为 props 传递——组件不再每页获取所有文章。
- `_components/` 作用域：文章特定组件位于 `pages/posts/[...slug]/_components/` 下，不会污染全局的 `src/components/` 目录。
- `PostLayout.astro` 仅处理结构化数据和 SEO——文章页面逻辑位于页面文件本身。

## 总结

AstroPaper v6 保留了其极简干净的外观，同时围绕 Astro v6 的新原语重建了内部结构。配置系统更简单，代码库更易于导航，主题开箱即用支持 i18n 和子目录部署。

## 另请参阅

- [预定义配色方案](/posts/predefined-color-schemes/)
- [如何配置 AstroPaper 主题](/posts/how-to-configure-astropaper-theme/)
- [在 AstroPaper 中添加新文章](/posts/adding-new-posts-in-astropaper-theme)
