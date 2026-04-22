/* ── Highlight active nav item ── */
(function () {
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(function (el) {
    if (el.getAttribute('href') === page) el.classList.add('active');
  });
})();

/* ── AI Chat ── */
var aiReplies = {
  'Стоит ли докупить NVDA?': 'NVIDIA показывает сильные фундаментальные показатели. Спрос на GPU для ИИ остаётся высоким. Текущий P/E 45x — выше среднего, но рост выручки +122% г/г оправдывает оценку. Можно рассмотреть при откатах к $840.',
  'Какие риски в моём портфеле?': 'Основной риск — концентрация в tech-секторе (85%). Рекомендую диверсифицировать: добавить финансы или здравоохранение. Tesla создаёт волатильность — следите за новостями.',
  'Прогноз на неделю': 'На этой неделе ожидаются данные по инфляции США. Возможна волатильность. Tech-сектор в целом в позитивном тренде. NVDA может достичь $900 при позитивных данных.',
  'Что происходит с Tesla?': 'Tesla снижается из-за слабых данных по продажам в Европе −15% м/м и конкуренции со стороны BYD. Короткосрочно — давление. Долгосрочно — уровень $230 является поддержкой.',
  'Расскажи подробнее про NVDA': 'NVIDIA — лидер рынка GPU для ИИ-вычислений. Их чипы H100/H200 используются в дата-центрах по всему миру. Выручка от дата-центров выросла на 427% г/г в последнем квартале. Ключевые риски: цикличность полупроводников и конкуренция со стороны AMD и Intel.',
  'Расскажи подробнее про AAPL': 'Apple — одна из самых стабильных компаний мирового рынка. Основные доходы: iPhone (52%), Сервисы (22%, и растут). Маржа очень высокая. Риски: насыщение рынка смартфонов, напряжённость США–Китай.',
  'Расскажи подробнее про MSFT': 'Microsoft занимает лидирующие позиции в облаке (Azure +28% г/г) и корпоративном ПО. Инвестиции в OpenAI дают стратегическое преимущество в ИИ. Один из самых надёжных вариантов в tech-секторе.',
  'Расскажи подробнее про TSLA': 'Tesla — лидер электромобилей, но сталкивается с растущей конкуренцией от BYD и GM. Бизнес энергетики и FSD-подписка — потенциальные катализаторы роста. Высокая волатильность.',
};

function addMessage(text) {
  var area = document.getElementById('chat-messages');
  if (!area) return;
  var userBubble = document.createElement('div');
  userBubble.className = 'chat-bubble bubble-user';
  userBubble.textContent = text;
  area.appendChild(userBubble);
  setTimeout(function () {
    var aiBubble = document.createElement('div');
    aiBubble.className = 'chat-bubble bubble-ai';
    aiBubble.textContent = aiReplies[text] || 'Анализирую данные... Ваш бэкенд подключит реального ИИ-аналитика.';
    area.appendChild(aiBubble);
    aiBubble.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, 700);
}

function sendMessage() {
  var input = document.getElementById('chat-input');
  if (!input) return;
  var text = input.value.trim();
  if (!text) return;
  input.value = '';
  addMessage(text);
}

/* ── Toggle switches ── */
function initToggles() {
  document.querySelectorAll('.toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.classList.toggle('on');
    });
  });
}

/* ── Strategy selection ── */
function initStrategies() {
  document.querySelectorAll('.strategy-card').forEach(function (card) {
    card.addEventListener('click', function () {
      document.querySelectorAll('.strategy-card').forEach(function (c) { c.classList.remove('selected'); });
      card.classList.add('selected');
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  /* chat input enter */
  var chatInput = document.getElementById('chat-input');
  if (chatInput) {
    chatInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') sendMessage(); });
  }

  /* auth buttons */
  var loginBtn = document.getElementById('login-btn');
  if (loginBtn) loginBtn.addEventListener('click', function () { window.location.href = 'index.html'; });

  var registerBtn = document.getElementById('register-btn');
  if (registerBtn) registerBtn.addEventListener('click', function () { window.location.href = 'login.html'; });

  initToggles();
  initStrategies();
});
