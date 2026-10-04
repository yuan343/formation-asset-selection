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

const evidence = [
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
  recoverability: "STEP 1 · 海选池",
  ranking: "STEP 2 · 候选资产分层与优先级排序",
  scenario: "STEP 3 · 假设场景与开发方案优化",
  evidence: "证据与审计"
};

let currentView = "workspace";
let selectedAssetId = assets[0].id;
let selectedStep2Id = "GUSA-FOCUS";
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

const root = document.querySelector("#view-root");
const pageTitle = document.querySelector("#page-title");
const methodDialog = document.querySelector("#method-dialog");

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

function renderWorkspace() {
  const selected = assets.find(a => a.id === selectedAssetId) || assets[0];
  const { ranked, top, recommended, assetRecord, supportingEvidence, experiment } = getDecisionOverviewState();
  const posDelta = recommended.pos - top.pos;
  const timeDelta = recommended.timeMonths - top.timeMonths;
  const topFour = ranked.slice(0,4);
  const lowConfidence = ranked.filter(item => item.confidence < 55);
  const writtenBack = Object.keys(step3Writebacks).length;
  const directEvidenceHTML = supportingEvidence.map(item => overviewEvidenceItem(`[${item.tag}]`, item.claim, "source", `${item.source} · ${item.quality} · ${item.updated}`)).join("");
  root.innerHTML = `<section class="overview-hero panel">
      <div class="overview-hero-main"><div class="overview-kicker"><span>当前决策建议</span><em>演示结论 · 非真实投资建议</em></div><h2>优先推进 ${top.asset} × ${top.plan}</h2><p>在“${step2Profiles[step2ResourceProfile].label} / ${step2LensLabels[step2Lens]}”下排名第 1；系统建议<strong>${top.action}</strong>，并优先验证“${recommended.name}”。</p><div class="overview-actions"><button data-overview-view="ranking" class="primary-button">查看完整排序</button><button data-overview-view="scenario" data-overview-scenario="${top.parentId || top.id}" class="secondary-button">查看方案优化</button></div></div>
      <div class="overview-verdict"><span>最终建议</span><strong>${top.action}</strong><small>${top.confidence >= 70 ? "中高" : top.confidence >= 55 ? "中等" : "偏低"}置信度 · ${top.confidence}%</small><div><b>模型版本</b><em>v0.7-demo</em><b>数据状态</b><em>演示输入</em></div></div>
    </section>
    <div class="overview-kpi-grid"><article class="panel"><span>综合优先级</span><strong>${top.priority}<small>/100</small></strong><p>STEP 2 当前排序第 1</p></article><article class="panel"><span>成功概率</span><strong>${top.pos}<small>%</small></strong><p>按阶段与方案重算</p></article><article class="panel"><span>场景改善</span><strong>${posDelta>=0?"+":""}${posDelta}<small>pp PoS</small></strong><p>时间 ${timeDelta>=0?"+":""}${timeDelta} 月</p></article><article class="panel"><span>证据确定度</span><strong>${top.confidence}<small>%</small></strong><p>${top.missing} 项缺失 · ${top.conflicts} 项冲突</p></article></div>
    <section class="panel decision-chain"><div class="overview-section-head"><div><p class="eyebrow">结论如何形成</p><h2>从事实与假设，逐层走到行动建议</h2></div><span>每一层均可返回原步骤复核</span></div><div class="decision-chain-grid">
      <button data-overview-view="evidence"><i>01</i><span>证据输入</span><strong>${supportingEvidence.length} 条直接关联记录</strong><small>${top.missing} 项缺失 / ${top.conflicts} 项冲突</small></button>
      <button data-overview-view="recoverability"><i>02</i><span>STEP 1 · 是否值得研究</span><strong>${assetRecord?.status || "通过海选"}</strong><small>${top.gate}进入候选池</small></button>
      <button data-overview-view="ranking"><i>03</i><span>STEP 2 · 是否优先投入</span><strong>排名 1 · ${top.priority}/100</strong><small>${top.action}</small></button>
      <button data-overview-view="scenario" data-overview-scenario="${top.parentId || top.id}"><i>04</i><span>STEP 3 · 怎样开发</span><strong>${recommended.name}</strong><small>PoS ${posDelta>=0?"+":""}${posDelta}pp · 时间 ${timeDelta>=0?"+":""}${timeDelta}月</small></button>
      <div class="decision-chain-final"><i>05</i><span>当前结论</span><strong>${top.action}</strong><small>结论随新证据动态更新</small></div>
    </div></section>
    <div class="overview-two-column"><section class="panel portfolio-conclusion"><div class="overview-section-head"><div><p class="eyebrow">组合资源建议</p><h2>有限资源先投向哪里</h2></div><button data-overview-view="ranking" class="text-button">完整排序</button></div><div class="portfolio-list">${topFour.map((item,index)=>`<button data-overview-candidate="${item.id}"><span class="portfolio-rank">${index+1}</span><span class="portfolio-asset"><strong>${item.asset}</strong><small>${item.plan}</small></span><span class="portfolio-action"><b>${item.action}</b><small>${item.tier} · ${item.priority}/100</small></span><span class="portfolio-confidence"><b>${item.confidence}%</b><small>置信度</small></span></button>`).join("")}</div>${lowConfidence.length?`<div class="portfolio-note"><b>${lowConfidence.length} 个候选结论置信度偏低</b><span>先补决定性证据，避免把信息不足误判为潜力不足。</span></div>`:""}</section>
      <section class="panel evidence-support"><div class="overview-section-head"><div><p class="eyebrow">结论与证据支持</p><h2>事实、计算与假设分开</h2></div><button data-overview-view="evidence" class="text-button">证据审计</button></div><ul>${directEvidenceHTML}${overviewEvidenceItem("计算", `${top.asset} 在当前资源情景下排名第 1，综合优先级 ${top.priority}/100。`, "model", `STEP 2 · 置信度 ${top.confidence}%`)}${overviewEvidenceItem("假设", `${recommended.assumption}`, "assumption", `STEP 3 · 必须通过下一项实验验证`)}</ul></section></div>
    <div class="overview-two-column"><section class="panel uncertainty-panel"><div class="overview-section-head"><div><p class="eyebrow">不确定性与反对证据</p><h2>什么可能改变当前结论</h2></div><span>不是结论脚注，而是决策条件</span></div><div class="uncertainty-grid"><article><span>最关键未知项</span><strong>${top.unknown}</strong></article><article><span>当前数据缺口</span><strong>${top.missing} 项缺失、${top.conflicts} 项冲突；真实数据接入后需重新计算。</strong></article><article><span>停止条件</span><strong>${recommended.stop}</strong></article></div></section>
      <section class="panel next-decision-action"><p class="eyebrow">下一步行动</p><h2>${experiment.title}</h2><p>${experiment.answer}</p><div><span><b>预计周期</b>${experiment.time}</span><span><b>决策影响</b>${experiment.impact}</span><span><b>停止规则</b>${experiment.stop}</span></div><button data-overview-view="scenario" data-overview-scenario="${top.parentId || top.id}" class="secondary-button">查看场景与实验依据</button></section></div>
    <section class="asset-pool-section"><div class="overview-section-head"><div><p class="eyebrow">向下查看资产</p><h2>海选资产池与当前判断</h2></div><span>${writtenBack ? `${writtenBack} 个 STEP 3 方案已回写排序` : "点击资产查看海选依据"}</span></div><div class="workspace-grid"><section class="panel"><div class="panel-head"><div><h2>全部演示资产</h2><p>逐项复核当前海选判断</p></div><div class="filter-row"><input id="asset-search" class="search-box" type="search" placeholder="搜索资产或靶点" aria-label="搜索资产或靶点" /><select id="stage-filter" class="select-box" aria-label="按阶段筛选"><option value="ALL">全部阶段</option><option>Preclinical</option><option>Phase 1</option><option>Phase 2</option></select></div></div><div id="asset-table-root">${assetTable()}</div></section>${detailPanel(selected)}</div></section>`;
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
  search.addEventListener("input", refresh); stage.addEventListener("change", refresh); wireAssetRows();
  document.querySelectorAll("[data-overview-view]").forEach(button => button.addEventListener("click", () => {
    if (button.dataset.overviewScenario) {
      step3SelectedCandidateId = button.dataset.overviewScenario;
      step3Depth = "quick";
      resetStep3Params();
    }
    switchView(button.dataset.overviewView);
  }));
  document.querySelectorAll("[data-overview-candidate]").forEach(button => button.addEventListener("click", () => {
    selectedStep2Id = button.dataset.overviewCandidate;
    switchView("ranking");
  }));
}

function wireAssetRows() {
  document.querySelectorAll("[data-asset]").forEach(row => {
    const select = () => { selectedAssetId = row.dataset.asset; renderWorkspace(); };
    row.addEventListener("click", select);
    row.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") select(); });
  });
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
  wireStep1Engine();
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
  { id:"BLKR-EXPAND", asset:"BLKR201", indication:"CNS 适应症 B", plan:"新适应症扩展", stage:"Phase 1", pos:31, futureValue:91, timeMonths:26, cost:46, commercialLife:12.1, strategic:84, confidence:49, stability:45, missing:9, conflicts:0, gate:"通过", drivers:["未来市场与未满足需求较高","特殊分子属性可能适配新疾病场景","具备平台数据复用空间"], unknown:"疾病相关性证据仍偏早期，排序对关键假设高度敏感。", template:"Phase 1：PK/PD、靶点结合与安全窗优先" }
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
  const action = candidate.confidence < 55 ? "先补关键证据" : priority >= 72 ? "优先投入" : priority >= 65 ? "进入重点尽调" : priority >= 58 ? "先解除一个关键风险" : "持续观察";
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
  return `<section class="logic-dictionary"><div class="logic-heading"><div><p class="eyebrow">完整逻辑覆盖</p><h2>9 个维度组织知识，73 条二级逻辑进入计算层</h2><p>九个维度不会直接相加；底层证据先转成 PoS、价值、时间、成本、商业寿命、战略价值和不确定性，再进入 Gate、价值模型和资源配置。</p></div><div class="logic-type-strip"><span><b>直接计算</b>数字、日期与 benchmark</span><span><b>规则引擎</b>阈值、Gate 与分层</span><span><b>预测模型</b>PoS、市场、入组与未来 SOC</span><span><b>专家判断</b>无法可靠形式化的事项</span></div></div><div class="dimension-grid">${step2Dimensions.map(item => `<button data-step2-dimension="${item.id}" class="dimension-card ${item.id===selectedDimensionId?"active":""}"><span>0${item.number}</span><b>${item.name}</b><small>${item.metrics.length} 条逻辑</small></button>`).join("")}</div><div class="dimension-detail panel"><div class="dimension-detail-head"><div><p class="eyebrow">维度 ${dimension.number}</p><h2>${dimension.name}</h2><p>${dimension.question}</p></div><span>${dimension.metrics.length} / ${dimension.metrics.length} 已纳入</span></div><div class="table-wrap"><table class="logic-table"><thead><tr><th>二级维度</th><th>处理方式</th><th>影响的核心变量</th><th>来源</th><th>公式状态</th></tr></thead><tbody>${dimension.metrics.map(metric => `<tr><td><strong>${metric.name}</strong></td><td>${metric.logic}</td><td>${metric.core}</td><td>${metric.origin}</td><td>${metric.status}</td></tr>`).join("")}</tbody></table></div></div><details class="panel formula-library"><summary><span><b>核心公式与结构式</b><small>共 ${step2Formulae.length} 条；明确区分行业方法与拟议公式</small></span><em>展开查看</em></summary><div class="formula-grid">${step2Formulae.map(([name,formula,status])=>`<article><b>${name}</b><code>${formula}</code><small>${status}</small></article>`).join("")}</div></details></section>`;
}

function renderRanking() {
  const candidatePool = getStep2CandidatePool();
  const calculated = candidatePool.map(calculateStep2).sort((a,b) => b.priority-a.priority);
  const selected = calculated.find(item => item.id === selectedStep2Id) || calculated[0];
  const uniqueAssets = new Set(candidatePool.map(item => item.asset)).size;
  root.innerHTML = `<div class="view-heading step2-heading"><div><p class="eyebrow">STEP 2 · Selection Engine</p><h2>都可能做，但有限资源应该先投谁？</h2><p>只接收 STEP 1 通过项，以“资产 × 适应症 × 开发方案”为计算单位。Formation 成功案例只用于提炼逻辑与回测，不直接作为候选资产的评分或排名。</p></div><div class="step2-controls"><label><span>资源情景</span><select id="step2-profile" class="select-box">${Object.entries(step2Profiles).map(([key,item])=>`<option value="${key}" ${key===step2ResourceProfile?"selected":""}>${item.label}</option>`).join("")}</select></label><div class="metric-tabs">${Object.entries(step2LensLabels).map(([key,label])=>`<button data-step2-lens="${key}" class="metric-tab ${key===step2Lens?"active":""}">${label}</button>`).join("")}</div></div></div><div class="step2-principle"><b>不做九维简单加总</b><span>Gate / Hard Constraint → 核心价值模型 → 战略修正 → 置信度与稳健性独立展示</span><em>Formation 案例 = 回测锚点，不是官方算法</em></div><div class="summary-strip step2-summary"><div class="panel summary-card" style="--card-color:var(--teal)"><span>候选开发情景</span><strong>${calculated.length}</strong><small>来自 ${uniqueAssets} 个通过海选资产</small></div><div class="panel summary-card" style="--card-color:var(--blue)"><span>Tier 1</span><strong>${calculated.filter(item=>item.tier==="Tier 1").length}</strong><small>当前资源情景</small></div><div class="panel summary-card" style="--card-color:var(--amber)"><span>逻辑覆盖</span><strong>73 / 73</strong><small>九个一级维度</small></div><div class="panel summary-card" style="--card-color:var(--red)"><span>低置信候选</span><strong>${calculated.filter(item=>item.confidence<55).length}</strong><small>优先补充决定性证据</small></div></div><div class="step2-layout"><section class="panel"><div class="panel-head"><div><h2>${step2LensLabels[step2Lens]}排序</h2><p>${step2Profiles[step2ResourceProfile].note}；置信度不被隐藏进总分。</p></div><span class="draft-badge">案例化演示 · 非真实数据</span></div>${renderStep2RankingTable(calculated)}</section>${renderStep2Detail(selected)}</div>${renderLogicDictionary()}`;
  document.querySelector("#step2-profile").addEventListener("change", event => { step2ResourceProfile = event.target.value; renderRanking(); });
  document.querySelectorAll("[data-step2-lens]").forEach(button => button.addEventListener("click", () => { step2Lens = button.dataset.step2Lens; renderRanking(); }));
  document.querySelectorAll("[data-step2-candidate]").forEach(row => {
    const select = () => { selectedStep2Id = row.dataset.step2Candidate; renderRanking(); };
    row.addEventListener("click", select); row.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") select(); });
  });
  document.querySelectorAll("[data-step2-dimension]").forEach(button => button.addEventListener("click", () => { selectedDimensionId = button.dataset.step2Dimension; renderRanking(); }));
  document.querySelectorAll("[data-open-step3]").forEach(button => button.addEventListener("click", () => {
    step3SelectedCandidateId = button.dataset.openStep3;
    step3Depth = "quick";
    resetStep3Params();
    switchView("scenario");
  }));
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
  "anti-CD226":{ biology:34,molecule:20,pk:38,targetEngagement:55,dose:48,patient:62,endpoint:44,heterogeneity:60,trial:36,operational:22 }
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
  return `<section class="step3-modules"><div class="logic-heading"><div><p class="eyebrow">STEP 3 计算维度</p><h2>9 个重构模块，${total} 个二级维度</h2><p>模块不是直接相加，而是改变 Scenario 参数并重新计算 PoS、价值、时间、成本、商业寿命和不确定性。</p></div><div class="step3-loop"><b>STEP 2A 基础排序</b><span>快速重构</span><b>STEP 2B 动态重排</b><span>深度优化</span><b>最终决策</b></div></div><div class="dimension-grid step3-module-grid">${step3Modules.map(item=>`<button data-step3-module="${item.id}" class="dimension-card ${item.id===selectedStep3ModuleId?"active":""}"><span>0${item.number}</span><b>${item.name}</b><small>${item.dimensions.length} 个维度</small></button>`).join("")}</div><div class="panel step3-module-detail"><div><p class="eyebrow">模块 ${module.number}</p><h2>${module.name}</h2><p>${module.question}</p></div><div class="module-method"><span>${module.method}</span><code>${module.formula}</code></div><div class="module-dimensions">${module.dimensions.map(name=>`<span>${name}</span>`).join("")}</div></div></section>`;
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
      id:writebackId, parentId:candidate.id, name:`${selected.name}（STEP 3 优化）`, version:"v0.7-demo",
      values:{ pos:selected.pos, futureValue:selected.futureValue, timeMonths:selected.timeMonths, cost:selected.cost, commercialLife:selected.commercialLife, confidence:selected.confidence, missing:Math.max(1,candidate.missing-2), drivers:[`STEP 3 场景：${selected.name}`,`重算 PoS / 时间 / 成本 / 商业寿命`,`通过 ${selected.variables.join("、")} 形成新开发假设`], unknown:selected.stop }
    };
    selectedStep2Id = writebackId;
    renderScenario();
  });
}

function renderEvidence() {
  const filtered = evidenceFilter === "ALL" ? evidence : evidence.filter(e => e.tag === evidenceFilter);
  root.innerHTML = `<div class="view-heading"><div><h2>让每一个判断都能回到来源、时间与模型版本</h2><p>事实、案例反推、外部一级来源和扩展逻辑必须分开；低等级来源只能触发研究，不能单独形成淘汰结论。</p></div></div>
    <div class="source-policy-grid">${sourcePolicy.map(item => `<article class="panel source-policy-card"><span>${item.tier}</span><div><h3>${item.title}</h3><p>${item.sources}</p><small>${item.use}</small></div></article>`).join("")}</div>
    <div class="evidence-layout"><aside class="panel evidence-filter"><p class="eyebrow">证据标签</p><h2>证据类型</h2>${[["ALL","全部"],["F","[F] Formation 直接公开"],["C","[C] 案例反推"],["P","[P] 外部一级来源"],["E","[E] 扩展逻辑"]].map(([k,v]) => `<button data-filter="${k}" class="${evidenceFilter===k?"active":""}"><span>${v}</span><b>${k==="ALL"?evidence.length:evidence.filter(e=>e.tag===k).length}</b></button>`).join("")}</aside>
      <section class="panel table-wrap"><table class="evidence-table"><thead><tr><th>类型</th><th>对象 / Claim</th><th>来源</th><th>质量</th><th>更新</th></tr></thead><tbody>${filtered.map(e => `<tr><td><span class="source-tag source-${e.tag.toLowerCase()}">[${e.tag}]</span></td><td><strong>${e.asset}</strong><br><span class="audit-note">${e.claim}</span></td><td>${e.source}</td><td>${e.quality}</td><td>${e.updated}</td></tr>`).join("")}</tbody></table></section></div>`;
  document.querySelectorAll("[data-filter]").forEach(btn => btn.addEventListener("click", () => { evidenceFilter = btn.dataset.filter; renderEvidence(); }));
}

function switchView(view) {
  currentView = view;
  pageTitle.textContent = viewTitles[view];
  document.querySelectorAll(".nav-item").forEach(btn => btn.classList.toggle("active", btn.dataset.view === view));
  document.querySelectorAll(".pipeline-step").forEach(btn => btn.classList.toggle("active", btn.dataset.view === view));
  ({ workspace: renderWorkspace, recoverability: renderRecoverability, ranking: renderRanking, scenario: renderScenario, evidence: renderEvidence })[view]();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-view]").forEach(btn => btn.addEventListener("click", () => switchView(btn.dataset.view)));
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
