# OpenInfra Week

**日期**: 2025 年 2 月 24 日  
**GitHub**: https://github.com/deepseek-ai/open-infra-index  
**开源仓库**: FlashMLA, DeepEP, DeepGEMM, DualPipe, EPLB, 3FS, Smallpond

## 概述
DeepSeek 于 2025 年 2 月 24 日至 2 月 28 日举办“开源周”（Open Source Week），由极简团队 @deepseek-ai 发起，连续五天每日开源一个核心基础设施项目，并于 3 月 1 日追加“Day 6 - One More Thing”。该活动以透明、生产级代码为导向，公开了支撑 V3/R1 在线服务的底层组件，涵盖 GPU 内核优化、MoE 通信、矩阵计算、并行调度与存储系统等全栈基础设施。官方表示项目均为文档化、已部署并在生产环境实战检验，旨在加速 AGI 进程并推动集体创新。

**关键背景**
- **时间跨度**：2025-02-24 ~ 2025-02-28（5 天项目） + 2025-03-01 Day 6 系统概览
- **仓库索引**：https://github.com/deepseek-ai/open-infra-index
- **定位**：开源生产级基础设施构建块，非概念验证
- **影响**：开源后引发社区关注，推动 MoE 训练/推理优化、FP8 计算与分布式存储领域讨论

## 论文要点
### 开源周总览
DeepSeek 在开源周期间每日发布一个核心技术项目，覆盖 AI 模型训练、通信优化、文件系统等多个领域。

**Day 1（2 月 24 日）FlashMLA**
- **定位**：专为英伟达 Hopper GPU 优化的高效 MLA（Multi-Layer Attention）解码内核，支持可变长度序列处理
- **性能**：H800 GPU 上实现 3000 GB/s 内存带宽、580 TFLOPS BF16 计算性能
- **特性**：BF16 支持、分页 KV 缓存（块大小 64）、生产环境验证

**Day 2（2 月 25 日）DeepEP**
- **定位**：首个面向 MoE 模型训练与推理的开源专家并行（EP）通信库
- **特性**：高效 all-to-all 通信、节点内/跨节点 NVLink/RDMA 支持、训练高吞吐与推理低延迟内核、原生 FP8 调度、GPU 资源灵活控制实现计算-通信重叠
- **影响**：解决 MoE 模型在 GPU 间通信瓶颈，GitHub 上线 20 分钟内获超 1000 星

**Day 3（2 月 26 日）DeepGEMM**
- **定位**：FP8 GEMM 库，支持稠密与 MoE GEMMs，支撑 V3/R1 训练与推理
- **性能**：Hopper GPU 上达 1350+ FP8 TFLOPS
- **设计**：零重依赖、JIT 编译、核心逻辑约 300 行、支持稠密布局与两种 MoE 布局

**Day 4（2 月 27 日）优化并行策略**
- **DualPipe**：面向 V3/R1 训练的双向流水线并行算法，实现计算-通信重叠
- **EPLB**：专家并行负载均衡器，提升资源利用率
- **profile-data**：公开 V3/R1 通信计算重叠分析数据

**Day 5（2 月 28 日）3FS、Thruster**
- **3FS（Fire-Flyer File System）**：高性能并行文件系统，充分利用 SSD 与 RDMA 带宽
  - 180 节点集群聚合读吞吐 6.6 TiB/s
  - 25 节点集群 GraySort 基准 3.66 TiB/min
  - 单客户端峰值 40+ GiB/s KVCache 查询
  - 分离式架构、强一致性语义、支撑训练数据预处理、数据集加载、检查点保存/重载、嵌入向量搜索与 KVCache 查询
- **Smallpond**：基于 3FS 的数据处理框架，简化分布式应用开发

**Day 6（3 月 1 日）One More Thing：DeepSeek-V3/R1 推理系统概览**
- **目标**：更高的吞吐、更低延迟
- **核心策略**：
  - 跨节点 EP 驱动批量扩展
  - 计算-通信重叠
  - 负载均衡
- **生产数据**（H800 节点）：
  - 73.7k/14.8k 输入/输出 token/s
  - 理论成本利润率 545%
- **并行配置**：
  - Prefill：路由专家 EP32、MLA/共享专家 DP32，4 节点单元
  - Decode：路由专家 EP144、MLA/共享专家 DP144，18 节点单元

### 关键技术洞察
- **FP8 为核心**：DeepGEMM 与 DeepEP 均原生支持 FP8，提供动态精度与低带宽压力
- **MoE 优化**：EP 通信、专家负载均衡、DualPipe 计算-通信重叠构成全链路 MoE 优化
- **存储与数据**：3FS 解决 AI 工作负载的存储瓶颈，提供 TI 级别吞吐与强一致性
- **成本效益**：系统设计实现单卡算力提升、通信延迟降低、资源利用率提升，推动推理成本下降

## 技术细节
### FlashMLA
- **架构**：针对 MLA 解码的 Hopper GPU 内核，优化可变长度序列
- **KV 缓存**：分页 KV 缓存，块大小 64，降低显存占用
- **性能指标**：内存带宽 3000 GB/s、BF16 计算 580 TFLOPS（H800）
- **适用**：高性能 AI 推理、自然语言生成、实时交互

### DeepEP
- **通信原语**：all-to-all 优化，支持非对称带宽转发
- **网络**：NVLink 内节点、RDMA 跨节点
- **精度**：FP8 调度
- **内核**：训练 prefilling 高吞吐、推理 decode 低延迟

### DeepGEMM
- **实现**：CUDA 编写，JIT 编译，核心逻辑约 300 行
- **特性**：细粒度缩放、支持密集与 MoE 分组 GEMM
- **性能**：Hopper 上 1350+ FP8 TFLOPS，超越专家调优内核

### DualPipe / EPLB
- **DualPipe**：双向流水线并行算法，实现计算-通信重叠
- **EPLB**：专家并行负载均衡器，平衡专家计算负载
- **数据**：公开 profile-data 供社区分析

### 3FS / Smallpond
- **3FS**：并行文件系统，利用 SSD 与 RDMA， disaggregated 架构、强一致性
- **基准**：6.6 TiB/s 聚合读、3.66 TiB/min GraySort、40+ GiB/s KVCache 查询
- **Smallpond**：3FS 上轻量数据处理框架

### 推理系统架构
- **硬件**：H800 GPU 集群，每节点 8 卡，FP8/BF16 混合精度
- **Prefill**：EP32 + DP32，4 节点单元，路由专家每卡 9 个、共享专家 1 个
- **Decode**：EP144 + DP144，18 节点单元，路由专家每卡 2 个、共享专家 1 个
- **重叠**：双 batch 重叠策略，prefill 交错计算/通信，decode 5 阶段流水线
- **负载均衡**：Prefill/Decode Load Balancer 与 Expert-Parallel Load Balancer

## 应用场景
- **大模型推理服务**：V3/R1 在线推理、低延迟高吞吐服务
- **分布式 MoE 训练**：专家并行、通信优化、负载均衡
- **高性能计算**：GPU 内核优化、FP8 计算加速
- **AI 数据管道**：大规模数据集加载、检查点管理、KVCache 查询
- **企业级部署**：私有化部署推理系统、成本敏感型推理服务

## 相关研究
- **202502 Open Source Week**：仓库总览 https://github.com/deepseek-ai/open-infra-index
- **FlashMLA**：https://github.com/deepseek-ai/FlashMLA
- **DeepEP**：https://github.com/deepseek-ai/DeepEP
- **DeepGEMM**：https://github.com/deepseek-ai/DeepGEMM
- **DualPipe**：https://github.com/deepseek-ai/DualPipe
- **EPLB**：https://github.com/deepseek-ai/eplb
- **3FS**：https://github.com/deepseek-ai/3FS
- **Smallpond**：https://github.com/deepseek-ai/smallpond
- **Day 6 推理系统**：https://github.com/deepseek-ai/open-infra-index/blob/main/202502OpenSourceWeek/day_6_one_more_thing_deepseekV3R1_inference_system_overview.md
- **中文解读**：https://zhuanlan.zhihu.com/p/27181462601

## 笔记
