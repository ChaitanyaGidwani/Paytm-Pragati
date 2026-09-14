// ========================================
// Shared Header Component (Production)
// ========================================

import { store } from '../store/appState.js';
import { showToast } from './toast.js';

/**
 * @param {'light'|'dark'} mode
 * @param {string} sectionLabel
 */
export function renderHeader(mode = 'light', sectionLabel = 'Dashboard') {
  const merchant = store.get('merchant');
  const isDark = mode === 'dark';
  const bgClass = isDark
    ? 'bg-[#002970] shadow-[0_2px_12px_rgba(0,41,112,0.18)]'
    : 'bg-white/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,41,112,0.06)]';
  const textClass = isDark ? 'text-on-primary' : 'text-primary';
  const subtextClass = isDark ? 'text-primary-fixed' : 'text-on-surface-variant';
  const badgeClass = isDark ? 'text-secondary-container' : 'text-secondary';
  const toggleBg = isDark
    ? 'bg-white/10 text-on-primary hover:bg-white/20 border border-white/15'
    : 'bg-surface-container-low text-primary hover:bg-surface-container border border-outline-variant/20';
  const toggleText = isDark ? 'text-on-primary' : 'text-primary';
  const avatarBg = isDark ? 'bg-primary-fixed text-primary' : 'bg-primary';
  const avatarText = isDark ? '' : 'text-on-primary';

  return `
    <header class="fixed top-0 w-full z-50 pt-safe ${bgClass} transition-colors" style="max-width: 430px;">
      <div class="h-16 px-margin-mobile flex items-center justify-between gap-2">
        <div class="flex items-center gap-2.5 min-w-0 flex-1">
          <div class="w-8 h-8 flex-shrink-0">
            <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-full w-auto">
              <rect width="200" height="60" rx="8" fill="${isDark ? '#ffffff' : '#002970'}"/>
              <text x="12" y="28" font-family="Plus Jakarta Sans, sans-serif" font-weight="800" font-size="14" fill="${isDark ? '#002970' : '#ffffff'}">Paytm</text>
              <text x="12" y="46" font-family="Noto Sans, sans-serif" font-weight="600" font-size="10" fill="${isDark ? '#006686' : '#b3c5ff'}">for Business AI</text>
            </svg>
          </div>
          <div class="flex flex-col min-w-0">
            <div class="flex items-center gap-1 min-w-0">
              <span class="font-headline text-headline-sm ${textClass} truncate leading-tight">${merchant?.storeName || 'Sharma Kirana'}</span>
              <span class="material-symbols-outlined ${badgeClass} text-[18px] flex-shrink-0">verified</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="font-label text-label-sm ${subtextClass} uppercase tracking-wider leading-none">${sectionLabel}</span>
              <span class="inline-flex items-center gap-0.5 bg-whatsapp-green-tint text-success-green px-1.5 py-0.5 rounded-full font-label text-[9px] font-semibold">
                <span class="w-1.5 h-1.5 rounded-full bg-success-green"></span>Live
              </span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-1.5 flex-shrink-0">
          <button aria-label="Toggle Language" class="min-h-[40px] px-2 py-1 flex items-center justify-center rounded-lg ${toggleBg} transition-colors" id="bilingual-toggle">
            <span class="font-label text-label-sm font-bold tracking-tight ${toggleText}">EN | हिं</span>
          </button>
          <button class="w-8 h-8 rounded-full ${avatarBg} flex items-center justify-center flex-shrink-0 ${avatarText}" id="profile-avatar-btn" aria-label="Profile">
            <span class="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  `;
}
