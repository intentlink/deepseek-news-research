# DeepSeek-OCR 2: Visual Causal Flow

**日期**: 2026 年 1 月 28 日  
**arXiv**: https://arxiv.org/abs/2601.20552  
**GitHub**: https://github.com/deepseek-ai/DeepSeek-OCR-2  
**HuggingFace**: https://huggingface.co/deepseek-ai

## 概述

DeepSeek-OCR 2 提出在视觉编码器中引入“视觉因果流”机制，通过 DeepEncoder V2 实现对视觉 token 的动态重排，模拟人类阅读时的因果顺序扫描行为。传统 VLM 采用固定的栅格扫描顺序，忽略了图像语义逻辑；本文提出将视觉 token 通过 LLM 风格架构和因果 flow query 进行重排，使编码器具备因果推理能力，进而以两级 1D 因果结构实现对 2D 图像的理解。

## 论文要点

- **核心动机**：人类视觉遵循因果驱动的柔性扫描，而非固定栅格扫描；提出用因果流重排视觉 token，使 2D 理解通过两级 1D 因果推理实现。
- **DeepEncoder V2**：将 CLIP 模块替换为 LLM 风格架构，使用双流注意力——视觉 token 双向注意力，causal flow query 采用因果注意力，实现语义重排；query 与视觉 token 等 Cardinality，输出仅 causal query 给 LLM 解码器。
- **架构细节**：采用 80M 参数 SAM-base + 卷积的 vision tokenizer，16× 压缩后接 Qwen2-0.5B 风格编码器；多裁剪策略输出 256~1120 tokens（global 1024×1024 + 0~6 个 local 768×768）。
- **性能提升**：在 OmniDocBench v1.5 上较 DeepSeek-OCR 基线提升 3.73%，保持 256~1120 token 范围，兼具研究价值和数据生成实用性。
- **代码开源**：https://github.com/deepseek-ai/DeepSeek-OCR-2

## 技术细节

- **Vision Tokenizer**：SAM-base（80M）+ 两层卷积，输出维度 896，实现 16× token 压缩。
- **Language Model as Vision Encoder**：用 Qwen2-0.5B（500M）替代 CLIP ViT，双向视觉 token + 因果 flow query；前缀拼接视觉 token，确保每层交互。
- **Causal Flow Query**：query 数 = 视觉 token 数，\(\frac{W×H}{16^2×16}\)；多裁剪固定 query：global 256，local 每个 144。
- **Attention Mask**：视觉 token 双向自注意力，query 对视觉全可见且对前序 query 因果可见。
- **训练**：先训练 DeepEncoder V2，随后 query 增强，再继续训练 LLM；采用 DeepSeek-MoE 解码器。
- **目标场景**：文档阅读 OCR，复杂布局、公式、表格因果逻辑验证。

## 应用场景

- 文档 OCR 与信息抽取：复杂排版、表格、公式的准确识别与理解。
- 高质量训练数据生成：DeepSeek-OCR 2 可作为 LLM 预训练数据的生成工具。
- 多模态统一编码：支持图像、音频、文本通过可配置 query 统一提取特征。
- 视觉因果推理研究：为 2D 到 1D 因果建模提供架构范式。

## 相关研究

- DeepSeek-OCR [54]：前身模型，使用 DeepEncoder 与 CLIP 编码器。
- DETR [10]、BLIP2 Q-former [22]：并行化 learnable query 的先例。
- LLM-based 多模态初始化：Fuyu [5]、Chameleon [43]、VALL-E [47]。

## 笔记

- 核心创新在于编码器层面的因果视觉流，而非仅解码器。
- 仅 causal flow tokens 输入 LLM，实现了 encoder 的语义重排与 decoder 的因果推理解耦。
- Token 数量可控，保持与 Gemini-3 Pro 相当的预算，兼顾效率。
