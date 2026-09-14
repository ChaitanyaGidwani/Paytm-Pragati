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


// ========================================
// App Shell Setup
// ========================================

function initApp() {
  const app = document.getElementById('app');
  if (!app) return;

  // Create app shell with mobile constraint
  app.innerHTML = `
    <div class="app-shell bg-paytm-surface">
      <div id="app-content"></div>
      ${renderBottomNav()}
    </div>
  `;

  // Register routes
  registerRoute('/dashboard', renderDashboard);
  registerRoute('/', renderDashboard);
  registerRoute('/whatsapp', renderWhatsApp);
  registerRoute('/loans', renderLoanApplication);
  registerRoute('/disbursal', renderDisbursal);
  registerRoute('/loan-statement', renderLoanStatement);
  registerRoute('/onboarding', renderOnboarding);

  // Initialize router
  initRouter('#app-content');

  // Initialize bottom nav click handlers
  initBottomNavListeners();

  // Set default hash if none
  if (!window.location.hash || window.location.hash === '#') {
    window.location.hash = '#/dashboard';
  }
}

// ========================================
// Boot
// ========================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
