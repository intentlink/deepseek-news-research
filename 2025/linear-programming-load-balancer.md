# Linear-Programming-Based Load Balancer (LPLB)

**日期**: 2025 年 11 月 1 日  
**GitHub**: https://github.com/deepseek-ai/LPLB  
**开源**: 已集成到 DeepSeek-V3.2/V4 训练框架

## 概述
LPLB 是基于线性规划的并行负载均衡器，用于 MoE 模型的专家并行工作负载优化。它在 EPLB 基础上扩展，动态重排专家并通过线性规划求解每批 Token 的最优分配，以缓解小批量随机性导致的动态负载不平衡。采用单 SM 内点法求解，依赖 cuSolverDx/cuBLASDx 实现高效线性代数运算。该工具为大规模 MoE 模型训练提供了高效的负载均衡解决方案。

## 论文要点
- 针对 MoE 专家并行的动态负载不平衡，基于每批工作负载统计进行 Token 重分配。
- 利用线性规划最小化负载不平衡，考虑冗余专家边缘容量约束。
- 基于 EPLB 的重排，配合 DeepEP 缓冲区获取实时统计。
- 单 SM 内点法求解，约 100 µs（节点内），使用 cuSolverDx/cuBLASDx。

## 技术细节
- **工作流程**：重排专家→构建冗余→LP 求解 Token 分配。
- **拓扑**：Cube、Hypercube、Torus 等，可自定义 r2o 矩阵。
- **通信**：NVLINK/NVSHMEM 同步工作负载，减少 allreduce 开销。
- **限制**：仅平衡 Token 数，未考虑 GEMM 非线性耗时；小批量下求解开销；极端全局不平衡时可能不如 EPLB。

## 应用场景
- **MoE 模型训练**：大规模专家并行训练，缓解负载不平衡。
- **推理加速**：动态 Token 分配提升吞吐。
- **AI 系统优化**：与 DeepEP/EPLB 集成，提升 MoE 效率。

## 相关研究
- **MoE 负载均衡**：EPLB、Expert Choice、Switch Transformer。
- **线性规划**：运筹学负载均衡、网络流优化。
- **并行计算**：DeepEP、NVSHMEM。

## 笔记
