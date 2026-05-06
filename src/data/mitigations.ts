export interface Mitigation {
  code: string; name: string; group: string; purpose: string; firstFive: boolean;
}

export const mitigations: Mitigation[] = [
  {
    "code": "PL1",
    "name": "Contract Renegotiation",
    "group": "PL",
    "purpose": "Renegotiate SLAs and contracts affected by agent deployment with probabilistic compliance provisions.",
    "firstFive": false
  },
  {
    "code": "PL2",
    "name": "Measurable Attributes in Contracts",
    "group": "PL",
    "purpose": "Model card conformance, capability boundaries, RAG provenance guarantees, right-to-audit clauses.",
    "firstFive": false
  },
  {
    "code": "PL3",
    "name": "Understand Employee Sentiment",
    "group": "PL",
    "purpose": "Segment employees by AI attitude profiles; staff agent projects with AI-positive employees.",
    "firstFive": false
  },
  {
    "code": "PL4",
    "name": "Agent Use-Case Inventory & Risk Tiering",
    "group": "PL",
    "purpose": "Pre-deployment inventory classified by autonomy and consequence. First Five #1.",
    "firstFive": true
  },
  {
    "code": "PL5",
    "name": "Red-Teaming & Adversarial Readiness",
    "group": "PL",
    "purpose": "Structured adversarial testing before deployment. First Five #4.",
    "firstFive": true
  },
  {
    "code": "PL6",
    "name": "Agent Boundary & Scope-of-Authority",
    "group": "PL",
    "purpose": "Tool permissions, monetary/action thresholds, forbidden action categories, max chain length.",
    "firstFive": false
  },
  {
    "code": "PL7",
    "name": "Supply Chain & Dependency Assessment",
    "group": "PL",
    "purpose": "Map third-party dependencies; assess data provenance, model lifecycle, geopolitical hosting, cascade risk.",
    "firstFive": false
  },
  {
    "code": "PL8",
    "name": "AI Literacy & Supervisory Training",
    "group": "PL",
    "purpose": "Train employees: confidence scores, hallucinations, overrides, trust calibration. First Five #2.",
    "firstFive": true
  },
  {
    "code": "PL9",
    "name": "Societal Impact Assessment",
    "group": "PL",
    "purpose": "Pre-deployment assessment of labor displacement, concentration risk, environmental cost.",
    "firstFive": false
  },
  {
    "code": "PL10",
    "name": "Safety Investment & Competition Balance",
    "group": "PL",
    "purpose": "Safety-speed tradeoffs with minimum safety baselines and organizational accountability.",
    "firstFive": false
  },
  {
    "code": "PL11",
    "name": "Agent Skill Vetting & Tool Registry",
    "group": "PL",
    "purpose": "Pre-approval: vulnerability scanning, permission audit, provenance verification, registry governance.",
    "firstFive": false
  },
  {
    "code": "SE1",
    "name": "Explainable & Interpretable Agent Decisions",
    "group": "SE",
    "purpose": "Chain-of-thought transparency, retrieval provenance, tool-call audit trails, citation-grounded explanations.",
    "firstFive": false
  },
  {
    "code": "SE2",
    "name": "Model Alignment & Safety Engineering",
    "group": "SE",
    "purpose": "Fine-tuning for harmlessness (RLHF/DPO), constitutional AI, refusal training, safety classifiers.",
    "firstFive": false
  },
  {
    "code": "SE3",
    "name": "Guardrails & Content Safety Controls",
    "group": "SE",
    "purpose": "Prompt injection detection, jailbreak classifiers, toxicity filters, PII leakage prevention, output sanitization.",
    "firstFive": false
  },
  {
    "code": "SE4",
    "name": "RAG Integrity & Retrieval Quality",
    "group": "SE",
    "purpose": "Document freshness verification, source authority weighting, adversarial document detection, citation enforcement.",
    "firstFive": false
  },
  {
    "code": "SE5",
    "name": "Agent Tool Access Control & Capability Gating",
    "group": "SE",
    "purpose": "Capability-based access tokens, rate limiting, cumulative action budgets, dynamic de-authorization.",
    "firstFive": false
  },
  {
    "code": "SE6",
    "name": "Multi-Agent Coordination",
    "group": "SE",
    "purpose": "Cryptographic agent identity, inter-agent encryption, consensus mechanisms, deadlock detection.",
    "firstFive": false
  },
  {
    "code": "SE7",
    "name": "Confabulation Detection & Faithfulness",
    "group": "SE",
    "purpose": "Semantic entailment checking, factuality verification, consistency validation, citation accuracy auditing.",
    "firstFive": false
  },
  {
    "code": "HI1",
    "name": "Human-in-the-Loop",
    "group": "HI",
    "purpose": "Human approval gates for high-consequence actions, human review of multi-turn trajectories. First Five #5.",
    "firstFive": true
  },
  {
    "code": "HI2",
    "name": "Confidence & Risk-Weighted Thresholding",
    "group": "HI",
    "purpose": "Multi-dimensional thresholds: confidence, tool-action severity, unfamiliar-input detection, cumulative trust.",
    "firstFive": false
  },
  {
    "code": "HI3",
    "name": "Runtime Agent Intervention Controls",
    "group": "HI",
    "purpose": "Kill-switch per session, dynamic tool de-authorization mid-workflow, human takeover with full context replay.",
    "firstFive": false
  },
  {
    "code": "HI4",
    "name": "Risk-Weighted Escalation Triggers",
    "group": "HI",
    "purpose": "Dynamic escalation based on action risk, uncertainty, novelty, cost. Silent logging to workflow pause.",
    "firstFive": false
  },
  {
    "code": "HI5",
    "name": "Operator Override Rights & Recourse",
    "group": "HI",
    "purpose": "Single-action override, structured agent feedback, dispute lodging. Required by EU AI Act Art. 14(5).",
    "firstFive": false
  },
  {
    "code": "HI6",
    "name": "Agent Intent Communication",
    "group": "HI",
    "purpose": "Progress indicators, planned tool call previews, natural-language rationales, explicit uncertainty signals.",
    "firstFive": false
  },
  {
    "code": "HI7",
    "name": "HITL Effectiveness Monitoring",
    "group": "HI",
    "purpose": "Track override rates, time-to-review, agreement/disagreement, rubber-stamping detection, fatigue indicators.",
    "firstFive": false
  },
  {
    "code": "OG1",
    "name": "Continuous Agent Improvement",
    "group": "OG",
    "purpose": "Automated fine-tuning from human feedback logs gated behind approval. A/B testing of updates.",
    "firstFive": false
  },
  {
    "code": "OG2",
    "name": "Avoid Self-learning",
    "group": "OG",
    "purpose": "Maintain human approval gates before model or capability updates in high-risk agent workflows.",
    "firstFive": false
  },
  {
    "code": "OG3",
    "name": "Agentic AI Governance",
    "group": "OG",
    "purpose": "Agent lifecycle management, cross-org interaction policies, compliance mapping. First Five #3.",
    "firstFive": true
  },
  {
    "code": "OG4",
    "name": "Data & Retrieval Pipeline Monitoring",
    "group": "OG",
    "purpose": "Vector DB drift detection, document freshness scoring, adversarial document injection detection, data lineage.",
    "firstFive": false
  },
  {
    "code": "OG5",
    "name": "Agent Performance & Safety Monitoring",
    "group": "OG",
    "purpose": "Task completion rates, hallucination rates, guardrail trigger trends, latency, trajectory anomaly detection.",
    "firstFive": false
  },
  {
    "code": "OG6",
    "name": "Staged Deployments",
    "group": "OG",
    "purpose": "Canary/blue-green testing for agent systems with agent-specific metrics: error rates, confabulation rate diffs.",
    "firstFive": false
  },
  {
    "code": "OG7",
    "name": "Agent Incident Response & Recovery",
    "group": "OG",
    "purpose": "Playbooks for unauthorized actions, injection incidents, escalation loops. Post-incident trajectory forensic analysis.",
    "firstFive": false
  },
  {
    "code": "OG8",
    "name": "Testing, Auditing & Continuous Red-Teaming",
    "group": "OG",
    "purpose": "Continuous pre/post-deployment adversarial testing, jailbreak regression, tool-abuse simulation, independent audits.",
    "firstFive": false
  },
  {
    "code": "OG9",
    "name": "Agent Access & Identity Management",
    "group": "OG",
    "purpose": "Unique agent service accounts, least-privilege access, credential rotation, auditable invocation logging.",
    "firstFive": false
  },
  {
    "code": "OG10",
    "name": "Model & Agent Deprecation Management",
    "group": "OG",
    "purpose": "Advance notice periods, migration paths, regression testing on new model versions, decision log archival.",
    "firstFive": false
  },
  {
    "code": "OG11",
    "name": "Agent Safety Decision Frameworks",
    "group": "OG",
    "purpose": "Structured criteria for action approval, max autonomy depth, do-not-automate tasks, precautionary pause triggers.",
    "firstFive": false
  },
  {
    "code": "OG12",
    "name": "Agent Cost Monitoring & Resource Quotas",
    "group": "OG",
    "purpose": "Per-agent/session budgets, token/call/compute limits, cost tracking by workflow, automated circuit-breakers.",
    "firstFive": false
  },
  {
    "code": "OG13",
    "name": "Agent Population Inventory & Sprawl Detection",
    "group": "OG",
    "purpose": "Continuous inventory, ownership tracking, purpose, authorization scope, dependency chain. Sprawl detection.",
    "firstFive": false
  },
  {
    "code": "OG14",
    "name": "Multi-Agent Coordination Auditing",
    "group": "OG",
    "purpose": "Monitor covert coordination, cross-agent hallucination amplification, reasoning collapse, benign goal drift.",
    "firstFive": false
  },
  {
    "code": "EX1",
    "name": "Industry Consortium & Standards Body",
    "group": "EX",
    "purpose": "Active participation in agent safety standards, shared testing infrastructure, cross-industry coordination.",
    "firstFive": false
  },
  {
    "code": "EX2",
    "name": "Regulatory Engagement & Horizon Scanning",
    "group": "EX",
    "purpose": "Proactive engagement with emerging AI regulation, legislative monitoring, regulatory consultation.",
    "firstFive": false
  },
  {
    "code": "EX3",
    "name": "Systemic Impact Assessment & Disclosure",
    "group": "EX",
    "purpose": "Assessment of contribution to systemic risks: environmental footprint, info pollution, labor market effects.",
    "firstFive": false
  },
  {
    "code": "EX4",
    "name": "Scenario Planning for Long-Range Trajectories",
    "group": "EX",
    "purpose": "Structured futures analysis: concentration of power, information degradation, dual-use proliferation.",
    "firstFive": false
  },
  {
    "code": "EX5",
    "name": "Dual-Use Capability Monitoring",
    "group": "EX",
    "purpose": "Tracking dual-use emergence, capability jump monitoring, collaboration with frontier safety organizations.",
    "firstFive": false
  }
];

export const mitigationsByCode: Record<string, Mitigation> = {};
mitigations.forEach(m => { mitigationsByCode[m.code] = m; });

export const groupNames: Record<string, string> = {
  PL: "Planning & Due Diligence",
  SE: "Safety Engineering & Guardrails",
  HI: "Human-Agent Interaction",
  OG: "Operations & Governance",
  EX: "External Engagement",
};