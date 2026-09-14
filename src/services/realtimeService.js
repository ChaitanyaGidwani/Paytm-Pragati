// ========================================
// Real-time Simulation Service
// ========================================

import { store, updateDashboard } from '../store/appState.js';
import { showToast } from '../components/toast.js';
import { formatCurrency } from '../data/merchant.js';

let realtimeInterval = null;
let paymentInterval = null;

const paymentAmounts = [45, 65, 80, 95, 110, 120, 145, 150, 180, 200, 225, 250, 280, 320, 350, 400, 450, 520, 680, 750];
const paymentItems = [
  'दूध (Milk)', 'ब्रेड (Bread)', 'चावल (Rice)', 'आटा (Atta)', 'तेल (Oil)', 'चीनी (Sugar)',
  'चाय पत्ती (Tea)', 'बिस्कुट (Biscuits)', 'साबुन (Soap)', 'शैम्पू (Shampoo)',
  'टूथपेस्ट', 'नमकीन (Snacks)', 'कोल्ड ड्रिंक', 'मसाले (Spices)', 'दाल (Dal)',
];

export function startRealtimeUpdates() {
  if (realtimeInterval) return;

  // Simulate incoming payments every 30-90 seconds
  scheduleNextPayment();

  // Update dashboard metrics every 60s
  realtimeInterval = setInterval(() => {
    const dashboard = store.get('dashboard');
    if (dashboard && !dashboard.isLoading) {
      // Slight fluctuations in trend
      const trendShift = (Math.random() - 0.4) * 2;
      updateDashboard({
        trendPercent: Math.max(0, Math.min(30, (dashboard.trendPercent || 14) + trendShift)),
      });
    }
  }, 60000);
}

function scheduleNextPayment() {
  const delay = 30000 + Math.random() * 60000; // 30-90 seconds
  paymentInterval = setTimeout(() => {
    simulateIncomingPayment();
    scheduleNextPayment();
  }, delay);
}

function simulateIncomingPayment() {
  const auth = store.get('auth');
  if (!auth?.isAuthenticated) return;

  const amount = paymentAmounts[Math.floor(Math.random() * paymentAmounts.length)];
  const item = paymentItems[Math.floor(Math.random() * paymentItems.length)];
  const dashboard = store.get('dashboard');

  updateDashboard({
    revenue: (dashboard.revenue || 0) + amount,
    revenueFormatted: formatCurrency((dashboard.revenue || 0) + amount),
    txnCount: (dashboard.txnCount || 0) + 1,
    avgBill: Math.floor(((dashboard.revenue || 0) + amount) / ((dashboard.txnCount || 0) + 1)),
    lastPaymentAmount: amount,
    lastPaymentTime: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    lastPaymentItem: item,
  });

  // Show toast notification only if on dashboard
  const currentHash = window.location.hash.slice(1);
  if (currentHash === '/dashboard' || currentHash === '/' || currentHash === '') {
    // Update the announcement pill if it exists
    const announcementPill = document.getElementById('soundbox-announcement-text');
    if (announcementPill) {
      announcementPill.textContent = `"Paytm पर ${formatCurrency(amount)} प्राप्त हुए — ${item}"`;
    }
    const timeEl = document.getElementById('soundbox-announcement-time');
    if (timeEl) {
      timeEl.textContent = 'Just now';
    }

    // Update revenue display
    const revenueEl = document.getElementById('live-revenue-display');
    if (revenueEl) {
      animateCounter(revenueEl, dashboard.revenue || 0, (dashboard.revenue || 0) + amount);
    }

    // Update txn count
    const txnEl = document.getElementById('live-txn-count');
    if (txnEl) {
      txnEl.textContent = (dashboard.txnCount || 0) + 1;
    }

    // Update avg bill
    const avgEl = document.getElementById('live-avg-bill');
    if (avgEl) {
      avgEl.textContent = formatCurrency(Math.floor(((dashboard.revenue || 0) + amount) / ((dashboard.txnCount || 0) + 1)));
    }
  }
}

function animateCounter(el, from, to) {
  const duration = 600;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(from + (to - from) * eased);
    el.textContent = formatCurrency(current);
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

export function stopRealtimeUpdates() {
  if (realtimeInterval) {
    clearInterval(realtimeInterval);
    realtimeInterval = null;
  }
  if (paymentInterval) {
    clearTimeout(paymentInterval);
    paymentInterval = null;
  }
}
