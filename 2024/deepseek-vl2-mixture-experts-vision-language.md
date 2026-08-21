# DeepSeek-VL2: Mixture-of-Experts Vision-Language Model

**日期**: 2024 年 12 月 13 日  
**arXiv**: https://arxiv.org/abs/2412.10302  
**GitHub**: https://github.com/deepseek-ai/DeepSeek-VL2  
**HuggingFace**: https://huggingface.co/deepseek-ai

## 概述
DeepSeek-VL2 是基于 MoE 架构的先进视觉-语言模型系列，在前代 DeepSeek-VL 基础上进行两项重大升级：视觉组件引入动态分块编码策略，支持不同宽高比的高分辨率图像处理；语言组件采用 DeepSeekMoE 与 Multi-head Latent Attention MLA，将 KV 缓存压缩为潜在向量，实现高效推理。训练于改进的视觉-语言数据集上，模型在视觉问答、OCR、文档/表格/图表理解、视觉定位等任务上表现优异。系列包含 Tiny、Small、完整版三种，激活参数分别为 1.0B、2.8B、4.5B。该模型展示了 MoE 架构在多模态任务中的优势。

## 论文要点
- 视觉编码：动态分块策略，适配不同宽高比高分辨率图像。
- 语言模型：DeepSeekMoE + MLA，压缩 KV 缓存，提升推理效率。
- 数据：改进的视觉-语言数据集。
- 任务：视觉问答、OCR、文档/表格/图表理解、视觉定位。
- 模型规模：Tiny 1.0B、Small 2.8B、完整版 4.5B 激活参数。
- 性能：与同类开源密集/ MoE 模型相比，以更少激活参数达到竞争或 SOTA 性能。

## 技术细节
- 动态分块：根据图像宽高比裁剪为 384×384 分块，最大 9 块，覆盖高分辨率内容。
- MoE 架构：DeepSeekMoE 专家路由，结合共享专家与细粒度专家。
- MLA：低秩 KV 压缩，降低推理显存占用。
- 训练流程：视觉-语言预训练 + 监督微调。
- 适配器：视觉特征与语言模型对齐。

## 应用场景
- OCR 与文档解析：高分辨率文本识别。
- 图表理解：统计图、表格解读。
- 视觉问答与 grounding：图像内容问答与定位。
- 教育与研究：教科书、论文解析。

## 相关研究
- DeepSeek-VL：前代模型。
- GPT-4V、Gemini：闭源多模态。
- LLaVA、Qwen-VL、InternVL：开源多模态。
- MoE 研究：GShard、Switch Transformer、DeepSeekMoE。

## 笔记
