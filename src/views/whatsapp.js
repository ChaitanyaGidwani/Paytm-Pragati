// ========================================
// WhatsApp Copilot & Automation View
// ========================================

import { renderHeader } from '../components/header.js';
import { showToast } from '../components/toast.js';
import { campaignResults, scheduledCampaigns } from '../data/merchant.js';

export function renderWhatsApp() {
  const c = campaignResults;

  const html = `
    ${renderHeader('light', 'Whatsapp Bot')}
    <main class="flex flex-col relative w-full pt-20 pb-safe bg-paytm-surface min-h-screen">
      <div class="flex flex-col w-full pb-24">

        <!-- Top Copilot Status Banner -->
        <section class="px-margin-mobile pt-space-sm pb-space-sm animate-fade-in">
          <div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm relative overflow-hidden">
            <div class="flex items-center justify-between gap-space-sm">
              <div class="flex items-center gap-space-sm min-w-0">
                <div class="relative flex-shrink-0">
                  <div class="w-12 h-12 rounded-full bg-whatsapp-green-tint flex items-center justify-center text-whatsapp-green">
                    <span class="material-symbols-outlined text-[28px]" style="font-variation-settings: 'FILL' 1;">forum</span>
                  </div>
                  <span class="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-whatsapp-green flex items-center justify-center">
                    <span class="material-symbols-outlined text-on-primary text-[11px]">check</span>
                  </span>
                </div>
                <div class="flex flex-col min-w-0">
                  <div class="flex items-center gap-1.5 flex-wrap">
                    <span class="font-headline text-headline-sm text-primary truncate">पेटीएम व्हाट्सऐप प्रगति</span>
                    <span class="inline-flex items-center gap-0.5 bg-whatsapp-green-tint text-success-green px-1.5 py-0.5 rounded-full font-label text-label-sm">
                      <span class="material-symbols-outlined text-[13px]" style="font-variation-settings: 'FILL' 1;">verified</span>
                      Verified API
                    </span>
                  </div>
                  <p class="font-body text-body-sm text-on-surface-variant truncate">
                    Meta Business API Connected • +91 98765 43210
                  </p>
                </div>
              </div>
              <button class="flex-shrink-0 bg-whatsapp-green text-on-primary px-2.5 py-1.5 rounded-lg flex items-center gap-1 shadow-sm active:scale-95 transition-transform" id="test-wa-btn">
                <span class="material-symbols-outlined text-[18px]">send</span>
                <span class="font-label text-label-sm font-bold">Test Ping</span>
              </button>
            </div>
            <!-- Live Sync -->
            <div class="mt-space-sm pt-space-xs flex items-center justify-between bg-surface-container-low px-2.5 py-1.5 rounded-lg">
              <div class="flex items-center gap-1.5">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-whatsapp-green opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-whatsapp-green"></span>
                </span>
                <span class="font-label text-label-sm text-on-surface-variant">AI Auto-Reply Bot active & listening</span>
              </div>
              <span class="font-label text-label-sm text-primary font-semibold">24x7 Sync ON</span>
            </div>
          </div>
        </section>

        <!-- Live Chat Simulation -->
        <section class="px-margin-mobile mt-space-xs animate-fade-in stagger-1">
          <div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
            <div class="flex items-center justify-between mb-space-sm">
              <div class="flex items-center gap-1.5">
                <span class="material-symbols-outlined text-whatsapp-green text-[20px]" style="font-variation-settings: 'FILL' 1;">chat</span>
                <span class="font-label text-label-lg text-primary">लाइव चैट सुझाव (AI Suggestion)</span>
              </div>
              <span class="bg-surface-container text-on-primary-fixed-variant px-2 py-0.5 rounded-full font-label text-label-sm">Just Now</span>
            </div>

            <div class="bg-surface-container-low rounded-xl p-space-sm relative">
              <!-- AI Bubble -->
              <div class="flex gap-2 mb-space-sm items-start">
                <div class="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center flex-shrink-0 text-label-sm font-bold">AI</div>
                <div class="bg-surface-container-lowest rounded-xl rounded-tl-none p-3 shadow-sm max-w-[85%]">
                  <div class="flex items-center justify-between gap-2 mb-1">
                    <span class="font-label text-label-sm text-secondary font-bold">Paytm AI Copilot</span>
                    <span class="font-label text-label-sm text-on-surface-variant text-[10px]">09:42 AM</span>
                  </div>
                  <p class="font-body text-body-md text-on-surface">
                    नमस्ते रमेश जी! <strong>42 ग्राहकों</strong> ने पिछले 15 दिनों से खरीदारी नहीं की है।
                    क्या हम आज वीकेंड ऑफर भेजें ताकि वे दोबारा आएं?
                  </p>
                  <p class="font-body text-body-sm text-on-surface-variant mt-1 italic">
                    (Namaste Ramesh ji! 42 loyal shoppers haven't visited in 15 days. Send targeted WhatsApp win-back?)
                  </p>

                  <!-- Template Card -->
                  <div class="mt-2.5 bg-whatsapp-green-tint rounded-lg p-2.5">
                    <div class="flex items-center gap-1 text-success-green mb-1">
                      <span class="material-symbols-outlined text-[16px]">local_offer</span>
                      <span class="font-label text-label-sm font-bold uppercase tracking-wider">Approved WhatsApp Template</span>
                    </div>
                    <div class="bg-surface-container-lowest rounded p-2">
                      <p class="font-label text-label-md text-primary font-bold">🎉 Sharma Kirana Special Offer</p>
                      <p class="font-body text-body-sm text-on-surface mt-0.5">
                        Get <strong>₹25 FLAT OFF</strong> on fresh grocery orders above ₹200 this Saturday & Sunday!
                      </p>
                      <div class="mt-2 pt-1.5 flex items-center justify-between text-success-green">
                        <span class="font-label text-label-sm flex items-center gap-1 font-bold">
                          <span class="material-symbols-outlined text-[14px]">touch_app</span> 1-Click WhatsApp Claim
                        </span>
                        <span class="font-label text-label-sm text-outline">Expires Sun 9 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Quick Response Buttons -->
              <div class="mt-2 pl-10 flex flex-col gap-1.5" id="wa-approval-buttons">
                <p class="font-label text-label-sm text-on-surface-variant mb-0.5">Quick Merchant Response / तुरंत फैसला लें:</p>
                <div class="flex flex-wrap gap-1.5">
                  <button class="flex-1 min-h-[44px] bg-whatsapp-green hover:bg-opacity-95 text-on-primary px-3 py-2 rounded-lg font-label text-label-md font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all" id="wa-btn-approve">
                    <span class="material-symbols-outlined text-[18px]">check_circle</span>
                    हाँ, सभी 42 को भेजो (Send)
                  </button>
                  <button class="min-h-[44px] bg-surface-container hover:bg-surface-container-high text-primary px-3 py-2 rounded-lg font-label text-label-md font-semibold flex items-center justify-center gap-1 active:scale-95 transition-all" id="wa-btn-edit">
                    <span class="material-symbols-outlined text-[18px]">edit</span>
                    ऑफ़र बदलो
                  </button>
                  <button class="min-h-[44px] bg-surface-container-lowest hover:bg-error-container text-error px-2.5 py-2 rounded-lg font-label text-label-md flex items-center justify-center gap-1 active:scale-95 transition-all" id="wa-btn-reject">
                    <span class="material-symbols-outlined text-[18px]">close</span>
                    अभी नहीं
                  </button>
                </div>
              </div>

              <!-- Sent Feedback (hidden by default) -->
              <div class="hidden mt-2 pl-10" id="wa-sent-feedback">
                <div class="bg-whatsapp-green text-on-primary px-3 py-2 rounded-lg flex items-center justify-between shadow-sm animate-fade-in">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-[20px]">done_all</span>
                    <span class="font-label text-label-md font-bold">42 ऑफ़र सफलतापूर्वक भेजे गए! (Sent)</span>
                  </div>
                  <span class="font-label text-label-sm text-whatsapp-green-tint">Live Sync</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Campaign Performance Tracker -->
        <section class="px-margin-mobile mt-space-md animate-fade-in stagger-2">
          <div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
            <div class="flex items-center justify-between mb-space-sm">
              <div>
                <span class="font-headline text-headline-sm text-primary">अभियान परिणाम (Campaign Tracker)</span>
                <p class="font-body text-body-sm text-on-surface-variant">${c.lastCampaignName} • ${c.targets} Targets</p>
              </div>
              <span class="bg-whatsapp-green-tint text-success-green px-2 py-0.5 rounded-full font-label text-label-sm font-bold flex items-center gap-0.5">
                <span class="material-symbols-outlined text-[14px]">trending_up</span>
                ROI ${c.roi}
              </span>
            </div>

            <!-- Hero Revenue Card -->
            <div class="bg-primary-container text-on-primary rounded-xl p-3.5 flex items-center justify-between mb-space-sm">
              <div class="flex flex-col">
                <span class="font-label text-label-sm text-primary-fixed uppercase tracking-wider">Direct Store Revenue (सीधी बिक्री)</span>
                <span class="font-headline text-currency-display text-on-primary tracking-tight mt-0.5">${c.directRevenueFormatted}</span>
                <span class="font-body text-body-sm text-primary-fixed-dim">${c.claimedText}</span>
              </div>
              <div class="w-12 h-12 rounded-full bg-surface-container-lowest/10 flex items-center justify-center">
                <span class="material-symbols-outlined text-secondary-fixed text-[28px]">payments</span>
              </div>
            </div>

            <!-- Funnel Stats -->
            <div class="grid grid-cols-3 gap-2">
              <div class="bg-surface-container-low rounded-lg p-2.5 flex flex-col">
                <div class="flex items-center gap-1 text-on-surface-variant mb-1">
                  <span class="material-symbols-outlined text-[16px] text-primary">outbox</span>
                  <span class="font-label text-label-sm">${c.funnel.sent.label}</span>
                </div>
                <span class="font-headline text-headline-sm text-primary">${c.funnel.sent.count}</span>
                <span class="font-label text-label-sm text-success-green flex items-center mt-0.5">
                  <span class="material-symbols-outlined text-[12px]">done_all</span> ${c.funnel.sent.percent}
                </span>
              </div>
              <div class="bg-surface-container-low rounded-lg p-2.5 flex flex-col">
                <div class="flex items-center gap-1 text-on-surface-variant mb-1">
                  <span class="material-symbols-outlined text-[16px] text-secondary">visibility</span>
                  <span class="font-label text-label-sm">${c.funnel.read.label}</span>
                </div>
                <span class="font-headline text-headline-sm text-secondary">${c.funnel.read.count}</span>
                <span class="font-label text-label-sm text-secondary font-bold mt-0.5">${c.funnel.read.percent}</span>
              </div>
              <div class="bg-surface-container-low rounded-lg p-2.5 flex flex-col">
                <div class="flex items-center gap-1 text-on-surface-variant mb-1">
                  <span class="material-symbols-outlined text-[16px] text-success-green">shopping_bag</span>
                  <span class="font-label text-label-sm">${c.funnel.redeemed.label}</span>
                </div>
                <span class="font-headline text-headline-sm text-success-green">${c.funnel.redeemed.count}</span>
                <span class="font-label text-label-sm text-success-green font-bold mt-0.5">${c.funnel.redeemed.percent}</span>
              </div>
            </div>

            <!-- Customer Redemptions -->
            <div class="mt-space-md">
              <span class="font-label text-label-md text-on-surface-variant mb-2 block">Recent Redemptions / हाल की रिडेम्प्शन</span>
              <div class="space-y-2">
                ${c.customers.map(cust => `
                  <div class="flex items-center justify-between bg-surface-container-low rounded-lg p-2.5">
                    <div class="flex items-center gap-2 min-w-0">
                      <div class="w-8 h-8 rounded-full bg-whatsapp-green-tint text-success-green flex items-center justify-center flex-shrink-0">
                        <span class="material-symbols-outlined text-[16px]">person</span>
                      </div>
                      <div class="min-w-0">
                        <div class="font-label text-label-md text-on-surface font-semibold truncate">${cust.name}</div>
                        <div class="font-body text-body-sm text-on-surface-variant truncate">${cust.item} • ${cust.time}</div>
                      </div>
                    </div>
                    <span class="font-label text-label-lg text-success-green font-bold flex-shrink-0">₹${cust.amount}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </section>

        <!-- Scheduled Auto-Campaigns -->
        <section class="px-margin-mobile mt-space-md animate-fade-in stagger-3">
          <div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
            <div class="flex items-center justify-between mb-space-sm">
              <span class="font-headline text-headline-sm text-primary">ऑटो कैंपेन शेड्यूल (Automations)</span>
              <button class="font-label text-label-sm text-secondary font-semibold">+ New</button>
            </div>
            <div class="space-y-2">
              ${scheduledCampaigns.map(camp => `
                <div class="rounded-lg bg-surface-container-low p-space-sm">
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-label text-label-md text-primary font-bold">${camp.name}</span>
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-label text-label-sm font-semibold ${camp.status === 'Active' ? 'bg-whatsapp-green-tint text-success-green' : 'bg-secondary-fixed text-secondary'}">
                      <span class="w-1.5 h-1.5 rounded-full ${camp.status === 'Active' ? 'bg-success-green' : 'bg-secondary'} animate-pulse"></span>
                      ${camp.status}
                    </span>
                  </div>
                  <div class="flex items-center gap-2 text-on-surface-variant">
                    <span class="font-body text-body-sm">${camp.type}</span>
                    <span class="w-1 h-1 rounded-full bg-outline-variant"></span>
                    <span class="font-body text-body-sm">${camp.targets} targets</span>
                    <span class="w-1 h-1 rounded-full bg-outline-variant"></span>
                    <span class="font-body text-body-sm">${camp.channel}</span>
                  </div>
                  <div class="flex items-center gap-1 mt-1 text-secondary">
                    <span class="material-symbols-outlined text-[14px]">schedule</span>
                    <span class="font-label text-label-sm font-semibold">Next: ${camp.nextRun}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- Bottom Voice Bar -->
        <section class="px-margin-mobile mt-space-md animate-fade-in stagger-4">
          <button class="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary-container text-on-primary shadow-md active:scale-[0.99] transition-transform" id="wa-voice-bar">
            <span class="material-symbols-outlined text-[20px] text-secondary-container">mic</span>
            <span class="font-label text-label-md">बोलकर कैम्पेन बनाएं / "50 ग्राहकों को दीवाली ऑफर भेजो"</span>
          </button>
        </section>

      </div>
    </main>
  `;

  setTimeout(() => initWhatsAppListeners(), 50);
  return html;
}

function initWhatsAppListeners() {
  // Test Ping
  const testBtn = document.getElementById('test-wa-btn');
  if (testBtn) {
    testBtn.addEventListener('click', () => {
      showToast('📱 Test ping sent to +91 98765 43210!');
    });
  }

  // Approve button
  const approveBtn = document.getElementById('wa-btn-approve');
  const buttonsContainer = document.getElementById('wa-approval-buttons');
  const sentFeedback = document.getElementById('wa-sent-feedback');

  if (approveBtn) {
    approveBtn.addEventListener('click', () => {
      if (buttonsContainer) buttonsContainer.classList.add('hidden');
      if (sentFeedback) sentFeedback.classList.remove('hidden');
      showToast('✅ 42 WhatsApp offers dispatched successfully!');
    });
  }

  // Reject button
  const rejectBtn = document.getElementById('wa-btn-reject');
  if (rejectBtn) {
    rejectBtn.addEventListener('click', () => {
      if (buttonsContainer) buttonsContainer.classList.add('hidden');
      showToast('Campaign dismissed for now');
    });
  }

  // Edit button
  const editBtn = document.getElementById('wa-btn-edit');
  if (editBtn) {
    editBtn.addEventListener('click', () => {
      showToast('📝 Opening campaign editor...');
    });
  }

  // Voice bar
  const voiceBar = document.getElementById('wa-voice-bar');
  if (voiceBar) {
    voiceBar.addEventListener('click', () => {
      showToast('🎙️ Voice campaign creation coming soon!');
    });
  }
}
