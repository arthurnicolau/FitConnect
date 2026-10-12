// FitConnect Mobile App JavaScript
// Prototype: all data is simulated and kept in memory.

// App State
const state = {
  user: null,
  screen: 'welcome',
  history: [],
  homeType: 'todas',
  search: '',
  filters: emptyFilters()
};

function emptyFilters() {
  return { type: [], time: [], level: [] };
}

// Screen config: auth screens live outside the main app; tab screens reset
// the back stack; "back" screens hide the tab bar and show a back button.
const screens = {
  welcome: { auth: true },
  login: { auth: true },
  register: { auth: true },
  home: { tab: 'home' },
  search: { tab: 'search', title: 'Buscar eventos' },
  chat: { tab: 'chat', title: 'Conversas' },
  profile: { tab: 'profile', title: 'Meu perfil' },
  notifications: { back: true, title: 'Notificações' },
  activityDetail: { back: true, title: 'Evento' }
};

// Date helpers (local time, avoids the UTC off-by-one of new Date('YYYY-MM-DD'))
function toISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function parseISODate(value) {
  const [y, m, d] = value.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function daysFromNow(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return toISODate(date);
}

// App Data (sample dates are relative to today so the feed never goes stale).
// Domain language follows GLOSSARY.md: the UI says "Evento" for what the code calls an activity.
const appData = {
  activities: [
    {
      id: 1,
      title: "Corrida Matinal no Parque",
      type: "corrida",
      date: daysFromNow(1),
      time: "06:00",
      location: "Parque Ibirapuera, São Paulo",
      participants: 12,
      maxParticipants: 20,
      level: "intermediário",
      gender: "todos",
      ageRange: "26-35",
      description: "Corrida de 5km no Parque Ibirapuera. Ritmo moderado, ideal para quem já tem experiência.",
      host: "Ana Silva",
      joined: true
    },
    {
      id: 2,
      title: "Yoga ao Ar Livre",
      type: "yoga",
      date: daysFromNow(2),
      time: "07:30",
      location: "Praia de Copacabana, Rio de Janeiro",
      participants: 8,
      maxParticipants: 15,
      level: "iniciante",
      gender: "feminino",
      ageRange: "18-25",
      description: "Sessão de yoga relaxante na praia, perfeito para começar o dia com energia positiva.",
      host: "Carlos Mendes"
    },
    {
      id: 3,
      title: "Pedalada Urbana",
      type: "ciclismo",
      date: daysFromNow(3),
      time: "08:00",
      location: "Ciclovia da Lagoa, Rio de Janeiro",
      participants: 15,
      maxParticipants: 25,
      level: "iniciante",
      gender: "todos",
      ageRange: "todas",
      description: "Pedalada tranquila pela ciclovia da Lagoa. Ideal para iniciantes e famílias.",
      host: "Maria Costa",
      joined: true
    },
    {
      id: 4,
      title: "Futebol Society",
      type: "esportes coletivos",
      date: daysFromNow(0),
      time: "19:00",
      location: "Arena Sport Center, Belo Horizonte",
      participants: 18,
      maxParticipants: 22,
      level: "intermediário",
      gender: "masculino",
      ageRange: "26-35",
      description: "Partida amistosa de futebol society. Venha se divertir e fazer novos amigos!",
      host: "João Santos"
    },
    {
      id: 5,
      title: "Caminhada Ecológica",
      type: "caminhada",
      date: daysFromNow(4),
      time: "15:00",
      location: "Trilha da Tijuca, Rio de Janeiro",
      participants: 6,
      maxParticipants: 12,
      level: "iniciante",
      gender: "todos",
      ageRange: "46-55",
      description: "Caminhada leve pela trilha da Tijuca. Vamos apreciar a natureza juntos!",
      host: "Fernanda Lima"
    },
    {
      id: 6,
      title: "Natação para Iniciantes",
      type: "natação",
      date: daysFromNow(5),
      time: "09:00",
      location: "Piscina Municipal, Brasília",
      participants: 4,
      maxParticipants: 10,
      level: "iniciante",
      gender: "feminino",
      ageRange: "36-45",
      description: "Aulas de natação para iniciantes em ambiente seguro e acolhedor.",
      host: "Patricia Santos"
    },
    {
      id: 7,
      title: "Crossfit Avançado",
      type: "musculação",
      date: daysFromNow(6),
      time: "18:00",
      location: "Box CrossFit, Porto Alegre",
      participants: 18,
      maxParticipants: 18,
      level: "avançado",
      gender: "todos",
      ageRange: "26-35",
      description: "Treino intensivo de crossfit para atletas experientes.",
      host: "Ricardo Lima"
    },
    {
      id: 8,
      title: "Vôlei de Praia",
      type: "esportes coletivos",
      date: daysFromNow(7),
      time: "16:00",
      location: "Praia de Ipanema, Rio de Janeiro",
      participants: 8,
      maxParticipants: 12,
      level: "intermediário",
      gender: "todos",
      ageRange: "todas",
      description: "Partida de vôlei de praia com vista para o mar!",
      host: "Camila Rodrigues"
    }
  ],

  user: {
    name: "Pedro Oliveira",
    email: "pedro@exemplo.com",
    bio: "Apaixonado por esportes e vida saudável",
    preferences: ["corrida", "ciclismo", "natação"],
    level: "intermediário",
    city: "São Paulo, SP",
    gender: "masculino",
    birthDate: "1996-03-20",
    stats: {
      activitiesJoined: 24,
      distanceCovered: 185,
      connections: 12
    },
    history: [
      { activity: "Corrida no Parque", date: daysFromNow(-6), type: "corrida" },
      { activity: "Pedalada Zona Sul", date: daysFromNow(-9), type: "ciclismo" },
      { activity: "Natação na Urca", date: daysFromNow(-11), type: "natação" }
    ]
  },

  notifications: [
    {
      id: 1,
      type: "invite",
      title: "Novo convite",
      message: "Ana Silva te convidou para 'Vôlei de Praia'",
      timestamp: "2 h",
      read: false
    },
    {
      id: 2,
      type: "reminder",
      title: "Lembrete de evento",
      message: "'Corrida Matinal no Parque' é amanhã às 06:00",
      timestamp: "1 h",
      read: false
    },
    {
      id: 3,
      type: "update",
      title: "Evento cancelado",
      message: "Infelizmente 'Futebol no Parque' foi cancelado devido ao mau tempo",
      timestamp: "1 d",
      read: true
    }
  ],

  chats: [
    {
      id: 1,
      activityId: 1,
      groupName: "Corrida Matinal no Parque",
      type: "corrida",
      lastMessage: "Ana: Nos vemos às 6h na entrada principal!",
      timestamp: "10:30",
      unread: 2
    },
    {
      id: 2,
      activityId: 3,
      groupName: "Pedalada Urbana",
      type: "ciclismo",
      lastMessage: "Maria: Quem precisar, tenho bike extra!",
      timestamp: "08:45",
      unread: 0
    }
  ],

  activityTypes: [
    {name: "corrida", icon: "🏃", color: "#FF6B6B"},
    {name: "caminhada", icon: "🚶", color: "#4ECDC4"},
    {name: "ciclismo", icon: "🚴", color: "#45B7D1"},
    {name: "yoga", icon: "🧘", color: "#96CEB4"},
    {name: "esportes coletivos", icon: "⚽", color: "#FECA57"},
    {name: "natação", icon: "🏊", color: "#00D2FF"},
    {name: "musculação", icon: "🏋️", color: "#FF9500"}
  ],

  genderOptions: [
    {value: "todos", label: "Aberto a todos", icon: "👥"},
    {value: "masculino", label: "Só masculino", icon: "♂️"},
    {value: "feminino", label: "Só feminino", icon: "♀️"}
  ],

  ageRanges: [
    {value: "todas", label: "Todas as idades"},
    {value: "18-25", label: "18-25 anos"},
    {value: "26-35", label: "26-35 anos"},
    {value: "36-45", label: "36-45 anos"},
    {value: "46-55", label: "46-55 anos"},
    {value: "55+", label: "55+ anos"}
  ]
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
  initializeSearch();
  startStatusClock();

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeCreateActivity();
  });

  showScreen('welcome');
}

// Screen Management
function showScreen(screenId, options = {}) {
  const config = screens[screenId];
  if (!config) return;

  // Main app screens require a logged-in user
  if (!config.auth && !state.user) return showScreen('welcome');

  // Back stack: tab/auth screens reset it, pushed screens remember where we came from
  if (config.back) {
    if (!options.fromBack && state.screen !== screenId) state.history.push(state.screen);
  } else {
    state.history = [];
  }
  state.screen = screenId;

  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.toggle('active', screen.id === screenId);
  });

  const mainApp = document.getElementById('mainApp');
  mainApp.classList.toggle('hidden', !!config.auth);
  mainApp.classList.toggle('no-tabs', !!config.back);
  document.getElementById('device').classList.toggle('is-auth', !!config.auth);

  if (!config.auth) {
    updateAppBar(screenId, config);
    updateTabBar(config.tab);
    document.getElementById('appContent').scrollTop = 0;
  }

  // Load screen-specific data
  switch (screenId) {
    case 'home': renderHome(); break;
    case 'search': loadSearchResults(); break;
    case 'profile': loadUserProfile(); break;
    case 'chat': loadChatList(); break;
    case 'notifications': loadNotifications(); break;
  }
}

function goBack() {
  const previous = state.history.pop() || 'home';
  showScreen(previous, { fromBack: true });
}

function updateAppBar(screenId, config) {
  document.getElementById('appBarBack').hidden = !config.back;
  document.getElementById('appBarLogo').hidden = screenId !== 'home';
  document.getElementById('appBarTitle').textContent = screenId === 'home' ? '' : (config.title || '');
  document.getElementById('bellBtn').hidden = screenId === 'notifications';
  const headerAvatar = document.getElementById('headerAvatar');
  headerAvatar.hidden = !!config.back || screenId === 'profile';
  headerAvatar.textContent = initials(state.user.name);
  updateBadges();
}

function updateTabBar(activeTab) {
  document.querySelectorAll('.tab[data-tab]').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === activeTab);
  });
}

function updateBadges() {
  const unreadNotifications = appData.notifications.filter(n => !n.read).length;
  const bellBadge = document.getElementById('bellBadge');
  bellBadge.hidden = unreadNotifications === 0;
  bellBadge.textContent = unreadNotifications;

  const unreadChats = visibleChats().reduce((sum, chat) => sum + chat.unread, 0);
  const chatBadge = document.getElementById('chatBadge');
  chatBadge.hidden = unreadChats === 0;
  chatBadge.textContent = unreadChats;
}

// Authentication Functions
function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  // Simulated login: any email/password is accepted until there is a backend
  if (!email || !password) {
    showMessage('Por favor, preencha todos os campos.', 'error');
    return;
  }

  enterApp({ ...appData.user, email }, `Bem-vindo de volta, ${firstName(appData.user.name)}!`);
}

function handleRegister(event) {
  event.preventDefault();

  const name = document.getElementById('registerName').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const city = document.getElementById('registerCity').value.trim();
  const level = document.getElementById('registerLevel').value;
  const birthDate = document.getElementById('registerBirthDate').value;
  const gender = document.getElementById('registerGender').value;
  const acceptTerms = document.getElementById('acceptTerms').checked;

  if (!name || !email || !password || !confirmPassword || !city || !level || !birthDate || !gender) {
    showMessage('Por favor, preencha todos os campos.', 'error');
    return;
  }

  if (birthDate >= toISODate(new Date())) {
    showMessage('Informe uma data de nascimento válida.', 'error');
    return;
  }

  if (password.length < 6) {
    showMessage('A senha precisa ter pelo menos 6 caracteres.', 'error');
    return;
  }

  if (password !== confirmPassword) {
    showMessage('As senhas não coincidem.', 'error');
    return;
  }

  if (!acceptTerms) {
    showMessage('Você deve aceitar os termos de uso.', 'error');
    return;
  }

  // A brand-new account has no sign-ups; drop the sample user's ones
  appData.activities.forEach(activity => {
    if (activity.joined) activity.participants--;
    activity.joined = false;
  });

  enterApp({
    ...appData.user,
    name,
    email,
    city,
    level,
    birthDate,
    gender,
    bio: 'Novo no FitConnect 👋',
    preferences: [],
    stats: { activitiesJoined: 0, distanceCovered: 0, connections: 0 },
    history: []
  }, `Conta criada! Bem-vindo, ${firstName(name)}!`);
}

function enterApp(user, message) {
  state.user = user;
  showScreen('home');
  showMessage(message, 'success');
}

function forgotPassword(event) {
  event.preventDefault();
  showMessage('A recuperação de senha chega junto com o login real.', 'info');
}

function logout() {
  state.user = null;
  state.homeType = 'todas';

  document.getElementById('loginForm').reset();
  document.getElementById('registerForm').reset();
  clearAllFilters();

  showScreen('welcome');
  showMessage('Você saiu da sua conta.', 'info');
}

// Home
function renderHome() {
  document.getElementById('homeGreeting').textContent = `Olá, ${firstName(state.user.name)} 👋`;
  document.getElementById('homeDate').textContent = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long', day: 'numeric', month: 'long'
  });

  // Category quick filters
  const categories = document.getElementById('homeCategories');
  categories.innerHTML = '';
  [{ name: 'todas', icon: '✨' }, ...appData.activityTypes].forEach(type => {
    const chip = document.createElement('button');
    chip.className = `chip${state.homeType === type.name ? ' active' : ''}`;
    chip.textContent = `${type.icon} ${type.name}`;
    chip.onclick = () => {
      state.homeType = type.name;
      renderHome();
    };
    categories.appendChild(chip);
  });

  loadActivityFeed();
}

// Requirements (docs/SPEC.md §3)
const levelOrder = ['iniciante', 'intermediário', 'avançado'];

function ageOf(birthDate) {
  const birth = parseISODate(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  if (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate())) age--;
  return age;
}

function ageInRange(age, range) {
  if (range === 'todas') return true;
  if (range.endsWith('+')) return age >= parseInt(range, 10);
  const [min, max] = range.split('-').map(Number);
  return age >= min && age <= max;
}

// Returns the first requirement the user does not meet, or null if they may join.
// Requirements never apply to the event's organizer.
function unmetRequirement(activity, user) {
  if (activity.isHost) return null;
  if (levelOrder.indexOf(user.level) < levelOrder.indexOf(activity.level)) {
    return `Exige nível ${activity.level} ou acima`;
  }
  if (!ageInRange(ageOf(user.birthDate), activity.ageRange)) {
    return `Exige idade entre ${getAgeLabel(activity.ageRange)}`;
  }
  if (activity.gender !== 'todos' && activity.gender !== user.gender) {
    return `Evento ${getGenderLabel(activity.gender).toLowerCase()}`;
  }
  return null;
}

function isCancelled(activity) {
  return activity.status === 'cancelado';
}

// Feed and search only show public, upcoming, non-cancelled events the user can join (SPEC §4.1)
function upcomingActivities() {
  const today = toISODate(new Date());
  return appData.activities
    .filter(activity =>
      activity.date >= today &&
      !isCancelled(activity) &&
      activity.visibility !== 'privado' &&
      !unmetRequirement(activity, state.user)
    )
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
}

function loadActivityFeed() {
  const feedContainer = document.getElementById('activityFeed');
  if (!feedContainer) return;

  const activities = upcomingActivities().filter(activity =>
    state.homeType === 'todas' || activity.type === state.homeType
  );

  document.getElementById('homeCount').textContent =
    `${activities.length} ${activities.length === 1 ? 'evento' : 'eventos'}`;
  renderActivityList(feedContainer, activities, {
    emoji: '🗓️',
    title: 'Nada por aqui ainda',
    text: 'Que tal criar o primeiro evento dessa modalidade?'
  });
}

function renderActivityList(container, activities, empty) {
  container.innerHTML = '';

  if (activities.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="emoji">${empty.emoji}</div>
        <h3>${empty.title}</h3>
        <p>${empty.text}</p>
      </div>
    `;
    return;
  }

  activities.forEach(activity => container.appendChild(createActivityCard(activity)));
}

function createActivityCard(activity) {
  const card = document.createElement('button');
  card.className = 'activity-card';
  card.onclick = () => showActivityDetail(activity.id);

  const type = getActivityType(activity.type);
  const spots = activity.maxParticipants - activity.participants;
  const fill = Math.round((activity.participants / activity.maxParticipants) * 100);

  card.innerHTML = `
    <div class="card-top">
      <div class="type-bubble" style="--type-color:${type.color}">${type.icon}</div>
      <div class="card-main">
        <div class="card-title">${escapeHtml(activity.title)}</div>
        <div class="card-host">por ${escapeHtml(activity.host)}</div>
      </div>
      <span class="level-badge lvl-${levelSlug(activity.level)}">${escapeHtml(capitalize(activity.level))}</span>
    </div>
    <div class="card-meta">
      <span>${icon('calendar')} ${formatDate(activity.date)} · ${escapeHtml(activity.time)}</span>
      <span>${icon('pin')} <span class="truncate">${escapeHtml(activity.location)}</span></span>
    </div>
    <div class="card-bottom">
      <div class="capacity">
        <div class="capacity-bar${spots <= 0 ? ' is-full' : ''}"><span style="width:${fill}%"></span></div>
        <span class="capacity-text">${activity.participants}/${activity.maxParticipants} · ${spots > 0 ? `${spots} ${spots === 1 ? 'vaga' : 'vagas'}` : 'Lotada'}</span>
      </div>
      <div class="card-tags">
        ${activity.visibility === 'privado' ? '<span class="tag tag--private">🔒 Privado</span>' : ''}
        <span class="tag">${getGenderIcon(activity.gender)} ${shortAgeLabel(activity.ageRange)}</span>
      </div>
    </div>
    ${activity.isHost || activity.joined ? `<span class="joined-pill">${icon('check')} ${activity.isHost ? 'Você organiza' : 'Inscrito'}</span>` : ''}
  `;

  return card;
}

// Search Functions
function initializeSearch() {
  // Activity type chips are generated from the data
  const typeContainer = document.getElementById('activityFilters');
  appData.activityTypes.forEach(type => {
    const chip = document.createElement('button');
    chip.className = 'chip';
    chip.dataset.filter = 'type';
    chip.dataset.value = type.name;
    chip.textContent = `${type.icon} ${type.name}`;
    typeContainer.appendChild(chip);
  });

  // One delegated listener for every filter chip
  document.getElementById('filtersPanel').addEventListener('click', event => {
    const chip = event.target.closest('.chip[data-filter]');
    if (chip) toggleFilter(chip.dataset.filter, chip.dataset.value, chip);
  });

  document.getElementById('searchInput').addEventListener('input', event => {
    state.search = event.target.value;
    loadSearchResults();
  });
}

function toggleFiltersPanel() {
  const panel = document.getElementById('filtersPanel');
  const toggle = document.getElementById('filterToggle');
  panel.hidden = !panel.hidden;
  toggle.setAttribute('aria-expanded', String(!panel.hidden));
}

function toggleFilter(filterType, value, element) {
  const values = state.filters[filterType];
  const isActive = values.includes(value);

  state.filters[filterType] = isActive ? values.filter(v => v !== value) : [...values, value];
  element.classList.toggle('active', !isActive);

  loadSearchResults();
}

function clearAllFilters() {
  state.filters = emptyFilters();
  state.search = '';

  document.querySelectorAll('#filtersPanel .chip').forEach(chip => chip.classList.remove('active'));
  document.getElementById('searchInput').value = '';

  loadSearchResults();
}

function matchesTimeOfDay(time, period) {
  const hour = parseInt(time.split(':')[0], 10);
  switch (period) {
    case 'manhã': return hour >= 5 && hour < 12;
    case 'tarde': return hour >= 12 && hour < 18;
    case 'noite': return hour >= 18 || hour < 5;
    default: return true;
  }
}

function loadSearchResults() {
  const resultsContainer = document.getElementById('searchResults');
  if (!resultsContainer || !state.user) return;

  const term = normalize(state.search.trim());
  const { type, time, level } = state.filters;

  const results = upcomingActivities().filter(activity => {
    if (term && ![activity.title, activity.description, activity.location, activity.host]
      .some(field => normalize(field).includes(term))) return false;
    if (type.length && !type.includes(activity.type)) return false;
    if (time.length && !time.some(period => matchesTimeOfDay(activity.time, period))) return false;
    if (level.length && !level.includes(activity.level)) return false;
    return true;
  });

  const activeCount = Object.values(state.filters).reduce((sum, list) => sum + list.length, 0);
  const filterCount = document.getElementById('filterCount');
  filterCount.hidden = activeCount === 0;
  filterCount.textContent = activeCount;

  document.getElementById('resultsCount').textContent =
    `${results.length} ${results.length === 1 ? 'evento encontrado' : 'eventos encontrados'}`;

  renderActivityList(resultsContainer, results, {
    emoji: '🔍',
    title: 'Nenhum evento encontrado',
    text: 'Tente ajustar os filtros ou termos de busca.'
  });
}

// Activity Detail Functions
function showActivityDetail(activityId) {
  if (!renderActivityDetail(activityId)) return;
  showScreen('activityDetail');
}

function renderActivityDetail(activityId) {
  const activity = findActivity(activityId);
  const detailContainer = document.getElementById('detailContent');
  if (!activity || !detailContainer) return false;

  const type = getActivityType(activity.type);
  const spots = activity.maxParticipants - activity.participants;
  const fill = Math.round((activity.participants / activity.maxParticipants) * 100);
  const unmet = unmetRequirement(activity, state.user);
  const cancelled = isCancelled(activity);
  const isPrivate = activity.visibility === 'privado';

  let primaryAction;
  if (cancelled) {
    primaryAction = `<button class="btn btn--outline btn--lg" disabled>Evento cancelado</button>`;
  } else if (activity.isHost) {
    primaryAction = `<button class="btn btn--danger-ghost btn--lg" onclick="cancelEvent(${activity.id})">Cancelar evento</button>`;
  } else if (activity.joined) {
    primaryAction = `<button class="btn btn--outline btn--lg" onclick="toggleJoin(${activity.id})">Desistir</button>`;
  } else if (unmet) {
    primaryAction = `<button class="btn btn--primary btn--lg" disabled>Você não cumpre os requisitos</button>`;
  } else if (spots <= 0) {
    primaryAction = `<button class="btn btn--primary btn--lg" disabled>Evento lotado</button>`;
  } else {
    primaryAction = `<button class="btn btn--primary btn--lg" onclick="toggleJoin(${activity.id})">Participar</button>`;
  }

  // Only the organizer and current participants are in the group conversation (SPEC §8.1)
  const chatAction = (activity.isHost || activity.joined) && !cancelled
    ? `<button class="btn btn--outline btn--lg btn--icon" onclick="openActivityChat(${activity.id})" aria-label="Conversa do grupo">${icon('chat')}</button>`
    : '';

  const hostNote = activity.isHost && !activity.joined
    ? '<p class="muted host-note">Você organiza sem ocupar vaga.</p>'
    : '';

  const inviteBox = isPrivate && activity.isHost && !cancelled ? `
      <div class="panel invite-box">
        <h3>🔒 Link de convite</h3>
        <p class="muted">Este evento é privado: só entra quem recebe este link.</p>
        <code class="invite-link">${escapeHtml(inviteLink(activity))}</code>
        <div class="invite-actions">
          <button class="btn btn--secondary" onclick="copyInviteLink(${activity.id})">Copiar link</button>
          <button class="btn btn--outline" onclick="regenerateInviteLink(${activity.id})">Gerar novo</button>
        </div>
      </div>` : '';

  detailContainer.innerHTML = `
    <div class="detail-hero" style="--type-color:${type.color}">${type.icon}</div>
    <div class="detail-body">
      ${cancelled ? '<div class="notice notice--danger">Este evento foi cancelado pelo organizador.</div>' : ''}
      <div class="detail-badges">
        <span class="level-badge lvl-${levelSlug(activity.level)}">${escapeHtml(capitalize(activity.level))}${activity.level === 'avançado' ? '' : '+'}</span>
        ${isPrivate ? '<span class="tag tag--private">🔒 Privado</span>' : ''}
      </div>
      <h1 class="detail-title">${escapeHtml(activity.title)}</h1>

      <div class="host-row">
        <span class="avatar avatar--md">${escapeHtml(initials(activity.host))}</span>
        <div>
          <small>Organizado por</small>
          <strong>${escapeHtml(activity.host)}</strong>
        </div>
      </div>

      <div class="info-list">
        <div class="info-item">
          <span class="info-icon">${icon('calendar')}</span>
          <div><small>Quando</small>${formatDate(activity.date, true)} às ${escapeHtml(activity.time)}</div>
        </div>
        <div class="info-item">
          <span class="info-icon">${icon('pin')}</span>
          <div><small>Onde</small>${escapeHtml(activity.location)}</div>
        </div>
      </div>

      <div class="detail-section">
        <h3>Requisitos</h3>
        <div class="requirements">
          <span class="tag">${icon('chart')} ${escapeHtml(capitalize(activity.level))}${activity.level === 'avançado' ? '' : ' ou acima'}</span>
          <span class="tag">${icon('calendar')} ${getAgeLabel(activity.ageRange)}</span>
          <span class="tag">${getGenderIcon(activity.gender)} ${getGenderLabel(activity.gender)}</span>
        </div>
        ${unmet && !cancelled ? `<div class="notice">${escapeHtml(unmet)}: você não pode se inscrever.</div>` : ''}
      </div>

      <div class="detail-section">
        <h3>Sobre</h3>
        <p class="detail-description">${escapeHtml(activity.description)}</p>
      </div>

      ${inviteBox}

      <div class="detail-capacity">
        <div class="detail-capacity-head">
          <strong>${activity.participants} de ${activity.maxParticipants} participantes</strong>
          <span class="muted">${spots > 0 ? `${spots} ${spots === 1 ? 'vaga' : 'vagas'}` : 'Lotado'}</span>
        </div>
        <div class="capacity-bar${spots <= 0 ? ' is-full' : ''}"><span style="width:${fill}%"></span></div>
      </div>
      ${hostNote}
    </div>
    <div class="detail-cta">
      ${chatAction}
      ${primaryAction}
    </div>
  `;

  return true;
}

function toggleJoin(activityId) {
  const activity = findActivity(activityId);
  if (!activity || activity.isHost || isCancelled(activity)) return;

  const unmet = unmetRequirement(activity, state.user);
  if (activity.joined) {
    activity.joined = false;
    activity.participants--;
    showMessage('Você desistiu do evento.', 'info');
  } else if (unmet) {
    showMessage(`${unmet}.`, 'error');
    return;
  } else if (activity.participants >= activity.maxParticipants) {
    showMessage('Este evento está lotado.', 'error');
    return;
  } else {
    activity.joined = true;
    activity.participants++;
    showMessage(`Você está dentro! Até ${formatDate(activity.date).toLowerCase()} 💪`, 'success');
  }

  renderActivityDetail(activityId);
}

function cancelEvent(activityId) {
  const activity = findActivity(activityId);
  if (!activity || !activity.isHost || isCancelled(activity)) return;
  if (!confirm(`Cancelar "${activity.title}"? Os participantes serão avisados.`)) return;

  activity.status = 'cancelado';
  showMessage('Evento cancelado. Os participantes foram avisados.', 'info');
  renderActivityDetail(activityId);
}

// Private events: invite link (SPEC §6.2, §6.3)
function newInviteToken() {
  return Math.random().toString(36).slice(2, 10);
}

function inviteLink(activity) {
  const base = location.protocol.startsWith('http') ? location.href.split('#')[0] : 'https://fitconnect.app/';
  return `${base}#convite/${activity.id}/${activity.inviteToken}`;
}

function copyInviteLink(activityId) {
  const link = inviteLink(findActivity(activityId));
  const copied = navigator.clipboard ? navigator.clipboard.writeText(link) : Promise.reject();
  copied
    .then(() => showMessage('Link de convite copiado!', 'success'))
    .catch(() => showMessage('Não foi possível copiar. Selecione o link e copie manualmente.', 'error'));
}

function regenerateInviteLink(activityId) {
  const activity = findActivity(activityId);
  if (!activity || !activity.isHost) return;
  activity.inviteToken = newInviteToken();
  showMessage('Novo link gerado. O anterior não funciona mais.', 'info');
  renderActivityDetail(activityId);
}

function openActivityChat(activityId) {
  showMessage('A conversa do grupo está em desenvolvimento!', 'info');
}

// Profile Functions
function loadUserProfile() {
  const user = state.user;
  if (!user) return;

  document.getElementById('profileAvatar').textContent = initials(user.name);
  document.getElementById('profileName').textContent = user.name;
  document.getElementById('profileMeta').textContent =
    `📍 ${user.city} · ${capitalize(user.level)} · ${ageOf(user.birthDate)} anos`;
  document.getElementById('profileBio').textContent = user.bio;

  const joinedNow = appData.activities.filter(a => a.joined).length;
  document.getElementById('profileStats').innerHTML = `
    <div class="stat-item"><span class="stat-number">${user.stats.activitiesJoined + joinedNow}</span><span class="stat-label">Eventos</span></div>
    <div class="stat-item"><span class="stat-number">${user.stats.distanceCovered}</span><span class="stat-label">Km percorridos</span></div>
    <div class="stat-item"><span class="stat-number">${user.stats.connections}</span><span class="stat-label">Conexões</span></div>
  `;

  const preferenceTags = document.getElementById('preferenceTags');
  preferenceTags.innerHTML = '';
  if (user.preferences.length === 0) {
    preferenceTags.innerHTML = '<p class="muted">Nenhuma preferência ainda.</p>';
  }
  user.preferences.forEach(preference => {
    const tag = document.createElement('span');
    tag.className = 'preference-tag';
    tag.textContent = `${getActivityType(preference).icon} ${preference}`;
    preferenceTags.appendChild(tag);
  });

  const activityHistory = document.getElementById('activityHistory');
  activityHistory.innerHTML = '';
  if (user.history.length === 0) {
    activityHistory.innerHTML = '<p class="muted">Os eventos realizados de que você participou aparecerão aqui.</p>';
  }
  user.history.forEach(item => {
    const type = getActivityType(item.type);
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.innerHTML = `
      <div class="type-bubble" style="--type-color:${type.color}">${type.icon}</div>
      <div class="history-info">
        <h4>${escapeHtml(item.activity)}</h4>
        <p>${formatDate(item.date, true)}</p>
      </div>
    `;
    activityHistory.appendChild(historyItem);
  });
}

// Chat Functions
// Group conversations belong to the organizer and current participants only (SPEC §8)
function visibleChats() {
  return appData.chats.filter(chat => {
    const activity = findActivity(chat.activityId);
    return activity && (activity.isHost || activity.joined);
  });
}

function loadChatList() {
  const chatList = document.getElementById('chatList');
  if (!chatList) return;

  chatList.innerHTML = '';

  const chats = visibleChats();
  if (chats.length === 0) {
    chatList.innerHTML = `
      <div class="empty-state">
        <div class="emoji">💬</div>
        <h3>Nenhuma conversa ainda</h3>
        <p>Participe de um evento para entrar na conversa do grupo.</p>
      </div>
    `;
    return;
  }

  chats.forEach(chat => {
    const type = getActivityType(chat.type);
    const chatItem = document.createElement('button');
    chatItem.className = 'list-item';
    chatItem.onclick = () => openChat(chat.id);

    chatItem.innerHTML = `
      <div class="type-bubble" style="--type-color:${type.color}">${type.icon}</div>
      <div class="list-main">
        <div class="list-head">
          <span class="list-title">${escapeHtml(chat.groupName)}</span>
          <span class="list-time">${chat.timestamp}</span>
        </div>
        <div class="list-preview">
          <span>${escapeHtml(chat.lastMessage)}</span>
          ${chat.unread > 0 ? `<span class="unread-badge">${chat.unread}</span>` : ''}
        </div>
      </div>
    `;

    chatList.appendChild(chatItem);
  });
}

function openChat(chatId) {
  showMessage('A conversa do grupo está em desenvolvimento!', 'info');
}

// Notifications Functions
const notificationIcons = { invite: 'users', reminder: 'clock', update: 'alert' };

function loadNotifications() {
  const notificationsList = document.getElementById('notificationsList');
  if (!notificationsList) return;

  notificationsList.innerHTML = '';

  appData.notifications.forEach(notification => {
    const item = document.createElement('button');
    item.className = `list-item notification-item ${notification.read ? 'read' : 'unread'}`;
    item.onclick = () => markAsRead(notification.id);

    item.innerHTML = `
      <span class="notif-icon">${icon(notificationIcons[notification.type] || 'bell')}</span>
      <div class="list-main">
        <div class="list-head">
          <span class="list-title">${escapeHtml(notification.title)}</span>
          <span class="list-time">${notification.timestamp}</span>
        </div>
        <div class="list-preview">
          <span>${escapeHtml(notification.message)}</span>
          ${notification.read ? '' : '<span class="unread-dot"></span>'}
        </div>
      </div>
    `;

    notificationsList.appendChild(item);
  });

  updateBadges();
}

function markAsRead(notificationId) {
  const notification = appData.notifications.find(n => n.id === notificationId);
  if (notification && !notification.read) {
    notification.read = true;
    loadNotifications();
  }
}

function markAllAsRead() {
  appData.notifications.forEach(n => { n.read = true; });
  loadNotifications();
}

// Create Activity (bottom sheet)
function openCreateActivity() {
  const dateInput = document.getElementById('activityDate');
  dateInput.min = toISODate(new Date());
  if (!dateInput.value) dateInput.value = daysFromNow(1);

  document.getElementById('sheetBackdrop').classList.add('open');
  document.getElementById('createActivitySheet').classList.add('open');
}

function closeCreateActivity() {
  const sheet = document.getElementById('createActivitySheet');
  if (!sheet.classList.contains('open')) return;

  sheet.classList.remove('open');
  document.getElementById('sheetBackdrop').classList.remove('open');
  document.getElementById('createActivityForm').reset();
}

function handleCreateActivity(event) {
  event.preventDefault();

  const date = document.getElementById('activityDate').value;
  if (date < toISODate(new Date())) {
    showMessage('Escolha uma data a partir de hoje.', 'error');
    return;
  }

  const type = document.getElementById('activityType').value;
  const hostParticipates = document.getElementById('hostParticipates').checked;
  const visibility = document.getElementById('activityVisibility').value;
  const newActivity = {
    id: Math.max(0, ...appData.activities.map(a => a.id)) + 1,
    title: document.getElementById('activityTitle').value.trim(),
    type,
    date,
    time: document.getElementById('activityTime').value,
    location: document.getElementById('activityLocation').value.trim(),
    participants: hostParticipates ? 1 : 0, // The organizer takes a spot only if they participate
    maxParticipants: parseInt(document.getElementById('maxParticipants').value, 10),
    level: document.getElementById('activityLevel').value,
    gender: document.getElementById('activityGender').value,
    ageRange: document.getElementById('activityAge').value,
    description: document.getElementById('activityDescription').value.trim(),
    host: state.user ? state.user.name : 'Usuário',
    joined: hostParticipates,
    isHost: true,
    visibility,
    inviteToken: visibility === 'privado' ? newInviteToken() : null
  };

  appData.activities.unshift(newActivity);

  closeCreateActivity();
  showMessage(visibility === 'privado'
    ? 'Evento privado criado! Compartilhe o link de convite.'
    : 'Evento publicado! 🎉', 'success');
  showActivityDetail(newActivity.id);
}

// Utility Functions
function findActivity(id) {
  return appData.activities.find(a => a.id === id);
}

function icon(name) {
  return `<svg class="i" aria-hidden="true"><use href="#i-${name}"/></svg>`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalize(text) {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function levelSlug(level) {
  return normalize(level);
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function firstName(name) {
  return name.split(' ')[0];
}

function initials(name) {
  const parts = name.trim().split(/\s+/);
  const letters = parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0].slice(0, 2);
  return letters.toUpperCase();
}

function formatDate(dateString, long = false) {
  const date = parseISODate(dateString);
  const today = parseISODate(toISODate(new Date()));
  const diff = Math.round((date - today) / 86400000);

  if (diff === 0) return 'Hoje';
  if (diff === 1) return 'Amanhã';
  if (diff === -1) return 'Ontem';

  const options = long
    ? { weekday: 'long', day: 'numeric', month: 'long' }
    : { weekday: 'short', day: '2-digit', month: 'short' };
  return capitalize(date.toLocaleDateString('pt-BR', options).replace(/\./g, ''));
}

function getActivityType(name) {
  return appData.activityTypes.find(t => t.name === name) || { name, icon: '🏃', color: '#10B981' };
}

function getGenderIcon(gender) {
  const genderOption = appData.genderOptions.find(g => g.value === gender);
  return genderOption ? genderOption.icon : '⚥';
}

function getGenderLabel(gender) {
  const genderOption = appData.genderOptions.find(g => g.value === gender);
  return genderOption ? genderOption.label : 'Aberto a todos';
}

function getAgeLabel(ageRange) {
  const ageOption = appData.ageRanges.find(a => a.value === ageRange);
  return ageOption ? ageOption.label : 'Todas as idades';
}

function shortAgeLabel(ageRange) {
  return ageRange === 'todas' ? 'Todas idades' : `${ageRange} anos`;
}

function showMessage(message, type = 'info') {
  const icons = { success: 'check', error: 'alert', info: 'info' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `${icon(icons[type] || 'info')}<span></span>`;
  toast.querySelector('span').textContent = message;

  // One toast at a time, like native snackbars
  const container = document.getElementById('toasts');
  container.replaceChildren(toast);

  setTimeout(() => {
    toast.classList.add('leaving');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  }, 2600);
}

// Simulated phone status bar clock (desktop preview)
function startStatusClock() {
  const clock = document.getElementById('statusClock');
  const tick = () => {
    clock.textContent = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };
  tick();
  setInterval(tick, 30000);
}
