# DeepSeek Coder: Let the Code Write Itself

**日期**: 2023 年 11 月 2 日  
**arXiv**: https://arxiv.org/abs/2401.14196  
**GitHub**: https://github.com/deepseek-ai/DeepSeek-Coder  
**HuggingFace**: https://huggingface.co/deepseek-ai

## 概述
DeepSeek-Coder 系列是开源代码大模型，模型规模 1.3B 至 33B，从零训练于 2 万亿 token。数据以项目级代码库为单位构建，覆盖 87 种编程语言，采用 Fill-In-the-Middle 预训练和 16K 上下文窗口，以提升代码生成与补全能力。评测显示在开源代码模型中达到 SOTA，并超越 Codex、GPT-3.5 等闭源模型，许可允许研究与商业使用。该系列为后续 DeepSeek-Coder-V2 奠定基础，推动了开源代码模型的发展。

## 论文要点
- **模型规模**：1.3B / 6.7B / 33B 的 Base 与 Instruct 版本，2T token 从零训练。
- **数据构成**：87% 代码、10% 英文代码相关自然语言、3% 中文自然语言；仓库级去重与依赖解析，保证跨文件上下文。
- **预训练目标**：Next Token Prediction + Fill-In-the-Middle，FIM 率约 50%，PSM/SPM 模式提升补全能力。
- **上下文长度**：16K 窗口，支持长代码输入与项目级推理。
- **性能**：DeepSeek-Coder-Base 33B 在 HumanEval（56.1%）、MBPP（66.0%）、MultiPL-E 等基准上开源 SOTA；Instruct 33B 超越 GPT-3.5 Turbo，7B 竞争 CodeLlama-33B。
- **开源许可**：MIT 许可证，代码与权重在 GitHub/HuggingFace 公开。

## 技术细节
- **数据采集**：GitHub 公共仓库，截止 2023 年 2 月，87 种语言；仓库级近去重、依赖拓扑排序、质量筛选与反污染。
- **词表**：BPE，32k 词表，基于训练语料子集训练。
- **架构**：解码器-only Transformer，RoPE 位置编码；33B 采用 GLU 变体、SwiGLU、并行注意力等设计。
- **FIM 训练**：随机将代码切分为 Prefix/Middle/Suffix，三种重排模式 PSM / SPM，FIM token `<|fim_hole|>` 标记缺失段，目标为补全中间代码。
- **训练细节**：混合精度、长序列动态批处理；代码补全与生成联合优化。

## 应用场景
- **代码补全与自动生成**：IDE 实时补全、函数生成、代码片段填充。
- **跨文件项目级理解**：依赖解析后的仓库级上下文，支持大项目代码迁移与重构。
- **代码问答与解释**：自然语言描述到代码、代码注释生成、错误修复建议。
- **多语言支持**：87 种语言覆盖，适合全栈与低资源语言开发。
- **教育与竞赛**：LeetCode 题解生成、编程教学辅助。

## 相关研究
- **OpenAI Codex / GPT-3.5**：闭源代码模型，性能强但不可完全复现。
- **CodeLlama、StarCoder、Phind-CodeLlama**：开源竞品，侧重规模与指令微调。
- **FIM 预训练**：SantaCoder、InCoder 的 Fill-In-the-Middle 方法。
- **项目级预训练**：Repo-level 数据构造、跨文件依赖建模先驱工作。
- **后续发展**：DeepSeek-Coder-V2（2024）进一步提升性能，支持 128K 上下文。

## 笔记
- **关键创新**：项目级数据构造和 FIM 预训练的结合，为代码模型提供了更好的跨文件理解能力。
- **开源影响**：MIT 许可证使得该模型在学术和工业界得到广泛应用。
- **技术遗产**：为后续 DeepSeek-Coder-V2 的 MoE 架构和更大规模训练奠定了基础。

## 技术细节
- 数据采集：GitHub 公共仓库，截止 2023 年 2 月，87 种语言；仓库级近去重、依赖拓扑排序、质量筛选与反污染。
- 词表：BPE，32k 词表，基于训练语料子集训练。
- 架构：解码器-only Transformer，RoPE 位置编码；33B 采用 GLU 变体、SwiGLU、并行注意力等设计。
- FIM 训练：随机将代码切分为 Prefix/Middle/Suffix，三种重排模式 PSM / SPM，FIM token `<|fim_hole|>` 标记缺失段，目标为补全中间代码。
- 训练细节：混合精度、长序列动态批处理；代码补全与生成联合优化。

## 应用场景
- 代码补全与自动生成：IDE 实时补全、函数生成、代码片段填充。
- 跨文件项目级理解：依赖解析后的仓库级上下文，支持大项目代码迁移与重构。
- 代码问答与解释：自然语言描述到代码、代码注释生成、错误修复建议。
- 多语言支持：87 种语言覆盖，适合全栈与低资源语言开发。
- 教育与竞赛：LeetCode 题解生成、编程教学辅助。

## 相关研究
- OpenAI Codex / GPT-3.5：闭源代码模型，性能强但不可完全复现。
- CodeLlama、StarCoder、Phind-CodeLlama：开源竞品，侧重规模与指令微调。
- FIM 预训练：SantaCoder、InCoder 的 Fill-In-the-Middle 方法。
- 项目级预训练：Repo-level 数据构造、跨文件依赖建模先驱工作。

## 笔记
