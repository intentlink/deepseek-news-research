# DeepSeek-Prover-V1.5: Harnessing Proof Assistant Feedback

**日期**: 2024 年 8 月 15 日  
**arXiv**: https://arxiv.org/abs/2408.08152  
**GitHub**: https://github.com/deepseek-ai/DeepSeek-Prover-V1.5  
**HuggingFace**: https://huggingface.co/deepseek-ai

## 概述
DeepSeek-Prover-V1.5 是面向 Lean 4 的开源定理证明语言模型，在 DeepSeek-Prover-V1 基础上优化训练与推理。模型在 DeepSeekMath-Base 上预训练并专攻形式化数学语言，随后使用增强型形式化定理证明数据集监督微调，并通过基于证明助手反馈的强化学习 RLPAF 进一步精调。推理上提出 truncate-and-resume 机制结合 RMaxTS 蒙特卡洛树搜索，生成多样化证明路径。在 miniF2F 测试集上达到 63.5%，ProofNet 上达到 25.3%，创下新 SOTA。该工作为后续 DeepSeek-Prover-V2 的发展奠定了基础。

## 论文要点
- 模型基础：基于 DeepSeekMath-Base 预训练，聚焦形式化数学语言。
- 训练流程：监督微调 + RLPAF，RLPAF 利用 Lean 验证器反馈优化证明生成。
- 推理策略：truncate-and-resume，将整段证明生成拆分为战术级搜索，错误点截断并续写，结合战术状态提示。
- 搜索算法：RMaxTS，蒙特卡洛树搜索变体，采用内在奖励驱动探索，生成多样化证明路径。
- 性能：miniF2F 测试集 63.5%，ProofNet 25.3%，显著超越 DeepSeek-Prover-V1。
- 开源：权重与代码公开，促进形式化定理证明研究。

## 技术细节
- 预训练：DeepSeekMath-Base + 形式化数学语言专项。
- 数据增强：基于 DeepSeek-Prover-V1 的增强形式化定理证明数据集，监督微调。
- RLPAF：以 Lean 验证器反馈为奖励信号，优化证明正确性与格式。
- Truncate-and-resume：整段生成后在首个错误处截断，保留成功片段作为下轮提示，并加入当前战术状态。
- RMaxTS：内在奖励驱动探索，对抗奖励稀疏，扩展搜索空间。
- 评估：miniF2F、ProofNet。

## 应用场景
- 形式化数学证明：Lean 4、Coq、Isabelle 等证明助手辅助。
- 数学教育与研究：自动生成证明、教学示范、定理发现。
- 代码形式化验证：程序验证、规范证明。
- AI 数学推理：自然语言到形式化证明转换。

## 相关研究
- DeepSeek-Prover、DeepSeekMath：前身模型。
- AlphaProof、AlphaTensor：自动数学推理。
- Lean Dojo、Mathlib：形式化数学社区。
- RLHF、RLPAF：基于反馈的强化学习。

## 笔记
