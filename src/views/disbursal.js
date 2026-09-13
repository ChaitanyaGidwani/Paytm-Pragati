// ========================================
// Disbursal & Daily Deduction Tracker View
// ========================================

import { renderHeader } from '../components/header.js';
import { showToast } from '../components/toast.js';
import { disbursalData, formatCurrency } from '../data/merchant.js';
import { navigate } from '../router.js';

export function renderDisbursal() {
  const d = disbursalData;

  const html = `
    ${renderHeader('dark', 'Loans')}
    <main class="flex flex-col relative w-full pt-20 pb-safe bg-paytm-surface min-h-screen">
      <div class="flex flex-col w-full px-margin-mobile pb-28 gap-space-md">

        <!-- Success Celebration Banner -->
        <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-container via-primary to-primary-container p-space-md text-on-primary shadow-lg mt-space-sm animate-fade-in">
          <div class="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-secondary-container/20 blur-2xl pointer-events-none"></div>
          <div class="absolute right-3 top-3 flex items-center gap-1 bg-whatsapp-green/20 text-whatsapp-green px-2 py-0.5 rounded-full">
            <span class="w-1.5 h-1.5 rounded-full bg-whatsapp-green animate-pulse"></span>
            <span class="font-label text-label-sm">Disbursed • Just Now</span>
          </div>
          <div class="flex items-start gap-space-sm pt-1">
            <div class="w-12 h-12 rounded-full bg-whatsapp-green flex items-center justify-center text-on-primary shadow-md flex-shrink-0">
              <span class="material-symbols-outlined text-[28px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
            </div>
            <div class="flex flex-col min-w-0 pr-12">
              <span class="font-label text-label-sm text-secondary-fixed tracking-wider uppercase">ऋण राशि हस्तांतरित / Loan Credited</span>
              <h1 class="font-headline text-headline-sm text-on-primary leading-tight mt-0.5">बधाई हो राजेश जी! 🎉</h1>
              <p class="font-body text-body-sm text-primary-fixed-dim mt-0.5">${d.loanAmountFormatted} सफलता से आपके खाते में भेजे गए</p>
            </div>
          </div>

          <!-- Bank Details -->
          <div class="mt-space-md rounded-lg bg-surface-container-lowest/10 backdrop-blur-md p-space-sm flex flex-col gap-1.5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded bg-surface-container-lowest flex items-center justify-center text-primary-container font-bold text-xs shadow-sm">${d.bankShort}</div>
                <div class="flex flex-col">
                  <span class="font-label text-label-md text-on-primary font-bold">${d.bankName}</span>
                  <span class="font-body text-body-sm text-primary-fixed-dim leading-none">A/C: •••• ${d.accountEnding} • ${d.accountHolder}</span>
                </div>
              </div>
              <div class="text-right">
                <span class="font-label text-label-sm text-secondary-fixed uppercase">IMPS Ref / UTR</span>
                <p class="font-label text-label-md text-on-primary font-mono tracking-wider">${d.utrRef}</p>
              </div>
            </div>
          </div>

          <!-- Soundbox & KFS Buttons -->
          <div class="mt-space-sm flex items-center gap-2 pt-1">
            <button class="flex-1 min-h-[44px] px-3 py-2 rounded-lg bg-secondary-container text-on-secondary-container font-label text-label-md flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-sm" id="disbursal-soundbox-btn">
              <span class="material-symbols-outlined text-[20px] text-on-secondary-container animate-bounce">volume_up</span>
              <span class="truncate">सुनें: "पेटीएम पर ${d.loanAmountFormatted} मिले"</span>
            </button>
            <button class="min-h-[44px] px-3 py-2 rounded-lg bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 text-on-primary font-label text-label-md flex items-center gap-1 transition-colors">
              <span class="material-symbols-outlined text-[18px]">download</span>
              <span>KFS पत्र</span>
            </button>
          </div>
        </div>

        <!-- Repayment Progress Card -->
        <div class="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col gap-space-sm animate-fade-in stagger-1">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-2 h-5 rounded-full bg-secondary"></div>
              <div class="flex flex-col">
                <h2 class="font-headline text-headline-sm text-on-surface">रोज़ाना सेटलमेंट ट्रैकर</h2>
                <span class="font-label text-label-sm text-on-surface-variant">Daily QR Settlement & Auto-Deduction</span>
              </div>
            </div>
            <span class="font-label text-label-sm px-2 py-0.5 rounded-full bg-surface-container text-primary font-semibold">${d.tenure} दिन अवधि</span>
          </div>

          <!-- Progress -->
          <div class="mt-2 rounded-lg bg-surface-container-low p-space-md flex flex-col gap-space-sm">
            <div class="flex justify-between items-baseline">
              <span class="font-label text-label-md text-on-surface-variant">कुल देय (Total Payable)</span>
              <span class="font-headline text-currency-display text-on-surface">${d.totalRepayableFormatted}</span>
            </div>
            <div class="w-full bg-surface-container-highest h-3 rounded-full overflow-hidden flex">
              <div class="bg-secondary-container h-full rounded-full transition-all duration-700 animate-progress-fill" style="width: ${d.progressPercent}%;"></div>
            </div>
            <div class="flex justify-between items-center text-on-surface-variant">
              <div class="flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-secondary-container"></span>
                <span class="font-label text-label-sm">चुकाया गया: <strong class="text-on-surface">${d.paidSoFarFormatted}</strong> (दिन ${d.dayNumber})</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-outline-variant"></span>
                <span class="font-label text-label-sm">शेष: <strong class="text-on-surface">${d.remainingFormatted}</strong> (${d.remainingDays} दिन)</span>
              </div>
            </div>
          </div>

          <!-- Tomorrow's Projection -->
          <div class="rounded-lg bg-surface-bright p-space-sm flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <span class="font-label text-label-md text-on-surface font-semibold flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[18px] text-secondary">wb_twilight</span>
                कल सुबह की सेटलमेंट कटौती (Morning Cut)
              </span>
              <span class="font-label text-label-md text-warning-amber font-bold">${d.dailyDeductionFormatted} / दिन</span>
            </div>

            <div class="grid grid-cols-3 gap-2 text-center pt-1">
              <div class="rounded bg-surface-container-low p-2 flex flex-col items-center">
                <span class="font-label text-label-sm text-on-surface-variant">अनुमानित QR बिक्री</span>
                <span class="font-label text-label-lg font-bold text-on-surface mt-0.5">${formatCurrency(d.tomorrowProjection.qrSales)}</span>
                <span class="font-body text-[10px] text-outline">QR Payments</span>
              </div>
              <div class="rounded bg-error-container/40 p-2 flex flex-col items-center text-on-error-container">
                <span class="font-label text-label-sm">लोन किस्त कट</span>
                <span class="font-label text-label-lg font-bold text-error mt-0.5">-${formatCurrency(d.tomorrowProjection.loanCut)}</span>
                <span class="font-body text-[10px] text-error">Auto Deduction</span>
              </div>
              <div class="rounded bg-whatsapp-green-tint p-2 flex flex-col items-center text-success-green">
                <span class="font-label text-label-sm">बैंक में जमा</span>
                <span class="font-label text-label-lg font-bold text-success-green mt-0.5">${formatCurrency(d.tomorrowProjection.netCredit)}</span>
                <span class="font-body text-[10px] text-success-green">${d.tomorrowProjection.creditTime}</span>
              </div>
            </div>

            <div class="flex items-center gap-2 px-2.5 py-1.5 rounded bg-surface-container text-primary">
              <span class="material-symbols-outlined text-[18px] text-secondary">verified_user</span>
              <span class="font-label text-label-sm font-medium">दुकान बंद रहने या 0 बिक्री पर <strong>कोई पेनल्टी नहीं (Zero Penalty)</strong></span>
            </div>
          </div>
        </div>

        <!-- Today's Settlement Ledger -->
        <div class="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col gap-space-sm animate-fade-in stagger-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-2 h-5 rounded-full bg-whatsapp-green"></div>
              <div>
                <h2 class="font-headline text-headline-sm text-on-surface">आज का सेटलमेंट हिसाब</h2>
                <span class="font-label text-label-sm text-on-surface-variant">Today's Real-time Reconciled Ledger</span>
              </div>
            </div>
            <span class="font-label text-label-sm px-2 py-0.5 rounded-full bg-whatsapp-green-tint text-success-green font-bold flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">check</span> Settled
            </span>
          </div>

          <div class="divide-y divide-surface-container-low flex flex-col">
            <!-- QR Payments -->
            <div class="py-2.5 flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary">
                  <span class="material-symbols-outlined text-[18px]">qr_code_scanner</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-body text-body-md font-semibold text-on-surface">${d.todayLedger.qrPayments.label}</span>
                  <span class="font-body text-body-sm text-on-surface-variant">${d.todayLedger.qrPayments.sublabel}</span>
                </div>
              </div>
              <span class="font-label text-label-lg font-bold text-on-surface">${d.todayLedger.qrPayments.formatted}</span>
            </div>

            <!-- Loan Deduction -->
            <div class="py-2.5 flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary-container">
                  <span class="material-symbols-outlined text-[18px]">savings</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-body text-body-md font-semibold text-on-surface">${d.todayLedger.loanDeduction.label}</span>
                  <span class="font-body text-body-sm text-on-surface-variant">${d.todayLedger.loanDeduction.sublabel}</span>
                </div>
              </div>
              <span class="font-label text-label-lg font-bold text-error">${d.todayLedger.loanDeduction.formatted}</span>
            </div>

            <!-- Net Credit -->
            <div class="py-2.5 flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-full bg-whatsapp-green-tint flex items-center justify-center text-success-green">
                  <span class="material-symbols-outlined text-[18px]">account_balance</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-body text-body-md font-bold text-on-surface">${d.todayLedger.netCredit.label}</span>
                  <span class="font-body text-body-sm text-success-green">${d.todayLedger.netCredit.sublabel}</span>
                </div>
              </div>
              <div class="text-right">
                <span class="font-label text-label-lg font-extrabold text-success-green">${d.todayLedger.netCredit.formatted}</span>
                <span class="block font-label text-label-sm text-outline">Ref: ${d.todayLedger.netCredit.ref}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- AI Credit Score Booster -->
        <div class="rounded-xl bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-low p-space-md shadow-sm flex flex-col gap-space-sm animate-fade-in stagger-3">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-secondary text-[24px]">smart_toy</span>
              <div class="flex flex-col">
                <h2 class="font-headline text-headline-sm text-primary">अगला बड़ा लोन ऑफर (AI Booster)</h2>
                <span class="font-label text-label-sm text-on-surface-variant">Next Pre-Approved Limit Upgrade</span>
              </div>
            </div>
            <span class="font-label text-label-sm bg-primary text-on-primary px-2 py-0.5 rounded-full font-bold">${d.nextUpgrade.timeframe}</span>
          </div>

          <div class="bg-primary-container text-on-primary rounded-lg p-3 flex items-center justify-between">
            <div>
              <span class="font-label text-label-sm text-primary-fixed uppercase tracking-wider">Target Limit</span>
              <span class="font-headline text-headline-md font-bold text-on-primary block mt-0.5">${d.nextUpgrade.targetAmount}</span>
            </div>
            <div class="w-10 h-10 rounded-full bg-whatsapp-green/20 flex items-center justify-center text-whatsapp-green">
              <span class="material-symbols-outlined text-[24px]">arrow_upward</span>
            </div>
          </div>

          <div class="space-y-2">
            ${d.nextUpgrade.tips.map(tip => `
              <div class="flex items-center gap-2.5 p-2 bg-surface-container-lowest rounded-lg">
                <span class="material-symbols-outlined text-secondary text-[18px] flex-shrink-0">${tip.icon}</span>
                <div class="min-w-0">
                  <span class="font-label text-label-md text-on-surface font-semibold block">${tip.text}</span>
                  <span class="font-body text-body-sm text-on-surface-variant">${tip.textHi}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- View Statement CTA -->
        <button class="w-full h-12 bg-surface-container text-primary rounded-xl flex items-center justify-center gap-2 font-label text-label-lg shadow-sm active:scale-[0.99] transition-transform animate-fade-in stagger-4" id="view-statement-btn">
          <span class="material-symbols-outlined text-[20px]">receipt_long</span>
          <span>पूरा लोन स्टेटमेंट देखें / View Full Statement</span>
        </button>

      </div>
    </main>
  `;

  setTimeout(() => initDisbursalListeners(), 50);
  return html;
}

function initDisbursalListeners() {
  // Soundbox
  const soundboxBtn = document.getElementById('disbursal-soundbox-btn');
  if (soundboxBtn) {
    soundboxBtn.addEventListener('click', () => {
      showToast('🔊 Soundbox: "पेटीएम पर ₹1,00,000 प्राप्त हुए"');
    });
  }

  // View statement
  const stmtBtn = document.getElementById('view-statement-btn');
  if (stmtBtn) {
    stmtBtn.addEventListener('click', () => {
      navigate('/loan-statement');
    });
  }
}
