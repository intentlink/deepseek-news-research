# 贡献指南

欢迎贡献！本项目坚持**内容与框架分离**：研究者只写 Markdown，框架可独立迭代。

## 快速开始

```bash
git clone https://github.com/intentlink/deepseek-news-research.git
cd deepseek-news-research
# 任意静态服务即可，file:// 亦可读（正文已嵌入）
npx serve .   # http://localhost:3000
```

## 两类贡献

### A. 内容（论文笔记）— 详见 `docs/CONTENT_GUIDE.md`

```bash
# 新增一篇
# 2026/my-topic.md 按模板填写后
node scripts/build.mjs   # 生成 data/papers.json + assets/js/data.js
# 提交时包含生成物
```

- 模板、命名、链接有效性见 `docs/CONTENT_GUIDE.md`
- 无需改 `README` 索引外的框架代码

### B. 框架（视觉/交互）— 详见 `docs/FRAMEWORK_GUIDE.md`

- 视觉：`assets/css/style.css`（5loi tokens）
- 交互：`assets/js/app.js`
- 薄壳：`index.html`

## 分支与 PR

```bash
git checkout -b add-paper-xxx
git add 2026/xxx.md data/papers.json assets/js/data.js
git commit -m "docs: add xxx"
git push origin add-paper-xxx
```

- PR 标题：`docs: add xxx` / `feat: ...` / `fix: ...`
- PR 需通过 CI：`markdownlint` + `lychee` + `build` 一致性

## 规范

- 语言：中文为主，术语保留英文原名
- 链接：`arXiv` 必填且 200；`GitHub` 仅当 200 时填写
- 格式：UTF-8，`LF`，`markdownlint` 以 `.markdownlint.json` 为准

## 行为准则

见 `CODE_OF_CONDUCT.md`。

## 许可证

贡献即同意以 `LICENSE`（MIT，代码）与 `CC BY 4.0`（内容，见 `README`）发布。
