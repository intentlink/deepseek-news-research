# DeepSeek-V3.2: Pushing the Frontier of Open LLMs

**日期**: 2025 年 12 月 2 日  
**arXiv**: https://arxiv.org/abs/2512.02556  
**GitHub**: https://github.com/deepseek-ai/DeepSeek-V3.2  
**HuggingFace**: https://huggingface.co/deepseek-ai

## 概述
本文介绍 DeepSeek-V3.2，旨在以高计算效率实现卓越推理与 Agent 性能。核心突破包括：DeepSeek Sparse Attention (DSA) 降低长上下文注意力复杂度；可扩展强化学习框架使模型性能媲美 GPT-5，高配版 DeepSeek-V3.2-Speciale 超过 GPT-5，推理能力与 Gemini-3.0-Pro 相当，并在 2025 年 IMO、IOI 取得金牌。另提出大规模 Agent 任务合成流水线，用于工具使用场景的推理训练。模型开源，显著缩小开源与闭源差距。该模型为后续 DeepSeek-V4 的发展奠定了基础。

## 论文要点
- **三大突破**：DSA 稀疏注意力、扩展 RL 框架、大规模 Agent 任务合成流水线。
- **性能**：V3.2 与 GPT-5、Kimi-k2-thinking 等相当；V3.2-Speciale 超过 GPT-5，接近 Gemini-3.0-Pro，IMO/IOI 2025 金牌。
- **效率**：DSA 将注意力复杂度从 O(L²) 降至 O(Lk)，长上下文推理成本显著降低。
- **开源优势**：成本远低于闭源，Agent 场景表现突出。
- **训练**：继续预训练+后训练，包含专业蒸馏、混合 RL、Agent 合成数据。

## 技术细节
- **DSA 稀疏注意力**：基于 MLA 的稀疏注意力，包含 lightning indexer + 精细 Token 选择；索引器用 ReLU 计算得分，选择 top-k key-value。
- **继续预训练**：在 DeepSeek-V3.1-Terminus 基础上，128K 上下文，密集暖启动 2.1B Token → 稀疏训练 943.7B Token，KL 对齐。
- **后训练**：专业蒸馏（数学、编程、逻辑、Agent 等）、混合 RL、Agent 任务合成（1,800 环境、85k 提示）。
- **架构**：与 V3.1 基本一致，仅替换注意力为 DSA，MQA 模式共享 latent。
- **推理成本**：长序列 Prefill/Decode 成本降低，H800 上实测加速。

## 应用场景
- **通用 LLM 推理**：长文本处理、数学、编程、逻辑推理。
- **Agent 系统**：工具使用、复杂交互环境、指令遵循。
- **成本敏感部署**：长上下文推理、服务化部署。
- **教育竞赛**：IMO、IOI、CMO 等竞技任务。
- **开源替代**：提供与闭源模型媲美的低成本方案。

## 相关研究
- **稀疏注意力**：FlashAttention、Longformer、MLA、MQA。
- **推理模型**：o1、DeepSeek-R1、GPT-5、Gemini-3.0-Pro。
- **后训练**：RLHF、PPO、专家蒸馏。
- **Agent 基准**：MCPMark、MCPUniverse。

## 笔记
