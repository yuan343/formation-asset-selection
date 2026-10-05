const assets = [
  {
    id: "GUSA-01", name: "Gusacitinib", target: "SYK / JAK", owner: "Example portfolio", stage: "Phase 2",
    status: "具有挽救潜力", statusClass: "recoverable", tier: "第一梯队", score: 82, confidence: 74,
    pos: 41, value: 86, evidence: 78, feasibility: 72, market: 84, risk: 58,
    topReasons: ["已有临床与机制信号，可支持进一步分层研究", "存在患者选择和开发路径重构空间", "下一价值拐点具备相对清晰的验证方式"],
    unknown: "最佳患者亚组及长期安全窗仍需进一步确认。"
  },
  {
    id: "BLKR-201", name: "BLKR201", target: "Undisclosed", owner: "Example portfolio", stage: "Phase 1",
    status: "值得深入评估", statusClass: "evaluate", tier: "第一梯队", score: 78, confidence: 61,
    pos: 36, value: 79, evidence: 65, feasibility: 76, market: 81, risk: 63,
    topReasons: ["早期机制与资产差异化值得继续验证", "资本效率和交易路径具有潜在吸引力", "可通过有限补充研究提高判断确定度"],
    unknown: "公开的人体临床证据有限，PoS 区间较宽。"
  },
  {
    id: "SPRI-02", name: "Sprifermin", target: "FGF18", owner: "Example portfolio", stage: "Phase 2",
    status: "具有挽救潜力", statusClass: "recoverable", tier: "第二梯队", score: 73, confidence: 70,
    pos: 39, value: 71, evidence: 75, feasibility: 62, market: 72, risk: 54,
    topReasons: ["结构性终点与临床价值之间存在重新设计空间", "具备可追溯的人体数据", "患者选择可能显著影响价值判断"],
    unknown: "结构改善能否转化为患者可感知的临床获益。"
  },
  {
    id: "CD226-01", name: "anti-CD226", target: "CD226", owner: "Example portfolio", stage: "Preclinical",
    status: "值得深入评估", statusClass: "evaluate", tier: "第二梯队", score: 69, confidence: 55,
    pos: 27, value: 77, evidence: 58, feasibility: 67, market: 80, risk: 69,
    topReasons: ["免疫机制具备差异化假设", "市场上限较高但竞争边界变化快", "早期实验能够显著缩小不确定性"],
    unknown: "人体转化和最佳联合策略尚未验证。"
  },
  {
    id: "KMR-301", name: "KMR301", target: "Undisclosed", owner: "Example portfolio", stage: "Preclinical",
    status: "潜力较低", statusClass: "low", tier: "第三梯队", score: 58, confidence: 46,
    pos: 22, value: 65, evidence: 48, feasibility: 59, market: 69, risk: 76,
    topReasons: ["资产仍处早期，存在较大信息增益空间", "部分分子属性可能支持差异化", "交易结构值得进一步调查"],
    unknown: "核心靶点与分子数据披露不足，当前排序不稳定。"
  },
  {
    id: "CTRL-B17", name: "Control B17", target: "Example target", owner: "Negative control", stage: "Phase 1",
    status: "建议淘汰", statusClass: "dead", tier: "淘汰", score: 31, confidence: 84,
    pos: 9, value: 38, evidence: 62, feasibility: 28, market: 46, risk: 91,
    topReasons: ["暴露不足且缺乏可行的剂型修复路径", "安全窗与预期有效暴露重叠", "继续投入难以带来高价值信息"],
    unknown: "除非出现新的分子或制剂证据，否则不建议重启。"
  }
];

const historicalBacktestModel = {
  version: "v1.0-rule-backtest",
  threshold: 30,
  priors: { "Phase 3": 55 },
  factors: {
    POSITIVE_HUMAN_EFFICACY: { label:"已有人体疗效信号", dimension:"Human efficacy", multiplier:1.80, rationale:"已有临床获益方向，提高重构后成功的可能性。" },
    TARGET_ENGAGEMENT_CONFIRMED: { label:"靶点调控已确认", dimension:"Target engagement", multiplier:1.25, rationale:"说明暴露与药理作用并非主要缺口。" },
    SERIOUS_MECHANISM_SAFETY: { label:"严重且机制相关的安全风险", dimension:"Safety", multiplier:0.45, rationale:"直接压低可接受安全窗和继续开发概率。" },
    REPEATED_SAFETY_EVENT: { label:"严重安全事件再次出现", dimension:"Safety recurrence", multiplier:0.70, rationale:"重复出现说明原风险控制仍不充分。" },
    PRIOR_MITIGATION_RESUMED: { label:"既往风险缓解后曾恢复开发", dimension:"Actionability", multiplier:1.45, rationale:"说明风险至少部分可通过方案和管理改变。" },
    PIVOTAL_PRIMARY_ENDPOINT_MISSED: { label:"关键研究主要终点失败", dimension:"Clinical efficacy", multiplier:0.45, rationale:"确认性证据失败，是显著负向修正。" },
    EARLY_SIGNAL_PHARMACOLOGY_ALIGNED: { label:"早期信号与药理窗口一致", dimension:"PK/PD alignment", multiplier:1.60, rationale:"支持失败可能来自观察窗口，而非分子完全无效。" },
    ACCEPTABLE_SAFETY_PROFILE: { label:"现有安全性支持继续验证", dimension:"Safety", multiplier:1.25, rationale:"没有出现足以直接终止开发的安全障碍。" },
    DESIGN_WINDOW_MISMATCH: { label:"终点窗口与药理作用不匹配", dimension:"Trial design", multiplier:1.55, rationale:"存在可被前瞻性试验直接检验的设计修复空间。" },
    POSTHOC_DEPENDENCE: { label:"关键正向信号依赖事后分析", dimension:"Evidence quality", multiplier:0.70, rationale:"事后切片可能高估真实效应，需要独立复制。" },
    PHASE23_FUTILITY: { label:"大型中晚期研究因无效终止", dimension:"Clinical futility", multiplier:0.25, rationale:"高质量人体证据显示获得临床获益的机会很低。" },
    CLINICAL_BIOMARKER_DISCONNECT: { label:"靶点调控未转化为临床获益", dimension:"Causal chain", multiplier:0.35, rationale:"机制链在生物标志物到患者获益之间断裂。" },
    EARLIER_STAGE_HYPOTHESIS: { label:"更早疾病阶段仍有剩余假设", dimension:"Patient / stage", multiplier:1.20, rationale:"保留有限的阶段前移可能性，但不足以覆盖强负向证据。" }
  }
};

function calculateHistoricalBacktest(input) {
  const prior = historicalBacktestModel.priors[input.stage] ?? 50;
  let odds = prior / (100 - prior);
  const trace = input.factorIds.map(id => {
    const factor = historicalBacktestModel.factors[id];
    const before = Math.round((odds / (1 + odds)) * 100);
    odds *= factor.multiplier;
    const after = Math.round((odds / (1 + odds)) * 100);
    return { id, ...factor, before, after };
  });
  const point = Math.round((odds / (1 + odds)) * 100);
  const width = Math.round(5 + (100 - input.confidence) * .10 + input.missing * .70 + input.conflicts * 1.50);
  const low = Math.max(1, point - width);
  const high = Math.min(95, point + width);
  const predictedSuccess = high >= historicalBacktestModel.threshold;
  return {
    prior, point, low, high, width, trace,
    predictedSuccess,
    predictedLabel: predictedSuccess ? "保留成功可能 / 建议重构" : "预测失败 / 建议停止",
    actualSuccess: input.actualSuccess,
    hit: predictedSuccess === input.actualSuccess,
    threshold: historicalBacktestModel.threshold,
    confidence: input.confidence
  };
}

const historicalCases = [
  {
    id: "FITUSIRAN",
    candidateId: "FITUSIRAN-ATDR",
    asset: "Fitusiran / Qfitlia",
    target: "Antithrombin (AT)",
    modality: "siRNA",
    stage: "Phase 3历史回测",
    rights: "由Alnylam发现，Sanofi负责后续开发与商业化",
    currentUse: "血友病A或B（伴或不伴凝血因子抑制物）的常规预防治疗",
    question: "出现严重血栓风险后，问题来自机制本身，还是固定剂量与风险管理方式？",
    verdict: "可通过剂量与风险管理挽救",
    verdictClass: "recoverable",
    recommendation: "停止固定高暴露方案，按AT活性动态调剂量，并把突破性出血处置纳入统一风险管理",
    probability: "自动计算中",
    probabilityLabel: "重构方案恢复可开发性并进入注册路径",
    confidence: 74,
    evidenceCutoff: "2020-10-30（历史回测）",
    step1Summary: "潜在可救：疗效与靶点调控仍有支持，但原固定剂量方案触发安全性硬风险，必须先重构暴露和监测。",
    backtest: {
      task: "只使用第二次暂停前已公开的信息，判断项目应停止还是重构。",
      outcomeDate: "2025-03-28",
      outcome: "FDA批准Qfitlia；获批方案改为AT活性指导的个体化剂量，而非原固定80 mg月给药。",
      actualSuccess: true,
      actualLabel: "成功：调整剂量后获批",
      modelInput: { stage:"Phase 3", confidence:74, missing:3, conflicts:2, factorIds:["POSITIVE_HUMAN_EFFICACY","TARGET_ENGAGEMENT_CONFIRMED","SERIOUS_MECHANISM_SAFETY","REPEATED_SAFETY_EVENT","PRIOR_MITIGATION_RESUMED"] }
    },
    knownFacts: [
      "2017年公开Ⅱ期OLE探索性分析中，全体患者中位年化出血率为1，抑制物患者为0。",
      "临床数据已显示AT降低、凝血酶生成增加与出血控制方向一致。",
      "2017年发生致死性脑静脉窦血栓，全部研究暂停；随后风险缓解措施获得FDA认可并恢复开发。",
      "2020年10月30日因ATLAS项目报告非致死性血栓事件再次暂停给药。"
    ],
    risks: [
      "安全风险具有机制相关性，不能仅靠扩大样本量解决。",
      "真实世界监测、剂量调整和突破性出血处置会增加使用复杂度。",
      "如果安全窗过窄，商业便利性可能被风险管理负担抵消。"
    ],
    adjustments: [
      { lever: "剂量", action: "从固定剂量改为以AT活性15–35%为目标的动态剂量。", impact: "+10–18pp", reason: "直接控制与血栓风险相关的药效强度。" },
      { lever: "给药周期", action: "降低起始暴露并拉长给药间隔，再根据AT活性调整。", impact: "+5–10pp", reason: "减少过度AT抑制并保留预防出血获益。" },
      { lever: "风险管理", action: "统一突破性出血治疗规则、监测窗口与暂停标准。", impact: "降低尾部风险", reason: "严重事件不仅由分子决定，也与伴随处理和暴露管理相关。" },
      { lever: "人群与教育", action: "明确高风险患者条件并强化处方者与患者教育。", impact: "提高可执行性", reason: "个体化方案只有在监测和执行可靠时才成立。" }
    ],
    nextExperiment: "在AT活性指导剂量下前瞻性验证出血控制与血栓风险的净临床获益",
    stopRule: "若目标AT窗口内仍出现不可接受的严重血栓，或风险管理无法稳定执行，则停止该开发方案。",
    sources: [
      { title: "FDA · Qfitlia批准公告", url: "https://www.fda.gov/news-events/press-announcements/fda-approves-novel-treatment-hemophilia-or-b-or-without-factor-inhibitors", tier: "监管结果" },
      { title: "FDA · Qfitlia Drug Trials Snapshot", url: "https://www.fda.gov/drugs/drug-trials-snapshots/drug-trials-snapshots-qfitlia", tier: "监管审评" },
      { title: "Alnylam · 2017年Ⅱ期OLE疗效数据", url: "https://investors.alnylam.com/press-release?id=21816", tier: "截止日前证据" },
      { title: "Alnylam · 临床暂停与致死性血栓事件", url: "https://investors.alnylam.com/press-release?id=21846", tier: "公司历史披露" },
      { title: "Alnylam · 2017年风险缓解与恢复方案", url: "https://investors.alnylam.com/press-release?id=22026", tier: "截止日前证据" },
      { title: "Sanofi · 修订剂量与风险管理方案", url: "https://www.sanofi.com/en/media-room/press-releases/2021/2021-02-05-16-30-00-2170841", tier: "公司方案披露" }
    ]
  },
  {
    id: "ETRIPAMIL",
    candidateId: "ETRIPAMIL-RAPID",
    asset: "Etripamil / Cardamyst",
    target: "L-type calcium channel",
    modality: "鼻喷小分子",
    stage: "Phase 3历史回测",
    rights: "由Milestone Pharmaceuticals开发",
    currentUse: "成人阵发性室上性心动过速（PSVT）的自我给药急性治疗",
    question: "首个Ⅲ期主要终点未达标，代表药物无效，还是终点窗口和给药方案没有对齐药理作用？",
    verdict: "试验设计可救，分子不应直接判死",
    verdictClass: "recoverable",
    recommendation: "把主要终点收窄到快速转复窗口，允许必要时重复给药，并保留院外自我用药场景",
    probability: "自动计算中",
    probabilityLabel: "重构关键试验后确认临床获益并支持申报",
    confidence: 70,
    evidenceCutoff: "2020-03-23（历史回测）",
    step1Summary: "值得重构：五小时主要终点失败，但45分钟早期转复信号与快速起效药理一致，优先怀疑终点与给药设计。",
    backtest: {
      task: "在NODE-301首个Ⅲ期失败时，判断应停止开发还是重做关键试验。",
      outcomeDate: "2025-12-12",
      outcome: "FDA批准Cardamyst；后续RAPID研究采用30分钟主要终点并允许重复给药，验证了重构方向。",
      actualSuccess: true,
      actualLabel: "成功：重构试验后获批",
      modelInput: { stage:"Phase 3", confidence:70, missing:3, conflicts:1, factorIds:["PIVOTAL_PRIMARY_ENDPOINT_MISSED","EARLY_SIGNAL_PHARMACOLOGY_ALIGNED","ACCEPTABLE_SAFETY_PROFILE","DESIGN_WINDOW_MISMATCH","POSTHOC_DEPENDENCE"] }
    },
    knownFacts: [
      "NODE-301以五小时内转复为主要分析窗口，主要终点未达统计学显著性。",
      "45分钟的早期转复分析达到统计学显著，方向与快速起效的鼻喷药理一致。",
      "公开结果显示在院外自我用药场景中总体耐受良好，未报告严重随机化治疗期不良事件。",
      "公司在结果公布时认为五小时窗口与药物5–45分钟的已知药理作用不匹配，但这一解释仍需前瞻性验证。"
    ],
    risks: [
      "早期阳性可能来自事后切片，必须用预设终点前瞻性复制。",
      "自我给药依赖正确识别发作、操作和必要时追加剂量。",
      "短时间获益必须转化为患者可感知、可监管接受的临床价值。"
    ],
    adjustments: [
      { lever: "主要终点", action: "把主要评估窗口从五小时改为30分钟内转复。", impact: "+10–16pp", reason: "让终点与药物快速起效、短作用时间相匹配。" },
      { lever: "给药方案", action: "在症状持续时允许10分钟后第二次鼻喷。", impact: "+4–8pp", reason: "处理首次给药不足和个体暴露差异。" },
      { lever: "使用场景", action: "继续聚焦院外自我用药，记录症状缓解与医疗资源使用。", impact: "提高产品价值", reason: "差异化来自快速、便携和减少急诊依赖。" },
      { lever: "试验设计", action: "把早期信号写入预设统计方案并独立重复。", impact: "提高置信度", reason: "避免把事后分析误当成确定性证据。" }
    ],
    nextExperiment: "开展以30分钟转复为预设主要终点、允许重复给药的独立关键Ⅲ期试验",
    stopRule: "若预设早期窗口仍未改善转复，或自我给药安全性不成立，则停止当前产品路径。",
    sources: [
      { title: "NODE-301首个Ⅲ期结果", url: "https://www.sec.gov/Archives/edgar/data/1408443/000110465920037367/tm2013489d1_ex99-1.htm", tier: "公司法定披露" },
      { title: "FDA反馈与RAPID方案重构", url: "https://www.sec.gov/Archives/edgar/data/1408443/000110465920085814/tm2025424d1_ex99-1.htm", tier: "公司法定披露" },
      { title: "Milestone · RAPID阳性结果", url: "https://investors.milestonepharma.com/news-releases/news-release-details/milestone-pharmaceuticals-announces-positive-results-phase-3", tier: "公司临床结果" },
      { title: "FDA · Cardamyst批准公告", url: "https://www.fda.gov/drugs/news-events-human-drugs/fda-approves-drug-type-abnormally-fast-heart-rhythm", tier: "监管结果" }
    ]
  },
  {
    id: "VERUBECestat",
    candidateId: "VERUBEC-STOP",
    asset: "Verubecestat",
    target: "BACE1",
    modality: "口服小分子抑制剂",
    stage: "Phase 3已终止",
    rights: "由Merck开发",
    currentUse: "曾研究用于轻中度及前驱期阿尔茨海默病，项目已终止",
    question: "明确降低淀粉样蛋白却没有临床获益后，提前用药还能否挽救同一分子和机制？",
    verdict: "低潜力 / 建议停止",
    verdictClass: "dead",
    recommendation: "不再资助同一分子的宽泛疗效试验；只有新证据能解释靶点调控与临床无效的断裂时才重新打开",
    probability: "自动计算中",
    probabilityLabel: "同一分子通过前移人群恢复临床价值",
    confidence: 86,
    evidenceCutoff: "2017-02-14（历史回测）",
    step1Summary: "低潜力并接近淘汰：已有充分靶点调控，却无临床获益并伴不良事件；不能把“更早患者”当作无限续命假设。",
    backtest: {
      task: "在轻中度AD试验因无效终止后，判断前移至前驱期是否值得继续。",
      outcomeDate: "2018-02-13",
      outcome: "Merck宣布停止前驱期APECS研究；独立数据委员会认为继续试验也不太可能建立正向获益风险。",
      actualSuccess: false,
      actualLabel: "失败：前驱期Ⅲ期同样终止",
      modelInput: { stage:"Phase 3", confidence:86, missing:1, conflicts:0, factorIds:["TARGET_ENGAGEMENT_CONFIRMED","PHASE23_FUTILITY","CLINICAL_BIOMARKER_DISCONNECT","EARLIER_STAGE_HYPOTHESIS"] }
    },
    knownFacts: [
      "截至2017年2月14日，EPOCH Phase 2/3研究已按独立数据委员会建议因无效停止。",
      "数据委员会判断继续研究几乎没有机会观察到正向临床效应。",
      "2016年人体研究已证明verubecestat能够显著降低CSF中的Aβ相关指标，支持靶点调控成立。",
      "Merck当时仍继续前驱期AD的APECS研究，因此‘更早干预’是尚未揭晓的剩余假设。"
    ],
    risks: [
      "把患者前移并不能自动修复靶点调控与临床结局之间的因果断裂。",
      "更早期试验持续时间更长、成本更高，错误继续的机会成本极大。",
      "把患者前移仍需解释为何明确靶点调控没有带来临床获益。"
    ],
    adjustments: [
      { lever: "停止规则", action: "把充分靶点调控但无临床获益设为强停止信号。", impact: "避免无效投入", reason: "这比单纯剂量或终点问题更接近机制层失败。" },
      { lever: "反证要求", action: "仅当新的人体因果证据能解释阶段、时间窗或亚群差异时再评估。", impact: "提高重启门槛", reason: "重启必须解决旧证据，而不是绕开旧证据。" },
      { lever: "下一实验", action: "优先做低成本机制反证，不直接再进入大型疗效试验。", impact: "提高VOI", reason: "用最小成本判断是否存在真正可区分的生物学场景。" },
      { lever: "组合决策", action: "将资源转向机制链更完整、临床可测的候选资产。", impact: "释放资源", reason: "负向对照同样是资产组合优化的重要输出。" }
    ],
    nextExperiment: "如无新的强因果证据则不开展下一项临床试验；最多进行预设阈值的机制反证研究",
    stopRule: "缺乏能够解释既往阴性结果的新人体证据时，维持停止状态。",
    sources: [
      { title: "Merck · 2017年EPOCH因无效停止", url: "https://www.merck.com/news/merck-announces-epoch-study-of-verubecestat-for-the-treatment-of-people-with-mild-to-moderate-alzheimers-disease-to-stop-for-lack-of-efficacy/", tier: "截止日前证据" },
      { title: "2016年人体靶点调控研究", url: "https://pubmed.ncbi.nlm.nih.gov/27807285/", tier: "截止日前论文" },
      { title: "Merck · 2018年APECS停止公告", url: "https://www.merck.com/news/merck-announces-discontinuation-of-apecs-study-evaluating-verubecestat-mk-8931-for-the-treatment-of-people-with-prodromal-alzheimers-disease/", tier: "后来真实结果" },
      { title: "NEJM · APECS前驱期AD结果", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1812840", tier: "后来同行评议" }
    ]
  }
];

historicalCases.forEach(item => {
  item.backtestResult = calculateHistoricalBacktest({ ...item.backtest.modelInput, actualSuccess:item.backtest.actualSuccess });
  item.probability = `${item.backtestResult.low}–${item.backtestResult.high}%`;
  item.confidence = item.backtestResult.confidence;
});

const historicalBacktestByCandidate = Object.fromEntries(
  historicalCases.map(item => [item.candidateId, item.backtestResult])
);

const realCases = [
  {
    id: "HBM4003",
    candidateId: "HBM4003-MCRC",
    asset: "HBM4003 / Porustobart",
    target: "CTLA-4",
    modality: "全人源重链抗体",
    stage: "Phase 1b/2",
    rights: "大中华区由和铂体系推进；境外由合作NewCo推进",
    currentUse: "黑色素瘤、MSS转移性结直肠癌、肝癌、神经内分泌肿瘤等联合治疗研究",
    question: "已有临床信号能否通过人群收窄与试验设计，转化为可确认的临床获益？",
    verdict: "值得深入评估",
    verdictClass: "evaluate",
    recommendation: "优先验证无肝转移MSS结直肠癌中的富集策略，而不是继续泛实体瘤扩张",
    probability: "45–60%",
    probabilityLabel: "下一阶段达到预设临床目标",
    confidence: 58,
    evidenceCutoff: "2026-10-05",
    knownFacts: [
      "公开Ⅱ期队列纳入24名经过至少两线治疗的无肝转移MSS转移性结直肠癌患者。",
      "23名可评价患者中，ORR 34.8%、DCR 60.9%，中位PFS 4.2个月。",
      "未观察到4级或致死性TEAE；治疗相关严重不良事件为37.5%。",
      "公司当前公开管线同时列出黑色素瘤、CRC、HCC与NEN等开发方向。"
    ],
    risks: [
      "样本量小且为开放标签、非随机研究，效应可能被高估。",
      "无肝转移是重要选择条件，但目前还不能确认是预测性因素还是预后性因素。",
      "联合治疗贡献、CTLA-4剂量与安全性的独立作用仍需拆分。"
    ],
    adjustments: [
      { lever: "患者人群", action: "预设无肝转移分层，并探索Treg、免疫浸润及相关标志物。", impact: "+6–12pp", reason: "减少人群异质性，验证现有疗效信号是否可重复。" },
      { lever: "适应症顺序", action: "先聚焦信号最清晰的MSS mCRC亚群，再决定是否扩展其他实体瘤。", impact: "+4–8pp", reason: "把有限样本和资金集中到证据收敛最快的场景。" },
      { lever: "试验设计", action: "引入对照或严格历史基准，并对肝转移状态进行前瞻性分层。", impact: "提高置信度", reason: "排除患者选择造成的假阳性，并获得可决策的效应量。" },
      { lever: "剂量与联合", action: "继续比较暴露、Treg变化、疗效与免疫毒性的关系。", impact: "+2–6pp", reason: "确认联合方案的净效益是否足以覆盖严重不良事件负担。" }
    ],
    nextExperiment: "开展带预设分层和明确成功阈值的确认性扩展队列",
    stopRule: "若富集人群未达到预设ORR/PFS方向，或安全负担使净临床获益不足，则停止当前适应症路径。",
    sources: [
      { title: "和铂：HBM4003联合替雷利珠单抗Ⅱ期结果", url: "https://www.harbourbiomed.com/news/249.html", tier: "公司公开结果" },
      { title: "ClinicalTrials.gov · NCT05167071", url: "https://clinicaltrials.gov/study/NCT05167071", tier: "试验登记" },
      { title: "和铂当前肿瘤管线", url: "https://www.harbourbiomed.com/therapeutics/immunooncology", tier: "公司管线" }
    ]
  },
  {
    id: "HBM1020",
    candidateId: "HBM1020-ENRICH",
    asset: "HBM1020",
    target: "B7H7 / HHLA2",
    modality: "全人源单克隆抗体",
    stage: "Phase 1",
    rights: "公司公开管线标示为全球权益",
    currentUse: "晚期实体瘤；公司材料提出2L+ NSCLC与透明细胞肾癌方向",
    question: "早期稳定疾病信号能否通过生物标志物富集，转化为可重复的客观缓解？",
    verdict: "具有挽救与重构潜力",
    verdictClass: "recoverable",
    recommendation: "暂不做泛实体瘤扩张；优先验证HHLA2高表达、PD-L1阴性或PD-1耐药人群",
    probability: "30–45%",
    probabilityLabel: "下一阶段观察到可确认疗效信号",
    confidence: 39,
    evidenceCutoff: "2026-10-05",
    knownFacts: [
      "公开Ⅰ期剂量递增研究评估安全性、PK/PD和初步抗肿瘤活性。",
      "15名接受治疗后肿瘤评估的患者中，7名达到疾病稳定。",
      "其中2名患者的肿瘤分别缩小11%和25%，尚未形成明确客观缓解证据。",
      "公开信息显示初步安全性和耐受性良好。"
    ],
    risks: [
      "样本量很小，且跨瘤种混合，无法判断真正敏感人群。",
      "疾病稳定可能来自自然病程，不能等同于药物活性。",
      "B7H7表达阈值、空间分布和预测性价值尚未得到临床验证。"
    ],
    adjustments: [
      { lever: "生物标志物", action: "前瞻性检测HHLA2表达并保留基线及治疗中活检。", impact: "+5–10pp", reason: "直接验证靶点表达是否能够预测药效。" },
      { lever: "患者人群", action: "优先研究PD-L1阴性或PD-1/PD-L1治疗后耐药人群。", impact: "+4–8pp", reason: "与候选机制假设一致，减少无关人群稀释信号。" },
      { lever: "适应症", action: "先比较NSCLC与透明细胞肾癌的表达率、可入组性及早期信号。", impact: "重新排序", reason: "不要在没有敏感人群证据时同时铺开多个实体瘤。" },
      { lever: "开发顺序", action: "先完成小型富集扩展队列，再决定单药扩大或进入联合。", impact: "降低风险", reason: "用较低成本回答单药是否存在机制一致的效应。" }
    ],
    nextExperiment: "开展带HHLA2表达分层和配对活检的富集扩展队列",
    stopRule: "若足够暴露下仍未观察到机制一致的生物标志物变化或客观缓解，则停止单药扩展。",
    sources: [
      { title: "和铂：HBM1020 ESMO 2024临床数据", url: "https://www.harbourbiomed.com/news/1429.html", tier: "公司公开结果" },
      { title: "ClinicalTrials.gov · NCT05824663", url: "https://clinicaltrials.gov/study/NCT05824663", tier: "试验登记" },
      { title: "和铂2026路演材料", url: "https://www.harbourbiomed.com/upload/202604/1776889891598235035.pdf", tier: "公司投资者材料" },
      { title: "和铂当前肿瘤管线", url: "https://www.harbourbiomed.com/therapeutics/immunooncology", tier: "公司管线" }
    ]
  },
  ...historicalCases
];

const evidence = [
  { tag: "P", asset: "HBM4003", claim: "无肝转移MSS mCRCⅡ期公开队列中，23名可评价患者ORR为34.8%、DCR为60.9%，中位PFS为4.2个月。", source: "和铂公开结果 / NCT05167071", quality: "公开临床结果", updated: "2026-10" },
  { tag: "P", asset: "HBM4003", claim: "小样本、开放标签且非随机，现有结果只能支持确认性研究假设。", source: "试验设计审计", quality: "模型解释", updated: "2026-10" },
  { tag: "P", asset: "HBM1020", claim: "Ⅰ期公开数据中15名可评价患者有7名疾病稳定，两名肿瘤缩小11%和25%。", source: "和铂ESMO 2024 / NCT05824663", quality: "公开临床结果", updated: "2026-10" },
  { tag: "E", asset: "HBM1020", claim: "HHLA2高表达、PD-L1阴性或PD-1耐药人群富集属于待验证的开发假设。", source: "v0.9案例推演", quality: "研究性假设", updated: "2026-10" },
  { tag: "P", asset: "Fitusiran", claim: "固定剂量方案发生严重血栓风险后，开发转向AT活性指导的个体化剂量；Qfitlia于2025年获FDA批准。", source: "FDA / Alnylam / Sanofi", quality: "监管与公司一级来源", updated: "2026-10" },
  { tag: "P", asset: "Etripamil", claim: "NODE-301五小时主要终点失败，但早期转复信号促使RAPID改用30分钟主要终点并允许重复给药；Cardamyst于2025年获批。", source: "SEC披露 / FDA", quality: "法定披露与监管来源", updated: "2026-10" },
  { tag: "P", asset: "Verubecestat", claim: "充分降低淀粉样相关指标未转化为认知或功能获益，轻中度与前驱期Ⅲ期研究均为阴性。", source: "NEJM / ClinicalTrials.gov", quality: "同行评议临床结果", updated: "2026-10" },
  { tag: "E", asset: "历史回测规则", claim: "模型只允许读取预设证据截止日前的信息；阶段先验赔率乘以证据修正乘数形成概率区间，后来结果只用于检验命中，不回填初始预测。", source: "v1.0-rule-backtest", quality: "模型规则", updated: "2026-10" },
  { tag: "F", asset: "Formation 运营模式", claim: "资产选择、开发策略与临床执行属于连续决策链。", source: "Formation 官网与公开材料", quality: "一级来源", updated: "2026-10" },
  { tag: "F", asset: "适应症全景分析", claim: "原始数据需标准化；同行评议文献通常优先于注册库中的结果摘要。", source: "Formation 工程博客", quality: "一级来源", updated: "2026-10" },
  { tag: "F", asset: "人类遗传学", claim: "遗传学分析进入每项资产评估，并保留人工检查点。", source: "Formation 遗传学工作流", quality: "一级来源", updated: "2026-10" },
  { tag: "C", asset: "Gusacitinib", claim: "用于回测“收购—重构—关键价值节点再授权”的正向路径。", source: "Formation / Sanofi 交易公告", quality: "高", updated: "2026-10" },
  { tag: "C", asset: "BLKR201", claim: "已验证机制、选择性、CNS 暴露及新适应症空间构成正向特征。", source: "Formation 项目公告", quality: "高", updated: "2026-10" },
  { tag: "C", asset: "负向对照", claim: "建议淘汰与潜力较低的阈值必须使用失败资产做反向校准。", source: "本项目回测要求", quality: "模型规则", updated: "2026-10" },
  { tag: "P", asset: "监管证据", claim: "监管文件、试验结果和标签用于验证安全性、剂量、终点与开发历史。", source: "FDA / EMA / 临床试验注册库", quality: "一级来源", updated: "2026-10" },
  { tag: "P", asset: "权属证据", claim: "公司公告、财报、专利及交易文件用于确认状态、权利与交易路径。", source: "公司 / SEC / 专利记录", quality: "一级来源", updated: "2026-10" },
  { tag: "E", asset: "全范围海选", claim: "临床前至临床、所有领域、类型与状态均可进入海选；阶段只改变证据要求。", source: "本项目扩展逻辑", quality: "模型规则", updated: "2026-10" },
  { tag: "E", asset: "候选硬性否决条件", claim: "CMC、IP 与权利问题暂列执行障碍，不自动等同于科学上应被淘汰。", source: "待专家讨论", quality: "草案", updated: "2026-10" },
  { tag: "E", asset: "STEP 1 海选优先分", claim: "海选后优先分用于研究资源排序，不替代 STEP 2 的风险调整价值比较。", source: "v0.4 方法规范", quality: "模型规则", updated: "2026-10" }
];

const sourcePolicy = [
  { tier: "A", title: "决策级事实", sources: "监管审评文件、正式临床结果、同行评议全文、公司法定披露", use: "可支持硬性否决条件或关键结论" },
  { tier: "B", title: "强支持证据", sources: "试验注册库、会议完整摘要、专利、可信交易公告、遗传学数据库", use: "支持评分与冲突核查" },
  { tier: "C", title: "线索级证据", sources: "公司管线页、新闻稿、投资者材料、结构化商业数据库", use: "触发进一步研究，不能单独建议淘汰" },
  { tier: "D", title: "推断与缺口", sources: "二手报道、模型推断、未能交叉验证的信息", use: "只能降低置信度或生成 Research Trigger" }
];

const driverDefinitions = {
  biology: [
    ["target", "靶点成立程度", .18], ["moa", "作用机制完整性", .17],
    ["human", "人体证据", .28], ["class", "同靶点 / 同机制验证", .17],
    ["genetics", "人类遗传学支持", .20]
  ],
  molecule: [
    ["potency", "活性强度", .10], ["selectivity", "选择性", .12], ["pk", "药代动力学", .11],
    ["exposure", "有效暴露", .13], ["penetration", "组织穿透", .09],
    ["offTarget", "脱靶风险", .11], ["safetyWindow", "安全窗", .14],
    ["formulation", "制剂可行性", .08], ["advantage", "分子特异性优势", .12]
  ],
  redesign: [
    ["indication", "适应症调整", .12], ["population", "患者 / 生物标志物分层", .13],
    ["dose", "剂量调整", .11], ["schedule", "给药周期", .08], ["formulation", "剂型调整", .09],
    ["route", "给药途径", .07], ["combination", "联合治疗", .11], ["endpoint", "终点重构", .10],
    ["treatmentLine", "治疗线次", .08], ["trialDesign", "试验设计", .11]
  ]
};

const step1Presets = {
  recoverable: {
    label: "可救资产示例", asset: "Gusacitinib demo", stage: "Phase 2", modality: "Small molecule", status: "deprioritized",
    sourceSummary: { facts: 34, sourceTypes: 5, unresolved: 3 },
    eligibility: { identity: true, evidence: true, traceability: true, rights: true },
    hard: { target: false, safety: false, exposure: false, molecule: false, cmc: false, ip: false, rights: false }, hardConfidence: 62,
    drivers: {
      biology: { target: 80, moa: 78, human: 72, class: 82, genetics: 63 },
      molecule: { potency: 77, selectivity: 68, pk: 64, exposure: 67, penetration: 58, offTarget: 62, safetyWindow: 59, formulation: 71, advantage: 76 },
      redesign: { indication: 76, population: 90, dose: 84, schedule: 72, formulation: 61, route: 48, combination: 74, endpoint: 88, treatmentLine: 70, trialDesign: 89 }
    },
    scores: { evidence: 68, actionability: 62, information: 80, valueInflection: 78 },
    failure: { biology: 8, efficacy: 12, safety: 8, pkpd: 14, dose: 46, patient: 72, trial: 64, operational: 18, commercial: 15, strategic: 28 },
    rescue: ["population", "dose", "schedule", "endpoint", "trial"]
  },
  strategic: {
    label: "战略放弃示例", asset: "Strategy-abandoned asset", stage: "Phase 1", modality: "Biologic", status: "owner strategy change",
    sourceSummary: { facts: 25, sourceTypes: 4, unresolved: 4 },
    eligibility: { identity: true, evidence: true, traceability: true, rights: false },
    hard: { target: false, safety: false, exposure: false, molecule: false, cmc: false, ip: false, rights: true }, hardConfidence: 71,
    drivers: {
      biology: { target: 85, moa: 82, human: 67, class: 78, genetics: 74 },
      molecule: { potency: 79, selectivity: 81, pk: 73, exposure: 76, penetration: 71, offTarget: 74, safetyWindow: 69, formulation: 72, advantage: 78 },
      redesign: { indication: 74, population: 71, dose: 63, schedule: 60, formulation: 55, route: 52, combination: 64, endpoint: 68, treatmentLine: 66, trialDesign: 72 }
    },
    scores: { evidence: 61, actionability: 34, information: 74, valueInflection: 66 },
    failure: { biology: 8, efficacy: 9, safety: 6, pkpd: 7, dose: 10, patient: 12, trial: 14, operational: 18, commercial: 56, strategic: 88 },
    rescue: ["indication", "population", "trial", "regional"]
  },
  dead: {
    label: "Hard Gate 示例", asset: "Control B17", stage: "Phase 1", modality: "Small molecule", status: "discontinued",
    sourceSummary: { facts: 28, sourceTypes: 5, unresolved: 1 },
    eligibility: { identity: true, evidence: true, traceability: true, rights: true },
    hard: { target: false, safety: true, exposure: true, molecule: false, cmc: false, ip: false, rights: false }, hardConfidence: 88,
    drivers: {
      biology: { target: 67, moa: 61, human: 48, class: 72, genetics: 55 },
      molecule: { potency: 51, selectivity: 46, pk: 24, exposure: 18, penetration: 27, offTarget: 21, safetyWindow: 12, formulation: 25, advantage: 34 },
      redesign: { indication: 34, population: 31, dose: 14, schedule: 18, formulation: 22, route: 24, combination: 20, endpoint: 35, treatmentLine: 29, trialDesign: 32 }
    },
    scores: { evidence: 86, actionability: 41, information: 24, valueInflection: 20 },
    failure: { biology: 10, efficacy: 28, safety: 90, pkpd: 84, dose: 61, patient: 15, trial: 22, operational: 10, commercial: 14, strategic: 9 },
    rescue: []
  },
  unknown: {
    label: "证据不足示例", asset: "Early asset X", stage: "Preclinical", modality: "Novel modality", status: "paused",
    sourceSummary: { facts: 8, sourceTypes: 2, unresolved: 9 },
    eligibility: { identity: true, evidence: false, traceability: false, rights: true },
    hard: { target: false, safety: false, exposure: false, molecule: false, cmc: false, ip: false, rights: false }, hardConfidence: 32,
    drivers: {
      biology: { target: 68, moa: 64, human: 20, class: 58, genetics: 62 },
      molecule: { potency: 66, selectivity: 57, pk: 44, exposure: 48, penetration: 52, offTarget: 46, safetyWindow: 49, formulation: 54, advantage: 70 },
      redesign: { indication: 74, population: 76, dose: 67, schedule: 62, formulation: 58, route: 60, combination: 66, endpoint: 69, treatmentLine: 55, trialDesign: 72 }
    },
    scores: { evidence: 24, actionability: 52, information: 78, valueInflection: 64 },
    failure: { biology: 25, efficacy: 20, safety: 18, pkpd: 30, dose: 35, patient: 42, trial: 38, operational: 26, commercial: 21, strategic: 28 },
    rescue: ["population", "dose", "trial"]
  }
};

const cloneStep1 = value => JSON.parse(JSON.stringify(value));
let step1PresetKey = "recoverable";
let step1Mode = "auto";
let step1State = cloneStep1(step1Presets[step1PresetKey]);

const viewTitles = {
  workspace: "决策总览",
  cases: "真实案例试跑",
  radar: "STEP 0 · 机会雷达",
  recoverability: "STEP 1 · 海选池",
  ranking: "STEP 2 · 科学预测与投资决策",
  scenario: "STEP 3 · 假设场景与开发方案优化",
  registry: "预测版本记录",
  evidence: "证据与审计"
};

let currentView = "workspace";
let selectedRealCaseId = "HBM4003";
let selectedAssetId = assets[0].id;
let selectedStep2Id = "GUSA-FOCUS";
let step2Section = "prediction";
let step2ResourceProfile = "base";
let step2Lens = "priority";
let selectedDimensionId = "science";
let step3SelectedCandidateId = "GUSA-FOCUS";
let step3Depth = "quick";
let step3ControlMode = "auto";
let selectedStep3ModuleId = "indication";
let selectedStep3ScenarioId = "";
let step3Params = { evidence:72, enrichment:68, execution:61, riskTolerance:52 };
const step3Writebacks = {};
let evidenceFilter = "ALL";
let radarFilter = "ALL";
let registryAsset = "HBM4003";

const root = document.querySelector("#view-root");
const pageTitle = document.querySelector("#page-title");
const methodDialog = document.querySelector("#method-dialog");
const pipeline = document.querySelector(".pipeline");

const statusLabel = (asset) => `<span class="status-pill status-${asset.statusClass}">${asset.status}</span>`;
const confidence = (asset) => `<span class="confidence"><span class="confidence-bar"><i style="width:${asset.confidence}%"></i></span>${asset.confidence}%</span>`;
const tierShort = tier => ({ "第一梯队": "T1", "第二梯队": "T2", "第三梯队": "T3", "淘汰": "停" }[tier] || tier);

function summaryCards() {
  const recoverable = assets.filter(a => a.statusClass === "recoverable").length;
  const evaluate = assets.filter(a => a.statusClass === "evaluate").length;
  return `
    <div class="summary-strip">
      <div class="panel summary-card" style="--card-color:var(--blue)"><span>资产池</span><strong>${assets.length}</strong><small>当前演示样本</small></div>
      <div class="panel summary-card" style="--card-color:var(--teal)"><span>具有挽救潜力</span><strong>${recoverable}</strong><small>可进入深入评估</small></div>
      <div class="panel summary-card" style="--card-color:var(--amber)"><span>需要补充证据</span><strong>${evaluate}</strong><small>触发专项研究</small></div>
      <div class="panel summary-card" style="--card-color:var(--red)"><span>触发硬性否决</span><strong>1</strong><small>建议暂不继续</small></div>
    </div>`;
}

const opportunitySignals = [
  { id:"SIG-001", asset:"Undisclosed asset A", type:"silence", source:"公司管线 / 财报", signal:"连续两个披露周期不再出现", change:"提及频率 -100%", strength:82, confidence:71, action:"进入 STEP 1", why:"更像战略降优先级，而非已经确认的科学失败。" },
  { id:"SIG-002", asset:"Target class B", type:"science", source:"论文 / 人体遗传学", signal:"新增靶点—疾病人体因果支持", change:"证据强度上升", strength:78, confidence:67, action:"建立候选资产宇宙", why:"新证据可能改变既往对同机制资产的判断。" },
  { id:"SIG-003", asset:"Returned-rights asset C", type:"transaction", source:"授权交易 / 公司公告", signal:"合作权利返还原持有人", change:"交易状态变化", strength:74, confidence:83, action:"核查权属与失败原因", why:"权利回流可能创造新的交易窗口，但不代表资产自动可救。" },
  { id:"SIG-004", asset:"Competitor program D", type:"competition", source:"临床试验 / 监管", signal:"同机制竞品因剂量相关安全问题终止", change:"类别风险上升", strength:69, confidence:76, action:"触发同类资产风险复核", why:"需要区分 class effect 与 molecule-specific issue。" },
  { id:"SIG-005", asset:"Paused program E", type:"status", source:"ClinicalTrials.gov", signal:"状态长期停留且终点发生变化", change:"试验状态异常", strength:61, confidence:58, action:"补充公司与监管证据", why:"当前只能形成研究触发器，不能直接判断为失败资产。" }
];

const radarTypes = {
  ALL:"全部信号", silence:"沉默 / 语气", science:"科学证据", transaction:"交易与权利", competition:"竞争变化", status:"试验状态"
};

function renderRadar() {
  const rows = radarFilter === "ALL" ? opportunitySignals : opportunitySignals.filter(item => item.type === radarFilter);
  const high = opportunitySignals.filter(item => item.strength >= 75).length;
  root.innerHTML = `<div class="view-heading radar-heading"><div><p class="eyebrow">STEP 0 · Opportunity Radar</p><h2>先发现变化，再决定哪些资产值得进入海选</h2><p>目标是提高召回率：持续观察公开世界中的新增信息、沉默、语气和状态变化。当前均为结构演示，不代表已接入实时数据。</p></div><span class="draft-badge">演示信号 · 非实时监控</span></div>
    <div class="radar-principle"><div><b>STEP 0 优化 Recall</b><span>尽量不漏掉值得看的机会</span></div><i></i><div><b>STEP 1 优化 Precision</b><span>尽量不把不合格资产送入正式尽调</span></div></div>
    <div class="summary-strip"><div class="panel summary-card" style="--card-color:var(--blue)"><span>监测信号</span><strong>${opportunitySignals.length}</strong><small>当前演示样本</small></div><div class="panel summary-card" style="--card-color:var(--teal)"><span>高强度机会</span><strong>${high}</strong><small>信号强度 ≥75</small></div><div class="panel summary-card" style="--card-color:var(--amber)"><span>数据来源</span><strong>7</strong><small>试验、论文、监管、公司等</small></div><div class="panel summary-card" style="--card-color:var(--red)"><span>直接形成淘汰</span><strong>0</strong><small>弱信号只触发研究</small></div></div>
    <section class="panel radar-workspace"><div class="panel-head"><div><h2>机会信号队列</h2><p>分析“说了什么”，也分析“突然不再说什么”</p></div><div class="radar-filters">${Object.entries(radarTypes).map(([key,label])=>`<button data-radar-filter="${key}" class="${radarFilter===key?"active":""}">${label}</button>`).join("")}</div></div><div class="radar-list">${rows.map(item=>`<article class="radar-card"><div class="radar-score"><strong>${item.strength}</strong><span>信号强度</span></div><div class="radar-main"><div><span class="signal-type signal-${item.type}">${radarTypes[item.type]}</span><small>${item.id} · ${item.source}</small></div><h3>${item.asset}</h3><p>${item.signal}</p><em>${item.change}</em></div><div class="radar-reason"><span>为什么值得看</span><p>${item.why}</p><small>来源置信度 ${item.confidence}%</small></div><div class="radar-action"><span>下一步</span><strong>${item.action}</strong><button data-view="recoverability">打开海选逻辑</button></div></article>`).join("")}</div></section>
    <section class="radar-source-map"><article class="panel"><span>01</span><h3>持续监听</h3><p>试验、论文、监管、公司、交易、遗传学和竞争管线。</p></article><article class="panel"><span>02</span><h3>计算变化</h3><p>新增、消失、语气、频率、状态和相互矛盾的信息。</p></article><article class="panel"><span>03</span><h3>生成触发器</h3><p>信号只决定是否进入研究，不直接决定资产好坏。</p></article><article class="panel"><span>04</span><h3>进入 STEP 1</h3><p>由海选规则判断 Fatal、Unknown、Recoverable 或 Worth Diligence。</p></article></section>`;
  wrapElementInDisclosure(document.querySelector(".radar-workspace"), "查看全部机会信号", "信号只决定是否进入研究，不直接决定资产好坏。", false);
  wrapElementInDisclosure(document.querySelector(".radar-source-map"), "查看机会雷达如何工作", "持续监听 → 计算变化 → 生成触发器 → 进入海选。", false);
  document.querySelectorAll("[data-radar-filter]").forEach(button=>button.addEventListener("click",()=>{radarFilter=button.dataset.radarFilter;renderRadar();}));
  document.querySelectorAll('.radar-action [data-view]').forEach(button=>button.addEventListener("click",()=>switchView(button.dataset.view)));
}

function assetTable(list = assets) {
  if (!list.length) return `<div class="empty-state">没有符合当前条件的资产。</div>`;
  return `<div class="table-wrap"><table class="asset-table">
    <thead><tr><th>排序</th><th>资产 / 靶点</th><th>阶段</th><th>海选结论</th><th>优先分</th><th>置信度</th></tr></thead>
    <tbody>${[...list].sort((a,b) => b.score-a.score).map((a, i) => `
      <tr data-asset="${a.id}" class="${a.id === selectedAssetId ? "selected" : ""}" tabindex="0">
        <td><span class="rank-number">${i+1}</span></td>
        <td><span class="asset-name">${a.name}</span><span class="asset-sub">${a.target} · ${a.id}</span></td>
        <td>${a.stage}</td><td>${statusLabel(a)}</td><td><span class="score">${a.score}</span> / 100</td><td>${confidence(a)}</td>
      </tr>`).join("")}</tbody></table></div>`;
}

function detailPanel(asset) {
  return `<aside class="panel detail-panel">
    <div class="detail-hero">
      <div class="detail-hero-top"><div><p class="eyebrow">当前资产</p><h2>${asset.name}</h2><p>${asset.target} · ${asset.stage} · ${asset.id}</p></div><span class="tier-badge">${tierShort(asset.tier)}</span></div>
    </div>
    <div class="detail-body">
      <div class="metric-grid">
        <div class="metric-card"><span>海选优先分</span><strong>${asset.score}</strong><small>v0.4 演示指数</small></div>
        <div class="metric-card"><span>成功概率</span><strong>${asset.pos}%</strong><small>示例区间中位值</small></div>
        <div class="metric-card"><span>置信度</span><strong>${asset.confidence}%</strong><small>证据确定度</small></div>
      </div>
      <div class="divider"></div>
      <h3>为什么进入当前梯队</h3>
      <ul class="reason-list">${asset.topReasons.map((r,i) => `<li><b>${i+1}</b><span>${r}</span></li>`).join("")}</ul>
      <div class="risk-box"><span>Critical unknown</span><p>${asset.unknown}</p></div>
    </div>
  </aside>`;
}

function getDecisionOverviewState() {
  const ranked = getStep2CandidatePool().map(calculateStep2).sort((a,b) => b.priority-a.priority);
  const top = ranked[0];
  const base = step2Candidates.find(item => item.id === (top.parentId || top.id)) || top;
  const scenarios = getStep3ScenariosForCandidate(base, "deep", defaultStep3Params(base));
  const tags = getScenarioObjectiveTags(scenarios);
  const recommended = scenarios.find(item => (tags[item.id] || []).includes("综合推荐")) || scenarios.filter(item => !item.isBaseline).sort((a,b) => b.balanced-a.balanced)[0];
  const assetRecord = assets.find(item => item.name === top.asset);
  const directEvidence = evidence.filter(item => item.asset === top.asset);
  const supportingEvidence = directEvidence.length ? directEvidence : evidence.filter(item => ["F","P"].includes(item.tag)).slice(0,2);
  return { ranked, top, base, recommended, assetRecord, supportingEvidence, experiment:nextBestExperiment(base,recommended) };
}

function overviewEvidenceItem(label, text, type, meta="") {
  return `<li><span class="evidence-kind kind-${type}">${label}</span><div><strong>${text}</strong>${meta ? `<small>${meta}</small>` : ""}</div></li>`;
}

const journeyQuestions = [
  { no:"01", step:"STEP 0", title:"哪里出现了机会？", answer:"从公开信息中发现新增、沉默、权利变化和异常信号。", output:"输出：研究触发器", view:"radar" },
  { no:"02", step:"STEP 1", title:"这个资产还有没有救？", answer:"区分科学失败、分子缺陷与可以调整的开发问题。", output:"输出：淘汰 / 待补证据 / 可救 / 深入评估", view:"recoverability" },
  { no:"03", step:"STEP 2A", title:"重新开发会不会成功？", answer:"沿着暴露、靶点结合、机制、疗效和安全性形成概率区间。", output:"输出：PoS区间 + 关键未知项", view:"ranking", section:"prediction" },
  { no:"04", step:"STEP 2B", title:"值不值得优先投入？", answer:"把成功概率、价值、时间、成本和资源约束放在一起排序。", output:"输出：资源优先级 + 行动建议", view:"ranking", section:"decision" },
  { no:"05", step:"STEP 3", title:"入选后应该怎么调整？", answer:"比较适应症、人群、剂量、联合和试验设计等候选方案。", output:"输出：调整建议 + 下一最佳实验", view:"scenario" }
];

function disclosure(title, summary, content, open=false, className="") {
  return `<details class="logic-disclosure ${className}" ${open ? "open" : ""}><summary><div><strong>${title}</strong><span>${summary}</span></div><i aria-hidden="true"></i></summary><div class="disclosure-body">${content}</div></details>`;
}

function renderWorkspace() {
  const selected = assets.find(a => a.id === selectedAssetId) || assets[0];
  root.innerHTML = `<section class="clarity-hero panel"><div><p class="eyebrow">一套系统，只回答五个问题</p><h2>把复杂的资产判断，变成一条可以顺着走完的决策路径</h2><p>先看每一步解决什么问题，再按需要展开计算、指标和证据。页面负责让人看懂；底层逻辑仍完整保留。</p><div class="overview-actions"><button data-overview-view="cases" class="primary-button">查看真实案例试跑</button><button data-overview-view="recoverability" class="secondary-button">从海选逻辑开始</button></div></div><aside><span>当前版本</span><strong>方向验证期</strong><p>逻辑已成型，正在用少量真实案例校准规则、权重与建议质量。</p></aside></section>
    <section class="question-journey"><div class="overview-section-head"><div><p class="eyebrow">30秒看懂</p><h2>从发现机会，到提出行动建议</h2></div><span>点击任何一步进入详细页面</span></div><div class="question-journey-grid">${journeyQuestions.map(item=>`<button data-overview-view="${item.view}" ${item.section?`data-step2-section-target="${item.section}"`:""}><span>${item.no}</span><small>${item.step}</small><h3>${item.title}</h3><p>${item.answer}</p><b>${item.output}</b></button>`).join("")}</div><div class="journey-feedback"><b>反馈闭环</b><span>STEP 3 形成的新开发方案会回到 STEP 2A / 2B，重新计算成功概率与资源优先级。</span></div></section>
    <section class="case-entry panel"><div><p class="eyebrow">第一轮真实验证</p><h2>用中国项目与海外历史回测检查这套逻辑</h2><p>两个和铂案例检验当前判断；三个海外案例分别检验安全性重构、试验设计重构和及时停止。</p></div><div class="case-entry-assets">${realCases.slice(0,2).map(item=>`<button data-real-case-entry="${item.id}"><span>中国案例 · ${item.stage}</span><strong>${item.asset}</strong><small>${item.verdict}</small></button>`).join("")}<button data-overview-view="cases"><span>海外回测</span><strong>3 个历史案例</strong><small>可救、重构与淘汰</small></button></div><button data-overview-view="cases" class="primary-button">进入案例试跑</button></section>
    ${disclosure("查看当前演示资产池", "这是计算结构演示，不代表真实资产结论。", `<div class="workspace-grid"><section class="panel"><div class="panel-head"><div><h2>演示资产</h2><p>用于检查交互和计算链是否工作</p></div><div class="filter-row"><input id="asset-search" class="search-box" type="search" placeholder="搜索资产或靶点" aria-label="搜索资产或靶点" /><select id="stage-filter" class="select-box" aria-label="按阶段筛选"><option value="ALL">全部阶段</option><option>Preclinical</option><option>Phase 1</option><option>Phase 2</option></select></div></div><div id="asset-table-root">${assetTable()}</div></section>${detailPanel(selected)}</div>`)}`;
  wireWorkspace();
}

function wireWorkspace() {
  const search = document.querySelector("#asset-search");
  const stage = document.querySelector("#stage-filter");
  const refresh = () => {
    const q = search.value.toLowerCase().trim();
    const filtered = assets.filter(a => (stage.value === "ALL" || a.stage === stage.value) && `${a.name} ${a.target}`.toLowerCase().includes(q));
    document.querySelector("#asset-table-root").innerHTML = assetTable(filtered);
    wireAssetRows();
  };
  if (search && stage) { search.addEventListener("input", refresh); stage.addEventListener("change", refresh); wireAssetRows(); }
  document.querySelectorAll("[data-overview-view]").forEach(button => button.addEventListener("click", () => {
    if (button.dataset.step2SectionTarget) step2Section = button.dataset.step2SectionTarget;
    if (button.dataset.overviewScenario) {
      step3SelectedCandidateId = button.dataset.overviewScenario;
      step3Depth = "quick";
      resetStep3Params();
    }
    switchView(button.dataset.overviewView);
  }));
  document.querySelectorAll("[data-overview-candidate]").forEach(button => button.addEventListener("click", () => {
    selectedStep2Id = button.dataset.overviewCandidate;
    step2Section = "decision";
    switchView("ranking");
  }));
  document.querySelectorAll("[data-real-case-entry]").forEach(button => button.addEventListener("click", () => {
    selectedRealCaseId = button.dataset.realCaseEntry;
    switchView("cases");
  }));
}

function wireAssetRows() {
  document.querySelectorAll("[data-asset]").forEach(row => {
    const select = () => { selectedAssetId = row.dataset.asset; renderWorkspace(); };
    row.addEventListener("click", select);
    row.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") select(); });
  });
}

function renderBacktestTrace(item) {
  const result = item.backtestResult;
  if (!result) return "";
  const rows = result.trace.map(factor => `<div class="factor-trace-row"><div><span>${factor.dimension}</span><strong>${factor.label}</strong><small>${factor.rationale}</small></div><b class="factor-multiplier ${factor.multiplier >= 1 ? "up" : "down"}">×${factor.multiplier.toFixed(2)}</b><em>${factor.before}% → ${factor.after}%</em></div>`).join("");
  return `<div class="backtest-trace-intro"><div><span>模型版本</span><strong>${historicalBacktestModel.version}</strong></div><div><span>计算公式</span><strong>后验赔率 = 阶段先验赔率 × 全部证据乘数</strong></div><div><span>判定规则</span><strong>区间上限低于 ${result.threshold}% 才预测失败</strong></div></div><div class="factor-trace-grid"><div class="factor-trace-row factor-trace-head"><span>证据维度与含义</span><span>修正乘数</span><span>修正前 → 修正后</span></div><div class="factor-trace-row"><div><span>Stage prior</span><strong>${item.backtest.modelInput.stage} 阶段先验</strong><small>第一版规则先验；后续需要用更大历史样本校准。</small></div><b class="factor-multiplier">BASE</b><em>${result.prior}%</em></div>${rows}</div><div class="backtest-trace-result"><span>自动输出</span><strong>${result.point}% · 区间 ${result.low}–${result.high}%</strong><p>${result.predictedLabel}。区间宽度同时考虑证据置信度、缺失项与冲突项。</p></div>`;
}

function renderCaseStudies() {
  const item = realCases.find(entry => entry.id === selectedRealCaseId) || realCases[0];
  const historicalResults = historicalCases.map(entry => entry.backtestResult);
  const backtestHits = historicalResults.filter(result => result.hit).length;
  const isBacktest = Boolean(item.backtestResult);
  root.innerHTML = `<div class="view-heading case-heading"><div><p class="eyebrow">Real-world pilot · 公开信息试跑</p><h2>不是展示资料，而是让真实案例走完整条决策逻辑</h2><p>和铂案例用于面向未来的预测；三个海外案例先冻结历史证据，再由同一套规则自动计算，最后才揭示真实结果。</p></div><span class="draft-badge">证据截止 ${item.evidenceCutoff}</span></div>
    <section class="backtest-scorecard panel"><div><span>历史回测</span><strong>${backtestHits} / ${historicalResults.length} 命中</strong><small>Fitusiran、Etripamil、Verubecestat</small></div><div><span>统一判定门槛</span><strong>区间上限 &lt; ${historicalBacktestModel.threshold}% = 预测失败</strong><small>实际失败案例落在门槛下方即计为命中</small></div><p>这是流程验证，不是模型已被证明：样本只有3个，先验与证据乘数仍需用更多历史案例盲法校准。</p></section>
    <div class="case-switcher" role="tablist" aria-label="选择真实案例">${realCases.map(entry=>`<button role="tab" data-real-case="${entry.id}" aria-selected="${entry.id===item.id}" class="${entry.id===item.id?"active":""}"><span>${entry.stage}</span><strong>${entry.asset}</strong><small>${entry.target}</small></button>`).join("")}</div>
    <section class="case-verdict panel"><div class="case-identity"><span class="fact-label">公开事实</span><h2>${item.asset}</h2><p>${item.modality} · ${item.target} · ${item.stage}</p><small>当前公开方向：${item.currentUse}<br>${item.rights}</small></div><div class="case-main-verdict"><span>${isBacktest ? "历史时点系统判断" : "系统当前判断"}</span><strong class="case-status status-${item.verdictClass}">${item.verdict}</strong><p>${item.recommendation}</p></div><div class="case-probability"><span>${isBacktest ? "自动回测区间" : "研究性预测区间"}</span><strong>${item.probability}</strong><small>${item.probabilityLabel}</small><i><b style="width:${item.confidence}%"></b></i><em>证据置信度 ${item.confidence}%${isBacktest ? ` · 点估计 ${item.backtestResult.point}%` : ""}</em></div></section>
    ${item.backtest ? `<section class="case-backtest panel"><div><span>模型可见信息截止</span><strong>${item.evidenceCutoff}</strong></div><div><span>自动预测 · 未读取结果</span><strong>${item.backtestResult.point}% · ${item.probability}</strong><p>${item.backtestResult.predictedLabel}</p></div><div><span>后来真实结果 · 不进入初始预测</span><strong>${item.backtest.outcomeDate} · ${item.backtest.actualLabel}</strong><p>${item.backtest.outcome}</p></div><div class="${item.backtestResult.hit ? "backtest-hit" : "backtest-miss"}"><span>回测判定</span><strong>${item.backtestResult.hit ? "命中" : "未命中"}</strong><p>${item.backtestResult.predictedSuccess ? "预测保留成功可能" : "预测失败"}</p></div></section>${disclosure("查看自动计算过程", `阶段先验 ${item.backtestResult.prior}% → 点估计 ${item.backtestResult.point}% → 区间 ${item.probability}`, renderBacktestTrace(item))}` : ""}
    <section class="case-question panel"><span>这个案例真正要回答的问题</span><h2>${item.question}</h2><p>系统不会把“有信号”直接等同于“会成功”，而是继续寻找可以改变结论的开发变量。</p></section>
    <section class="case-path"><div class="overview-section-head"><div><p class="eyebrow">案例如何走过系统</p><h2>先判断资格，再提出调整</h2></div><span>点击展开每一步依据</span></div>
      ${disclosure("STEP 1 · 这个资产还有没有继续研究的资格？", item.step1Summary || `${item.verdict}：没有发现足以直接判定为科学死亡的公开证据。`, `<div class="case-two-column"><article><span class="fact-label">关键支持证据</span><ul>${item.knownFacts.map(fact=>`<li>${fact}</li>`).join("")}</ul></article><article><span class="risk-label">反对证据与限制</span><ul>${item.risks.map(risk=>`<li>${risk}</li>`).join("")}</ul></article></div>`, true)}
      ${disclosure("STEP 2A · 重新开发成功的可能性有多大？", `${item.probability}，置信度${item.confidence}%；这是下一阶段里程碑概率，不是最终上市概率。`, `<div class="case-calculation"><div><span>阶段先验</span><p>按${item.stage}和相应适应症设定基础区间。</p></div><i></i><div><span>证据修正</span><p>人体疗效、安全、机制一致性与样本质量向上或向下修正。</p></div><i></i><div><span>不确定性收缩</span><p>样本量、对照、缺失和冲突决定区间宽度与置信度。</p></div></div><div class="formula-note"><strong>当前输出</strong><span>${item.probabilityLabel}：${item.probability}。${isBacktest ? `本案例由 ${historicalBacktestModel.version} 自动计算；可在上方展开查看每一项修正。` : "面向未来的数值仍是研究性预测，需要在结果公布后回测。"}</span></div>`)}
      ${disclosure("STEP 3 · 项目应该怎么调整？", item.recommendation, `<div class="adjustment-table"><div class="adjustment-head"><span>调整杠杆</span><span>建议</span><span>模拟影响</span><span>为什么</span></div>${item.adjustments.map(row=>`<div><b>${row.lever}</b><p>${row.action}</p><strong>${row.impact}</strong><small>${row.reason}</small></div>`).join("")}</div><div class="next-action case-next"><span>下一最佳实验</span><strong>${item.nextExperiment}</strong><small>停止规则 · ${item.stopRule}</small></div>`, true)}
      ${disclosure("证据来源与边界", "每个事实回到公开来源；推断和模拟不得伪装成事实。", `<div class="source-link-list">${item.sources.map(source=>`<a href="${source.url}" target="_blank" rel="noreferrer"><span>${source.tier}</span><strong>${source.title}</strong><small>打开原始来源</small></a>`).join("")}</div><div class="evidence-boundary"><div><span class="fact-label">事实</span><p>来源中明确披露的人群、结果、阶段与权利信息。</p></div><div><span class="model-label">模型推断</span><p>海选结论、成功概率区间与证据置信度。</p></div><div><span class="scenario-label">情景建议</span><p>适应症、人群和试验调整，以及模拟概率变化。</p></div></div>`)}
    </section>
    <section class="case-footer panel"><div><p class="eyebrow">继续检查</p><h2>把案例带入同一套预测与场景计算</h2><p>查看它如何进入PoS因果链、场景重构和下一最佳实验。</p></div><button data-case-action="prediction" class="secondary-button">打开STEP 2A预测</button><button data-case-action="scenario" class="primary-button">打开STEP 3调整</button></section>`;
  document.querySelectorAll("[data-real-case]").forEach(button=>button.addEventListener("click",()=>{selectedRealCaseId=button.dataset.realCase;renderCaseStudies();}));
  document.querySelectorAll("[data-case-view]").forEach(button=>button.addEventListener("click",()=>switchView(button.dataset.caseView)));
  document.querySelectorAll("[data-case-action]").forEach(button=>button.addEventListener("click",()=>{
    selectedStep2Id = item.candidateId;
    if (button.dataset.caseAction === "prediction") { step2Section = "prediction"; switchView("ranking"); return; }
    step3SelectedCandidateId = item.candidateId;
    step3Depth = "quick";
    resetStep3Params();
    switchView("scenario");
  }));
}

const hardGateDefinitions = {
  target: { label: "Target / MoA 被高质量人体证据否定", type: "science" },
  safety: { label: "不可规避的机制性安全风险", type: "science" },
  exposure: { label: "无法达到有效暴露且没有修复路径", type: "science" },
  molecule: { label: "分子级不可逆缺陷", type: "science" },
  cmc: { label: "CMC / 制造问题当前没有可行解决路径", type: "execution" },
  ip: { label: "知识产权保护不足或不可建立", type: "execution" },
  rights: { label: "权利不可获得或交易路径关闭", type: "execution" }
};

const failureLabels = {
  biology: "基础生物学", efficacy: "疗效", safety: "安全性", pkpd: "药代 / 药效",
  dose: "剂量选择", patient: "患者选择", trial: "试验设计",
  operational: "运营执行", commercial: "商业因素", strategic: "战略 / 资金"
};

const rescueLabels = {
  indication: "适应症", population: "患者 / biomarker", dose: "剂量", schedule: "给药周期",
  formulation: "剂型", route: "给药途径", combination: "联合 / 序贯", endpoint: "终点",
  treatmentLine: "治疗线次", trial: "试验设计", regional: "地区 / 注册路径", ownership: "权利 / 交易结构"
};

const screeningOutcomes = [
  { key: "dead", title: "建议淘汰", rule: "高置信度、不可逆的科学问题", action: "专家确认后停止" },
  { key: "blocked", title: "执行受阻", rule: "权利、IP、CMC 或交易路径受阻", action: "保留科学潜力，先解障碍" },
  { key: "unknown", title: "证据不足", rule: "信息缺失、冲突或不可追溯", action: "补充决定性证据" },
  { key: "low", title: "潜力较低", rule: "无致命问题，但继续研究理由较弱", action: "归档或持续观察" },
  { key: "pass", title: "通过海选", rule: "具有挽救潜力或值得深入评估", action: "进入 STEP 2 排序" }
];

const weightedScore = (definitions, values) => Math.round(definitions.reduce((sum, [key,,weight]) => sum + (values[key] ?? 50) * weight, 0));

function calculateStep1(state = step1State) {
  const eligibilityValues = Object.values(state.eligibility);
  const eligible = state.eligibility.identity && state.eligibility.evidence && state.eligibility.traceability;
  const eligibilityRate = eligibilityValues.filter(Boolean).length / eligibilityValues.length;
  const hardKeys = Object.keys(state.hard).filter(key => state.hard[key]);
  const scienceHardKeys = hardKeys.filter(key => hardGateDefinitions[key].type === "science");
  const executionHardKeys = hardKeys.filter(key => hardGateDefinitions[key].type === "execution");
  const confirmedScienceGate = scienceHardKeys.length > 0 && state.hardConfidence >= 75;
  const confirmedExecutionGate = executionHardKeys.length > 0 && state.hardConfidence >= 75;
  const possibleHardGate = hardKeys.length > 0 && state.hardConfidence < 75;
  const biology = weightedScore(driverDefinitions.biology, state.drivers.biology);
  const molecule = weightedScore(driverDefinitions.molecule, state.drivers.molecule);
  const redesign = weightedScore(driverDefinitions.redesign, state.drivers.redesign);
  const { evidence, actionability, information, valueInflection } = state.scores;
  const raw = Math.pow(Math.max(1, biology), .4) * Math.pow(Math.max(1, molecule), .3) * Math.pow(Math.max(1, redesign), .3);
  const adjusted = Math.max(0, Math.min(100, Math.round(50 + (raw - 50) * (evidence / 100) - (possibleHardGate ? 8 : 0))));
  const failureTotal = Math.max(1, Object.values(state.failure).reduce((sum, value) => sum + value, 0));
  const failureMix = Object.fromEntries(Object.entries(state.failure).map(([key, value]) => [key, Math.round(value / failureTotal * 100)]));
  const reversibleKeys = ["dose", "patient", "trial", "operational", "commercial", "strategic"];
  const reversibleShare = reversibleKeys.reduce((sum,key) => sum + state.failure[key], 0) / failureTotal;
  const primaryFailure = Object.entries(state.failure).sort((a,b) => b[1] - a[1])[0][0];
  const stageFloor = state.stage === "Preclinical" ? 35 : state.stage === "Phase 1" ? 50 : state.stage === "Phase 2" ? 60 : 55;
  const stageAdequacy = Math.min(100, Math.round(evidence / stageFloor * 100));
  const completeness = Math.round((eligibilityRate * .35 + (state.rescue.length ? .15 : 0) + .25 + Math.min(1,evidence/60) * .25) * 100);
  const confidence = Math.round(evidence * .6 + completeness * .25 + stageAdequacy * .15);
  const rightsScore = state.eligibility.rights ? 100 : 25;
  const priorityBase = Math.round(biology*.25 + molecule*.20 + state.drivers.biology.human*.20 + redesign*.15 + valueInflection*.10 + ((actionability+rightsScore)/2)*.05 + completeness*.05);
  const priority = confirmedScienceGate ? Math.min(25, priorityBase) : priorityBase;
  let classification, decision, classKey;

  if (!state.eligibility.identity) {
    classification = "不具备海选条件"; decision = "先确认资产身份与基础信息"; classKey = "noteligible";
  } else if (confirmedScienceGate) {
    classification = "建议淘汰"; decision = "必须经专家确认后才能正式淘汰"; classKey = "dead";
  } else if (!state.eligibility.evidence || !state.eligibility.traceability || evidence < 35) {
    classification = "证据不足"; decision = information >= 55 ? "暂缓 · 补充决定性证据" : "归档 · 信息增益较低"; classKey = "unknown";
  } else if (confirmedExecutionGate || !state.eligibility.rights) {
    classification = "执行受阻"; decision = "科学潜力保留 · 先解决执行障碍"; classKey = "blocked";
  } else if (adjusted >= 68 && evidence >= Math.min(55, stageFloor)) {
    classification = "值得深入评估"; decision = "通过海选，进入聚焦尽调"; classKey = "evaluate";
  } else if (redesign >= 60 && reversibleShare >= .50 && state.rescue.length > 0) {
    classification = "具有挽救潜力"; decision = "形成并验证挽救假设"; classKey = "recoverable";
  } else {
    classification = "潜力较低"; decision = information >= 65 ? "只安排一项关键研究" : "归档 / 持续观察"; classKey = "low";
  }

  const rules = [
    { id: "SCP-001", status: "pass", text: `全范围纳入：${state.stage} · ${state.modality} · ${state.status}` },
    { id: "ELG-001", status: eligible ? "pass" : "flag", text: eligible ? "资产身份、最低证据和来源可追溯性满足" : "基础信息存在缺口" },
    ...hardKeys.map(key => ({ id: `HG-${key.toUpperCase()}-001`, status: state.hardConfidence >= 75 ? (hardGateDefinitions[key].type === "science" ? "stop" : "flag") : "review", text: `${hardGateDefinitions[key].label} · ${hardGateDefinitions[key].type === "science" ? "科学 Gate" : "执行 Gate"} · 待专家讨论` })),
    { id: "CONF-STAGE-001", status: stageAdequacy >= 80 ? "pass" : "review", text: `${state.stage} 阶段适配证据充足度 ${stageAdequacy}%` },
    { id: "REC-DEV-001", status: reversibleShare >= .50 && state.rescue.length ? "pass" : "neutral", text: `可逆失败占比 ${Math.round(reversibleShare*100)}% · ${state.rescue.length} 个系统建议救援变量` },
    { id: "PRI-001", status: priority >= 65 ? "pass" : "review", text: `海选后初步优先分 ${priority}；不替代 STEP 2 风险调整价值排序` }
  ];

  const support = [];
  if (biology >= 60) support.push("Target / MoA 综合证据仍然成立");
  if (molecule >= 60) support.push("分子属性未显示决定性缺陷");
  if (redesign >= 60 && state.rescue.length) support.push("存在可验证的开发重构变量");
  if (reversibleShare >= .50) support.push("主要失败信号偏向可调整因素");
  const conflict = hardKeys.map(key => hardGateDefinitions[key].label);
  if (state.failure.biology >= 45 && biology >= 65) conflict.push("生物学成立程度与失败归因存在冲突");
  const missing = [];
  if (evidence < stageFloor) missing.push(`当前证据低于 ${state.stage} 建议充足度`);
  if (!state.eligibility.rights) missing.push("权利或交易可获得性未确认");
  if (!state.eligibility.traceability) missing.push("部分事实缺少可追溯来源");
  if (!state.rescue.length) missing.push("尚未形成可验证的挽救假设");

  let nextAction = "补充最可能改变当前分类的一项关键证据";
  if (hardKeys.length) nextAction = `优先核实：${hardGateDefinitions[hardKeys[0]].label}`;
  else if (evidence < 35) nextAction = state.stage === "Preclinical" ? "补充强转化或同类验证证据" : "获取一项能够提高人体证据确定度的数据";
  else if (["patient","dose","trial"].includes(primaryFailure)) nextAction = "完成 biomarker、dose-response 与试验设计回顾";
  else if (["strategic","commercial","operational"].includes(primaryFailure)) nextAction = "确认权利状态、交易意愿及开发执行条件";
  else if (["safety","pkpd"].includes(primaryFailure)) nextAction = "验证有效暴露、安全窗及分子特异性风险";
  else if (["biology","efficacy"].includes(primaryFailure)) nextAction = "用人体或强转化证据重新验证 Target / MoA 因果链";

  const stopRule = confirmedScienceGate
    ? "专家确认该不可逆科学问题后停止进一步投入。"
    : state.rescue.length
      ? `若 ${rescueLabels[state.rescue[0]]} 无法改善核心失败指标，则停止当前救援路径。`
      : "若下一项研究不能显著提高证据确定度，则转入 Archive。";

  return { eligible, hardKeys, scienceHardKeys, executionHardKeys, confirmedScienceGate, confirmedExecutionGate, possibleHardGate, biology, molecule, redesign, raw: Math.round(raw), adjusted, priority, failureMix, reversibleShare, primaryFailure, confidence, completeness, stageAdequacy, classification, decision, classKey, rules, support, conflict, missing, nextAction, stopRule, actionability, information };
}

function step1Slider(group, key, label, value, note = "", nested = "") {
  const disabled = step1Mode === "auto" ? "disabled" : "";
  const nestedAttr = nested ? ` data-step1-nested="${nested}"` : "";
  const id = `${group}-${nested ? `${nested}-` : ""}${key}`;
  return `<div class="assessment-slider"><label for="${id}"><span>${label}${note ? `<small>${note}</small>` : ""}</span><output id="${id}-output">${value}</output></label><input id="${id}" data-step1-group="${group}" data-step1-key="${key}"${nestedAttr} type="range" min="0" max="100" value="${value}" ${disabled}/></div>`;
}

function driverGroupHTML(group, title, score) {
  return `<details class="driver-group" ${group === "biology" ? "open" : ""}><summary><span>${title}<small>${driverDefinitions[group].length} 个底层指标 · 加权计算</small></span><strong>${score}</strong></summary><div class="driver-grid">${driverDefinitions[group].map(([key,label,weight]) => step1Slider("drivers",key,label,step1State.drivers[group][key],`权重 ${Math.round(weight*100)}%`,group)).join("")}</div></details>`;
}

function step1ResultHTML(result) {
  const classificationNote = {
    dead: "高置信度不可逆科学缺陷", blocked: "科学潜力与执行可行性分开记录", evaluate: "当前证据支持进入正式尽调",
    recoverable: "存在明确但尚待验证的救援路径", low: "没有足够强的继续研究理由",
    unknown: "不知道不等于潜力低", noteligible: "资产身份尚未满足基础条件"
  }[result.classKey];
  const evidenceList = (title, items, kind) => `<div class="evidence-stack"><div class="evidence-stack-title"><span class="evidence-dot ${kind}"></span>${title}<b>${items.length}</b></div>${items.length ? items.map(item => `<p>${item}</p>`).join("") : `<p class="muted-line">当前没有记录</p>`}</div>`;
  const failureRows = Object.entries(result.failureMix).sort((a,b)=>b[1]-a[1]).slice(0,6);
  return `<div class="decision-header decision-${result.classKey}"><p class="eyebrow">STEP 1 海选结论 · ${step1Mode === "auto" ? "系统自动" : "情景模拟"}</p><span class="decision-badge">${result.classification}</span><h2>${result.decision}</h2><p>${classificationNote}</p></div>
    <div class="decision-score-row"><div class="score-ring" style="--score:${result.adjusted * 3.6}deg"><strong>${result.adjusted}</strong><span>可救性</span></div><div class="decision-kpis"><div><span>海选优先分</span><strong>${result.priority}</strong></div><div><span>结论置信度</span><strong>${result.confidence}%</strong></div><div><span>执行可行性</span><strong>${result.actionability}</strong></div><div><span>阶段证据适配度</span><strong>${result.stageAdequacy}%</strong></div></div></div>
    <div class="formula-note"><strong>计算方法</strong><span>可救性 = 生物学<sup>.4</sup> × 分子<sup>.3</sup> × 重构空间<sup>.3</sup>，并按证据置信度收缩。海选优先分采用 25/20/20/15/10/5/5 权重；硬性否决条件先于评分执行。</span></div>
    <div class="decision-section"><div class="section-title"><h3>计算维度</h3><span>由底层事实计算</span></div><div class="derived-strip"><div><span>生物学成立程度</span><b>${result.biology}</b></div><div><span>分子可救性</span><b>${result.molecule}</b></div><div><span>开发重构空间</span><b>${result.redesign}</b></div></div></div>
    <div class="decision-section"><div class="section-title"><h3>失败原因归因</h3><span>显示前 6 项</span></div>${failureRows.map(([key,value]) => `<div class="failure-bar"><span>${failureLabels[key]}</span><i><b style="width:${value}%"></b></i><strong>${value}%</strong></div>`).join("")}</div>
    <div class="decision-section"><div class="section-title"><h3>规则触发记录</h3><span>模型 v0.4</span></div><div class="rule-trace">${result.rules.map(rule => `<div class="rule-row"><span class="rule-state ${rule.status}"></span><b>${rule.id}</b><p>${rule.text}</p></div>`).join("")}</div></div>
    <div class="decision-section evidence-triad">${evidenceList("支持证据", result.support, "support")}${evidenceList("冲突证据", result.conflict, "conflict")}${evidenceList("缺失信息", result.missing, "missing")}</div>
    <div class="next-action"><span>最优先补充研究</span><strong>${result.nextAction}</strong><small>停止规则 · ${result.stopRule}</small></div>
    <div class="human-review"><span>人工复核</span><strong>${result.hardKeys.length ? "必须" : "建议"}</strong><p>所有硬性否决条件均为候选规则，定义待专家讨论；建议淘汰和任何人工改判都必须保留审核记录。</p></div>`;
}

function renderRecoverability() {
  const result = calculateStep1();
  const disabled = step1Mode === "auto" ? "disabled" : "";
  const origin = step1Mode === "auto" ? "系统自动判断" : "专家复核 / 情景模拟输入";
  root.innerHTML = `<div class="view-heading step1-heading"><div><h2>STEP 1 · 海选池</h2><p>判断资产是否存在再次研发的合理可能性。全阶段、全领域、全类型、全状态纳入；系统先形成自动判断，人工模式只用于复核、纠正和情景模拟。</p></div></div>
    <div class="step1-toolbar panel"><div class="scope-chip"><b>全范围海选</b><span>临床前 → 临床 · 不限治疗领域 · 不限分子类型 · 不限资产状态</span></div><div class="mode-switch" aria-label="评估模式"><button data-step1-mode="auto" class="${step1Mode === "auto" ? "active" : ""}">系统自动评估</button><button data-step1-mode="expert" class="${step1Mode === "expert" ? "active" : ""}">专家复核 / 情景模拟</button></div><label class="preset-picker"><span>载入演示资产</span><select id="step1-preset" class="select-box">${Object.entries(step1Presets).map(([key,preset]) => `<option value="${key}" ${key===step1PresetKey?"selected":""}>${preset.label}</option>`).join("")}</select></label></div>
    <div class="automation-banner ${step1Mode}"><div><b>${origin}</b><span>${step1Mode === "auto" ? "左侧数值由资产事实库、来源证据和规则引擎自动生成；切换到人工模式后才可调整。" : "当前修改只生成模拟结论，不会覆盖系统事实或原始评估。"}</span></div><div class="source-summary"><span>${step1State.sourceSummary.facts} 条事实</span><span>${step1State.sourceSummary.sourceTypes} 类来源</span><span>${step1State.sourceSummary.unresolved} 项待确认</span></div></div>
    <section class="screening-policy"><div class="screening-policy-head"><div><p class="eyebrow">海选决策原则</p><h2>五种去向，不把“未知”误判为“没救”</h2></div><span>候选规则 · 待专家校准</span></div><div class="screening-policy-grid">${screeningOutcomes.map(item => `<article class="policy-${item.key}"><b>${item.title}</b><p>${item.rule}</p><small>${item.action}</small></article>`).join("")}</div></section>
    <div class="step1-layout"><div class="assessment-builder">
      <section class="panel assessment-section"><div class="assessment-section-head"><span class="section-number">1A</span><div><h2>基础准入检查</h2><p>范围不设限；这里只检查资产身份、最低证据和来源可追溯性。权利问题影响执行，不等同科学失败。</p></div><span class="live-engine">${step1Mode === "auto" ? "自动" : "模拟"}</span></div><div class="eligibility-grid">${[["identity","资产身份与别名已确认"],["evidence","存在最低限度可分析证据"],["traceability","关键事实可追溯到来源"],["rights","权利或交易可能性存在"]].map(([key,label]) => `<label class="check-card"><input data-step1-eligibility="${key}" type="checkbox" ${step1State.eligibility[key]?"checked":""} ${disabled}/><span><b>${label}</b><small>${key === "rights" ? "执行变量 · 不等同科学失败" : "系统自动生成的准入规则"}</small></span></label>`).join("")}</div></section>
      <section class="panel assessment-section"><div class="assessment-section-head"><span class="section-number">1B</span><div><h2>候选硬性否决条件</h2><p>科学问题与执行障碍分开；所有定义暂标记为“待专家讨论”，自动结果不能替代专家确认。</p></div><span class="pending-badge">待讨论</span></div><div class="hard-gate-list">${Object.entries(hardGateDefinitions).map(([key,item]) => `<label class="hard-gate-row"><input data-step1-hard="${key}" type="checkbox" ${step1State.hard[key]?"checked":""} ${disabled}/><span><b>${item.label}</b><small>HG-${key.toUpperCase()}-001 · ${item.type === "science" ? "科学否决条件" : "执行障碍"}</small></span><em>${step1State.hard[key]?"已触发":"未触发"}</em></label>`).join("")}</div><div class="confidence-control">${step1Slider("hard","confidence","硬性否决证据置信度",step1State.hardConfidence,"≥75 仅允许提出淘汰建议，仍需专家确认")}</div></section>
      <section class="panel assessment-section"><div class="assessment-section-head"><span class="section-number">1C</span><div><h2>失败原因诊断</h2><p>系统区分公开停止原因与推断的根本原因，并对十类失败信号做相对归因。</p></div></div><div class="failure-grid">${Object.entries(failureLabels).map(([key,label]) => step1Slider("failure",key,label,step1State.failure[key])).join("")}</div><p class="method-note">公开状态可以是暂停、降低优先级、终止、战略变化或资金限制；它只是观察事实，不直接等于科学失败。</p></section>
      <section class="panel assessment-section"><div class="assessment-section-head"><span class="section-number">1D</span><div><h2>自下而上的可救性评估</h2><p>不再手动填写三个总分；生物学、分子和开发重构空间均由底层指标加权计算。缺失数据降低置信度，不自动记为零。</p></div></div><div class="driver-groups">${driverGroupHTML("biology","生物学成立程度",result.biology)}${driverGroupHTML("molecule","分子可救性",result.molecule)}${driverGroupHTML("redesign","开发重构空间",result.redesign)}</div><div class="context-score-grid">${step1Slider("scores","evidence","证据置信度",step1State.scores.evidence,"按阶段适配")}${step1Slider("scores","actionability","执行可行性",step1State.scores.actionability,"科学潜力之外")}${step1Slider("scores","information","信息价值",step1State.scores.information,"下一项研究能否改变决策")}${step1Slider("scores","valueInflection","到达下一价值拐点的可行性",step1State.scores.valueInflection,"时间、成本与路径")}</div></section>
      <section class="panel assessment-section"><div class="assessment-section-head"><span class="section-number">1E</span><div><h2>系统提出的挽救假设</h2><p>默认由系统根据失败归因和底层指标提出；专家模式可以增删，用于情景模拟。每条路径必须附带验证指标和停止规则。</p></div></div><div class="rescue-grid">${Object.entries(rescueLabels).map(([key,label]) => `<label class="rescue-chip"><input data-step1-rescue="${key}" type="checkbox" ${step1State.rescue.includes(key)?"checked":""} ${disabled}/><span>${label}</span></label>`).join("")}</div></section>
    </div><aside id="step1-result" class="panel decision-console">${step1ResultHTML(result)}</aside></div>`;
  simplifyStep1Layout();
  wireStep1Engine();
}

function wrapElementInDisclosure(element, title, summary, open=false) {
  if (!element?.parentNode || element.closest(".logic-disclosure")) return;
  const details = document.createElement("details");
  details.className = "logic-disclosure";
  details.open = open;
  const summaryNode = document.createElement("summary");
  summaryNode.innerHTML = `<div><strong>${title}</strong><span>${summary}</span></div><i aria-hidden="true"></i>`;
  const body = document.createElement("div");
  body.className = "disclosure-body";
  element.parentNode.insertBefore(details, element);
  details.append(summaryNode, body);
  body.appendChild(element);
}

function simplifyStep1Layout() {
  const layout = document.querySelector(".step1-layout");
  const result = document.querySelector("#step1-result");
  if (layout && result) {
    layout.parentNode.insertBefore(result, layout);
    result.classList.add("primary-result");
    layout.classList.add("result-first");
  }
  const policy = document.querySelector(".screening-policy");
  wrapElementInDisclosure(policy, "海选会产生哪五种去向？", "先区分淘汰、执行受阻、证据不足、潜力较低和通过海选。", false);
  document.querySelectorAll(".assessment-builder > .assessment-section").forEach((section,index)=>{
    const title = section.querySelector("h2")?.textContent || `判断层 ${index+1}`;
    const note = section.querySelector("p")?.textContent || "展开查看详细规则与输入。";
    wrapElementInDisclosure(section, `${["1A","1B","1C","1D","1E"][index]} · ${title}`, note, false);
  });
}

function updateStep1Result() {
  const target = document.querySelector("#step1-result");
  if (target) target.innerHTML = step1ResultHTML(calculateStep1());
}

function wireStep1Engine() {
  document.querySelector("#step1-preset").addEventListener("change", event => { step1PresetKey = event.target.value; step1State = cloneStep1(step1Presets[step1PresetKey]); renderRecoverability(); });
  document.querySelectorAll("[data-step1-mode]").forEach(button => button.addEventListener("click", () => {
    step1Mode = button.dataset.step1Mode;
    if (step1Mode === "auto") step1State = cloneStep1(step1Presets[step1PresetKey]);
    renderRecoverability();
  }));
  document.querySelectorAll("[data-step1-eligibility]").forEach(input => input.addEventListener("change", () => { step1State.eligibility[input.dataset.step1Eligibility] = input.checked; updateStep1Result(); }));
  document.querySelectorAll("[data-step1-hard]").forEach(input => input.addEventListener("change", () => { step1State.hard[input.dataset.step1Hard] = input.checked; renderRecoverability(); }));
  document.querySelectorAll("[data-step1-rescue]").forEach(input => input.addEventListener("change", () => {
    const key = input.dataset.step1Rescue;
    step1State.rescue = input.checked ? [...new Set([...step1State.rescue,key])] : step1State.rescue.filter(item => item !== key);
    updateStep1Result();
  }));
  document.querySelectorAll("[data-step1-group]").forEach(input => input.addEventListener("input", () => {
    const group = input.dataset.step1Group, key = input.dataset.step1Key, nested = input.dataset.step1Nested, value = +input.value;
    if (group === "hard") step1State.hardConfidence = value;
    else if (group === "drivers") step1State.drivers[nested][key] = value;
    else step1State[group][key] = value;
    document.querySelector(`#${input.id}-output`).value = value;
    updateStep1Result();
  }));
}

const parseStep2Metrics = value => value.trim().split("\n").map(row => {
  const [name, logic, core, origin, status] = row.split("|");
  return { name, logic, core, origin, status };
});

const step2Dimensions = [
  { id: "science", number: 1, name: "科学与机制可信度", question: "科学基础是否成立，证据链是否收敛？", metrics: parseStep2Metrics(`
靶点验证|规则 + 模型|PoS|[F][I][E]|结构确认 / 拟议
人类遗传学|规则 + 直接计算 + 模型|PoS / 安全信号|[F]|结构确认
机制合理性|规则 + 专家判断|PoS|[F][I]|结构确认
转化证据|规则 + 直接计算|PoS|[F][I][E]|结构确认 / 拟议
同类临床先例|直接计算 + 规则|PoS / 类别风险|[F][I][E]|结构确认 / 拟议
证据收敛度|规则 + 模型|不确定性|[E]|拟议`) },
  { id: "asset", number: 2, name: "分子与产品质量", question: "具体分子是否足够好并具备差异化？", metrics: parseStep2Metrics(`
活性与选择性|直接计算|PoS|[I][E]|行业方法 / 拟议
PK 特征|直接计算 + 规则|PoS / 时间|[F][I][E]|结构确认 / 拟议
PD / 靶点结合|直接计算 + 模型|PoS|[F][I][E]|结构确认 / 拟议
暴露覆盖|直接计算|PoS|[E][I]|拟议
安全窗|直接计算 + 规则|PoS / Gate|[F][I][E]|结构确认 / 拟议
组织 / CNS 穿透|直接计算 + 规则|PoS|[C][F][I]|案例反推 / 结构确认
剂型或特殊属性优势|规则 + 模型|价值 / PoS|[C][E]|案例反推 / 拟议
同类差异化|直接计算 + 规则|价值|[F][I][E]|结构确认 / 拟议`) },
  { id: "clinical", number: 3, name: "临床证据与成功概率", question: "现有人体证据支持到什么程度？", metrics: parseStep2Metrics(`
开发阶段|规则|PoS|[F]|结构确认
疗效信号|直接计算|PoS|[F][I]|结构确认
剂量 / 暴露反应|直接计算 + 模型|PoS|[F][I]|结构确认
生物标志物反应|直接计算 + 规则|PoS|[F][I][E]|结构确认 / 拟议
持续性与一致性|直接计算 + 规则|PoS|[F][I]|结构确认
安全性与耐受性|直接计算 + 规则|PoS / Gate|[F][I]|结构确认
主要终点 PoS|预测模型|PoS / 区间|[F]|结构确认
因果链 PoTS|预测模型|PoS / 节点概率|[F]|结构确认`) },
  { id: "market", number: 4, name: "未来市场与竞争价值", question: "预计上市时还有多大可获得价值？", metrics: parseStep2Metrics(`
未来患者规模|直接计算 + 预测|价值|[I][E]|行业方法 / 拟议
未满足需求|规则 + 直接计算|价值|[I][E]|拟议
未来标准治疗|预测模型|价值 / 时间|[F][E]|结构确认 / 拟议
竞争密度|直接计算 + 模型|价值|[F][E]|结构确认 / 拟议
Pareto 前沿|直接计算 + 模型|价值|[F]|结构确认
上市时预期差异化|预测模型|价值|[E]|拟议
价格与渗透率|预测模型|价值|[I][E]|行业方法 / 拟议
峰值销售|直接计算 + 预测|价值|[I][E]|行业方法 / 拟议
市场时机|直接计算 + 预测|价值 / 时间|[F][I][E]|结构确认 / 拟议`) },
  { id: "development", number: 5, name: "开发可行性", question: "理论价值能否在现实约束下实现？", metrics: parseStep2Metrics(`
入组可行性|直接计算 + 预测|时间 / 成本|[F][I][E]|结构确认 / 拟议
患者可获得性|直接计算 + 预测|时间|[F][I][E]|结构确认 / 拟议
中心与地区|直接计算 + 规则|时间 / 成本|[F][I][E]|结构确认 / 拟议
终点可行性|规则|PoS / 时间|[F][I]|结构确认
试验复杂度|规则 + 直接计算|时间 / 成本|[I][E]|拟议
监管路径|规则 + 专家判断|时间 / PoS|[F][I]|结构确认
开发时间线|直接计算 + 预测|时间|[F][I][E]|结构确认 / 拟议
开发成本|直接计算 + 预测|成本|[F][I][E]|结构确认 / 拟议`) },
  { id: "sustainability", number: 6, name: "CMC / IP / 商业寿命", question: "能否制造、合法商业化并保有价值窗口？", metrics: parseStep2Metrics(`
生产成熟度|规则|Gate / 成本|[I][E]|行业方法 / 拟议
放大、收率与稳健性|直接计算 + 规则|成本 / Gate|[I][E]|行业方法 / 拟议
稳定性与供应链|直接计算 + 规则|成本 / Gate|[I][E]|行业方法 / 拟议
COGS|直接计算|价值 / 成本|[I]|行业方法
专利组合|规则 + 直接计算|商业寿命|[I][E]|行业方法 / 拟议
FTO / 阻断风险|规则 + 专家判断|Gate|[I]|行业方法
独占终止日|直接计算|商业寿命|[I]|行业方法
有效商业寿命|直接计算|商业寿命|[I][E]|行业衍生 / 拟议
商业寿命惩罚|规则 + 财务模型|价值|[E]|拟议`) },
  { id: "finance", number: 7, name: "资本效率与风险调整价值", question: "投入多少资本和时间能够换来多少价值？", metrics: parseStep2Metrics(`
收购经济性|直接计算|成本 / 价值|[I][E]|行业方法
到下一拐点成本|直接计算 + 预测|成本|[F][I]|结构确认 / 行业方法
到下一拐点时间|直接计算 + 预测|时间|[F][I]|结构确认
风险调整价值|财务模型|价值|[F][I]|结构确认 / 行业方法
rNPV|财务模型|价值|[F][I]|行业方法
资本效率|财务模型|价值 / 成本|[E][I]|拟议
拐点价值创造|财务模型|价值 / 成本|[F][E]|结构确认 / 拟议
下行风险敞口|情景分析|不确定性 / 成本|[I][E]|拟议`) },
  { id: "strategy", number: 8, name: "战略、交易与组合价值", question: "它是否适合我们并具备交易选择权？", metrics: parseStep2Metrics(`
治疗领域与能力匹配|规则|战略价值|[I][E]|拟议
管线与平台协同|规则 + 模型|战略价值|[F][E]|结构确认 / 拟议
可复用知识价值|规则 + 模型|战略价值|[F][E]|结构确认 / 拟议
可合作性|直接计算 + 规则|战略价值|[I][E]|拟议
退出选择权|规则|战略价值 / 风险|[F][I][E]|结构确认 / 拟议
组合分散化|直接计算 + 模型|战略价值 / 风险|[I][E]|拟议
资源重叠|直接计算 + 规则|成本 / 战略价值|[E]|拟议
内部蚕食风险|预测模型|价值 / 战略价值|[I][E]|拟议`) },
  { id: "uncertainty", number: 9, name: "不确定性与稳健性", question: "排名是否可信，什么条件会改变它？", metrics: parseStep2Metrics(`
证据质量|规则|置信度|[F][I][E]|结构确认 / 拟议
数据完整性|直接计算|置信度|[E]|拟议
证据冲突|规则 + 模型|不确定性|[F][E]|结构确认 / 拟议
时效性|直接计算 + 规则|置信度|[E]|拟议
Base / Bull / Bear|情景分析|全部核心变量|[I][E]|行业方法
敏感性分析|财务 / 统计模型|关键驱动因素|[I]|行业方法
排名稳定性|模拟|不确定性|[I][E]|行业方法 / 拟议
关键未知项|规则 + 模型|去风险计划|[F]|结构确认
信息价值 VOI|决策分析|下一项证据优先级|[I][E]|行业方法 / 拟议`) }
];

const step2Formulae = [
  ["适格患者规模", "总人群 × 诊断率 × 治疗率 × 适格率", "行业方法 / 拟议"],
  ["峰值销售", "适格患者 × 净价格 × 渗透率 × 治疗时长", "行业方法 / 拟议"],
  ["暴露覆盖", "观察暴露 ÷ 所需有效暴露", "拟议"],
  ["选择性比值", "脱靶活性 ÷ 靶点活性（受 assay 可比性约束）", "行业衍生"],
  ["入组时长", "所需受试者 ÷（中心数 × 调整后入组率）", "拟议"],
  ["到价值拐点时间", "启动 + 入组 + 治疗 + 随访 + 读出", "拟议"],
  ["有效商业寿命", "独占终止日 - 预计上市日", "行业衍生 / 拟议"],
  ["风险调整价值", "未来价值或现金流 × 阶段/技术成功概率", "行业方法"],
  ["rNPV", "风险调整后的折现现金流 - 开发及投资成本", "行业方法"],
  ["资本效率", "风险调整价值 ÷ 所需资本", "拟议"],
  ["拐点价值创造", "（拐点后预期价值 - 当前价值）÷ 到拐点资本", "结构确认 / 拟议"],
  ["上市时预期差异化", "资产画像 vs 上市时未来标准治疗（多维向量）", "拟议"],
  ["信息价值 VOI", "获得信息后的期望价值 - 当前期望价值 - 信息成本", "行业方法 / 拟议"],
  ["排名稳定性", "情景或 Monte Carlo 中进入 Top N 的频率", "行业方法 / 拟议"]
];

const step2Candidates = [
  { id:"GUSA-FOCUS", asset:"Gusacitinib", indication:"免疫炎症适应症", plan:"生物标志物富集 PoC", stage:"Phase 2", pos:46, futureValue:86, timeMonths:20, cost:42, commercialLife:9.5, strategic:82, confidence:74, stability:79, missing:3, conflicts:1, gate:"通过", drivers:["人体证据与机制链相对完整","患者分层可提高信号检测效率","下一价值拐点路径清晰"], unknown:"最佳预测性 biomarker 与长期安全窗仍需确认。", template:"Phase 2：临床信号、剂量、患者选择优先" },
  { id:"BLKR-CNS", asset:"BLKR201", indication:"CNS 适应症 A", plan:"快速机制验证 PoC", stage:"Phase 1", pos:38, futureValue:84, timeMonths:18, cost:34, commercialLife:12.5, strategic:88, confidence:61, stability:68, missing:5, conflicts:1, gate:"通过", drivers:["已验证 biology 与 CNS 属性形成差异化","时间与资本效率较好","存在多适应症扩展选择权"], unknown:"人体 target engagement 与疾病场景中的有效暴露尚未建立。", template:"Phase 1：PK/PD、靶点结合与安全窗优先" },
  { id:"SPRI-OA", asset:"Sprifermin", indication:"骨关节炎", plan:"结构 + 症状双终点方案", stage:"Phase 2", pos:43, futureValue:73, timeMonths:28, cost:55, commercialLife:8.2, strategic:69, confidence:72, stability:73, missing:4, conflicts:2, gate:"通过", drivers:["可复用的人体数据较充分","开发路径存在重新设计空间","患者与终点选择可直接去风险"], unknown:"结构改善能否转化为患者可感知获益。", template:"Phase 2：疗效一致性、终点与临床价值优先" },
  { id:"CD226-COMBO", asset:"anti-CD226", indication:"实体瘤亚组", plan:"生物标志物联合治疗", stage:"Preclinical", pos:29, futureValue:88, timeMonths:30, cost:47, commercialLife:13.8, strategic:76, confidence:54, stability:51, missing:8, conflicts:1, gate:"通过", drivers:["差异化免疫机制具有潜在上限","商业寿命和组合选择权较好","早期实验具有较高信息价值"], unknown:"人体转化、最佳联合对象与耐受性均未验证。", template:"临床前：靶点、转化证据与分子属性优先" },
  { id:"GUSA-BROAD", asset:"Gusacitinib", indication:"免疫炎症适应症", plan:"广泛人群原路径优化", stage:"Phase 2", pos:36, futureValue:80, timeMonths:30, cost:68, commercialLife:8.7, strategic:73, confidence:68, stability:62, missing:4, conflicts:2, gate:"通过", drivers:["沿用现有临床基础","可减少早期机制验证工作","目标人群规模相对更大"], unknown:"广泛人群可能稀释疗效信号并提高试验规模。", template:"Phase 2：临床信号、剂量、患者选择优先" },
  { id:"BLKR-EXPAND", asset:"BLKR201", indication:"CNS 适应症 B", plan:"新适应症扩展", stage:"Phase 1", pos:31, futureValue:91, timeMonths:26, cost:46, commercialLife:12.1, strategic:84, confidence:49, stability:45, missing:9, conflicts:0, gate:"通过", drivers:["未来市场与未满足需求较高","特殊分子属性可能适配新疾病场景","具备平台数据复用空间"], unknown:"疾病相关性证据仍偏早期，排序对关键假设高度敏感。", template:"Phase 1：PK/PD、靶点结合与安全窗优先" },
  { id:"HBM4003-MCRC", asset:"HBM4003", indication:"无肝转移MSS mCRC", plan:"生物标志物富集 + PD-1联合确认", stage:"Phase 2", pos:52, intervalLow:45, intervalHigh:60, futureValue:82, timeMonths:24, cost:58, commercialLife:10.4, strategic:79, confidence:58, stability:55, missing:5, conflicts:2, gate:"通过", drivers:["公开Ⅱ期队列观察到客观缓解信号","Treg清除与PD-1联合具有机制合理性","无肝转移人群提供可验证的富集假设"], unknown:"小样本非随机结果能否在前瞻性分层研究中重复。", template:"Phase 2：临床信号、患者选择、安全与对照证据优先", realCase:true },
  { id:"HBM1020-ENRICH", asset:"HBM1020", indication:"HHLA2高表达实体瘤", plan:"PD-L1阴性/耐药人群富集扩展", stage:"Phase 1", pos:38, intervalLow:30, intervalHigh:45, futureValue:76, timeMonths:20, cost:37, commercialLife:12.8, strategic:75, confidence:39, stability:36, missing:8, conflicts:1, gate:"通过", drivers:["B7H7/HHLA2提供差异化免疫逃逸假设","早期安全性支持继续探索","生物标志物富集可以低成本验证核心假设"], unknown:"疾病稳定能否转化为机制一致、可重复的客观缓解。", template:"Phase 1：靶点表达、PK/PD、生物标志物与早期疗效优先", realCase:true },
  { id:"FITUSIRAN-ATDR", asset:"Fitusiran", indication:"血友病A/B", plan:"AT活性指导的个体化剂量与风险管理", stage:"Phase 3", pos:historicalBacktestByCandidate["FITUSIRAN-ATDR"].point, intervalLow:historicalBacktestByCandidate["FITUSIRAN-ATDR"].low, intervalHigh:historicalBacktestByCandidate["FITUSIRAN-ATDR"].high, futureValue:78, timeMonths:24, cost:58, commercialLife:10.0, strategic:72, confidence:historicalBacktestByCandidate["FITUSIRAN-ATDR"].confidence, stability:72, missing:3, conflicts:2, gate:"通过（安全性条件）", drivers:["出血控制与靶点调控仍有支持","严重安全风险与暴露强度存在可干预联系","动态剂量可以直接检验能否恢复净获益"], unknown:"AT目标窗口内能否稳定保留疗效并把严重血栓降至可接受水平。", template:"Phase 3：净临床获益、安全性风险管理与可执行性优先", realCase:true },
  { id:"ETRIPAMIL-RAPID", asset:"Etripamil", indication:"阵发性室上性心动过速", plan:"30分钟主要终点 + 必要时重复给药", stage:"Phase 3", pos:historicalBacktestByCandidate["ETRIPAMIL-RAPID"].point, intervalLow:historicalBacktestByCandidate["ETRIPAMIL-RAPID"].low, intervalHigh:historicalBacktestByCandidate["ETRIPAMIL-RAPID"].high, futureValue:71, timeMonths:22, cost:45, commercialLife:9.2, strategic:70, confidence:historicalBacktestByCandidate["ETRIPAMIL-RAPID"].confidence, stability:68, missing:3, conflicts:1, gate:"通过", drivers:["早期转复信号与快速起效药理一致","终点时间窗和给药方案可直接重构","院外自我用药具有清晰差异化"], unknown:"预设30分钟窗口能否独立重复早期转复获益。", template:"Phase 3：预设终点、给药方案与临床可感知获益优先", realCase:true },
  { id:"VERUBEC-STOP", asset:"Verubecestat", indication:"前驱期阿尔茨海默病", plan:"不继续大型临床；仅保留机制反证", stage:"Phase 3", pos:historicalBacktestByCandidate["VERUBEC-STOP"].point, intervalLow:historicalBacktestByCandidate["VERUBEC-STOP"].low, intervalHigh:historicalBacktestByCandidate["VERUBEC-STOP"].high, futureValue:24, timeMonths:40, cost:95, commercialLife:6.0, strategic:18, confidence:historicalBacktestByCandidate["VERUBEC-STOP"].confidence, stability:90, missing:1, conflicts:0, gate:"不通过", drivers:["充分靶点调控未转化为临床获益","大型Ⅲ期因无效提前终止","不良事件进一步压缩净获益空间"], unknown:"是否存在足够强的新人体因果证据解释靶点调控与临床无效之间的断裂。", template:"Phase 3失败：临床获益、机制因果链与停止规则优先", realCase:true }
];

function getStep2CandidatePool() {
  const optimized = Object.values(step3Writebacks).map(record => {
    const base = step2Candidates.find(item => item.id === record.parentId);
    return { ...base, ...record.values, id:record.id, parentId:record.parentId, plan:record.name, isOptimized:true, optimizedAt:record.version };
  });
  return [...step2Candidates, ...optimized];
}

const step2Profiles = {
  conservative: { label:"稳健资源情景", note:"更偏好较短时间与较低资本需求", weights:{ pos:.27, value:.19, time:.19, cost:.20, life:.09, strategic:.06 } },
  base: { label:"基础资源情景", note:"平衡成功概率、未来价值与执行效率", weights:{ pos:.29, value:.27, time:.13, cost:.13, life:.10, strategic:.08 } },
  aggressive: { label:"进取资源情景", note:"更愿意为高价值和战略选择权承担成本", weights:{ pos:.28, value:.33, time:.07, cost:.06, life:.10, strategic:.16 } }
};

const step2LensLabels = { priority:"综合资源优先级", intrinsic:"资产内在吸引力", capital:"资本效率", pos:"临床成功概率" };
const clamp = value => Math.max(1, Math.min(100, value));
const weightedGeometric = (values, weights) => {
  const entries = Object.keys(weights).filter(key => weights[key] > 0);
  const total = entries.reduce((sum,key) => sum + weights[key], 0);
  return Math.round(Math.exp(entries.reduce((sum,key) => sum + (weights[key]/total) * Math.log(Math.max(1, values[key])), 0)));
};

function calculateStep2(candidate) {
  const pos = clamp(candidate.pos * 2.05);
  const value = candidate.futureValue;
  const time = clamp(100 - ((candidate.timeMonths - 12) / 36) * 75);
  const cost = clamp(100 - ((candidate.cost - 20) / 80) * 75);
  const life = clamp(candidate.commercialLife / 15 * 100);
  const factors = { pos, value, time, cost, life, strategic:candidate.strategic };
  const intrinsic = weightedGeometric(factors, { pos:.34, value:.31, time:.13, cost:.12, life:.10 });
  const resourcePriority = weightedGeometric(factors, step2Profiles[step2ResourceProfile].weights);
  const riskAdjustedValue = Math.round((candidate.pos/100) * value * (life/100));
  const capitalEfficiency = clamp(Math.round(riskAdjustedValue / candidate.cost * 100));
  const priority = step2Lens === "priority" ? resourcePriority : step2Lens === "intrinsic" ? intrinsic : step2Lens === "capital" ? capitalEfficiency : Math.round(pos);
  const tier = priority >= 70 ? "Tier 1" : priority >= 58 ? "Tier 2" : "Tier 3";
  const action = candidate.gate === "不通过" ? "停止投入 / 仅保留反证研究" : candidate.confidence < 55 ? "先补关键证据" : priority >= 72 ? "优先投入" : priority >= 65 ? "进入重点尽调" : priority >= 58 ? "先解除一个关键风险" : "持续观察";
  return { ...candidate, factors, intrinsic, resourcePriority, riskAdjustedValue, capitalEfficiency, priority, tier, action };
}

function renderStep2RankingTable(rows) {
  return `<div class="table-wrap"><table class="step2-table"><thead><tr><th>排名</th><th>资产 × 适应症 × 开发方案</th><th>阶段</th><th>Tier / 行动</th><th>PoS</th><th>${step2LensLabels[step2Lens]}</th><th>置信度</th></tr></thead><tbody>${rows.map((item,index) => `<tr data-step2-candidate="${item.id}" class="${item.id===selectedStep2Id?"selected":""}" tabindex="0"><td><span class="rank-number">${index+1}</span></td><td><strong>${item.asset}${item.isOptimized?'<em class="optimized-badge">STEP 3 回写</em>':''}</strong><span>${item.indication} · ${item.plan}</span></td><td>${item.stage}</td><td><b class="tier-inline tier-${item.tier.slice(-1)}">${item.tier}</b><small>${item.action}</small></td><td><strong>${item.pos}%</strong></td><td><span class="score">${item.priority}</span> / 100</td><td>${confidence(item)}</td></tr>`).join("")}</tbody></table></div>`;
}

function renderStep2Detail(item) {
  const baseCandidate = step2Candidates.find(candidate => candidate.id === (item.parentId || item.id)) || item;
  const quickScenarios = getStep3ScenariosForCandidate(baseCandidate, "quick", defaultStep3Params(baseCandidate));
  const quickBest = quickScenarios.filter(scenario => !scenario.isBaseline).sort((a,b) => b.balanced-a.balanced)[0];
  const traces = [
    ["风险调整价值指数", `${item.pos}% PoS × ${item.futureValue} 未来价值 × ${Math.round(item.factors.life)} 商业寿命因子 = ${item.riskAdjustedValue}`],
    ["资本效率", `${item.riskAdjustedValue} 风险调整价值 ÷ ${item.cost} 资本需求 = ${item.capitalEfficiency}`],
    ["资源情景修正", `${step2Profiles[step2ResourceProfile].label} · ${step2Profiles[step2ResourceProfile].note}`],
    ["置信度处理", `${item.confidence}% 单独展示，不用默认值掩盖 ${item.missing} 项缺失和 ${item.conflicts} 项冲突`]
  ];
  return `<aside class="panel step2-detail"><div class="step2-detail-head"><div><p class="eyebrow">当前候选开发情景</p><h2>${item.asset}</h2><p>${item.indication} · ${item.plan}</p></div><span>${item.tier}</span></div><div class="step2-detail-body"><div class="action-callout"><small>系统行动建议</small><strong>${item.action}</strong><span>${item.gate} STEP 1 · ${item.template}</span></div><div class="core-output-grid"><div><span>PoS</span><b>${item.pos}%</b></div><div><span>未来价值</span><b>${item.futureValue}</b></div><div><span>到拐点</span><b>${item.timeMonths} 月</b></div><div><span>资本需求</span><b>${item.cost}M</b></div><div><span>商业寿命</span><b>${item.commercialLife} 年</b></div><div><span>组织 / 组合适配</span><b>${item.strategic}</b></div></div><div class="quick-redesign"><div><small>STEP 3 快速重构预判</small><b>${quickBest.name}</b><span>PoS ${quickBest.pos-item.pos>=0?"+":""}${quickBest.pos-item.pos}pp · 时间 ${quickBest.timeMonths-item.timeMonths>=0?"+":""}${quickBest.timeMonths-item.timeMonths}月 · 价值 ${quickBest.futureValue-item.futureValue>=0?"+":""}${quickBest.futureValue-item.futureValue}</span></div><button data-open-step3="${baseCandidate.id}" class="secondary-button">进入场景实验室</button></div><h3>主要正向驱动</h3><ul class="reason-list">${item.drivers.map((driver,index)=>`<li><b>${index+1}</b><span>${driver}</span></li>`).join("")}</ul><div class="risk-box"><span>最关键未知项</span><p>${item.unknown}</p></div><div class="calculation-trace"><h3>计算追踪</h3>${traces.map(([name,formula])=>`<div><b>${name}</b><span>${formula}</span></div>`).join("")}</div></div></aside>`;
}

function renderLogicDictionary() {
  const dimension = step2Dimensions.find(item => item.id === selectedDimensionId) || step2Dimensions[0];
  return disclosure("查看完整计算逻辑", "9个一级维度、73条二级逻辑和核心公式；默认收起，不影响主结论阅读。", `<section class="logic-dictionary"><div class="logic-heading"><div><p class="eyebrow">完整逻辑覆盖</p><h2>9 个维度组织知识，73 条二级逻辑进入计算层</h2><p>九个维度不会直接相加；底层证据先转成 PoS、价值、时间、成本、商业寿命、战略价值和不确定性，再进入 Gate、价值模型和资源配置。</p></div><div class="logic-type-strip"><span><b>直接计算</b>数字、日期与 benchmark</span><span><b>规则引擎</b>阈值、Gate 与分层</span><span><b>预测模型</b>PoS、市场、入组与未来 SOC</span><span><b>专家判断</b>无法可靠形式化的事项</span></div></div><div class="dimension-grid">${step2Dimensions.map(item => `<button data-step2-dimension="${item.id}" class="dimension-card ${item.id===selectedDimensionId?"active":""}"><span>0${item.number}</span><b>${item.name}</b><small>${item.metrics.length} 条逻辑</small></button>`).join("")}</div><div class="dimension-detail panel"><div class="dimension-detail-head"><div><p class="eyebrow">维度 ${dimension.number}</p><h2>${dimension.name}</h2><p>${dimension.question}</p></div><span>${dimension.metrics.length} / ${dimension.metrics.length} 已纳入</span></div><div class="table-wrap"><table class="logic-table"><thead><tr><th>二级维度</th><th>处理方式</th><th>影响的核心变量</th><th>来源</th><th>公式状态</th></tr></thead><tbody>${dimension.metrics.map(metric => `<tr><td><strong>${metric.name}</strong></td><td>${metric.logic}</td><td>${metric.core}</td><td>${metric.origin}</td><td>${metric.status}</td></tr>`).join("")}</tbody></table></div></div><details class="panel formula-library"><summary><span><b>核心公式与结构式</b><small>共 ${step2Formulae.length} 条；明确区分行业方法与拟议公式</small></span><em>展开查看</em></summary><div class="formula-grid">${step2Formulae.map(([name,formula,status])=>`<article><b>${name}</b><code>${formula}</code><small>${status}</small></article>`).join("")}</div></details></section>`);
}

const stagePredictionTemplates = {
  Preclinical: { label:"临床前模板", weights:[["靶点与机制",32],["人类遗传学",22],["转化证据",20],["分子属性",18],["临床先例",8]] },
  "Phase 1": { label:"Phase 1 模板", weights:[["PK / 暴露",26],["靶点结合",24],["安全窗",22],["机制证据",16],["早期疗效",12]] },
  "Phase 2": { label:"Phase 2 模板", weights:[["临床疗效",30],["患者选择",22],["剂量反应",18],["安全与耐受",18],["终点与设计",12]] },
  "Phase 3": { label:"Phase 3 模板", weights:[["确认性疗效",30],["安全与净获益",25],["终点与统计设计",20],["剂量与风险管理",15],["执行与监管可接受性",10]] }
};

function calculatePrediction(candidate) {
  const width = Math.max(7, Math.round((100-candidate.confidence)*.28 + candidate.missing*.75 + candidate.conflicts*2));
  const low = candidate.intervalLow ?? Math.max(2,candidate.pos-width);
  const high = candidate.intervalHigh ?? Math.min(95,candidate.pos+width);
  const causal = [
    ["有效暴露",clamp(Math.round(candidate.pos*1.18+24)),"药物能否达到所需组织和有效浓度"],
    ["靶点结合",clamp(Math.round(candidate.pos*1.12+21-(candidate.stage==="Preclinical"?7:0))),"暴露是否转化为足够 Target Engagement"],
    ["机制成立",clamp(Math.round(candidate.confidence*.62+25)),"靶点结合能否产生预期生物学变化"],
    ["临床疗效",clamp(Math.round(candidate.pos*.96+7)),"生物学变化能否形成患者可感知获益"],
    ["安全允许",clamp(Math.round(88-candidate.missing*2.8-candidate.conflicts*5)),"安全窗是否允许维持有效暴露"]
  ];
  const uncertainty = [
    ["患者选择",candidate.plan.includes("生物标志物")?"中":"高"],
    ["Target Engagement",candidate.stage==="Preclinical"?"高":"中"],
    ["安全窗",candidate.conflicts>1?"高":"中"],
    ["试验设计",candidate.missing>6?"高":"中"]
  ];
  return { low, high, causal, uncertainty };
}

function renderPredictionPanel(candidate) {
  const prediction = calculatePrediction(candidate);
  const template = stagePredictionTemplates[candidate.stage] || stagePredictionTemplates["Phase 2"];
  const contrarianConditions = [
    ["核心 Biology 在目标疾病中成立",candidate.confidence>=65?"强":"中"],
    ["有效暴露与靶点结合能够建立",candidate.stage==="Preclinical"?"未知":"中"],
    ["患者选择能放大真实效应",candidate.plan.includes("生物标志物")?"中":"未知"],
    ["竞品失败原因不适用于本资产","中"],
    ["安全窗足以支持目标剂量",candidate.conflicts>1?"弱":"中"]
  ];
  return `<section class="panel prediction-summary"><div class="prediction-title"><div><p class="eyebrow">STEP 2A · 会不会成功？</p><h2>${candidate.asset} · ${candidate.plan}</h2><p>先给概率区间和最关键未知项；需要时再展开因果链和权重。</p></div><label><span>预测对象</span><select id="step2-prediction-candidate" class="select-box">${getStep2CandidatePool().map(item=>`<option value="${item.id}" ${item.id===candidate.id?"selected":""}>${item.asset} · ${item.plan}</option>`).join("")}</select></label></div><div class="prediction-answer"><div><span>当前PoS</span><strong>${candidate.pos}%</strong><small>演示中位值</small></div><div><span>80%合理区间</span><strong>${prediction.low}–${prediction.high}%</strong><small>缺失与冲突决定区间宽度</small></div><div><span>证据置信度</span><strong>${candidate.confidence}%</strong><small>${candidate.missing}项缺失 · ${candidate.conflicts}项冲突</small></div><article><span>最可能改变结论的未知项</span><p>${candidate.unknown}</p></article></div></section>
    ${disclosure("概率为什么是这个区间？", "沿着暴露 → 靶点结合 → 机制 → 疗效 → 安全性逐层检查。", `<div class="causal-chain">${prediction.causal.map(([name,value,note],index)=>`<article><span>0${index+1}</span><h3>${name}</h3><strong>${value}%</strong><i><b style="width:${value}%"></b></i><p>${note}</p></article>`).join("")}</div><div class="prediction-footnote">PoS不是五个节点的简单平均；正式版将按阶段先验、节点条件概率、证据强度和冲突传播。当前数值用于展示计算结构。</div>`)}
    ${disclosure("阶段权重与不确定性", `${template.label}决定哪些证据更重要。`, `<div class="prediction-detail-pair"><section class="panel stage-template"><p class="eyebrow">动态权重</p><h2>${template.label}</h2>${template.weights.map(([name,value])=>`<div><span>${name}</span><i><b style="width:${value*2.7}%"></b></i><strong>${value}%</strong></div>`).join("")}</section><section class="panel uncertainty-source"><p class="eyebrow">不确定性来源</p><h2>区间为什么仍然较宽</h2>${prediction.uncertainty.map(([name,level])=>`<div><span>${name}</span><b class="uncertainty-${level}">${level}</b></div>`).join("")}<small>${candidate.missing}项缺失 · ${candidate.conflicts}项冲突</small></section></div>`)}
    ${disclosure("反方情景：如果主流判断错了呢？", "同时保留Base Case与Minority Case，避免把行业共识当成事实。", `<div class="contrarian-grid"><article><span>Base Case</span><h3>当前最可能发生什么？</h3><p>${candidate.unknown}</p><strong>当前PoS ${candidate.pos}%</strong></article><article class="minority-case"><span>Contrarian Case</span><h3>什么必须成立？</h3>${contrarianConditions.map(([condition,level])=>`<div><p>${condition}</p><b>${level}</b></div>`).join("")}<strong>Contrarian Plausibility · ${candidate.confidence>=70?"中高":"中等"}</strong></article></div>`)}`;
}

function step2SectionTabs() {
  return `<div class="step2-section-tabs"><button data-step2-section="prediction" class="${step2Section==="prediction"?"active":""}"><span>STEP 2A</span><b>科学与临床预测</b><small>会不会成功？</small></button><button data-step2-section="decision" class="${step2Section==="decision"?"active":""}"><span>STEP 2B</span><b>投资与组合决策</b><small>值不值得优先投入？</small></button></div>`;
}

function wireStep2Shared() {
  document.querySelectorAll("[data-step2-section]").forEach(button=>button.addEventListener("click",()=>{step2Section=button.dataset.step2Section;renderRanking();}));
  document.querySelectorAll("[data-step2-dimension]").forEach(button=>button.addEventListener("click",()=>{selectedDimensionId=button.dataset.step2Dimension;renderRanking();}));
  const selector = document.querySelector("#step2-prediction-candidate");
  if (selector) selector.addEventListener("change",event=>{selectedStep2Id=event.target.value;renderRanking();});
}

function renderRanking() {
  document.querySelectorAll(".pipeline-step").forEach(btn => {
    const sectionMatch = !btn.dataset.step2SectionTarget || btn.dataset.step2SectionTarget === step2Section;
    btn.classList.toggle("active", btn.dataset.view === "ranking" && sectionMatch);
  });
  const candidatePool = getStep2CandidatePool();
  const calculated = candidatePool.map(calculateStep2).sort((a,b) => b.priority-a.priority);
  const selected = calculated.find(item => item.id === selectedStep2Id) || calculated[0];
  const uniqueAssets = new Set(candidatePool.map(item => item.asset)).size;
  const heading = `<div class="view-heading step2-heading"><div><p class="eyebrow">STEP 2 · Predict + Decide</p><h2>先判断会不会成功，再判断值不值得优先投入</h2><p>科学与临床预测不被市场价值污染；STEP 3 产生的开发方案会重新进入 2A 预测，再由 2B 对“资产 × 开发方案”排序。</p></div><span class="draft-badge">结构化演示 · 非真实投资建议</span></div>${step2SectionTabs()}`;
  if (step2Section === "prediction") {
    root.innerHTML = `${heading}${renderPredictionPanel(selected)}${renderLogicDictionary()}`;
    wireStep2Shared();
    return;
  }
  root.innerHTML = `${heading}<div class="step2-controls"><label><span>资源情景</span><select id="step2-profile" class="select-box">${Object.entries(step2Profiles).map(([key,item])=>`<option value="${key}" ${key===step2ResourceProfile?"selected":""}>${item.label}</option>`).join("")}</select></label><div class="metric-tabs">${Object.entries(step2LensLabels).map(([key,label])=>`<button data-step2-lens="${key}" class="metric-tab ${key===step2Lens?"active":""}">${label}</button>`).join("")}</div></div><div class="step2-principle"><b>不做九维简单加总</b><span>Gate → PoS / Value / Time / Cost → 战略修正 → 资源配置</span><em>置信度与不确定性独立展示</em></div><div class="summary-strip step2-summary"><div class="panel summary-card" style="--card-color:var(--teal)"><span>候选开发情景</span><strong>${calculated.length}</strong><small>来自 ${uniqueAssets} 个通过海选资产</small></div><div class="panel summary-card" style="--card-color:var(--blue)"><span>Tier 1</span><strong>${calculated.filter(item=>item.tier==="Tier 1").length}</strong><small>当前资源情景</small></div><div class="panel summary-card" style="--card-color:var(--amber)"><span>逻辑覆盖</span><strong>73 / 73</strong><small>九个一级维度</small></div><div class="panel summary-card" style="--card-color:var(--red)"><span>低置信候选</span><strong>${calculated.filter(item=>item.confidence<55).length}</strong><small>优先补决定性证据</small></div></div><div class="step2-layout"><section class="panel"><div class="panel-head"><div><h2>${step2LensLabels[step2Lens]}排序</h2><p>${step2Profiles[step2ResourceProfile].note}；STEP 3 优化方案可回写并参与同表比较。</p></div><span class="draft-badge">案例化演示 · 非真实数据</span></div>${renderStep2RankingTable(calculated)}</section>${renderStep2Detail(selected)}</div>${renderLogicDictionary()}`;
  wireStep2Shared();
  document.querySelector("#step2-profile").addEventListener("change", event => { step2ResourceProfile = event.target.value; renderRanking(); });
  document.querySelectorAll("[data-step2-lens]").forEach(button => button.addEventListener("click", () => { step2Lens = button.dataset.step2Lens; renderRanking(); }));
  document.querySelectorAll("[data-step2-candidate]").forEach(row => { const select = () => { selectedStep2Id = row.dataset.step2Candidate; renderRanking(); }; row.addEventListener("click", select); row.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") select(); }); });
  document.querySelectorAll("[data-open-step3]").forEach(button => button.addEventListener("click", () => { step3SelectedCandidateId = button.dataset.openStep3; step3Depth = "quick"; resetStep3Params(); switchView("scenario"); }));
}

const step3Modules = [
  { id:"indication", number:1, name:"适应症策略", question:"资产特有属性最适合哪个疾病与生物学场景？", method:"规则 + 模型 + 预测", formula:"Indication Opportunity = f(Biology Fit, Property Fit, Human Evidence, White Space, Feasibility, Value)", dimensions:["生物学适配","资产属性适配","同类临床先例","人类遗传学","竞争空白","患者可及性","监管与市场适配"] },
  { id:"patient", number:2, name:"患者与 Biomarker 策略", question:"哪类患者最可能放大治疗效应且仍可入组？", method:"直接计算 + 模型 + 优化", formula:"Population Utility = PoS × Effect Size × Addressable Population", dimensions:["分子/遗传亚型","Biomarker 策略","疾病表型","既往治疗与耐药","治疗线次","富集收益权衡"] },
  { id:"dose", number:3, name:"剂量、暴露与给药周期", question:"如何找到疗效与安全性的最佳暴露窗口？", method:"PK/PD + 模拟 + 规则", formula:"Therapeutic Window = Efficacy Exposure ∩ Tolerable Exposure", dimensions:["剂量-反应","暴露-反应","Target Engagement","治疗窗","给药周期","诱导与维持"] },
  { id:"formulation", number:4, name:"剂型、途径与产品配置", question:"产品形态能否改善 PK、便利性、成本与商业寿命？", method:"PK 模拟 + 规则 + 财务", formula:"Formulation Value = Clinical + Convenience + Differentiation + IP - Cost", dimensions:["给药途径","释放特征","浓度与装置","固定剂量组合","IP 延展","总体剂型价值"] },
  { id:"combination", number:5, name:"联合与治疗顺序", question:"单药、联合、序贯或维持治疗哪个更优？", method:"规则 + 模型 + 优化", formula:"Net Combination Value = ΔPoS + ΔValue + ΔDurability - ΔSafety - ΔCost - ΔComplexity", dimensions:["机制互补","耐药互补","肿瘤/免疫微环境协同","毒性重叠","暴露与 DDI 兼容","治疗顺序","联合净价值"] },
  { id:"trial", number:6, name:"终点与试验设计", question:"怎样最有效率地验证核心假设？", method:"统计计算 + 规则 + 优化", formula:"Trial Utility = PoS × Information Gain × Expected Value / (Time × Cost)", dimensions:["主要终点","人群设计","对照组","试验组与剂量队列","样本量与把握度","适应性与中期分析","试验效用"] },
  { id:"regulatory", number:7, name:"监管策略", question:"哪条证据和审评路径最有利？", method:"规则 + 预测 + 优化", formula:"Regulatory Path Value = P(Approval) × Commercial Value - Time/Cost - Post-approval Burden", dimensions:["批准路径","资格认定","终点可接受性","对照组要求","伴随诊断要求","上市后义务","监管路径价值"] },
  { id:"sequence", number:8, name:"开发顺序与价值拐点", question:"先验证什么、后扩展什么、何时合作或退出？", method:"优化 + 财务 + 预测", formula:"Inflection Efficiency = (EV after - Current Value) / (Capital × Time)", dimensions:["首个 PoC 适应症","扩展顺序","数据复用","价值拐点","拐点效率","合作与退出时机"] },
  { id:"evidence", number:9, name:"证据生成与去风险", question:"下一笔钱最值得花在哪条证据上？", method:"决策分析 + 模型 + 优化", formula:"VOI = EV after information - EV current - Cost of information", dimensions:["关键未知项识别","实验选项","证据成本与时间","决策影响","信息价值 VOI","下一项最佳实验"] }
];

const step3FailureLabels = {
  biology:"生物学失败", molecule:"分子缺陷", pk:"PK / 暴露不足", targetEngagement:"靶点结合不足", dose:"剂量选择", patient:"患者选择", endpoint:"终点", heterogeneity:"疾病异质性", trial:"试验设计", operational:"运营 / 商业"
};

const step3FailureMaps = {
  Gusacitinib:{ biology:12,molecule:15,pk:24,targetEngagement:22,dose:52,patient:70,endpoint:62,heterogeneity:58,trial:48,operational:25 },
  BLKR201:{ biology:22,molecule:16,pk:34,targetEngagement:48,dose:45,patient:56,endpoint:42,heterogeneity:54,trial:35,operational:20 },
  Sprifermin:{ biology:18,molecule:12,pk:15,targetEngagement:20,dose:32,patient:58,endpoint:78,heterogeneity:66,trial:64,operational:28 },
  "anti-CD226":{ biology:34,molecule:20,pk:38,targetEngagement:55,dose:48,patient:62,endpoint:44,heterogeneity:60,trial:36,operational:22 },
  HBM4003:{ biology:18,molecule:14,pk:20,targetEngagement:24,dose:40,patient:78,endpoint:46,heterogeneity:72,trial:65,operational:28 },
  HBM1020:{ biology:42,molecule:18,pk:28,targetEngagement:62,dose:36,patient:82,endpoint:48,heterogeneity:76,trial:58,operational:24 },
  Fitusiran:{ biology:8,molecule:18,pk:22,targetEngagement:12,dose:92,patient:20,endpoint:18,heterogeneity:16,trial:38,operational:48 },
  Etripamil:{ biology:12,molecule:14,pk:20,targetEngagement:18,dose:58,patient:24,endpoint:94,heterogeneity:25,trial:90,operational:28 },
  Verubecestat:{ biology:88,molecule:24,pk:10,targetEngagement:8,dose:46,patient:68,endpoint:25,heterogeneity:44,trial:22,operational:18 }
};

const step3ScenarioDefinitions = [
  { id:"baseline", name:"当前基准方案", type:"Baseline", summary:"保留当前适应症、人群与开发路径，用作所有变化的比较基准。", isBaseline:true, pos:0,value:0,time:0,cost:0,life:0,confidence:0,information:25, variables:["不改变开发变量"], assumption:"现有开发假设继续成立。", stop:"任一核心 Gate 被新证据触发。" },
  { id:"enriched", name:"患者 / Biomarker 富集 PoC", type:"Focused", summary:"聚焦最可能应答的人群，以较小研究验证核心 biology。", pos:7,value:-2,time:-4,cost:-7,life:.2,confidence:5,information:82, variables:["患者人群","Biomarker","终点","样本量"], assumption:"标志物具有预测性且可以稳定检测。", stop:"富集人群未显示预期方向或可招募人群过小。" },
  { id:"dose", name:"剂量、暴露与周期优化", type:"Exposure", summary:"重新寻找有效暴露、靶点结合与安全窗的交集。", pos:4,value:3,time:-1,cost:2,life:.3,confidence:4,information:72, variables:["剂量","给药周期","Target Engagement","安全窗"], assumption:"历史信号受暴露或剂量选择限制，而非机制失败。", stop:"可耐受暴露仍无法达到目标结合阈值。" },
  { id:"indication", name:"Property-first 新疾病场景", type:"Transformative", summary:"从分子特殊属性出发，寻找更匹配的疾病与生物学环境。", pos:-3,value:12,time:5,cost:8,life:.5,confidence:-8,information:91, variables:["适应症","生物学场景","患者","竞争位置"], assumption:"分子特殊属性能在新疾病场景中转化为临床优势。", stop:"转化证据无法连接分子属性与疾病关键机制。" },
  { id:"formulation", name:"剂型 / 给药途径重构", type:"Product", summary:"通过产品配置改善暴露、便利性、差异化与商业寿命。", pos:3,value:6,time:4,cost:7,life:1.2,confidence:-1,information:64, variables:["剂型","给药途径","释放特征","IP"], assumption:"产品配置能够实质改善 PK 或患者体验。", stop:"制剂增益不足以覆盖 CMC 成本与开发延迟。" },
  { id:"combination", name:"机制互补联合 / 序贯", type:"Combination", summary:"比较单药、联合和治疗顺序，同时计入毒性与复杂度。", pos:5,value:10,time:6,cost:14,life:0,confidence:-6,information:85, variables:["联合对象","治疗顺序","剂量","毒性重叠"], assumption:"机制增益大于毒性、DDI、成本和执行复杂度。", stop:"组合未产生增量药效或出现不可接受的重叠毒性。" },
  { id:"regulatory", name:"快速验证与监管路径优化", type:"Fast path", summary:"使用可接受终点、适应性设计或特殊通道缩短价值验证。", pos:1,value:4,time:-5,cost:-4,life:.4,confidence:0,information:61, variables:["终点","试验设计","监管路径","开发顺序"], assumption:"监管先例与终点可接受性能够支持更快读出。", stop:"监管反馈不支持拟议终点或证据路径。" }
];

function defaultStep3Params(candidate) {
  return {
    evidence: candidate.confidence,
    enrichment: candidate.plan.includes("生物标志物") ? 78 : candidate.stage === "Preclinical" ? 56 : 66,
    execution: clamp(Math.round(96 - candidate.timeMonths * 1.3)),
    riskTolerance: 52
  };
}

function resetStep3Params() {
  const candidate = step2Candidates.find(item => item.id === step3SelectedCandidateId) || step2Candidates[0];
  step3Params = defaultStep3Params(candidate);
  selectedStep3ScenarioId = "";
}

function markParetoSet(scenarios) {
  return scenarios.map(candidate => {
    const dominated = scenarios.some(other => other.id !== candidate.id &&
      other.pos >= candidate.pos && other.futureValue >= candidate.futureValue && other.timeMonths <= candidate.timeMonths && other.cost <= candidate.cost &&
      (other.pos > candidate.pos || other.futureValue > candidate.futureValue || other.timeMonths < candidate.timeMonths || other.cost < candidate.cost));
    return { ...candidate, pareto:!dominated };
  });
}

function getStep3ScenariosForCandidate(candidate, depth = step3Depth, params = step3Params) {
  const definitions = depth === "quick" ? step3ScenarioDefinitions.filter(item => ["baseline","enriched","dose","indication"].includes(item.id)) : step3ScenarioDefinitions;
  const scenarios = definitions.map(definition => {
    const baseline = definition.isBaseline;
    const evidenceEffect = baseline ? 0 : Math.round((params.evidence - 65) * .05);
    const enrichmentEffect = definition.id === "enriched" ? Math.round((params.enrichment - 60) * .08) : 0;
    const riskEffect = ["indication","combination"].includes(definition.id) ? Math.round((params.riskTolerance - 50) * .05) : 0;
    const speedEffect = baseline ? 0 : Math.round((params.execution - 60) * .06);
    const pos = clamp(candidate.pos + definition.pos + evidenceEffect + enrichmentEffect);
    const futureValue = clamp(candidate.futureValue + definition.value + riskEffect);
    const timeMonths = Math.max(8, candidate.timeMonths + definition.time - speedEffect);
    const cost = Math.max(8, candidate.cost + definition.cost - Math.round(speedEffect * .7));
    const commercialLife = Math.max(2, +(candidate.commercialLife + definition.life - Math.max(0,timeMonths-candidate.timeMonths)/12).toFixed(1));
    const confidenceValue = clamp(candidate.confidence + definition.confidence + Math.round((params.evidence-candidate.confidence)*.12));
    const lifeScore = clamp(commercialLife / 15 * 100);
    const timeScore = clamp(100 - ((timeMonths-10)/38)*75);
    const costScore = clamp(100 - ((cost-15)/90)*75);
    const riskAdjustedValue = Math.round((pos/100) * futureValue * (lifeScore/100));
    const capitalEfficiency = clamp(Math.round(riskAdjustedValue/cost*100));
    const balanced = weightedGeometric({ pos:clamp(pos*2.05), value:futureValue, time:timeScore, cost:costScore, life:lifeScore }, { pos:.31,value:.29,time:.15,cost:.15,life:.10 });
    return { ...definition, pos, futureValue, timeMonths, cost, commercialLife, confidence:confidenceValue, riskAdjustedValue, capitalEfficiency, balanced, informationGain:clamp(definition.information + Math.round((100-confidenceValue)*.1)) };
  });
  return markParetoSet(scenarios);
}

function getScenarioObjectiveTags(scenarios) {
  const nonBaseline = scenarios.filter(item => !item.isBaseline);
  const best = (score) => [...nonBaseline].sort((a,b)=>score(b)-score(a))[0]?.id;
  const tags = {};
  const add = (id,label) => { if (id) tags[id] = [...(tags[id]||[]),label]; };
  add(best(item=>item.balanced),"综合推荐");
  add(best(item=>-item.timeMonths),"最快验证");
  add(best(item=>item.futureValue),"最高上限");
  add(best(item=>item.pos+item.confidence),"最低风险");
  add(best(item=>item.capitalEfficiency),"资本效率");
  add(best(item=>item.informationGain),"信息增益");
  return tags;
}

function step3ScenarioCard(scenario, baseline, tags) {
  const delta = (value,base,suffix="") => `${value-base>=0?"+":""}${value-base}${suffix}`;
  return `<button class="scenario-option ${scenario.id===selectedStep3ScenarioId?"selected":""} ${scenario.pareto?"pareto":""}" data-step3-scenario="${scenario.id}"><div class="scenario-option-top"><span>${scenario.type}</span><div>${scenario.pareto?'<b>Pareto</b>':''}${(tags[scenario.id]||[]).map(tag=>`<em>${tag}</em>`).join("")}</div></div><h3>${scenario.name}</h3><p>${scenario.summary}</p><div class="scenario-kpis"><span>PoS <b>${scenario.pos}%</b><small>${delta(scenario.pos,baseline.pos,"pp")}</small></span><span>价值 <b>${scenario.futureValue}</b><small>${delta(scenario.futureValue,baseline.futureValue)}</small></span><span>时间 <b>${scenario.timeMonths}月</b><small>${delta(scenario.timeMonths,baseline.timeMonths,"月")}</small></span><span>成本 <b>${scenario.cost}M</b><small>${delta(scenario.cost,baseline.cost,"M")}</small></span></div></button>`;
}

function renderStep3ModuleCoverage() {
  const module = step3Modules.find(item => item.id === selectedStep3ModuleId) || step3Modules[0];
  const total = step3Modules.reduce((sum,item)=>sum+item.dimensions.length,0);
  return disclosure("查看全部项目调整逻辑", `9个重构模块、${total}个二级维度；默认只展示当前推荐方案。`, `<section class="step3-modules"><div class="logic-heading"><div><p class="eyebrow">STEP 3 计算维度</p><h2>9 个重构模块，${total} 个二级维度</h2><p>模块不是直接相加，而是改变 Scenario 参数并重新计算 PoS、价值、时间、成本、商业寿命和不确定性。</p></div><div class="step3-loop"><b>STEP 2A 基础排序</b><span>快速重构</span><b>STEP 2B 动态重排</b><span>深度优化</span><b>最终决策</b></div></div><div class="dimension-grid step3-module-grid">${step3Modules.map(item=>`<button data-step3-module="${item.id}" class="dimension-card ${item.id===selectedStep3ModuleId?"active":""}"><span>0${item.number}</span><b>${item.name}</b><small>${item.dimensions.length} 个维度</small></button>`).join("")}</div><div class="panel step3-module-detail"><div><p class="eyebrow">模块 ${module.number}</p><h2>${module.name}</h2><p>${module.question}</p></div><div class="module-method"><span>${module.method}</span><code>${module.formula}</code></div><div class="module-dimensions">${module.dimensions.map(name=>`<span>${name}</span>`).join("")}</div></div></section>`);
}

function nextBestExperiment(candidate, scenario) {
  if (candidate.stage === "Preclinical") return { title:"PK/PD + Target Engagement 桥接实验", answer:"验证有效暴露能否驱动目标机制，并缩小人体转化不确定性。", time:"约 12-20 周", impact:"可改变 PoS、剂量策略与首个 PoC 场景", stop:"无法在可耐受暴露下达到预设 TE 阈值" };
  if (candidate.stage === "Phase 1") return { title:"机制标志物富集扩展队列", answer:"确认暴露—TE—生物标志物反应链，并定位潜在 responder。", time:"约 4-8 个月", impact:"可改变患者策略、PoS 与适应症顺序", stop:"目标暴露下未观察到机制一致的 biomarker 变化" };
  return { title:"前瞻性富集人群信号确认研究", answer:`验证“${scenario.name}”是否真正提高效应量并降低试验规模。`, time:"约 6-12 个月", impact:"可改变 PoS、终点设计与下一价值拐点", stop:"富集人群未达到预设方向或最小临床效应" };
}

function renderScenario() {
  const candidate = step2Candidates.find(item => item.id === step3SelectedCandidateId) || step2Candidates[0];
  const scenarios = getStep3ScenariosForCandidate(candidate);
  const baseline = scenarios.find(item=>item.isBaseline);
  const tags = getScenarioObjectiveTags(scenarios);
  const recommendedId = Object.keys(tags).find(id => tags[id].includes("综合推荐")) || scenarios[1].id;
  if (!selectedStep3ScenarioId || !scenarios.some(item=>item.id===selectedStep3ScenarioId)) selectedStep3ScenarioId = recommendedId;
  const selected = scenarios.find(item=>item.id===selectedStep3ScenarioId) || scenarios[1];
  const failureMap = step3FailureMaps[candidate.asset] || step3FailureMaps.BLKR201;
  const experiment = nextBestExperiment(candidate, selected);
  const writebackId = `OPT-${candidate.id}-${selected.id}`;
  const alreadyWritten = Boolean(step3Writebacks[writebackId]);
  const paretoCount = scenarios.filter(item=>item.pareto).length;
  const disabled = step3ControlMode === "auto" ? "disabled" : "";
  root.innerHTML = `<div class="view-heading step3-heading"><div><p class="eyebrow">STEP 3 · Scenario Generator</p><h2>假设场景生成与开发方案优化</h2><p>先分解历史问题，再生成有依据的假设场景。每个场景重新计算核心变量，通过 Pareto 比较后回写 STEP 2；当前为演示输入和拟议公式。</p></div><div class="step3-top-controls"><label><span>分析对象</span><select id="step3-candidate" class="select-box">${step2Candidates.map(item=>`<option value="${item.id}" ${item.id===candidate.id?"selected":""}>${item.asset} · ${item.plan}</option>`).join("")}</select></label><div class="mode-switch"><button data-step3-depth="quick" class="${step3Depth==="quick"?"active":""}">快速重构</button><button data-step3-depth="deep" class="${step3Depth==="deep"?"active":""}">深度优化</button></div><div class="mode-switch"><button data-step3-mode="auto" class="${step3ControlMode==="auto"?"active":""}">系统生成</button><button data-step3-mode="expert" class="${step3ControlMode==="expert"?"active":""}">人工假设</button></div></div></div>${Object.keys(step3Writebacks).length?`<div class="writeback-notice"><b>${Object.keys(step3Writebacks).length} 个优化方案已加入 STEP 2 动态排序</b><button data-view-step2>查看重新排序</button></div>`:""}<div class="step3-principle"><span><b>基准方案保留</b>所有变化均显示相对差值</span><span><b>约束先行</b>生物学、毒性、DDI、监管与 CMC Gate</span><span><b>多目标输出</b>不把 PoS、价值、时间和成本压成黑箱单分</span><span><b>假设可证伪</b>每个场景都有前提、停止规则与下一项实验</span></div><div class="step3-workspace"><aside class="panel step3-control-panel"><div class="candidate-context"><p class="eyebrow">STEP 2 输入</p><h2>${candidate.asset}</h2><p>${candidate.indication} · ${candidate.plan}</p><div><span>PoS <b>${candidate.pos}%</b></span><span>价值 <b>${candidate.futureValue}</b></span><span>时间 <b>${candidate.timeMonths}月</b></span><span>成本 <b>${candidate.cost}M</b></span></div></div><div class="failure-map"><h3>历史失败原因概率图 <em>演示</em></h3>${Object.entries(step3FailureLabels).map(([key,label])=>`<div><label><span>${label}</span><b>${failureMap[key]}%</b></label><i><span style="width:${failureMap[key]}%"></span></i></div>`).join("")}</div><div class="step3-parameters"><h3>${step3ControlMode==="auto"?"系统推断参数":"人工情景参数"}</h3>${[["evidence","证据强度"],["enrichment","患者富集可行性"],["execution","执行效率"],["riskTolerance","风险容忍度"]].map(([key,label])=>`<div class="control-group"><label class="control-label" for="step3-${key}"><span>${label}</span><output id="step3-${key}-output">${step3Params[key]}</output></label><input id="step3-${key}" data-step3-param="${key}" type="range" min="20" max="95" value="${step3Params[key]}" ${disabled}/></div>`).join("")}</div></aside><section class="step3-scenario-area"><div class="summary-strip step3-summary"><div class="panel summary-card" style="--card-color:var(--blue)"><span>生成场景</span><strong>${scenarios.length}</strong><small>${step3Depth==="quick"?"轻量预判":"完整搜索"}</small></div><div class="panel summary-card" style="--card-color:var(--teal)"><span>Pareto 方案</span><strong>${paretoCount}</strong><small>非支配解</small></div><div class="panel summary-card" style="--card-color:var(--amber)"><span>最高信息增益</span><strong>${Math.max(...scenarios.map(item=>item.informationGain))}</strong><small>下一步去风险</small></div><div class="panel summary-card" style="--card-color:var(--red)"><span>关键未知项</span><strong>${candidate.missing}</strong><small>来自 STEP 2</small></div></div><div class="scenario-option-grid">${scenarios.map(item=>step3ScenarioCard(item,baseline,tags)).join("")}</div><div class="panel scenario-inspector"><div class="scenario-inspector-head"><div><p class="eyebrow">当前假设场景</p><h2>${selected.name}</h2><p>${selected.variables.join(" · ")}</p></div><div>${selected.pareto?'<span class="pareto-badge">Pareto 最优集</span>':''}${(tags[selected.id]||[]).map(tag=>`<span class="objective-badge">${tag}</span>`).join("")}</div></div><div class="scenario-inspector-grid"><div><span>核心假设</span><p>${selected.assumption}</p></div><div><span>停止规则</span><p>${selected.stop}</p></div><div><span>风险调整价值</span><strong>${selected.riskAdjustedValue}</strong><small>演示指数</small></div><div><span>资本效率</span><strong>${selected.capitalEfficiency}</strong><small>演示指数</small></div><div><span>商业寿命</span><strong>${selected.commercialLife} 年</strong><small>重算结果</small></div><div><span>置信度</span><strong>${selected.confidence}%</strong><small>独立展示</small></div></div>${selected.isBaseline?'<div class="baseline-note">这是比较基准，不作为优化方案回写。</div>':`<button id="step3-writeback" class="writeback-button" ${alreadyWritten?"disabled":""}>${alreadyWritten?"已作为新情景回写 STEP 2":"将此优化方案加入 STEP 2 重新排序"}</button>`}</div><div class="panel next-experiment"><div><p class="eyebrow">Next Best Experiment</p><h2>${experiment.title}</h2><p>${experiment.answer}</p></div><div><span>预计周期 <b>${experiment.time}</b></span><span>决策影响 <b>${experiment.impact}</b></span><span>停止规则 <b>${experiment.stop}</b></span></div></div></section></div><section class="panel scenario-comparison"><div class="panel-head"><div><h2>场景重新计算对比</h2><p>同一资产的基准方案与假设方案并列比较；所有数值均为演示输入。</p></div><span class="draft-badge">非真实研发结论</span></div><div class="table-wrap"><table><thead><tr><th>场景</th><th>PoS</th><th>未来价值</th><th>时间</th><th>成本</th><th>商业寿命</th><th>资本效率</th><th>置信度</th><th>状态</th></tr></thead><tbody>${scenarios.map(item=>`<tr class="${item.id===selected.id?"selected":""}"><td><strong>${item.name}</strong><small>${item.variables.join(" / ")}</small></td><td>${item.pos}%</td><td>${item.futureValue}</td><td>${item.timeMonths}月</td><td>${item.cost}M</td><td>${item.commercialLife}年</td><td>${item.capitalEfficiency}</td><td>${item.confidence}%</td><td>${item.pareto?"Pareto":"被支配"}</td></tr>`).join("")}</tbody></table></div></section>${renderStep3ModuleCoverage()}`;
  root.insertAdjacentHTML("beforeend", `<section class="pareto-scope"><article class="panel active"><p class="eyebrow">Development Pareto · 当前已实现</p><h2>同一资产的开发方案比较</h2><p>比较 PoS、价值、时间和成本，寻找非支配开发路径。</p><div><span>Scenario A</span><span>Scenario B</span><span>Scenario C</span></div></article><article class="panel"><p class="eyebrow">Competitive Pareto · 下一层</p><h2>本资产与竞品的产品画像比较</h2><p>比较疗效、安全、便利性、患者人群和差异化，判断是否真正推动竞争前沿。</p><div><span>Drug A</span><span>Drug B</span><span>Future SOC</span></div></article></section>`);
  wrapElementInDisclosure(document.querySelector(".scenario-comparison"), "查看所有场景的完整计算对比", "PoS、价值、时间、成本、商业寿命、资本效率与置信度并列比较。", false);
  wrapElementInDisclosure(document.querySelector(".pareto-scope"), "查看Pareto分析范围", "区分同一资产的开发方案比较与未来的竞品画像比较。", false);
  wireStep3(candidate, scenarios, selected, writebackId);
}

function wireStep3(candidate, scenarios, selected, writebackId) {
  document.querySelector("#step3-candidate").addEventListener("change", event => { step3SelectedCandidateId = event.target.value; resetStep3Params(); renderScenario(); });
  document.querySelectorAll("[data-step3-depth]").forEach(button=>button.addEventListener("click",()=>{ step3Depth=button.dataset.step3Depth; selectedStep3ScenarioId=""; renderScenario(); }));
  document.querySelectorAll("[data-step3-mode]").forEach(button=>button.addEventListener("click",()=>{ step3ControlMode=button.dataset.step3Mode; if(step3ControlMode==="auto") resetStep3Params(); renderScenario(); }));
  document.querySelectorAll("[data-step3-param]").forEach(input=>{
    input.addEventListener("input",()=>{ step3Params[input.dataset.step3Param]=+input.value; document.querySelector(`#${input.id}-output`).value=input.value; });
    input.addEventListener("change",()=>renderScenario());
  });
  document.querySelectorAll("[data-step3-scenario]").forEach(button=>button.addEventListener("click",()=>{ selectedStep3ScenarioId=button.dataset.step3Scenario; renderScenario(); }));
  document.querySelectorAll("[data-step3-module]").forEach(button=>button.addEventListener("click",()=>{ selectedStep3ModuleId=button.dataset.step3Module; renderScenario(); }));
  document.querySelectorAll("[data-view-step2]").forEach(button=>button.addEventListener("click",()=>switchView("ranking")));
  const writeback = document.querySelector("#step3-writeback");
  if (writeback) writeback.addEventListener("click",()=>{
    step3Writebacks[writebackId] = {
      id:writebackId, parentId:candidate.id, name:`${selected.name}（STEP 3 优化）`, version:"v0.9-demo",
      values:{ pos:selected.pos, futureValue:selected.futureValue, timeMonths:selected.timeMonths, cost:selected.cost, commercialLife:selected.commercialLife, confidence:selected.confidence, missing:Math.max(1,candidate.missing-2), drivers:[`STEP 3 场景：${selected.name}`,`重算 PoS / 时间 / 成本 / 商业寿命`,`通过 ${selected.variables.join("、")} 形成新开发假设`], unknown:selected.stop }
    };
    selectedStep2Id = writebackId;
    renderScenario();
  });
}

const historicalPredictionHistory = historicalCases.map(item => {
  const cutoff = item.evidenceCutoff.split("（")[0];
  return {
    asset:item.asset.split(" / ")[0],
    version:`BACKTEST-${cutoff.replaceAll("-","")}-${item.id.toUpperCase()}`,
    date:cutoff,
    cutoff,
    model:historicalBacktestModel.version,
    pos:item.backtestResult.point,
    interval:`${item.backtestResult.low}–${item.backtestResult.high}%`,
    recommendation:item.recommendation,
    evidence:item.knownFacts.length,
    unknown:item.question,
    immutable:true
  };
});

const predictionHistory = [
  ...historicalPredictionHistory,
  { asset:"HBM4003", version:"PRED-2026-1005-PILOT-01", date:"2026-10-05", cutoff:"2026-10-05", model:"v0.9-pilot", pos:52, interval:"45–60%", recommendation:"优先验证无肝转移MSS mCRC富集策略", evidence:7, unknown:"小样本非随机结果能否前瞻性重复", immutable:true },
  { asset:"HBM1020", version:"PRED-2026-1005-PILOT-01", date:"2026-10-05", cutoff:"2026-10-05", model:"v0.9-pilot", pos:38, interval:"30–45%", recommendation:"先做HHLA2表达分层的富集扩展", evidence:5, unknown:"疾病稳定能否转化为客观缓解", immutable:true },
  { asset:"Gusacitinib", version:"PRED-2026-0618-V1", date:"2026-06-18", cutoff:"2026-06-15", model:"v0.5-demo", pos:39, interval:"25–54%", recommendation:"补充患者分层证据", evidence:41, unknown:"预测性 biomarker 尚未定义", immutable:true },
  { asset:"Gusacitinib", version:"PRED-2026-0827-V2", date:"2026-08-27", cutoff:"2026-08-25", model:"v0.6-demo", pos:43, interval:"30–57%", recommendation:"进入聚焦尽调", evidence:53, unknown:"剂量与患者亚组的交互", immutable:true },
  { asset:"Gusacitinib", version:"PRED-2026-1005-V3", date:"2026-10-05", cutoff:"2026-10-05", model:"v0.8-demo", pos:46, interval:"34–58%", recommendation:"比较富集 PoC 场景", evidence:68, unknown:"最佳 biomarker 与长期安全窗", immutable:true },
  { asset:"BLKR201", version:"PRED-2026-1005-V1", date:"2026-10-05", cutoff:"2026-10-05", model:"v0.8-demo", pos:38, interval:"22–54%", recommendation:"先验证人体靶点结合", evidence:49, unknown:"人体 Target Engagement", immutable:true },
  { asset:"Sprifermin", version:"PRED-2026-1005-V1", date:"2026-10-05", cutoff:"2026-10-05", model:"v0.8-demo", pos:43, interval:"31–55%", recommendation:"验证结构终点与症状获益连接", evidence:61, unknown:"结构改善的临床可感知性", immutable:true }
];

function renderRegistry() {
  const assetNames = [...new Set(predictionHistory.map(item=>item.asset))];
  const records = predictionHistory.filter(item=>item.asset===registryAsset);
  const latest = records[records.length-1];
  root.innerHTML = `<div class="view-heading"><div><p class="eyebrow">Prediction Version History</p><h2>为什么要保留每一次预测？</h2><p>当前决策始终使用最新证据和最新预测；旧版本只作为只读历史记录保留。新证据出现时，系统生成一个新版本，而不是改写当时的答案，这样才能判断模型当时是否准确，以及结论为什么发生变化。</p></div><span class="draft-badge">当前用最新版本 · 历史版本只读</span></div><div class="registry-toolbar">${assetNames.map(name=>`<button data-registry-asset="${name}" class="${registryAsset===name?"active":""}">${name}</button>`).join("")}</div><section class="panel registry-hero"><div><span>当前资产</span><h2>${registryAsset}</h2><p>${records.length} 个预测版本 · 当前决策使用最新版本 · 最新证据截止 ${latest.cutoff}</p></div><div><span>最新 PoS</span><strong>${latest.pos}%</strong><small>80% 区间 ${latest.interval}</small></div><div><span>当前建议</span><strong>${latest.recommendation}</strong><small>${latest.unknown}</small></div></section><section class="registry-timeline">${records.map((item,index)=>`<article class="panel"><div class="registry-node"><span>${index+1}</span><i></i></div><div class="registry-version"><small>${item.date}</small><h3>${item.version}</h3><p>证据截止 ${item.cutoff} · ${item.model}</p></div><div class="registry-pos"><span>PoS</span><strong>${item.pos}%</strong><small>${item.interval}</small></div><div class="registry-change"><span>关键未知项</span><p>${item.unknown}</p><small>${item.evidence} 条结构化证据</small></div><div class="registry-recommendation"><span>当时建议</span><strong>${item.recommendation}</strong><small>${item.immutable?"历史版本已锁定 · 仅供回看":"草稿"}</small></div></article>`).join("")}</section><section class="panel registry-calibration"><div><p class="eyebrow">如何使用这份记录</p><h2>新证据更新当前判断，旧版本用于回测</h2></div><div><span>01</span><p>预测时保存证据快照与模型版本</p></div><div><span>02</span><p>新证据生成新版本，当前决策自动采用最新版</p></div><div><span>03</span><p>临床结果公布后，比较当时预测与真实结果</p></div><div><span>04</span><p>校准先验、变量、权重和置信区间</p></div><em>3个海外历史案例已接入真实结果，其余仍为结构演示</em></section>`;
  wrapElementInDisclosure(document.querySelector(".registry-timeline"), "查看全部历史预测版本", "旧版本保留当时的证据和结论；最新版本负责支持当前决策。", false);
  document.querySelectorAll("[data-registry-asset]").forEach(button=>button.addEventListener("click",()=>{registryAsset=button.dataset.registryAsset;renderRegistry();}));
}

function renderEvidence() {
  const filtered = evidenceFilter === "ALL" ? evidence : evidence.filter(e => e.tag === evidenceFilter);
  root.innerHTML = `<div class="view-heading"><div><h2>让每一个判断都能回到来源、时间与模型版本</h2><p>事实、案例反推、外部一级来源和扩展逻辑必须分开；低等级来源只能触发研究，不能单独形成淘汰结论。</p></div></div>
    <section class="evidence-lineage panel"><div class="evidence-lineage-head"><div><p class="eyebrow">Evidence Lineage</p><h2>证据怎样进入最终结论</h2></div><span>每一层都保留来源与转换规则</span></div><div class="lineage-flow"><article><span>01</span><b>Raw Evidence</b><small>论文、试验、监管、公司、遗传学</small></article><i></i><article><span>02</span><b>Claim</b><small>抽取可验证的事实主张</small></article><i></i><article><span>03</span><b>Factor</b><small>映射到 Biology、PK、Safety 等变量</small></article><i></i><article><span>04</span><b>Probability</b><small>按阶段和证据质量进入概率模型</small></article><i></i><article><span>05</span><b>Decision</b><small>形成 Gate、排序、情景与下一项实验</small></article></div><div class="lineage-example"><b>示例</b><span>人体遗传学研究</span><em>→</em><span>靶点—疾病因果支持</span><em>→</em><span>Target Validation</span><em>→</em><span>机制节点概率</span><em>→</em><span>PoS 区间</span></div></section>
    <div class="source-policy-grid">${sourcePolicy.map(item => `<article class="panel source-policy-card"><span>${item.tier}</span><div><h3>${item.title}</h3><p>${item.sources}</p><small>${item.use}</small></div></article>`).join("")}</div>
    <div class="evidence-layout"><aside class="panel evidence-filter"><p class="eyebrow">证据标签</p><h2>证据类型</h2>${[["ALL","全部"],["F","[F] Formation 直接公开"],["C","[C] 案例反推"],["P","[P] 外部一级来源"],["E","[E] 扩展逻辑"]].map(([k,v]) => `<button data-filter="${k}" class="${evidenceFilter===k?"active":""}"><span>${v}</span><b>${k==="ALL"?evidence.length:evidence.filter(e=>e.tag===k).length}</b></button>`).join("")}</aside>
      <section class="panel table-wrap"><table class="evidence-table"><thead><tr><th>类型</th><th>对象 / Claim</th><th>来源</th><th>质量</th><th>更新</th></tr></thead><tbody>${filtered.map(e => `<tr><td><span class="source-tag source-${e.tag.toLowerCase()}">[${e.tag}]</span></td><td><strong>${e.asset}</strong><br><span class="audit-note">${e.claim}</span></td><td>${e.source}</td><td>${e.quality}</td><td>${e.updated}</td></tr>`).join("")}</tbody></table></section></div>`;
  wrapElementInDisclosure(document.querySelector(".source-policy-grid"), "查看证据等级规则", "哪些来源可以形成结论，哪些只能触发进一步研究。", false);
  wrapElementInDisclosure(document.querySelector(".evidence-layout"), "查看全部证据记录", "按事实、案例反推、外部来源与扩展逻辑筛选。", false);
  document.querySelectorAll("[data-filter]").forEach(btn => btn.addEventListener("click", () => { evidenceFilter = btn.dataset.filter; renderEvidence(); }));
}

function switchView(view) {
  currentView = view;
  pageTitle.textContent = viewTitles[view];
  pipeline.classList.toggle("pipeline-hidden", !["workspace", "radar"].includes(view));
  document.querySelectorAll(".nav-item").forEach(btn => btn.classList.toggle("active", btn.dataset.view === view));
  document.querySelectorAll(".pipeline-step").forEach(btn => {
    const sectionMatch = !btn.dataset.step2SectionTarget || btn.dataset.step2SectionTarget === step2Section;
    btn.classList.toggle("active", btn.dataset.view === view && sectionMatch);
  });
  ({ workspace: renderWorkspace, cases: renderCaseStudies, radar: renderRadar, recoverability: renderRecoverability, ranking: renderRanking, scenario: renderScenario, registry: renderRegistry, evidence: renderEvidence })[view]();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-view]").forEach(btn => btn.addEventListener("click", () => {
  if (btn.dataset.step2SectionTarget) step2Section = btn.dataset.step2SectionTarget;
  switchView(btn.dataset.view);
}));
document.querySelector("#method-button").addEventListener("click", () => methodDialog.showModal());
methodDialog.addEventListener("click", event => { if (event.target === methodDialog) methodDialog.close(); });

renderWorkspace();

function registerAgentTools() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const lifecycle = new AbortController();
  const register = tool => Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(() => {});

  register({
    name: "navigate_decision_view",
    title: "切换决策视图",
    description: "切换到决策总览、海选池、优先级排序、假设场景实验室或证据审计视图。",
    inputSchema: { type: "object", properties: { view: { type: "string", enum: Object.keys(viewTitles) } }, required: ["view"], additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute(input) {
      if (!input || !viewTitles[input.view]) throw new Error("未知视图");
      switchView(input.view);
      return { view: input.view, title: viewTitles[input.view] };
    }
  });

  register({
    name: "select_asset",
    title: "选择资产",
    description: "在决策总览的资产池中选择一个示例资产并显示其当前判断依据。",
    inputSchema: { type: "object", properties: { assetId: { type: "string" } }, required: ["assetId"], additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute(input) {
      const asset = assets.find(item => item.id === input?.assetId);
      if (!asset) throw new Error("未找到该资产");
      selectedAssetId = asset.id;
      switchView("workspace");
      return { assetId: asset.id, name: asset.name, tier: asset.tier, status: asset.status };
    }
  });

  register({
    name: "configure_scenario",
    title: "运行 STEP 3 假设场景",
    description: "为一个 STEP 2 候选设置快速或深度重构参数，并重新计算假设场景与 Pareto 方案。",
    inputSchema: {
      type: "object",
      properties: {
        candidateId: { type: "string", enum: step2Candidates.map(item=>item.id) },
        depth: { type: "string", enum: ["quick","deep"] },
        evidence: { type: "number", minimum: 20, maximum: 95 },
        enrichment: { type: "number", minimum: 20, maximum: 95 },
        execution: { type: "number", minimum: 20, maximum: 95 },
        riskTolerance: { type: "number", minimum: 20, maximum: 95 }
      },
      required: ["candidateId","depth","evidence","enrichment","execution","riskTolerance"],
      additionalProperties: false
    },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute(input) {
      const candidate = step2Candidates.find(item=>item.id===input?.candidateId);
      if (!candidate || !["quick","deep"].includes(input?.depth)) throw new Error("未知候选资产或优化深度");
      const values = { evidence:input.evidence, enrichment:input.enrichment, execution:input.execution, riskTolerance:input.riskTolerance };
      for (const [key, value] of Object.entries(values)) {
        if (typeof value !== "number" || value < 20 || value > 95) throw new Error(`${key} 超出允许范围`);
      }
      step3SelectedCandidateId = candidate.id;
      step3Depth = input.depth;
      step3ControlMode = "expert";
      step3Params = values;
      switchView("scenario");
      const scenarios = getStep3ScenariosForCandidate(candidate);
      return { view:"scenario", candidate:candidate.id, depth:step3Depth, pareto:scenarios.filter(item=>item.pareto).map(item=>item.name), scenarios:scenarios.map(item=>({ id:item.id, name:item.name, pos:item.pos, value:item.futureValue, time:item.timeMonths, cost:item.cost, confidence:item.confidence })) };
    }
  });

  register({
    name: "run_step1_preset",
    title: "运行 STEP 1 筛选案例",
    description: "载入一个预设案例并运行基础准入、硬性否决、失败诊断和可救性评估规则。",
    inputSchema: { type: "object", properties: { preset: { type: "string", enum: Object.keys(step1Presets) } }, required: ["preset"], additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute(input) {
      if (!input || !step1Presets[input.preset]) throw new Error("未知 STEP 1 案例");
      step1PresetKey = input.preset;
      step1Mode = "auto";
      step1State = cloneStep1(step1Presets[input.preset]);
      switchView("recoverability");
      const result = calculateStep1();
      return { asset: step1State.asset, mode: step1Mode, classification: result.classification, decision: result.decision, recoverability: result.adjusted, priority: result.priority, confidence: result.confidence };
    }
  });

  register({
    name: "run_step2_ranking",
    title: "运行 STEP 2 候选排序",
    description: "按照资源情景和决策视角，对通过海选的资产×适应症×开发方案重新计算优先级。",
    inputSchema: {
      type: "object",
      properties: {
        profile: { type: "string", enum: Object.keys(step2Profiles) },
        lens: { type: "string", enum: Object.keys(step2LensLabels) }
      },
      required: ["profile", "lens"],
      additionalProperties: false
    },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute(input) {
      if (!step2Profiles[input?.profile] || !step2LensLabels[input?.lens]) throw new Error("未知的 STEP 2 情景或排序视角");
      step2ResourceProfile = input.profile;
      step2Lens = input.lens;
      const ranked = step2Candidates.map(calculateStep2).sort((a,b) => b.priority-a.priority);
      selectedStep2Id = ranked[0].id;
      switchView("ranking");
      return { profile: step2Profiles[step2ResourceProfile].label, lens: step2LensLabels[step2Lens], top: ranked.slice(0,3).map(item => ({ candidate:item.id, asset:item.asset, priority:item.priority, tier:item.tier, action:item.action, confidence:item.confidence })) };
    }
  });
}

registerAgentTools();
