# DeepSeek LLM: Scaling Open-Source Language Models with Longtermism

**日期**: 2023 年 11 月 29 日  
**arXiv**: https://arxiv.org/abs/2401.02954  
**GitHub**: https://github.com/deepseek-ai/DeepSeek-LLM  
**HuggingFace**: https://huggingface.co/deepseek-ai

## 概述
DeepSeek LLM 项目以长期主义为目标，聚焦开源大语言模型的规模化。团队系统研究 Scaling Laws，给出 7B/67B 配置的实证拟合公式，并基于 2T token 中英文+代码混合语料训练出 DeepSeek LLM Base/Chat。67B 在代码、数学、推理等领域超越 LLaMA-2 70B，Chat 版本在开放式评测中优于 GPT-3.5。研究强调数据质量会显著改变最优模型/数据规模分配。该项目为 DeepSeek 后续所有模型奠定了基础，展示了开源大模型的潜力。

## 论文要点
- **Scaling Law 研究**：IsoFLOP 拟合，给出 7B 和 67B 配置的优化解；指出数据质量影响最优分配。
- **预训练语料**：2T token，持续扩充，代码占比高，中英文混合，数据清洗与去重严格。
- **模型规模**：7B 和 67B 两档，Base 与 Chat 双版本，Chat 通过 SFT + DPO 对齐。
- **性能**：67B Base 超越 LLaMA-2 70B，尤其代码、数学、推理；67B Chat 在开放式评测中优于 GPT-3.5。
- **长期主义**：开源权重、代码、训练框架，提出长期维护的工程路线。

## 技术细节
- **架构**：沿用 LLaMA 的 pre-norm Transformer，RMSNorm、SwiGLU、RoPE。
- **数据**：混合语料，代码占比约 20-30%，中英文自然语言补充，质量筛选与反污染。
- **训练**：2T token 预训练，超参按 Scaling Law 选择，混合精度、动态批处理。
- **对齐**：监督微调 SFT + Direct Preference Optimization DPO，提升指令遵循与偏好对齐。
- **评估**：公共基准 + 开放式评测 + 安全评测，多维度验证。

## 应用场景
- **通用对话与指令遵循**：Chat 版本用于客服、助手、内容生成。
- **代码与数学推理**：Base/Chat 在代码补全、数学求解、逻辑推理任务表现突出。
- **中文/多语言**：双语预训练，适合中文用户场景。
- **研究基线**：为后续 V2、V3、V4 提供 Scaling Law 与数据管道基础。

## 相关研究
- **LLaMA / LLaMA-2**：开源基线，架构与规模参考。
- **GPT-3.5**：闭源对比，Chat 版本对标。
- **Scaling Laws**：Kaplan 2020、Chinchilla Hoffmann 2022，IsoFLOP 拟合方法。
- **DeepSeek 后续**：DeepSeek-V2、V3、R1 等继承其数据与缩放策略。

## 笔记
- **关键贡献**：首次系统性研究开源大模型的 Scaling Laws，为后续模型提供理论指导。
- **数据质量**：强调数据质量对模型性能的影响，改变了传统的 Scaling 观念。
- **开源生态**：为 DeepSeek 后续模型的成功奠定了基础，推动了开源大模型的发展。

## 技术细节
- 架构：沿用 LLaMA 的 pre-norm Transformer，RMSNorm、SwiGLU、RoPE。
- 数据：混合语料，代码占比约 20-30%，中英文自然语言补充，质量筛选与反污染。
- 训练：2T token 预训练，超参按 Scaling Law 选择，混合精度、动态批处理。
- 对齐：监督微调 SFT + Direct Preference Optimization DPO，提升指令遵循与偏好对齐。
- 评估：公共基准 + 开放式评测 + 安全评测，多维度验证。

## 应用场景
- 通用对话与指令遵循：Chat 版本用于客服、助手、内容生成。
- 代码与数学推理：Base/Chat 在代码补全、数学求解、逻辑推理任务表现突出。
- 中文/多语言：双语预训练，适合中文用户场景。
- 研究基线：为后续 V2、V3、V4 提供 Scaling Law 与数据管道基础。

## 相关研究
- LLaMA / LLaMA-2：开源基线，架构与规模参考。
- GPT-3.5：闭源对比，Chat 版本对标。
- Scaling Laws：Kaplan 2020、Chinchilla Hoffmann 2022，IsoFLOP 拟合方法。
- DeepSeek 后续：DeepSeek-V2、V3、R1 等继承其数据与缩放策略。

## 笔记
