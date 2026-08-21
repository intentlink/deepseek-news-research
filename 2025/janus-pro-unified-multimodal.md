# Janus-Pro: Unified Multimodal Understanding & Generation

**日期**: 2025 年 1 月 29 日  
**arXiv**: https://arxiv.org/abs/2501.17811  
**GitHub**: https://github.com/deepseek-ai/Janus  
**HuggingFace**: https://huggingface.co/deepseek-ai

## 概述
Janus-Pro 是 Janus 的增强版，基于解耦视觉编码的统一多模态理解与生成框架。通过优化训练策略、扩大训练数据和模型规模至 1B/7B，显著提升多模态理解和文本到图像指令遵循能力，并增强生成稳定性。模型在 MMBench 上达 79.2，GenEval 达 0.80，超越多项 SOTA。该工作展示了统一多模态模型通过数据和模型规模扩展实现性能提升的潜力。

## 论文要点
- 解耦视觉编码：理解用 SigLIP，生成用 VQ tokenizer，避免任务冲突。
- 三大改进：优化训练策略、数据规模扩大、模型规模提升至 7B。
- 性能：MMBench 79.2，GenEval 0.80，超越 Janus、TokenFlow、MetaMorph、DALL·E 3、SD3。
- 生成稳定性：短提示生成更稳定，细节丰富，可生成简单文本。

## 技术细节
- **架构**：解耦编码，理解用 SigLIP-Large-Patch16-384，生成用 VQ tokenizer（codebook 16,384，降采样16）；统一自回归 Transformer，理解适配器与生成适配器为两层 MLP。
- **训练策略**：三阶段，Stage I 延长 ImageNet 预训练，Stage II 去掉 ImageNet 直接用文本到图像数据，Stage III 调整数据比例 5:1:4。
- **数据**：理解数据增至 ~90M 样本，生成数据加入 72M 合成美学数据，实/合成 1:1。
- **模型规模**：1B/7B，两者上下文 4096，7B 层数 30，头数 32。

## 应用场景
- **多模态理解**：VQA、文档理解、视觉推理。
- **文本到图像生成**：指令遵循、艺术创作、设计辅助。
- **统一模型部署**：减少冗余，实现理解与生成一体。
- **研究基准**：多模态模型 scaling 研究。

## 相关研究
- **统一多模态模型**：Janus、TokenFlow、MetaMorph、Show-O。
- **视觉编码**：SigLIP、CLIP、VQ-VAE。
- **文本到图像**：DALL·E 3、Stable Diffusion 3、PixArt。
- **多模态理解**：LLaVA、Qwen-VL、DeepSeek-VL。

## 笔记
