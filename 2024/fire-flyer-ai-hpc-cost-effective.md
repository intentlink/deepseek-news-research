# Fire-Flyer AI-HPC: A Cost-Effective Software-Hardware Co-Design

**日期**: 2024 年 8 月 26 日  
**arXiv**: https://arxiv.org/abs/2408.14158  
**GitHub**: https://github.com/HFAiLab/hai-platform  
**开源**: HAI-Platform、3FS 已开源

## 概述
随着深度学习与大语言模型（LLMs）的快速发展，计算能力和带宽需求呈指数级增长，而更快的计算芯片和互连的高成本显著推高了高性能计算（HPC）建设成本。论文提出 Fire-Flyer AI-HPC 架构——一种协同的硬件-软件协同设计框架及其最佳实践。作者在 Fire-Flyer 2 上部署了 10,000 台 PCIe A100 GPU，实现了接近 DGX-A100 的性能，同时将成本降低一半、能耗降低 40%。核心贡献包括 HFReduce 加速 allreduce、计算-存储一体化网络无拥塞设计，以及 HaiScale、3FS、HAI-Platform 等软件栈通过计算-通信重叠实现可扩展性。系统从深度学习训练中获得的面向系统经验为 AI-HPC 未来发展提供洞见。该工作展示了如何通过软硬件协同设计构建经济高效的 AI 训练集群。

## 论文要点
- **动机与挑战**：AI 计算需求以每年 10倍增长，远超摩尔定律；LLM 训练需数百至数千 GPU，成本与能耗激增，需高性价比集群。
- **Fire-Flyer 2 部署**：10,000 台 PCIe A100 GPU，成本约为 DGX-A100 一半，能耗降低 40%，性能接近 DGX-A100。
- **硬件-软件协同**：PCIe 架构需软件补足性能短板；两层 Fat-Tree 网络集成存储与计算，分区防拥塞。
- **HFReduce**：CPU 异步 allreduce，实现计算-通信重叠，在 PCIe 上优于 NVIDIA NCCL。
- **软件栈**：HaiScale 优化 DP/PP/TP/EP/FSDP/ZeRO 等并行策略；3FS 分布式文件系统缓解 I/O 瓶颈；HAI-Platform 提供调度、容错、灾备，已开源。
- **稳定性**：检查点管理器、硬件故障检测器、一年真实故障数据统计。
- **未来工作**：针对 MoE LLM，多 NIC 与多平面网络下一代架构。

## 技术细节
- **网络协同设计**：两层胖树（Two-Layer Fat-Tree）计算-存储一体化网络，分为两区，支持跨区任务。采用多种网络调优防止拥塞。
- **HFReduce**：异步 allreduce，CPU 调度实现通信计算重叠，针对 PCIe 带宽瓶颈优化，超越 NCCL。
- **HaiScale**：针对 PCIe 架构的并行优化，实现 DP、PP、TP、EP、FSDP、ZeRO 的高效协同。
- **3FS**：全闪存分布式文件系统，适配 AI 随机访问模式，提供高带宽 I/O，降低存储网络拥塞。
- **HAI-Platform**：任务调度、容错、灾备、资源利用率提升，开源实现。
- **稳定性机制**：检查点恢复、硬件故障验证、长期故障统计。
- **成本与能效**：PCIe A100 节点 vs DGX-A100 对比，建设成本减半，CO₂ 排放降低。

## 应用场景
- 大规模 LLM 预训练与微调，支持万亿参数级模型。
- 深度学习模型训练：计算机视觉、语音识别、生成式 AI、AIGC 多模态训练。
- AI-HPC 基础设施建设：为企业提供成本可控的自建集群方案。
- 长周期训练任务：提供高稳定性、容错与灾备保障。
- 研究与产品化：开源 HAI-Platform 与 3FS 便于科研团队复现与扩展。

## 相关研究
- NVIDIA DGX-A100 基线对比，Meta AI-HPC、ByteDance、Alibaba HPN、NVIDIA Eos。
- GPU HPC：Frontier、Aurora、Summit、Perlmutter。
- 并行策略：ZeRO、FSDP、Pipeline Parallelism、Tensor Parallelism、Expert Parallelism。
- 通信库：NVIDIA NCCL、HFReduce 自研方案。
- 分布式存储：全闪存分布式文件系统 3FS。

## 笔记
- 论文为 SC24 收录，IEEE 出版。团队强调软硬件协同设计最佳实践。
- Fire-Flyer 2 采用 PCIe 节点而非 NVLink，依赖软件优化弥补互连带宽差距。
- 成本效益核心在于网络与存储一体化设计，以及 HFReduce、HaiScale 等协同栈。
- 开源组件：HAI Platform (https://github.com/HFAiLab/hai-platform)；3FS 相关开源。
- 实际部署经验对构建经济型 AI-HPC 具有参考价值，尤其在 MoE 大模型训练场景。
