// ========================================
// Shared Header Component
// ========================================

import { merchantProfile } from '../data/merchant.js';

/**
 * @param {'light'|'dark'} mode
 * @param {string} sectionLabel
 */
export function renderHeader(mode = 'light', sectionLabel = 'Dashboard') {
  const isDark = mode === 'dark';
  const bgClass = isDark
    ? 'bg-[#002970] shadow-[0_2px_12px_rgba(0,41,112,0.18)]'
    : 'bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,41,112,0.06)]';
  const textClass = isDark ? 'text-on-primary' : 'text-primary';
  const subtextClass = isDark ? 'text-primary-fixed' : 'text-on-surface-variant';
  const badgeClass = isDark ? 'text-secondary-container' : 'text-secondary';
  const toggleBg = isDark
    ? 'bg-white/10 text-on-primary hover:bg-white/20 border border-white/15'
    : 'bg-surface-container-low text-primary hover:bg-surface-container';
  const toggleText = isDark ? 'text-on-primary' : 'text-primary';
  const avatarBg = isDark ? 'bg-primary-fixed text-primary' : 'bg-primary';
  const avatarText = isDark ? '' : 'text-on-primary';
  const logoFilter = isDark ? 'brightness-0 invert' : '';

  return `
    <header class="fixed top-0 w-full z-50 pt-safe ${bgClass}" style="max-width: 430px;">
      <div class="h-20 px-margin-mobile flex items-center justify-between gap-gutter-mobile">
        <div class="flex items-center gap-space-sm min-w-0 flex-1">
          <div class="h-8 w-8 flex-shrink-0 ${logoFilter}">
            <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-full w-auto">
              <rect width="200" height="60" rx="8" fill="${isDark ? '#ffffff' : '#002970'}"/>
              <text x="12" y="28" font-family="Plus Jakarta Sans, sans-serif" font-weight="800" font-size="14" fill="${isDark ? '#002970' : '#ffffff'}">Paytm</text>
              <text x="12" y="46" font-family="Noto Sans, sans-serif" font-weight="600" font-size="10" fill="${isDark ? '#006686' : '#b3c5ff'}">for Business AI</text>
              <circle cx="175" cy="30" r="14" fill="${isDark ? '#25D366' : '#2bc6ff'}" opacity="0.3"/>
              <text x="168" y="35" font-family="Material Symbols Outlined" font-size="16" fill="${isDark ? '#002970' : '#ffffff'}">&#xe1af;</text>
            </svg>
          </div>
          <div class="flex flex-col min-w-0">
            <button class="flex items-center gap-1 text-left min-w-0 group">
              <span class="font-headline text-headline-sm ${textClass} truncate">${merchantProfile.storeName}</span>
              <span class="material-symbols-outlined ${badgeClass} text-[20px] flex-shrink-0 group-hover:text-primary transition-colors">verified</span>
              <span class="material-symbols-outlined ${isDark ? 'text-primary-fixed-dim' : 'text-on-surface-variant'} text-[18px] flex-shrink-0">expand_more</span>
            </button>
            <div class="flex items-center gap-space-sm">
              <span class="text-label-sm font-label ${subtextClass} uppercase tracking-wider">${sectionLabel}</span>
              <span class="inline-flex items-center gap-1 bg-whatsapp-green-tint text-success-green px-1.5 py-0.5 rounded-full font-label text-label-sm font-semibold">
                <span class="material-symbols-outlined text-[12px]">volume_up</span>Soundbox Active
              </span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-space-xs flex-shrink-0">
          <button aria-label="Bilingual Toggle" class="min-h-[44px] px-2 py-1 flex items-center justify-center rounded-lg ${toggleBg} transition-colors" id="bilingual-toggle">
            <span class="font-label text-label-sm font-bold tracking-tight ${toggleText}">EN | हिं</span>
          </button>
          <div class="w-8 h-8 rounded-full ${avatarBg} flex items-center justify-center flex-shrink-0 ml-1 ${avatarText}">
            <span class="material-symbols-outlined text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  `;
}
