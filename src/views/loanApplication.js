// ========================================
// Loan Application View
// ========================================

import { renderHeader } from '../components/header.js';
import { showToast } from '../components/toast.js';
import { loanData, calculateLoan, formatCurrency } from '../data/merchant.js';
import { navigate } from '../router.js';

export function renderLoanApplication() {
  const d = loanData;
  const initial = calculateLoan(d.defaultAmount, d.defaultTenure);

  const html = `
    ${renderHeader('dark', 'Loans')}
    <main class="flex flex-col relative w-full pt-20 pb-safe bg-paytm-surface min-h-screen">
      <div class="flex flex-col w-full px-margin-mobile pb-space-xl space-y-space-md">

        <!-- Hero Banner -->
        <div class="bg-primary text-on-primary rounded-xl p-space-md relative overflow-hidden shadow-xl mt-space-sm animate-fade-in">
          <div class="absolute -right-12 -top-12 w-40 h-40 bg-secondary-container/20 rounded-full blur-2xl pointer-events-none"></div>
          <div class="flex items-center justify-between mb-space-xs">
            <span class="inline-flex items-center gap-1 bg-whatsapp-green text-on-primary px-2 py-0.5 rounded-full font-label text-label-sm font-bold">
              <span class="material-symbols-outlined text-[14px]">bolt</span>
              AI Pre-Approved in 60s
            </span>
            <span class="text-secondary-fixed font-label text-label-sm font-semibold">100% Paperless • 0 Collateral</span>
          </div>
          <div class="flex items-start justify-between gap-space-sm">
            <div>
              <h1 class="font-headline text-headline-lg-mobile text-on-primary tracking-tight">पेटीएम मर्चेंट आसान लोन</h1>
              <p class="font-body text-body-sm text-primary-fixed-dim">Instant AI Business Growth Capital</p>
            </div>
            <div class="w-11 h-11 rounded-full bg-surface-container-lowest/10 flex items-center justify-center flex-shrink-0">
              <span class="material-symbols-outlined text-secondary-container text-[26px]">account_balance_wallet</span>
            </div>
          </div>

          <!-- AI Credit Health -->
          <div class="mt-space-md bg-white/10 rounded-lg p-space-sm backdrop-blur-md">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-whatsapp-green/20 flex items-center justify-center text-whatsapp-green">
                  <span class="material-symbols-outlined text-[18px]">verified</span>
                </div>
                <div>
                  <div class="font-label text-label-md text-on-primary">AI Credit Health: <span class="text-whatsapp-green font-headline text-headline-sm">${d.creditScore}/${d.creditScoreMax}</span></div>
                  <div class="font-label text-label-sm text-primary-fixed-dim">Excellent Merchant Score (${d.creditTierHi})</div>
                </div>
              </div>
              <div class="text-right">
                <span class="inline-block px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label text-label-sm">${d.creditTier}</span>
              </div>
            </div>
            <div class="mt-2.5 pt-2 flex items-center gap-1.5 text-primary-fixed font-body text-body-sm">
              <span class="material-symbols-outlined text-[14px] text-secondary-container">query_stats</span>
              <span>Based on <strong>${d.dataPoints}</strong> in ${d.dataPeriod}</span>
            </div>
          </div>
        </div>

        <!-- Loan Amount Customizer -->
        <div class="bg-surface-container-lowest rounded-xl p-space-md shadow-md space-y-space-md animate-fade-in stagger-1">
          <div class="flex justify-between items-center">
            <div>
              <span class="font-label text-label-sm text-outline uppercase tracking-wider">Select Loan Amount</span>
              <h2 class="font-headline text-headline-sm text-on-surface">लोन राशि चुनें</h2>
            </div>
            <div class="text-right">
              <span class="font-label text-label-sm text-secondary font-bold bg-secondary-fixed/50 px-2 py-0.5 rounded-full">Max ${formatCurrency(d.maxAmount)}</span>
            </div>
          </div>

          <div class="bg-surface-container-low rounded-xl p-space-md text-center">
            <span class="font-label text-label-sm text-on-surface-variant block">Disbursal Request Amount</span>
            <div class="flex items-center justify-center gap-1 mt-1 text-primary-container">
              <span class="font-headline text-headline-md">₹</span>
              <span class="font-headline text-currency-display font-extrabold tracking-tight" id="loanAmountDisplay">${d.defaultAmount.toLocaleString('en-IN')}</span>
            </div>
            <p class="font-body text-body-sm text-success-green mt-1 font-semibold flex items-center justify-center gap-1">
              <span class="material-symbols-outlined text-[15px]">check_circle</span> 100% in your Bank A/C: No Hidden Deduction
            </p>
          </div>

          <!-- Range Slider -->
          <div class="space-y-2">
            <input type="range" id="loanSlider" min="${d.minAmount}" max="${d.maxAmount}" step="${d.step}" value="${d.defaultAmount}" class="w-full" />
            <div class="flex justify-between font-label text-label-sm text-on-surface-variant font-medium">
              <span>Min ${formatCurrency(d.minAmount)}</span>
              <span>${formatCurrency(d.maxAmount / 2)}</span>
              <span>Max ${formatCurrency(d.maxAmount)}</span>
            </div>
          </div>

          <!-- Quick Pills -->
          <div class="grid grid-cols-4 gap-2 pt-1">
            <button class="loan-chip py-2 px-1 rounded-lg text-center font-label text-label-md font-bold transition-all bg-surface-container text-on-surface hover:bg-surface-container-high" data-val="25000">₹25K</button>
            <button class="loan-chip py-2 px-1 rounded-lg text-center font-label text-label-md font-bold transition-all bg-surface-container text-on-surface hover:bg-surface-container-high" data-val="50000">₹50K</button>
            <button class="loan-chip active-chip py-2 px-1 rounded-lg text-center font-label text-label-md font-bold transition-all bg-primary-container text-on-primary shadow-sm" data-val="100000">₹1,00,000</button>
            <button class="loan-chip py-2 px-1 rounded-lg text-center font-label text-label-md font-bold transition-all bg-surface-container text-on-surface hover:bg-surface-container-high" data-val="150000">₹1.5 Lakh</button>
          </div>
        </div>

        <!-- Repayment Plan -->
        <div class="bg-surface-container-lowest rounded-xl p-space-md shadow-md space-y-space-md animate-fade-in stagger-2">
          <div class="flex items-center justify-between">
            <div>
              <span class="font-label text-label-sm text-outline uppercase tracking-wider">Kirana Friendly Settlement</span>
              <h3 class="font-headline text-headline-sm text-on-surface">Daily Auto-Deduct / रोज़ाना कटौती</h3>
            </div>
            <span class="p-2 bg-whatsapp-green-tint text-success-green rounded-full flex items-center justify-center">
              <span class="material-symbols-outlined text-[20px]">currency_rupee_circle</span>
            </span>
          </div>

          <div class="bg-whatsapp-green-tint rounded-xl p-space-md text-on-surface">
            <div class="flex justify-between items-baseline">
              <span class="font-label text-label-md text-success-green font-bold">Daily QR Morning Cut</span>
              <div class="text-right">
                <span class="font-headline text-headline-md font-extrabold text-success-green" id="dailyDeductDisplay">${formatCurrency(initial.dailyDeduction)}</span>
                <span class="font-body text-body-sm text-on-surface-variant block">/ day auto deducted</span>
              </div>
            </div>
            <p class="font-body text-body-sm text-on-surface mt-2 text-justify">
              दुकान के दैनिक QR पेमेंट सेटलमेंट से सुबह अपने-आप कटेगा। यदि किसी दिन दुकान बंद है या QR बिक्री नहीं हुई, तो आपके सेविंग्स खाते से कोई पेनल्टी नहीं कटेगी।
            </p>
          </div>

          <!-- Tenure Selector -->
          <div>
            <span class="font-label text-label-sm text-on-surface-variant block mb-2 font-semibold">चुने कितने दिनों में चुकाना है (Select Tenure)</span>
            <div class="grid grid-cols-2 gap-3">
              <button class="p-space-sm rounded-lg text-left transition-all bg-surface-container-high shadow-sm relative overflow-hidden" id="tenure180">
                <div class="flex items-center justify-between">
                  <span class="font-label text-label-lg font-bold text-primary-container">180 Days (6 माह)</span>
                  <span class="material-symbols-outlined text-[18px] text-primary-container" id="check180">check_circle</span>
                </div>
                <span class="font-body text-body-sm text-on-surface-variant block mt-0.5">Low total interest</span>
              </button>
              <button class="p-space-sm rounded-lg text-left transition-all bg-surface-container-low text-on-surface hover:bg-surface-container" id="tenure365">
                <div class="flex items-center justify-between">
                  <span class="font-label text-label-lg font-semibold text-on-surface">365 Days (1 साल)</span>
                  <span class="material-symbols-outlined text-[18px] text-outline" id="check365">radio_button_unchecked</span>
                </div>
                <span class="font-body text-body-sm text-on-surface-variant block mt-0.5">Smaller daily amount</span>
              </button>
            </div>
          </div>

          <!-- Financial Breakdown -->
          <div class="bg-surface-container-low rounded-lg p-space-sm space-y-2">
            <div class="flex justify-between items-center text-body-sm font-body">
              <span class="text-on-surface-variant">Net Disbursal in Bank</span>
              <span class="font-bold text-on-surface" id="netDisbursal">${formatCurrency(initial.amount)}</span>
            </div>
            <div class="flex justify-between items-center text-body-sm font-body">
              <span class="text-on-surface-variant">Processing Fee (Soundbox Offer)</span>
              <span class="font-bold text-success-green">FREE (₹0)</span>
            </div>
            <div class="flex justify-between items-center text-body-sm font-body">
              <span class="text-on-surface-variant">Monthly Interest Rate</span>
              <span class="font-bold text-on-surface">${d.interestRate}% flat per month</span>
            </div>
            <div class="flex justify-between items-center text-body-sm font-body pt-1 bg-surface-container-high/40 px-1 rounded">
              <span class="font-semibold text-on-surface">Total Repayable Amount</span>
              <span class="font-bold text-primary-container" id="totalRepayable">${formatCurrency(initial.totalRepayable)}</span>
            </div>
          </div>
        </div>

        <!-- AI Underwriting Transparency -->
        <div class="bg-surface-container-lowest rounded-xl p-space-md shadow-md space-y-space-md animate-fade-in stagger-3">
          <div class="flex items-start justify-between">
            <div>
              <div class="flex items-center gap-1.5 text-primary font-bold">
                <span class="material-symbols-outlined text-[20px] text-secondary-container">psychology</span>
                <h3 class="font-headline text-headline-sm">आपका AI लोन अप्रूवल क्यों हुआ?</h3>
              </div>
              <p class="font-body text-body-sm text-on-surface-variant mt-0.5">Full transparency: How Paytm AI calculated your eligibility</p>
            </div>
          </div>
          <div class="space-y-2">
            ${d.underwritingSignals.map(signal => `
              <div class="flex items-center gap-3 p-space-sm bg-surface-container-low rounded-lg">
                <div class="w-7 h-7 rounded-full bg-whatsapp-green text-on-primary flex items-center justify-center flex-shrink-0">
                  <span class="material-symbols-outlined text-[16px]">${signal.icon}</span>
                </div>
                <div class="min-w-0 flex-1">
                  <div class="font-label text-label-md font-bold text-on-surface">${signal.title}</div>
                  <div class="font-body text-body-sm text-on-surface-variant truncate">${signal.description}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Apply CTA -->
        <button class="w-full h-14 bg-primary-container text-on-primary rounded-xl flex items-center justify-center gap-2 font-headline text-headline-sm shadow-lg active:scale-[0.99] transition-transform animate-fade-in stagger-4" id="apply-loan-btn">
          <span class="material-symbols-outlined text-[24px]">account_balance_wallet</span>
          <span>बैंक अकाउंट में पाएं — Apply Now</span>
        </button>

      </div>
    </main>
  `;

  setTimeout(() => initLoanListeners(), 50);
  return html;
}

function initLoanListeners() {
  let currentAmount = loanData.defaultAmount;
  let currentTenure = loanData.defaultTenure;

  const slider = document.getElementById('loanSlider');
  const amountDisplay = document.getElementById('loanAmountDisplay');
  const dailyDisplay = document.getElementById('dailyDeductDisplay');
  const netDisplay = document.getElementById('netDisbursal');
  const totalDisplay = document.getElementById('totalRepayable');

  function updateUI() {
    const calc = calculateLoan(currentAmount, currentTenure);
    if (amountDisplay) amountDisplay.textContent = currentAmount.toLocaleString('en-IN');
    if (dailyDisplay) dailyDisplay.textContent = formatCurrency(calc.dailyDeduction);
    if (netDisplay) netDisplay.textContent = formatCurrency(calc.amount);
    if (totalDisplay) totalDisplay.textContent = formatCurrency(calc.totalRepayable);

    // Update pill active state
    document.querySelectorAll('.loan-chip').forEach(chip => {
      const val = parseInt(chip.dataset.val);
      if (val === currentAmount) {
        chip.classList.remove('bg-surface-container', 'text-on-surface');
        chip.classList.add('bg-primary-container', 'text-on-primary', 'shadow-sm');
      } else {
        chip.classList.remove('bg-primary-container', 'text-on-primary', 'shadow-sm');
        chip.classList.add('bg-surface-container', 'text-on-surface');
      }
    });
  }

  // Slider
  if (slider) {
    slider.addEventListener('input', (e) => {
      currentAmount = parseInt(e.target.value);
      updateUI();
    });
  }

  // Pill buttons
  document.querySelectorAll('.loan-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      currentAmount = parseInt(chip.dataset.val);
      if (slider) slider.value = currentAmount;
      updateUI();
    });
  });

  // Tenure buttons
  const tenure180 = document.getElementById('tenure180');
  const tenure365 = document.getElementById('tenure365');
  const check180 = document.getElementById('check180');
  const check365 = document.getElementById('check365');

  function setTenure(days) {
    currentTenure = days;
    if (days === 180) {
      tenure180?.classList.add('bg-surface-container-high', 'shadow-sm');
      tenure180?.classList.remove('bg-surface-container-low');
      tenure365?.classList.add('bg-surface-container-low');
      tenure365?.classList.remove('bg-surface-container-high', 'shadow-sm');
      if (check180) check180.textContent = 'check_circle';
      if (check180) check180.classList.add('text-primary-container');
      if (check180) check180.classList.remove('text-outline');
      if (check365) check365.textContent = 'radio_button_unchecked';
      if (check365) check365.classList.add('text-outline');
      if (check365) check365.classList.remove('text-primary-container');
    } else {
      tenure365?.classList.add('bg-surface-container-high', 'shadow-sm');
      tenure365?.classList.remove('bg-surface-container-low');
      tenure180?.classList.add('bg-surface-container-low');
      tenure180?.classList.remove('bg-surface-container-high', 'shadow-sm');
      if (check365) check365.textContent = 'check_circle';
      if (check365) check365.classList.add('text-primary-container');
      if (check365) check365.classList.remove('text-outline');
      if (check180) check180.textContent = 'radio_button_unchecked';
      if (check180) check180.classList.add('text-outline');
      if (check180) check180.classList.remove('text-primary-container');
    }
    updateUI();
  }

  if (tenure180) tenure180.addEventListener('click', () => setTenure(180));
  if (tenure365) tenure365.addEventListener('click', () => setTenure(365));

  // Apply button
  const applyBtn = document.getElementById('apply-loan-btn');
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      applyBtn.disabled = true;
      applyBtn.innerHTML = '<span class="material-symbols-outlined text-[22px] animate-spin">refresh</span> Processing AI Approval...';
      setTimeout(() => {
        showToast('🎉 Loan Approved! ₹1,00,000 disbursed to SBI A/C');
        navigate('/disbursal');
      }, 1500);
    });
  }
}
