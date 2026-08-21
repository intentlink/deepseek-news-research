# ESFT: Expert Specialized Fine-Tuning for MoE

**日期**: 2024 年 7 月 2 日  
**arXiv**: https://arxiv.org/abs/2407.01906  
**GitHub**: https://github.com/deepseek-ai/ESFT  
**HuggingFace**: https://huggingface.co/deepseek-ai

## 概述
ESFT 是针对 MoE 架构大语言模型的专家特化微调方法。研究发现 MoE 中特定任务的专家路由高度集中，不同任务激活的专家集合差异显著。ESFT 仅微调与下游任务最相关的专家，其余专家及模块冻结，显著提升调优效率，同时保持或超越全参数微调性能。采用专家相关性评分（平均门控分数、Token 选择比率）选择专家，细粒度专家分割的 MoE 模型更适合 ESFT。该方法为 MoE 模型的参数高效微调提供了新思路。

## 论文要点
- 专家路由集中：特定任务激活专家高度集中，不同任务专家集合差异大。
- ESFT 方法：仅微调相关专家，冻结其他专家与模块，提升效率。
- 专家相关性评分：平均门控分数 ESFT-Gate、Token 选择比率 ESFT-Token。
- 性能：匹配或超越全参数微调，优于 LoRA。
- 细粒度专家：MoE 专家更细粒度时 ESFT 效果更佳。

## 技术细节
- 数据采样：从训练数据随机采样子集。
- 专家相关性：根据门控分数或 Token 选择比率计算。
- 专家选择：选择相关性高的专家进行微调。
- 冻结：其余专家与模块冻结。
- 训练：参数高效微调，降低内存与时间开销。

## 应用场景
- MoE 大模型定制：任务特定微调。
- 资源受限环境：降低显存与训练时间。
- 多任务学习：不同任务激活不同专家。

## 相关研究
- LoRA、P-Tuning：密集模型 PEFT。
- DeepSeekMoE、Mixtral：MoE 架构。
- 专家路由：GShard、Switch Transformer。

## 笔记
