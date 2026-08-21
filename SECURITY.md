# 安全政策

## 报告漏洞

请勿公开提交敏感漏洞。通过 GitHub **Security Advisory** 私密报告：

- `Security` → `Report a vulnerability`

或创建私密 Issue 并标记 `security`。我们将在 7 天内响应。

## 范围

本项目为静态 Markdown + 前端长卷，无后端、无密钥。重点关注：

- 链接投毒（伪造 arXiv/GitHub）
- XSS（`marked` 渲染注入）
- 依赖投毒（`marked` CDN）

## 最佳实践

- 勿提交密钥、`.env`、`node_modules/`
- 更新依赖：`npm audit`（若引入）；CDN 使用 `SRI`（后续加强）

## 致谢

感谢负责任披露的研究者。
