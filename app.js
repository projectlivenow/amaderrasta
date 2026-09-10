(() => {
  'use strict';
  const seedProblems = [
    {id:1,title:'Nimgachi-Sirajganj সড়ক',type:'রাস্তা',location:'Nimgachi, Sirajganj',date:'6 সেপ্টেম্বর 2026',votes:127,status:'সমাধান হয়নি',cls:'road-bg',x:39,y:45},
    {id:2,title:'বাজার এলাকার ড্রেন বন্ধ',type:'ড্রেন',location:'Bazar Area, Nimgachi',date:'4 সেপ্টেম্বর 2026',votes:64,status:'কাজ চলছে',cls:'drain-bg',x:52,y:28},
    {id:3,title:'স্কুল রোডে আলো নেই',type:'আলো',location:'School Road, Nimgachi',date:'2 সেপ্টেম্বর 2026',votes:38,status:'যাচাই হচ্ছে',cls:'light-bg',x:68,y:62},
    {id:4,title:'চাঁদপুর সেতুর পাশে গর্ত',type:'রাস্তা',location:'Chandpur, Sirajganj',date:'1 সেপ্টেম্বর 2026',votes:31,status:'কাজ চলছে',cls:'road-bg',x:54,y:30},
    {id:5,title:'এরাবাড়িয়া মোড়ে পানি জমে',type:'ড্রেন',location:'Erabaria',date:'30 আগস্ট 2026',votes:24,status:'সমাধান হয়েছে',cls:'drain-bg',x:22,y:40},
    {id:6,title:'বাসস্ট্যান্ডের লাইট নষ্ট',type:'আলো',location:'Nimgachi Bus Stand',date:'28 আগস্ট 2026',votes:19,status:'যাচাই হচ্ছে',cls:'light-bg',x:75,y:52}
  ];
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const getReports = () => { try { return JSON.parse(localStorage.getItem('amaderRastaReports') || '[]'); } catch (_) { return window.__amaderReports || []; } };
  const saveReports = data => { try { localStorage.setItem('amaderRastaReports', JSON.stringify(data)); } catch (_) { window.__amaderReports = data; } };
  const allProblems = () => [...seedProblems, ...getReports().map((r,i) => ({...r,id:'local-'+i,cls:'road-bg',x:25+(i*17)%60,y:25+(i*23)%55,votes:0}))];

  function toast(msg){const el=$('#toast');el.textContent=msg;el.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>el.classList.remove('show'),2600)}
  function renderProblems(list=seedProblems){
    $('#problemGrid').innerHTML=list.slice(0,6).map(p=>`<article class="problem-card" data-id="${p.id}"><div class="problem-image ${p.cls}"><span class="issue-badge">${p.type}</span></div><div class="problem-body"><h3>${escapeHtml(p.title)}</h3><div class="meta"><span>◷ ${p.date}</span><span>⌖ ${escapeHtml(p.location)}</span></div></div></article>`).join('');
    $$('.problem-card').forEach(c=>c.addEventListener('click',()=>openDetail(c.dataset.id)));
  }
  function renderMarkers(filter='সব'){
    const map=$('#fakeMap'); $$('.marker',map).forEach(m=>m.remove());
    allProblems().filter(p=>filter==='সব'||p.type===filter).forEach(p=>{const m=document.createElement('button');m.className='marker '+typeColor(p.type);m.style.left=p.x+'%';m.style.top=p.y+'%';m.innerHTML='<span>•</span>';m.title=p.title;m.dataset.id=p.id;m.addEventListener('click',()=>openDetail(p.id));map.appendChild(m)})
  }
  function typeColor(type){return type==='রাস্তা'?'red':'marker '+(type==='ড্রেন'?'orange':type==='আলো'?'blue':'green')}
  function openDetail(id){
    const p=allProblems().find(x=>String(x.id)===String(id)); if(!p)return;
    $('#modalContent').innerHTML=`<span class="eyebrow">${p.type}</span><h2 style="margin:4px 0 8px">${escapeHtml(p.title)}</h2><p style="font-size:11px;color:#71828a">⌖ ${escapeHtml(p.location)}　•　◷ ${p.date}</p><div class="problem-image ${p.cls}" style="height:190px;border-radius:10px;margin:14px 0"></div><p style="font-size:12px">এই রিপোর্টটি এলাকার নাগরিকদের কাছ থেকে সংগৃহীত। আপনারও যদি একই সমস্যা থাকে, <b>সমর্থন করুন</b> বোতামে ক্লিক করুন।</p><div style="display:flex;gap:8px;align-items:center"><button class="btn btn-primary" id="supportBtn">👍 সমর্থন করুন (${p.votes||0})</button><span class="status-pill">${p.status}</span></div>`;
    $('#detailModal').classList.add('open');$('#detailModal').setAttribute('aria-hidden','false');
    $('#supportBtn').onclick=()=>{p.votes=(p.votes||0)+1;$('#supportBtn').textContent=`👍 সমর্থন করুন (${p.votes})`;toast('আপনার সমর্থন যোগ হয়েছে')};
  }
  function renderActivity(){
    $('#activityList').innerHTML=seedProblems.slice(0,4).map(p=>`<div class="activity-row"><div class="thumb ${p.cls}"></div><div><b>${escapeHtml(p.title)}</b><small>${escapeHtml(p.location)} • ${p.date}</small></div><span class="status-pill">${p.status}</span></div>`).join('')
  }
  function renderReports(){
    const rows=getReports(); $('#reportTable').innerHTML=rows.length?rows.map(r=>`<tr><td><b>${escapeHtml(r.title)}</b></td><td>${escapeHtml(r.type)}</td><td>${escapeHtml(r.location)}</td><td>${escapeHtml(r.date)}</td><td><span class="status-pill">যাচাই হচ্ছে</span></td></tr>`).join(''):`<tr><td colspan="5" style="text-align:center;color:#8a989d;padding:25px">এখনও কোনো লোকাল রিপোর্ট নেই। উপরের ফর্ম দিয়ে প্রথম রিপোর্টটি দিন।</td></tr>`;
    $('#totalCount').textContent=128+rows.length;$('#todayCount').textContent=36+rows.length;
  }
  function escapeHtml(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}

  $('#reportForm').addEventListener('submit', e=>{
    e.preventDefault(); const title=$('#title').value.trim(), type=$('#type').value, description=$('#description').value.trim(), location=$('#location').value.trim();
    if(!title||!type||!description||!location){toast('দয়া করে * চিহ্নিত সব ঘর পূরণ করুন');return}
    const photo=$('#photo').files[0], video=$('#video').files[0];
    if(photo&&photo.size>5*1024*1024){toast('ছবির আকার ৫MB-এর কম হতে হবে');return}
    if(video&&video.size>20*1024*1024){toast('ভিডিওর আকার ২০MB-এর কম হতে হবে');return}
    const reports=getReports();reports.unshift({title,type,description,location,date:new Intl.DateTimeFormat('bn-BD',{day:'numeric',month:'long',year:'numeric'}).format(new Date()),contact:$('#contact').value.trim()});saveReports(reports);e.target.reset();renderReports();renderMarkers();toast('রিপোর্ট সফলভাবে জমা হয়েছে ✓');locationHash('all');
  });
  $$('.upload-box').forEach(box=>box.addEventListener('click',()=>box.querySelector('input').click()));
  $('#clearReports').addEventListener('click',()=>{if(confirm('লোকাল রিপোর্টগুলো মুছে ফেলবেন?')){try { localStorage.removeItem('amaderRastaReports'); } catch (_) { window.__amaderReports = []; }renderReports();renderMarkers();toast('লোকাল রিপোর্ট মুছে দেওয়া হয়েছে')}});
  $$('.category-row button').forEach(b=>b.addEventListener('click',()=>{const f=b.dataset.filter;renderMarkers(f);toast(f==='সব'?'সব সমস্যা দেখানো হচ্ছে':f+'-এর সমস্যা দেখানো হচ্ছে')}));
  $('#mapSearch').addEventListener('input',e=>{const q=e.target.value.toLowerCase().trim();renderProblems(q?allProblems().filter(p=>(p.title+p.location+p.type).toLowerCase().includes(q)):seedProblems);});
  $('#locateBtn').addEventListener('click',()=>{if(!navigator.geolocation){toast('এই ব্রাউজারে লোকেশন সাপোর্ট নেই');return}navigator.geolocation.getCurrentPosition(pos=>{toast(`লোকেশন পাওয়া গেছে: ${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)}`)},()=>toast('লোকেশন অনুমতি পাওয়া যায়নি'))});
  $('#searchBtn').addEventListener('click',()=>{$('#searchOverlay').classList.add('open');setTimeout(()=>$('#globalSearch').focus(),50)});$('#searchClose').addEventListener('click',()=>$('#searchOverlay').classList.remove('open'));
  $('#globalSearch').addEventListener('input',e=>{const q=e.target.value.toLowerCase().trim();const res=allProblems().filter(p=>(p.title+p.location+p.type).toLowerCase().includes(q));$('#searchResults').innerHTML=q?res.map(p=>`<div class="search-result" data-id="${p.id}"><b>${escapeHtml(p.title)}</b><small>${escapeHtml(p.type)} • ${escapeHtml(p.location)}</small></div>`).join(''):'<p style="font-size:10px;color:#8a989d">নাম, এলাকা বা সমস্যার ধরন দিয়ে খুঁজুন।</p>';$$('.search-result').forEach(r=>r.onclick=()=>{$('#searchOverlay').classList.remove('open');openDetail(r.dataset.id)})});
  $('#profileBtn').addEventListener('click',()=>$('#profileModal').classList.add('open'));$$('[data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('.modal').classList.remove('open')));$$('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('open')}));
  $('#viewAll').addEventListener('click',e=>{e.preventDefault();document.querySelector('#all').scrollIntoView({behavior:'smooth'})});
  $('#menuBtn').addEventListener('click',()=>{$('.desktop-nav').style.display=$('.desktop-nav').style.display==='flex'?'none':'flex';$('.desktop-nav').style.position='absolute';$('.desktop-nav').style.top='66px';$('.desktop-nav').style.left='0';$('.desktop-nav').style.right='0';$('.desktop-nav').style.padding='15px';$('.desktop-nav').style.background='#fff';$('.desktop-nav').style.flexDirection='column';$('.desktop-nav').style.boxShadow='0 12px 25px #0001'});
  function locationHash(id){history.replaceState(null,'','#'+id)}
  renderProblems();renderMarkers();renderActivity();renderReports();
})();
