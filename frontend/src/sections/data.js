/**
 * data.js — static portfolio content.
 *
 * Pulled verbatim from the original Portfolio.jsx so visual content is
 * unchanged. Keeping it in a single module lets Vite tree-shake unused
 * fields and lets every section import only what it needs without spinning
 * up a separate render of the whole composition.
 *
 * IMPORTANT: icons are imported lazily-loadable shapes — keep them tree-shaken.
 */
import {
  BrainCircuit, Bot, GraduationCap, Rocket, Cpu, Sparkles,
  BriefcaseBusiness, Network, BarChart3, MonitorSmartphone, Target,
  BadgeCheck, Database, Cloud, Code2, ScanEye, Workflow, Zap,
  Container as ContainerIcon, Gamepad2,
} from "lucide-react";

export const HERO_SKILLS = [
  "Python", "FastAPI", "LLMs", "RAG", "LangChain", "Docker",
  "NLP", "Vector DBs", "GitHub", "Deployment",
];

export const HERO_CARDS = [
  { icon: BrainCircuit, label: "Specialty", value: "AI Systems", sub: "End-to-end AI pipelines" },
  { icon: Bot, label: "AI Engineering", value: "Gen AI Apps", sub: "LLMs · RAG · APIs", accent: true },
  { icon: GraduationCap, label: "Degree", value: "BCA — AI & DS", sub: "Expected 2028" },
  { icon: Rocket, label: "Status", value: "Open to Work", sub: "Full-time · Contract · Freelance", accent: true },
];

export const ABOUT_CARDS = [
  { icon: BrainCircuit, title: "AI Mission",
    body: "Building intelligent ML and Gen AI systems that transform raw data into scalable automation, intelligent decision-making, and measurable business impact." },
  { icon: Cpu, title: "Engineering Approach",
    body: "End-to-end AI engineering — from data pipelines and feature engineering to LLM workflows, RAG systems, deployment, monitoring, and production-ready intelligent applications." },
  { icon: Sparkles, title: "Gen AI Focus",
    body: "Exploring modern AI systems including LLM applications, AI agents, MCP workflows, prompt engineering, vector databases, and scalable Gen AI architectures." },
  { icon: BriefcaseBusiness, title: "Business-Driven AI",
    body: "Every system I build is designed around business outcomes — reducing manual effort, improving operational efficiency, automating workflows, and enabling smarter decisions through AI." },
];

export const ABOUT_STATS = [
  { num: "~1yr", label: "Hands-on Experience" },
  { num: "5+",   label: "Deployed Projects" },
  { num: "8+",   label: "Certifications" },
  { num: "2",    label: "Internships" },
];

export const TECH_PILLS = [
  "Python", "SQL", "Machine Learning", "Deep Learning", "LLMs", "RAG",
  "LangChain", "FastAPI", "Streamlit", "Docker", "HuggingFace", "Vector DBs",
  "Transformers", "Prompt Engineering",
];

export const CAPABILITIES = [
  { icon: BrainCircuit, title: "Machine Learning Systems",
    desc: "End-to-end ML pipelines including feature engineering, model training, explainability, evaluation, deployment, and intelligent decision systems." },
  { icon: Sparkles, title: "Gen AI Applications",
    desc: "Building LLM-powered applications, AI copilots, conversational systems, and intelligent workflows using modern Generative AI frameworks." },
  { icon: Bot, title: "AI Automation Systems",
    desc: "Automating business workflows using Python, APIs, AI agents, and intelligent pipelines that reduce repetitive manual operations." },
  { icon: Network, title: "RAG & AI Agents",
    desc: "Retrieval-Augmented Generation systems, vector database workflows, memory-enabled agents, and context-aware intelligent applications." },
  { icon: BarChart3, title: "Predictive Intelligence",
    desc: "Forecasting, classification, churn prediction, and intelligent scoring systems powered by ensemble learning and advanced ML algorithms." },
  { icon: MonitorSmartphone, title: "LLM-Powered Tools",
    desc: "LLM-powered tools and conversational AI applications leveraging HuggingFace, APIs, and modern prompt engineering." },
  { icon: Target, title: "Recommendation Systems",
    desc: "Personalized recommendation engines using embeddings, NLP, similarity search, collaborative filtering, and intelligent ranking systems." },
  { icon: Cpu, title: "Modern AI Engineering",
    desc: "Exploring LLMOps, prompt engineering, deployment pipelines, Dockerized AI systems, and scalable Gen AI architectures." },
];

export const PROJECTS_LARGE = [
  {
    number: "01 · Recommendation Engine",
    title: "Movies & Games",
    titleAccent: "Recommendation Engine",
    problem: "Users drowning in OTT and gaming options experience decision fatigue, leading to drop-off and reduced platform engagement.",
    impact: "Built a content-based NLP engine using cosine similarity and fuzzy matching, integrated with TMDB + RAWG APIs, delivering personalized suggestions with posters, ratings, and links in an interactive Streamlit app. Simplified content discovery and extended session duration.",
    stack: ["Python","NLP","Scikit-learn","FuzzyWuzzy","TMDB API","RAWG API","Streamlit"],
    live: "https://movies-games-recommendation-engine.streamlit.app/",
    github: "https://github.com/hoshangsheth/Movies-Games-Recommendation-Engine",
    domain: "movies-games-rec.streamlit.app",
    mockup: {
      type: "rec",
      rows: [
        { label: "🎬  Interstellar →", value: "Inception, The Martian" },
        { label: "🎮  Cyberpunk 2077 →", value: "Deus Ex, Witcher 3" },
      ],
      bars: [
        { w: "75%", amber: true, strong: true },
        { w: "55%" },
        { w: "85%", amber: true },
      ],
    },
  },
  {
    number: "02 · Fintech AI",
    title: "Smart Loan Risk &",
    titleAccent: "Recovery System",
    problem: "Lenders relying on manual heuristics for identifying high-risk borrowers experienced delayed recovery actions and poor prioritization.",
    impact: "Dual AI architecture: KMeans clustering segments borrowers by financial behavior, XGBoost predicts default probability. SHAP explainability + automated PDF reports per borrower. Enables proactive risk management and prioritized recovery operations.",
    stack: ["XGBoost","KMeans","SHAP","Pandas","Streamlit","PDF Generation"],
    live: "https://smart-loan-recovery-system.streamlit.app/",
    github: "https://github.com/hoshangsheth/Smart-Loan-Recovery-System",
    domain: "smart-loan-recovery.streamlit.app",
    mockup: {
      type: "loan",
      rows: [
        { label: "⚠ Default Risk", value: "82% High Risk", rust: true },
        { label: "📊  SHAP Score", value: "+0.43 DTI Ratio" },
        { label: "🎯  Segment", value: "Cluster 3 — Recovery" },
      ],
      footer: "Auto-generated PDF Report ✓",
    },
  },
  {
    number: "03 · Customer Intelligence",
    title: "Customer Segmentation",
    titleAccent: "& Profiling System",
    problem: "A retail brand treating its entire customer base uniformly resulted in poor campaign ROI, low engagement, and rising churn rates.",
    impact: "KMeans clustering on purchasing behavior and demographic data revealed 5 distinct customer segments each profiled with targeted marketing recommendations. Enabled smarter campaigns, improved conversion rates, and better retention strategies.",
    stack: ["KMeans","Pandas","Scikit-learn","Seaborn","Matplotlib","Streamlit"],
    live: "https://customers-profiling.streamlit.app/",
    github: "https://github.com/hoshangsheth/customer-segmentation-kmeans",
    domain: "customers-profiling.streamlit.app",
    mockup: {
      type: "segments",
      chips: [
        { label: "Cluster 0 · High Value", amber: true },
        { label: "Cluster 1 · At-Risk", custom: { background: "rgba(232,115,74,0.10)", borderColor: "rgba(232,115,74,0.25)", color: "#e8734a" } },
        { label: "Cluster 2 · Loyal" },
      ],
      rows: [
        { label: "👥  Segments Found", value: "5 Clusters" },
        { label: "📈  Silhouette Score", value: "0.73" },
      ],
    },
  },
];

export const PROJECTS_SMALL = [
  {
    tag: "HR Analytics · Power BI · MySQL",
    title: "Human Resource Analytics Dashboard",
    desc: "Interactive HR analytics dashboard focused on employee attrition, workforce trends, and retention insights. Built with Streamlit, Power BI, and SQL-driven analytics featuring dynamic filter selection, demographic-based analysis, and interactive visual exploration to uncover key factors influencing employee turnover across departments, salary bands, job roles, and workforce segments.",
    stack: ["MySQL","Power BI","Excel","Data Analytics"],
    github: "https://github.com/hoshangsheth/HR-Analytics-Employee-Retention",
    live: "https://hr-analytic-dashboard.streamlit.app/",
  },
  {
    tag: "Banking Analytics · Deep Learning · Streamlit",
    title: "Bank Customer Churn Prediction System",
    desc: "Deep learning-based banking churn prediction system using Artificial Neural Networks (ANN) to identify customers at risk of leaving. Built an interactive Streamlit app for real-time churn prediction and proactive customer retention analysis.",
    stack: ["ANN","TensorFlow","Scikit-learn","Pandas","Streamlit"],
    github: "https://github.com/hoshangsheth/churn-predictor-app",
    live: "https://bank-churn-predictor-app.streamlit.app/",
  },
];

export const TIMELINE = [
  { date: "2026 — Present", title: "Gen AI & AI Engineering", org: "Independent Learning · System Building",
    desc: "Transitioning from traditional Machine Learning into modern AI engineering through hands-on development of Gen AI applications, RAG systems, AI agents, FastAPI services, and production-focused intelligent systems.",
    side: "right" },
  { date: "2025 — Ongoing", title: "BCA — AI & Data Science", org: "Bachelor's Degree · Expected 2028",
    desc: "Formal education in AI, data science, machine learning fundamentals, and computer science — complemented by intensive self-directed project-based learning.",
    side: "left" },
  { date: "2024 — 2025", title: "Machine Learning & AI Intern", org: "Industry Internship · Completed",
    desc: "Built ML-powered systems including loan risk prediction, customer segmentation, and AI-driven dashboards. Focused on building deployable ML systems with explainability, automation, and measurable business impact.",
    side: "right" },
  { date: "2024", title: "Data Analyst Intern", org: "Industry Internship",
    desc: "Performed exploratory data analysis, built dashboards, automated Excel reporting workflows, and supported business intelligence operations with SQL and Python.",
    side: "left" },
  { date: "Before", title: "The Pivot", org: "BPO Background → AI Engineering",
    desc: "Recognized that business problems need people who can translate data into decisions, not just process information. Made a deliberate, structured transition into data science.",
    side: "right", muted: true },
];

export const CERTS = [
  { icon: BadgeCheck, title: "Data Scientist", issuer: "Issued March 2025",
    link: "https://drive.google.com/file/d/1JL7bSjSbNduv03cadgaMH4R98gJxufrL/view?usp=sharing" },
  { icon: BadgeCheck, title: "Data Analyst", issuer: "Issued April 2024",
    link: "https://drive.google.com/file/d/1GS4yX-rZeO179BGDo9-lE7Ycu6TrYYrk/view?usp=sharing" },
  { icon: Database, title: "SQL - Advanced", issuer: "HackerRank · Aug 2025",
    link: "https://drive.google.com/file/d/1zRU60PHjZCGu22Mao-5QfgJu3PEwXF1i/view?usp=drive_link" },
  { icon: Database, title: "SQL - Intermediate", issuer: "HackerRank",
    link: "https://drive.google.com/file/d/1NeQyEi9Y2fKTiVsbJeiL18IaG62HDWJ1/view?usp=drive_link" },
  { icon: Database, title: "SQL - Basic", issuer: "HackerRank · Aug 2025",
    link: "https://drive.google.com/file/d/1wRWof5490h6827pWDX2Z4zeOOG_vjVRT/view?usp=drive_link" },
  { icon: BrainCircuit, title: "Math for DS & GenAI", issuer: "Basics to Advanced",
    link: "https://drive.google.com/file/d/1_W8wClSb0kXJpPzY0_bT_IX_kcNYEmnP/view?usp=drive_link" },
];

export const STACK = [
  { icon: BrainCircuit, name: "AI / ML",
    items: ["Scikit-learn","XGBoost","TensorFlow / Keras","SHAP","HuggingFace","NLP / Transformers"] },
  { icon: Sparkles, name: "Gen AI Systems",
    items: ["LLMs","Prompt Engineering","RAG Pipelines","LangChain","AI Agents","MCP Workflows"] },
  { icon: Cloud, name: "Deployment",
    items: ["Streamlit","Flask","REST APIs","Docker","FastAPI (learning)"] },
  { icon: Database, name: "Databases",
    items: ["PostgreSQL","SQL (Advanced)","Window Functions","Joins & Subqueries"] },
  { icon: BarChart3, name: "Visualization",
    items: ["Matplotlib","Seaborn","Plotly","Power BI","Streamlit Charts"] },
  { icon: Bot, name: "Automation",
    items: ["BeautifulSoup","Selenium","Requests","OpenPyXL","JSON APIs"] },
  { icon: Code2, name: "Core Languages",
    items: ["Python","SQL","Bash (basics)"] },
  { icon: Cpu, name: "LLM Engineering",
    items: ["Transformers","Vector Databases","Semantic Search","Context Engineering","Inference Pipelines"] },
];

export const EXPLORING = [
  { icon: ScanEye, name: "Computer Vision", status: "In progress" },
  { icon: Workflow, name: "MLOps", status: "In progress" },
  { icon: Zap, name: "FastAPI", status: "In progress" },
  { icon: ContainerIcon, name: "Docker", status: "Familiar" },
  { icon: Bot, name: "AI Agents", status: "Exploring" },
  { icon: Sparkles, name: "Gen AI Systems", status: "In progress" },
  { icon: Gamepad2, name: "Reinforcement Learning", status: "Exploring" },
  { icon: Network, name: "System Design", status: "Active Learning" },
];

export const NAV_ITEMS = [
  { id: "about",    label: "About" },
  { id: "build",    label: "Capabilities" },
  { id: "projects", label: "Projects" },
  { id: "journey",  label: "Journey" },
  { id: "stack",    label: "Stack" },
  { id: "contact",  label: "Contact" },
];
