# DeepSeekMoE: Towards Ultimate Expert Specialization

**日期**: 2024 年 1 月 11 日  
**arXiv**: https://arxiv.org/abs/2401.06066  
**GitHub**: https://github.com/deepseek-ai/DeepSeek-MoE  
**HuggingFace**: https://huggingface.co/deepseek-ai

## 概述
DeepSeekMoE 提出面向极致专家特化的 MoE 架构，通过细粒度专家切分与共享专家隔离两大策略，提升专家专业化程度。细粒度切分将专家拆分为更小的单元并提升组合灵活性；共享专家捕获通用知识，缓解路由专家冗余。2B 参数模型可与 GShard 2.9B 相当，16B 参数模型以约 40% 计算量达到 LLaMA2 7B 性能。145B 参数模型性能接近 DeepSeek 67B，计算量仅 28.5%。该架构为后续 DeepSeek-V2/V3/V4 的 MoE 设计奠定了基础。

## 论文要点
- **细粒度专家切分**：将专家拆分为 mN 个，激活 mK 个，提升组合灵活性和专家专业化。
- **共享专家隔离**：设置 K_s 个共享专家，捕获通用知识，减轻路由专家冗余。
- **性能**：DeepSeekMoE 2B ≈ GShard 2.9B；16B ≈ LLaMA2 7B，仅约 40% 计算量。
- **大规模**：145B 参数模型 ≈ DeepSeek 67B，计算量仅 28.5%（或 18.2%）。

## 技术细节
- 专家切分：FFN 中间维度压缩，专家数增加，激活数同步增加。
- 共享专家：全 token 激活，学习通用知识。
- 路由：Top-K 路由，辅助损失负载均衡。
- 训练：大规模语料，MoE 稀疏训练。

## 应用场景
- 大规模语言模型：高效参数扩展。
- 资源受限环境：降低计算与显存占用。
- 多任务学习：专家特化提升特定任务性能。

## 相关研究
- GShard、Switch Transformer：传统 MoE。
- Mixtral、DeepSeek-V2/V3：后续演进。
- MoE 优化：专家路由、负载均衡。

## 笔记
