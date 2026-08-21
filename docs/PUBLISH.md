# 发布流程 · Publish Guide

本项目为独立开源仓库，发布流程如下。

## 首次发布

```bash
# 1. 克隆/进入仓库
git clone https://github.com/intentlink/deepseek-news-research.git
cd deepseek-news-research

# 2. 本地验证
npm run build          # 生成 data/papers.json + assets/js/data.js
npm run lint           # markdownlint
npx serve .            # 预览 http://localhost:3000

# 3. 推送（首次）
git add .
git commit -m "feat: initial open source release"
git push -u origin main
```

## 后续版本发布

```bash
# 1. 内容更新后
node scripts/build.mjs

# 2. 提交（包含生成物）
git add 2026/new-paper.md data/papers.json assets/js/data.js
git commit -m "docs: add new-paper"
git push
```

## GitHub Pages 部署

1. **Settings → Pages**
   - Source: `Deploy from a branch`
   - Branch: `main` / `/ (root)`
   - Save

2. 访问 `https://intentlink.github.io/deepseek-news-research/` 验证

> CI 已配置自动部署（`.github/workflows/ci.yml` 的 `deploy` job），推送到 `main` 会自动同步到 `gh-pages` 分支。

## 发布清单

- [ ] `npm run build` 通过
- [ ] `npm run lint` 通过
- [ ] 本地 `npx serve .` 预览无误
- [ ] CI 绿色（markdownlint + lychee + build）
- [ ] Pages 可访问
- [ ] Issues / Discussions 已开启（Settings → Features）
- [ ] Description / Topics / Website 填写完整
  - Description: `在压缩与稀疏之间，解码 DeepSeek 的纹理 — 31篇论文的本地可交互数字长卷`
  - Topics: `deepseek`, `research`, `scroll`, `5loi`, `markdown`, `visualization`
  - Website: `https://intentlink.github.io/deepseek-news-research/`

## 徽章更新

README 中的徽章指向 `intentlink/deepseek-news-research`，若仓库迁移需同步修改：

| 徽章 | 路径 |
|------|------|
| CI | `.github/workflows/ci.yml` |
| Pages | `https://intentlink.github.io/deepseek-news-research/` |
| Stars | `https://github.com/intentlink/deepseek-news-research/stargazers` |

## 版本标记（可选）

```bash
git tag -a v1.0.0 -m "首个开源版本：31篇论文、完整框架、CI/CD"
git push origin v1.0.0
```