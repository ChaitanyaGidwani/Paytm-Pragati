// ========================================
// Loan Statement View (Production)
// ========================================

import { renderHeader } from '../components/header.js';
import { showToast } from '../components/toast.js';
import { store } from '../store/appState.js';
import { formatCurrency } from '../data/merchant.js';
import { generateLoanStatement } from '../services/apiService.js';
import { navigate } from '../router.js';

export function renderLoanStatement() {
  const loan = store.get('loan');
  const active = loan.active;

  // If no active loan, redirect
  if (!active) {
    setTimeout(() => navigate('/loans'), 10);
    return '<div class="flex items-center justify-center h-screen"><span class="material-symbols-outlined text-primary text-[32px] animate-spin">progress_activity</span></div>';
  }

  const statement = loan.statement || generateLoanStatement(active);
  const successCount = statement.filter(e => e.status === 'success').length;
  const skippedCount = statement.filter(e => e.status === 'skipped').length;

  const html = `
    ${renderHeader('light', 'Loan Statement')}
    <main class="flex flex-col relative w-full pt-20 pb-safe bg-paytm-surface min-h-screen">
      <div class="flex flex-col w-full pb-24">

        <!-- Repayment Progress -->
        <section class="px-margin-mobile py-space-md animate-fade-in">
          <div class="rounded-xl bg-white p-space-md shadow-md">
            <div class="flex items-center justify-between mb-space-sm">
              <div>
                <span class="font-label text-label-md text-on-surface-variant block">Loan Passbook / लोन पासबुक</span>
                <span class="font-headline text-headline-sm text-primary">${active.loanNumber}</span>
              </div>
              <span class="inline-flex items-center gap-1 bg-success-green/10 text-success-green font-label text-label-sm px-2 py-0.5 rounded-full font-semibold">
                <span class="material-symbols-outlined text-[12px]">check_circle</span>
                ${active.status}
              </span>
            </div>

            <!-- Progress Bar -->
            <div class="bg-surface-container-low rounded-lg p-3 mb-space-sm">
              <div class="flex items-center justify-between mb-1.5">
                <span class="font-label text-label-sm text-on-surface-variant">Repayment Progress</span>
                <span class="font-label text-label-md text-primary font-bold">${active.progressPercent || '0.6'}%</span>
              </div>
              <div class="bg-surface-container h-3 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-700 animate-progress-fill" style="width: ${Math.min(100, parseFloat(active.progressPercent || 0.6))}%;"></div>
              </div>
              <div class="grid grid-cols-3 gap-2 mt-space-sm text-center">
                <div>
                  <span class="font-headline text-headline-sm text-primary block">${formatCurrency(active.paidAmount || active.dailyDeduction)}</span>
                  <span class="text-[10px] text-on-surface-variant font-label">Paid</span>
                </div>
                <div>
                  <span class="font-headline text-headline-sm text-on-surface block">${formatCurrency(active.remainingAmount || (active.totalPayable - active.dailyDeduction))}</span>
                  <span class="text-[10px] text-on-surface-variant font-label">Remaining</span>
                </div>
                <div>
                  <span class="font-headline text-headline-sm text-secondary block">${active.remainingDays || (active.tenure - 1)} days</span>
                  <span class="text-[10px] text-on-surface-variant font-label">Remaining</span>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="flex gap-2">
              <button class="flex-1 flex items-center justify-center gap-1 bg-surface-container-low text-primary py-2 rounded-lg font-label text-label-md active:scale-95 transition-transform" id="prepay-btn">
                <span class="material-symbols-outlined text-[18px]">speed</span>
                Prepay
              </button>
              <button class="flex-1 flex items-center justify-center gap-1 bg-surface-container-low text-primary py-2 rounded-lg font-label text-label-md active:scale-95 transition-transform" id="download-statement-btn">
                <span class="material-symbols-outlined text-[18px]">download</span>
                Download
              </button>
            </div>
          </div>
        </section>

        <!-- Filter Pills -->
        <section class="px-margin-mobile mb-space-sm">
          <div class="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <button class="filter-pill inline-flex items-center gap-1 px-3 py-1.5 rounded-full font-label text-label-sm whitespace-nowrap border-2 border-primary bg-primary/5 text-primary font-bold" data-filter="all">All Entries</button>
            <button class="filter-pill inline-flex items-center gap-1 px-3 py-1.5 rounded-full font-label text-label-sm whitespace-nowrap border border-outline-variant/30 text-on-surface-variant" data-filter="success">
              <span class="w-2 h-2 rounded-full bg-success-green"></span>
              Recovered (${successCount})
            </button>
            <button class="filter-pill inline-flex items-center gap-1 px-3 py-1.5 rounded-full font-label text-label-sm whitespace-nowrap border border-outline-variant/30 text-on-surface-variant" data-filter="skipped">
              <span class="w-2 h-2 rounded-full bg-outline-variant"></span>
              Skipped (${skippedCount})
            </button>
            <button class="filter-pill inline-flex items-center gap-1 px-3 py-1.5 rounded-full font-label text-label-sm whitespace-nowrap border border-outline-variant/30 text-on-surface-variant" data-filter="scheduled">
              <span class="w-2 h-2 rounded-full bg-secondary"></span>
              Upcoming
            </button>
          </div>
        </section>

        <!-- Timeline -->
        <section class="px-margin-mobile mb-space-md" id="statement-timeline">
          <div class="space-y-2">
            ${statement.map((entry, i) => renderTimelineEntry(entry, i)).join('')}
          </div>
        </section>
      </div>
    </main>
  `;

  setTimeout(() => initStatementListeners(statement), 50);
  return html;
}

function renderTimelineEntry(entry, index) {
  const statusColors = {
    success: 'bg-success-green',
    skipped: 'bg-outline-variant',
    scheduled: 'bg-secondary',
    partial: 'bg-warning-amber',
  };

  const statusBg = {
    success: 'bg-success-green/5',
    skipped: 'bg-surface-container-low',
    scheduled: 'bg-secondary-container/20',
  };

  const dotColor = statusColors[entry.status] || 'bg-outline-variant';
  const cardBg = statusBg[entry.status] || 'bg-white';

  return `
    <div class="timeline-entry rounded-xl ${cardBg} p-3 shadow-sm animate-fade-in" data-status="${entry.status}" style="animation-delay: ${Math.min(index * 0.03, 0.5)}s;">
      <div class="flex items-start gap-3">
        <!-- Timeline dot -->
        <div class="flex flex-col items-center flex-shrink-0 mt-1">
          <div class="w-3 h-3 rounded-full ${dotColor} shadow-sm"></div>
          ${index < 20 ? '<div class="w-px h-6 bg-surface-container-highest mt-1"></div>' : ''}
        </div>

        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0">
              <span class="font-label text-label-md text-primary block leading-tight">${entry.title}</span>
              <span class="font-body text-body-sm text-on-surface-variant">${entry.date}</span>
            </div>
            <div class="text-right flex-shrink-0">
              <span class="font-headline text-headline-sm ${entry.status === 'success' ? 'text-primary' : entry.status === 'skipped' ? 'text-outline-variant' : 'text-secondary'} font-bold block">${entry.amount}</span>
              <span class="text-[10px] ${entry.status === 'success' ? 'text-success-green' : 'text-on-surface-variant'} font-label">${entry.statusLabel}</span>
            </div>
          </div>

          ${entry.status === 'success' ? `
            <div class="mt-1.5 bg-white/80 rounded-lg p-2 text-[11px] text-on-surface-variant space-y-0.5">
              <div class="flex justify-between"><span>QR Sales:</span><span class="text-primary font-semibold">${entry.qrSales}</span></div>
              <div class="flex justify-between"><span>Deduction:</span><span class="text-error font-semibold">${entry.deduction}</span></div>
              <div class="flex justify-between"><span>Net Credit:</span><span class="text-success-green font-semibold">${entry.netCredit}</span></div>
              <div class="flex justify-between"><span>IMPS:</span><span class="text-secondary">${entry.creditTime}</span></div>
            </div>
          ` : ''}

          ${entry.status === 'skipped' ? `
            <p class="mt-1 font-body text-body-sm text-on-surface-variant italic">${entry.description}</p>
          ` : ''}

          ${entry.status === 'scheduled' ? `
            <p class="mt-1 font-body text-body-sm text-secondary">${entry.description || 'Upcoming scheduled deduction'}</p>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

function initStatementListeners(statement) {
  // Filter pills
  const filterPills = document.querySelectorAll('.filter-pill');
  const entries = document.querySelectorAll('.timeline-entry');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const filter = pill.dataset.filter;

      // Update pill styles
      filterPills.forEach(p => {
        p.classList.remove('border-primary', 'bg-primary/5', 'text-primary', 'font-bold', 'border-2');
        p.classList.add('border', 'border-outline-variant/30', 'text-on-surface-variant');
      });
      pill.classList.remove('border', 'border-outline-variant/30', 'text-on-surface-variant');
      pill.classList.add('border-2', 'border-primary', 'bg-primary/5', 'text-primary', 'font-bold');

      // Filter entries
      entries.forEach(entry => {
        if (filter === 'all' || entry.dataset.status === filter) {
          entry.style.display = '';
          entry.classList.add('animate-fade-in');
        } else {
          entry.style.display = 'none';
        }
      });
    });
  });

  // Prepay
  const prepayBtn = document.getElementById('prepay-btn');
  if (prepayBtn) {
    prepayBtn.addEventListener('click', () => {
      showToast('💰 Prepayment feature — contact your RM to process');
    });
  }

  // Download statement
  const downloadBtn = document.getElementById('download-statement-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      // Generate a simple text statement
      const loan = store.get('loan');
      const active = loan.active;
      let content = `PAYTM PRAGATI — LOAN STATEMENT\n`;
      content += `Loan: ${active.loanNumber}\n`;
      content += `Amount: ${formatCurrency(active.amount)}\n`;
      content += `Daily Deduction: ${formatCurrency(active.dailyDeduction)}\n`;
      content += `${'='.repeat(50)}\n\n`;

      statement.forEach(e => {
        content += `${e.date} | Day ${e.day} | ${e.amount} | ${e.statusLabel}\n`;
        if (e.qrSales) content += `  QR: ${e.qrSales} | Deduction: ${e.deduction} | Net: ${e.netCredit}\n`;
        content += '\n';
      });

      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Pragati_Statement_${active.loanNumber.replace(/[#\s]/g, '')}.txt`;
      a.click();
      URL.revokeObjectURL(url);

      showToast('📄 Statement downloaded!');
    });
  }
}
