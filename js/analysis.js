// Personality by 일간 (day stem)
const ILGAN_PERSONALITY = {
  갑: {
    title: '갑목 (甲木) — 큰 나무',
    traits: ['강한 리더십', '독립적', '곧은 성격', '창의적', '개척자 정신'],
    desc: '갑목 일간은 곧게 하늘을 향해 자라는 큰 나무와 같습니다. 강한 추진력과 리더십을 가졌으며, 자신만의 길을 개척하는 개척자 기질이 있습니다. 때로는 고집스럽게 보일 수 있지만, 그것은 자신의 신념에 대한 확고함에서 비롯됩니다.',
  },
  을: {
    title: '을목 (乙木) — 풀과 넝쿨',
    traits: ['유연함', '협력적', '섬세함', '끈기', '적응력'],
    desc: '을목 일간은 바람에 흔들려도 꺾이지 않는 풀과 넝쿨처럼, 어떤 환경에서도 유연하게 적응합니다. 세심하고 배려심이 깊으며, 인간관계에서 뛰어난 조화를 이룹니다. 겉보기엔 부드럽지만 내면에 강인한 생명력을 가지고 있습니다.',
  },
  병: {
    title: '병화 (丙火) — 태양',
    traits: ['활발함', '열정적', '외향적', '솔직함', '카리스마'],
    desc: '병화 일간은 태양처럼 밝고 따뜻한 에너지를 주위에 발산합니다. 어디서든 주목받는 존재감과 넘치는 에너지가 특징입니다. 솔직하고 직설적이며, 주변 사람들에게 긍정적인 영향을 미칩니다.',
  },
  정: {
    title: '정화 (丁火) — 촛불',
    traits: ['지혜로움', '따뜻함', '섬세한 감수성', '집중력', '예술적 감각'],
    desc: '정화 일간은 어둠 속에서 빛나는 촛불처럼 지혜롭고 깊은 통찰력을 가집니다. 감수성이 풍부하고 예술적 재능이 있으며, 한 가지 일에 깊이 집중하는 능력이 뛰어납니다. 주변을 은은하게 밝히는 따뜻한 존재입니다.',
  },
  무: {
    title: '무토 (戊土) — 큰 산',
    traits: ['안정적', '신뢰감', '포용력', '중재자', '듬직함'],
    desc: '무토 일간은 큰 산처럼 묵직하고 안정적인 성품을 가졌습니다. 신뢰할 수 있는 존재로서 주변의 든든한 버팀목이 됩니다. 넓은 포용력으로 갈등을 조율하고, 오래도록 변함없는 신의를 지킵니다.',
  },
  기: {
    title: '기토 (己土) — 논밭',
    traits: ['실용적', '꼼꼼함', '현실적', '배려심', '성실함'],
    desc: '기토 일간은 만물을 키워내는 기름진 토양처럼 실용적이고 성실합니다. 세심하게 주변을 살피며, 꼼꼼하고 현실적인 판단력이 뛰어납니다. 자신보다 타인을 먼저 생각하는 따뜻한 배려심을 가지고 있습니다.',
  },
  경: {
    title: '경금 (庚金) — 큰 바위/철',
    traits: ['결단력', '원칙적', '추진력', '정의감', '강직함'],
    desc: '경금 일간은 단단한 금속처럼 강직하고 결단력이 있습니다. 원칙을 중시하며 강한 정의감을 가지고 있습니다. 한번 결정한 일은 끝까지 밀어붙이는 추진력이 있으나, 때로는 유연성이 필요합니다.',
  },
  신: {
    title: '신금 (辛金) — 보석/칼날',
    traits: ['예민함', '완벽주의', '날카로운 판단력', '심미안', '자존심'],
    desc: '신금 일간은 잘 다듬어진 보석처럼 세련되고 예민한 감각을 가졌습니다. 완벽을 추구하며 높은 심미적 안목이 있습니다. 날카로운 판단력과 강한 자존심을 가지고 있으며, 자신만의 기준이 명확합니다.',
  },
  임: {
    title: '임수 (壬水) — 큰 강/바다',
    traits: ['지혜로움', '유연함', '적응력', '깊은 사고', '포용력'],
    desc: '임수 일간은 흐르는 강물처럼 지혜롭고 유연합니다. 깊은 사고력과 넓은 시각을 가지고 있으며, 어떤 상황에도 자연스럽게 적응합니다. 지적 호기심이 왕성하고 다양한 분야에 재능을 발휘합니다.',
  },
  계: {
    title: '계수 (癸水) — 빗물/이슬',
    traits: ['섬세함', '직관력', '창의적', '내면의 강인함', '공감 능력'],
    desc: '계수 일간은 대지를 적시는 빗물처럼 조용하지만 깊은 영향력을 가집니다. 뛰어난 직관력과 감수성으로 타인의 마음을 잘 이해합니다. 겉으로는 조용해 보여도 내면에 강인한 의지와 창의성을 품고 있습니다.',
  },
};

// Element descriptions
const ELEMENT_DESC = {
  목: { name: '목 (木)', emoji: '🌲', color: '#4CAF50', meaning: '성장, 창의, 인자함' },
  화: { name: '화 (火)', emoji: '🔥', color: '#FF5722', meaning: '열정, 예의, 활력' },
  토: { name: '토 (土)', emoji: '⛰️', color: '#FF9800', meaning: '신뢰, 안정, 포용' },
  금: { name: '금 (金)', emoji: '✨', color: '#9E9E9E', meaning: '의리, 결단, 정의' },
  수: { name: '수 (水)', emoji: '💧', color: '#2196F3', meaning: '지혜, 유연, 의지' },
};

// 십신 relationship between today's stem and birth day stem
function getSipsin(myStemIdx, todayStemIdx) {
  const myElement = STEM_ELEMENT[myStemIdx];
  const todayElement = STEM_ELEMENT[todayStemIdx];
  const myStemPolarity = myStemIdx % 2; // 0=양, 1=음
  const todayStemPolarity = todayStemIdx % 2;

  const GEN_CYCLE = { 목: '화', 화: '토', 토: '금', 금: '수', 수: '목' };
  const CON_CYCLE = { 목: '토', 화: '금', 토: '수', 금: '목', 수: '화' };

  if (myElement === todayElement) {
    return todayStemPolarity === myStemPolarity ? '비견' : '겁재';
  }
  if (GEN_CYCLE[myElement] === todayElement) {
    return todayStemPolarity === myStemPolarity ? '식신' : '상관';
  }
  if (GEN_CYCLE[todayElement] === myElement) {
    return todayStemPolarity === myStemPolarity ? '정인' : '편인';
  }
  if (CON_CYCLE[myElement] === todayElement) {
    return todayStemPolarity === myStemPolarity ? '정재' : '편재';
  }
  if (CON_CYCLE[todayElement] === myElement) {
    return todayStemPolarity === myStemPolarity ? '정관' : '편관';
  }
  return '비견';
}

const SIPSIN_FORTUNE = {
  비견: { luck: '보통', msg: '오늘은 독립적으로 움직이기 좋은 날입니다. 자신의 의지를 믿고 새로운 일을 시작해 보세요. 경쟁보다는 자기 계발에 집중하면 좋은 결과가 있습니다.' },
  겁재: { luck: '보통', msg: '협력과 경쟁이 공존하는 날입니다. 동료나 파트너와의 관계에 신경 쓰세요. 감정 조절이 중요하며, 충동적인 결정은 피하는 것이 좋습니다.' },
  식신: { luck: '좋음', msg: '창의력과 표현력이 빛나는 날입니다. 예술적 활동이나 새로운 아이디어를 펼치기에 최적입니다. 맛있는 음식을 즐기고 여유로운 시간을 갖는 것도 좋습니다.' },
  상관: { luck: '좋음', msg: '재능이 빛나고 표현 욕구가 강해지는 날입니다. 말과 글의 영향력이 커지니 소통에 집중하세요. 다만 말실수에 주의하고 상대방의 입장도 배려하세요.' },
  정재: { luck: '좋음', msg: '재물과 관련된 일이 잘 풀리는 날입니다. 계획적인 재정 관리와 현실적인 목표 설정이 도움이 됩니다. 성실하게 노력한 일에 보상이 따르는 날입니다.' },
  편재: { luck: '좋음', msg: '활동적이고 역동적인 에너지가 넘치는 날입니다. 사업이나 투자 관련 기회가 생길 수 있습니다. 새로운 인연이나 정보에 열린 자세를 갖추세요.' },
  정관: { luck: '보통', msg: '책임감과 원칙이 강조되는 날입니다. 규칙과 절차를 따르면 좋은 평가를 받을 수 있습니다. 직장이나 사회적 관계에서 신중하고 예의 바른 태도가 중요합니다.' },
  편관: { luck: '주의', msg: '긴장감이 높고 변수가 많은 날입니다. 예상치 못한 상황에 대비하고 스트레스 관리에 신경 쓰세요. 무리한 도전보다는 현재의 자리를 잘 지키는 것이 현명합니다.' },
  정인: { luck: '좋음', msg: '배움과 지원이 찾아오는 날입니다. 공부나 연구, 새로운 기술 습득에 집중하면 큰 성과를 거둘 수 있습니다. 어른이나 선배로부터 도움을 받을 수도 있습니다.' },
  편인: { luck: '보통', msg: '직관력이 강해지고 영감이 떠오르는 날입니다. 예상치 못한 지원이 들어올 수 있지만, 의존하기보다 스스로의 힘을 믿으세요. 명상이나 사색의 시간을 갖는 것이 도움이 됩니다.' },
};

function getDailyFortune(birthDayStemIdx, todayStemIdx, todayBranchIdx) {
  const sipsin = getSipsin(birthDayStemIdx, todayStemIdx);
  const fortune = SIPSIN_FORTUNE[sipsin];
  const todayStemKor = STEMS[todayStemIdx];
  const todayBranchKor = BRANCHES[todayBranchIdx];

  return {
    sipsin,
    luck: fortune.luck,
    message: fortune.msg,
    todayGan: `${todayStemKor}${todayBranchKor}일`,
  };
}

function getPersonalityAnalysis(dayStemKor) {
  return ILGAN_PERSONALITY[dayStemKor] || ILGAN_PERSONALITY['갑'];
}

function getElementAnalysis(counts) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const dominant = sorted[0][0];
  const weak = sorted[sorted.length - 1][0];

  let balance = '균형';
  const max = sorted[0][1];
  const min = sorted[sorted.length - 1][1];
  if (max >= 4) balance = `${dominant} 과다`;
  else if (min === 0) balance = `${weak} 부재`;

  return { counts, dominant, weak, balance, total, sorted };
}
