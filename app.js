// FitConnect Mobile App JavaScript

// App State
let currentUser = null;
let isAuthenticated = false;
let currentScreen = 'welcome';
let activeFilters = {
  type: [],
  time: [],
  level: [],
  gender: [],
  age: []
};

// App Data
const appData = {
  activities: [
    {
      id: 1,
      title: "Corrida Matinal no Parque",
      type: "corrida",
      date: "2025-10-17",
      time: "06:00",
      location: "Parque Ibirapuera, São Paulo",
      participants: 12,
      maxParticipants: 20,
      level: "intermediário",
      gender: "misto",
      ageRange: "26-35",
      description: "Corrida de 5km no Parque Ibirapuera. Ritmo moderado, ideal para quem já tem experiência.",
      host: "Ana Silva",
      image: "🏃"
    },
    {
      id: 2,
      title: "Yoga ao Ar Livre",
      type: "yoga",
      date: "2025-10-18",
      time: "07:30",
      location: "Praia de Copacabana, Rio de Janeiro",
      participants: 8,
      maxParticipants: 15,
      level: "iniciante",
      gender: "feminino",
      ageRange: "18-25",
      description: "Sessão de yoga relaxante na praia, perfeito para começar o dia com energia positiva.",
      host: "Carlos Mendes",
      image: "🧘"
    },
    {
      id: 3,
      title: "Pedalada Urbana",
      type: "ciclismo",
      date: "2025-10-19",
      time: "08:00",
      location: "Ciclovia da Lagoa, Rio de Janeiro",
      participants: 15,
      maxParticipants: 25,
      level: "iniciante",
      gender: "todos",
      ageRange: "todas",
      description: "Pedalada tranquila pela ciclovia da Lagoa. Ideal para iniciantes e famílias.",
      host: "Maria Costa",
      image: "🚴"
    },
    {
      id: 4,
      title: "Futebol Society",
      type: "esportes coletivos",
      date: "2025-10-20",
      time: "19:00",
      location: "Arena Sport Center, Belo Horizonte",
      participants: 18,
      maxParticipants: 22,
      level: "intermediário",
      gender: "masculino",
      ageRange: "18-25",
      description: "Partida amistosa de futebol society. Venha se divertir e fazer novos amigos!",
      host: "João Santos",
      image: "⚽"
    },
    {
      id: 5,
      title: "Caminhada Ecológica",
      type: "caminhada",
      date: "2025-10-21",
      time: "15:00",
      location: "Trilha da Tijuca, Rio de Janeiro",
      participants: 6,
      maxParticipants: 12,
      level: "iniciante",
      gender: "misto",
      ageRange: "46-55",
      description: "Caminhada leve pela trilha da Tijuca. Vamos apreciar a natureza juntos!",
      host: "Fernanda Lima",
      image: "🚶"
    },
    {
      id: 6,
      title: "Natação para Iniciantes",
      type: "natação",
      date: "2025-10-22",
      time: "09:00",
      location: "Piscina Municipal, Brasília",
      participants: 4,
      maxParticipants: 10,
      level: "iniciante",
      gender: "feminino",
      ageRange: "36-45",
      description: "Aulas de natação para iniciantes em ambiente seguro e acolhedor.",
      host: "Patricia Santos",
      image: "🏊"
    },
    {
      id: 7,
      title: "Crossfit Avançado",
      type: "musculação",
      date: "2025-10-23",
      time: "18:00",
      location: "Box CrossFit, Porto Alegre",
      participants: 14,
      maxParticipants: 18,
      level: "avançado",
      gender: "misto",
      ageRange: "26-35",
      description: "Treino intensivo de crossfit para atletas experientes.",
      host: "Ricardo Lima",
      image: "🏋️"
    },
    {
      id: 8,
      title: "Vôlei de Praia",
      type: "esportes coletivos",
      date: "2025-10-24",
      time: "16:00",
      location: "Praia de Ipanema, Rio de Janeiro",
      participants: 8,
      maxParticipants: 12,
      level: "intermediário",
      gender: "misto",
      ageRange: "18-25",
      description: "Partida de vôlei de praia com vista para o mar!",
      host: "Camila Rodrigues",
      image: "🏐"
    }
  ],

  user: {
    name: "Pedro Oliveira",
    email: "pedro@exemplo.com",
    photo: "user-avatar",
    bio: "Apaixonado por esportes e vida saudável",
    preferences: ["corrida", "ciclismo", "natação"],
    level: "intermediário",
    city: "São Paulo, SP",
    birthDate: "1990-05-15",
    gender: "masculino",
    age: 35,
    stats: {
      activitiesJoined: 24,
      distanceCovered: "185 km",
      friendsMade: 12
    },
    history: [
      {
        activity: "Corrida no Parque",
        date: "2025-09-15",
        type: "corrida"
      },
      {
        activity: "Pedalada Zona Sul",
        date: "2025-09-12",
        type: "ciclismo"
      },
      {
        activity: "Natação na Urca",
        date: "2025-09-10",
        type: "natação"
      }
    ]
  },

  notifications: [
    {
      id: 1,
      type: "invite",
      title: "Novo convite para atividade",
      message: "Ana Silva te convidou para 'Corrida Matinal no Parque'",
      timestamp: "2 horas atrás",
      read: false
    },
    {
      id: 2,
      type: "reminder",
      title: "Lembrete de atividade",
      message: "Sua atividade 'Yoga ao Ar Livre' começa em 1 hora",
      timestamp: "1 hora atrás",
      read: false
    },
    {
      id: 3,
      type: "update",
      title: "Atividade cancelada",
      message: "Infelizmente 'Futebol no Parque' foi cancelado devido ao mau tempo",
      timestamp: "1 dia atrás",
      read: true
    }
  ],

  chats: [
    {
      id: 1,
      groupName: "Corrida Matinal no Parque",
      lastMessage: "Nos vemos às 6h na entrada principal!",
      timestamp: "10:30",
      unread: 2,
      messages: [
        {
          sender: "Ana Silva",
          message: "Pessoal, não esqueçam de levar água!",
          timestamp: "09:15"
        },
        {
          sender: "Carlos Mendes",
          message: "Confirmado! Estarei lá.",
          timestamp: "09:45"
        },
        {
          sender: "Ana Silva",
          message: "Nos vemos às 6h na entrada principal!",
          timestamp: "10:30"
        }
      ]
    },
    {
      id: 2,
      groupName: "Yoga ao Ar Livre",
      lastMessage: "Que sessão incrível hoje!",
      timestamp: "08:45",
      unread: 0,
      messages: [
        {
          sender: "Maria Costa",
          message: "Que sessão incrível hoje!",
          timestamp: "08:45"
        }
      ]
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
    {value: "todos", label: "Todos", icon: "⚥"},
    {value: "masculino", label: "Masculino", icon: "♂️"},
    {value: "feminino", label: "Feminino", icon: "♀️"},
    {value: "misto", label: "Misto", icon: "👥"}
  ],

  ageRanges: [
    {value: "todas", label: "Todas as idades", icon: "📅"},
    {value: "18-25", label: "18-25 anos", icon: "🎓"},
    {value: "26-35", label: "26-35 anos", icon: "💼"},
    {value: "36-45", label: "36-45 anos", icon: "👨‍👩‍👧‍👦"},
    {value: "46-55", label: "46-55 anos", icon: "🧑‍🦳"},
    {value: "55+", label: "55+ anos", icon: "👴"}
  ]
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

// Initialize App
function initializeApp() {
  // Check if user is already logged in (in a real app, this would check localStorage or sessionStorage)
  // For demo purposes, we start with the welcome screen
  showScreen('welcome');

  // Initialize activity type filters
  initializeActivityFilters();

  // Load initial data
  loadActivityFeed();
  loadUserProfile();
  loadChatList();
  loadNotifications();
}

// Screen Management
function showScreen(screenId) {
  // Hide all screens
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => screen.classList.remove('active'));

  // Show target screen
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.add('active');
    currentScreen = screenId;

    // Update bottom navigation
    updateBottomNavigation(screenId);

    // Load screen-specific data
    switch(screenId) {
      case 'home':
        loadActivityFeed();
        break;
      case 'search':
        loadSearchResults();
        break;
      case 'profile':
        loadUserProfile();
        break;
      case 'chat':
        loadChatList();
        break;
      case 'notifications':
        loadNotifications();
        break;
    }
  }
}

// Authentication Functions
function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  // Simple validation (in a real app, this would be proper authentication)
  if (email && password) {
    // Simulate login success
    isAuthenticated = true;
    currentUser = appData.user;

    // Show main app and hide auth screens
    document.getElementById('mainApp').classList.remove('hidden');
    document.querySelectorAll('.auth-screen').forEach(screen => {
      screen.style.display = 'none';
    });

    // Go to home screen
    showScreen('home');

    // Show success message
    showMessage('Login realizado com sucesso!', 'success');
  } else {
    showMessage('Por favor, preencha todos os campos.', 'error');
  }
}

function handleRegister(event) {
  event.preventDefault();

  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const city = document.getElementById('registerCity').value;
  const level = document.getElementById('registerLevel').value;
  const gender = document.getElementById('registerGender').value;
  const acceptTerms = document.getElementById('acceptTerms').checked;

  // Validation
  if (!name || !email || !password || !confirmPassword || !city || !level || !gender) {
    showMessage('Por favor, preencha todos os campos.', 'error');
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

  // Simulate registration success
  isAuthenticated = true;
  currentUser = {
    ...appData.user,
    name: name,
    email: email,
    city: city,
    level: level,
    gender: gender
  };

  // Show main app and hide auth screens
  document.getElementById('mainApp').classList.remove('hidden');
  document.querySelectorAll('.auth-screen').forEach(screen => {
    screen.style.display = 'none';
  });

  // Go to home screen
  showScreen('home');

  // Show success message
  showMessage('Cadastro realizado com sucesso!', 'success');
}

function logout() {
  // Reset authentication state
  isAuthenticated = false;
  currentUser = null;

  // Hide main app and show welcome screen
  document.getElementById('mainApp').classList.add('hidden');
  document.querySelectorAll('.auth-screen').forEach(screen => {
    screen.style.display = 'block';
  });

  // Reset forms
  document.getElementById('loginForm').reset();
  document.getElementById('registerForm').reset();

  // Show welcome screen
  showScreen('welcome');

  showMessage('Logout realizado com sucesso!', 'info');
}

// Activity Feed Functions
function loadActivityFeed() {
  const feedContainer = document.getElementById('activityFeed');
  if (!feedContainer) return;

  feedContainer.innerHTML = '';

  appData.activities.forEach(activity => {
    const activityCard = createActivityCard(activity);
    feedContainer.appendChild(activityCard);
  });
}

function createActivityCard(activity) {
  const card = document.createElement('div');
  card.className = 'activity-card';
  card.onclick = () => showActivityDetail(activity.id);

  const genderIcon = getGenderIcon(activity.gender);
  const ageIcon = getAgeIcon(activity.ageRange);

  card.innerHTML = `
    <div class="activity-header">
      <div>
        <div class="activity-title">${activity.title}</div>
        <div class="activity-meta">
          <span>📅 ${formatDate(activity.date)}</span>
          <span>🕐 ${activity.time}</span>
          <span>📍 ${activity.location}</span>
        </div>
      </div>
      <div class="activity-type">${activity.image}</div>
    </div>
    <div class="activity-footer">
      <div class="participants">
        <span>👥 ${activity.participants}/${activity.maxParticipants}</span>
      </div>
      <div class="level-badge ${activity.level}">${activity.level}</div>
    </div>
    <div class="gender-age-badges">
      <div class="badge gender">${genderIcon} ${getGenderLabel(activity.gender)}</div>
      <div class="badge age">${ageIcon} ${getAgeLabel(activity.ageRange)}</div>
    </div>
  `;

  return card;
}

// Search Functions
function initializeActivityFilters() {
  const filtersContainer = document.getElementById('activityFilters');
  if (!filtersContainer) return;

  appData.activityTypes.forEach(type => {
    const chip = document.createElement('div');
    chip.className = 'filter-chip';
    chip.dataset.filter = 'type';
    chip.dataset.value = type.name;
    chip.innerHTML = `${type.icon} ${type.name}`;
    chip.onclick = () => toggleFilter('type', type.name, chip);
    filtersContainer.appendChild(chip);
  });

  // Add event listeners to other filter chips
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', function() {
      const filter = this.dataset.filter;
      const value = this.dataset.value;
      if (filter && value) {
        toggleFilter(filter, value, this);
      }
    });
  });

  // Search input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      loadSearchResults(this.value);
    });
  }
}

function toggleFilter(filterType, value, element) {
  const isActive = element.classList.contains('active');

  if (isActive) {
    element.classList.remove('active');
    activeFilters[filterType] = activeFilters[filterType].filter(v => v !== value);
  } else {
    element.classList.add('active');
    if (!activeFilters[filterType].includes(value)) {
      activeFilters[filterType].push(value);
    }
  }

  loadSearchResults();
}

function clearAllFilters() {
  // Reset active filters
  activeFilters = {
    type: [],
    time: [],
    level: [],
    gender: [],
    age: []
  };

  // Remove active class from all filter chips
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.classList.remove('active');
  });

  // Clear search input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.value = '';
  }

  // Reload search results
  loadSearchResults();
}

function loadSearchResults(searchTerm = '') {
  const resultsContainer = document.getElementById('searchResults');
  if (!resultsContainer) return;

  let filteredActivities = appData.activities;

  // Apply search term filter
  if (searchTerm) {
    filteredActivities = filteredActivities.filter(activity =>
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Apply type filter
  if (activeFilters.type.length > 0) {
    filteredActivities = filteredActivities.filter(activity =>
      activeFilters.type.includes(activity.type)
    );
  }

  // Apply time filter
  if (activeFilters.time.length > 0) {
    filteredActivities = filteredActivities.filter(activity => {
      const hour = parseInt(activity.time.split(':')[0]);
      return activeFilters.time.some(timeFilter => {
        switch(timeFilter) {
          case 'manhã': return hour >= 5 && hour < 12;
          case 'tarde': return hour >= 12 && hour < 18;
          case 'noite': return hour >= 18 || hour < 5;
          default: return true;
        }
      });
    });
  }

  // Apply level filter
  if (activeFilters.level.length > 0) {
    filteredActivities = filteredActivities.filter(activity =>
      activeFilters.level.includes(activity.level)
    );
  }

  // Apply gender filter
  if (activeFilters.gender.length > 0) {
    filteredActivities = filteredActivities.filter(activity =>
      activeFilters.gender.includes(activity.gender)
    );
  }

  // Apply age filter
  if (activeFilters.age.length > 0) {
    filteredActivities = filteredActivities.filter(activity =>
      activeFilters.age.includes(activity.ageRange)
    );
  }

  // Display results
  resultsContainer.innerHTML = '';

  if (filteredActivities.length === 0) {
    resultsContainer.innerHTML = `
      <div class="no-results">
        <h3>Nenhuma atividade encontrada</h3>
        <p>Tente ajustar os filtros ou termos de busca.</p>
      </div>
    `;
  } else {
    filteredActivities.forEach(activity => {
      const activityCard = createActivityCard(activity);
      resultsContainer.appendChild(activityCard);
    });
  }
}

// Activity Detail Functions
function showActivityDetail(activityId) {
  const activity = appData.activities.find(a => a.id === activityId);
  if (!activity) return;

  const detailContainer = document.getElementById('detailContent');
  if (!detailContainer) return;

  const genderIcon = getGenderIcon(activity.gender);
  const ageIcon = getAgeIcon(activity.ageRange);

  detailContainer.innerHTML = `
    <div class="detail-image">
      ${activity.image}
    </div>
    <div class="detail-info">
      <h1 class="detail-title">${activity.title}</h1>
      <div class="detail-meta">
        <div class="meta-item">
          <span>📅</span>
          <span>${formatDate(activity.date)} às ${activity.time}</span>
        </div>
        <div class="meta-item">
          <span>📍</span>
          <span>${activity.location}</span>
        </div>
        <div class="meta-item">
          <span>👨‍🏫</span>
          <span>Organizador: ${activity.host}</span>
        </div>
        <div class="meta-item">
          <span>📊</span>
          <span>Nível: ${activity.level}</span>
        </div>
        <div class="meta-item">
          <span>${genderIcon}</span>
          <span>${getGenderLabel(activity.gender)}</span>
        </div>
        <div class="meta-item">
          <span>${ageIcon}</span>
          <span>${getAgeLabel(activity.ageRange)}</span>
        </div>
      </div>
      <p class="detail-description">${activity.description}</p>
      <div class="participant-info">
        <span><strong>${activity.participants}/${activity.maxParticipants} participantes</strong></span>
        <span>${activity.maxParticipants - activity.participants} vagas restantes</span>
      </div>
      <button class="join-btn" onclick="joinActivity(${activity.id})">
        Participar da Atividade
      </button>
      <button class="chat-btn" onclick="openActivityChat(${activity.id})">
        💬 Chat do Grupo
      </button>
    </div>
  `;

  showScreen('activityDetail');
}

function joinActivity(activityId) {
  const activity = appData.activities.find(a => a.id === activityId);
  if (!activity) return;

  if (activity.participants < activity.maxParticipants) {
    activity.participants++;
    showMessage(`Você se inscreveu em "${activity.title}"!`, 'success');
    showActivityDetail(activityId); // Refresh the detail view
  } else {
    showMessage('Esta atividade está lotada.', 'error');
  }
}

function openActivityChat(activityId) {
  showMessage('Chat em desenvolvimento!', 'info');
  showScreen('chat');
}

// Profile Functions
function loadUserProfile() {
  if (!currentUser) return;

  // Update profile name
  const profileName = document.getElementById('profileName');
  if (profileName) {
    profileName.textContent = currentUser.name;
  }

  // Update profile bio
  const profileBio = document.getElementById('profileBio');
  if (profileBio) {
    profileBio.textContent = currentUser.bio;
  }

  // Update preference tags
  const preferenceTags = document.getElementById('preferenceTags');
  if (preferenceTags) {
    preferenceTags.innerHTML = '';
    currentUser.preferences.forEach(preference => {
      const tag = document.createElement('div');
      tag.className = 'preference-tag';
      tag.textContent = preference;
      preferenceTags.appendChild(tag);
    });
  }

  // Update activity history
  const activityHistory = document.getElementById('activityHistory');
  if (activityHistory) {
    activityHistory.innerHTML = '';
    currentUser.history.forEach(item => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      historyItem.innerHTML = `
        <div class="history-info">
          <h4>${item.activity}</h4>
          <p>${formatDate(item.date)}</p>
        </div>
        <div class="history-type">${getActivityIcon(item.type)}</div>
      `;
      activityHistory.appendChild(historyItem);
    });
  }
}

// Chat Functions
function loadChatList() {
  const chatList = document.getElementById('chatList');
  if (!chatList) return;

  chatList.innerHTML = '';

  appData.chats.forEach(chat => {
    const chatItem = document.createElement('div');
    chatItem.className = 'chat-item';
    chatItem.onclick = () => openChat(chat.id);

    chatItem.innerHTML = `
      <div class="chat-header">
        <div class="chat-name">${chat.groupName}</div>
        <div class="chat-time">${chat.timestamp}</div>
      </div>
      <div class="chat-preview">${chat.lastMessage}</div>
      ${chat.unread > 0 ? `<div class="unread-badge">${chat.unread}</div>` : ''}
    `;

    chatList.appendChild(chatItem);
  });
}

function openChat(chatId) {
  showMessage('Chat individual em desenvolvimento!', 'info');
}

// Notifications Functions
function loadNotifications() {
  const notificationsList = document.getElementById('notificationsList');
  if (!notificationsList) return;

  notificationsList.innerHTML = '';

  appData.notifications.forEach(notification => {
    const notificationItem = document.createElement('div');
    notificationItem.className = `notification-item ${notification.read ? 'read' : 'unread'}`;
    notificationItem.onclick = () => markAsRead(notification.id);

    notificationItem.innerHTML = `
      <div class="notification-header">
        <div class="notification-title">${notification.title}</div>
        <div class="notification-time">${notification.timestamp}</div>
      </div>
      <div class="notification-message">${notification.message}</div>
    `;

    notificationsList.appendChild(notificationItem);
  });
}

function markAsRead(notificationId) {
  const notification = appData.notifications.find(n => n.id === notificationId);
  if (notification) {
    notification.read = true;
    loadNotifications();
  }
}

// Create Activity Functions
function showCreateActivity() {
  const modal = document.getElementById('createActivityModal');
  if (modal) {
    modal.classList.add('active');
    modal.style.display = 'flex';
  }
}

function closeCreateActivity() {
  const modal = document.getElementById('createActivityModal');
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
  }

  // Reset form
  const form = document.getElementById('createActivityForm');
  if (form) {
    form.reset();
  }
}

function handleCreateActivity(event) {
  event.preventDefault();

  const title = document.getElementById('activityTitle').value;
  const type = document.getElementById('activityType').value;
  const date = document.getElementById('activityDate').value;
  const time = document.getElementById('activityTime').value;
  const location = document.getElementById('activityLocation').value;
  const level = document.getElementById('activityLevel').value;
  const gender = document.getElementById('activityGender').value;
  const ageRange = document.getElementById('activityAge').value;
  const maxParticipants = parseInt(document.getElementById('maxParticipants').value);
  const description = document.getElementById('activityDescription').value;

  // Create new activity
  const newActivity = {
    id: appData.activities.length + 1,
    title,
    type,
    date,
    time,
    location,
    participants: 1, // Creator is first participant
    maxParticipants,
    level,
    gender,
    ageRange,
    description,
    host: currentUser ? currentUser.name : 'Usuário',
    image: getActivityIcon(type)
  };

  // Add to activities list
  appData.activities.unshift(newActivity);

  // Close modal
  closeCreateActivity();

  // Refresh activity feed
  loadActivityFeed();

  // Show success message
  showMessage('Atividade criada com sucesso!', 'success');

  // Go to home screen
  showScreen('home');
}

// Utility Functions
function updateBottomNavigation(activeScreen) {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.dataset.screen === activeScreen) {
      item.classList.add('active');
    }
  });
}

function goBack() {
  // Simple back navigation - in a real app, this would maintain a proper history stack
  showScreen('home');
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

function getActivityIcon(type) {
  const activityType = appData.activityTypes.find(t => t.name === type);
  return activityType ? activityType.icon : '🏃';
}

function getGenderIcon(gender) {
  const genderOption = appData.genderOptions.find(g => g.value === gender);
  return genderOption ? genderOption.icon : '⚥';
}

function getGenderLabel(gender) {
  const genderOption = appData.genderOptions.find(g => g.value === gender);
  return genderOption ? genderOption.label : 'Todos';
}

function getAgeIcon(ageRange) {
  const ageOption = appData.ageRanges.find(a => a.value === ageRange);
  return ageOption ? ageOption.icon : '📅';
}

function getAgeLabel(ageRange) {
  const ageOption = appData.ageRanges.find(a => a.value === ageRange);
  return ageOption ? ageOption.label : 'Todas as idades';
}

function showMessage(message, type = 'info') {
  // Create message element
  const messageEl = document.createElement('div');
  messageEl.className = `message ${type}`;
  messageEl.textContent = message;

  // Add to body
  document.body.appendChild(messageEl);

  // Position message
  messageEl.style.position = 'fixed';
  messageEl.style.top = '20px';
  messageEl.style.left = '50%';
  messageEl.style.transform = 'translateX(-50%)';
  messageEl.style.zIndex = '9999';
  messageEl.style.minWidth = '300px';
  messageEl.style.textAlign = 'center';

  // Remove after 3 seconds
  setTimeout(() => {
    if (messageEl.parentNode) {
      messageEl.parentNode.removeChild(messageEl);
    }
  }, 3000);
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.classList.remove('active');
      modal.style.display = 'none';
    }
  });
});

// Prevent form submission on Enter key in search
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter' && event.target.id === 'searchInput') {
    event.preventDefault();
  }
});