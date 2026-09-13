// ========================================
// Voice Assistant Drawer
// ========================================

export function renderVoiceDrawer() {
  return `
    <div class="hidden fixed inset-x-0 bottom-20 z-40 p-margin-mobile" id="voice-overlay-drawer" style="max-width: 430px; margin: 0 auto;">
      <div class="bg-primary text-on-primary rounded-xl p-space-md shadow-2xl flex flex-col items-center text-center relative animate-fade-in-scale">
        <button class="absolute top-2 right-2 text-on-primary/70 hover:text-on-primary" id="close-voice-drawer">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
        <div class="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-2 animate-pulse-ring">
          <span class="material-symbols-outlined text-on-secondary text-[26px]">mic</span>
        </div>
        <div class="flex items-center gap-1 mb-2" id="voice-wave-container">
          <div class="voice-wave-bar"></div>
          <div class="voice-wave-bar"></div>
          <div class="voice-wave-bar"></div>
          <div class="voice-wave-bar"></div>
          <div class="voice-wave-bar"></div>
        </div>
        <span class="font-label text-label-md text-secondary-container">Listening... / सुन रहा हूँ...</span>
        <p class="font-headline text-headline-sm text-on-primary mt-2" id="voice-response-text">
          "शर्मा जी, आज शाम तक का अनुमानित कलेक्शन ₹8,500 होगा।"
        </p>
        <div class="flex items-center gap-2 mt-3 w-full">
          <button class="flex-1 bg-surface-container-low text-primary py-2.5 rounded-lg font-label text-label-md active:scale-95 transition-transform" id="voice-action-ledger">
            पूरा बहीखाता खोलें
          </button>
          <button class="flex-1 bg-whatsapp-green text-on-primary py-2.5 rounded-lg font-label text-label-md active:scale-95 transition-transform" id="voice-action-whatsapp">
            WhatsApp पर सारांश भेजें
          </button>
        </div>
      </div>
    </div>
  `;
}

export function initVoiceDrawerListeners() {
  const drawer = document.getElementById('voice-overlay-drawer');
  const closeBtn = document.getElementById('close-voice-drawer');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (drawer) drawer.classList.add('hidden');
    });
  }

  // Close on backdrop click
  if (drawer) {
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) drawer.classList.add('hidden');
    });
  }
}

export function openVoiceDrawer() {
  const drawer = document.getElementById('voice-overlay-drawer');
  if (drawer) {
    drawer.classList.remove('hidden');
  }
}
