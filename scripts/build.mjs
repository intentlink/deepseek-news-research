#!/usr/bin/env node
// build.mjs — scan 2023/2024/2025/2026/**/*.md -> assets/js/data.js + data/papers.json
// Content = md files only. Framework = style.css / app.js / this script. Owner runs: node scripts/build.mjs
import fs from 'fs';
import path from 'path';

const ROOTS = ['2023','2024','2025','2026'];
const OUT_JSON = 'data/papers.json';
const OUT_JS = 'assets/js/data.js';

// Known category mapping for existing files (ground truth)
const KNOWN_CATS = {
  'deepseek-v4-million-token': ['long-context','architecture'],
  'dualpath-storage-bandwidth': ['infrastructure'],
  'deepseek-ocr-2': ['multimodal'],
  'engram-conditional-memory': ['architecture'],
  'mhc-manifold-constrained': ['architecture'],
  'deepseek-v3-2-open-llms': ['reasoning','architecture'],
  'deepseekmath-v2-self-verifiable': ['math','reasoning'],
  'linear-programming-load-balancer': ['infrastructure'],
  'deepseek-ocr-contexts-optical-compression': ['multimodal','long-context'],
  'insights-deepseek-v3-scaling-challenges': ['infrastructure','architecture'],
  'deepseek-prover-v2-advancing-formal-math-reasoning': ['math','reasoning'],
  'openinfra-week': ['infrastructure'],
  'native-sparse-attention-nsa': ['long-context','architecture'],
  'janus-pro-unified-multimodal': ['multimodal'],
  'deepseek-r1-incentivizing-reasoning': ['reasoning'],
  'deepseek-v3-technical-report': ['architecture'],
  'deepseek-vl2-mixture-experts-vision-language': ['multimodal','architecture'],
  'janusflow-harmonizing-autoregression-rectified-flow': ['multimodal'],
  'janus-decoupling-visual-encoding': ['multimodal'],
  'auxiliary-loss-free-load-balancing-moe': ['architecture'],
  'fire-flyer-ai-hpc-cost-effective': ['infrastructure'],
  'deepseek-prover-v1-5-harnessing-proof-assistant': ['math','reasoning'],
  'esft-expert-specialized-fine-tuning': ['architecture'],
  'deepseek-coder-v2-breaking-barrier-closed-source': ['code'],
  'deepseek-prover-advancing-theorem-proving': ['math','reasoning'],
  'deepseek-v2-strong-economical-efficient-moe': ['architecture'],
  'deepseek-vl-towards-real-world-vision-language': ['multimodal'],
  'deepseekmath-pushing-limits-math-reasoning': ['math','reasoning'],
  'deepseekmoe-towards-ultimate-expert-specialization': ['architecture'],
  'deepseek-llm-scaling-open-source': ['architecture'],
  'deepseek-coder-let-code-write-itself': ['code'],
};

function slugFrom(file) {
  return path.basename(file, '.md');
}

function parseMD(filePath, raw) {
  const slug = slugFrom(filePath);
  const year = path.dirname(filePath).split('/').pop();
  // title: first H1
  const titleMatch = raw.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : slug;
  // date: **日期**: ...
  const dateMatch = raw.match(/\*\*日期\*\*:\s*(.+)/);
  // arxiv / github / huggingface — robust: find URLs directly
  const arxivUrl = raw.match(/https:\/\/arxiv\.org\/abs\/[^\s\)\]]+/);
  const githubUrl = raw.match(/https:\/\/github\.com\/[^\s\)\]]+/);
  const hfUrl = raw.match(/https:\/\/huggingface\.co[^\s\)\]]+/);
  const arxivMatch = arxivUrl ? [null, arxivUrl[0]] : null;
  const githubMatch = githubUrl ? [null, githubUrl[0]] : null;
  const hfMatch = hfUrl ? [null, hfUrl[0]] : null;
  // summary: 概述 paragraph
  let summary = '';
  const overviewMatch = raw.match(/##\s+概述\s*\n+([\s\S]*?)(?=\n##|\n\[|\n$)/);
  if (overviewMatch) {
    summary = overviewMatch[1].replace(/\n+/g,' ').trim().slice(0,180);
    if (summary.length>=180) summary = summary.slice(0,177)+'...';
  }
  // categories
  let categories = KNOWN_CATS[slug];
  if (!categories) {
    // try 标签 field
    const tagMatch = raw.match(/\*\*标签\*\*:\s*(.+)/);
    if (tagMatch) {
      categories = tagMatch[1].split(/[,，、\s]+/).map(s=>s.trim().toLowerCase()).filter(Boolean);
    } else {
      // heuristic inference
      const lower = raw.toLowerCase();
      categories = [];
      if (lower.includes('推理')||lower.includes('reasoning')||lower.includes('grpo')||lower.includes('r1')) categories.push('reasoning');
      if (lower.includes('多模态')||lower.includes('vision')||lower.includes('janus')||lower.includes('ocr')) categories.push('multimodal');
      if (lower.includes('基础设施')||lower.includes('fire-flyer')||lower.includes('hpc')) categories.push('infrastructure');
      if (lower.includes('数学')||lower.includes('math')||lower.includes('prover')) categories.push('math');
      if (lower.includes('code')||lower.includes('coder')) categories.push('code');
      if (lower.includes('上下文')||lower.includes('sparse attention')||lower.includes('long')) categories.push('long-context');
      if (!categories.length) categories.push('architecture');
    }
  }
  // date clean: keep as displayed string and ISO-ish
  let date = dateMatch ? dateMatch[1].replace(/\[.*?\]/g,'').trim() : year;
  // try to extract YYYY-MM-DD for sorting
  let sortDate = '2000-01-01';
  const d = date.match(/(\d{4})\s*年\s*(\d{1,2})\s*月\s*(\d{1,2})/);
  if (d) sortDate = `${d[1]}-${String(d[2]).padStart(2,'0')}-${String(d[3]).padStart(2,'0')}`;
  else {
    const iso = date.match(/(\d{4}-\d{2}-\d{2})/);
    if (iso) sortDate = iso[1];
  }
  return {
    id: slug,
    slug,
    title,
    date,
    sortDate,
    year,
    arxiv: arxivMatch ? arxivMatch[1].trim() : undefined,
    github: githubMatch ? githubMatch[1].trim() : undefined,
    huggingface: hfMatch ? hfMatch[1].trim() : undefined,
    categories,
    summary,
    file: filePath,
  };
}

function collect() {
  const papers = [];
  for (const root of ROOTS) {
    if (!fs.existsSync(root)) continue;
    const files = fs.readdirSync(root).filter(f=>f.endsWith('.md'));
    for (const f of files) {
      const fp = path.join(root, f).replace(/\\/g, '/');
      const raw = fs.readFileSync(fp, 'utf-8');
      papers.push({ ...parseMD(fp, raw), body: raw });
    }
  }
  papers.sort((a,b)=> b.sortDate.localeCompare(a.sortDate));
  return papers;
}

function main() {
  const papers = collect();
  // data/papers.json without body (for web)
  const forJson = papers.map(({body,...rest})=>rest);
  fs.mkdirSync(path.dirname(OUT_JSON),{recursive:true});
  fs.writeFileSync(OUT_JSON, JSON.stringify(forJson,null,2),'utf-8');
  // assets/js/data.js with body embedded (for file:// fallback, no fetch needed)
  fs.mkdirSync(path.dirname(OUT_JS),{recursive:true});
  const jsContent = `// auto-generated by scripts/build.mjs — do not edit manually
// run: node scripts/build.mjs  after adding new md files
window.__PAPERS__ = ${JSON.stringify(papers,null,2)};
`;
  fs.writeFileSync(OUT_JS, jsContent,'utf-8');
  console.log(`Built ${papers.length} papers -> ${OUT_JSON} & ${OUT_JS}`);
  // also generate news from README dynamic section? Keep static for now
  // Validate md encoding: ensure utf-8
  for (const p of papers) {
    if (!p.title) console.warn('Missing title', p.file);
  }
}

main();
