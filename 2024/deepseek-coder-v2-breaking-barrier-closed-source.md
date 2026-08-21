# DeepSeek-Coder-V2: Breaking the Barrier of Closed-Source Models

**日期**: 2024 年 6 月 17 日  
**arXiv**: https://arxiv.org/abs/2406.11931  
**GitHub**: https://github.com/deepseek-ai/DeepSeek-Coder-V2  
**HuggingFace**: https://huggingface.co/deepseek-ai

## 概述
DeepSeek-Coder-V2 是开源 MoE 代码语言模型，基于 DeepSeek-V2 中间检查点继续预训练 6T token，显著提升代码与数学推理能力，同时保持通用语言性能。模型包含 236B 总参数、21B 激活参数，支持 338 种编程语言，上下文长度达 128K。在 HumanEval、MBPP、LiveCodeBench 等基准上超越 GPT-4-Turbo、Claude 3 Opus、Gemini 1.5 Pro 等闭源模型，打破开源代码模型性能壁垒。该模型标志着开源代码模型首次全面超越闭源模型。

## 论文要点
- 模型架构：MoE，236B 总参数，21B 激活参数，16B 小规模版本，激活参数 2.4B。
- 预训练：基于 DeepSeek-V2，追加 6T token，共 10.2T；数据构成 60% 代码、10% 数学、30% 自然语言。
- 数据规模：代码 1.17T token，数学 221B token，语言采样自 V2；语言支持从 86 扩展到 338。
- 上下文：从 16K 扩展到 128K，支持长代码输入。
- 对齐：指令微调 + GRPO 强化学习，使用编译器反馈与测试用例偏好数据。
- 性能：HumanEval 90.2%，MBPP 76.2%，LiveCodeBench 43.4%，MATH 75.7%，AIME 超越 GPT-4o；代码与数学基准超越闭源模型。

## 技术细节
- 数据构建：GitHub 与 CommonCrawl 代码，DeepSeekMath pipeline 清洗；仓库级去重与质量筛选。
- 架构细节：DeepSeekMoE 主干，GQA、MLA 等高效注意力，RoPE 位置编码。
- 预训练策略：持续预训练，混合代码/数学/语言语料，FIM 预训练用于代码补全。
- 对齐阶段：指令数据来自 DeepSeek-Coder 与 DeepSeek-Math，GRPO 对齐偏好。
- 评估：HumanEval、MBPP、LiveCodeBench、SWEBench、GSM8K、MATH、AIME。

## 应用场景
- 代码生成与补全：IDE 实时补全、函数生成、跨文件项目级代码理解。
- 代码问答与修复：自然语言描述转代码、错误定位与修复建议。
- 数学推理与编程竞赛：LeetCode 题解、数学证明辅助。
- 多语言开发：338 语言支持，适合全栈与稀有语言开发。
- 大规模代码分析：128K 上下文支持大型代码库理解。

## 相关研究
- DeepSeek-Coder、DeepSeek-V2、DeepSeek-Math：前身模型与数据 pipeline。
- CodeLlama、StarCoder、Codestral：开源代码模型竞品。
- GPT-4-Turbo、Claude 3 Opus、Gemini 1.5 Pro：闭源对标模型。
- MoE 训练：GShard、Switch Transformer、DeepSeekMoE。

## 笔记
