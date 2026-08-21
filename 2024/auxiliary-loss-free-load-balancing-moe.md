# Auxiliary-Loss-Free Load Balancing Strategy for Mixture-of-Experts

**日期**: 2024 年 8 月 28 日  
**arXiv**: https://arxiv.org/abs/2408.15664  
**备注**: 策略已应用于 DeepSeek-V2/V3/V4（见对应模型仓库）

## 概述
本文提出 Loss-Free Balancing，一种无辅助损失的 MoE 负载均衡策略。传统方法使用辅助损失鼓励专家负载均衡，但会引入干扰梯度影响模型性能。Loss-Free Balancing 在 Top-K 路由前对专家路由分数施加专家级偏置，并根据近期负载动态更新偏置，从而保持负载均衡且不产生干扰梯度。在 1B/3B MoE 模型上验证，性能与负载均衡均优于传统辅助损失方法。该策略已被 DeepSeek-V2/V3/V4 等模型采用，成为核心路由优化技术。

## 论文要点
- 问题：MoE 负载不平衡导致路由崩溃或计算开销增大；辅助损失带来干扰梯度。
- 方法：Loss-Free Balancing，无辅助损失，通过专家级偏置动态调节路由分数。
- 机制：每次路由前先加偏置，偏置按近期负载更新，重载专家偏置压低，轻载专家偏置抬高。
- 效果：1B 模型 100B token，3B 模型 200B token 训练，验证损失更低，负载均衡更好。
- 优势：无干扰梯度，提升 MoE 训练的上界，与专家并行兼容。

## 技术细节
- 路由调整：Top-K 选择前对原始 gating score 加 expert-wise bias，产生 biased gating score。
- 偏置更新：基于近期 token 实际分配统计，按负载进行增量更新，形成历史反馈。
- 负载指标：使用 MaxVio 等指标衡量不均衡程度，指导偏置调整幅度。
- 训练细节：在 DeepSeekMoE 主干上验证，支持 1B/3B 参数规模，100B-200B token 训练。
- 对比基线：传统 auxiliary loss 负载均衡，比较验证损失、困惑度、全局/批负载均衡。

## 应用场景
- 大规模 MoE 语言模型训练：避免路由崩溃，提升训练稳定性。
- 专家并行与分布式训练：负载均衡提升 GPU 利用率，降低闲置成本。
- 高效推理：均衡负载降低计算波动，提高吞吐。
- 研究方向：无损失干扰的路由策略，替代辅助损失正则。

## 相关研究
- Shazeer et al. 2017 MoE 初始工作与路由崩溃问题。
- Fedus et al. 2021、Lepikhin et al. 2020 辅助损失负载均衡。
- DeepSeekMoE、GShard 等 MoE 架构与负载均衡研究。
- Expert Choice Routing 等不同路由范式。

## 笔记
