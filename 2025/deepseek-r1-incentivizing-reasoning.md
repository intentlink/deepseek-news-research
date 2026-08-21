# DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning

**日期**: 2025 年 1 月 22 日 提交，2026 年 1 月 4 日 v2  
**arXiv**: https://arxiv.org/abs/2501.12948  
**期刊**: Nature volume 645 pages 633-638 (2025) DOI 10.1038/s41586-025-09422-z  
**作者**: DeepSeek-AI, Daya Guo, Dejian Yang, Haowei Zhang, Junxiao Song, Peiyi Wang, Qihao Zhu, Runxin Xu, Ruoyu Zhang, Shirong Ma, Xiao Bi, Xiaokang Zhang, Xingkai Yu, Yu Wu, Z.F. Wu, Zhibin Gou, Zhihong Shao, Zhuoshu Li, Ziyi Gao, et al.  
**GitHub**: https://github.com/deepseek-ai/DeepSeek-R1  
**HuggingFace**: https://huggingface.co/deepseek-ai  
**Nature**: https://www.nature.com/articles/s41586-025-09422-z

## 概述
本文证明了大型语言模型通过纯强化学习可在不依赖人类标注推理轨迹的情况下激励推理能力。作者在 DeepSeek-V3-Base 上构建 DeepSeek-R1-Zero，采用基于规则的奖励和 Group Relative Policy Optimization（GRPO），使模型涌现出长链式思考、自反思、验证和动态策略适应等高级推理模式。随后通过多阶段冷启动数据收集、拒绝采样、监督微调和混合推理/通用 RL 训练，得到 DeepSeek-R1。DeepSeek-R1 在数学、代码、STEM 等可验证任务上显著超越仅靠监督学习训练的对照模型，并可在不影响推理的前提下对齐人类偏好。进一步的蒸馏使小模型也能获得强推理能力。该工作发表在 Nature 上，标志着开源推理模型的重要里程碑。

## 论文要点
- 纯强化学习激励推理：仅用规则奖励（数学/代码答案正确性）训练 DeepSeek-R1-Zero，无人类标注轨迹即可涌现长 CoT、自反思、回溯、策略切换。
- GRPO 优化：使用组相对策略优化替代 PPO，减少价值网络，样本内相对基准稳定训练。
- 多阶段 R1 pipeline：冷启动数据收集 → 拒绝采样 → 监督微调对齐语言风格 → 混合推理/通用 RL 对齐人类偏好，得到 DeepSeek-R1。
- 性能超越：R1 在 AIME 2024 Pass@1 79.8，MATH-500 97.3，GPQA Diamond 71.5，Codeforces 分位数 96.3，LiveCodeBench 65.9，接近甚至超过 OpenAI o1-1217。
- 蒸馏泛化：R1 蒸馏到 Qwen-1.5B/7B/14B/32B，1.5B 模型已超 GPT-4o 等基线，蒸馏优于小模型直接 RL。
- 安全与对齐：提供风险控制系统、标准安全基准评估和大模型 jailbreak 鲁棒性分析；隐藏 CoT 时安全性提升。
- 开源：权重、代码、蒸馏模型在 HuggingFace 公开，MIT 许可证，成本显著低于闭源同类模型。

## 技术细节
- DeepSeek-R1-Zero：基于 DeepSeek-V3-Base，纯规则奖励 RL。奖励 = 准确性 + 格式一致性。训练期间逐步出现长度增长的 CoT，出现反思、验证、回溯、工具使用等模式。
- GRPO：对每个 prompt 采样一组输出，计算组内均值/标准差作为基准，策略梯度目标：$\nabla_\theta \mathbb{E}[ \frac{r_i - \mu}{\sigma} \log \pi_\theta(a_i|s_i) ]$，省略价值网络，降低计算开销，改善训练稳定性。
- 多阶段 pipeline：1）冷启动数据收集（少量优质问题），2）拒绝采样生成高质量推理样本，3）监督微调对齐语言风格，4）混合 RL（推理 + 通用偏好），最终得到 DeepSeek-R1。
- 训练细节：使用混合精度、长序列支持、动态批处理；推理长度可达 32k token；奖励稀疏问题通过格式奖励和逐步验证缓解。
- 蒸馏：以 R1 的 CoT 为教师，使用监督微调蒸馏到小模型；1.5B 蒸馏模型在 MATH、GSM8K、LiveCodeBench 上显著超越同尺寸基线，且推理质量更稳定。

## 应用场景
- 可验证推理任务：数学解题、代码生成与修复、定理证明、科学问答、编程竞赛。
- 教育与科研辅助：生成逐步求解过程、解释复杂概念、提供可验证的推理链。
- 代码工作流：单元测试生成、代码审查、错误定位、自动补全与重构建议。
- 小模型部署：通过蒸馏在边缘设备上实现高推理能力，降低推理成本。

## 相关研究
- OpenAI o1：人类反馈与强化学习结合的推理模型，引入长 CoT 但依赖大规模人类标注。
- DeepMind AlphaGo / AlphaZero：通过自我对弈和奖励驱动涌现策略，启发纯 RL 训练。
- RLHF / PPO：传统人类偏好对齐方法，需要价值网络和奖励模型。
- Qwen、Gemini 系列：通过混合监督与 RL 提升推理能力，对比研究中蒸馏效果。

## 笔记
- 纯规则奖励足以驱动复杂推理涌现，提示 CoT 可能源于策略探索而非人类演示。
- GRPO 通过组内相对比较减少方差，适合可验证奖励任务。
- 蒸馏对小模型更有效，显示推理能力可迁移且可压缩。
- 未来方向：多模态推理、工具使用强化学习、更细粒度奖励设计。
