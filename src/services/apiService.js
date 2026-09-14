// ========================================
// API Service — Simulated Backend
// ========================================

import { store, updateDashboard, updateLoan, updateCampaigns } from '../store/appState.js';
import { formatCurrency } from '../data/merchant.js';

const DELAY_MIN = 300;
const DELAY_MAX = 800;

function simulateDelay() {
  const ms = DELAY_MIN + Math.random() * (DELAY_MAX - DELAY_MIN);
  return new Promise(resolve => setTimeout(resolve, ms));
}

function success(data) {
  return { status: 'success', data, error: null };
}

function error(code, message, messageHi) {
  return { status: 'error', data: null, error: { code, message, messageHi } };
}

// ========================================
// Auth API
// ========================================

export async function sendOTP(phone) {
  await simulateDelay();
  if (!phone || phone.length < 10) {
    return error('INVALID_PHONE', 'Please enter a valid phone number', 'कृपया एक वैध फ़ोन नंबर दर्ज करें');
  }
  return success({ otpSent: true, phone, expiresIn: 300 });
}

export async function verifyOTP(phone, otp) {
  await simulateDelay();
  // Accept any 6-digit OTP for prototype, or specific codes
  if (otp === '123456' || otp === '000000' || (otp.length === 6 && /^\d{6}$/.test(otp))) {
    const token = 'sess_' + Date.now() + '_' + Math.random().toString(36).slice(2, 10);
    return success({
      verified: true,
      token,
      merchant: store.get('merchant'),
    });
  }
  return error('INVALID_OTP', 'Invalid OTP. Please try again.', 'गलत OTP। कृपया पुनः प्रयास करें।');
}

// ========================================
// Dashboard API
// ========================================

export async function fetchDashboardPulse() {
  await simulateDelay();
  const hour = new Date().getHours();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const daysHi = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
  const today = new Date().getDay();

  // Generate realistic revenue based on time of day
  const baseRevenue = 1200 + Math.floor(Math.random() * 800);
  const hourMultiplier = hour < 7 ? 0.1 : hour < 10 ? 0.4 : hour < 14 ? 0.7 : hour < 18 ? 0.85 : hour < 21 ? 0.95 : 1;
  const revenue = Math.floor(baseRevenue + (5000 * hourMultiplier) + Math.random() * 1000);
  const txnCount = Math.floor(8 + (35 * hourMultiplier) + Math.random() * 5);
  const avgBill = txnCount > 0 ? Math.floor(revenue / txnCount) : 0;

  const pulse = {
    revenue,
    revenueFormatted: formatCurrency(revenue),
    txnCount,
    avgBill,
    avgBillFormatted: formatCurrency(avgBill),
    trendPercent: Math.floor(8 + Math.random() * 12),
    trendDirection: Math.random() > 0.3 ? 'up' : 'down',
    lastPaymentAmount: 80 + Math.floor(Math.random() * 200),
    lastPaymentTime: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    dayOfWeek: days[today],
    dayOfWeekHi: daysHi[today],
    isLoading: false,
    lastRefreshedAt: new Date().toISOString(),
  };

  updateDashboard(pulse);
  return success(pulse);
}

export async function fetchAIInsights() {
  await simulateDelay();
  const hour = new Date().getHours();
  const insights = [];

  if (hour >= 12 && hour <= 17) {
    insights.push({
      id: 'footfall_drop',
      type: 'FOOTFALL_ALERT',
      severity: 'warning',
      title: 'Afternoon Footfall Drop Warning (दोपहर की मंदी)',
      titleHi: 'दोपहर की मंदी चेतावनी',
      description: `Last 3 ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}s your store footfall dropped by`,
      highlightValue: '32% after 2:00 PM',
      icon: 'trending_down',
      actionLabel: 'Send Win-back Offer',
      dismissed: false,
    });
  }

  insights.push({
    id: 'winback_' + Date.now(),
    type: 'WINBACK_CAMPAIGN',
    severity: 'opportunity',
    title: 'AI Re-engagement Formula',
    titleHi: 'AI पुनः जुड़ाव फ़ॉर्मूला',
    lapsedCustomers: 38 + Math.floor(Math.random() * 10),
    product: 'milk & daily groceries',
    productHi: 'दूध एवं दैनिक किराना',
    voucherAmount: 20,
    voucherExpiry: '6 PM',
    estimatedUplift: 2800 + Math.floor(Math.random() * 800),
    couponCode: 'SHARMA' + (15 + Math.floor(Math.random() * 10)),
    dismissed: false,
  });

  return success(insights);
}

// ========================================
// Campaign API
// ========================================

export async function fetchCampaigns() {
  await simulateDelay();
  const campaigns = store.get('campaigns');
  return success(campaigns);
}

export async function approveCampaign(campaignId, customerCount) {
  await simulateDelay();
  const count = customerCount || 42;

  const campaign = {
    id: campaignId || 'camp_' + Date.now(),
    name: 'AI Win-back Campaign',
    status: 'SENT',
    sentAt: new Date().toISOString(),
    targetCount: count,
    sentCount: count,
    deliveredCount: Math.floor(count * 0.95),
    readCount: Math.floor(count * 0.89),
    redeemedCount: Math.floor(count * 0.43),
    revenue: 3200 + Math.floor(Math.random() * 1500),
    roi: (12 + Math.random() * 5).toFixed(1) + 'x',
  };

  const current = store.get('campaigns');
  store.set('campaigns', {
    ...current,
    active: [...(current.active || []), campaign],
    stats: {
      ...current.stats,
      totalSent: (current.stats?.totalSent || 0) + count,
      totalRevenue: (current.stats?.totalRevenue || 0) + campaign.revenue,
      roi: campaign.roi,
    },
  });

  return success(campaign);
}

export async function sendTestPing() {
  await simulateDelay();
  return success({ sent: true, phone: '+91 98765 43210', timestamp: new Date().toISOString() });
}

// ========================================
// Loan API
// ========================================

export async function fetchLoanEligibility() {
  await simulateDelay();
  const loan = store.get('loan');
  return success(loan.eligibility);
}

export async function calculateLoanTerms(amount, tenureDays) {
  await simulateDelay();
  const monthlyRate = 1.2;
  const months = tenureDays / 30;
  const totalInterest = Math.round(amount * (monthlyRate / 100) * months);
  const totalRepayable = amount + totalInterest;
  const dailyDeduction = Math.round(totalRepayable / tenureDays);

  return success({
    amount,
    tenure: tenureDays,
    totalInterest,
    totalRepayable,
    dailyDeduction,
    interestRate: monthlyRate,
    processingFee: 0,
    months: Math.round(months),
  });
}

export async function applyForLoan(amount, tenureDays) {
  // Simulate multi-step processing
  await new Promise(r => setTimeout(r, 1500));

  const terms = (await calculateLoanTerms(amount, tenureDays)).data;
  const loanNumber = '#PL-' + (80000 + Math.floor(Math.random() * 20000)) + '-KIRANA';
  const utrRef = 'PAYTM' + Date.now().toString().slice(-10);

  const activeLoan = {
    loanNumber,
    nbfcPartner: 'Clix Capital',
    amount,
    amountFormatted: formatCurrency(amount),
    totalPayable: terms.totalRepayable,
    totalPayableFormatted: formatCurrency(terms.totalRepayable),
    dailyDeduction: terms.dailyDeduction,
    dailyDeductionFormatted: formatCurrency(terms.dailyDeduction),
    tenure: tenureDays,
    interestRate: terms.interestRate,
    utrRef,
    bankName: 'State Bank of India',
    bankShort: 'SBI',
    accountEnding: '4821',
    accountHolder: 'राजेश शर्मा',
    disbursedAt: new Date().toISOString(),
    status: 'ACTIVE',
    dayNumber: 1,
    paidAmount: terms.dailyDeduction,
    remainingAmount: terms.totalRepayable - terms.dailyDeduction,
    remainingDays: tenureDays - 1,
    progressPercent: ((1 / tenureDays) * 100).toFixed(1),
  };

  store.update('loan', {
    status: 'ACTIVE',
    active: activeLoan,
    application: terms,
    statement: generateLoanStatement(activeLoan),
  });

  return success(activeLoan);
}

export function generateLoanStatement(loan) {
  const entries = [];
  const startDate = new Date(loan.disbursedAt || Date.now());
  const daysToGenerate = Math.min(loan.dayNumber || 30, 60);

  for (let i = daysToGenerate; i >= 1; i--) {
    const date = new Date(startDate);
    date.setDate(date.getDate() - (daysToGenerate - i));
    const dayOfWeek = date.getDay();
    const isSunday = dayOfWeek === 0;
    const isToday = i === daysToGenerate;

    if (isToday && i < daysToGenerate) {
      entries.push({
        day: i + 1,
        date: formatDateHi(new Date(date.getTime() + 86400000)),
        status: 'scheduled',
        statusLabel: 'शिड्यूल्ड (Scheduled)',
        amount: formatCurrency(loan.dailyDeduction),
        amountLabel: 'अनुमानित कटौती',
        title: `Day ${i + 1} आगामी दैनिक रिकवरी`,
        description: 'सुबह 7:00 AM सेटलमेंट से कटेगी',
        source: 'अपेक्षित स्रोत: कल की UPI QR बिक्री',
        autoStatus: 'ऑटो-पेमेंट ऑन',
      });
    }

    if (isSunday) {
      entries.push({
        day: i,
        date: formatDateHi(date) + ' (Sunday)',
        status: 'skipped',
        statusLabel: 'दुकान बंद (Zero Sales)',
        amount: '₹0',
        title: `Day ${i} • रविवार छुट्टी — शून्य बिक्री`,
        description: 'कोई QR पेमेंट नहीं • कोई पेनल्टी नहीं लगी',
      });
    } else {
      const qrSales = 2500 + Math.floor(Math.random() * 4000);
      const deduction = loan.dailyDeduction;
      const netCredit = qrSales - deduction;
      entries.push({
        day: i,
        date: formatDateHi(date),
        status: 'success',
        statusLabel: '✓ सफल (Recovered)',
        amount: formatCurrency(deduction),
        title: `Day ${i} • दैनिक रिकवरी पूर्ण`,
        qrSales: formatCurrency(qrSales),
        deduction: '-' + formatCurrency(deduction),
        netCredit: formatCurrency(netCredit),
        creditTime: 'SBI IMPS 7:0' + Math.floor(Math.random() * 6) + ' AM',
        impsRef: 'SBIN00' + (3000 + i),
      });
    }
  }

  return entries;
}

function formatDateHi(date) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// ========================================
// Settlement API
// ========================================

export async function fetchTodaySettlement() {
  await simulateDelay();
  const dashboard = store.get('dashboard');
  const loan = store.get('loan');
  const deduction = loan.active?.dailyDeduction || 596;
  const qrRevenue = dashboard.revenue || 4820;

  return success({
    qrPayments: {
      label: `कुल QR पेमेंट (${dashboard.txnCount || 38} ग्राहक)`,
      sublabel: 'Gross Soundbox Inflow',
      amount: qrRevenue,
      formatted: '+' + formatCurrency(qrRevenue),
    },
    loanDeduction: {
      label: `दैनिक लोन किस्त (Day ${loan.active?.dayNumber || 1})`,
      sublabel: 'Daily Loan Recovery',
      amount: deduction,
      formatted: '-' + formatCurrency(deduction),
    },
    netCredit: {
      label: 'SBI खाते में सीधे क्रेडिट',
      sublabel: 'IMPS 7:05 AM पर सफल',
      amount: Math.max(0, qrRevenue - deduction),
      formatted: '+' + formatCurrency(Math.max(0, qrRevenue - deduction)),
      ref: 'SBIN00' + (2900 + Math.floor(Math.random() * 200)),
    },
  });
}

// ========================================
// Inventory API
// ========================================

export async function fetchStockAlerts() {
  await simulateDelay();
  return success([
    {
      id: 'stock_1',
      name: 'Mustard Oil (फॉर्च्यून तेल 1L)',
      status: 'Low Stock',
      supplier: 'Agarwal Wholesale (Sadar)',
      projectedRunOut: 'Friday evening rush',
      resolved: false,
    },
    {
      id: 'stock_2',
      name: 'Chakki Atta (10kg)',
      status: 'Low Stock',
      supplier: 'Agarwal Wholesale (Sadar)',
      projectedRunOut: 'Friday evening rush',
      resolved: false,
    },
  ]);
}

export async function placeStockOrder(alertId) {
  await simulateDelay();
  return success({ ordered: true, alertId, via: 'WhatsApp Bot', supplier: 'Agarwal Wholesale' });
}
