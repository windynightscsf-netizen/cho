// 천간 Heavenly Stems
const STEMS = ['갑','을','병','정','무','기','경','신','임','계'];
const STEMS_HAN = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];

// 지지 Earthly Branches
const BRANCHES = ['자','축','인','묘','진','사','오','미','신','유','술','해'];
const BRANCHES_HAN = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];

// 오행 Five Elements for each stem (index 0-9)
const STEM_ELEMENT = ['목','목','화','화','토','토','금','금','수','수'];
// 오행 for each branch (index 0-11)
const BRANCH_ELEMENT = ['수','토','목','목','토','화','화','토','금','금','토','수'];

// Approximate solar term dates [month, day] for each 절기 month
// Index 0 = 인월(寅, branch 2) starts at 입춘 ~Feb4
const SOLAR_TERMS = [
  [2, 4],  // 입춘 → 인월
  [3, 6],  // 경칩 → 묘월
  [4, 5],  // 청명 → 진월
  [5, 6],  // 입하 → 사월
  [6, 6],  // 망종 → 오월
  [7, 7],  // 소서 → 미월
  [8, 7],  // 입추 → 신월
  [9, 8],  // 백로 → 유월
  [10, 8], // 한로 → 술월
  [11, 7], // 입동 → 해월
  [12, 7], // 대설 → 자월
  [1, 5],  // 소한 → 축월 (next year)
];

// Branch index for each 절기 month (starting from 인=2)
const SOLAR_TERM_BRANCH = [2,3,4,5,6,7,8,9,10,11,0,1];

// 오호둔월법: month stem offset based on year stem
// year stem 갑(0)/기(5) → 인월 starts with 병(2)
const MONTH_STEM_START = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0]; // indexed by year stem

// Days from 1900-01-01 helper
function daysSince1900(year, month, day) {
  const d1 = new Date(1900, 0, 1);
  const d2 = new Date(year, month - 1, day);
  return Math.round((d2 - d1) / 86400000);
}

// Get 년주 year pillar
function getYearPillar(year, month, day) {
  // Check if before 입춘 (approx Feb 4)
  let y = year;
  if (month < 2 || (month === 2 && day < 4)) y -= 1;
  const stemIdx = ((y - 4) % 10 + 10) % 10;
  const branchIdx = ((y - 4) % 12 + 12) % 12;
  return { stem: stemIdx, branch: branchIdx, year: y };
}

// Get 월주 month pillar
function getMonthPillar(year, month, day, yearStemIdx) {
  // Find which solar term month we're in
  let monthBranchIdx = 1; // default 축월
  let solarTermMonthIdx = 11; // default

  for (let i = 0; i < 12; i++) {
    const [stMonth, stDay] = SOLAR_TERMS[i];
    let stYear = year;
    if (stMonth === 1) stYear = year + 1; // 소한 is in Jan of next year

    // Normalize to compare
    const termDate = new Date(stYear, stMonth - 1, stDay);
    const birthDate = new Date(year, month - 1, day);

    if (birthDate >= termDate) {
      solarTermMonthIdx = i;
      monthBranchIdx = SOLAR_TERM_BRANCH[i];
    }
  }

  const stemStart = MONTH_STEM_START[yearStemIdx];
  // 인월(idx 0 in solar terms) has stemStart stem
  // Each subsequent month increments stem by 1
  const stemIdx = (stemStart + solarTermMonthIdx) % 10;

  return { stem: stemIdx, branch: monthBranchIdx };
}

// Get 일주 day pillar
function getDayPillar(year, month, day) {
  // Reference: 1900-01-01 = index 10 (갑술, stem=0 branch=10)
  const days = daysSince1900(year, month, day);
  const idx = ((days + 10) % 60 + 60) % 60;
  return { stem: idx % 10, branch: idx % 12 };
}

// Get hour branch from hour (0-23)
function getHourBranch(hour) {
  // 자시: 23-1, 축시: 1-3, ...
  if (hour === 23) return 0;
  return Math.floor((hour + 1) / 2) % 12;
}

// 오자둔시법: hour stem start based on day stem
const HOUR_STEM_START = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8]; // indexed by day stem

// Get 시주 hour pillar
function getHourPillar(hour, dayStemIdx) {
  const branchIdx = getHourBranch(hour);
  const stemStart = HOUR_STEM_START[dayStemIdx];
  const stemIdx = (stemStart + branchIdx) % 10;
  return { stem: stemIdx, branch: branchIdx };
}

// Main function: calculate all four pillars
function calculateSaju(year, month, day, hour) {
  const yearPillar = getYearPillar(year, month, day);
  const monthPillar = getMonthPillar(year, month, day, yearPillar.stem);
  const dayPillar = getDayPillar(year, month, day);
  const hourPillar = getHourPillar(hour, dayPillar.stem);

  return {
    year: yearPillar,
    month: monthPillar,
    day: dayPillar,
    hour: hourPillar,
  };
}

// Get display info for a pillar
function pillarDisplay(pillar) {
  return {
    stemKor: STEMS[pillar.stem],
    stemHan: STEMS_HAN[pillar.stem],
    branchKor: BRANCHES[pillar.branch],
    branchHan: BRANCHES_HAN[pillar.branch],
    stemElement: STEM_ELEMENT[pillar.stem],
    branchElement: BRANCH_ELEMENT[pillar.branch],
  };
}

// Count 오행 across all 8 characters
function countElements(pillars) {
  const counts = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 };
  ['year', 'month', 'day', 'hour'].forEach(p => {
    counts[STEM_ELEMENT[pillars[p].stem]]++;
    counts[BRANCH_ELEMENT[pillars[p].branch]]++;
  });
  return counts;
}

// Today's day pillar
function getTodayPillar() {
  const now = new Date();
  return getDayPillar(now.getFullYear(), now.getMonth() + 1, now.getDate());
}
