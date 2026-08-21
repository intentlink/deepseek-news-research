# JanusFlow: Harmonizing Autoregression and Rectified Flow

**日期**: 2024 年 11 月 13 日  
**arXiv**: https://arxiv.org/abs/2411.07975  
**GitHub**: https://github.com/deepseek-ai/Janus  
**HuggingFace**: https://huggingface.co/deepseek-ai

## 概述
JanusFlow 在单一模型中统一图像理解与生成，采用最小化架构将自回归语言模型与 Rectified Flow 结合。核心发现是 Rectified Flow 可在 LLM 框架内直接训练，无需复杂架构改动。为提升统一模型性能，采用解耦理解与生成编码器、以及在统一训练中对齐其表征两种策略。实验显示 JanusFlow 在各自领域与专用模型相当或更优，显著超越现有统一方法，是更高效、更通用的视觉语言模型方向。该工作为后续统一多模态模型的发展提供了重要参考。

## 论文要点
- **统一框架**：自回归 LLM + Rectified Flow，图像理解与生成共享同一模型。
- **最小化架构**：仅需轻量编码器/解码器适配 LLM，无需复杂改动。
- **解耦编码器**：理解用 SigLIP 等预训练语义编码器，生成用从零初始化的 ConvNeXt 编码/解码器，避免任务干扰。
- **表征对齐**：生成训练中对齐理解编码器特征与 LLM 中间表征，提升语义一致性。
- **性能**：1.3B 参数模型在 MJHQ FID-30k 9.51、GenEval 0.63、DPG-Bench 80.09%，超越 SDv1.5、SDXL；理解在 MMBench 74.9、SeedBench 70.5、GQA 60.3，超越 LLaVA-v1.5、Qwen-VL-Chat。
- **训练策略**：三阶段训练，适应、预训练、指令微调；预训练采用非对称数据配比理解:生成=2:8。

## 技术细节
- **架构**：自回归 LLM 处理文本与图像；理解路径用 SigLIP 编码器提取语义特征经线性映射；生成路径在 SDXL-VAE latent 空间进行 Rectified Flow，噪声 z0 经生成编码器 ConvNeXt 映射到 embeddings，与时间 embedding 拼接后输入 LLM，输出经生成解码器预测速度场，Euler 求解器迭代生成 latent。
- **解耦**：理解编码器 f_enc 与生成编码器 g_enc 分离，避免任务冲突；生成侧使用长跳跃连接。
- **表征对齐**：在生成训练中以 REPA 方法对齐理解编码器特征与 LLM 中间层表征，加速收敛。
- **训练**：三阶段——Stage1 训练随机初始化组件（线性层、生成编解码器）；Stage2 统一预训练，解冻 LLM，采用非对称数据配比；Stage3 指令微调。
- **推理**：理解用 next-token 预测；生成用 Euler 求解 + classifier-free guidance，默认 30 步。
- **设计要点**：使用 causal attention 处理理解与生成，简洁高效。

## 应用场景
- 统一多模态助手：同一模型支持视觉问答与文本到图像生成。
- 内容生成与编辑：高质量图像生成、风格化、指令驱动生成。
- 视觉理解任务：VQA、图像描述、跨模态检索。
- 研究与原型：探索自回归与流式生成融合的统一架构。
- 低资源部署：小参数模型实现理解与生成兼顾。

## 相关研究
- 统一多模态模型：Janus、Show-o、Chameleon、Transfusion、Emu。
- Rectified Flow：Rectified Flow、Flow Matching、SD3。
- 自回归视觉生成：LlamaGen、VAR、ImageGPT。
- 扩散模型：Stable Diffusion、SDXL、DALL-E。
- 多模态 LLM：LLaVA、Qwen-VL、InstructBLIP。

## 笔记
- 论文由 DeepSeek-AI 等团队发布，2024 年 11 月 12 日 arXiv，CVPR 2025 收录。
- 将 Rectified Flow 直接嵌入 LLM 框架是核心创新，解耦编码与表征对齐进一步提升性能。
- 1.3B 参数实现理解与生成兼优，体现结构效率。
- 代码仓库：https://github.com/deepseek-ai/Janus
- 与 Janus 论文形成序列，形成统一多模态研究的演进线。
