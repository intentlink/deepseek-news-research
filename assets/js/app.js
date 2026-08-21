// app.js — DeepSeek 研究长卷
// Framework entry: reads window.__PAPERS__ (embedded by scripts/build.mjs) → renders site
// Content owner never edits this file; only adds md + runs build.

const CAT_NAMES = { reasoning:'推理', multimodal:'多模态', infrastructure:'基础设施', math:'数学', code:'代码', 'long-context':'长上下文', architecture:'架构' };

const newsData = [
  { date:'2026年6月24日', title:'DeepSeek-V4 正式发布：百万 token 上下文，开源模型新标杆', url:'https://arxiv.org/abs/2606.19348' },
  { date:'2026年1月28日', title:'DeepSeek-OCR 2：视觉因果流，文档理解新突破', url:'https://arxiv.org/abs/2601.20552' },
  { date:'2025年12月', title:'DeepSeek-R1 发表 Nature：开源推理模型的重要里程碑', url:'https://www.nature.com/articles/s41586-025-09422-z' },
  { date:'2025年12月1日', title:'DeepSeek V3.2 正式版：强化 Agent 能力', url:'https://www.deepseek.com/en/news/deepseek-v3-2/' },
  { date:'2025年9月29日', title:'DeepSeek-V3.2-Exp 发布，训练推理提效', url:'https://www.deepseek.com/en/news/v3-2-exp/' },
  { date:'2025年9月22日', title:'DeepSeek-V3.1 版本更新', url:'https://www.deepseek.com/en/news/v3-1-terminus/' },
  { date:'2025年8月21日', title:'DeepSeek-V3.1 发布', url:'https://www.deepseek.com/en/news/deepseek-v3-1/' },
  { date:'2025年2月24日', title:'DeepSeek 开源周：7 个核心基础设施开源', url:'https://github.com/deepseek-ai/open-infra-index' },
  { date:'2026年4月24日', title:'DeepSeek-V4 预览版：迈入百万上下文普惠时代', url:'https://www.deepseek.com/en/news/v4-preview/' },
];

let papers = window.__PAPERS__ ? [...window.__PAPERS__] : [];
let filtered = [...papers];
let activeYear = 'all';
let activeCat = 'all';

function qs(s){ return document.querySelector(s) }
function qsa(s){ return document.querySelectorAll(s) }

async function ensureData(){
  if (papers.length) return;
  try{
    const r = await fetch('data/papers.json');
    if(r.ok) papers = await r.json();
  }catch(e){
    console.warn('fetch papers.json failed, maybe file://', e);
  }
}

function renderBench(){
  // keep static numbers, animate on scroll
}

function renderPapers(list){
  const g = qs('#paperGrid');
  if(!g) return;
  if(!list.length){
    g.innerHTML = `<div class="empty">没有找到匹配的论文 · 试试清空筛选</div>`;
    return;
  }
  g.innerHTML = list.map((p,i)=>`
    <article class="paper reveal" data-id="${p.id}" tabindex="0" role="button" aria-label="${p.title}">
      <div class="paper-num">${String(i+1).padStart(2,'0')} · ${p.year}</div>
      <h3 class="paper-title">${escapeHtml(p.title)}</h3>
      <p class="paper-summary">${escapeHtml(p.summary)}</p>
      <div class="paper-meta">${p.categories.map(c=>`<span class="tag">${CAT_NAMES[c]||c}</span>`).join('')}</div>
      <div class="paper-foot">
        ${p.arxiv?`<a class="mini-link" href="${p.arxiv}" target="_blank" rel="noopener" onclick="event.stopPropagation()">arXiv</a>`:''}
        ${p.github?`<a class="mini-link" href="${p.github}" target="_blank" rel="noopener" onclick="event.stopPropagation()">GitHub</a>`:''}
        <span class="mini-link" style="border-style:dashed">阅读 →</span>
      </div>
    </article>`
  ).join('');
  // bind
  qsa('.paper').forEach(el=>{
    el.addEventListener('click',()=> openPaper(el.dataset.id));
    el.addEventListener('keydown',e=>{ if(e.key==='Enter') openPaper(el.dataset.id)});
  });
  // reveal
  requestAnimationFrame(()=> qsa('.paper.reveal').forEach((el,idx)=> setTimeout(()=> el.classList.add('in'), idx*40)));
  qs('#resultCount').textContent = `${list.length} 篇`;
}

function renderTimeline(){
  const arch = [
    { date:'2023年11月', title:'DeepSeek LLM', desc:'首个开源大语言模型', id:'deepseek-llm-scaling-open-source' },
    { date:'2024年1月', title:'DeepSeekMoE', desc:'极致专家特化', id:'deepseekmoe-towards-ultimate-expert-specialization' },
    { date:'2024年5月', title:'DeepSeek-V2', desc:'高效经济 MoE', id:'deepseek-v2-strong-economical-efficient-moe' },
    { date:'2024年12月', title:'DeepSeek-V3', desc:'671B MoE', id:'deepseek-v3-technical-report' },
    { date:'2025年12月', title:'DeepSeek-V3.2', desc:'强化 Agent', id:'deepseek-v3-2-open-llms' },
    { date:'2026年6月', title:'DeepSeek-V4', desc:'百万上下文', id:'deepseek-v4-million-token' },
  ];
  const reasoning = [
    { date:'2024年2月', title:'DeepSeekMath', desc:'数学推理突破', id:'deepseekmath-pushing-limits-math-reasoning' },
    { date:'2025年1月', title:'DeepSeek-R1', desc:'纯 RL 激励推理 · Nature', id:'deepseek-r1-incentivizing-reasoning' },
    { date:'2025年11月', title:'DeepSeekMath-V2', desc:'自验证推理', id:'deepseekmath-v2-self-verifiable' },
  ];
  const multimodal = [
    { date:'2024年3月', title:'DeepSeek-VL', desc:'真实场景理解', id:'deepseek-vl-towards-real-world-vision-language' },
    { date:'2024年10月', title:'Janus', desc:'解耦视觉编码', id:'janus-decoupling-visual-encoding' },
    { date:'2025年1月', title:'Janus-Pro', desc:'统一多模态增强', id:'janus-pro-unified-multimodal' },
    { date:'2025年10月', title:'DeepSeek-OCR', desc:'光学压缩', id:'deepseek-ocr-contexts-optical-compression' },
    { date:'2026年1月', title:'DeepSeek-OCR 2', desc:'视觉因果流', id:'deepseek-ocr-2' },
  ];
  fillTl('archTl', arch);
  fillTl('reasonTl', reasoning);
  fillTl('multiTl', multimodal);
}
function fillTl(id, arr){
  const el = document.getElementById(id);
  if(!el) return;
  el.innerHTML = arr.map(t=>`
    <div class="tl-item" data-id="${t.id}">
      <div class="tl-date">${t.date}</div>
      <div class="tl-title">${t.title}</div>
      <div class="tl-desc">${t.desc}</div>
    </div>`).join('');
  el.querySelectorAll('.tl-item').forEach(n=> n.addEventListener('click',()=> openPaper(n.dataset.id)));
}

function renderNews(){
  const el = qs('#newsList');
  if(!el) return;
  el.innerHTML = newsData.map(n=>`
    <div class="news-item">
      <div><div class="news-date">${n.date}</div><div class="news-title">${n.title}</div></div>
      <a href="${n.url}" target="_blank" rel="noopener">查看 →</a>
    </div>`).join('');
}

function filter(){
  const q = (qs('#searchInput')?.value || '').toLowerCase().trim();
  filtered = papers.filter(p=>{
    if(activeYear!=='all' && p.year!==activeYear) return false;
    if(activeCat!=='all' && !p.categories.includes(activeCat)) return false;
    if(q && !(p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q))) return false;
    return true;
  });
  renderPapers(filtered);
}

function escapeHtml(s){ return s.replace(/[&<>"]/g,c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])) }

// Drawer + hash routing
function openPaper(id){
  location.hash = `paper/${id}`;
}
function closePaper(){
  if(location.hash.startsWith('#paper/')) history.pushState('',document.title, location.pathname + location.search);
  closeDrawer();
}
function closeDrawer(){
  const d = qs('#drawer'); if(!d) return;
  d.classList.remove('open');
  document.body.style.overflow='';
}
async function syncHash(){
  const m = location.hash.match(/^#paper\/(.+)/);
  if(!m){ closeDrawer(); return; }
  const id = m[1];
  const p = papers.find(x=>x.id===id);
  if(!p){
    console.warn('paper not found', id);
    return;
  }
  await showDrawer(p);
}

async function showDrawer(p){
  const drawer = qs('#drawer');
  const body = qs('#drawerBody');
  drawer.classList.add('open');
  document.body.style.overflow='hidden';
  body.innerHTML = `<div style="padding:2rem;text-align:center;color:var(--mist)">正在展开长卷…</div>`;
  // Prefer embedded body (works on file://). Fallback to fetch.
  let md = p.body || '';
  if(!md){
    try{
      const r = await fetch(p.file);
      if(r.ok) md = await r.text();
    }catch(e){}
  }
  if(!md){
    body.innerHTML = `<p style="color:var(--mist)">未能加载文档。请在本地启动服务：<code>npx serve .</code> 或 <code>python3 -m http.server 8000</code> 后再打开。</p><p class="drawer-meta" style="margin-top:1rem">${escapeHtml(p.summary)}</p>`;
    return;
  }
  // marked parse
  let html = '';
  try{ html = marked.parse(md); }catch(e){ html = `<pre>${escapeHtml(md)}</pre>` }
  // Build TOC from h2/h3
  const tmp = document.createElement('div'); tmp.innerHTML = html;
  const headings = [...tmp.querySelectorAll('h2, h3')];
  let toc = '';
  if(headings.length){
    toc = `<div class="md-toc"><div class="md-toc-title">目录 · CONTENTS</div>` + headings.map(h=>{
      const text = h.textContent;
      const id = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g,'-');
      h.id = id;
      const lv = h.tagName==='H2'?'lv2':'lv3';
      return `<a class="${lv}" href="#${id}">${escapeHtml(text)}</a>`;
    }).join('') + `</div>`;
    html = tmp.innerHTML;
  }
  // re-add ids to html by re-parsing? we already set
  const tags = p.categories.map(c=>CAT_NAMES[c]||c).join(' · ');
  body.innerHTML = `
    <h1 class="drawer-title">${escapeHtml(p.title)}</h1>
    <div class="drawer-meta">
      <span>✦ ${escapeHtml(p.date)}</span><span>◐ ${p.year}</span><span>⟡ ${escapeHtml(tags)}</span>
    </div>
    <div class="drawer-actions">
      ${p.arxiv?`<a href="${p.arxiv}" target="_blank" rel="noopener">arXiv ↗</a>`:''}
      ${p.github?`<a href="${p.github}" target="_blank" rel="noopener">GitHub ↗</a>`:''}
      <a href="#" onclick="event.preventDefault();navigator.clipboard&&navigator.clipboard.writeText(location.href)">复制链接</a>
    </div>
    ${toc}
    <div class="md">${html}</div>
    <div style="margin-top:2rem;padding-top:1rem;border-top:1px solid rgba(201,169,98,.1);display:flex;gap:.6rem;flex-wrap:wrap">
      ${p.arxiv?`<a class="mini-link" href="${p.arxiv}" target="_blank">查看原论文</a>`:''}
      ${p.github?`<a class="mini-link" href="${p.github}" target="_blank">GitHub</a>`:''}
      <span class="mini-link" style="cursor:pointer" onclick="closePaper()">关闭长卷</span>
    </div>
  `;
  // Smooth scroll for toc anchors inside drawer
  body.querySelectorAll('.md-toc a').forEach(a=>{
    a.addEventListener('click',e=>{
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      const target = body.querySelector('#'+CSS.escape(id));
      if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });
}

function bindFilters(){
  qsa('#yearFilter .pill').forEach(b=> b.addEventListener('click',()=>{
    qsa('#yearFilter .pill').forEach(x=>x.classList.remove('active'));
    b.classList.add('active'); activeYear = b.dataset.year; filter();
  }));
  qsa('#catFilter .pill').forEach(b=> b.addEventListener('click',()=>{
    qsa('#catFilter .pill').forEach(x=>x.classList.remove('active'));
    b.classList.add('active'); activeCat = b.dataset.category; filter();
  }));
  qs('#searchInput')?.addEventListener('input', filter);
  qs('#clearFilters')?.addEventListener('click',()=>{
    activeYear='all'; activeCat='all';
    qsa('.pill').forEach(p=> p.classList.remove('active'));
    qsa('[data-year="all"],[data-category="all"]').forEach(p=>p.classList.add('active'));
    qs('#searchInput').value=''; filter();
  });
  // lab cards quick filter
  qsa('[data-cat]').forEach(el=> el.addEventListener('click',()=>{
    const cat = el.dataset.cat;
    activeCat = cat;
    qsa('#catFilter .pill').forEach(x=> x.classList.toggle('active', x.dataset.category===cat));
    document.getElementById('papers')?.scrollIntoView({behavior:'smooth'});
    filter();
  }));
}

function bindHeader(){
  const h = qs('header');
  const onScroll = ()=> h.classList.toggle('scrolled', scrollY>20);
  addEventListener('scroll', onScroll, {passive:true}); onScroll();
  // reveal observer
  const io = new IntersectionObserver(els=>{
    els.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in') })
  },{threshold:.15});
  qsa('.reveal').forEach(el=> io.observe(el));
}

function bindDrawer(){
  qs('#drawerBackdrop')?.addEventListener('click', closePaper);
  qs('#drawerClose')?.addEventListener('click', closePaper);
  addEventListener('keydown',e=>{ if(e.key==='Escape') closePaper() });
  addEventListener('hashchange', syncHash);
  // j/k navigate between filtered papers
  addEventListener('keydown',e=>{
    if(!location.hash.startsWith('#paper/')) return;
    if(e.key==='j' || e.key==='ArrowRight'){
      const idx = filtered.findIndex(p=>`#paper/${p.id}`===location.hash);
      const nxt = filtered[idx+1]; if(nxt) openPaper(nxt.id);
    }
    if(e.key==='k' || e.key==='ArrowLeft'){
      const idx = filtered.findIndex(p=>`#paper/${p.id}`===location.hash);
      const prv = filtered[idx-1]; if(prv) openPaper(prv.id);
    }
  });
  // intercept .md links
  document.addEventListener('click',e=>{
    const a = e.target.closest('a');
    if(a && a.getAttribute('href')?.endsWith('.md')){
      const href = a.getAttribute('href');
      const slug = href.split('/').pop().replace('.md','');
      const hit = papers.find(p=>p.id===slug);
      if(hit){ e.preventDefault(); openPaper(hit.id); }
    }
  });
}

document.addEventListener('DOMContentLoaded', async ()=>{
  await ensureData();
  renderPapers(papers);
  renderTimeline();
  renderNews();
  bindFilters();
  bindHeader();
  bindDrawer();
  syncHash();
  // bench count animation
  const nums = document.querySelectorAll('.bench-num');
  nums.forEach(el=>{
    const target = el.textContent.trim();
    if(target==='∞') return;
    const n = parseInt(target,10);
    if(isNaN(n)) return;
    let cur=0; const step=Math.ceil(n/24);
    const t=setInterval(()=>{cur=Math.min(cur+step,n); el.textContent=cur; if(cur>=n) clearInterval(t)},40);
  });
});
