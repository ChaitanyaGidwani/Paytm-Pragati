// ========================================
// Onboarding / AI Copilot View (Production)
// ========================================

import { showToast } from '../components/toast.js';
import { store } from '../store/appState.js';
import { navigate } from '../router.js';

export function renderOnboarding() {
  const merchant = store.get('merchant');
  const settings = store.get('settings');

  const html = `
    <main class="flex flex-col relative w-full min-h-screen bg-gradient-to-b from-[#002970] via-[#003d99] to-paytm-surface">
      <div class="flex flex-col w-full pb-24">

        <!-- Hero -->
        <section class="px-margin-mobile pt-safe pt-12 pb-6 text-center relative">
          <div class="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-secondary-container/8 blur-3xl pointer-events-none"></div>
          <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/10">
            <span class="material-symbols-outlined text-white text-[36px]">smart_toy</span>
          </div>
          <h1 class="font-headline text-headline-lg text-white leading-snug tracking-tight">
            Welcome to Paytm Pragati
          </h1>
          <p class="font-body text-body-md text-blue-200/80 mt-2 max-w-xs mx-auto">
            आपका AI व्यापार सहायक — Your AI Business Growth Copilot
          </p>
        </section>

        <!-- Language Selection -->
        <section class="px-margin-mobile mb-space-md">
          <div class="rounded-xl bg-white/10 backdrop-blur-md p-space-md border border-white/10">
            <h2 class="font-headline text-headline-sm text-white mb-space-sm flex items-center gap-2">
              <span class="material-symbols-outlined text-[20px] text-[#2bc6ff]">translate</span>
              Choose Language / भाषा चुनें
            </h2>
            <div class="grid grid-cols-2 gap-2" id="language-selector">
              <button class="lang-btn p-3 rounded-xl text-center transition-all ${settings.language === 'hi' ? 'bg-white text-primary shadow-md' : 'bg-white/8 text-white/80 border border-white/10 hover:bg-white/15'}" data-lang="hi">
                <span class="text-2xl block mb-1">🇮🇳</span>
                <span class="font-label text-label-lg font-bold block">हिंदी</span>
                <span class="text-[11px] opacity-70">Hindi</span>
              </button>
              <button class="lang-btn p-3 rounded-xl text-center transition-all ${settings.language === 'en' ? 'bg-white text-primary shadow-md' : 'bg-white/8 text-white/80 border border-white/10 hover:bg-white/15'}" data-lang="en">
                <span class="text-2xl block mb-1">🌐</span>
                <span class="font-label text-label-lg font-bold block">English</span>
                <span class="text-[11px] opacity-70">अंग्रेजी</span>
              </button>
              <button class="lang-btn p-3 rounded-xl text-center transition-all ${settings.language === 'hinglish' ? 'bg-white text-primary shadow-md' : 'bg-white/8 text-white/80 border border-white/10 hover:bg-white/15'}" data-lang="hinglish">
                <span class="text-2xl block mb-1">🤝</span>
                <span class="font-label text-label-lg font-bold block">Hinglish</span>
                <span class="text-[11px] opacity-70">हिंग्लिश Mix</span>
              </button>
              <button class="lang-btn p-3 rounded-xl text-center transition-all ${settings.language === 'bn' ? 'bg-white text-primary shadow-md' : 'bg-white/8 text-white/80 border border-white/10 hover:bg-white/15'}" data-lang="bn">
                <span class="text-2xl block mb-1">🇧🇩</span>
                <span class="font-label text-label-lg font-bold block">বাংলা</span>
                <span class="text-[11px] opacity-70">Bengali</span>
              </button>
            </div>
          </div>
        </section>

        <!-- Audio Explainer -->
        <section class="px-margin-mobile mb-space-md">
          <div class="rounded-xl bg-white shadow-lg p-space-md">
            <div class="flex items-center gap-3 mb-space-sm">
              <button class="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform shadow-lg" id="audio-explainer-btn">
                <span class="material-symbols-outlined text-white text-[26px]" id="audio-play-icon">play_arrow</span>
              </button>
              <div>
                <span class="font-label text-label-md text-primary font-bold">2-Minute Audio Explainer</span>
                <span class="font-body text-body-sm text-on-surface-variant block">सुनें कैसे Pragati आपके व्यापार को बदलेगा</span>
              </div>
            </div>
            <div class="bg-surface-container-low rounded-lg h-2 overflow-hidden">
              <div class="bg-primary h-full rounded-lg" style="width: 0%;" id="audio-progress"></div>
            </div>
          </div>
        </section>

        <!-- Superpowers -->
        <section class="px-margin-mobile mb-space-md">
          <h2 class="font-headline text-headline-sm text-white mb-space-sm">Your AI Superpowers ⚡</h2>
          <div class="space-y-space-sm">
            <div class="rounded-xl bg-white p-space-sm flex items-start gap-3 shadow-sm animate-fade-in stagger-1 card-hover">
              <div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0">
                <span class="material-symbols-outlined text-secondary text-[24px]">monitoring</span>
              </div>
              <div>
                <span class="font-label text-label-lg text-primary font-bold block">Real-Time Revenue Dashboard</span>
                <span class="font-body text-body-sm text-on-surface-variant">Live sales, trend analysis, peak hour detection — all from your Soundbox data</span>
              </div>
            </div>
            <div class="rounded-xl bg-white p-space-sm flex items-start gap-3 shadow-sm animate-fade-in stagger-2 card-hover">
              <div class="w-10 h-10 rounded-lg bg-whatsapp-green-tint flex items-center justify-center flex-shrink-0">
                <span class="material-symbols-outlined text-whatsapp-green text-[24px]">chat</span>
              </div>
              <div>
                <span class="font-label text-label-lg text-primary font-bold block">WhatsApp Win-Back Bot</span>
                <span class="font-body text-body-sm text-on-surface-variant">1-tap campaigns to bring back lapsed customers with AI-generated offers</span>
              </div>
            </div>
            <div class="rounded-xl bg-white p-space-sm flex items-start gap-3 shadow-sm animate-fade-in stagger-3 card-hover">
              <div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0">
                <span class="material-symbols-outlined text-primary text-[24px]">account_balance</span>
              </div>
              <div>
                <span class="font-label text-label-lg text-primary font-bold block">Instant Business Loan</span>
                <span class="font-body text-body-sm text-on-surface-variant">Pre-approved micro-loans, auto-deducted daily from QR settlements — zero paperwork</span>
              </div>
            </div>
            <div class="rounded-xl bg-white p-space-sm flex items-start gap-3 shadow-sm animate-fade-in stagger-4 card-hover">
              <div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0">
                <span class="material-symbols-outlined text-secondary text-[24px]">mic</span>
              </div>
              <div>
                <span class="font-label text-label-lg text-primary font-bold block">Voice-First Interface</span>
                <span class="font-body text-body-sm text-on-surface-variant">बोलकर पूछें — Ask anything about your business in Hindi</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Setup Checklist -->
        <section class="px-margin-mobile mb-space-md">
          <div class="rounded-xl bg-white p-space-md shadow-sm">
            <h2 class="font-headline text-headline-sm text-primary mb-space-sm">Quick Setup / सेटअप</h2>
            <div class="space-y-3">
              <label class="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-surface-container-low transition-colors">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-whatsapp-green text-[20px]">chat</span>
                  <div>
                    <span class="font-label text-label-md text-primary block">WhatsApp Bot Activate</span>
                    <span class="text-[11px] text-on-surface-variant">Enable auto-reply + customer engagement</span>
                  </div>
                </div>
                <button class="relative inline-flex h-6 w-11 rounded-full transition-colors ${settings.whatsappBotEnabled ? 'bg-whatsapp-green' : 'bg-outline-variant'}" id="setup-wa-toggle" role="switch" aria-checked="${settings.whatsappBotEnabled}">
                  <span class="inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform ${settings.whatsappBotEnabled ? 'translate-x-[22px]' : 'translate-x-0.5'} mt-0.5"></span>
                </button>
              </label>
              <label class="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-surface-container-low transition-colors">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-secondary text-[20px]">graphic_eq</span>
                  <div>
                    <span class="font-label text-label-md text-primary block">Daily Audio Summary</span>
                    <span class="text-[11px] text-on-surface-variant">Morning & evening business report via Soundbox</span>
                  </div>
                </div>
                <button class="relative inline-flex h-6 w-11 rounded-full transition-colors ${settings.dailyAudioEnabled ? 'bg-whatsapp-green' : 'bg-outline-variant'}" id="setup-audio-toggle" role="switch" aria-checked="${settings.dailyAudioEnabled}">
                  <span class="inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform ${settings.dailyAudioEnabled ? 'translate-x-[22px]' : 'translate-x-0.5'} mt-0.5"></span>
                </button>
              </label>
            </div>
          </div>
        </section>

        <!-- Trust Section -->
        <section class="px-margin-mobile mb-space-md">
          <div class="rounded-xl bg-surface-container-low p-4 text-center">
            <div class="flex items-center justify-center gap-4 mb-2">
              <span class="inline-flex items-center gap-1 font-label text-label-sm text-on-surface-variant">
                <span class="material-symbols-outlined text-success-green text-[14px]">shield</span> RBI Regulated
              </span>
              <span class="inline-flex items-center gap-1 font-label text-label-sm text-on-surface-variant">
                <span class="material-symbols-outlined text-success-green text-[14px]">lock</span> 256-bit Encrypted
              </span>
            </div>
            <p class="font-body text-body-sm text-on-surface-variant">
              Trusted by 35M+ merchants. Backed by Paytm & NBFC partners.
            </p>
          </div>
        </section>

        <!-- Launch CTA -->
        <section class="px-margin-mobile mb-space-lg">
          <button
            id="launch-pragati-btn"
            class="w-full h-14 rounded-xl bg-[#002970] text-white font-headline text-headline-sm flex items-center justify-center gap-2 shadow-xl shadow-primary/30 active:scale-[0.98] transition-all"
          >
            <span class="material-symbols-outlined text-[22px]">rocket_launch</span>
            <span>Launch Pragati • शुरू करें</span>
          </button>
          <p class="text-center font-label text-label-sm text-on-surface-variant mt-3">
            Already using Pragati? <button class="text-primary font-semibold" id="skip-to-dashboard">Skip to Dashboard →</button>
          </p>
        </section>
      </div>
    </main>
  `;

  setTimeout(() => initOnboardingListeners(), 50);
  return html;
}

function initOnboardingListeners() {
  // Language selection
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      langBtns.forEach(b => {
        b.classList.remove('bg-white', 'text-primary', 'shadow-md');
        b.classList.add('bg-white/8', 'text-white/80', 'border', 'border-white/10');
      });
      btn.classList.remove('bg-white/8', 'text-white/80', 'border', 'border-white/10');
      btn.classList.add('bg-white', 'text-primary', 'shadow-md');

      store.update('settings', { language: btn.dataset.lang });
      showToast(`✅ Language set to ${btn.dataset.lang === 'hi' ? 'हिंदी' : btn.dataset.lang === 'en' ? 'English' : btn.dataset.lang === 'hinglish' ? 'Hinglish' : 'বাংলা'}`);
    });
  });

  // Audio explainer
  const audioBtn = document.getElementById('audio-explainer-btn');
  const audioIcon = document.getElementById('audio-play-icon');
  const audioProgress = document.getElementById('audio-progress');

  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      if ('speechSynthesis' in window) {
        const text = 'Namaste! Pragati aapke kirana store ke liye ek AI business copilot hai. Yeh aapke Soundbox data se aapke business ki health track karta hai, WhatsApp pe automatic campaigns chalata hai, aur instant loans provide karta hai. Sab kuch ek jagah, ek tap pe.';
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'hi-IN';
        utterance.rate = 0.85;

        if (audioIcon) audioIcon.textContent = 'pause';
        speechSynthesis.speak(utterance);

        // Simulate progress
        let progress = 0;
        const progressInterval = setInterval(() => {
          progress += 1;
          if (audioProgress) audioProgress.style.width = progress + '%';
          if (progress >= 100) clearInterval(progressInterval);
        }, 150);

        utterance.onend = () => {
          if (audioIcon) audioIcon.textContent = 'play_arrow';
          clearInterval(progressInterval);
          if (audioProgress) audioProgress.style.width = '100%';
        };
      } else {
        showToast('🔊 Audio not supported in this browser');
      }
    });
  }

  // Setup toggles
  initSetupToggle('setup-wa-toggle', 'whatsappBotEnabled');
  initSetupToggle('setup-audio-toggle', 'dailyAudioEnabled');

  // Launch Pragati
  const launchBtn = document.getElementById('launch-pragati-btn');
  if (launchBtn) {
    launchBtn.addEventListener('click', () => {
      launchBtn.innerHTML = '<span class="material-symbols-outlined text-[22px] animate-spin">progress_activity</span> Loading Dashboard...';
      if (navigator.vibrate) navigator.vibrate([50, 30, 50, 30, 100]);
      setTimeout(() => navigate('/dashboard'), 800);
    });
  }

  // Skip to dashboard
  const skipBtn = document.getElementById('skip-to-dashboard');
  if (skipBtn) {
    skipBtn.addEventListener('click', () => navigate('/dashboard'));
  }
}

function initSetupToggle(id, settingKey) {
  const toggle = document.getElementById(id);
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const checked = toggle.getAttribute('aria-checked') === 'true';
    const newState = !checked;
    toggle.setAttribute('aria-checked', String(newState));
    const dot = toggle.querySelector('span');
    if (newState) {
      toggle.classList.remove('bg-outline-variant');
      toggle.classList.add('bg-whatsapp-green');
      if (dot) dot.style.transform = 'translateX(22px)';
    } else {
      toggle.classList.remove('bg-whatsapp-green');
      toggle.classList.add('bg-outline-variant');
      if (dot) dot.style.transform = 'translateX(2px)';
    }
    store.update('settings', { [settingKey]: newState });
    showToast(newState ? '✅ Feature enabled' : '⏹ Feature disabled');
  });
}
