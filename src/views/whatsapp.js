// ========================================
// WhatsApp Copilot View (Production)
// ========================================

import { renderHeader } from '../components/header.js';
import { showToast } from '../components/toast.js';
import { store } from '../store/appState.js';
import { approveCampaign, sendTestPing } from '../services/apiService.js';
import { navigate } from '../router.js';

export function renderWhatsApp() {
  const merchant = store.get('merchant');
  const campaigns = store.get('campaigns');
  const whatsapp = campaigns.whatsappStatus || {};

  const html = `
    ${renderHeader('dark', 'WhatsApp Copilot')}
    <main class="flex flex-col relative w-full pt-20 pb-safe bg-paytm-surface min-h-screen">
      <div class="flex flex-col w-full pb-24">

        <!-- Bot Status Banner -->
        <section class="bg-gradient-to-r from-[#002970] to-[#003d99] px-margin-mobile py-space-md">
          <div class="flex items-center justify-between mb-space-sm">
            <div class="flex items-center gap-2">
              <div class="w-9 h-9 rounded-full bg-whatsapp-green flex items-center justify-center text-white">
                <span class="material-symbols-outlined text-[20px]">chat</span>
              </div>
              <div>
                <div class="flex items-center gap-1.5">
                  <span class="font-headline text-headline-sm text-on-primary leading-tight">WhatsApp Vyapaar Bot</span>
                  <span class="w-2 h-2 rounded-full bg-success-green shadow-[0_0_6px_rgba(37,211,102,0.7)]"></span>
                </div>
                <span class="font-label text-label-sm text-primary-fixed-dim">${merchant.phone} • ${whatsapp.customerCount || 412} ग्राहक</span>
              </div>
            </div>
            <button class="bg-white/10 text-white px-3 py-1.5 rounded-lg font-label text-label-sm border border-white/15 active:bg-white/20 transition-colors" id="wa-test-ping-btn">
              Test Ping
            </button>
          </div>

          <!-- Quick Stats -->
          <div class="grid grid-cols-3 gap-2 mt-space-sm">
            <div class="bg-white/8 rounded-lg p-2 text-center border border-white/6">
              <span class="font-headline text-headline-sm text-white block">89%</span>
              <span class="font-label text-label-sm text-primary-fixed-dim block">Open Rate</span>
            </div>
            <div class="bg-white/8 rounded-lg p-2 text-center border border-white/6">
              <span class="font-headline text-headline-sm text-whatsapp-green block">43%</span>
              <span class="font-label text-label-sm text-primary-fixed-dim block">Redeemed</span>
            </div>
            <div class="bg-white/8 rounded-lg p-2 text-center border border-white/6">
              <span class="font-headline text-headline-sm text-white block" id="wa-roi-display">${campaigns.stats?.roi || '12.4x'}</span>
              <span class="font-label text-label-sm text-primary-fixed-dim block">ROI</span>
            </div>
          </div>
        </section>

        <!-- AI Chat Suggestion -->
        <section class="px-margin-mobile mt-space-md mb-space-md animate-fade-in">
          <div class="rounded-xl bg-white shadow-md p-space-md">
            <div class="flex items-center gap-2 mb-space-sm">
              <span class="material-symbols-outlined text-secondary text-[20px]">auto_awesome</span>
              <h2 class="font-headline text-headline-sm text-primary">AI-Suggested Campaign</h2>
            </div>

            <div class="bg-surface-container-low rounded-lg p-3 mb-space-sm">
              <div class="flex items-center gap-2 mb-2">
                <span class="font-label text-label-sm text-on-surface-variant uppercase">WhatsApp Template Preview</span>
                <span class="bg-success-green/10 text-success-green text-[10px] font-bold px-1.5 py-0.5 rounded-full font-label">META APPROVED</span>
              </div>
              <div class="bg-white rounded-lg p-3 shadow-sm" id="wa-template-preview">
                <p class="font-body text-body-sm text-primary mb-2" id="wa-template-text">🙏 नमस्ते! शर्मा किराना स्टोर से आज <strong>1kg चीनी पर ₹20 की विशेष छूट</strong>।</p>
                <div class="p-2 rounded bg-surface-container flex items-center justify-between mb-2">
                  <span class="font-label text-label-md text-primary font-bold tracking-widest" id="wa-coupon-display">SHARMA20</span>
                  <span class="font-label text-label-sm text-on-surface-variant">Valid till 6 PM</span>
                </div>
                <p class="text-[11px] text-on-surface-variant">दुकान पर दिखाएं। तुरंत डिलीवरी उपलब्ध 🚚</p>
              </div>
            </div>

            <!-- Campaign Targeting -->
            <div class="flex items-center justify-between mb-space-sm bg-surface-container-low rounded-lg p-2.5">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px] text-secondary">group</span>
                <div>
                  <span class="font-label text-label-md text-primary">Target: 42 Lapsed Customers</span>
                  <span class="font-body text-body-sm text-on-surface-variant block">Haven't visited in 7+ days</span>
                </div>
              </div>
              <span class="font-headline text-headline-sm text-success-green">+₹3,200</span>
            </div>

            <!-- CTA -->
            <button class="w-full h-12 bg-whatsapp-green text-white rounded-xl flex items-center justify-center gap-2 font-label text-label-lg active:scale-[0.98] transition-transform shadow-md shadow-whatsapp-green/20" id="wa-approve-campaign-btn">
              <span class="material-symbols-outlined text-[20px]">send</span>
              <span>Approve & Send Now</span>
            </button>
          </div>
        </section>

        <!-- Campaign History / Active Campaigns -->
        <section class="px-margin-mobile mb-space-md animate-fade-in stagger-2">
          <div class="flex items-center justify-between mb-space-sm">
            <h2 class="font-headline text-headline-sm text-primary">Campaign Tracker</h2>
            <button class="font-label text-label-sm text-secondary font-semibold" id="wa-create-new-btn">+ New Campaign</button>
          </div>
          <div class="space-y-space-sm" id="wa-campaign-list">
            ${renderCampaignCards(campaigns)}
          </div>
        </section>

        <!-- Automation Settings -->
        <section class="px-margin-mobile mb-space-md animate-fade-in stagger-3">
          <div class="rounded-xl bg-white p-space-md shadow-sm">
            <h2 class="font-headline text-headline-sm text-primary mb-space-sm">Automation Settings</h2>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[20px] text-secondary">schedule</span>
                  <span class="font-label text-label-md text-primary">Auto-reply (Instant Response)</span>
                </div>
                <button class="relative inline-flex h-6 w-11 rounded-full transition-colors ${whatsapp.autoReplyActive ? 'bg-whatsapp-green' : 'bg-outline-variant'}" id="wa-auto-reply-toggle" role="switch" aria-checked="${whatsapp.autoReplyActive}">
                  <span class="inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform ${whatsapp.autoReplyActive ? 'translate-x-[22px]' : 'translate-x-0.5'} mt-0.5"></span>
                </button>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[20px] text-secondary">receipt</span>
                  <span class="font-label text-label-md text-primary">Auto Bill on WhatsApp</span>
                </div>
                <button class="relative inline-flex h-6 w-11 rounded-full transition-colors bg-whatsapp-green" role="switch" aria-checked="true" id="wa-auto-bill-toggle">
                  <span class="inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform translate-x-[22px] mt-0.5"></span>
                </button>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[20px] text-secondary">event</span>
                  <span class="font-label text-label-md text-primary">Festival Campaign Auto-trigger</span>
                </div>
                <button class="relative inline-flex h-6 w-11 rounded-full transition-colors bg-whatsapp-green" role="switch" aria-checked="true" id="wa-festival-toggle">
                  <span class="inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform translate-x-[22px] mt-0.5"></span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  `;

  setTimeout(() => initWhatsAppListeners(), 50);
  return html;
}

function renderCampaignCards(campaigns) {
  const active = campaigns.active || [];
  if (active.length === 0) {
    return `
      <div class="rounded-xl bg-white p-space-md text-center shadow-sm">
        <span class="material-symbols-outlined text-outline text-[36px]">campaign</span>
        <p class="font-label text-label-md text-on-surface-variant mt-2">No campaigns sent yet</p>
        <p class="font-body text-body-sm text-outline mt-0.5">Send your first campaign above!</p>
      </div>
    `;
  }

  return active.slice(0, 5).map((c, i) => `
    <div class="rounded-xl bg-white p-space-md shadow-sm animate-fade-in" style="animation-delay: ${i * 0.05}s">
      <div class="flex items-center justify-between mb-2">
        <span class="font-label text-label-md text-primary font-bold">${c.name || 'Win-back Campaign'}</span>
        <span class="inline-flex items-center gap-1 bg-success-green/10 text-success-green text-[11px] px-2 py-0.5 rounded-full font-label font-semibold">
          <span class="material-symbols-outlined text-[12px]">check_circle</span>${c.status || 'SENT'}
        </span>
      </div>
      <div class="grid grid-cols-4 gap-2 text-center">
        <div>
          <span class="font-headline text-headline-sm text-primary block">${c.sentCount || 0}</span>
          <span class="text-[10px] text-on-surface-variant font-label">Sent</span>
        </div>
        <div>
          <span class="font-headline text-headline-sm text-primary block">${c.deliveredCount || 0}</span>
          <span class="text-[10px] text-on-surface-variant font-label">Delivered</span>
        </div>
        <div>
          <span class="font-headline text-headline-sm text-success-green block">${c.readCount || 0}</span>
          <span class="text-[10px] text-on-surface-variant font-label">Read</span>
        </div>
        <div>
          <span class="font-headline text-headline-sm text-whatsapp-green block font-bold">${c.redeemedCount || 0}</span>
          <span class="text-[10px] text-on-surface-variant font-label">Redeemed</span>
        </div>
      </div>
      <div class="mt-2 flex items-center justify-between pt-2 border-t border-surface-container">
        <span class="font-body text-body-sm text-on-surface-variant">Revenue: <strong class="text-primary">₹${c.revenue || 0}</strong></span>
        <span class="font-label text-label-sm text-success-green font-bold">ROI: ${c.roi || '0x'}</span>
      </div>
    </div>
  `).join('');
}

function initWhatsAppListeners() {
  // Test Ping
  const testPingBtn = document.getElementById('wa-test-ping-btn');
  if (testPingBtn) {
    testPingBtn.addEventListener('click', async () => {
      testPingBtn.disabled = true;
      testPingBtn.textContent = 'Sending...';
      await sendTestPing();
      testPingBtn.textContent = '✓ Sent';
      showToast('📱 Test message sent to your WhatsApp!');
      setTimeout(() => {
        testPingBtn.disabled = false;
        testPingBtn.textContent = 'Test Ping';
      }, 3000);
    });
  }

  // Approve Campaign
  const approveBtn = document.getElementById('wa-approve-campaign-btn');
  if (approveBtn) {
    approveBtn.addEventListener('click', async () => {
      approveBtn.disabled = true;
      approveBtn.innerHTML = '<span class="material-symbols-outlined text-[20px] animate-spin">progress_activity</span> Sending to 42 customers...';

      const result = await approveCampaign('wa_suggested_' + Date.now(), 42);

      if (result.status === 'success') {
        approveBtn.classList.remove('bg-whatsapp-green');
        approveBtn.classList.add('bg-primary-container');
        approveBtn.innerHTML = '<span class="material-symbols-outlined text-[20px]">done_all</span> Campaign Sent Successfully!';

        // Update campaign list
        const listEl = document.getElementById('wa-campaign-list');
        if (listEl) {
          listEl.innerHTML = renderCampaignCards(store.get('campaigns'));
        }

        // Update ROI display
        const roiDisplay = document.getElementById('wa-roi-display');
        if (roiDisplay) roiDisplay.textContent = result.data.roi;

        showToast('✅ Campaign sent! 42 customers will receive offers');
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
      }
    });
  }

  // Create new campaign
  const createNewBtn = document.getElementById('wa-create-new-btn');
  if (createNewBtn) {
    createNewBtn.addEventListener('click', () => {
      showToast('🆕 New campaign creation — coming soon!');
    });
  }

  // Toggle switches
  initToggle('wa-auto-reply-toggle');
  initToggle('wa-auto-bill-toggle');
  initToggle('wa-festival-toggle');
}

function initToggle(id) {
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
    showToast(newState ? '✅ Feature enabled' : '⏹ Feature disabled');
  });
}
