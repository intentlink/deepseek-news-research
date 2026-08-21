# 框架指南 · Framework Guide — 独立迭代视觉与交互

> 适合：前端/设计贡献者。无需触碰 `2023/`–`2026/`。

## 1. 视觉 — `assets/css/style.css`

- 单文件 19k，0 框架，`@import` 仅 `lxgw-wenkai-webfont`
- Tokens ` :root:11`：`--background:#0a1628` `--ink-blue:#111e32` `--gold:#c9a962` `--gold-light:#e8d5a3` `--bronze:#8b7355`
- 改色/改字/改毛玻璃：只改本文件，`index.html` 无需动
- 关键组件：`.frosted`、`.vertical-text`、` .seal`、`.bench`、`.paper`、`.drawer`

```bash
# 预览
npx serve .
# 修改后无需 build，刷新即可
```

## 2. 交互 — `assets/js/app.js`

- 13k，原生 JS，依赖仅 `marked` CDN
- 结构：`CAT_NAMES` → `renderPapers`/`renderTimeline`/`renderNews` → `filter` → `openPaper`/`showDrawer`（hash 路由）→ `bind*`
- 数据源：`window.__PAPERS__`（`assets/js/data.js` 嵌入，`file://` 可用）回退 `fetch data/papers.json`
- 亮点：`#paper/<id>` hash 分享；抽屉内 `TOC` 自动生成；`j/k` 翻篇；拦截 `.md` 直链

## 3. 薄壳 — `index.html`

- 230 行，含 `hero`（竖排文字+印章）、`lab`（3 卡）、`papers`（筛选）、`evolution`（时间线）、`news`、`contribute`、`footer`、`#drawer`
- 新增区块只需在薄壳加 `section`，无需改 `app.js`（除非需新数据源）

## 4. 构建 — `scripts/build.mjs`

- 输入：`2023/`–`2026/*.md`，解析 `#标题`、`**日期**`、`arXiv`/`GitHub`/`HuggingFace`、`## 概述`
- 输出：`data/papers.json`（元数据）+ `assets/js/data.js`（元数据+`body`嵌入）
- 新增分类：在 `KNOWN_CATS` 追加 `slug: [cats]`

```bash
node scripts/build.mjs  # 提交前必跑，CI 会校验 git diff
```

## 5. 演进建议

- 视觉：可抽取 `assets/css/tokens.css`；支持浅色模式仅需反转 `background/foreground`
- 交互：可加 `localStorage` 记忆筛选；`data/papers.json` 200 验证已在 CI
- 性能：`data.js` 128k 可改为仅发布 `papers.json` + 懒加载 `body`，但会失去 `file://` 直读
