// ========================================
// Onboarding & Welcome View
// ========================================

import { renderHeader } from '../components/header.js';
import { showToast } from '../components/toast.js';
import { merchantProfile, onboardingData } from '../data/merchant.js';
import { navigate } from '../router.js';

export function renderOnboarding() {
  const d = onboardingData;

  // Build language pills HTML
  const langPillsHtml = d.languages.map(lang => {
    const isActive = lang.active;
    const baseClasses = 'lang-pill flex items-center gap-1.5 px-3.5 py-2 rounded-full font-label text-label-md transition-all whitespace-nowrap';
    const activeClasses = isActive
      ? 'bg-primary-container text-on-primary shadow-sm'
      : 'bg-surface-container text-on-surface';

    const checkHtml = isActive
      ? `<span class="material-symbols-outlined text-[16px] text-secondary-container">check</span>`
      : '';

    const waveHtml = isActive
      ? `<span class="flex items-center gap-0.5 ml-1">
           <span class="w-0.5 h-2.5 bg-secondary-container rounded-full animate-pulse"></span>
           <span class="w-0.5 h-3.5 bg-secondary-container rounded-full animate-pulse" style="animation-delay: 75ms;"></span>
           <span class="w-0.5 h-2 bg-secondary-container rounded-full animate-pulse" style="animation-delay: 150ms;"></span>
         </span>`
      : '';

    return `<button class="${baseClasses} ${activeClasses}" data-lang="${lang.code}" type="button">
      ${checkHtml}
      <span>${lang.label}</span>
      ${waveHtml}
    </button>`;
  }).join('');

  // Build superpowers cards HTML
  const superpowerCardsHtml = d.superpowers.map(sp => {
    const subtitleColorClass = sp.subtitleColor || 'text-secondary';

    // Determine tip area styling
    const tipBg = sp.tipBg || 'bg-surface-container-low';
    const tipLayout = sp.tipStatus
      ? `<div class="mt-3.5 pt-3 flex items-center justify-between ${tipBg} p-2.5 rounded-lg">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[18px] text-secondary-container">${sp.tipIcon}</span>
            <span class="font-body text-body-sm text-on-surface">${sp.tipText}</span>
          </div>
          <span class="font-label text-label-sm text-success-green font-bold">${sp.tipStatus}</span>
        </div>`
      : `<div class="mt-3.5 flex items-center gap-2 p-2.5 rounded-lg ${tipBg} text-on-surface">
          <div class="w-6 h-6 rounded-full bg-whatsapp-green text-on-primary flex items-center justify-center flex-shrink-0">
            <span class="material-symbols-outlined text-[14px]">${sp.tipIcon}</span>
          </div>
          <span class="font-body text-body-sm text-on-surface font-medium truncate">${sp.tipText}</span>
        </div>`;

    return `
      <div class="relative overflow-hidden p-4 rounded-xl bg-surface-container-lowest shadow-md animate-fade-in">
        <div class="absolute left-0 top-0 bottom-0 w-1.5 ${sp.accentColor}"></div>
        <div class="flex items-start justify-between gap-2">
          <div class="flex items-center gap-2.5">
            <div class="w-10 h-10 rounded-xl ${sp.iconBg} flex items-center justify-center ${sp.iconColor}">
              <span class="material-symbols-outlined text-[24px]">${sp.icon}</span>
            </div>
            <div>
              <h3 class="font-headline text-headline-sm text-primary">${sp.titleHi}</h3>
              <p class="font-label text-label-sm ${subtitleColorClass} uppercase font-bold">${sp.subtitleEn}</p>
            </div>
          </div>
          <span class="px-2 py-0.5 rounded-full ${sp.badgeBg} ${sp.badgeColor} font-label text-label-sm font-bold flex-shrink-0">
            ${sp.badgeText}
          </span>
        </div>
        <p class="mt-3 font-body text-body-md text-on-surface-variant leading-relaxed">${sp.description}</p>
        ${tipLayout}
      </div>`;
  }).join('');

  // Build setup checklist HTML
  const checklistHtml = d.setupChecklist.map((item, index) => {
    const divider = index < d.setupChecklist.length - 1
      ? `<div class="h-[1px] bg-surface-container"></div>`
      : '';

    if (item.complete) {
      return `
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-whatsapp-green-tint text-success-green flex items-center justify-center flex-shrink-0 mt-0.5">
              <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">check</span>
            </div>
            <div>
              <p class="font-label text-label-lg text-primary">${item.title}</p>
              <p class="font-body text-body-sm text-outline">${item.subtitle}</p>
            </div>
          </div>
          <span class="px-2 py-0.5 rounded bg-whatsapp-green-tint text-success-green font-label text-label-sm font-bold flex-shrink-0">
            ${item.statusText}
          </span>
        </div>
        ${divider}`;
    }

    return `
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
            <span class="material-symbols-outlined text-[18px]">${item.icon}</span>
          </div>
          <div>
            <p class="font-label text-label-lg text-primary">${item.title}</p>
            <p class="font-body text-body-sm text-on-surface-variant">${item.subtitle}</p>
          </div>
        </div>
        <button aria-checked="true" class="toggle-switch w-12 h-6 rounded-full bg-whatsapp-green p-0.5 transition-colors relative flex items-center flex-shrink-0" id="${item.toggleId}" role="switch" type="button">
          <span class="w-5 h-5 rounded-full bg-white shadow-sm transform translate-x-6 transition-transform block"></span>
        </button>
      </div>
      ${divider}`;
  }).join('');

  // Build trust badges HTML
  const trustBadgesHtml = d.trustBadges.map(badge => `
    <span class="inline-flex items-center gap-1 text-[11px] font-label font-semibold bg-surface-container-lowest px-2.5 py-1 rounded-full text-primary">
      <span class="material-symbols-outlined text-[13px] ${badge.color}">${badge.icon}</span>
      ${badge.label}
    </span>
  `).join('');

  const html = `
    ${renderHeader('dark', 'Loans')}
    <main class="flex flex-col relative w-full pt-20 pb-safe bg-paytm-surface min-h-screen">
      <div class="flex flex-col w-full pb-24">

        <!-- TOP WELCOME BANNER & MERCHANT RECOGNITION -->
        <section class="px-margin-mobile pt-space-md space-y-4 animate-fade-in">
          <!-- Pragati Innovation Pill -->
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container shadow-sm">
            <div class="w-5 h-5 rounded-full bg-primary-container flex items-center justify-center text-secondary-container">
              <span class="material-symbols-outlined text-[14px]">auto_awesome</span>
            </div>
            <span class="font-label text-label-md text-primary-container tracking-wide">पेटीएम प्रगति • Paytm Pragati AI</span>
            <span class="px-1.5 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label text-label-sm uppercase">2.0</span>
          </div>

          <!-- Personalized Greeting -->
          <div class="space-y-1.5">
            <h1 class="font-headline text-headline-lg-mobile text-primary tracking-tight">${d.greeting}</h1>
            <p class="font-body text-body-md text-on-surface-variant leading-relaxed">${d.subtitle}</p>
          </div>

          <!-- Merchant Store Status Tag -->
          <div class="flex items-center justify-between p-3 rounded-xl bg-surface-container-low shadow-sm">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary-container flex-shrink-0">
                <span class="material-symbols-outlined text-[20px]">storefront</span>
              </div>
              <div class="min-w-0">
                <p class="font-label text-label-md text-primary truncate">शर्मा किराना स्टोर (Sharma Kirana)</p>
                <p class="font-body text-body-sm text-outline flex items-center gap-1">
                  <span class="material-symbols-outlined text-[13px] text-success-green">speaker_phone</span>
                  Soundbox: ${d.soundboxId} • सक्रिय (Active)
                </p>
              </div>
            </div>
            <span class="material-symbols-outlined text-success-green text-[22px] flex-shrink-0" style="font-variation-settings: 'FILL' 1;">check_circle</span>
          </div>
        </section>

        <!-- VERNACULAR & AUDIO SELECTOR -->
        <section class="mt-6 px-margin-mobile space-y-3 animate-fade-in stagger-1">
          <div class="flex items-center justify-between">
            <label class="font-label text-label-md text-primary flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[18px] text-secondary">translate</span>
              अपनी भाषा व आवाज़ चुनें (Preferred Voice)
            </label>
            <span class="font-label text-label-sm text-outline">बोलकर मदद</span>
          </div>

          <!-- Horizontal Language Chips -->
          <div class="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar" id="lang-chips">
            ${langPillsHtml}
          </div>

          <!-- 30s Audio Explainer -->
          <button class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-surface-container-high text-primary-container shadow-sm active:scale-[0.99] transition-transform" id="audio-preview-btn" type="button">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center flex-shrink-0">
                <span class="material-symbols-outlined text-[18px]" id="speaker-icon">volume_up</span>
              </div>
              <div class="text-left">
                <p class="font-label text-label-md text-primary">${d.audioExplainer.titleHi}</p>
                <p class="font-body text-body-sm text-on-surface-variant">${d.audioExplainer.subtitleEn}</p>
              </div>
            </div>
            <div class="flex items-center gap-1 bg-surface-container-lowest px-2 py-1 rounded-md">
              <span class="material-symbols-outlined text-[14px] text-secondary-container" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
              <span class="font-label text-label-sm text-primary-container font-bold" id="audio-time">${d.audioExplainer.duration}</span>
            </div>
          </button>
        </section>

        <!-- 3 CORE SUPERPOWERS CAROUSEL / STACK -->
        <section class="mt-6 px-margin-mobile space-y-3.5 animate-fade-in stagger-2">
          <div class="flex items-center justify-between">
            <h2 class="font-headline text-headline-sm text-primary">प्रगति की 3 मुख्य शक्तियां (Key Powers)</h2>
            <span class="font-label text-label-sm text-secondary font-bold">100% AUTOMATED</span>
          </div>
          ${superpowerCardsHtml}
        </section>

        <!-- QUICK 3-STEP INTEGRATION CHECKLIST -->
        <section class="mt-6 px-margin-mobile space-y-3 animate-fade-in stagger-3">
          <div class="flex items-center justify-between">
            <h2 class="font-headline text-headline-sm text-primary">त्वरित सेटअप (Quick Permissions)</h2>
            <span class="font-label text-label-sm text-outline" id="setup-progress">3 में से 1 पूरा</span>
          </div>
          <div class="rounded-xl bg-surface-container-lowest p-4 shadow-sm space-y-4">
            ${checklistHtml}
          </div>
        </section>

        <!-- BANK-GRADE SECURITY & TRUST BANNER -->
        <section class="mt-6 px-margin-mobile animate-fade-in stagger-4">
          <div class="p-4 rounded-xl bg-surface-container-high space-y-2.5">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary-container text-[20px]" style="font-variation-settings: 'FILL' 1;">verified_user</span>
              <p class="font-label text-label-md text-primary-container font-bold">
                RBI रेगुलेटेड एवं 100% सुरक्षित Paytm ट्रस्ट
              </p>
            </div>
            <p class="font-body text-body-sm text-on-surface-variant">
              आपका डेटा कभी भी किसी तीसरे पक्ष से साझा नहीं किया जाता। सभी वित्तीय लेनदेन 256-बिट बैंक स्तरीय एन्क्रिप्शन द्वारा सुरक्षित हैं।
            </p>
            <div class="flex flex-wrap items-center gap-2 pt-1">
              ${trustBadgesHtml}
            </div>
          </div>
        </section>

        <!-- BOTTOM ACTIVATION CALL-TO-ACTION -->
        <section class="mt-6 px-margin-mobile space-y-3 animate-fade-in stagger-5">
          <button class="w-full min-h-[54px] rounded-xl bg-primary-container text-on-primary font-headline text-headline-sm flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all hover:bg-primary" id="launch-pragati-btn" type="button">
            <span>प्रगति AI शुरू करें (Launch Pragati)</span>
            <span class="material-symbols-outlined text-[22px]">rocket_launch</span>
          </button>
          <div class="text-center space-y-0.5">
            <p class="font-label text-label-md text-primary">
              निःशुल्क सेवा • कभी भी बंद या बदल सकते हैं
            </p>
            <p class="font-body text-body-sm text-outline">
              Free forever for active Paytm Merchant partners
            </p>
          </div>
        </section>

        <!-- SUCCESS TOAST OVERLAY (HIDDEN INITIALLY) -->
        <div class="hidden fixed bottom-24 left-4 right-4 z-50 p-4 rounded-xl bg-primary text-on-primary shadow-xl flex items-center justify-between animate-bounce-short" id="pragati-toast" style="max-width: 398px; margin: 0 auto;">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-whatsapp-green text-on-primary flex items-center justify-center">
              <span class="material-symbols-outlined text-[18px]">check</span>
            </div>
            <div>
              <p class="font-label text-label-md font-bold">प्रगति AI सक्रिय हो गया! 🎉</p>
              <p class="font-body text-body-sm text-primary-fixed">आपका डैशबोर्ड तैयार किया जा रहा है...</p>
            </div>
          </div>
          <span class="material-symbols-outlined text-outline-variant text-[20px] cursor-pointer" id="close-pragati-toast">close</span>
        </div>

      </div>
    </main>
  `;

  // Attach listeners after render
  setTimeout(() => {
    initOnboardingListeners();
  }, 50);

  return html;
}

function initOnboardingListeners() {
  // ========================================
  // Language Pills Micro-interaction
  // ========================================
  const langPills = document.querySelectorAll('.lang-pill');
  langPills.forEach(pill => {
    pill.addEventListener('click', () => {
      // Deactivate all pills
      langPills.forEach(p => {
        p.classList.remove('bg-primary-container', 'text-on-primary', 'shadow-sm');
        p.classList.add('bg-surface-container', 'text-on-surface');
        // Remove checkmark and wave if exists
        const check = p.querySelector('.material-symbols-outlined');
        if (check) check.remove();
        const wave = p.querySelector('.flex.items-center.gap-0\\.5');
        if (wave) wave.remove();
      });

      // Activate clicked pill
      pill.classList.remove('bg-surface-container', 'text-on-surface');
      pill.classList.add('bg-primary-container', 'text-on-primary', 'shadow-sm');

      const checkIcon = document.createElement('span');
      checkIcon.className = 'material-symbols-outlined text-[16px] text-secondary-container';
      checkIcon.textContent = 'check';
      pill.prepend(checkIcon);
    });
  });

  // ========================================
  // Audio Preview Micro-interaction
  // ========================================
  const audioBtn = document.getElementById('audio-preview-btn');
  const speakerIcon = document.getElementById('speaker-icon');
  const audioTime = document.getElementById('audio-time');
  let isPlaying = false;
  let timerInterval = null;

  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        speakerIcon.textContent = 'pause';
        speakerIcon.classList.add('animate-pulse');
        let seconds = 32;
        timerInterval = setInterval(() => {
          seconds--;
          if (seconds <= 0) {
            clearInterval(timerInterval);
            isPlaying = false;
            speakerIcon.textContent = 'volume_up';
            speakerIcon.classList.remove('animate-pulse');
            audioTime.textContent = '0:32';
          } else {
            audioTime.textContent = `0:${seconds < 10 ? '0' : ''}${seconds}`;
          }
        }, 1000);
      } else {
        clearInterval(timerInterval);
        speakerIcon.textContent = 'volume_up';
        speakerIcon.classList.remove('animate-pulse');
        audioTime.textContent = '0:32';
      }
    });
  }

  // ========================================
  // Toggle Switches
  // ========================================
  function setupToggle(toggleId) {
    const toggle = document.getElementById(toggleId);
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      const knob = toggle.querySelector('span');
      const isChecked = toggle.getAttribute('aria-checked') === 'true';
      if (isChecked) {
        toggle.setAttribute('aria-checked', 'false');
        toggle.classList.remove('bg-whatsapp-green');
        toggle.classList.add('bg-outline-variant');
        knob.classList.remove('translate-x-6');
        knob.classList.add('translate-x-0');
      } else {
        toggle.setAttribute('aria-checked', 'true');
        toggle.classList.remove('bg-outline-variant');
        toggle.classList.add('bg-whatsapp-green');
        knob.classList.remove('translate-x-0');
        knob.classList.add('translate-x-6');
      }
      updateSetupProgress();
    });
  }
  setupToggle('toggle-wa');
  setupToggle('toggle-audio');

  // ========================================
  // Setup Progress Tracker
  // ========================================
  function updateSetupProgress() {
    let completedCount = 1; // Soundbox is always complete
    const waToggle = document.getElementById('toggle-wa');
    const audioToggle = document.getElementById('toggle-audio');
    if (waToggle?.getAttribute('aria-checked') === 'true') completedCount++;
    if (audioToggle?.getAttribute('aria-checked') === 'true') completedCount++;

    const progressEl = document.getElementById('setup-progress');
    if (progressEl) {
      progressEl.textContent = `3 में से ${completedCount} पूरा`;
    }
  }

  // Initial update (both toggles default ON = 3/3)
  updateSetupProgress();

  // ========================================
  // Launch Pragati CTA
  // ========================================
  const launchBtn = document.getElementById('launch-pragati-btn');
  const toast = document.getElementById('pragati-toast');
  const closeToastBtn = document.getElementById('close-pragati-toast');

  if (launchBtn && toast) {
    launchBtn.addEventListener('click', () => {
      // Show loading state
      launchBtn.innerHTML = `
        <span class="material-symbols-outlined animate-spin text-[22px]">progress_activity</span>
        <span>तैयार हो रहा है...</span>
      `;
      launchBtn.classList.add('opacity-90');
      launchBtn.disabled = true;

      setTimeout(() => {
        // Show success toast
        toast.classList.remove('hidden');
        toast.classList.add('flex');

        // Update button to success state
        launchBtn.innerHTML = `
          <span>सफलतापूर्वक चालू! (Active)</span>
          <span class="material-symbols-outlined text-[22px]">check_circle</span>
        `;
        launchBtn.classList.remove('bg-primary-container', 'opacity-90');
        launchBtn.classList.add('bg-success-green');

        // Auto-navigate to dashboard after delay
        setTimeout(() => {
          toast.classList.add('hidden');
          toast.classList.remove('flex');
          navigate('/dashboard');
        }, 2500);
      }, 1200);
    });
  }

  if (closeToastBtn && toast) {
    closeToastBtn.addEventListener('click', () => {
      toast.classList.add('hidden');
      toast.classList.remove('flex');
    });
  }
}
