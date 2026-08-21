# DeepSeek-Prover: Advancing Theorem Proving with LLMs

**日期**: 2024 年 5 月 20 日  
**arXiv**: https://arxiv.org/abs/2405.14333  
**GitHub**: https://github.com/deepseek-ai/DeepSeek-Prover  
**HuggingFace**: https://huggingface.co/deepseek-ai

## 概述
DeepSeek-Prover 通过大规模合成数据提升 LLM 在形式化定理证明能力。团队从高中和本科数学竞赛题生成 Lean 4 证明数据，构建 800 万条形式化陈述与证明的合成数据集，并在 DeepSeekMath 7B 上微调。模型在 Lean 4 miniF2F 测试上达到 46.3%（64 samples）和 52% 累计正确率，超越 GPT-4 的 23.0% 和树搜索 RL 方法的 41.0%。在 FIMO 基准上证明 5/148 题，GPT-4 零证明。该工作为后续 DeepSeek-Prover-V1.5 和 V2 的发展奠定了基础。

## 论文要点
- 数据生成：自然语言题 → 形式化陈述 → 过滤低质量 → 生成证明，覆盖高中/本科竞赛题。
- 合成规模：800 万条形式化陈述与证明，构建大规模定理证明训练集。
- 微调基线：DeepSeekMath 7B，微调后在形式化证明上显著提升。
- 评测：miniF2F Lean 4 测试，64 samples 46.3%，累计 52%，超越 GPT-4 与树搜索 RL。
- FIMO 表现：证明 5/148 题，GPT-4 无法证明任何。
- 开源：合成数据集与模型公开，促进形式化定理证明研究。

## 技术细节
- 数据管道：翻译自然语言为 Lean 4 陈述，过滤低质量陈述，自动生成证明。
- 训练目标：整段证明生成，监督微调，学习形式化推理模式。
- 模型：基于 DeepSeekMath 7B，解码器仅 Transformer，支持 Lean 语法。
- 评估细节：整段证明生成准确率，样本数影响，累计正确率统计。
- 后续工作：DeepSeek-Prover-V1.5 引入 RLPAF、MCTS、truncate-and-resume 等增强。

## 应用场景
- 形式化定理验证：Lean、Coq、Isabelle 等证明助手辅助。
- 数学教育：自动生成证明、教学辅助、竞赛题练习。
- 研究辅助：数学定理自动证明、定理发现与验证。
- 代码形式化：程序验证、形式化规范生成。

## 相关研究
- GPT-4 定理证明尝试。
- Lean Dojo、Mathlib 社区。
- AlphaProof、AlphaTensor 等自动数学推理。
- DeepSeek-Prover-V1.5、后续 RLPAF 与 MCTS 工作。

## 笔记
