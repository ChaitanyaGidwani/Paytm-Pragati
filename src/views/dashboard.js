// ========================================
// Dashboard View — AI Growth Home (Production)
// ========================================

import { renderHeader } from '../components/header.js';
import { renderVoiceDrawer, initVoiceDrawerListeners, openVoiceDrawer } from '../components/voiceDrawer.js';
import { showToast } from '../components/toast.js';
import { store } from '../store/appState.js';
import { fetchDashboardPulse, fetchAIInsights, approveCampaign, placeStockOrder } from '../services/apiService.js';
import { formatCurrency } from '../data/merchant.js';
import { navigate } from '../router.js';

export function renderDashboard() {
  const merchant = store.get('merchant');
  const dashboard = store.get('dashboard');
  const loan = store.get('loan');
  const settings = store.get('settings');

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const daysHi = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
  const today = new Date().getDay();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'शुभ प्रभात' : hour < 17 ? 'शुभ दोपहर' : 'शुभ संध्या';

  const isLoading = dashboard.isLoading;
  const revenue = dashboard.revenue || 0;
  const txnCount = dashboard.txnCount || 0;
  const avgBill = dashboard.avgBill || 0;
  const trendPercent = dashboard.trendPercent || 0;

  const html = `
    ${renderHeader('light', 'Dashboard')}
    <main class="flex flex-col relative w-full pt-20 pb-safe bg-paytm-surface min-h-screen">
      <div class="flex flex-col w-full pb-24">

        <!-- Merchant Greeting -->
        <section class="px-margin-mobile pt-space-md pb-space-sm flex items-center justify-between animate-fade-in">
          <div class="flex flex-col min-w-0">
            <div class="flex items-center gap-space-xs">
              <span class="font-headline text-headline-sm text-primary">${greeting}, ${merchant.name.split(' ')[0]} जी</span>
              <span class="text-[18px]">🙏</span>
            </div>
            <p class="font-body text-body-sm text-on-surface-variant flex items-center gap-1">
              <span>Shop open since ${merchant.shopOpenSince}</span>
              <span class="w-1 h-1 rounded-full bg-outline-variant"></span>
              <span class="text-success-green font-medium">${hour >= 10 && hour <= 20 ? 'Brisk Bazaar Hours' : 'Off-Peak'}</span>
            </p>
          </div>
          <button class="flex items-center gap-1.5 px-3 py-2 rounded-full bg-surface-container-high text-primary active:scale-95 transition-transform shadow-sm" id="quick-voice-btn" aria-label="Voice input">
            <span class="material-symbols-outlined text-[18px] text-secondary">mic</span>
            <span class="font-label text-label-sm uppercase tracking-wide">बोलें</span>
          </button>
        </section>

        <!-- Today's Business Pulse Card -->
        <section class="px-margin-mobile mb-space-md animate-fade-in stagger-1">
          <div class="relative overflow-hidden rounded-xl bg-white p-space-md shadow-md card-hover">
            <div class="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-surface-container-low opacity-60 pointer-events-none"></div>
            
            <div class="flex items-start justify-between relative z-10 mb-space-sm">
              <div>
                <span class="font-label text-label-md text-on-surface-variant flex items-center gap-1">
                  <span class="w-2 h-2 rounded-full ${isLoading ? 'bg-outline-variant' : 'bg-success-green animate-pulse'}"></span>
                  <span>आज का हिसाब • Today's Pulse</span>
                </span>
                <div class="flex items-baseline gap-2 mt-0.5">
                  ${isLoading ? `
                    <div class="shimmer w-32 h-9 mt-1"></div>
                  ` : `
                    <span class="font-headline text-currency-display text-primary tracking-tight" id="live-revenue-display">${formatCurrency(revenue)}</span>
                    <span class="inline-flex items-center gap-0.5 ${trendPercent >= 0 ? 'text-success-green bg-whatsapp-green-tint' : 'text-error bg-error-container'} font-label text-label-sm px-2 py-0.5 rounded-full">
                      <span class="material-symbols-outlined text-[12px]">${trendPercent >= 0 ? 'trending_up' : 'trending_down'}</span>
                      ${trendPercent >= 0 ? '+' : ''}${Math.round(trendPercent)}% vs कल
                    </span>
                  `}
                </div>
              </div>
              <button aria-label="Replay Last Payment" class="flex items-center gap-1.5 bg-surface-container text-primary hover:bg-surface-container-high active:scale-95 transition-all px-3 py-2 rounded-lg" id="soundbox-replay-trigger">
                <span class="material-symbols-outlined text-[20px] text-secondary" id="soundbox-speaker-icon">volume_up</span>
                <div class="flex flex-col text-left">
                  <span class="font-label text-label-sm text-primary leading-none">Replay</span>
                  <span class="text-[9px] text-on-surface-variant font-label leading-tight">Soundbox</span>
                </div>
              </button>
            </div>

            <div class="grid grid-cols-2 gap-space-sm relative z-10 pt-space-xs">
              <div class="bg-surface-container-low rounded-lg p-2.5 flex items-center justify-between">
                <div>
                  <span class="font-label text-label-sm text-on-surface-variant block">कुल पेमेंट्स</span>
                  ${isLoading ? '<div class="shimmer w-16 h-6 mt-1"></div>' : `
                  <span class="font-headline text-headline-sm text-primary font-bold"><span id="live-txn-count">${txnCount}</span> <span class="font-body text-body-sm font-normal text-on-surface-variant">txns</span></span>
                  `}
                </div>
                <div class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center">
                  <span class="material-symbols-outlined text-secondary text-[18px]">qr_code_scanner</span>
                </div>
              </div>
              <div class="bg-surface-container-low rounded-lg p-2.5 flex items-center justify-between">
                <div>
                  <span class="font-label text-label-sm text-on-surface-variant block">औसत बिल</span>
                  ${isLoading ? '<div class="shimmer w-12 h-6 mt-1"></div>' : `
                  <span class="font-headline text-headline-sm text-primary font-bold" id="live-avg-bill">${formatCurrency(avgBill)}</span>
                  `}
                </div>
                <div class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center">
                  <span class="material-symbols-outlined text-secondary text-[18px]">receipt</span>
                </div>
              </div>
            </div>

            <!-- Last payment announcement -->
            <div class="mt-space-sm bg-surface-container-high rounded-lg p-2 flex items-center justify-between transition-colors" id="soundbox-announcement-pill">
              <div class="flex items-center gap-2 min-w-0">
                <span class="material-symbols-outlined text-[16px] text-secondary">graphic_eq</span>
                <span class="font-body text-body-sm text-primary truncate" id="soundbox-announcement-text">${dashboard.lastPaymentAmount ? `"Paytm पर ${formatCurrency(dashboard.lastPaymentAmount)} प्राप्त हुए"` : '"Soundbox सक्रिय है"'}</span>
              </div>
              <span class="font-label text-label-sm text-on-surface-variant flex-shrink-0" id="soundbox-announcement-time">${dashboard.lastPaymentTime || 'Now'}</span>
            </div>
          </div>
        </section>

        <!-- AI Copilot Card -->
        <section class="px-margin-mobile mb-space-md animate-fade-in stagger-2">
          <div class="rounded-xl bg-white shadow-lg overflow-hidden relative card-hover">
            <div class="h-1.5 w-full bg-gradient-to-r from-secondary-container via-whatsapp-green to-secondary"></div>
            <div class="p-space-md">
              <div class="flex items-center justify-between mb-space-sm">
                <div class="inline-flex items-center gap-1.5 bg-surface-container px-2.5 py-1 rounded-full">
                  <span class="material-symbols-outlined text-[16px] text-secondary">psychology</span>
                  <span class="font-label text-label-md text-primary tracking-wide">AI व्यापार प्रगति</span>
                  <span class="font-label text-label-sm text-on-surface-variant">| Copilot Active</span>
                </div>
                <span class="flex h-2.5 w-2.5 relative">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-whatsapp-green opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-whatsapp-green"></span>
                </span>
              </div>

              <!-- Footfall Alert -->
              <div class="rounded-lg bg-surface-container-low p-space-sm mb-space-sm" id="footfall-alert-card">
                <div class="flex items-start gap-2">
                  <span class="material-symbols-outlined text-warning-amber text-[20px] flex-shrink-0 mt-0.5">trending_down</span>
                  <div class="flex flex-col flex-1">
                    <span class="font-label text-label-md text-primary">${daysHi[today]} Footfall Drop Warning (दोपहर की मंदी)</span>
                    <p class="font-body text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
                      Last 3 ${days[today]}s your store footfall dropped by <strong class="text-warning-amber font-semibold">32% after 2:00 PM</strong>.
                    </p>
                  </div>
                  <button class="text-outline-variant hover:text-on-surface transition-colors flex-shrink-0" id="dismiss-alert-btn" aria-label="Dismiss alert">
                    <span class="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>
              </div>

              <!-- Win-back Campaign Suggestion -->
              <div class="rounded-lg bg-whatsapp-green-tint/60 p-space-sm mb-space-md" id="winback-card">
                <div class="flex items-start gap-2">
                  <span class="material-symbols-outlined text-whatsapp-green text-[20px] flex-shrink-0 mt-0.5">bolt</span>
                  <div>
                    <span class="font-label text-label-md text-primary">AI Re-engagement Formula</span>
                    <p class="font-body text-body-sm text-on-surface-variant mt-0.5">
                      Target <strong>42 lapsed customers</strong> who regularly bought milk & daily groceries. Send ₹20 OFF voucher on WhatsApp valid till 6 PM.
                    </p>
                  </div>
                </div>
                <div class="mt-space-xs flex items-center gap-1 text-success-green font-label text-label-md pl-7">
                  <span class="material-symbols-outlined text-[16px]">add_circle</span>
                  <span>Estimated Sales Uplift: <strong class="text-primary font-bold">+₹3,200 today</strong></span>
                </div>
              </div>

              <!-- 1-Tap WhatsApp CTA -->
              <button class="w-full h-12 bg-whatsapp-green text-white rounded-lg flex items-center justify-center gap-2 font-label text-label-lg active:scale-[0.99] transition-transform shadow-md" id="send-whatsapp-campaign-btn">
                <span class="material-symbols-outlined text-[22px]">send</span>
                <span>Approve & Send via WhatsApp in 1 Tap</span>
              </button>

              <!-- Voice Query Pill -->
              <div class="mt-space-sm pt-space-xs flex items-center justify-center">
                <button class="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors text-primary text-center" id="voice-assistant-bar">
                  <span class="material-symbols-outlined text-secondary text-[18px]">mic</span>
                  <span class="font-label text-label-md">बोल कर पूछें / "आज का मुनाफा बताओ"</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- WhatsApp Bot Status -->
        <section class="px-margin-mobile mb-space-md animate-fade-in stagger-3">
          <div class="rounded-xl bg-white shadow-sm p-space-md card-hover">
            <div class="flex items-center justify-between mb-space-sm">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-full bg-whatsapp-green flex items-center justify-center text-white">
                  <span class="material-symbols-outlined text-[18px]">chat</span>
                </div>
                <div>
                  <h2 class="font-headline text-headline-sm text-primary leading-tight">WhatsApp Vyapaar Bot</h2>
                  <span class="font-label text-label-sm text-on-surface-variant">${merchant.phone} • Active</span>
                </div>
              </div>
              <span class="inline-flex items-center gap-1 bg-whatsapp-green-tint text-success-green px-2 py-0.5 rounded-full font-label text-label-sm font-semibold">
                <span class="material-symbols-outlined text-[12px]">verified</span> 412 ग्राहक
              </span>
            </div>

            <!-- WhatsApp Template Preview -->
            <div class="relative rounded-lg bg-surface-container-low p-space-sm">
              <div class="flex items-center justify-between mb-2">
                <span class="font-label text-label-sm text-on-surface-variant uppercase tracking-wide">Ready WhatsApp Template (हिंदी)</span>
                <button class="font-label text-label-sm text-secondary cursor-pointer hover:underline" id="edit-template-btn">Edit / बदलाव</button>
              </div>
              <div class="bg-white rounded-lg p-3 shadow-sm max-w-full">
                <p class="font-body text-body-sm text-primary leading-relaxed">🙏 नमस्ते! शर्मा किराना स्टोर से आज 1kg चीनी पर ₹20 की विशेष छूट।</p>
                <div class="my-2 p-2 rounded bg-surface-container flex items-center justify-between">
                  <span class="font-label text-label-md text-primary font-bold tracking-widest">कूपन कोड: SHARMA20</span>
                  <span class="font-label text-label-sm text-on-surface-variant">Expiry: 6 PM</span>
                </div>
                <p class="text-[11px] text-on-surface-variant">दुकान पर दिखाएं या इसी चैट पर आर्डर लिखकर भेजें। तुरंत डिलीवरी उपलब्ध। 🚚</p>
              </div>
              <div class="flex items-center justify-around mt-space-sm pt-space-xs text-center">
                <div>
                  <span class="font-label text-label-sm text-on-surface-variant block">Open Rate</span>
                  <span class="font-label text-label-lg text-primary font-bold">89%</span>
                </div>
                <div class="w-px h-6 bg-surface-container-highest"></div>
                <div>
                  <span class="font-label text-label-sm text-on-surface-variant block">Repeat Orders</span>
                  <span class="font-label text-label-lg text-success-green font-bold">3.4x</span>
                </div>
                <div class="w-px h-6 bg-surface-container-highest"></div>
                <div>
                  <span class="font-label text-label-sm text-on-surface-variant block">Auto Bill</span>
                  <span class="font-label text-label-lg text-primary font-bold">Enabled</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Smart Daily Actions -->
        <section class="px-margin-mobile mb-space-md animate-fade-in stagger-4">
          <div class="flex items-center justify-between mb-space-xs">
            <h3 class="font-headline text-headline-sm text-primary">Smart Daily Actions • जरूरी काम</h3>
            <span class="font-label text-label-sm text-secondary font-semibold">2 Pending</span>
          </div>
          <div class="space-y-space-sm">
            <!-- Lending Card -->
            <div class="rounded-xl bg-white p-space-md shadow-sm relative overflow-hidden cursor-pointer hover:shadow-md transition-shadow card-hover" id="loan-action-card">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0 text-primary">
                  <span class="material-symbols-outlined text-[24px]">account_balance</span>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-1.5 flex-wrap">
                    <span class="font-label text-label-lg text-primary font-bold">${formatCurrency(loan.eligibility.maxAmount)} Pre-Approved</span>
                    <span class="bg-whatsapp-green-tint text-success-green text-[10px] font-bold px-1.5 py-0.5 rounded font-label">0 Paperwork</span>
                  </div>
                  <p class="font-body text-body-sm text-on-surface-variant mt-0.5">
                    Based on your steady daily UPI volume. Daily auto-deduct from QR settlements.
                  </p>
                  <div class="mt-3 flex items-center gap-2">
                    <button class="bg-primary text-white px-3 py-1.5 rounded font-label text-label-md active:scale-95 transition-transform" id="get-loan-btn">
                      Get in Bank Account
                    </button>
                    <button class="bg-surface-container-low text-primary px-3 py-1.5 rounded font-label text-label-md hover:bg-surface-container" id="view-emi-btn">
                      View EMI Details
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Stock Alert Card -->
            <div class="rounded-xl bg-white p-space-md shadow-sm card-hover" id="stock-alert-card">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center flex-shrink-0 text-warning-amber">
                  <span class="material-symbols-outlined text-[24px]">inventory_2</span>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between">
                    <span class="font-label text-label-lg text-primary font-bold">Stock Reorder Trigger</span>
                    <span class="text-warning-amber font-label text-label-sm font-semibold">Low Stock</span>
                  </div>
                  <p class="font-body text-body-sm text-on-surface-variant mt-0.5">
                    Mustard Oil & Chakki Atta are projected to run out before Friday evening rush.
                  </p>
                  <div class="mt-3 flex items-center justify-between pt-1">
                    <span class="font-label text-label-sm text-on-surface-variant">Supplier: Agarwal Wholesale</span>
                    <button class="flex items-center gap-1 bg-whatsapp-green text-white px-3 py-1.5 rounded font-label text-label-md active:scale-95 transition-transform" id="order-via-bot-btn">
                      <span class="material-symbols-outlined text-[16px]">call</span>
                      <span>Order via Bot</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 24x7 Helpline -->
        <section class="px-margin-mobile mb-space-lg animate-fade-in stagger-5">
          <div class="rounded-lg bg-surface-container-low p-3 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-secondary text-[20px]">support_agent</span>
              <div>
                <span class="font-label text-label-md text-primary block leading-none">24x7 Vyapaar Helpline</span>
                <span class="text-[11px] text-on-surface-variant">Priority Hindi & English Merchant Support</span>
              </div>
            </div>
            <button class="bg-surface-container text-primary font-label text-label-sm px-2.5 py-1.5 rounded font-semibold active:scale-95 transition-transform" id="call-rm-btn">
              Call RM
            </button>
          </div>
        </section>

        <!-- Logout (for demo) -->
        <section class="px-margin-mobile mb-space-lg">
          <button class="w-full py-2 text-center font-label text-label-sm text-outline hover:text-error transition-colors" id="logout-btn">
            Logout / लॉगआउट
          </button>
        </section>
      </div>

      ${renderVoiceDrawer()}
    </main>
  `;

  setTimeout(() => {
    initDashboardListeners();
    initVoiceDrawerListeners();
  }, 50);

  return html;
}

function initDashboardListeners() {
  // Soundbox Replay with audio
  const soundboxBtn = document.getElementById('soundbox-replay-trigger');
  const speakerIcon = document.getElementById('soundbox-speaker-icon');
  const announcementPill = document.getElementById('soundbox-announcement-pill');

  if (soundboxBtn) {
    soundboxBtn.addEventListener('click', () => {
      speakerIcon?.classList.remove('animate-pulse');
      void speakerIcon?.offsetWidth;
      speakerIcon?.classList.add('animate-pulse');

      announcementPill?.classList.remove('bg-surface-container-high');
      announcementPill?.classList.add('bg-whatsapp-green-tint');

      // Try to play TTS
      if ('speechSynthesis' in window) {
        const dashboard = store.get('dashboard');
        const amount = dashboard.lastPaymentAmount || 150;
        const utterance = new SpeechSynthesisUtterance(`Paytm par ${amount} rupaye prapt hue`);
        utterance.lang = 'hi-IN';
        utterance.rate = 0.9;
        speechSynthesis.speak(utterance);
      }

      showToast('🔊 Replaying: "Paytm पर ₹' + (store.get('dashboard').lastPaymentAmount || 150) + ' प्राप्त हुए"');

      setTimeout(() => {
        announcementPill?.classList.remove('bg-whatsapp-green-tint');
        announcementPill?.classList.add('bg-surface-container-high');
      }, 2200);
    });
  }

  // Voice buttons
  const voiceBtn = document.getElementById('voice-assistant-bar');
  const quickVoiceBtn = document.getElementById('quick-voice-btn');
  if (voiceBtn) voiceBtn.addEventListener('click', openVoiceDrawer);
  if (quickVoiceBtn) quickVoiceBtn.addEventListener('click', openVoiceDrawer);

  // WhatsApp Campaign Send
  const sendBtn = document.getElementById('send-whatsapp-campaign-btn');
  if (sendBtn) {
    sendBtn.addEventListener('click', async () => {
      sendBtn.disabled = true;
      sendBtn.innerHTML = '<span class="material-symbols-outlined text-[20px] animate-spin">progress_activity</span> Sending to 42 Customers...';

      const result = await approveCampaign('dashboard_winback', 42);

      if (result.status === 'success') {
        sendBtn.classList.remove('bg-whatsapp-green');
        sendBtn.classList.add('bg-primary-container');
        sendBtn.innerHTML = '<span class="material-symbols-outlined text-[20px]">done</span> Sent! +₹' + result.data.revenue + ' Uplift Expected';
        showToast('✅ WhatsApp Campaign sent: 42 coupons dispatched!');

        // Trigger haptic
        if (navigator.vibrate) navigator.vibrate(100);
      }
    });
  }

  // Dismiss footfall alert
  const dismissBtn = document.getElementById('dismiss-alert-btn');
  const alertCard = document.getElementById('footfall-alert-card');
  if (dismissBtn && alertCard) {
    dismissBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      alertCard.style.maxHeight = alertCard.scrollHeight + 'px';
      requestAnimationFrame(() => {
        alertCard.style.transition = 'max-height 0.3s ease, opacity 0.3s ease, margin 0.3s ease';
        alertCard.style.maxHeight = '0';
        alertCard.style.opacity = '0';
        alertCard.style.marginBottom = '0';
        alertCard.style.overflow = 'hidden';
      });
      showToast('Alert dismissed');
    });
  }

  // Loan navigation
  const getLoanBtn = document.getElementById('get-loan-btn');
  const viewEmiBtn = document.getElementById('view-emi-btn');
  if (getLoanBtn) getLoanBtn.addEventListener('click', () => navigate('/loans'));
  if (viewEmiBtn) viewEmiBtn.addEventListener('click', () => navigate('/loans'));

  // Stock order
  const orderBtn = document.getElementById('order-via-bot-btn');
  if (orderBtn) {
    orderBtn.addEventListener('click', async () => {
      orderBtn.disabled = true;
      orderBtn.innerHTML = '<span class="material-symbols-outlined text-[16px] animate-spin">progress_activity</span> Ordering...';

      const result = await placeStockOrder('stock_1');
      if (result.status === 'success') {
        orderBtn.classList.remove('bg-whatsapp-green');
        orderBtn.classList.add('bg-success-green');
        orderBtn.innerHTML = '<span class="material-symbols-outlined text-[16px]">check</span> Ordered';
        showToast('📦 Order placed via WhatsApp Bot to Agarwal Wholesale');
      }
    });
  }

  // Template edit
  const editTemplateBtn = document.getElementById('edit-template-btn');
  if (editTemplateBtn) {
    editTemplateBtn.addEventListener('click', () => {
      navigate('/whatsapp');
    });
  }

  // Call RM
  const callRmBtn = document.getElementById('call-rm-btn');
  if (callRmBtn) {
    callRmBtn.addEventListener('click', () => {
      showToast('📞 Connecting to your Relationship Manager...');
    });
  }

  // Logout
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      const { logout } = require('../store/appState.js');
      // Dynamic import workaround
      import('../store/appState.js').then(m => {
        m.logout();
        showToast('लॉगआउट सफल');
      });
    });
  }
}
