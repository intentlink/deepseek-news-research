# DeepSeekMath: Pushing the Limits of Math Reasoning in LLMs

**日期**: 2024 年 2 月 5 日  
**arXiv**: https://arxiv.org/abs/2402.03300  
**GitHub**: https://github.com/deepseek-ai/DeepSeek-Math  
**HuggingFace**: https://huggingface.co/deepseek-ai

## 概述
DeepSeekMath 是针对数学推理的领域特定语言模型，基于 DeepSeek-Coder-Base-v1.5 7B 进一步预训练，结合 120B 数学相关 token，来自 Common Crawl 的大规模数学语料。模型在 MATH 竞赛级基准上达到 51.7%（无工具/投票），自一致性 64 样本达 60.9%，接近 GPT-4 与 Gemini Ultra。关键贡献包括高质量数学语料构建 pipeline 与 GRPO 强化学习优化。GRPO 后续被 DeepSeek-R1 等模型广泛采用，成为核心优化算法。

## 论文要点
- **预训练**：DeepSeekMath-Base 7B，基于 DeepSeek-Coder-Base-v1.5，120B 数学 token + 自然语言/代码。
- **语料**：DeepSeekMath Corpus，从 Common Crawl 挖掘，经 fastText 分类与人工标注，覆盖多语言。
- **性能**：MATH 51.7%，自一致性 60.9%，GSM8K 63.8%，接近 GPT-4。
- **指令微调**：DeepSeekMath-Instruct 7B，Chain-of-Thought、程序思维、工具集成推理数据。
- **GRPO**：群体相对策略优化，改进 PPO，节约显存，提升数学推理。

## 技术细节
- **数据选择**：迭代挖掘 fastText 分类器，人工标注，数据清洗与去重。
- **预训练分布**：56% 数学语料，4% AlgebraicStack，10% arXiv，20% 代码，10% 自然语言。
- **训练策略**：继续预训练 + 数学指令微调。
- **GRPO**：无评论家模型，基于群体得分估计基线，降低内存占用。

## 应用场景
- **数学教育**：自动解题、解题思路生成。
- **竞赛训练**：数学竞赛题解。
- **研究辅助**：数学证明与推导。
- **代码与数学结合**：程序化求解。

## 相关研究
- **Minerva、GPT-4、Gemini Ultra**：闭源数学模型标杆。
- **Math LLM**：MathGPT、WizardMath。
- **RLHF**：PPO、DPO。
- **DeepSeek-Coder、DeepSeekMath-V2**：后续发展。

## 笔记
- **GRPO 创新**：提出的 GRPO 算法后续成为 DeepSeek-R1 等模型的核心优化方法。
- **数据工程**：展示了从 Common Crawl 构建高质量领域数据集的方法论。
- **开源贡献**：为数学推理开源模型树立了标杆，推动了该领域的发展。

## 技术细节
- 数据选择：迭代挖掘 fastText 分类器，人工标注，数据清洗与去重。
- 预训练分布：56% 数学语料，4% AlgebraicStack，10% arXiv，20% 代码，10% 自然语言。
- 训练策略：继续预训练 + 数学指令微调。
- GRPO：无评论家模型，基于群体得分估计基线，降低内存占用。

## 应用场景
- 数学教育：自动解题、解题思路生成。
- 竞赛训练：数学竞赛题解。
- 研究辅助：数学证明与推导。
- 代码与数学结合：程序化求解。

## 相关研究
- Minerva、GPT-4、Gemini Ultra。
- Math LLM：MathGPT、WizardMath。
- RLHF：PPO、DPO。
- DeepSeek-Coder、DeepSeekMath-V2。

## 笔记
