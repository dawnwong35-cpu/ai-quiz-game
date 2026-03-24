export const glossaryCategories = [
    { id: 'tech', label: '技术原理' },
    { id: 'app', label: '行业应用' },
    { id: 'policy', label: '合规安全' }
];

export const glossary = {
    "LLM": {
        desc: "大语言模型，具“智能涌现”能力，是 AI 2.0 的核心基础。",
        cat: 'tech'
    },
    "Transformer": {
        desc: "2017年提出的神经网络架构，基于自注意力机制，支持高效并行计算。",
        cat: 'tech'
    },
    "RAG": {
        desc: "检索增强生成。结合向量数据库检索实时背景知识，有效减少模型“幻觉”。",
        cat: 'tech'
    },
    "AI Agent": {
        desc: "具备“感知-规划-行动”逻辑的自主实体，能够使用外部工具执行复杂任务。",
        cat: 'app'
    },
    "SkyReels V4": {
        desc: "2026年主流视频生成模型，解决了多镜头角色一致性与长序列生成难题。",
        cat: 'app'
    },
    "欧盟 AI 法案": {
        desc: "全球首部全面 AI 监管法律，核心是基于风险的分层监管模式。",
        cat: 'policy'
    },
    "RLHF": {
        desc: "基于人类反馈的强化学习。通过人类偏好对齐模型输出，确保其安全可控。",
        cat: 'tech'
    },
    "幻觉": {
        desc: "模型生成看似合乎逻辑但在现实世界中完全虚假或错误的现象。",
        cat: 'tech'
    },
    "向量数据库": {
        desc: "专门存储和检索高维向量数据的系统，常用于 RAG 中的语义搜索。",
        cat: 'tech'
    },
    "Deepfake": {
        desc: "深度伪造技术。2026 年识别重点在于生物特征的不协调性。",
        cat: 'policy'
    },
    "对齐": {
        desc: "Alignment，指通过技术手段确保 AI 的目标与人类价值观、利益保持一致。",
        cat: 'policy'
    },
    "思维链": {
        desc: "Chain of Thought (CoT)，让模型展示推理中间步骤的提示工程技巧。",
        cat: 'tech'
    },
    "PPO": {
        desc: "近端策略优化算法，RLHF 流程中微调生成模型最常用的强化学习算法。",
        cat: 'tech'
    },
    "AIGC": {
        desc: "生成式人工智能。2026 年已广泛应用于影视、游戏与办公自动化。",
        cat: 'app'
    }
};

export const faqData = Object.entries(glossary).map(([q, val]) => ({
    q,
    a: val.desc,
    cat: val.cat
}));
