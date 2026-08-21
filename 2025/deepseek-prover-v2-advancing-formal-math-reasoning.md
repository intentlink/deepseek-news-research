# DeepSeek-Prover-V2: Advancing Formal Math Reasoning

**日期**: 2025 年 4 月 30 日  
**arXiv**: https://arxiv.org/abs/2504.21801  
**GitHub**: https://github.com/deepseek-ai/DeepSeek-Prover-V2  
**HuggingFace**: https://huggingface.co/deepseek-ai

## 概述
本文提出 DeepSeek-Prover-V2，面向 Lean 4 的开源形式化定理证明大模型。利用 DeepSeek-V3 递归分解复杂问题为子目标，合成冷启动数据，再经强化学习统一非正式与形式化推理。DeepSeek-Prover-V2-671B 在 MiniF2F-test 上达到 88.9% 通过率，解决 PutnamBench 49/658 题。另引入 ProverBench（325 题，含 15 道 AIME 24-25 题），模型解决 6 题，接近 DeepSeek-V3 非正式推理（8/15）。代码开源于 GitHub。

## 论文要点
- **核心思路**：将复杂定理递归分解为子目标，利用 DeepSeek-V3 生成自然语言证明草图并形式化为 Lean 中带 sorry 的子目标，再用 7B 模型递归求解，再合成冷启动数据。
- **训练流程**：两阶段训练—监督微调 + 强化学习；专家迭代、课程学习、蒸馏；子目标生成提供稠密训练信号。
- **性能**：MiniF2F-test 88.9%（Pass@8192），82.4%（Pass@32）；PutnamBench 49/658；ProverBench 325 题，AIME 15 题中解决 6 题。
- **关键贡献**：统一非正式与形式化推理，显著缩小两者差距；提出 ProverBench 基准。
- **技术亮点**：递归子目标分解、课程学习生成猜想定理、推理强化学习。

## 技术细节
- **数据收集**：递归证明搜索：DeepSeek-V3 生成自然语言证明草图→形式化为 Lean 语句带 sorry → 7B 模型递归解决子目标 → 合成完整证明 + CoT 冷启动。
- **子目标分解**：Sketching：自然语言分析→分解步骤→Lean 形式化；递归求解：子目标替换原目标，引入前提；课程学习：生成子目标变体，提升训练信号密度。
- **训练细节**：两阶段—冷启动监督微调 → 推理强化学习；专家迭代、蒸馏；7B 模型处理分解子目标，671B 主模型统一推理。
- **模型规模**：DeepSeek-Prover-V2-671B，基于 DeepSeek-V3 初始化，Lean 4 定理证明。
- **基准**：MiniF2F、ProofNet、PutnamBench、ProverBench（325 题，含 AIME 24-25）。

## 应用场景
- **形式化数学证明**：自动化定理证明、数学研究辅助。
- **教育与竞赛**：AIME、IMO、大学生数学问题求解。
- **代码验证**：形式化规范验证、软件验证。
- **科研助手**：生成 Lean 证明，供数学家审阅。
- **模型训练数据**：生成形式化证明数据，提升 LLM 数学推理。

## 相关研究
- **形式化定理证明**：Lean、Isabelle、Coq；神经定理证明。
- **子目标分解**：DSP（Draft, Sketch, Prove）、层次强化学习。
- **LLM 数学推理**：Chain-of-Thought、推理缩放。
- **神经定理证明基准**：MiniF2F、ProofNet、PutnamBench、AIME。

## 笔记
