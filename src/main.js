// ========================================
// Paytm Pragati — Main Entry Point
// ========================================

import { registerRoute, initRouter, getCurrentRoute } from './router.js';
import { renderBottomNav, initBottomNavListeners } from './components/bottomNav.js';
import { renderDashboard } from './views/dashboard.js';
import { renderWhatsApp } from './views/whatsapp.js';
import { renderLoanApplication } from './views/loanApplication.js';
import { renderDisbursal } from './views/disbursal.js';
import { renderLoanStatement } from './views/loanStatement.js';
import { renderOnboarding } from './views/onboarding.js';
import { renderLogin } from './views/login.js';
import { store, isAuthenticated } from './store/appState.js';
import { startRealtimeUpdates, stopRealtimeUpdates } from './services/realtimeService.js';
import { fetchDashboardPulse } from './services/apiService.js';


// ========================================
// App Shell Setup
// ========================================

function initApp() {
  const app = document.getElementById('app');
  if (!app) return;

  // Register all routes
  registerRoute('/login', renderLogin, { requiresAuth: false, hideNav: true });
  registerRoute('/dashboard', renderDashboard, { requiresAuth: true });
  registerRoute('/', renderDashboard, { requiresAuth: true });
  registerRoute('/whatsapp', renderWhatsApp, { requiresAuth: true });
  registerRoute('/loans', renderLoanApplication, { requiresAuth: true });
  registerRoute('/disbursal', renderDisbursal, { requiresAuth: true });
  registerRoute('/loan-statement', renderLoanStatement, { requiresAuth: true });
  registerRoute('/onboarding', renderOnboarding, { requiresAuth: true });

  // Check auth state
  if (!isAuthenticated()) {
    // Show login — no bottom nav
    app.innerHTML = `
      <div class="app-shell">
        <div id="app-content"></div>
      </div>
    `;
    window.location.hash = '#/login';
  } else {
    // Authenticated — show full app shell
    showAuthenticatedShell(app);
  }

  // Initialize router
  initRouter('#app-content');

  // Listen for auth changes to rebuild shell
  store.subscribe('auth', (auth) => {
    if (auth.isAuthenticated) {
      showAuthenticatedShell(app);
      initRouter('#app-content');
      initBottomNavListeners();
      startRealtimeUpdates();
      fetchDashboardPulse();
    } else {
      app.innerHTML = `
        <div class="app-shell">
          <div id="app-content"></div>
        </div>
      `;
      stopRealtimeUpdates();
      window.location.hash = '#/login';
      initRouter('#app-content');
    }
  });

  // Start real-time updates if authenticated
  if (isAuthenticated()) {
    startRealtimeUpdates();
    fetchDashboardPulse();
  }
}

function showAuthenticatedShell(app) {
  const currentContent = document.getElementById('app-content')?.innerHTML;
  app.innerHTML = `
    <div class="app-shell bg-paytm-surface">
      <div id="app-content">${currentContent || ''}</div>
      ${renderBottomNav()}
    </div>
  `;
  initBottomNavListeners();
}

// ========================================
// Boot
// ========================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
