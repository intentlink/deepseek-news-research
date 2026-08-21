# DeepSeek-V2: A Strong, Economical, and Efficient MoE Language Model

**日期**: 2024 年 5 月 7 日  
**arXiv**: https://arxiv.org/abs/2405.04434

## 概述
DeepSeek-V2 是强力、经济且高效的开源 MoE 大语言模型，总参数 236B，每 token 激活 21B，支持 128K 上下文。采用 Multi-head Latent Attention MLA 与 DeepSeekMoE 架构，MLA 通过低秩 KV 联合压缩将 KV 缓存压缩 93.3%，DeepSeekMoE 通过稀疏计算实现经济训练。相比 DeepSeek 67B，训练成本节省 42.5%，最大生成吞吐提升 5.76 倍，性能显著提升。基于 8.1T token 多源高质量语料预训练，后经 SFT 与 RL 对齐。

## 论文要点
- 模型规模：总参数 236B，激活参数 21B，128K 上下文。
- 架构创新：MLA + DeepSeekMoE。MLA 低秩 KV 压缩，KV 缓存减少 93.3%，推理效率大幅提升。
- 经济训练：DeepSeekMoE 稀疏计算，训练成本比 DeepSeek 67B 节省 42.5%。
- 推理效率：最大生成吞吐提升 5.76 倍。
- 预训练：8.1T token 多源高质量语料。
- 对齐：监督微调 SFT + 强化学习 RL。
- 性能：在仅 21B 激活参数下达到开源顶级性能。

## 技术细节
- MLA：多头潜在注意力，KV 缓存压缩为潜在向量，低秩投影 + 解耦 RoPE，实现高效推理。
- DeepSeekMoE：细粒度专家路由，设备限制路由、辅助损失负载均衡、令牌丢弃策略。
- 训练：混合精度、长上下文扩展、数据 debiasing。
- 评估：MMLU、HumanEval、GSM8K、MATH 等。

## 应用场景
- 通用对话与问答：Chat 版本用于客服、助手。
- 代码与数学推理：代码生成、数学求解。
- 长文本处理：128K 上下文支持长文档理解。
- 大规模部署：高效推理适合云端与边缘部署。

## 相关研究
- LLaMA、Mixtral、GShard、Switch Transformer。
- MQA、GQA、FlashAttention。
- DeepSeek-V3、DeepSeek-R1 后续演进。

## 笔记
