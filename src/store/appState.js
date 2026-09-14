// ========================================
// Reactive State Management Store
// ========================================

const listeners = new Map();
let state = {};

function createStore(initialState) {
  state = { ...initialState };

  return {
    getState: () => state,
    
    get: (key) => state[key],

    set: (key, value) => {
      const oldValue = state[key];
      if (typeof value === 'function') {
        state[key] = value(oldValue);
      } else {
        state[key] = value;
      }
      notifyListeners(key);
      // Auto-persist whitelisted keys
      if (['merchant', 'settings', 'auth', 'loan', 'campaigns'].includes(key)) {
        persistState(key, state[key]);
      }
    },

    update: (key, partial) => {
      state[key] = { ...state[key], ...partial };
      notifyListeners(key);
      if (['merchant', 'settings', 'auth', 'loan', 'campaigns'].includes(key)) {
        persistState(key, state[key]);
      }
    },

    subscribe: (key, callback) => {
      if (!listeners.has(key)) listeners.set(key, new Set());
      listeners.get(key).add(callback);
      return () => listeners.get(key).delete(callback);
    },

    reset: () => {
      state = { ...initialState };
      listeners.forEach((cbs, key) => cbs.forEach(cb => cb(state[key])));
    }
  };
}

function notifyListeners(key) {
  if (listeners.has(key)) {
    listeners.get(key).forEach(cb => cb(state[key]));
  }
  // Also notify wildcard listeners
  if (listeners.has('*')) {
    listeners.get('*').forEach(cb => cb(state));
  }
}

function persistState(key, value) {
  try {
    localStorage.setItem(`pragati_${key}`, JSON.stringify(value));
  } catch (e) { /* quota exceeded — silent fail */ }
}

function loadPersistedState(key, fallback) {
  try {
    const stored = localStorage.getItem(`pragati_${key}`);
    return stored ? JSON.parse(stored) : fallback;
  } catch (e) {
    return fallback;
  }
}

// ========================================
// Initial State Definition
// ========================================

const defaultAuth = {
  isAuthenticated: false,
  phone: '',
  otpSent: false,
  otpVerified: false,
  sessionToken: null,
  loginAt: null,
};

const defaultMerchant = {
  id: 'MCHT_9876543210',
  name: 'राजेश शर्मा',
  nameEn: 'Rajesh Sharma',
  phone: '+91 98765 43210',
  storeName: 'Sharma Kirana & General Store',
  storeNameHi: 'शर्मा किराना एंड जनरल स्टोर',
  category: 'Kirana',
  bankName: 'State Bank of India',
  bankShort: 'SBI',
  accountEnding: '4821',
  soundboxId: '#SB-99214',
  soundboxActive: true,
  shopOpenSince: '7:30 AM',
  verified: true,
  kycStatus: 'VERIFIED',
  preferredLang: 'hi',
  createdAt: '2024-01-15',
};

const defaultSettings = {
  language: 'hi',
  whatsappBotEnabled: true,
  dailyAudioEnabled: true,
  notificationsEnabled: true,
  bilingualMode: true,
};

const defaultDashboard = {
  revenue: 0,
  txnCount: 0,
  avgBill: 0,
  trendPercent: 0,
  trendDirection: 'up',
  lastPaymentAmount: 0,
  lastPaymentTime: null,
  dayOfWeek: '',
  dayOfWeekHi: '',
  isLoading: true,
  lastRefreshedAt: null,
};

const defaultLoan = {
  status: 'ELIGIBLE', // ELIGIBLE, APPLIED, PROCESSING, ACTIVE, CLOSED
  eligibility: {
    creditScore: 840,
    creditScoreMax: 900,
    maxAmount: 150000,
    tier: 'HIGH_TRUST',
    tierHi: 'उत्कृष्ट रिकॉर्ड',
  },
  application: {
    amount: 100000,
    tenure: 180,
    dailyDeduction: 596,
    totalRepayable: 107200,
    interestRate: 1.2,
  },
  active: null,
  statement: [],
};

const defaultCampaigns = {
  suggestions: [],
  active: [],
  history: [],
  stats: {
    totalSent: 0,
    totalRedeemed: 0,
    totalRevenue: 0,
    roi: '0x',
  },
  whatsappStatus: {
    connected: true,
    syncActive: true,
    customerCount: 412,
    autoReplyActive: true,
  },
};

const defaultUI = {
  isLoading: false,
  activeDrawer: null, // 'voice', 'settings', null
  toastQueue: [],
  confirmDialog: null,
  networkOnline: true,
};

// ========================================
// Create Global Store Instance
// ========================================

export const store = createStore({
  auth: loadPersistedState('auth', defaultAuth),
  merchant: loadPersistedState('merchant', defaultMerchant),
  settings: loadPersistedState('settings', defaultSettings),
  dashboard: defaultDashboard,
  loan: loadPersistedState('loan', defaultLoan),
  campaigns: loadPersistedState('campaigns', defaultCampaigns),
  ui: defaultUI,
});

// ========================================
// Convenience Actions
// ========================================

export function login(phone, token) {
  store.set('auth', {
    isAuthenticated: true,
    phone,
    otpSent: true,
    otpVerified: true,
    sessionToken: token,
    loginAt: new Date().toISOString(),
  });
}

export function logout() {
  store.set('auth', defaultAuth);
  localStorage.removeItem('pragati_auth');
}

export function isAuthenticated() {
  const auth = store.get('auth');
  return auth && auth.isAuthenticated && auth.sessionToken;
}

export function updateDashboard(updates) {
  store.update('dashboard', updates);
}

export function updateLoan(updates) {
  store.update('loan', updates);
}

export function updateCampaigns(updates) {
  store.update('campaigns', updates);
}

export function setLanguage(lang) {
  store.update('settings', { language: lang });
}

export function getLanguage() {
  return store.get('settings')?.language || 'hi';
}

export function showLoading() {
  store.update('ui', { isLoading: true });
}

export function hideLoading() {
  store.update('ui', { isLoading: false });
}
