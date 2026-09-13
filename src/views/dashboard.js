// ========================================
// Dashboard View — AI Growth Home
// ========================================

import { renderHeader } from '../components/header.js';
import { renderVoiceDrawer } from '../components/voiceDrawer.js';
import { showToast } from '../components/toast.js';
import { openVoiceDrawer, initVoiceDrawerListeners } from '../components/voiceDrawer.js';
import { todaysPulse, aiRecommendations, whatsappBotStats, merchantProfile, stockAlerts } from '../data/merchant.js';
import { navigate } from '../router.js';

export function renderDashboard() {
  const r = aiRecommendations;
  const p = todaysPulse;
  const w = whatsappBotStats;

  const html = `
    ${renderHeader('light', 'Dashboard')}
    <main class="flex flex-col relative w-full pt-20 pb-safe bg-paytm-surface min-h-screen">
      <div class="flex flex-col w-full pb-24">

        <!-- Merchant Greeting & Quick Mood Ribbon -->
        <section class="px-margin-mobile pt-space-md pb-space-sm flex items-center justify-between animate-fade-in">
          <div class="flex flex-col min-w-0">
            <div class="flex items-center gap-space-xs">
              <span class="font-headline text-headline-sm text-primary">${p.greeting}</span>
              <span class="text-[18px]">🙏</span>
            </div>
            <p class="font-body text-body-sm text-on-surface-variant flex items-center gap-1">
              <span>Shop open since ${merchantProfile.shopOpenSince}</span>
              <span class="w-1 h-1 rounded-full bg-outline-variant"></span>
              <span class="text-success-green font-medium">${p.busyTag}</span>
            </p>
          </div>
          <button class="flex items-center gap-1.5 px-3 py-2 rounded-full bg-surface-container-high text-primary active:scale-95 transition-transform shadow-sm" id="quick-voice-btn">
            <span class="material-symbols-outlined text-[18px] text-secondary">mic</span>
            <span class="font-label text-label-sm uppercase tracking-wide">बोलें</span>
          </button>
        </section>

        <!-- 1. Today's Business Pulse Card -->
        <section class="px-margin-mobile mb-space-md animate-fade-in stagger-1">
          <div class="relative overflow-hidden rounded-xl bg-paytm-card p-space-md shadow-md">
            <div class="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-surface-container-low opacity-60 pointer-events-none"></div>
            <div class="flex items-start justify-between relative z-10 mb-space-sm">
              <div>
                <span class="font-label text-label-md text-on-surface-variant flex items-center gap-1">
                  <span>आज का हिसाब • Today's Pulse</span>
                </span>
                <div class="flex items-baseline gap-2 mt-0.5">
                  <span class="font-headline text-currency-display text-primary tracking-tight">${p.revenueFormatted}</span>
                  <span class="inline-flex items-center gap-0.5 text-success-green font-label text-label-sm bg-whatsapp-green-tint px-2 py-0.5 rounded-full">
                    <span class="material-symbols-outlined text-[12px]">trending_up</span>
                    +${p.trendPercent}% vs कल
                  </span>
                </div>
              </div>
              <button aria-label="Replay Last Payment" class="flex items-center gap-1.5 bg-surface-container text-primary hover:bg-surface-container-high active:scale-95 transition-all px-3 py-2 rounded-lg" id="soundbox-replay-trigger">
                <span class="material-symbols-outlined text-[20px] text-secondary animate-pulse" id="soundbox-speaker-icon">volume_up</span>
                <div class="flex flex-col text-left">
                  <span class="font-label text-label-sm text-primary leading-none">Replay</span>
                  <span class="text-[9px] text-on-surface-variant font-label leading-tight">Soundbox</span>
                </div>
              </button>
            </div>
            <div class="grid grid-cols-2 gap-space-sm relative z-10 pt-space-xs">
              <div class="bg-surface-container-low rounded-lg p-2.5 flex items-center justify-between">
                <div>
                  <span class="font-label text-label-sm text-on-surface-variant block">कुल पेमेंट्स (Received)</span>
                  <span class="font-headline text-headline-sm text-primary font-bold">${p.txnCount} <span class="font-body text-body-sm font-normal text-on-surface-variant">txns</span></span>
                </div>
                <div class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center">
                  <span class="material-symbols-outlined text-secondary text-[18px]">qr_code_scanner</span>
                </div>
              </div>
              <div class="bg-surface-container-low rounded-lg p-2.5 flex items-center justify-between">
                <div>
                  <span class="font-label text-label-sm text-on-surface-variant block">औसत बिल (Avg Bill)</span>
                  <span class="font-headline text-headline-sm text-primary font-bold">${p.avgBillFormatted}</span>
                </div>
                <div class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center">
                  <span class="material-symbols-outlined text-secondary text-[18px]">receipt</span>
                </div>
              </div>
            </div>
            <div class="mt-space-sm bg-surface-container-high rounded-lg p-2 flex items-center justify-between transition-colors" id="soundbox-announcement-pill">
              <div class="flex items-center gap-2 min-w-0">
                <span class="material-symbols-outlined text-[16px] text-secondary">graphic_eq</span>
                <span class="font-body text-body-sm text-primary truncate">${p.lastAnnouncement}</span>
              </div>
              <span class="font-label text-label-sm text-on-surface-variant flex-shrink-0">${p.lastAnnouncementTime}</span>
            </div>
          </div>
        </section>

        <!-- 2. AI Vyapaar Pragati Copilot Card -->
        <section class="px-margin-mobile mb-space-md animate-fade-in stagger-2">
          <div class="rounded-xl bg-paytm-card shadow-lg overflow-hidden relative">
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
              <div class="rounded-lg bg-surface-container-low p-space-sm mb-space-sm">
                <div class="flex items-start gap-2">
                  <span class="material-symbols-outlined text-warning-amber text-[20px] flex-shrink-0 mt-0.5">${r.footfallAlert.icon}</span>
                  <div class="flex flex-col">
                    <span class="font-label text-label-md text-primary">${r.footfallAlert.title}</span>
                    <p class="font-body text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
                      ${r.footfallAlert.description} <strong class="text-warning-amber font-semibold">${r.footfallAlert.highlightValue}</strong>.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Win-back Campaign -->
              <div class="rounded-lg bg-whatsapp-green-tint/60 p-space-sm mb-space-md">
                <div class="flex items-start gap-2">
                  <span class="material-symbols-outlined text-whatsapp-green text-[20px] flex-shrink-0 mt-0.5">bolt</span>
                  <div>
                    <span class="font-label text-label-md text-primary">${r.winBackCampaign.title}</span>
                    <p class="font-body text-body-sm text-on-surface-variant mt-0.5">
                      Target <strong>${r.winBackCampaign.lapsedCustomers} lapsed customers</strong> who regularly bought ${r.winBackCampaign.product}. Send ₹${r.winBackCampaign.voucherAmount} OFF voucher on WhatsApp valid till ${r.winBackCampaign.voucherExpiry}.
                    </p>
                  </div>
                </div>
                <div class="mt-space-xs flex items-center gap-1 text-success-green font-label text-label-md pl-7">
                  <span class="material-symbols-outlined text-[16px]">add_circle</span>
                  <span>Estimated Sales Uplift: <strong class="text-primary font-bold">${r.winBackCampaign.estimatedUpliftFormatted}</strong></span>
                </div>
              </div>

              <!-- 1-Tap WhatsApp CTA -->
              <button class="w-full h-12 bg-whatsapp-green text-on-primary rounded-lg flex items-center justify-center gap-2 font-label text-label-lg active:scale-[0.99] transition-transform shadow-md" id="send-whatsapp-campaign-btn">
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

        <!-- 3. WhatsApp Bot Status Card -->
        <section class="px-margin-mobile mb-space-md animate-fade-in stagger-3">
          <div class="rounded-xl bg-paytm-card shadow-sm p-space-md">
            <div class="flex items-center justify-between mb-space-sm">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-full bg-whatsapp-green flex items-center justify-center text-on-primary">
                  <span class="material-symbols-outlined text-[18px]">chat</span>
                </div>
                <div>
                  <h2 class="font-headline text-headline-sm text-primary leading-tight">WhatsApp Vyapaar Bot</h2>
                  <span class="font-label text-label-sm text-on-surface-variant">${w.phone} • Active</span>
                </div>
              </div>
              <span class="inline-flex items-center gap-1 bg-whatsapp-green-tint text-success-green px-2 py-0.5 rounded-full font-label text-label-sm font-semibold">
                <span class="material-symbols-outlined text-[12px]">verified</span> ${w.customerCountFormatted}
              </span>
            </div>

            <!-- WhatsApp Template Preview -->
            <div class="relative rounded-lg bg-surface-container-low p-space-sm">
              <div class="flex items-center justify-between mb-2">
                <span class="font-label text-label-sm text-on-surface-variant uppercase tracking-wide">Ready WhatsApp Template (हिंदी)</span>
                <span class="font-label text-label-sm text-secondary cursor-pointer hover:underline">Edit / बदलाव</span>
              </div>
              <div class="bg-paytm-card rounded-lg p-3 shadow-sm max-w-full">
                <p class="font-body text-body-sm text-primary leading-relaxed">${r.winBackCampaign.templateMessage}</p>
                <div class="my-2 p-2 rounded bg-surface-container flex items-center justify-between">
                  <span class="font-label text-label-md text-primary font-bold tracking-widest">कूपन कोड: ${r.winBackCampaign.couponCode}</span>
                  <span class="font-label text-label-sm text-on-surface-variant">Expiry: ${r.winBackCampaign.voucherExpiry}</span>
                </div>
                <p class="text-[11px] text-on-surface-variant">${r.winBackCampaign.templateFooter}</p>
                <div class="flex justify-end items-center gap-1 mt-1 text-[10px] text-on-surface-variant">
                  <span>AI Bot • 12:45 PM</span>
                  <span class="material-symbols-outlined text-whatsapp-green text-[14px]">done_all</span>
                </div>
              </div>
              <div class="flex items-center justify-around mt-space-sm pt-space-xs text-center">
                <div>
                  <span class="font-label text-label-sm text-on-surface-variant block">Open Rate</span>
                  <span class="font-label text-label-lg text-primary font-bold">${w.openRate}</span>
                </div>
                <div class="w-px h-6 bg-surface-container-highest"></div>
                <div>
                  <span class="font-label text-label-sm text-on-surface-variant block">Repeat Orders</span>
                  <span class="font-label text-label-lg text-success-green font-bold">${w.repeatOrders}</span>
                </div>
                <div class="w-px h-6 bg-surface-container-highest"></div>
                <div>
                  <span class="font-label text-label-sm text-on-surface-variant block">Automated Bill</span>
                  <span class="font-label text-label-lg text-primary font-bold">${w.autoBill}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 4. Smart Daily Actions -->
        <section class="px-margin-mobile mb-space-md animate-fade-in stagger-4">
          <div class="flex items-center justify-between mb-space-xs">
            <h3 class="font-headline text-headline-sm text-primary">Smart Daily Actions • जरूरी काम</h3>
            <span class="font-label text-label-sm text-secondary font-semibold">2 Actions Pending</span>
          </div>
          <div class="space-y-space-sm">
            <!-- Lending Card -->
            <div class="rounded-xl bg-paytm-card p-space-md shadow-sm relative overflow-hidden cursor-pointer hover:shadow-md transition-shadow" id="loan-action-card">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0 text-primary">
                  <span class="material-symbols-outlined text-[24px]">account_balance</span>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-1.5 flex-wrap">
                    <span class="font-label text-label-lg text-primary font-bold">₹1,50,000 Pre-Approved Loan</span>
                    <span class="bg-whatsapp-green-tint text-success-green text-[10px] font-bold px-1.5 py-0.5 rounded font-label">0 Paperwork</span>
                  </div>
                  <p class="font-body text-body-sm text-on-surface-variant mt-0.5">
                    Based on your steady daily UPI volume (₹1.4L / month). Daily auto-deduct: ₹190.
                  </p>
                  <div class="mt-3 flex items-center gap-2">
                    <button class="bg-primary text-on-primary px-3 py-1.5 rounded font-label text-label-md active:scale-95 transition-transform" id="get-loan-btn">
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
            <div class="rounded-xl bg-paytm-card p-space-md shadow-sm">
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
                    ${stockAlerts.map(a => a.name).join(' & ')} are projected to run out before Friday evening rush.
                  </p>
                  <div class="mt-3 flex items-center justify-between pt-1">
                    <span class="font-label text-label-sm text-on-surface-variant">Supplier: ${stockAlerts[0].supplier}</span>
                    <button class="flex items-center gap-1 bg-whatsapp-green text-on-primary px-3 py-1.5 rounded font-label text-label-md active:scale-95 transition-transform" id="order-via-bot-btn">
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
            <button class="bg-surface-container text-primary font-label text-label-sm px-2.5 py-1.5 rounded font-semibold active:scale-95 transition-transform">
              Call RM
            </button>
          </div>
        </section>
      </div>

      ${renderVoiceDrawer()}
    </main>
  `;

  // Inject HTML then attach listeners
  setTimeout(() => {
    initDashboardListeners();
    initVoiceDrawerListeners();
  }, 50);

  return html;
}

function initDashboardListeners() {
  // Soundbox Replay
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

      showToast('🔊 Replaying on Soundbox: "Paytm पर ₹150 प्राप्त हुए"');

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
    sendBtn.addEventListener('click', () => {
      sendBtn.disabled = true;
      sendBtn.innerHTML = '<span class="material-symbols-outlined text-[20px] animate-spin">refresh</span> Sending to 42 Customers...';

      setTimeout(() => {
        sendBtn.classList.remove('bg-whatsapp-green');
        sendBtn.classList.add('bg-primary-container');
        sendBtn.innerHTML = '<span class="material-symbols-outlined text-[20px]">done</span> Sent! +₹3,200 Uplift in Progress';
        showToast('WhatsApp Campaign active: 42 coupons dispatched!');
      }, 1200);
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
    orderBtn.addEventListener('click', () => {
      showToast('📦 Order placed via WhatsApp Bot to Agarwal Wholesale');
    });
  }
}
