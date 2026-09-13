// ========================================
// Mock Merchant Data Engine
// ========================================

export const merchantProfile = {
  name: 'राजेश शर्मा',
  nameEn: 'Rajesh Sharma',
  storeName: 'Sharma Kirana & General Store',
  storeNameHi: 'शर्मा किराना एंड जनरल स्टोर',
  category: 'Kirana',
  phone: '+91 98765 43210',
  bankName: 'State Bank of India',
  bankShort: 'SBI',
  accountEnding: '4821',
  soundboxActive: true,
  shopOpenSince: '7:30 AM',
  verified: true,
};

export const todaysPulse = {
  revenue: 4820,
  revenueFormatted: '₹4,820',
  trendPercent: 14,
  trendDirection: 'up',
  txnCount: 38,
  avgBill: 126,
  avgBillFormatted: '₹126',
  lastAnnouncement: '"Paytm पर ₹150 प्राप्त हुए"',
  lastAnnouncementTime: '3 min ago',
  dayOfWeek: 'मंगलवार',
  dayOfWeekEn: 'Tuesday',
  greeting: 'शुभ मंगलवार, राजेश जी',
  busyTag: 'Brisk Bazaar Hours',
};

export const aiRecommendations = {
  footfallAlert: {
    title: 'Tuesday Footfall Drop Warning (दोपहर की मंदी)',
    description: 'Last 3 Tuesdays your store footfall dropped by',
    highlightValue: '32% after 2:00 PM',
    icon: 'trending_down',
    severity: 'warning',
  },
  winBackCampaign: {
    title: 'AI Re-engagement Formula',
    lapsedCustomers: 42,
    product: 'milk & daily groceries',
    productHi: 'दूध एवं दैनिक किराना',
    voucherAmount: 20,
    voucherExpiry: '6 PM',
    estimatedUplift: 3200,
    estimatedUpliftFormatted: '+₹3,200 today',
    couponCode: 'SHARMA20',
    templateMessage: '🙏 नमस्ते! शर्मा किराना स्टोर से आज 1kg चीनी पर ₹20 की विशेष छूट।',
    templateFooter: 'दुकान पर दिखाएं या इसी चैट पर आर्डर लिखकर भेजें। तुरंत डिलीवरी उपलब्ध। 🚚',
  },
};

export const whatsappBotStats = {
  phone: '+91 98765 43210',
  customerCount: 412,
  customerCountFormatted: '412 ग्राहक',
  openRate: '89%',
  repeatOrders: '3.4x',
  autoBill: 'Enabled',
  apiStatus: 'Verified API',
  metaConnected: true,
  syncStatus: '24x7 Sync ON',
  autoReplyActive: true,
};

export const campaignResults = {
  lastCampaignName: 'Last Weekend Win-back Run',
  targets: 42,
  roi: '14.8x',
  directRevenue: 4350,
  directRevenueFormatted: '₹4,350',
  claimedCount: 18,
  claimedText: '18 ग्राहको ने कूपन रिडीम किया (Claimed)',
  funnel: {
    sent: { count: 42, percent: '100%', label: 'Sent' },
    read: { count: 39, percent: '93% Seen', label: 'Read Rate' },
    redeemed: { count: 18, percent: '43% Converted', label: 'Redeemed' },
  },
  customers: [
    { name: 'Sunita Gupta', phone: '•••• 7823', item: 'Atta + Ghee', amount: 340, time: 'Sat 3:40 PM', status: 'Redeemed' },
    { name: 'Meera Yadav', phone: '•••• 4210', item: 'Cooking Oil + Spices', amount: 280, time: 'Sat 5:10 PM', status: 'Redeemed' },
    { name: 'Rakesh Tiwari', phone: '•••• 9182', item: 'Milk + Bread', amount: 190, time: 'Sun 8:15 AM', status: 'Redeemed' },
  ],
};

export const loanData = {
  preApprovedAmount: 150000,
  preApprovedFormatted: '₹1,50,000',
  creditScore: 840,
  creditScoreMax: 900,
  creditTier: 'High Trust Tier',
  creditTierHi: 'उत्कृष्ट रिकॉर्ड',
  dataPoints: '3,420 QR & Soundbox collections (₹4.8L)',
  dataPeriod: 'last 90 days',
  minAmount: 10000,
  maxAmount: 150000,
  step: 5000,
  defaultAmount: 100000,
  interestRate: 1.2, // percent per month flat
  processingFee: 0,
  tenureOptions: [
    { days: 180, label: '180 Days (6 माह)', sublabel: 'Low total interest' },
    { days: 365, label: '365 Days (1 साल)', sublabel: 'Smaller daily amount' },
  ],
  defaultTenure: 180,
  underwritingSignals: [
    { title: '94% Daily Active Days', description: 'दुकान पर पिछले 90 दिनों में लगातार Paytm QR ग्राहक भुगतानों का रिकॉर्ड', icon: 'check' },
    { title: 'Ultra-Low Dispute Rate (0.1%)', description: 'शून्य चार्ज-बैक और भरोसेमंद ग्राहक संबंध', icon: 'check' },
    { title: 'Stable Soundbox Run Rate', description: 'औसत ₹1,400 - ₹2,200 प्रतिदिन का वास्तविक UPI वॉल्यूम', icon: 'check' },
  ],
};

export const disbursalData = {
  loanAmount: 100000,
  loanAmountFormatted: '₹1,00,000',
  utrRef: 'PAYTM93820194821',
  bankName: 'State Bank of India',
  bankShort: 'SBI',
  accountEnding: '4821',
  accountHolder: 'राजेश शर्मा',
  tenure: 180,
  totalRepayable: 107200,
  totalRepayableFormatted: '₹1,07,200',
  dailyDeduction: 596,
  dailyDeductionFormatted: '₹596',
  dayNumber: 1,
  paidSoFar: 596,
  paidSoFarFormatted: '₹596',
  remaining: 106604,
  remainingFormatted: '₹1,06,604',
  remainingDays: 179,
  progressPercent: 2.2,
  tomorrowProjection: {
    qrSales: 2800,
    loanCut: 596,
    netCredit: 2204,
    creditTime: 'सुबह 7:00 बजे',
  },
  todayLedger: {
    qrPayments: { label: 'कुल QR पेमेंट (38 ग्राहक)', sublabel: 'Gross Soundbox Inflow', amount: 4820, formatted: '+₹4,820.00' },
    loanDeduction: { label: 'दैनिक लोन किस्त (Day 1)', sublabel: 'Daily Loan Recovery', amount: 596, formatted: '-₹596.00' },
    netCredit: { label: 'SBI खाते में सीधे क्रेडिट', sublabel: 'IMPS 7:05 AM पर सफल', amount: 4224, formatted: '+₹4,224.00', ref: 'SBIN002931' },
  },
  nextUpgrade: {
    targetAmount: '₹2,50,000',
    timeframe: '60 दिन में',
    tips: [
      { icon: 'qr_code_scanner', text: 'Maintain daily QR volume above ₹1,500', textHi: '₹1,500 से ऊपर दैनिक QR वॉल्यूम रखें' },
      { icon: 'volume_up', text: 'Keep Soundbox ON for all transactions', textHi: 'सभी ट्रांजैक्शन के लिए साउंडबॉक्स ऑन रखें' },
      { icon: 'campaign', text: 'Run 2+ WhatsApp campaigns/month', textHi: 'हर माह 2+ WhatsApp कैम्पेन चलाएं' },
    ],
  },
};

export const loanStatementData = {
  loanId: '#PL-89324-KIRANA',
  partnerNBFC: 'Clix Capital',
  sanctionedAmount: '₹1,00,000',
  totalPayable: '₹1,07,200',
  paidAmount: '₹17,880',
  paidDay: 30,
  totalDays: 180,
  progressPercent: 16.7,
  remainingAmount: '₹89,320',
  remainingDays: 150,
  dailyDeduction: '₹596',
  principalPaid: '₹16,680',
  interestPaid: '₹1,200',
  currentMonth: 'नवंबर 2024 (November)',
  monthTotal: '₹17,880',
  filters: [
    { id: 'all', label: 'ऑल डेज़ (All)', active: true },
    { id: 'paid', label: 'सफल कटौती (Paid • 30)', active: false },
    { id: 'upcoming', label: 'पेंडिंग (Upcoming • 150)', active: false },
    { id: 'zero', label: 'शून्य कटौती (Zero Sales)', active: false },
  ],
  timeline: [
    {
      day: 31,
      date: '13 Nov 2024',
      status: 'scheduled',
      statusLabel: 'शिड्यूल्ड (Scheduled)',
      amount: '₹596',
      amountLabel: 'अनुमानित कटौती',
      description: 'सुबह 7:00 AM सेटलमेंट से कटेगी',
      title: 'Day 31 आगामी दैनिक रिकवरी',
      source: 'अपेक्षित स्रोत: कल की UPI QR बिक्री',
      autoStatus: 'ऑटो-पेमेंट ऑन',
    },
    {
      day: 30,
      date: '12 Nov 2024',
      status: 'success',
      statusLabel: '✓ सफल (Recovered)',
      amount: '₹596',
      title: 'Day 30 • दैनिक रिकवरी पूर्ण',
      qrSales: '₹5,220',
      deduction: '-₹596',
      netCredit: '₹4,624',
      creditTime: 'SBI IMPS 7:02 AM',
      impsRef: 'SBIN003120',
    },
    {
      day: 29,
      date: '11 Nov 2024 (Sunday)',
      status: 'skipped',
      statusLabel: 'दुकान बंद (Zero Sales)',
      amount: '₹0',
      title: 'Day 29 • रविवार छुट्टी — शून्य बिक्री',
      description: 'कोई QR पेमेंट नहीं • कोई पेनल्टी नहीं लगी',
    },
    {
      day: 28,
      date: '10 Nov 2024',
      status: 'success',
      statusLabel: '✓ सफल (Recovered)',
      amount: '₹596',
      title: 'Day 28 • दैनिक रिकवरी पूर्ण',
      qrSales: '₹3,800',
      deduction: '-₹596',
      netCredit: '₹3,204',
      creditTime: 'SBI IMPS 7:05 AM',
      impsRef: 'SBIN003098',
    },
    {
      day: 27,
      date: '09 Nov 2024',
      status: 'success',
      statusLabel: '✓ सफल (Recovered)',
      amount: '₹596',
      title: 'Day 27 • दैनिक रिकवरी पूर्ण',
      qrSales: '₹6,100',
      deduction: '-₹596',
      netCredit: '₹5,504',
      creditTime: 'SBI IMPS 7:01 AM',
      impsRef: 'SBIN003065',
    },
  ],
};

export const stockAlerts = [
  {
    name: 'Mustard Oil (फॉर्च्यून तेल 1L)',
    status: 'Low Stock',
    supplier: 'Agarwal Wholesale (Sadar)',
    projectedRunOut: 'Friday evening rush',
  },
  {
    name: 'Chakki Atta (10kg)',
    status: 'Low Stock',
    supplier: 'Agarwal Wholesale (Sadar)',
    projectedRunOut: 'Friday evening rush',
  },
];

export const scheduledCampaigns = [
  {
    name: 'शनिवार Weekend Rush Offer',
    type: 'Recurring • Weekly',
    targets: 80,
    channel: 'WhatsApp',
    status: 'Active',
    nextRun: 'Sat 10:00 AM',
  },
  {
    name: 'दीवाली Special Mega Sale',
    type: 'Festival • One-time',
    targets: 412,
    channel: 'WhatsApp + SMS',
    status: 'Scheduled',
    nextRun: '28 Oct, 9:00 AM',
  },
];

// Utility: Calculate loan financials
export function calculateLoan(amount, tenureDays, monthlyRate = 1.2) {
  const months = tenureDays / 30;
  const totalInterest = Math.round(amount * (monthlyRate / 100) * months);
  const totalRepayable = amount + totalInterest;
  const dailyDeduction = Math.round(totalRepayable / tenureDays);
  return {
    amount,
    totalInterest,
    totalRepayable,
    dailyDeduction,
    months: Math.round(months),
    tenureDays,
  };
}

// Utility: Format currency
export function formatCurrency(num) {
  return '₹' + num.toLocaleString('en-IN');
}
