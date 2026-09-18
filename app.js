let DATA=[];

async function loadData(){
  try{
    const r=await fetch('data/procedures.json');
    DATA=await r.json();
  }catch(e){console.error(e)}
  renderSuggestions();
  renderQuick();
  renderProcedures(DATA.slice(0,6));
  renderCategories();
}
const icons={ho_tich:'👶',cu_tru:'🏠',dat_dai:'🌱',kinh_doanh:'🏪',lao_dong:'👥',giao_thong:'🚗',chung_thuc:'📄',xay_dung:'🏢',khac:'▦'};
function renderSuggestions(){
  const keys=['khai sinh','kết hôn','đất đai','cư trú','hộ kinh doanh','trợ cấp','chứng thực'];
  document.querySelector('#suggestions').innerHTML=keys.map(x=>`<button onclick="quickSearch('${x}')">${x}</button>`).join('');
}
function renderQuick(){
  const qs=DATA.filter(x=>x.quick);
  document.querySelector('#quickGrid').innerHTML=qs.map(x=>`
    <div class="quick-card" onclick="openProcedure('${x.id}')">
      <div class="ico">${icons[x.category]||'📌'}</div><b>${x.short||x.name}</b>
    </div>`).join('');
}
function renderProcedures(list){
  document.querySelector('#procedureGrid').innerHTML=list.length?list.map(x=>`
    <article class="procedure-card" onclick="openProcedure('${x.id}')">
      <span class="arrow">→</span>
      <div class="top"><div class="ico">${icons[x.category]||'📌'}</div><div>
        <h3>${x.name}</h3><p>${x.field}</p>
      </div></div>
    </article>`).join(''):`<div class="panel" style="padding:25px;grid-column:1/-1">Không tìm thấy thủ tục phù hợp.</div>`;
}
function renderCategories(){
  const cats=[...new Map(DATA.map(x=>[x.category,x.field])).entries()];
  document.querySelector('#categoryGrid').innerHTML=cats.map(([c,f])=>`
    <div class="category" onclick="filterCategory('${c}')"><div class="ico">${icons[c]||'▦'}</div><b>${f}</b></div>`).join('');
}
function search(){
  const q=document.querySelector('#searchInput').value.trim().toLowerCase();
  if(!q){renderProcedures(DATA.slice(0,6));return}
  const terms=q.split(/\s+/);
  const result=DATA.map(x=>{
    const hay=[x.name,x.field,x.description,...(x.keywords||[])].join(' ').toLowerCase();
    let score=0;
    terms.forEach(t=>{if(hay.includes(t))score+=hay.startsWith(t)?3:1});
    return {...x,score};
  }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score);
  document.querySelector('#procedures').scrollIntoView({behavior:'smooth'});
  renderProcedures(result);
}
function quickSearch(q){document.querySelector('#searchInput').value=q;search()}
function filterCategory(c){document.querySelector('#procedures').scrollIntoView({behavior:'smooth'});renderProcedures(DATA.filter(x=>x.category===c))}
function openProcedure(id){
  const x=DATA.find(p=>p.id===id); if(!x)return;
  document.querySelector('#modalContent').innerHTML=`
    <h2>${x.name}</h2>
    <div class="meta"><b>Lĩnh vực:</b> ${x.field}<br><b>Cơ quan thực hiện:</b> ${x.agency}<br><b>Thời gian:</b> ${x.time}</div>
    <p>${x.description}</p>
    <h3>Hồ sơ cần chuẩn bị</h3>
    <ul>${x.documents.map(d=>`<li>${d}</li>`).join('')}</ul>
    <p><b>Lưu ý:</b> ${x.note||'Thành phần hồ sơ và quy trình có thể được cập nhật theo hệ thống chính thức.'}</p>
    <a class="primary" href="${x.url}" target="_blank" rel="noopener">THỰC HIỆN NGAY ↗</a>`;
  document.querySelector('#modal').classList.add('show');
}
function closeModal(){document.querySelector('#modal').classList.remove('show')}
function showGuide(){
  document.querySelector('#modalContent').innerHTML=`<h2>Hướng dẫn sử dụng Phú Hồ Số</h2>
  <p><b>Bước 1:</b> Nhập nhu cầu theo cách nói thông thường, ví dụ “làm giấy khai sinh”.</p>
  <p><b>Bước 2:</b> Chọn thủ tục phù hợp và xem thông tin hồ sơ.</p>
  <p><b>Bước 3:</b> Nhấn “Thực hiện ngay” để chuyển đến hệ thống chính thức.</p>
  <p>Phú Hồ Số là lớp điều phối thông tin, không thay thế hệ thống tiếp nhận và xử lý hồ sơ chính thức.</p>`;
  document.querySelector('#modal').classList.add('show');
}
document.querySelector('#searchBtn').addEventListener('click',search);
document.querySelector('#searchInput').addEventListener('keydown',e=>{if(e.key==='Enter')search()});
document.querySelector('#modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal()});
loadData();