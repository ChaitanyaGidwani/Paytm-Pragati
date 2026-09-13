// ========================================
// Bottom Navigation Component
// ========================================

import { navigate } from '../router.js';

export function renderBottomNav() {
  return `
    <nav class="fixed bottom-0 w-full z-50 pb-safe bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,41,112,0.08)]" style="max-width: 430px;">
      <div class="flex justify-around items-center h-20 px-2">
        <a class="flex flex-col items-center justify-center min-w-[64px] min-h-[48px] py-1 transition-colors text-primary-container font-bold cursor-pointer" data-nav-path="/dashboard" id="nav-dashboard">
          <span class="material-symbols-outlined text-[24px]">storefront</span>
          <span class="font-label text-label-sm text-center mt-0.5">Home / डैशबोर्ड</span>
        </a>
        <a class="flex flex-col items-center justify-center min-w-[64px] min-h-[48px] py-1 text-on-surface-variant hover:text-primary transition-colors relative cursor-pointer" data-nav-path="/whatsapp" id="nav-whatsapp">
          <span class="material-symbols-outlined text-[24px]">smart_toy</span>
          <span class="font-label text-label-sm text-center mt-0.5">AI Copilot / प्रगति</span>
          <span class="absolute top-1 right-2 w-2 h-2 rounded-full bg-secondary-container"></span>
        </a>
        <a class="flex flex-col items-center justify-center min-w-[64px] min-h-[48px] py-1 text-on-surface-variant hover:text-primary transition-colors relative cursor-pointer" data-nav-path="/loans" id="nav-loans">
          <span class="material-symbols-outlined text-[24px] text-whatsapp-green">chat</span>
          <span class="font-label text-label-sm text-center mt-0.5">WhatsApp / बॉट</span>
          <span class="absolute top-1 right-1.5 px-1 bg-whatsapp-green text-on-primary rounded-full font-label text-[9px] leading-tight">40</span>
        </a>
        <a class="flex flex-col items-center justify-center min-w-[64px] min-h-[48px] py-1 text-on-surface-variant hover:text-primary transition-colors cursor-pointer" data-nav-path="/loan-statement" id="nav-khata">
          <span class="material-symbols-outlined text-[24px]">receipt_long</span>
          <span class="font-label text-label-sm text-center mt-0.5">Khata / हिसाब</span>
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
      navigate(path);
    });
  });
}
