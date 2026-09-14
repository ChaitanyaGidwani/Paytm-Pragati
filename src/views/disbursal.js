// ========================================
// Disbursal Confirmation View (Production)
// ========================================

import { renderHeader } from '../components/header.js';
import { showToast } from '../components/toast.js';
import { store } from '../store/appState.js';
import { formatCurrency } from '../data/merchant.js';
import { navigate } from '../router.js';

export function renderDisbursal() {
  const merchant = store.get('merchant');
  const loan = store.get('loan');
  const active = loan.active;

  // If no active loan, redirect to apply
  if (!active) {
    setTimeout(() => navigate('/loans'), 10);
    return '<div class="flex items-center justify-center h-screen"><span class="material-symbols-outlined text-primary text-[32px] animate-spin">progress_activity</span></div>';
  }

  const html = `
    ${renderHeader('dark', 'Loan Disbursed')}
    <main class="flex flex-col relative w-full pt-20 pb-safe min-h-screen" style="background: linear-gradient(180deg, #002970 0%, #003d99 30%, #f3f5f9 30.1%);">
      <div class="flex flex-col w-full pb-24">

        <!-- Success Hero -->
        <section class="px-margin-mobile pt-space-md pb-10 text-center relative">
          <div class="w-16 h-16 rounded-full bg-success-green mx-auto flex items-center justify-center shadow-lg animate-scale-in animate-glow mb-3">
            <span class="material-symbols-outlined text-white text-[36px]">check_circle</span>
          </div>
          <h1 class="font-headline text-headline-lg text-white tracking-tight animate-fade-in">
            ${active.amountFormatted || formatCurrency(active.amount)} Disbursed!
          </h1>
          <p class="font-body text-body-md text-primary-fixed-dim mt-1 animate-fade-in" style="animation-delay: 0.1s">
            सीधे आपके ${merchant.bankShort} खाते में ट्रांसफर हो गया
          </p>
        </section>

        <!-- Bank Transfer Card -->
        <section class="px-margin-mobile mb-space-md animate-fade-in" style="animation-delay: 0.2s;">
          <div class="rounded-xl bg-white shadow-lg p-space-md -mt-4">
            <div class="flex items-center gap-2 mb-space-sm">
              <span class="material-symbols-outlined text-success-green text-[20px]">account_balance</span>
              <span class="font-label text-label-md text-primary font-bold">Bank Transfer Confirmation</span>
            </div>

            <div class="bg-surface-container-low rounded-lg p-3 space-y-2.5">
              <div class="flex justify-between items-center">
                <span class="font-body text-body-sm text-on-surface-variant">Disbursed Amount</span>
                <span class="font-headline text-headline-sm text-primary font-bold">${active.amountFormatted || formatCurrency(active.amount)}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="font-body text-body-sm text-on-surface-variant">Bank Account</span>
                <span class="font-label text-label-md text-primary">${active.bankName || merchant.bankName} (****${active.accountEnding || merchant.accountEnding})</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="font-body text-body-sm text-on-surface-variant">UTR Reference</span>
                <span class="font-label text-label-md text-secondary font-mono">${active.utrRef}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="font-body text-body-sm text-on-surface-variant">Account Holder</span>
                <span class="font-label text-label-md text-primary">${active.accountHolder || merchant.name}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="font-body text-body-sm text-on-surface-variant">Loan Number</span>
                <span class="font-label text-label-md text-primary font-mono text-[12px]">${active.loanNumber}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Soundbox Announcement -->
        <section class="px-margin-mobile mb-space-md animate-fade-in stagger-2">
          <div class="rounded-xl bg-white shadow-sm p-space-md">
            <div class="flex items-center gap-2 mb-space-sm">
              <span class="material-symbols-outlined text-secondary text-[20px]">graphic_eq</span>
              <span class="font-label text-label-md text-primary">Soundbox Announcement</span>
            </div>
            <div class="bg-surface-container-low rounded-lg p-3 flex items-center gap-3">
              <button class="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform" id="play-disbursal-announcement">
                <span class="material-symbols-outlined text-white text-[22px]" id="play-icon">play_arrow</span>
              </button>
              <div>
                <p class="font-body text-body-sm text-primary italic">
                  "${active.accountHolder || merchant.name} जी, आपके लोन की राशि ${active.amountFormatted || formatCurrency(active.amount)} सफलतापूर्वक ${merchant.bankShort} खाते में भेज दी गई है।"
                </p>
                <span class="font-label text-label-sm text-on-surface-variant">Audio announcement via Soundbox</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Daily Settlement Breakdown -->
        <section class="px-margin-mobile mb-space-md animate-fade-in stagger-3">
          <div class="rounded-xl bg-white shadow-sm p-space-md">
            <h2 class="font-headline text-headline-sm text-primary mb-space-sm flex items-center gap-2">
              <span class="material-symbols-outlined text-[20px] text-secondary">calendar_today</span>
              Tomorrow Morning's Settlement Preview
            </h2>

            <div class="space-y-space-sm">
              <!-- QR Payments -->
              <div class="flex items-center justify-between py-2 border-b border-surface-container">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-success-green text-[18px]">add_circle</span>
                  <div>
                    <span class="font-label text-label-md text-primary">कुल QR पेमेंट (Est.)</span>
                    <span class="font-body text-body-sm text-on-surface-variant block">Gross Soundbox Inflow</span>
                  </div>
                </div>
                <span class="font-headline text-headline-sm text-success-green font-bold">+₹4,820</span>
              </div>

              <!-- Loan Deduction -->
              <div class="flex items-center justify-between py-2 border-b border-surface-container">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-error text-[18px]">remove_circle</span>
                  <div>
                    <span class="font-label text-label-md text-primary">दैनिक लोन किस्त (Day 1)</span>
                    <span class="font-body text-body-sm text-on-surface-variant block">Daily Loan Recovery</span>
                  </div>
                </div>
                <span class="font-headline text-headline-sm text-error font-bold">-${active.dailyDeductionFormatted || formatCurrency(active.dailyDeduction)}</span>
              </div>

              <!-- Net Credit -->
              <div class="flex items-center justify-between py-2 bg-success-green/5 rounded-lg px-2 -mx-2">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary text-[18px]">account_balance</span>
                  <div>
                    <span class="font-label text-label-md text-primary font-bold">SBI खाते में क्रेडिट</span>
                    <span class="font-body text-body-sm text-on-surface-variant block">IMPS 7:05 AM predicted</span>
                  </div>
                </div>
                <span class="font-headline text-headline-sm text-primary font-bold">+${formatCurrency(4820 - active.dailyDeduction)}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- NBFC & Compliance -->
        <section class="px-margin-mobile mb-space-md animate-fade-in stagger-4">
          <div class="rounded-xl bg-white shadow-sm p-space-md">
            <h2 class="font-headline text-headline-sm text-primary mb-space-sm">Loan Details</h2>
            <div class="bg-surface-container-low rounded-lg p-3 space-y-2">
              <div class="flex justify-between"><span class="text-on-surface-variant font-body text-body-sm">NBFC Partner</span><span class="font-label text-label-md text-primary">${active.nbfcPartner || 'Clix Capital'}</span></div>
              <div class="flex justify-between"><span class="text-on-surface-variant font-body text-body-sm">Total Repayable</span><span class="font-label text-label-md text-primary">${active.totalPayableFormatted || formatCurrency(active.totalPayable)}</span></div>
              <div class="flex justify-between"><span class="text-on-surface-variant font-body text-body-sm">Tenure</span><span class="font-label text-label-md text-primary">${active.tenure} Days</span></div>
              <div class="flex justify-between"><span class="text-on-surface-variant font-body text-body-sm">Interest Rate</span><span class="font-label text-label-md text-primary">${active.interestRate}% flat/month</span></div>
              <div class="flex justify-between"><span class="text-on-surface-variant font-body text-body-sm">Daily Deduction</span><span class="font-label text-label-md text-primary">${active.dailyDeductionFormatted || formatCurrency(active.dailyDeduction)}</span></div>
            </div>
          </div>
        </section>

        <!-- Credit Upgrade Progress -->
        <section class="px-margin-mobile mb-space-md animate-fade-in stagger-5">
          <div class="rounded-xl bg-gradient-to-r from-surface-container-low to-surface-container p-space-md">
            <div class="flex items-center gap-2 mb-2">
              <span class="material-symbols-outlined text-secondary text-[20px]">trending_up</span>
              <span class="font-label text-label-md text-primary font-bold">Next Credit Limit Upgrade</span>
            </div>
            <div class="bg-white rounded-lg p-3">
              <div class="flex items-center justify-between mb-2">
                <span class="font-body text-body-sm text-on-surface-variant">Current: ${formatCurrency(active.amount)}</span>
                <span class="font-label text-label-md text-secondary font-bold">Target: ${formatCurrency(active.amount * 1.5)}</span>
              </div>
              <div class="bg-surface-container h-2.5 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style="width: ${active.progressPercent || 0}%;"></div>
              </div>
              <p class="font-body text-body-sm text-on-surface-variant mt-2">
                Maintain 30 consecutive active QR days to unlock ₹${((active.amount * 1.5) / 1000).toFixed(0)}K limit.
              </p>
            </div>
          </div>
        </section>

        <!-- Action Buttons -->
        <section class="px-margin-mobile mb-space-md">
          <div class="flex gap-space-sm">
            <button class="flex-1 h-12 bg-white text-primary rounded-xl flex items-center justify-center gap-2 font-label text-label-lg shadow-sm active:scale-[0.98] transition-transform" id="view-statement-btn">
              <span class="material-symbols-outlined text-[20px]">receipt_long</span>
              View Statement
            </button>
            <button class="flex-1 h-12 bg-primary text-white rounded-xl flex items-center justify-center gap-2 font-label text-label-lg shadow-lg active:scale-[0.98] transition-transform" id="back-to-dashboard-btn">
              <span class="material-symbols-outlined text-[20px]">home</span>
              Dashboard
            </button>
          </div>
        </section>
      </div>
    </main>
  `;

  setTimeout(() => initDisbursalListeners(), 50);
  return html;
}

function initDisbursalListeners() {
  // Play announcement
  const playBtn = document.getElementById('play-disbursal-announcement');
  const playIcon = document.getElementById('play-icon');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      const loan = store.get('loan');
      const merchant = store.get('merchant');
      if ('speechSynthesis' in window) {
        const text = `${merchant.name} ji, aapke loan ki rashi ${loan.active?.amount || 100000} rupaye safaltapurvak ${merchant.bankShort} khate mein bhej di gayi hai`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'hi-IN';
        utterance.rate = 0.85;
        speechSynthesis.speak(utterance);
        if (playIcon) playIcon.textContent = 'pause';
        utterance.onend = () => { if (playIcon) playIcon.textContent = 'play_arrow'; };
      }
      showToast('🔊 Playing announcement...');
    });
  }

  // Navigation
  const viewStatementBtn = document.getElementById('view-statement-btn');
  if (viewStatementBtn) viewStatementBtn.addEventListener('click', () => navigate('/loan-statement'));

  const dashBtn = document.getElementById('back-to-dashboard-btn');
  if (dashBtn) dashBtn.addEventListener('click', () => navigate('/dashboard'));
}
