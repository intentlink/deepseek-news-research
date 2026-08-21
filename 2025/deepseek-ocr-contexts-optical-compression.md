# DeepSeek-OCR: Contexts Optical Compression

**日期**: 2025 年 10 月 21 日  
**arXiv**: https://arxiv.org/abs/2510.18234  
**GitHub**: https://github.com/deepseek-ai/DeepSeek-OCR  
**HuggingFace**: https://huggingface.co/deepseek-ai

## 概述
本文提出 DeepSeek-OCR，探索通过光学 2D 映射压缩长上下文的可行性。核心思想是利用视觉模态作为文本信息的压缩介质，将文档文本以图像形式表示，可实现远高于纯文本 Token 的压缩比。DeepSeek-OCR 由 DeepEncoder 和 DeepSeek3B-MoE-A570M 解码器组成。DeepEncoder 在高分辨率输入下保持低激活并实现高压缩比，确保视觉 Token 数量可控。实验表明，当文本 Token 数为视觉 Token 数的 10 倍以内（压缩比 <10×）时，OCR 解码精度可达 97%；压缩比 20× 时，OCR 准确率仍约 60%。在 OmniDocBench 上，仅用 100 个视觉 Token 就超过 GOT-OCR2.0（256 Token/页），并以 <800 个视觉 Token 超过 MinerU2.0（平均 6000+ Token/页）。生产环境下，单张 A100-40G 每日可生成 20 万+ 页训练数据。代码与模型权重已开源于 [GitHub](http://github.com/deepseek-ai/DeepSeek-OCR)。

## 论文要点
- **核心动机**：LLM 处理长文本存在二次方计算复杂度瓶颈；通过视觉模态光学压缩，可用更少 Token 表示丰富信息，为长上下文提供新解。
- **三大贡献**：
  1. 量化分析：Fox 基准上，9-10× 压缩时 OCR 精度 >96%，10-12× 约 90%，20× 约 60%。
  2. DeepEncoder：窗口注意 + 全局注意串联，16× 卷积压缩，低激活、高分辨率、少 Token。
  3. 系统效果：基于 DeepSeek3B-MoE，OmniDocBench 上以最少视觉 Token 达到端到端 SOTA；生产可达 200k 页/天/A100-40G。
- **性能对比**：100 Token/页 超过 GOT-OCR2.0（256 Token/页）；<800 Token/页 超过 MinerU2.0（6000+ Token/页）。
- **多模态能力**：除 OCR 外，还支持图表、化学式、几何图形、自然图像解析。

## 技术细节
- **架构**：Encoder-Decoder。DeepEncoder ≈380M 参数，含 80M SAM-base（窗口注意）+ 300M CLIP-large（全局注意），中间 2 层卷积实现 16× Token 下采样。解码器为 DeepSeek3B-MoE，激活 570M。
- **DeepEncoder 设计**：
   - 感知分支：SAM-base，patch 16，窗口注意处理高分辨率、低激活。
   - 知识分支：CLIP-large，去掉首层 patch embedding，接收压缩后 Token。
   - 压缩器：2× conv，kernel 3，stride 2，通道 256→1024，实现 16× 下采样。
   - 1024×1024 输入 → 4096 patch → 压缩后 256 Token。
- **多分辨率支持**：
   - Native：Tiny 512×512（64 Token）、Small 640×640（100 Token）、Base 1024×1024（256 Token）、Large 1280×1280（400 Token）。
   - Dynamic：Gundam（640+1024）、Gundam-M（1024+1280），通过位置编码插值实现。
- **数据工程**：OCR 1.0/2.0 数据、通用视觉数据、文本-only 数据。训练分为 DeepEncoder 预训练和 DeepSeek-OCR 端到端微调。
- **压缩原理**：压缩比＝文本 Token / 视觉 Token。文本 Token ≈ 字符数，视觉 Token 可控。
- **训练要点**：窗口注意处理大量 Token，压缩后进入密集全局注意，平衡内存与信息保留。

## 应用场景
- **长上下文压缩**：历史文档、书籍、档案数字化，替代传统长文本 Token 处理。
- **LLM/VLM 训练数据生成**：每日 200k+ 页规模数据生产，提升模型对文档理解能力。
- **低资源部署**：视觉 Token 极少，适合边缘设备或内存受限环境。
- **多语言 OCR**：支持多语言文档解析。
- **图表/公式解析**：化学式、几何图形、图表结构化提取。
- **记忆遗忘机制研究**：为 LLM 长上下文记忆提供压缩-解压缩范式。

## 相关研究
- **VLM 视觉编码器**：Vary（双塔 SAM）、InternVL2.0（Tile 分块）、Qwen2-VL（NaViT 自适应分辨率），各有内存/Token/部署缺陷。
- **端到端 OCR**：Nougat、GOT-OCR2.0、Qwen-VL、InternVL 系列，推动文档解析由检测+识别向端到端演进。
- **长上下文压缩**：历史长文本压缩、LLM 记忆遗忘机制，本文提供光学压缩新范式。
- **Token 压缩研究**：视觉 Token 数量与解码质量关系，本文给出 7-20× 压缩经验法则。

## 笔记
