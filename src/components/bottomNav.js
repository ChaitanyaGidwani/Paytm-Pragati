// ========================================
// Bottom Navigation Component (Production)
// ========================================

import { navigate } from '../router.js';
import { store } from '../store/appState.js';

export function renderBottomNav() {
  const loan = store.get('loan');
  const campaigns = store.get('campaigns');
  const loanBadge = loan.status === 'ACTIVE' ? 'Active' : loan.status === 'ELIGIBLE' ? 'Instant' : '';
  const waBadge = campaigns.active?.length || 0;

  return `
    <nav class="fixed bottom-0 w-full z-50 pb-safe bg-white/97 backdrop-blur-xl shadow-[0_-2px_20px_rgba(0,41,112,0.06)] border-t border-surface-container" style="max-width: 430px;" id="bottom-nav">
      <div class="flex justify-around items-center h-16 px-1">
        <a class="flex flex-col items-center justify-center min-w-[54px] min-h-[44px] py-1 transition-colors text-primary-container font-bold cursor-pointer" data-nav-path="/dashboard" id="nav-dashboard">
          <span class="material-symbols-outlined text-[22px]" style="font-variation-settings: 'FILL' 1">storefront</span>
          <span class="font-label text-[10px] text-center mt-0.5 leading-none">Home</span>
        </a>
        <a class="flex flex-col items-center justify-center min-w-[54px] min-h-[44px] py-1 text-on-surface-variant hover:text-primary transition-colors relative cursor-pointer" data-nav-path="/onboarding" id="nav-copilot">
          <span class="material-symbols-outlined text-[22px]">smart_toy</span>
          <span class="font-label text-[10px] text-center mt-0.5 leading-none">AI Copilot</span>
        </a>
        <a class="flex flex-col items-center justify-center min-w-[54px] min-h-[44px] py-1 text-on-surface-variant hover:text-primary transition-colors relative cursor-pointer" data-nav-path="/whatsapp" id="nav-whatsapp">
          <span class="material-symbols-outlined text-[22px] text-whatsapp-green">chat</span>
          <span class="font-label text-[10px] text-center mt-0.5 leading-none">WhatsApp</span>
          ${waBadge > 0 ? `<span class="absolute -top-0.5 right-0 px-1 bg-whatsapp-green text-on-primary rounded-full font-label text-[8px] leading-tight">${waBadge}</span>` : ''}
        </a>
        <a class="flex flex-col items-center justify-center min-w-[54px] min-h-[44px] py-1 text-on-surface-variant hover:text-primary transition-colors relative cursor-pointer" data-nav-path="/loans" id="nav-loans">
          <span class="material-symbols-outlined text-[22px]">account_balance</span>
          <span class="font-label text-[10px] text-center mt-0.5 leading-none">Loans</span>
          ${loanBadge ? `<span class="absolute -top-0.5 right-0 px-1 bg-secondary-container text-on-secondary-container rounded font-label text-[7px] font-bold leading-tight uppercase">${loanBadge}</span>` : ''}
        </a>
        <a class="flex flex-col items-center justify-center min-w-[54px] min-h-[44px] py-1 text-on-surface-variant hover:text-primary transition-colors cursor-pointer" data-nav-path="/loan-statement" id="nav-khata">
          <span class="material-symbols-outlined text-[22px]">receipt_long</span>
          <span class="font-label text-[10px] text-center mt-0.5 leading-none">Khata</span>
        </a>
      </div>
    </nav>
  `;
}

export function initBottomNavListeners() {
  document.querySelectorAll('[data-nav-path]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const path = link.getAttribute('data-nav-path');
      // Haptic feedback
      if (navigator.vibrate) navigator.vibrate(10);
      navigate(path);
    });
  });
}
