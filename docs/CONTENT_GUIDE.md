# 内容指南 · Content Guide — 只写 Markdown

> 适合：研究者、论文笔记贡献者。无需触碰框架。

## 1. 新增一篇

```bash
# 1) 新建文件（年份按发布年）
touch 2026/my-topic.md

# 2) 按模板填充（见下）

# 3) 生成索引（必需）
node scripts/build.mjs

# 4) 本地预览
npx serve .   # 打开 http://localhost:3000
```

## 2. 模板（与现有 31 篇一致）

```markdown
# 标题（与 arXiv 一致）

**日期**: 2026 年 1 月 28 日  
**arXiv**: https://arxiv.org/abs/2601.20552  
**HuggingFace**: https://huggingface.co/collections/deepseek-ai/xxx  
**备注**: 无独立仓库时用备注说明（勿写 404 GitHub）

## 概述
一段 150-200 字摘要，build.mjs 将截取为卡片 summary。

## 论文要点
- **核心创新**：
- **性能**：
...

## 技术细节
...

## 应用场景
...

## 相关研究
...

## 笔记
...
```

**规则**
- 文件名：小写 + 连字符，如 `deepseek-ocr-2.md`
- 标题：`# ` 唯一 H1，即卡片标题
- 日期：`YYYY 年 M 月 D 日`，用于排序
- 链接：`arXiv` 必填；`GitHub` 仅当仓库返回 200 时填写，否则用 `**备注**:` 说明
- 分类：由 `scripts/build.mjs` 的 `KNOWN_CATS` 映射；新论文可在正文出现关键词（推理/多模态/基础设施/数学/代码/长上下文/架构）自动推断，或在 `build.mjs` 追加映射

## 3. 更新与删除

- 更新：直接编辑 `md` 后重跑 `node scripts/build.mjs`
- 删除：删 `md` 后重跑 `build.mjs`，`README` 索引需同步手改（或后续自动化）

## 4. 质量检查

```bash
npm run build          # 等价 node scripts/build.mjs
# CI 将检查：markdownlint + lychee 链接 + 生成物一致性
```

- 链接：`arXiv`/`GitHub`/`HuggingFace` 需可达 200
- 乱码：全文 UTF-8，`assets/js/data.js` 已嵌入，勿直接链 `.md`
