# Engram: Conditional Memory via Scalable Lookup

**日期**: 2026 年 1 月 12 日  
**arXiv**: https://arxiv.org/abs/2601.07372  
**GitHub**: https://github.com/deepseek-ai/Engram  
**HuggingFace**: https://huggingface.co/deepseek-ai

## 概述

Engram 提出将条件记忆作为大模型稀疏性的新轴，通过可扩展的查找机制实现知识检索。不同于 MoE 的条件计算，Engram 基于经典 N-gram 嵌入进行 O(1) 查找，构建条件记忆模块，并在模型中引入 Sparsity Allocation 问题，找到神经计算与静态记忆的平衡。研究发现 U 形缩放规律，合理分配参数可提升性能。

## 论文要点

- **核心思想**：条件记忆作为稀疏性新轴，Engram 模块通过 N-gram 嵌入实现 O(1) 查找，补充 MoE 的条件计算。
- **Sparsity Allocation**：在固定参数预算下，神经计算与静态记忆的分配存在 U 形缩放规律，最优分配可超越纯 MoE。
- **性能提升**：在 27B 参数规模下，Engram 对比同参数、同 FLOPs MoE 基线，在知识检索、推理、代码数学等任务均有显著提升，如 MMLU +3.4、BBH +5.0、HumanEval +3.0、MATH +2.4。
- **机制分析**：Engram 减轻早期层静态重构负担，增强网络有效深度；将局部依赖委托给查找，释放注意力容量用于全局上下文，提升长上下文检索（如 Multi-Query NIAH 84.2→97.0）。
- **效率**：确定性寻址支持运行时预取，可将 100B 参数表卸载到主机内存，额外开销 <3%。

## 技术细节

- **N-gram 嵌入**：基于后缀 N-gram 哈希查找，支持多头哈希、多阶 N-gram，token 压缩提升语义密度。
- **上下文感知门控**：利用当前隐藏状态与检索嵌入进行门控，结合 RMSNorm 与 SiLU 激活，动态抑制噪声。
- **多分支集成**：在多分支架构中共享 embedding 表与 Value 投影，分支独立 Key 投影以实现差异化门控。
- **系统效率**：训练时表分片与 All-to-All，推理时主机内存卸载与预取，通信与计算重叠。

## 应用场景

- 大规模语言模型稀疏化：为 MoE 提供条件记忆补充，提升知识检索与推理能力。
- 长上下文处理：通过检索释放注意力资源，提升长文本检索与推理。
- 高效推理：利用确定性查找实现主机内存卸载，降低 GPU 内存压力。

## 相关研究

- MoE 条件计算：Shazeer et al.、Dai et al.。
- N-gram 嵌入：经典 N-gram 模型与哈希查找。
- 条件记忆：Bengio et al.、最近的检索增强生成研究。

## 笔记

- 条件记忆作为稀疏性的新维度，可与 MoE 互补。
- U 形缩放规律提示需合理分配计算与记忆资源。
- Engram 将静态模式存储与动态计算分离，提升网络有效深度与长上下文能力。
