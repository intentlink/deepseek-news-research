# DualPath: Breaking the Storage Bandwidth Bottleneck in Agentic LLM Inference

**日期**: 2026 年 2 月 25 日  
**arXiv**: https://arxiv.org/abs/2602.21548  
**备注**: 系统论文，无独立模型仓库；已应用于 DeepSeek-V4 推理系统

## 概述

DualPath 针对多轮 Agent LLM 推理中 KV-Cache 存储 I/O 主导性能的问题，提出双路径 KV-Cache 加载方案。传统架构中，prefill 引擎的存储 NIC 带宽饱和而 decode 引擎存储 NIC 空闲，导致系统吞吐受限。DualPath 在传统存储到 prefill 路径外，增加存储到 decode 再经 RDMA 传输到 prefill 的路径，结合全局调度器动态平衡负载，从而打破存储带宽瓶颈。

## 论文要点

- **核心问题**：Agent LLM 多轮推理中 KV-Cache 加载 I/O 主导性能，prefill 引擎存储 NIC 饱和，decode 引擎 NIC 空闲。
- **DualPath 方案**：引入双路径加载，存储→decode 再经 RDMA→prefill，避开网络拥塞且不干扰延迟敏感通信。
- **调度器**：全局调度器动态平衡 prefill/decode 负载，协同计算与网络利用率。
- **效果**：在三个模型和真实 Agent 工作负载下，离线推理吞吐提升最高 1.87×，在线服务吞吐平均提升 1.96× 且不违背 SLO。
- **贡献**：识别 I/O 受限特性，提出双路径加载与负载均衡调度算法。

## 技术细节

- **瓶颈分析**：Agent 工作负载 KV-Cache 命中率 >95%，I/O 瓶颈显著；cache-compute ratio 高达数十 GB/PFLOP。
- **双路径设计**：存储到 prefill 传统路径 + 存储到 decode 再 RDMA 到 prefill，RDMA 使用计算网络，避免与存储流量冲突。
- **流量管理**：NIC-centric 流量隔离，避免 KV-Cache 传输干扰模型执行通信。
- **调度策略**：基于 P/D 比率的动态路径选择，联合平衡 GPU 计算与 NIC 带宽。

## 应用场景

- 多轮 Agent LLM 推理：长上下文、工具调用、代码助手等高命中率 KV-Cache 工作负载。
- 离线批处理与在线服务：提升吞吐同时保持 SLO，适用于生产级推理系统。
- 资源受限环境：通过充分利用 decode 引擎闲置带宽，避免额外硬件投入。

## 相关研究

- Mooncake：分布式 DRAM KV-Cache 池与亲和调度，适用于内存富余场景。
- KV-Cache 压缩与检索优化：降低数据量与检索开销。
- PD 解耦推理：prefill-decode 分离架构。

## 笔记

- 核心洞察：KV-Cache 加载不必仅 prefill 集中，可利用 decode 引擎闲置带宽。
- 双路径设计避免网络拥塞与通信干扰，调度器确保负载均衡。
- 在生产系统上验证，离线与在线场景均显著提升吞吐。
