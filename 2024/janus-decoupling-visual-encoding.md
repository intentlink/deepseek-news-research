# Janus: Decoupling Visual Encoding for Multimodal Understanding and Generation

**日期**: 2024 年 10 月 17 日  
**arXiv**: https://arxiv.org/abs/2410.13848  
**GitHub**: https://github.com/deepseek-ai/Janus  
**HuggingFace**: https://huggingface.co/deepseek-ai

## 概述
Janus 提出一种自回归框架，将多模态理解与生成统一。先前工作常使用单一视觉编码器处理理解与生成任务，如 Chameleon，但理解需要高层语义而生成需要细粒度细节，导致冲突。Janus 将视觉编码解耦为独立路径，理解与生成各用合适的编码器，仍共享同一统一 Transformer。解耦缓解冲突并提升灵活性，理解与生成可各自选用最合适的编码方法。实验显示 Janus 超越既有统一模型并匹敌或超过任务专用模型，是下一代统一多模态模型的强候选。该工作为后续 Janus-Pro 的发展奠定了基础。

## 论文要点
- **核心问题**：统一模型用同一视觉编码器同时承担理解与生成，导致高层语义与低层细节需求冲突，理解性能下滑。
- **解耦编码**：为理解与生成分别设置独立编码路径，理解用 SigLIP 等高层语义编码器，生成用 VQ tokenizer 离散编码，均接入统一自回归 Transformer。
- **性能**：1.3B 参数模型在 MMBench 69.4、SEED-Bench 63.7、POPE 87.0，超越 LLaVA-v1.5 7B 与 Qwen-VL-Chat 7B；生成在 MSCOCO-30K FID 8.53、GenEval 61%，超越 DALL-E 2、SDXL。
- **训练流程**：三阶段训练——适配器与图像头预热、统一预训练（文本/理解/生成混合）、指令微调。
- **灵活性**：可扩展至点云、EEG、音频等模态。
- **影响**：首次明确统一多模态模型中解耦视觉编码的重要性。

## 技术细节
- **架构**：自回归 Transformer 处理文本、理解、生成三类输入。文本用 LLM 内置 tokenizer；理解用 SigLIP 编码器提取高维语义特征，经理解适配器映射；生成用 VQ tokenizer 将图像转离散 ID，经生成适配器映射。特征拼接后送入统一 Transformer，文本用内置预测头，图像生成用随机初始化预测头。
- **编码解耦**：理解编码器追求高层语义，生成编码器追求细粒度空间与纹理，分别选择最优方案，避免单一编码器的权衡。
- **训练**：三阶段——Stage I 冻结视觉编码器与 LLM，仅训练适配器与图像头；在 Stage II 解冻 LLM 进行统一预训练，先 ImageNet-1k 再开放域数据；Stage III 指令微调混合数据，冻结生成编码器。
- **目标与推理**：跨熵损失 next-token 预测；图像生成采用 classifier-free guidance，默认 scale 5。
- **扩展性**：解耦思想可推广至其他模态。

## 应用场景
- 统一多模态助手：同一模型同时完成视觉问答、图像描述与文本到图像生成。
- 内容创作与设计：基于指令的图像生成、编辑、风格迁移。
- 视觉内容理解：VQA、图表阅读、科学图表解析、多模态推理。
- 研究原型：解耦编码思想可迁移至视频、3D、点云等模态的统一建模。
- 教育与可视化：自然语言驱动的图像生成与解释。

## 相关研究
- 统一多模态模型：Chameleon、Emu、Show-o、LLaVA、Qwen-VL。
- 自回归视觉生成：LlamaGen、VAR、ImageGPT。
- 扩散模型：Stable Diffusion、DALL-E 2、SDXL。
- 多模态大模型：LLaVA、InstructBLIP、MiniGPT-4。
- 视觉编码器：SigLIP、CLIP、VQ-VAE。

## 笔记
- 论文由 DeepSeek-AI 发布，2024 年 10 月 17 日 arXiv 首发，后续有 Janus-Pro 扩展。
- 解耦视觉编码是关键洞见，解决统一模型中理解与生成目标冲突。
- 模型以小规模参数实现兼顾理解与生成的高性能，体现结构设计优于单纯堆参数。
- 代码开源：https://github.com/deepseek-ai/Janus
- 与后续 Janus-Pro 形成演进链条，体现数据与模型规模扩展。
