# DeepSeek-V4: Towards Highly Efficient Million-Token Context Intelligence

**日期**: 2026 年 6 月 24 日  
**arXiv**: https://arxiv.org/abs/2606.19348  
**HuggingFace**: https://huggingface.co/collections/deepseek-ai/deepseek-v4  
**备注**: GitHub 仓库待官方发布（预览版已在 HF 开放）

## 概述

DeepSeek-V4 推出两款 MoE 语言模型：DeepSeek-V4-Pro（1.6T 参数，49B 激活）和 DeepSeek-V4-Flash（284B 参数，13B 激活），均支持百万 token 上下文。核心升级包括混合注意力架构（CSA + HCA）、Manifold-Constrained Hyper-Connections（mHC）增强残差连接、以及 Muon 优化器。模型在 32T+ tokens 上预训练并经历完整后训练，使其在长上下文场景下显著提升效率，同时保持 SOTA 级推理能力。该模型代表了当前开源模型的最高水平，标志着百万 token 上下文成为常规能力。

## 论文要点

- **模型规模**：DeepSeek-V4-Pro 1.6T 参数（49B 激活），DeepSeek-V4-Flash 284B 参数（13B 激活），均支持 1M token 上下文。
- **混合注意力**：Compressed Sparse Attention（CSA）+ Heavily Compressed Attention（HCA）实现长上下文高效推理。
- **架构增强**：Manifold-Constrained Hyper-Connections（mHC）提升残差连接建模能力；Muon 优化器加快收敛并提升训练稳定性。
- **效率提升**：在 1M token 上下文下，DeepSeek-V4-Pro 单 token 推理 FLOPs 仅为 DeepSeek-V3.2 的 27%，KV cache 仅 10%；Flash 进一步降至 10% FLOPs、7% KV cache。
- **性能**：DeepSeek-V4-Pro-Max 在知识、推理、Agent、长上下文基准上表现领先，接近或超越 Gemini-3.1-Pro、GPT-5.4 等前沿模型。
- **训练规模**：预训练 32T-33T tokens，后训练采用领域专家独立培养 + On-Policy Distillation 统一。

## 技术细节

- **混合注意力**：CSA 对 KV cache 按序列维度压缩后执行 DeepSeek Sparse Attention；HCA 更激进压缩 KV 并保持稠密注意力。
- **mHC**：在残差连接上施加流形约束，提升信息传播与建模能力。
- **Muon 优化器**：替代 Adam 系列，加速收敛并提升训练稳定性。
- **基础设施**：MoE 模块融合核、TileLang DSL、批不变确定性核库、ZeRO 混合策略、上下文并行、KV cache 异构存储与磁盘卸载。
- **后训练**：领域专家独立 SFT + RL（GRPO），随后 On-Policy Distillation 统一模型；FP4 量化感知训练降低内存与计算。

## 应用场景

- 超长上下文推理：百万 token 级别文档分析、代码库理解、长对话。
- 复杂 Agent 工作流：跨文档检索、知识整合、长程规划。
- 测试时间扩展：长上下文推理与检索结合，提升复杂问题求解。
- 高效部署：Flash 版本适合资源受限环境，Pro 版本追求极致性能。

## 相关研究

- DeepSeek-V3：前身架构，DeepSeekMoE、MTP。
- CSA/HCA 相关压缩注意力研究、稀疏注意力。
- mHC：Xie et al. 2026 流形约束超连接。
- Muon 优化器：Jordan et al. 2024、Liu et al. 2025。

## 笔记

- 百万上下文的效率突破主要来自混合压缩注意力与优化器改进。
- V4-Pro-Max 在推理努力最大化模式下重新定义开源模型 SOTA。
- 架构与基础设施协同设计，使长上下文成为常规能力。
