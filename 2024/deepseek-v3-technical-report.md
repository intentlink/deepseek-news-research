# DeepSeek-V3 Technical Report

**日期**: 2024 年 12 月 26 日  
**arXiv**: https://arxiv.org/abs/2412.19437  
**GitHub**: https://github.com/deepseek-ai/DeepSeek-V3  
**HuggingFace**: https://huggingface.co/deepseek-ai

## 概述
DeepSeek-V3 是强大的开源 MoE 大语言模型，总参数 671B，每 token 激活 37B，支持长上下文。采用 Multi-head Latent Attention MLA 与 DeepSeekMoE 架构，并首次提出无辅助损失负载均衡策略和多 Token 预测训练目标。基于 14.8T 多样高质量 token 预训练，经监督微调与强化学习对齐，在开源模型中领先，性能接近闭源顶级模型。训练仅需 2.788M H800 GPU 小时，全程稳定无回滚。该模型为后续 DeepSeek-V3.1/V3.2/V4 系列奠定了基础，标志着开源模型首次全面接近闭源顶级模型。

## 论文要点
- 模型规模：671B 总参数，37B 激活参数， MoE 架构。
- 架构：MLA + DeepSeekMoE，无辅助损失负载均衡，多 Token 预测。
- 预训练：14.8T 多样高质量 token。
- 对齐：监督微调 SFT + 强化学习 RL。
- 性能：在多项基准上超越开源模型，接近 GPT-4o、Claude 3.5 等闭源模型。
- 经济性：训练 2.788M H800 GPU 小时，训练稳定无损失激增。

## 技术细节
- MLA：低秩 KV 压缩，显著降低 KV 缓存，提高推理效率。
- DeepSeekMoE：稀疏专家路由，细粒度专家，共享专家与路由优化。
- 无辅助损失负载均衡：动态负载均衡，避免训练干扰。
- 多 Token 预测：并行预测多个 token，提升训练效率。
- 基础设施：DualPipe、跨节点通信优化、FP8 混合精度训练。

## 应用场景
- 通用对话与问答：Chat 版本用于助手、客服。
- 代码与数学推理：代码生成、数学求解。
- 长文本处理：长上下文支持大规模文档理解。
- 企业级部署：高效推理与经济训练，适合大规模服务。

## 相关研究
- DeepSeek-V2、DeepSeek-Coder-V2：前身架构。
- LLaMA、Qwen、Mixtral：同类开源模型。
- GPT-4o、Claude 3.5：闭源对标。
- Mixture-of-Experts 研究：GShard、Switch Transformer。

## 笔记
