'use strict';

// ===== DATA =====

const STEPS = [
  { id: 1, emoji: '💍', name: '프로포즈 & 약혼', timing: '결혼 D-12개월', desc: '결혼 결심부터 양가 상견례까지', category: 'propose' },
  { id: 2, emoji: '🏛️', name: '예식장 선택', timing: 'D-12 ~ D-10개월', desc: '웨딩홀, 호텔, 스몰웨딩 장소 선택', category: 'hall' },
  { id: 3, emoji: '👗', name: '스드메', timing: 'D-10 ~ D-8개월', desc: '스튜디오 · 드레스 · 메이크업 패키지', category: 'sdme' },
  { id: 4, emoji: '💎', name: '예물 & 예단', timing: 'D-8 ~ D-6개월', desc: '웨딩링, 예물, 혼수용품 준비', category: 'jewelry' },
  { id: 5, emoji: '🏠', name: '신혼집 & 인테리어', timing: 'D-8 ~ D-4개월', desc: '신혼집 마련 및 인테리어 시공', category: 'interior' },
  { id: 6, emoji: '💌', name: '청첩장 & 답례품', timing: 'D-3개월', desc: '청첩장 제작, 모바일 청첩장, 답례품', category: 'invitation' },
  { id: 7, emoji: '💐', name: '플로리스트 & 부케', timing: 'D-3개월', desc: '웨딩 꽃장식, 부케, 부토니에', category: 'flower' },
  { id: 8, emoji: '🎂', name: '웨딩케이크', timing: 'D-2개월', desc: '웨딩 케이크 & 디저트 테이블', category: 'cake' },
  { id: 9, emoji: '💄', name: '뷰티 & 한복', timing: 'D-2개월', desc: '신부 뷰티, 한복, 예복 맞춤', category: 'beauty' },
  { id: 10, emoji: '✈️', name: '신혼여행', timing: 'D-day 이후', desc: '국내외 허니문 여행 패키지', category: 'honeymoon' },
];

const EMOJIS_BY_CAT = {
  propose: '💍', hall: '🏛️', sdme: '👗', jewelry: '💎',
  interior: '🏠', invitation: '💌', flower: '💐', cake: '🎂',
  beauty: '💄', honeymoon: '✈️'
};

const SEED_VENDORS = [
  // PREMIUM (프리미엄) - shown first
  { id: 'v1', name: '그랜드 웨딩홀', category: 'hall', region: '서울', desc: '럭셔리 웨딩홀 전문, 500명 규모 대연회장, 1:1 전담 코디네이터 서비스', price: '800만원~', rating: 4.9, adType: 'premium', phone: '02-1234-5678', url: '' },
  { id: 'v2', name: '파리지앵 스튜디오', category: 'sdme', region: '서울', desc: '유럽풍 야외 스튜디오, 드레스 200벌 보유, 유명 메이크업 아티스트 상주', price: '300만원~', rating: 4.8, adType: 'premium', phone: '02-2345-6789', url: '' },
  { id: 'v3', name: '허니문 트래블', category: 'honeymoon', region: '서울', desc: '허니문 전문 여행사 15년 경력, 몰디브/하와이/유럽 패키지 특화', price: '200만원~', rating: 4.9, adType: 'premium', phone: '02-3456-7890', url: '' },

  // PLUS (광고 플러스)
  { id: 'v4', name: '다이아몬드 주얼리', category: 'jewelry', region: '서울', desc: '100% 천연 다이아몬드, GIA 인증서 제공, 맞춤 제작 가능', price: '500만원~', rating: 4.7, adType: 'plus', phone: '02-4567-8901', url: '' },
  { id: 'v5', name: '봄날의 플라워', category: 'flower', region: '경기', desc: '웨딩 플라워 전문 15년 경력, 시즌별 꽃 큐레이션, 당일 배송 보장', price: '50만원~', rating: 4.8, adType: 'plus', phone: '031-1234-5678', url: '' },
  { id: 'v6', name: '모던하우스 인테리어', category: 'interior', region: '서울', desc: '신혼집 특화 인테리어 5년 보증, 가구 패키지 포함, 무료 3D 설계', price: '1,000만원~', rating: 4.6, adType: 'plus', phone: '02-5678-9012', url: '' },
  { id: 'v7', name: '로즈케이크 스튜디오', category: 'cake', region: '서울', desc: '포토제닉 웨딩케이크 전문, SNS에서 핫한 케이크 맛집', price: '20만원~', rating: 4.9, adType: 'plus', phone: '02-6789-0123', url: '' },
  { id: 'v8', name: '뷰티퀸 메이크업', category: 'beauty', region: '부산', desc: '부산 최고의 웨딩 메이크업, 자연스러운 신부 메이크업 전문', price: '30만원~', rating: 4.7, adType: 'plus', phone: '051-1234-5678', url: '' },

  // FREE (무료)
  { id: 'v9', name: '소나무 한복', category: 'beauty', region: '서울', desc: '전통 한복부터 개량 한복까지, 대여 및 구입 가능', price: '15만원~', rating: 4.5, adType: 'free', phone: '02-7890-1234', url: '' },
  { id: 'v10', name: '행복한 인쇄소', category: 'invitation', region: '경기', desc: '청첩장 1000장 기준 3일 완성, 모바일 청첩장 무료 제공', price: '10만원~', rating: 4.4, adType: 'free', phone: '031-2345-6789', url: '' },
  { id: 'v11', name: '스몰웨딩 가든', category: 'hall', region: '경기', desc: '자연친화적 야외 웨딩, 50명 이하 소규모 맞춤형 진행', price: '300만원~', rating: 4.6, adType: 'free', phone: '031-3456-7890', url: '' },
  { id: 'v12', name: '달콤 답례품', category: 'invitation', region: '서울', desc: '맞춤 답례품 제작, 최소 100개 주문, 각인 서비스 포함', price: '5,000원~/개', rating: 4.3, adType: 'free', phone: '02-8901-2345', url: '' },
  { id: 'v13', name: '제주 허니문 하우스', category: 'honeymoon', region: '제주', desc: '제주 독채 렌탈 전문, 프라이빗 허니문 패키지', price: '50만원~', rating: 4.5, adType: 'free', phone: '064-1234-5678', url: '' },
  { id: 'v14', name: '리얼 웨딩 스튜디오', category: 'sdme', region: '부산', desc: '부산 웨딩 사진 전문, 야외 스냅 & 스튜디오 패키지', price: '150만원~', rating: 4.6, adType: 'free', phone: '051-2345-6789', url: '' },
  { id: 'v15', name: '그린 인테리어', category: 'interior', region: '인천', desc: '친환경 자재 사용 인테리어, 신혼집 합리적인 가격', price: '700만원~', rating: 4.4, adType: 'free', phone: '032-1234-5678', url: '' },
];

// ===== STATE =====
let vendors = [];
let currentCategory = 'all';
let currentVendor = null;
let selectedPackage = 'free';

function loadVendors() {
  try {
    const saved = localStorage.getItem('weddingroad_vendors');
    vendors = saved ? JSON.parse(saved) : [...SEED_VENDORS];
  } catch {
    vendors = [...SEED_VENDORS];
  }
}
function saveVendors() {
  localStorage.setItem('weddingroad_vendors', JSON.stringify(vendors));
}

// ===== NAVIGATION =====
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById('page-' + name);
  if (page) {
    page.classList.add('active');
    window.scrollTo(0, 0);
  }
  if (name === 'vendors') renderVendors();
  if (name === 'steps') renderTimeline();
}

function toggleMenu() {
  const m = document.getElementById('mobileMenu');
  m.classList.toggle('open');
}

// ===== HOME =====
function renderHome() {
  // Steps grid
  const grid = document.getElementById('homeStepsGrid');
  if (grid) {
    grid.innerHTML = STEPS.map(s => `
      <div class="step-card" onclick="showPage('vendors');setCategory('${s.category}')">
        <div class="step-num">STEP ${s.id}</div>
        <div class="step-emoji">${s.emoji}</div>
        <div class="step-name">${s.name}</div>
        <div class="step-count">${countByCategory(s.category)}개 업체</div>
      </div>
    `).join('');
  }

  // Featured vendors (premium + plus)
  const featured = document.getElementById('featuredVendors');
  if (featured) {
    const top = vendors.filter(v => v.adType === 'premium' || v.adType === 'plus').slice(0, 3);
    featured.innerHTML = top.map(v => vendorCardHTML(v)).join('');
  }

  // Stat
  const stat = document.getElementById('statVendors');
  if (stat) stat.textContent = vendors.length + '+';
}

function countByCategory(cat) {
  return vendors.filter(v => v.category === cat).length;
}

// ===== TIMELINE =====
function renderTimeline() {
  const el = document.getElementById('timelineContainer');
  if (!el) return;
  el.innerHTML = STEPS.map(s => `
    <div class="timeline-item">
      <div class="timeline-dot">${s.emoji}</div>
      <div class="timeline-content">
        <div class="timeline-card">
          <div class="tl-step-num">STEP ${s.id}</div>
          <div class="tl-emoji">${s.emoji}</div>
          <h3 class="tl-title">${s.name}</h3>
          <p class="tl-desc">${s.desc}</p>
          <div class="tl-timing">⏰ ${s.timing}</div><br/>
          <button class="tl-btn" onclick="showPage('vendors');setCategory('${s.category}')">
            업체 보기 (${countByCategory(s.category)}개) →
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// ===== VENDORS =====
function renderCategoryTabs() {
  const el = document.getElementById('categoryTabs');
  if (!el) return;
  const tabs = [{ id: 'all', label: '전체' }, ...STEPS.map(s => ({ id: s.category, label: s.emoji + ' ' + s.name }))];
  el.innerHTML = tabs.map(t => `
    <button class="cat-tab ${currentCategory === t.id ? 'active' : ''}" onclick="setCategory('${t.id}')">${t.label}</button>
  `).join('');
}

function setCategory(cat) {
  currentCategory = cat;
  renderCategoryTabs();
  renderVendors();
}

function renderVendors() {
  renderCategoryTabs();
  const query = (document.getElementById('searchInput')?.value || '').toLowerCase();
  let list = vendors;

  if (currentCategory !== 'all') {
    list = list.filter(v => v.category === currentCategory);
  }
  if (query) {
    list = list.filter(v =>
      v.name.toLowerCase().includes(query) ||
      v.region.toLowerCase().includes(query) ||
      v.desc.toLowerCase().includes(query)
    );
  }

  // Sort: premium → plus → free
  const order = { premium: 0, plus: 1, free: 2 };
  list = [...list].sort((a, b) => order[a.adType] - order[b.adType]);

  const el = document.getElementById('vendorsList');
  const noRes = document.getElementById('noResults');
  if (!el) return;

  if (list.length === 0) {
    el.innerHTML = '';
    noRes.style.display = 'block';
  } else {
    noRes.style.display = 'none';
    el.innerHTML = list.map(v => vendorCardHTML(v)).join('');
  }
}

function filterVendors() {
  renderVendors();
}

function vendorCardHTML(v) {
  const emoji = EMOJIS_BY_CAT[v.category] || '🏢';
  const stepName = STEPS.find(s => s.category === v.category)?.name || '';
  let badge = '';
  if (v.adType === 'premium') badge = '<span class="premium-badge">⭐ 프리미엄</span>';
  else if (v.adType === 'plus') badge = '<span class="ad-badge">AD</span>';
  return `
    <div class="vendor-card ${v.adType === 'premium' ? 'is-premium' : v.adType === 'plus' ? 'is-ad' : ''}" onclick="openVendor('${v.id}')">
      <div class="vendor-img">
        ${badge}
        <span>${emoji}</span>
      </div>
      <div class="vendor-body">
        <div class="vendor-cat">${stepName}</div>
        <div class="vendor-name">${v.name}</div>
        <div class="vendor-region">📍 ${v.region}</div>
        <div class="vendor-desc">${v.desc}</div>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div class="vendor-price">${v.price}</div>
          <div class="vendor-rating">★ ${v.rating}</div>
        </div>
      </div>
    </div>
  `;
}

function openVendor(id) {
  const v = vendors.find(x => x.id === id);
  if (!v) return;
  currentVendor = v;
  const emoji = EMOJIS_BY_CAT[v.category] || '🏢';
  const stepName = STEPS.find(s => s.category === v.category)?.name || '';
  let badgeHTML = '';
  if (v.adType === 'premium') badgeHTML = '<span class="modal-premium-badge">⭐ 프리미엄 광고</span>';
  else if (v.adType === 'plus') badgeHTML = '<span class="modal-ad-badge">📢 광고</span>';

  document.getElementById('modalBody').innerHTML = `
    <div class="modal-vendor-img">${emoji}</div>
    <div class="modal-info">
      <div class="modal-badges">
        <span class="modal-cat">${stepName}</span>
        ${badgeHTML}
      </div>
      <div class="modal-name">${v.name}</div>
      <div class="modal-region">📍 ${v.region} &nbsp; ★ ${v.rating}</div>
      <div class="modal-desc">${v.desc}</div>
      <div class="modal-details">
        <div class="modal-detail"><strong>가격대</strong><span>${v.price}</span></div>
        <div class="modal-detail"><strong>지역</strong><span>${v.region}</span></div>
        <div class="modal-detail"><strong>연락처</strong><span>${v.phone || '문의 필요'}</span></div>
        <div class="modal-detail"><strong>평점</strong><span>★ ${v.rating}</span></div>
      </div>
      <div class="modal-cta">
        <button class="btn-primary" onclick="contactVendor()">📞 문의하기</button>
        ${v.url ? `<a class="btn-outline" href="${v.url}" target="_blank" style="display:flex;align-items:center;justify-content:center;padding:14px 32px;border:2px solid var(--primary);border-radius:50px;font-weight:700;color:var(--primary)">🌐 홈페이지</a>` : ''}
      </div>
    </div>
  `;
  document.getElementById('vendorModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (e.target === document.getElementById('vendorModal')) closeVendorModal();
}
function closeVendorModal() {
  document.getElementById('vendorModal').classList.remove('open');
  document.body.style.overflow = '';
}
function contactVendor() {
  if (currentVendor?.phone) {
    alert(`📞 ${currentVendor.name}\n연락처: ${currentVendor.phone}\n\n전화 또는 카카오톡으로 문의해주세요!`);
  }
}

// ===== REGISTER =====
function updatePackage(input) {
  selectedPackage = input.value;
  const paySection = document.getElementById('paymentSection');
  const btn = document.getElementById('submitBtn');
  if (selectedPackage === 'free') {
    paySection.style.display = 'none';
    btn.textContent = '무료 등록하기';
  } else if (selectedPackage === 'plus') {
    paySection.style.display = 'block';
    btn.textContent = '광고 플러스 신청 (₩99,000/월)';
  } else {
    paySection.style.display = 'block';
    btn.textContent = '프리미엄 신청 (₩299,000/월)';
  }
}

function populateCategorySelect() {
  const sel = document.getElementById('vendorCategory');
  if (!sel) return;
  sel.innerHTML = '<option value="">카테고리 선택</option>' +
    STEPS.map(s => `<option value="${s.category}">${s.emoji} ${s.name}</option>`).join('');
}

function formatCard(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = v.replace(/(.{4})/g, '$1-').replace(/-$/, '');
}

function submitVendor(e) {
  e.preventDefault();
  const name = document.getElementById('vendorName').value.trim();
  const category = document.getElementById('vendorCategory').value;
  const owner = document.getElementById('vendorOwner').value.trim();
  const phone = document.getElementById('vendorPhone').value.trim();
  const email = document.getElementById('vendorEmail').value.trim();
  const region = document.getElementById('vendorRegion').value;
  const address = document.getElementById('vendorAddress').value.trim();
  const desc = document.getElementById('vendorDesc').value.trim();
  const price = document.getElementById('vendorPrice').value.trim();
  const url = document.getElementById('vendorUrl').value.trim();

  const newVendor = {
    id: 'v' + Date.now(),
    name, category, owner, phone, email, region, address, desc,
    price: price || '문의', url,
    rating: 4.5,
    adType: selectedPackage,
  };

  // Prepend ad vendors to show at top
  if (selectedPackage !== 'free') {
    vendors.unshift(newVendor);
  } else {
    vendors.push(newVendor);
  }
  saveVendors();

  const msg = selectedPackage === 'free'
    ? '업체 등록이 완료되었습니다.<br/>검토 후 24시간 내 노출됩니다.'
    : selectedPackage === 'plus'
    ? '광고 플러스 신청이 완료되었습니다!<br/>카테고리 상단에 즉시 노출됩니다. 🎉'
    : '프리미엄 광고 신청이 완료되었습니다!<br/>최상단 및 메인 페이지에 즉시 노출됩니다! 🌟';

  document.getElementById('successMsg').innerHTML = msg;
  document.getElementById('successModal').style.display = 'flex';
  document.getElementById('registerForm').reset();
  selectedPackage = 'free';
  document.querySelector('input[name="adPackage"][value="free"]').checked = true;
  updatePackage({ value: 'free' });
  renderHome();
}

function closeSuccess() {
  document.getElementById('successModal').style.display = 'none';
  showPage('vendors');
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  loadVendors();
  renderHome();
  populateCategorySelect();
  renderCategoryTabs();

  // Animate stats counter
  animateCounter('statVendors', vendors.length);
});

function animateCounter(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let current = 0;
  const step = Math.ceil(target / 30);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + '+';
    if (current >= target) clearInterval(timer);
  }, 40);
}
