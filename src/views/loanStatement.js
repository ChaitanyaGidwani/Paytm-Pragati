// ========================================
// Loan Statement & Daily Repayment View
// ========================================

import { renderHeader } from '../components/header.js';
import { showToast } from '../components/toast.js';
import { loanStatementData } from '../data/merchant.js';
import { navigate } from '../router.js';

export function renderLoanStatement() {
  const s = loanStatementData;

  function renderTimelineEntry(entry) {
    const statusColors = {
      success: { bg: 'bg-whatsapp-green-tint', text: 'text-success-green', icon: 'check_circle' },
      scheduled: { bg: 'bg-secondary-fixed', text: 'text-secondary', icon: 'schedule' },
      skipped: { bg: 'bg-surface-container-high', text: 'text-warning-amber', icon: 'block' },
    };
    const st = statusColors[entry.status] || statusColors.success;

    let detailHtml = '';
    if (entry.status === 'success') {
      detailHtml = `
        <div class="mt-2.5 pt-2 border-t border-surface-container-low">
          <div class="grid grid-cols-3 gap-2 text-center">
            <div class="rounded bg-surface-container-low p-1.5">
              <span class="font-label text-label-sm text-on-surface-variant block">QR बिक्री</span>
              <span class="font-label text-label-md font-bold text-on-surface">${entry.qrSales}</span>
            </div>
            <div class="rounded bg-error-container/30 p-1.5">
              <span class="font-label text-label-sm text-on-surface-variant block">कटौती</span>
              <span class="font-label text-label-md font-bold text-error">${entry.deduction}</span>
            </div>
            <div class="rounded bg-whatsapp-green-tint p-1.5">
              <span class="font-label text-label-sm text-on-surface-variant block">बैंक जमा</span>
              <span class="font-label text-label-md font-bold text-success-green">${entry.netCredit}</span>
            </div>
          </div>
          <div class="flex items-center justify-between mt-1.5 text-on-surface-variant">
            <span class="font-body text-body-sm">${entry.creditTime}</span>
            <span class="font-label text-label-sm text-outline">Ref: ${entry.impsRef}</span>
          </div>
        </div>
      `;
    } else if (entry.status === 'scheduled') {
      detailHtml = `
        <div class="mt-2.5 pt-2 bg-surface-container-low rounded-lg px-2.5 py-1.5 flex items-center justify-between">
          <span class="font-body text-body-sm text-on-surface-variant">${entry.source}</span>
          <span class="font-label text-label-sm font-bold text-primary">${entry.autoStatus}</span>
        </div>
      `;
    } else if (entry.status === 'skipped') {
      detailHtml = `
        <div class="mt-2 flex items-center gap-1.5 text-on-surface-variant">
          <span class="material-symbols-outlined text-[14px] text-warning-amber">info</span>
          <span class="font-body text-body-sm">${entry.description}</span>
        </div>
      `;
    }

    return `
      <article class="bg-paytm-card rounded-xl p-3.5 shadow-sm" data-status="${entry.status}">
        <div class="flex items-start justify-between gap-2">
          <div class="flex items-start gap-2.5 min-w-0">
            <div class="w-9 h-9 rounded-full ${st.bg} flex items-center justify-center ${st.text} shrink-0 mt-0.5">
              <span class="material-symbols-outlined text-[20px]">${st.icon}</span>
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="font-label text-label-lg font-bold text-on-surface">${entry.title}</span>
                <span class="px-2 py-0.5 rounded-full ${st.bg} ${st.text} font-label text-label-sm font-bold">
                  ${entry.statusLabel}
                </span>
              </div>
              <p class="font-body text-body-sm text-on-surface-variant mt-0.5">${entry.date}${entry.description && entry.status === 'scheduled' ? ' • ' + entry.description : ''}</p>
            </div>
          </div>
          <div class="text-right shrink-0">
            <span class="font-label text-label-lg font-bold ${st.text}">${entry.amount}</span>
            ${entry.amountLabel ? `<p class="font-label text-label-sm text-on-surface-variant">${entry.amountLabel}</p>` : ''}
          </div>
        </div>
        ${detailHtml}
      </article>
    `;
  }

  const html = `
    ${renderHeader('dark', 'Loans')}
    <main class="flex flex-col relative w-full pt-20 pb-safe bg-paytm-surface min-h-screen">
      <div class="flex flex-col w-full pb-16">

        <!-- Top Nav -->
        <div class="px-margin-mobile pt-3 pb-2 bg-paytm-surface animate-fade-in">
          <div class="flex items-center justify-between gap-space-sm mb-3">
            <div class="flex items-center gap-2 min-w-0">
              <button class="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary active:scale-95 transition-transform" id="stmt-back-btn">
                <span class="material-symbols-outlined text-[20px]">arrow_back</span>
              </button>
              <div class="min-w-0">
                <h1 class="font-headline text-headline-sm text-on-surface truncate tracking-tight">लोन पासबुक व स्टेटमेंट</h1>
                <p class="font-label text-label-sm text-on-surface-variant uppercase tracking-wide">Loan Passbook & Statement</p>
              </div>
            </div>
            <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-container text-on-primary shadow-sm hover:opacity-95 active:scale-95 transition-all text-left" id="download-stmt-btn">
              <span class="material-symbols-outlined text-[18px] text-secondary-container">download</span>
              <span class="font-label text-label-md font-bold">PDF / Excel</span>
            </button>
          </div>

          <!-- Filter Pills -->
          <div class="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            ${s.filters.map(f => `
              <button class="filter-pill px-3.5 py-1 rounded-full font-label text-label-md whitespace-nowrap transition-colors ${f.active ? 'bg-primary-container text-on-primary shadow-sm' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'}" data-filter="${f.id}">
                ${f.label}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="px-margin-mobile flex flex-col gap-3.5">

          <!-- Loan Overview Master Card -->
          <section class="rounded-xl bg-primary-container text-on-primary p-4 shadow-md relative overflow-hidden animate-fade-in stagger-1">
            <div class="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-secondary-container/10 blur-2xl pointer-events-none"></div>

            <div class="flex items-start justify-between gap-2 mb-3 relative z-10">
              <div>
                <div class="flex items-center gap-1.5">
                  <span class="font-label text-label-sm uppercase text-primary-fixed-dim tracking-wider font-bold">मर्चेंट बिजनेस लोन</span>
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-whatsapp-green-tint text-success-green font-label text-label-sm font-bold">
                    <span class="w-1.5 h-1.5 rounded-full bg-success-green animate-pulse"></span>
                    एक्टिव • Active
                  </span>
                </div>
                <div class="flex items-center gap-1.5 mt-0.5">
                  <p class="font-headline text-headline-sm font-bold text-on-primary tracking-wide">${s.loanId}</p>
                  <button class="text-primary-fixed-dim hover:text-on-primary transition-colors" id="copy-loan-id">
                    <span class="material-symbols-outlined text-[16px]">content_copy</span>
                  </button>
                </div>
                <p class="font-body text-body-sm text-primary-fixed-dim mt-0.5">पार्टनर NBFC: ${s.partnerNBFC} • SBI A/c •••• 4821</p>
              </div>
              <div class="text-right flex flex-col items-end">
                <span class="font-label text-label-sm text-primary-fixed">स्वीकृत लोन (Sanctioned)</span>
                <span class="font-headline text-headline-md font-bold text-on-primary">${s.sanctionedAmount}</span>
                <span class="font-label text-label-sm text-secondary-fixed-dim">कुल देय: ${s.totalPayable}</span>
              </div>
            </div>

            <!-- Progress -->
            <div class="bg-primary/50 rounded-lg p-3 backdrop-blur-sm relative z-10 mb-3">
              <div class="flex items-center justify-between mb-1.5">
                <div class="flex items-center gap-1.5">
                  <span class="font-label text-label-md font-bold text-whatsapp-green">${s.paidAmount} चुकाए गए</span>
                  <span class="font-label text-label-sm text-primary-fixed-dim">(Day ${s.paidDay}/${s.totalDays})</span>
                </div>
                <span class="font-label text-label-md font-bold text-secondary-container">${s.progressPercent}% पूर्ण</span>
              </div>
              <div class="w-full h-2.5 bg-tertiary-container rounded-full overflow-hidden p-0.5">
                <div class="h-full bg-gradient-to-r from-secondary-container to-whatsapp-green rounded-full animate-progress-fill" style="width: ${s.progressPercent}%;"></div>
              </div>
              <div class="flex items-center justify-between mt-2 font-body text-body-sm text-primary-fixed-dim">
                <span>${s.remainingAmount} शेष राशि</span>
                <span class="text-on-primary font-medium">${s.remainingDays} दिन शेष</span>
              </div>
            </div>

            <!-- 3 Metrics -->
            <div class="grid grid-cols-3 gap-2 text-center bg-white/5 rounded-lg py-2.5 px-1 relative z-10">
              <div class="flex flex-col">
                <span class="font-label text-label-sm text-primary-fixed-dim">दैनिक कटौती</span>
                <span class="font-label text-label-lg font-bold text-secondary-container">${s.dailyDeduction}<span class="text-[11px] font-normal text-primary-fixed-dim">/दिन</span></span>
              </div>
              <div class="flex flex-col border-x border-white/10">
                <span class="font-label text-label-sm text-primary-fixed-dim">मूलधन चुकाया</span>
                <span class="font-label text-label-lg font-bold text-on-primary">${s.principalPaid}</span>
              </div>
              <div class="flex flex-col">
                <span class="font-label text-label-sm text-primary-fixed-dim">ब्याज (Interest)</span>
                <span class="font-label text-label-lg font-bold text-on-primary">${s.interestPaid}</span>
              </div>
            </div>

            <!-- Prepay -->
            <div class="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between relative z-10">
              <div class="flex items-center gap-1 text-whatsapp-green font-label text-label-md font-semibold">
                <span class="material-symbols-outlined text-[16px]">verified</span>
                <span>0% फोरक्लोज़र शुल्क (No Preclosure Charge)</span>
              </div>
              <button class="inline-flex items-center gap-1 text-secondary-container hover:text-on-primary font-label text-label-md font-bold group" id="prepay-btn">
                <span>समय से पहले चुकाएं</span>
                <span class="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">chevron_right</span>
              </button>
            </div>
          </section>

          <!-- Month Picker -->
          <section class="bg-paytm-card rounded-xl p-3.5 shadow-sm animate-fade-in stagger-2">
            <div class="flex items-center justify-between">
              <button class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors" id="prev-month-btn">
                <span class="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <div class="text-center">
                <div class="flex items-center justify-center gap-1">
                  <span class="material-symbols-outlined text-[18px] text-primary">calendar_month</span>
                  <span class="font-headline text-headline-sm font-bold text-on-surface" id="month-label">${s.currentMonth}</span>
                </div>
                <p class="font-label text-label-sm text-on-surface-variant font-medium">
                  30 सेटलमेंट्स से कुल कटौती: <span class="text-primary font-bold">${s.monthTotal}</span>
                </p>
              </div>
              <button class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors" id="next-month-btn">
                <span class="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>

            <div class="mt-3 p-2.5 rounded-lg bg-surface-container-low flex items-start gap-2">
              <span class="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">info</span>
              <p class="font-body text-body-sm text-on-surface-variant leading-tight">
                दैनिक कटौती आपके QR पेमेंट्स से <span class="font-bold text-on-surface">सुबह 7:00 बजे सेटलमेंट</span> पर ऑटोमैटिक एडजस्ट होती है। दुकान बंद रहने या बिक्री न होने पर <span class="font-bold text-success-green">कोई बाउंस पेनल्टी नहीं लगती</span>।
              </p>
            </div>
          </section>

          <!-- Timeline -->
          <section class="flex flex-col gap-2 animate-fade-in stagger-3">
            <div class="flex items-center justify-between px-1">
              <h2 class="font-label text-label-lg font-bold text-on-surface flex items-center gap-1.5">
                <span>दैनिक कटौती व सेटलमेंट विवरण</span>
                <span class="font-label text-label-sm px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-semibold">नवंबर 2024</span>
              </h2>
              <span class="font-body text-body-sm text-on-surface-variant" id="timeline-count">${s.timeline.length} रिकॉर्ड्स प्रदर्शित</span>
            </div>

            <div class="flex flex-col gap-2.5" id="timeline-container">
              ${s.timeline.map(entry => renderTimelineEntry(entry)).join('')}
            </div>
          </section>

        </div>
      </div>
    </main>
  `;

  setTimeout(() => initStatementListeners(), 50);
  return html;
}

function initStatementListeners() {
  // Back button
  const backBtn = document.getElementById('stmt-back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => navigate('/disbursal'));
  }

  // Download
  const downloadBtn = document.getElementById('download-stmt-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      showToast('📄 Statement PDF downloading...');
    });
  }

  // Copy loan ID
  const copyBtn = document.getElementById('copy-loan-id');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard?.writeText(loanStatementData.loanId).catch(() => {});
      showToast('📋 Loan ID copied to clipboard');
    });
  }

  // Prepay
  const prepayBtn = document.getElementById('prepay-btn');
  if (prepayBtn) {
    prepayBtn.addEventListener('click', () => {
      showToast('💰 Prepayment option opening...');
    });
  }

  // Filter pills
  const filters = document.querySelectorAll('.filter-pill');
  filters.forEach(pill => {
    pill.addEventListener('click', () => {
      // Update active state
      filters.forEach(f => {
        f.classList.remove('bg-primary-container', 'text-on-primary', 'shadow-sm');
        f.classList.add('bg-surface-container', 'text-on-surface');
      });
      pill.classList.remove('bg-surface-container', 'text-on-surface');
      pill.classList.add('bg-primary-container', 'text-on-primary', 'shadow-sm');

      // Filter timeline
      const filterId = pill.dataset.filter;
      const entries = document.querySelectorAll('#timeline-container article');
      let visibleCount = 0;

      entries.forEach(entry => {
        const status = entry.dataset.status;
        const show = filterId === 'all' ||
          (filterId === 'paid' && status === 'success') ||
          (filterId === 'upcoming' && status === 'scheduled') ||
          (filterId === 'zero' && status === 'skipped');

        entry.style.display = show ? 'block' : 'none';
        if (show) visibleCount++;
      });

      const countEl = document.getElementById('timeline-count');
      if (countEl) countEl.textContent = `${visibleCount} रिकॉर्ड्स प्रदर्शित`;
    });
  });

  // Month navigation
  const months = ['अक्टूबर 2024 (October)', 'नवंबर 2024 (November)', 'दिसंबर 2024 (December)'];
  let currentMonthIndex = 1;
  const monthLabel = document.getElementById('month-label');
  const prevBtn = document.getElementById('prev-month-btn');
  const nextBtn = document.getElementById('next-month-btn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentMonthIndex = Math.max(0, currentMonthIndex - 1);
      if (monthLabel) monthLabel.textContent = months[currentMonthIndex];
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentMonthIndex = Math.min(months.length - 1, currentMonthIndex + 1);
      if (monthLabel) monthLabel.textContent = months[currentMonthIndex];
    });
  }
}
