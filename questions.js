export const tieredQuestions = {
    foundational: [
        {
            id: 'f1',
            question: "大语言模型 (LLM) 的核心运作逻辑本质上是什么？",
            options: ["完全逻辑推理", "根据上下文预测下一个 Token 概率", "实时抓取网页数据", "基于规则的专家系统"],
            answer: 1,
            explanation: "LLM 如 GPT 本质上是基于海量预训练数据，预测序列中下一个词出现的概率分布。"
        },
        {
            id: 'f2',
            question: "哪项技术让 AI 能像人类一样‘一步步思考’？",
            options: ["数据增强", "思维链 (CoT)", "随机森林", "并行计算"],
            answer: 1,
            explanation: "Chain of Thought (CoT) 引导模型展示推理步骤，显著提升复杂任务的表现。"
        },
        {
            id: 'f3',
            question: "2026 年初，解决视频生成角色一致性的代表性技术是？",
            options: ["Stable Diffusion V1", "SkyReels V4", "OpenAI Sora (2024版)", "Midjourney V3"],
            answer: 1,
            explanation: "SkyReels V4 在 2026 年实现了高精度的音视频对齐与角色长期一致性维护。"
        },
        {
            id: 'f4',
            question: "关于 AI 层级，以下包含关系正确的是？",
            options: ["机器学习 > 人工智能 > 深度学习", "人工智能 > 深度学习 > 机器学习", "人工智能 > 机器学习 > 深度学习", "深度学习 > 机器学习 > 人工智能"],
            answer: 2,
            explanation: "人工智能是广泛领域，机器学习是其子集，深度学习是利用多层神经网络的机器学习分支。"
        },
        {
            id: 'f5',
            question: "什么是 AI 的‘幻觉’ (Hallucination)？",
            options: ["模型运行速度变慢", "生成事实错误但逻辑通顺的内容", "模型拒绝回答敏感问题", "模型无法处理多模态数据"],
            answer: 1,
            explanation: "幻觉指 AI 自信地输出看似可信但在现实世界中并不准确或虚假的信息。"
        },
        {
            id: 'f6',
            question: "欧盟 AI 法案 (EU AI Act) 的监管核心是什么？",
            options: ["按公司规模罚款", "按风险等级分层监管", "全面禁止所有 AI 应用", "仅监管生成式 AI"],
            answer: 1,
            explanation: "法案将 AI 应用分为不可接受、高风险、有限风险等，采取差异化监管手段。"
        },
        {
            id: 'f7',
            question: "‘提示工程’ (Prompt Engineering) 中设定角色 (Role) 的主要作用是？",
            options: ["减少计算开销", "为模型提供上下文语境约束", "保护用户隐私", "绕过敏感词过滤"],
            answer: 1,
            explanation: "通过角色设定（如“你是一位资深架构师”），可以约束模型的输出风格与专业范围。"
        }
    ],
    advanced_pro: [
        {
            id: 'p1',
            question: "在 RAG (检索增强生成) 架构中，向量数据库的核心作用是？",
            options: ["存储用户聊天记录", "通过高维相似性检索召回背景知识", "对模型进行增量微调", "执行 Python 代码逻辑"],
            answer: 1,
            explanation: "RAG 通过检索外部知识库补充上下文，有效减少模型幻觉并提高知识时效性。"
        },
        {
            id: 'p2',
            question: "Transformer 注意力机制中的 Q/K/V 计算，核心利用了什么数学操作？",
            options: ["点积 (Dot Product)", "离散傅里叶变换", "矩阵对角化", "卷积"],
            answer: 0,
            explanation: "通过 Query 与 Key 的点积计算相关性得分，从而对 Value 进行加权汇总。"
        },
        {
            id: 'p3',
            question: "HNSW 算法在向量数据库索引中广受欢迎，它属于哪种搜索？",
            options: ["暴力精确搜索", "近似最近邻 (ANN) 搜索", "线性回归搜索", "深度优先搜索"],
            answer: 1,
            explanation: "HNSW (Hierarchical Navigable Small World) 采用分层图结构平衡了搜索速度与准确率。"
        },
        {
            id: 'p4',
            question: "AI Agent (智能体) 与传统 LLM 的主要区别在于其具备什么逻辑？",
            options: ["更长的上下文窗口", "感知-规划-行动 (Sense-Plan-Act)", "更快的生成速度", "完全闭源的训练数据"],
            answer: 1,
            explanation: "Agent 能够利用外部工具，根据任务目标自主规划并执行行动序列。"
        },
        {
            id: 'p5',
            question: "在训练大规模模型时，LayerNorm 通常被置于？",
            options: ["残差连接之后 (Post-LN)", "残差连接之内 (Pre-LN)", "仅输出层", "激活函数之前"],
            answer: 1,
            explanation: "现代模型多采用 Pre-LN 结构，因为它在训练深层网络时比 Post-LN 更加稳定。"
        },
        {
            id: 'p6',
            question: "PagedAttention 技术是如何优化 LLM 推理吞吐量的？",
            options: ["减少模型参数量", "分块管理 KV Cache 以减少显存碎片", "并行化解码过程", "将 FP16 转换为 INT8"],
            answer: 1,
            explanation: "借鉴操作系统的虚拟内存管理，PagedAttention 极大地提升了显存利用率。"
        },
        {
            id: 'p7',
            question: "RLHF 中的奖励模型 (Reward Model) 通常是如何训练的？",
            options: ["使用无标签文本", "通过人类对多个回答的排序数据", "直接复制基座模型参数", "利用逻辑真值表"],
            answer: 1,
            explanation: "奖励模型学习人类对不同输出质量的偏好排序，从而为 PPO 优化提供反馈信号。"
        }
    ],
    advanced_nonpro: [
        {
            id: 'np1',
            question: "2026 年美国实施的 AI 治理策略被称为？",
            options: ["全面禁止法令", "极简治理促进创新框架", "联邦 AI 审查法", "技术主权保护计划"],
            answer: 1,
            explanation: "美国倾向于灵活监管，在确保安全的前提下最大限度促进技术创新。"
        },
        {
            id: 'np2',
            question: "Deepfake 深度伪造技术在 2026 年社会治理中的最大挑战是？",
            options: ["制作成本太高", "破坏社会信任与选举公正性", "视频画质太差", "无法生成音频"],
            answer: 1,
            explanation: "高仿真度的伪造内容可能导致“认知危机”，严重威胁信息安全与社会稳定。"
        },
        {
            id: 'np3',
            question: "下列哪项在欧盟 AI 法案中被划分为‘不可接受的风险’？",
            options: ["医疗手术助手", "基于生物特征的社会评分系统", "网购推荐算法", "天气预测 AI"],
            answer: 1,
            explanation: "社会评分系统因涉嫌歧视和全面监控，在欧盟是被明令禁止的。"
        },
        {
            id: 'np4',
            question: "‘数据投毒’ (Data Poisoning) 攻击的主要目标是？",
            options: ["窃取用户密码", "破坏模型训练集使推理产生偏见", "让服务器宕机", "提高显卡功耗"],
            answer: 1,
            explanation: "通过在训练数据中掺入隐蔽的恶意样本，操纵模型在特定输入下的表现。"
        },
        {
            id: 'np5',
            question: "如何有效识别 2026 年高水平生成的 AI 图片？",
            options: ["看是否有黑边", "寻找微小像素伪影或生物解剖学不自然", "只看颜色是否鲜艳", "看是否有品牌水印"],
            answer: 1,
            explanation: "尽管生成技术成熟，但生物细节（如虹膜模式）的不自然仍是识别的关键。"
        },
        {
            id: 'np6',
            question: "什么是 AI 的‘对齐’ (Alignment)？",
            options: ["让模型运行速度对齐硬件", "使 AI 行为符合人类价值观与指令意图", "调整模型参数到同一水平", "将文本与图像对齐"],
            answer: 1,
            explanation: "对齐技术旨在确保智能体目标与人类社会伦理目标保持一致。"
        },
        {
            id: 'np7',
            question: "生成式 AI (AIGC) 对未来职场最大的重塑体现在？",
            options: ["完全取代人类操作", "从‘技能型操作’转向‘意图驱动的管理’", "让人们不再需要学习外语", "导致所有人失业"],
            answer: 1,
            explanation: "AI 承担执行层，人类更多负责设定目标、审核质量与跨领域决策。"
        }
    ]
};
