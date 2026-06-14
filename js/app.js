document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('saju-form');
  const resultSection = document.getElementById('result-section');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim() || '당신';
    const birthdate = document.getElementById('birthdate').value;
    const birthtime = document.getElementById('birthtime').value;

    if (!birthdate) return;

    const [year, month, day] = birthdate.split('-').map(Number);
    const hour = birthtime ? parseInt(birthtime.split(':')[0]) : 12;

    const pillars = calculateSaju(year, month, day, hour);
    const displays = {
      year: pillarDisplay(pillars.year),
      month: pillarDisplay(pillars.month),
      day: pillarDisplay(pillars.day),
      hour: pillarDisplay(pillars.hour),
    };
    const elementCounts = countElements(pillars);
    const personality = getPersonalityAnalysis(displays.day.stemKor);
    const elemAnalysis = getElementAnalysis(elementCounts);

    const todayPillar = getTodayPillar();
    const fortune = getDailyFortune(pillars.day.stem, todayPillar.stem, todayPillar.branch);

    renderResult(name, displays, elemAnalysis, personality, fortune);
    resultSection.classList.remove('hidden');
    resultSection.scrollIntoView({ behavior: 'smooth' });
  });
});

function renderResult(name, displays, elemAnalysis, personality, fortune) {
  // Four Pillars
  const pillarsEl = document.getElementById('pillars-display');
  const labels = ['년주 (年柱)', '월주 (月柱)', '일주 (日柱)', '시주 (時柱)'];
  const keys = ['year', 'month', 'day', 'hour'];

  pillarsEl.innerHTML = keys.map((key, i) => {
    const d = displays[key];
    const isDayStem = key === 'day';
    return `
      <div class="pillar-card ${isDayStem ? 'day-pillar' : ''}">
        <div class="pillar-label">${labels[i]}</div>
        <div class="pillar-stem">
          <span class="char-kor">${d.stemKor}</span>
          <span class="char-han">${d.stemHan}</span>
          <span class="element-badge elem-${d.stemElement}">${d.stemElement}</span>
        </div>
        <div class="pillar-divider"></div>
        <div class="pillar-branch">
          <span class="char-kor">${d.branchKor}</span>
          <span class="char-han">${d.branchHan}</span>
          <span class="element-badge elem-${d.branchElement}">${d.branchElement}</span>
        </div>
        ${isDayStem ? '<div class="me-badge">나 (我)</div>' : ''}
      </div>
    `;
  }).join('');

  // Element balance
  const elemEl = document.getElementById('element-analysis');
  const elemColors = { 목: '#4CAF50', 화: '#FF5722', 토: '#FF9800', 금: '#9E9E9E', 수: '#2196F3' };
  const elemEmoji = { 목: '🌲', 화: '🔥', 토: '⛰️', 금: '✨', 수: '💧' };
  const elemMeaning = { 목: '성장·창의', 화: '열정·활력', 토: '안정·포용', 금: '결단·의리', 수: '지혜·의지' };

  elemEl.innerHTML = elemAnalysis.sorted.map(([elem, count]) => {
    const pct = Math.round((count / 8) * 100);
    return `
      <div class="elem-row">
        <div class="elem-name">${elemEmoji[elem]} ${elem} <span class="elem-meaning">${elemMeaning[elem]}</span></div>
        <div class="elem-bar-wrap">
          <div class="elem-bar" style="width:${Math.max(pct, 4)}%; background:${elemColors[elem]}"></div>
        </div>
        <div class="elem-count">${count}개</div>
      </div>
    `;
  }).join('');

  const balanceEl = document.getElementById('element-balance');
  balanceEl.textContent = `오행 상태: ${elemAnalysis.balance}`;

  // Personality
  document.getElementById('personality-title').textContent = personality.title;
  document.getElementById('personality-desc').textContent = personality.desc;
  const traitsEl = document.getElementById('personality-traits');
  traitsEl.innerHTML = personality.traits.map(t => `<span class="trait-tag">${t}</span>`).join('');

  // Daily fortune
  const luckColors = { '좋음': '#4CAF50', '보통': '#FF9800', '주의': '#F44336' };
  document.getElementById('fortune-date').textContent = `오늘 (${fortune.todayGan}) · ${fortune.sipsin}`;
  const luckEl = document.getElementById('fortune-luck');
  luckEl.textContent = fortune.luck;
  luckEl.style.background = luckColors[fortune.luck] || '#888';
  document.getElementById('fortune-message').textContent = fortune.message;

  document.getElementById('result-name').textContent = `${name}님의 사주`;
}
