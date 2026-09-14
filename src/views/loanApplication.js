// ========================================
// Loan Application View (Production)
// ========================================

import { renderHeader } from '../components/header.js';
import { showToast } from '../components/toast.js';
import { store } from '../store/appState.js';
import { calculateLoanTerms, applyForLoan } from '../services/apiService.js';
import { formatCurrency, calculateLoan } from '../data/merchant.js';
import { navigate } from '../router.js';

export function renderLoanApplication() {
  const merchant = store.get('merchant');
  const loan = store.get('loan');
  const eligibility = loan.eligibility;

  // If loan already active, redirect to statement
  if (loan.status === 'ACTIVE' && loan.active) {
    setTimeout(() => navigate('/disbursal'), 10);
    return '<div class="flex items-center justify-center h-screen"><span class="material-symbols-outlined text-primary text-[32px] animate-spin">progress_activity</span></div>';
  }

  const defaultAmount = 100000;
  const defaultTenure = 180;
  const defaultCalc = calculateLoan(defaultAmount, defaultTenure);

  const html = `
    ${renderHeader('light', 'Instant Loan')}
    <main class="flex flex-col relative w-full pt-20 pb-safe bg-paytm-surface min-h-screen">
      <div class="flex flex-col w-full pb-24">

        <!-- Credit Health Banner -->
        <section class="px-margin-mobile py-space-md animate-fade-in">
          <div class="rounded-xl bg-gradient-to-r from-[#002970] to-[#003d99] p-space-md relative overflow-hidden shadow-lg">
            <div class="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none"></div>
            <div class="flex items-start justify-between mb-space-sm relative z-10">
              <div>
                <span class="inline-flex items-center gap-1 bg-white/10 text-primary-fixed-dim px-2 py-0.5 rounded-full font-label text-label-sm">
                  <span class="material-symbols-outlined text-[14px]">psychology</span>
                  AI Credit Health Score
                </span>
                <div class="flex items-baseline gap-2 mt-1">
                  <span class="font-headline text-currency-display text-white tracking-tight">${eligibility.creditScore}</span>
                  <span class="font-label text-label-md text-primary-fixed-dim">/ ${eligibility.creditScoreMax}</span>
                </div>
              </div>
              <div class="flex flex-col items-end">
                <span class="inline-flex items-center gap-1 bg-success-green/20 text-success-green px-2 py-0.5 rounded-full font-label text-label-sm font-semibold">
                  <span class="material-symbols-outlined text-[14px]">verified</span>
                  ${eligibility.tier}
                </span>
                <span class="font-label text-label-sm text-primary-fixed mt-1">${eligibility.tierHi}</span>
              </div>
            </div>
            <!-- Score Bar -->
            <div class="bg-white/10 h-2.5 rounded-full overflow-hidden mt-1">
              <div class="h-full bg-gradient-to-r from-success-green to-whatsapp-green rounded-full animate-progress-fill" style="width: ${(eligibility.creditScore / eligibility.creditScoreMax * 100).toFixed(0)}%;"></div>
            </div>
            <!-- Underwriting Signals -->
            <div class="mt-space-sm grid grid-cols-3 gap-2">
              <div class="bg-white/8 rounded-lg p-2 border border-white/6 text-center">
                <span class="font-label text-label-sm text-primary-fixed-dim block">Active Days</span>
                <span class="font-label text-label-md text-white font-bold">92%</span>
              </div>
              <div class="bg-white/8 rounded-lg p-2 border border-white/6 text-center">
                <span class="font-label text-label-sm text-primary-fixed-dim block">Revenue ↑</span>
                <span class="font-label text-label-md text-whatsapp-green font-bold">Steady</span>
              </div>
              <div class="bg-white/8 rounded-lg p-2 border border-white/6 text-center">
                <span class="font-label text-label-sm text-primary-fixed-dim block">Disputes</span>
                <span class="font-label text-label-md text-white font-bold">0</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Loan Amount Slider -->
        <section class="px-margin-mobile mb-space-md animate-fade-in stagger-1">
          <div class="rounded-xl bg-white p-space-md shadow-md">
            <div class="flex items-center justify-between mb-space-xs">
              <h2 class="font-headline text-headline-sm text-primary">How much do you need?</h2>
              <span class="inline-flex items-center gap-1 bg-surface-container text-on-surface-variant font-label text-label-sm px-2 py-0.5 rounded-full">
                <span class="material-symbols-outlined text-[14px] text-success-green">lock</span>
                Pre-Approved
              </span>
            </div>

            <div class="text-center my-4">
              <span class="font-headline text-[36px] text-primary tracking-tight font-bold" id="loan-amount-display">${formatCurrency(defaultAmount)}</span>
              <span class="block font-label text-label-sm text-on-surface-variant mt-0.5">Max: ${formatCurrency(eligibility.maxAmount)}</span>
            </div>

            <input type="range" id="loan-slider" min="10000" max="${eligibility.maxAmount}" step="5000" value="${defaultAmount}" class="w-full mb-1" />

            <div class="flex justify-between font-label text-label-sm text-on-surface-variant mb-space-md">
              <span>₹10,000</span>
              <span>₹${(eligibility.maxAmount / 1000).toFixed(0)}K</span>
            </div>

            <!-- Tenure Selection -->
            <h3 class="font-label text-label-md text-primary font-semibold mb-space-sm">Repayment Tenure</h3>
            <div class="grid grid-cols-4 gap-2 mb-space-md" id="tenure-options">
              <button class="tenure-btn py-2.5 rounded-lg text-center border-2 font-label text-label-md transition-all border-outline-variant/30 text-on-surface-variant hover:border-primary/30" data-tenure="90">
                <span class="block font-bold">90</span>
                <span class="text-[10px]">days</span>
              </button>
              <button class="tenure-btn py-2.5 rounded-lg text-center border-2 font-label text-label-md transition-all border-primary bg-primary/5 text-primary font-bold" data-tenure="180">
                <span class="block font-bold">180</span>
                <span class="text-[10px]">days ⭐</span>
              </button>
              <button class="tenure-btn py-2.5 rounded-lg text-center border-2 font-label text-label-md transition-all border-outline-variant/30 text-on-surface-variant hover:border-primary/30" data-tenure="270">
                <span class="block font-bold">270</span>
                <span class="text-[10px]">days</span>
              </button>
              <button class="tenure-btn py-2.5 rounded-lg text-center border-2 font-label text-label-md transition-all border-outline-variant/30 text-on-surface-variant hover:border-primary/30" data-tenure="365">
                <span class="block font-bold">365</span>
                <span class="text-[10px]">days</span>
              </button>
            </div>

            <!-- Financial Breakdown -->
            <div class="bg-surface-container-low rounded-xl p-space-sm">
              <h3 class="font-label text-label-md text-primary font-semibold mb-space-xs flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px] text-secondary">calculate</span>
                Financial Breakdown
              </h3>
              <div class="space-y-2">
                <div class="flex justify-between items-center">
                  <span class="font-body text-body-sm text-on-surface-variant">Daily QR Morning Cut</span>
                  <span class="font-headline text-headline-sm text-primary font-bold" id="daily-deduction-display">${formatCurrency(defaultCalc.dailyDeduction)}/day</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="font-body text-body-sm text-on-surface-variant">Interest Rate</span>
                  <span class="font-label text-label-md text-primary">1.2% flat/month</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="font-body text-body-sm text-on-surface-variant">Total Repayable</span>
                  <span class="font-label text-label-md text-primary" id="total-repayable-display">${formatCurrency(defaultCalc.totalRepayable)}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="font-body text-body-sm text-on-surface-variant">Processing Fee</span>
                  <span class="font-label text-label-md text-success-green font-bold">₹0 (Waived)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Key Features -->
        <section class="px-margin-mobile mb-space-md animate-fade-in stagger-2">
          <div class="grid grid-cols-2 gap-space-sm">
            <div class="rounded-xl bg-white p-3 shadow-sm flex items-start gap-2 card-hover">
              <span class="material-symbols-outlined text-success-green text-[20px] flex-shrink-0 mt-0.5">event_available</span>
              <div>
                <span class="font-label text-label-md text-primary block font-semibold">Zero Penalty</span>
                <span class="font-body text-body-sm text-on-surface-variant">दुकान बंद होने पर कोई पेनल्टी नहीं</span>
              </div>
            </div>
            <div class="rounded-xl bg-white p-3 shadow-sm flex items-start gap-2 card-hover">
              <span class="material-symbols-outlined text-secondary text-[20px] flex-shrink-0 mt-0.5">auto_awesome</span>
              <div>
                <span class="font-label text-label-md text-primary block font-semibold">Auto Deduct</span>
                <span class="font-body text-body-sm text-on-surface-variant">Daily QR settlements से automatic</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Apply CTA -->
        <section class="px-margin-mobile mb-space-md animate-fade-in stagger-3">
          <div class="rounded-xl bg-white p-space-md shadow-md">
            <!-- T&C Checkbox -->
            <label class="flex items-start gap-2 mb-space-sm cursor-pointer" id="tnc-label">
              <input type="checkbox" id="tnc-checkbox" class="w-5 h-5 mt-0.5 rounded border-outline-variant text-primary accent-[#002970]" />
              <span class="font-body text-body-sm text-on-surface-variant leading-relaxed">
                मैं <span class="text-primary font-semibold cursor-pointer">Key Fact Statement (KFS)</span>, <span class="text-primary font-semibold cursor-pointer">Terms & Conditions</span> और <span class="text-primary font-semibold cursor-pointer">NBFC Lending Agreement (Clix Capital)</span> से सहमत हूँ
              </span>
            </label>

            <button
              id="apply-loan-btn"
              class="w-full h-14 rounded-xl bg-[#002970] text-white font-headline text-headline-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-40"
              disabled
            >
              <span class="material-symbols-outlined text-[22px]">account_balance</span>
              <span>Apply & Get Instant Disbursal</span>
            </button>

            <p class="text-center font-label text-label-sm text-on-surface-variant mt-2 flex items-center justify-center gap-1">
              <span class="material-symbols-outlined text-success-green text-[14px]">lock</span>
              Bank-grade 256-bit encrypted • NBFC Partner: Clix Capital
            </p>
          </div>
        </section>
      </div>
    </main>
  `;

  setTimeout(() => initLoanListeners(), 50);
  return html;
}

function initLoanListeners() {
  const slider = document.getElementById('loan-slider');
  const amountDisplay = document.getElementById('loan-amount-display');
  const dailyDisplay = document.getElementById('daily-deduction-display');
  const totalDisplay = document.getElementById('total-repayable-display');
  const tncCheckbox = document.getElementById('tnc-checkbox');
  const applyBtn = document.getElementById('apply-loan-btn');

  let selectedTenure = 180;
  let selectedAmount = 100000;

  // Slider
  if (slider) {
    slider.addEventListener('input', (e) => {
      selectedAmount = parseInt(e.target.value);
      updateCalculation();
      // Haptic feedback
      if (navigator.vibrate) navigator.vibrate(5);
    });
  }

  // Tenure buttons
  const tenureBtns = document.querySelectorAll('.tenure-btn');
  tenureBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tenureBtns.forEach(b => {
        b.classList.remove('border-primary', 'bg-primary/5', 'text-primary', 'font-bold');
        b.classList.add('border-outline-variant/30', 'text-on-surface-variant');
      });
      btn.classList.remove('border-outline-variant/30', 'text-on-surface-variant');
      btn.classList.add('border-primary', 'bg-primary/5', 'text-primary', 'font-bold');
      selectedTenure = parseInt(btn.dataset.tenure);
      updateCalculation();
    });
  });

  function updateCalculation() {
    const calc = calculateLoan(selectedAmount, selectedTenure);
    if (amountDisplay) amountDisplay.textContent = formatCurrency(selectedAmount);
    if (dailyDisplay) dailyDisplay.textContent = formatCurrency(calc.dailyDeduction) + '/day';
    if (totalDisplay) totalDisplay.textContent = formatCurrency(calc.totalRepayable);
  }

  // T&C checkbox
  if (tncCheckbox) {
    tncCheckbox.addEventListener('change', () => {
      applyBtn.disabled = !tncCheckbox.checked;
    });
  }

  // Apply button
  if (applyBtn) {
    applyBtn.addEventListener('click', async () => {
      if (!tncCheckbox.checked) {
        showToast('⚠️ Please accept Terms & Conditions');
        return;
      }

      applyBtn.disabled = true;

      // Multi-step processing animation
      const steps = [
        { text: 'Verifying KYC...', icon: 'verified_user', delay: 800 },
        { text: 'NBFC Sanction Check...', icon: 'account_balance', delay: 1000 },
        { text: 'Disbursing to SBI...', icon: 'payments', delay: 1200 },
      ];

      for (const step of steps) {
        applyBtn.innerHTML = `<span class="material-symbols-outlined text-[20px] animate-spin">progress_activity</span> ${step.text}`;
        await new Promise(r => setTimeout(r, step.delay));
      }

      const result = await applyForLoan(selectedAmount, selectedTenure);

      if (result.status === 'success') {
        applyBtn.classList.remove('bg-[#002970]');
        applyBtn.classList.add('bg-success-green');
        applyBtn.innerHTML = '<span class="material-symbols-outlined text-[22px]">check_circle</span> ₹' + selectedAmount.toLocaleString('en-IN') + ' Disbursed!';

        showToast('🎉 Loan disbursed successfully to your SBI account!');
        if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 100]);

        // Navigate to disbursal after short delay
        setTimeout(() => navigate('/disbursal'), 1500);
      }
    });
  }
}
