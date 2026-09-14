# Paytm Pragati (पेटीएम प्रगति) — Production Context & Architecture Document

> **Version**: 2.0 | **Last Updated**: September 14, 2026  
> **Status**: Prototype → Production Roadmap  
> **Authors**: Paytm Pragati Team

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Current State Audit](#2-current-state-audit)
3. [Production Architecture](#3-production-architecture)
4. [Backend Services & API Design](#4-backend-services--api-design)
5. [Frontend Architecture Overhaul](#5-frontend-architecture-overhaul)
6. [Database Schema Design](#6-database-schema-design)
7. [Authentication & Authorization](#7-authentication--authorization)
8. [Real-Time Data Pipeline](#8-real-time-data-pipeline)
9. [AI/ML Pipeline](#9-aiml-pipeline)
10. [WhatsApp Business API Integration](#10-whatsapp-business-api-integration)
11. [Lending & NBFC Integration](#11-lending--nbfc-integration)
12. [Payment & Settlement Engine](#12-payment--settlement-engine)
13. [Voice & Vernacular Layer](#13-voice--vernacular-layer)
14. [State Management & Data Flow](#14-state-management--data-flow)
15. [Testing Strategy](#15-testing-strategy)
16. [Security & Compliance](#16-security--compliance)
17. [Performance & Optimization](#17-performance--optimization)
18. [DevOps & Deployment](#18-devops--deployment)
19. [Monitoring & Observability](#19-monitoring--observability)
20. [Rollout Strategy](#20-rollout-strategy)
21. [File Structure (Production)](#21-file-structure-production)
22. [Key Technical Decisions](#22-key-technical-decisions)
23. [Risk Matrix & Mitigations](#23-risk-matrix--mitigations)

---

## 1. Executive Summary

### The Problem (Kirana Paradox)
35M+ Indian merchants generate continuous digital transaction streams via Paytm Soundboxes/QR daily, yet remain passive consumers of payment receipts. They lack:
- **Actionable business intelligence** from their own transaction data
- **Automated customer retention** tools accessible without tech literacy
- **Working capital access** without traditional collateral/paperwork

### The Solution
**Paytm Pragati** is a voice-first, multilingual merchant growth copilot that creates a closed-loop engine:

```
Data (Soundbox/QR) → Predictive Insight → 1-Tap Action → Measurable P&L Uplift
```

### Core Value Pillars
| Pillar | Description | Revenue Model |
|:---|:---|:---|
| **AI Growth Copilot** | Predictive analytics from QR/Soundbox data streams | Freemium (premium insights ₹99/mo) |
| **WhatsApp Automation** | 1-tap customer win-back campaigns via Meta Business API | Per-message fee (₹0.50/msg above free tier) |
| **Micro-Lending** | Pre-approved daily auto-deduct loans from settlement | Interest spread (1.2% flat/month) |
| **Inventory Intelligence** | Predictive stock alerts with supplier auto-ordering | Affiliate commission from wholesalers |

### Target Metrics (Y1)
- **MAU**: 2M merchants
- **Loan Book**: ₹500Cr outstanding
- **WhatsApp Campaigns**: 10M messages/month
- **Default Rate**: <2% (vs industry 8-12%)

---

## 2. Current State Audit

### What Exists Today (Prototype)

#### Tech Stack
| Layer | Current | Assessment |
|:---|:---|:---|
| **Build Tool** | Vite 6.x | ✅ Keep — fast, modern |
| **Frontend Framework** | Vanilla JS (ES Modules) | ⚠️ Replace — not scalable for production |
| **Styling** | TailwindCSS CDN + Custom CSS | ⚠️ Replace CDN with npm package |
| **Routing** | Custom hash-based router | ⚠️ Replace with React Router |
| **State** | Hardcoded mock data (merchant.js) | ❌ Replace with real API + state management |
| **Backend** | None | ❌ Must build entirely |
| **Database** | None | ❌ Must build entirely |
| **Auth** | None | ❌ Must build entirely |
| **Testing** | None | ❌ Must build entirely |

#### Current File Map
```
Paytm AI/
├── index.html              → App shell (Tailwind CDN config, fonts)
├── package.json            → Minimal (only Vite dev dep)
├── vite.config.js          → Basic config
├── src/
│   ├── main.js             → App init, route registration
│   ├── router.js           → Hash-based SPA router
│   ├── styles/index.css    → Custom animations, slider, layout
│   ├── data/merchant.js    → ALL mock data (410 lines, hardcoded)
│   ├── views/
│   │   ├── dashboard.js    → Growth Home (366 lines)
│   │   ├── whatsapp.js     → WhatsApp Copilot (321 lines)
│   │   ├── loanApplication.js → Loan Calculator (308 lines)
│   │   ├── disbursal.js    → Disbursal Confirmation (265 lines)
│   │   ├── loanStatement.js → Loan Passbook (335 lines)
│   │   └── onboarding.js   → Welcome Flow (447 lines)
│   └── components/
│       ├── header.js       → Shared app header (66 lines)
│       ├── bottomNav.js    → Bottom navigation (48 lines)
│       ├── toast.js        → Toast notification system (36 lines)
│       └── voiceDrawer.js  → Voice assistant UI (63 lines)
```

#### Current Screens (6 Total)
| # | Screen | Route | Lines | Functional? |
|:--|:---|:---|:---|:---|
| 1 | Merchant Growth Home | `#/dashboard` | 366 | ✅ UI only — mock data, simulated actions |
| 2 | WhatsApp Copilot | `#/whatsapp` | 321 | ✅ UI only — simulated chat, no real API |
| 3 | AI Loan Application | `#/loans` | 308 | ✅ Slider works — no real loan processing |
| 4 | Disbursal Tracker | `#/disbursal` | 265 | ✅ UI only — hardcoded bank details |
| 5 | Loan Statement | `#/loan-statement` | 335 | ✅ UI only — hardcoded timeline |
| 6 | Onboarding | `#/onboarding` | 447 | ✅ UI only — language picker, toggles work |

#### Critical Gaps for Production
1. **No Backend** — Everything is client-side mock data
2. **No Authentication** — No merchant login, OTP, or session management
3. **No Real API Integration** — WhatsApp, Lending, UPI settlement are all simulated
4. **No State Management** — Views re-render entirely on navigation
5. **No Error Handling** — No network error states, loading skeletons, or fallbacks
6. **No Offline Support** — No Service Worker or PWA manifest
7. **No Testing** — Zero unit, integration, or E2E tests
8. **No i18n System** — Hindi strings are hardcoded inline
9. **No Analytics/Telemetry** — No event tracking or crash reporting
10. **No Accessibility** — No ARIA roles beyond basic button/switch

---

## 3. Production Architecture

### High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   React PWA  │  │  WhatsApp    │  │  Soundbox    │          │
│  │   (Mobile)   │  │  (Bot/WABA)  │  │  (IoT/TTS)   │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
└─────────┼──────────────────┼──────────────────┼──────────────────┘
          │                  │                  │
     ┌────▼──────────────────▼──────────────────▼────┐
     │              API GATEWAY (Kong/AWS)             │
     │    Rate Limiting · Auth · Load Balancing        │
     └────┬──────────────────┬──────────────────┬────┘
          │                  │                  │
┌─────────▼──────┐  ┌───────▼────────┐  ┌──────▼──────────┐
│ MERCHANT       │  │  CAMPAIGN      │  │  LENDING        │
│ SERVICE        │  │  SERVICE       │  │  SERVICE        │
│                │  │                │  │                  │
│ • Profile      │  │ • WhatsApp API │  │ • Underwriting  │
│ • Onboarding   │  │ • Templates    │  │ • Disbursal     │
│ • Settings     │  │ • Analytics    │  │ • Settlement    │
│ • KYC/eKYC     │  │ • Scheduling   │  │ • Passbook      │
└────────┬───────┘  └───────┬────────┘  └──────┬──────────┘
         │                  │                   │
    ┌────▼──────────────────▼───────────────────▼────┐
    │              SHARED SERVICES                     │
    │  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
    │  │ Auth/OTP │ │ AI/ML    │ │ Notification     │ │
    │  │ Service  │ │ Engine   │ │ Service          │ │
    │  └──────────┘ └──────────┘ └──────────────────┘ │
    │  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
    │  │ Payment  │ │ i18n     │ │ Voice/TTS        │ │
    │  │ Gateway  │ │ Service  │ │ Service          │ │
    │  └──────────┘ └──────────┘ └──────────────────┘ │
    └────────────────────┬────────────────────────────┘
                         │
    ┌────────────────────▼────────────────────────────┐
    │              DATA LAYER                          │
    │  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
    │  │PostgreSQL│ │  Redis   │ │  Kafka/SQS       │ │
    │  │(Primary) │ │ (Cache)  │ │ (Event Stream)   │ │
    │  └──────────┘ └──────────┘ └──────────────────┘ │
    │  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
    │  │ S3/GCS   │ │ClickHse │ │  TimescaleDB     │ │
    │  │ (Files)  │ │(Analyts) │ │ (Time Series)    │ │
    │  └──────────┘ └──────────┘ └──────────────────┘ │
    └─────────────────────────────────────────────────┘
```

### Tech Stack Decision Matrix

| Concern | Technology | Rationale |
|:---|:---|:---|
| **Frontend** | React 18 + Vite | Component model, ecosystem, hiring pool |
| **State** | Zustand | Lightweight, no boilerplate, performant |
| **Routing** | React Router v6 | Hash → real paths, nested routes |
| **Styling** | TailwindCSS (npm) + Radix | Current design preserved, a11y primitives |
| **Backend** | Node.js (Fastify) | Same-language stack, 50k RPS, schema validation |
| **Database** | PostgreSQL 16 + TimescaleDB | ACID for finance, time-series for txn analytics |
| **Cache** | Redis 7 | Session, rate-limiting, real-time counters |
| **Queue** | Apache Kafka | Event sourcing, txn stream processing |
| **AI/ML** | Python (FastAPI) microservice | Model serving, pandas pipelines |
| **Search** | Elasticsearch | Merchant/product search, log aggregation |
| **CDN** | CloudFront / Fastly | Static assets, API edge caching |
| **Infra** | AWS EKS / GKE | Container orchestration, auto-scaling |
| **CI/CD** | GitHub Actions + ArgoCD | GitOps, automated testing pipeline |
| **Monitoring** | Grafana + Prometheus + Sentry | Metrics, alerting, error tracking |

---

## 4. Backend Services & API Design

### 4.1 Merchant Service

**Responsibilities**: Profile management, onboarding, KYC, settings, Soundbox linkage

#### Key Endpoints
```
POST   /api/v1/auth/send-otp          → Send OTP to merchant phone
POST   /api/v1/auth/verify-otp        → Verify OTP, issue JWT
POST   /api/v1/auth/refresh           → Refresh access token

GET    /api/v1/merchant/profile        → Merchant profile + store details
PUT    /api/v1/merchant/profile        → Update profile
POST   /api/v1/merchant/onboarding     → Complete onboarding flow
GET    /api/v1/merchant/settings       → Preferences (language, notifications)
PUT    /api/v1/merchant/settings       → Update preferences

GET    /api/v1/merchant/soundbox       → Linked Soundbox status
POST   /api/v1/merchant/soundbox/link  → Link new Soundbox device
```

#### Merchant Profile Response Schema
```json
{
  "id": "MCHT_9876543210",
  "phone": "+919876543210",
  "name": "राजेश शर्मा",
  "nameEn": "Rajesh Sharma",
  "store": {
    "name": "Sharma Kirana & General Store",
    "nameHi": "शर्मा किराना एंड जनरल स्टोर",
    "category": "KIRANA",
    "address": { "line1": "...", "city": "Jaipur", "pin": "302001" },
    "gstNumber": null,
    "openSince": "2019-03-15"
  },
  "bank": {
    "name": "State Bank of India",
    "shortCode": "SBI",
    "accountEnding": "4821",
    "ifsc": "SBIN0001234",
    "verified": true
  },
  "soundbox": {
    "id": "SB-99214",
    "active": true,
    "lastPingAt": "2026-09-14T15:42:00Z"
  },
  "kycStatus": "VERIFIED",
  "preferredLanguage": "hi",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### 4.2 Dashboard / Analytics Service

**Responsibilities**: Real-time business pulse, historical trends, AI insights

#### Key Endpoints
```
GET    /api/v1/dashboard/pulse         → Today's live revenue, txn count, avg bill
GET    /api/v1/dashboard/trends        → 7/30/90 day trend data
GET    /api/v1/dashboard/insights      → AI-generated proactive alerts
GET    /api/v1/dashboard/actions       → Pending smart actions for merchant
POST   /api/v1/dashboard/actions/:id/dismiss → Dismiss an action
```

#### Pulse Response Schema
```json
{
  "date": "2026-09-14",
  "revenue": 4820,
  "revenueFormatted": "₹4,820",
  "trendPercent": 14,
  "trendDirection": "up",
  "trendVsPrevWeekDay": 8,
  "txnCount": 38,
  "avgBill": 126,
  "peakHour": "11:00-12:00",
  "lastPayment": {
    "amount": 150,
    "announcement": "Paytm पर ₹150 प्राप्त हुए",
    "timestamp": "2026-09-14T15:39:00Z",
    "method": "UPI_QR"
  },
  "dayComparison": {
    "dayOfWeek": "Tuesday",
    "dayOfWeekHi": "मंगलवार",
    "avgForThisDay": 4230,
    "performanceVsAvg": "+14%"
  }
}
```

### 4.3 Campaign Service (WhatsApp)

**Responsibilities**: WhatsApp Business API integration, template management, campaign execution, analytics

#### Key Endpoints
```
GET    /api/v1/campaigns               → List all campaigns
POST   /api/v1/campaigns               → Create new campaign
GET    /api/v1/campaigns/:id           → Campaign details + analytics
POST   /api/v1/campaigns/:id/approve   → Approve & send campaign
POST   /api/v1/campaigns/:id/pause     → Pause active campaign
DELETE /api/v1/campaigns/:id           → Cancel campaign

GET    /api/v1/campaigns/suggestions   → AI-suggested campaigns
POST   /api/v1/campaigns/suggestions/:id/approve → Approve AI suggestion

GET    /api/v1/campaigns/templates     → Available WhatsApp templates
POST   /api/v1/campaigns/templates     → Submit new template for approval

GET    /api/v1/campaigns/customers/lapsed  → Lapsed customer list
GET    /api/v1/campaigns/analytics     → Overall campaign analytics

GET    /api/v1/whatsapp/status         → Bot status, sync health
POST   /api/v1/whatsapp/test-ping      → Send test message
```

### 4.4 Lending Service

**Responsibilities**: Loan eligibility, application, disbursal, settlement, passbook

#### Key Endpoints
```
GET    /api/v1/loans/eligibility       → Pre-approved amount, credit score
POST   /api/v1/loans/calculate         → EMI/daily deduction calculator
POST   /api/v1/loans/apply             → Submit loan application
GET    /api/v1/loans/active            → Current active loan details
GET    /api/v1/loans/:id/statement     → Loan passbook / statement
GET    /api/v1/loans/:id/settlement    → Daily settlement ledger

POST   /api/v1/loans/:id/prepay       → Initiate prepayment
GET    /api/v1/loans/:id/upgrade       → Next limit upgrade criteria

GET    /api/v1/settlement/today        → Today's settlement breakdown
GET    /api/v1/settlement/projection   → Tomorrow's projected settlement
```

### 4.5 Inventory / Stock Service

**Responsibilities**: AI-powered stock level predictions, supplier integration

```
GET    /api/v1/inventory/alerts        → Current low-stock alerts
POST   /api/v1/inventory/reorder       → Place reorder via WhatsApp bot
GET    /api/v1/inventory/suppliers      → Connected suppliers
```

---

## 5. Frontend Architecture Overhaul

### 5.1 Migration Path: Vanilla JS → React

#### Phase 1: Scaffolding (Week 1-2)
```
src/
├── app/
│   ├── App.jsx               → Root component, providers, router
│   ├── routes.jsx            → Route definitions
│   └── providers/
│       ├── AuthProvider.jsx   → Auth context
│       ├── I18nProvider.jsx   → Internationalization
│       └── ThemeProvider.jsx  → Design tokens
│
├── features/
│   ├── auth/
│   │   ├── LoginPage.jsx
│   │   ├── OTPVerification.jsx
│   │   └── useAuth.js        → Auth hook
│   │
│   ├── dashboard/
│   │   ├── DashboardPage.jsx
│   │   ├── components/
│   │   │   ├── BusinessPulseCard.jsx
│   │   │   ├── AICopilotCard.jsx
│   │   │   ├── WhatsAppStatusCard.jsx
│   │   │   ├── SmartActionsSection.jsx
│   │   │   └── SoundboxReplayButton.jsx
│   │   ├── hooks/
│   │   │   ├── usePulseData.js
│   │   │   ├── useInsights.js
│   │   │   └── useActions.js
│   │   └── api/
│   │       └── dashboardApi.js
│   │
│   ├── whatsapp/
│   │   ├── WhatsAppPage.jsx
│   │   ├── components/
│   │   │   ├── BotStatusBanner.jsx
│   │   │   ├── AIChatSuggestion.jsx
│   │   │   ├── CampaignTracker.jsx
│   │   │   ├── RedemptionList.jsx
│   │   │   └── AutomationSchedule.jsx
│   │   ├── hooks/
│   │   │   ├── useCampaigns.js
│   │   │   └── useWhatsAppStatus.js
│   │   └── api/
│   │       └── campaignApi.js
│   │
│   ├── loans/
│   │   ├── LoanApplicationPage.jsx
│   │   ├── DisbursalPage.jsx
│   │   ├── LoanStatementPage.jsx
│   │   ├── components/
│   │   │   ├── CreditHealthBanner.jsx
│   │   │   ├── LoanAmountSlider.jsx
│   │   │   ├── TenureSelector.jsx
│   │   │   ├── FinancialBreakdown.jsx
│   │   │   ├── UnderwritingSignals.jsx
│   │   │   ├── SettlementTracker.jsx
│   │   │   ├── DailyLedger.jsx
│   │   │   ├── TimelineEntry.jsx
│   │   │   └── RepaymentProgress.jsx
│   │   ├── hooks/
│   │   │   ├── useLoanEligibility.js
│   │   │   ├── useLoanCalculator.js
│   │   │   ├── useActiveLoan.js
│   │   │   └── useStatement.js
│   │   └── api/
│   │       └── loanApi.js
│   │
│   ├── onboarding/
│   │   ├── OnboardingPage.jsx
│   │   ├── components/
│   │   │   ├── LanguageSelector.jsx
│   │   │   ├── AudioExplainer.jsx
│   │   │   ├── SuperpowerCard.jsx
│   │   │   ├── SetupChecklist.jsx
│   │   │   └── TrustBadges.jsx
│   │   └── hooks/
│   │       └── useOnboarding.js
│   │
│   └── inventory/
│       ├── StockAlertsCard.jsx
│       └── hooks/
│           └── useStockAlerts.js
│
├── shared/
│   ├── components/
│   │   ├── AppHeader.jsx
│   │   ├── BottomNavigation.jsx
│   │   ├── Toast.jsx
│   │   ├── VoiceDrawer.jsx
│   │   ├── LoadingSkeleton.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── EmptyState.jsx
│   │   ├── ConfirmDialog.jsx
│   │   ├── PullToRefresh.jsx
│   │   └── CurrencyDisplay.jsx
│   │
│   ├── hooks/
│   │   ├── useApi.js          → Generic fetch wrapper with retry
│   │   ├── useVoice.js        → Web Speech API integration
│   │   ├── useHaptics.js      → Vibration feedback
│   │   ├── useLocale.js       → i18n hook
│   │   ├── useNetworkStatus.js → Online/offline detection
│   │   └── useIntersection.js  → Lazy loading trigger
│   │
│   ├── utils/
│   │   ├── currency.js        → ₹ formatting, Indian notation
│   │   ├── date.js            → Hindi date formatting
│   │   ├── validation.js      → Phone, PAN, Aadhaar validators
│   │   └── analytics.js       → Event tracking wrapper
│   │
│   └── constants/
│       ├── routes.js          → Route path constants
│       ├── apiEndpoints.js    → API URL registry
│       └── designTokens.js    → Color/spacing tokens (JS mirror)
│
├── store/
│   ├── authStore.js           → Zustand auth state
│   ├── merchantStore.js       → Merchant profile cache
│   ├── dashboardStore.js      → Real-time pulse data
│   ├── campaignStore.js       → WhatsApp campaigns
│   ├── loanStore.js           → Loan lifecycle state
│   └── uiStore.js             → Toasts, drawers, modals
│
├── i18n/
│   ├── index.js               → i18next setup
│   ├── hi.json                → Hindi translations
│   ├── en.json                → English translations
│   ├── hinglish.json          → Hinglish translations
│   └── bn.json                → Bengali translations
│
├── services/
│   ├── apiClient.js           → Axios instance with interceptors
│   ├── authService.js         → OTP, JWT management
│   ├── socketService.js       → WebSocket for real-time updates
│   ├── storageService.js      → localStorage/IndexedDB abstraction
│   ├── notificationService.js → Push notification handler
│   └── voiceService.js        → Speech recognition + TTS
│
└── styles/
    ├── index.css              → Global styles, animations
    ├── tailwind.config.js     → Design token configuration
    └── components/            → Component-specific CSS modules
```

### 5.2 Key Frontend Patterns

#### API Layer Pattern
```javascript
// src/services/apiClient.js
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
});

// Request interceptor: attach JWT
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor: handle 401, retry with refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshed = await useAuthStore.getState().refreshToken();
      if (refreshed) return apiClient(error.config);
      useAuthStore.getState().logout();
    }
    throw error;
  }
);
```

#### Data Fetching Hook Pattern
```javascript
// src/features/dashboard/hooks/usePulseData.js
import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../api/dashboardApi';

export function usePulseData() {
  return useQuery({
    queryKey: ['dashboard', 'pulse'],
    queryFn: dashboardApi.getPulse,
    staleTime: 30_000,        // 30s — real-time-ish
    refetchInterval: 60_000,  // Auto-refresh every 60s
    placeholderData: (prev) => prev, // Show stale while refreshing
  });
}
```

#### Component Pattern
```jsx
// src/features/dashboard/components/BusinessPulseCard.jsx
import { usePulseData } from '../hooks/usePulseData';
import { CurrencyDisplay } from '../../../shared/components/CurrencyDisplay';
import { LoadingSkeleton } from '../../../shared/components/LoadingSkeleton';

export function BusinessPulseCard() {
  const { data: pulse, isLoading, error } = usePulseData();

  if (isLoading) return <PulseSkeleton />;
  if (error) return <PulseErrorState onRetry={() => refetch()} />;

  return (
    <section className="rounded-xl bg-white p-4 shadow-md">
      <CurrencyDisplay amount={pulse.revenue} trend={pulse.trendPercent} />
      {/* ... rest of card */}
    </section>
  );
}
```

---

## 6. Database Schema Design

### 6.1 Core Tables (PostgreSQL)

```sql
-- ============================================
-- MERCHANT DOMAIN
-- ============================================

CREATE TABLE merchants (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone           VARCHAR(15) UNIQUE NOT NULL,
  name            VARCHAR(100) NOT NULL,
  name_en         VARCHAR(100),
  preferred_lang  VARCHAR(10) DEFAULT 'hi',
  kyc_status      VARCHAR(20) DEFAULT 'PENDING', -- PENDING, VERIFIED, REJECTED
  onboarding_done BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE stores (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id     UUID REFERENCES merchants(id),
  name            VARCHAR(200) NOT NULL,
  name_hi         VARCHAR(200),
  category        VARCHAR(50), -- KIRANA, RESTAURANT, PHARMACY, etc.
  address_line1   TEXT,
  city            VARCHAR(100),
  state           VARCHAR(50),
  pincode         VARCHAR(6),
  lat             DECIMAL(10,8),
  lng             DECIMAL(11,8),
  gst_number      VARCHAR(15),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE bank_accounts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id     UUID REFERENCES merchants(id),
  bank_name       VARCHAR(100),
  bank_short      VARCHAR(10),
  account_number  VARCHAR(20) NOT NULL,  -- Encrypted
  ifsc            VARCHAR(11) NOT NULL,
  holder_name     VARCHAR(100),
  is_primary      BOOLEAN DEFAULT TRUE,
  verified        BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE soundboxes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id       VARCHAR(50) UNIQUE NOT NULL,
  merchant_id     UUID REFERENCES merchants(id),
  is_active       BOOLEAN DEFAULT TRUE,
  last_ping_at    TIMESTAMPTZ,
  firmware_ver    VARCHAR(20),
  linked_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TRANSACTION DOMAIN (TimescaleDB hypertable)
-- ============================================

CREATE TABLE transactions (
  id              UUID DEFAULT gen_random_uuid(),
  merchant_id     UUID NOT NULL,
  amount          BIGINT NOT NULL,        -- Amount in paise
  payment_method  VARCHAR(20) NOT NULL,   -- UPI_QR, SOUNDBOX, CARD
  customer_phone  VARCHAR(15),            -- Hashed for privacy
  customer_id     UUID,
  upi_ref         VARCHAR(50),
  status          VARCHAR(20) DEFAULT 'SUCCESS',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  PRIMARY KEY (id, created_at)
);
-- Convert to TimescaleDB hypertable:
SELECT create_hypertable('transactions', 'created_at');

-- ============================================
-- CAMPAIGN / WHATSAPP DOMAIN
-- ============================================

CREATE TABLE campaigns (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id     UUID REFERENCES merchants(id),
  name            VARCHAR(200),
  type            VARCHAR(30),   -- WINBACK, FESTIVAL, RECURRING, CUSTOM
  template_id     VARCHAR(100),  -- WhatsApp template ID
  message_body    TEXT,
  coupon_code     VARCHAR(20),
  discount_amount BIGINT,        -- Paise
  target_count    INT,
  status          VARCHAR(20) DEFAULT 'DRAFT', -- DRAFT, APPROVED, SENDING, SENT, PAUSED
  scheduled_at    TIMESTAMPTZ,
  sent_at         TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE campaign_recipients (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id     UUID REFERENCES campaigns(id),
  customer_id     UUID,
  phone           VARCHAR(15),
  wa_message_id   VARCHAR(100),  -- WhatsApp message ID
  status          VARCHAR(20) DEFAULT 'QUEUED', -- QUEUED, SENT, DELIVERED, READ, FAILED
  redeemed        BOOLEAN DEFAULT FALSE,
  redeemed_at     TIMESTAMPTZ,
  sent_at         TIMESTAMPTZ
);

-- ============================================
-- LENDING DOMAIN
-- ============================================

CREATE TABLE loans (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id     UUID REFERENCES merchants(id),
  loan_number     VARCHAR(30) UNIQUE NOT NULL,
  nbfc_partner    VARCHAR(100),   -- e.g. "Clix Capital"
  sanctioned_amt  BIGINT NOT NULL, -- Paise
  disbursed_amt   BIGINT NOT NULL,
  total_payable   BIGINT NOT NULL,
  interest_rate   DECIMAL(5,2),    -- Monthly flat %
  tenure_days     INT NOT NULL,
  daily_deduction BIGINT NOT NULL, -- Paise
  status          VARCHAR(20) DEFAULT 'ACTIVE', -- ACTIVE, CLOSED, DEFAULTED, PREPAID
  disbursed_at    TIMESTAMPTZ,
  utr_ref         VARCHAR(50),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE loan_repayments (
  id              UUID DEFAULT gen_random_uuid(),
  loan_id         UUID NOT NULL,
  day_number      INT NOT NULL,
  date            DATE NOT NULL,
  qr_sales        BIGINT,         -- Day's QR revenue (paise)
  deduction_amt   BIGINT,         -- Actual deducted (paise)
  net_credit      BIGINT,         -- Credited to bank (paise)
  status          VARCHAR(20),    -- SUCCESS, SKIPPED, PARTIAL
  imps_ref        VARCHAR(50),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  PRIMARY KEY (id, created_at)
);
SELECT create_hypertable('loan_repayments', 'created_at');

CREATE TABLE loan_eligibility (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id     UUID REFERENCES merchants(id),
  credit_score    INT,            -- 0-900
  max_amount      BIGINT,         -- Paise
  tier            VARCHAR(30),    -- HIGH_TRUST, STANDARD, NEW
  signals         JSONB,          -- Array of underwriting signals
  calculated_at   TIMESTAMPTZ DEFAULT NOW(),
  valid_until     TIMESTAMPTZ
);

-- ============================================
-- INVENTORY DOMAIN
-- ============================================

CREATE TABLE stock_alerts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id     UUID REFERENCES merchants(id),
  product_name    VARCHAR(200),
  product_name_hi VARCHAR(200),
  status          VARCHAR(20), -- LOW, CRITICAL, OUT_OF_STOCK
  supplier_name   VARCHAR(200),
  projected_runout VARCHAR(100),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

### 6.2 Indexes
```sql
CREATE INDEX idx_txn_merchant_date ON transactions (merchant_id, created_at DESC);
CREATE INDEX idx_campaigns_merchant ON campaigns (merchant_id, status);
CREATE INDEX idx_loans_merchant ON loans (merchant_id, status);
CREATE INDEX idx_repayments_loan ON loan_repayments (loan_id, date DESC);
CREATE INDEX idx_merchants_phone ON merchants (phone);
```

---

## 7. Authentication & Authorization

### Flow: OTP-Based Authentication

```
┌──────────┐    POST /auth/send-otp     ┌──────────┐    SMS/WhatsApp
│  Client  │ ──────────────────────────► │  Auth    │ ──────────────► Merchant Phone
│  (PWA)   │                             │  Service │
│          │    POST /auth/verify-otp    │          │
│          │ ──────────────────────────► │          │
│          │ ◄────── { accessToken,     │          │
│          │          refreshToken }     │          │
└──────────┘                             └──────────┘
```

### JWT Token Structure
```json
{
  "sub": "MCHT_9876543210",
  "phone": "+919876543210",
  "merchantId": "uuid-here",
  "storeId": "uuid-here",
  "lang": "hi",
  "iat": 1726300000,
  "exp": 1726386400
}
```

### Token Lifecycle
- **Access Token**: 24h expiry, stored in memory
- **Refresh Token**: 30d expiry, stored in httpOnly secure cookie
- **OTP**: 6-digit, 5-minute expiry, max 3 attempts, 60s resend cooldown

---

## 8. Real-Time Data Pipeline

### Transaction Event Stream

```
Soundbox/QR Payment
       │
       ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Paytm UPI   │────►│    Kafka     │────►│  Stream      │
│  Settlement  │     │  Topic:      │     │  Processor   │
│  Webhook     │     │  txn.events  │     │  (Flink/     │
│              │     │              │     │   Node.js)   │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
                              ┌────────────────────┼────────────────┐
                              ▼                    ▼                ▼
                     ┌────────────┐      ┌─────────────┐   ┌──────────┐
                     │ TimescaleDB│      │ Redis       │   │ WebSocket│
                     │ (Storage)  │      │ (Counters)  │   │ (Push to │
                     │            │      │             │   │  Client) │
                     └────────────┘      └─────────────┘   └──────────┘
```

### WebSocket Events (Client ← Server)
```javascript
// Real-time events pushed to merchant's PWA
{
  "event": "PAYMENT_RECEIVED",
  "data": {
    "amount": 15000,           // ₹150 in paise
    "announcement": "Paytm पर ₹150 प्राप्त हुए",
    "method": "UPI_QR",
    "todayTotal": 482000,      // Running total
    "txnCount": 38
  }
}

{
  "event": "DAILY_SETTLEMENT_COMPLETE",
  "data": {
    "grossAmount": 482000,
    "loanDeduction": 59600,
    "netCredit": 422400,
    "impsRef": "SBIN003120",
    "creditTime": "07:02:00"
  }
}

{
  "event": "AI_INSIGHT_GENERATED",
  "data": {
    "type": "FOOTFALL_ALERT",
    "title": "Tuesday Footfall Drop Warning",
    "severity": "WARNING"
  }
}
```

---

## 9. AI/ML Pipeline

### 9.1 Models & Use Cases

| Model | Input | Output | Latency |
|:---|:---|:---|:---|
| **Footfall Predictor** | 90-day txn time series | Hourly footfall forecast | <200ms |
| **Lapsed Customer Detector** | Customer purchase history | List of at-risk customers | Batch (1h) |
| **Win-back Recommender** | Customer segments + product affinity | Optimal offer (product + discount) | <500ms |
| **Credit Scorer** | QR volume, consistency, dispute rate | 0-900 score + tier | <1s |
| **Stock Predictor** | Sales velocity + seasonal patterns | Reorder point predictions | Batch (6h) |
| **Voice NLU** | Hindi/Hinglish speech text | Intent + entities | <300ms |

### 9.2 Credit Scoring Algorithm (Simplified)
```python
def calculate_merchant_credit_score(merchant_id: str) -> CreditScore:
    """
    AI Credit Health Score: 0-900
    
    Signals:
    1. Daily Active Days (30%)    — % of days with ≥1 QR transaction in 90 days
    2. Revenue Consistency (25%)  — CV (coefficient of variation) of daily revenue
    3. Dispute Rate (20%)        — Chargebacks / Total transactions
    4. Growth Trend (15%)        — Revenue trend (positive slope bonus)
    5. Account Age (10%)         — Months since first Paytm transaction
    """
    metrics = fetch_90_day_metrics(merchant_id)
    
    active_days_score = min(metrics.active_day_pct / 95 * 270, 270)
    consistency_score = max(0, (1 - metrics.revenue_cv) * 225)
    dispute_score = max(0, (1 - metrics.dispute_rate * 100) * 180)
    growth_score = min(max(0, metrics.growth_slope * 1000), 135)
    age_score = min(metrics.account_age_months * 5, 90)
    
    total = round(active_days_score + consistency_score + dispute_score + growth_score + age_score)
    tier = "HIGH_TRUST" if total >= 750 else "STANDARD" if total >= 500 else "NEW"
    
    return CreditScore(score=total, max=900, tier=tier)
```

---

## 10. WhatsApp Business API Integration

### Architecture
```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Pragati     │────►│  Campaign    │────►│  Meta WABA   │
│  Frontend    │     │  Service     │     │  Cloud API   │
│  (1-tap)     │     │              │     │              │
└──────────────┘     └──────┬───────┘     └──────┬───────┘
                            │                     │
                            │  Webhook            │ Delivery Status
                            │◄────────────────────┘
                            │
                     ┌──────▼───────┐
                     │  Analytics   │
                     │  Service     │
                     └──────────────┘
```

### Template Structure
```json
{
  "name": "kirana_winback_offer_v2",
  "language": "hi",
  "category": "MARKETING",
  "components": [
    {
      "type": "HEADER",
      "format": "TEXT",
      "text": "🎉 {{1}} से विशेष ऑफर!"
    },
    {
      "type": "BODY",
      "text": "🙏 नमस्ते {{2}}! {{3}} पर आज {{4}} पर ₹{{5}} की विशेष छूट। आज {{6}} तक वैध।\n\nदुकान पर दिखाएं या इसी चैट पर आर्डर लिखकर भेजें। तुरंत डिलीवरी उपलब्ध। 🚚",
      "example": { "body_text": [["Sharma Kirana", "सुनीता जी", "1kg चीनी", "20", "6 PM"]] }
    },
    {
      "type": "BUTTONS",
      "buttons": [
        { "type": "QUICK_REPLY", "text": "ऑर्डर करें 🛒" },
        { "type": "QUICK_REPLY", "text": "और ऑफर देखें 👀" }
      ]
    }
  ]
}
```

### Delivery Funnel Tracking
- **Sent** → **Delivered** → **Read** → **Button Clicked** → **Redeemed at Store**
- Each status change triggers a webhook → Campaign Service updates recipient status

---

## 11. Lending & NBFC Integration

### Partner Integration Flow
```
Merchant Applies (1-tap)
        │
        ▼
┌───────────────┐    ┌────────────────┐    ┌───────────────┐
│ Pragati       │───►│ NBFC Partner   │───►│ Bank/IMPS     │
│ Lending       │    │ (Clix Capital, │    │ Payout        │
│ Service       │    │  PayU, etc.)   │    │ Gateway       │
│               │◄───│                │◄───│               │
│ • Eligibility │    │ • KYC Check    │    │ • UTR Confirm │
│ • Underwrite  │    │ • Sanction     │    │ • Settle      │
│ • Passbook    │    │ • Agreement    │    │               │
└───────────────┘    └────────────────┘    └───────────────┘
```

### Daily Auto-Deduction Settlement
```
Morning 7:00 AM IST
┌──────────────────────────────────────────────────┐
│ 1. Aggregate previous day's QR/Soundbox revenue  │
│ 2. IF revenue > 0:                               │
│    • Deduct daily installment (₹596)             │
│    • Calculate net = revenue - installment       │
│    • IMPS transfer net to merchant bank           │
│ 3. IF revenue = 0 (shop closed):                 │
│    • Skip deduction (zero penalty)               │
│    • Log as "SKIPPED" in passbook                │
│ 4. Push settlement summary via WebSocket         │
│ 5. Optional: Send WhatsApp receipt               │
└──────────────────────────────────────────────────┘
```

---

## 12. Payment & Settlement Engine

### Settlement Reconciliation
```sql
-- Morning batch job: Generate daily settlement for each merchant with active loan
INSERT INTO loan_repayments (loan_id, day_number, date, qr_sales, deduction_amt, net_credit, status)
SELECT
  l.id,
  EXTRACT(DAY FROM (CURRENT_DATE - l.disbursed_at::date)) + 1,
  CURRENT_DATE,
  COALESCE(daily.total_revenue, 0),
  CASE WHEN COALESCE(daily.total_revenue, 0) >= l.daily_deduction
    THEN l.daily_deduction
    WHEN COALESCE(daily.total_revenue, 0) > 0
    THEN COALESCE(daily.total_revenue, 0)  -- Partial recovery
    ELSE 0                                  -- Zero sales day
  END,
  GREATEST(0, COALESCE(daily.total_revenue, 0) - l.daily_deduction),
  CASE
    WHEN COALESCE(daily.total_revenue, 0) = 0 THEN 'SKIPPED'
    WHEN COALESCE(daily.total_revenue, 0) < l.daily_deduction THEN 'PARTIAL'
    ELSE 'SUCCESS'
  END
FROM loans l
LEFT JOIN (
  SELECT merchant_id, SUM(amount) as total_revenue
  FROM transactions
  WHERE created_at >= CURRENT_DATE - INTERVAL '1 day'
    AND created_at < CURRENT_DATE
    AND status = 'SUCCESS'
  GROUP BY merchant_id
) daily ON daily.merchant_id = l.merchant_id
WHERE l.status = 'ACTIVE';
```

---

## 13. Voice & Vernacular Layer

### Voice Architecture
```
┌──────────┐    Web Speech API     ┌──────────────┐    ┌──────────────┐
│  Mic     │ ──────────────────►   │  Browser     │───►│  Voice NLU   │
│  Input   │    (Hindi STT)        │  Speech-to-  │    │  Service     │
│          │                       │  Text        │    │  (Python)    │
└──────────┘                       └──────────────┘    └──────┬───────┘
                                                              │
                                                              ▼
                                                       ┌──────────────┐
                                                       │  Intent      │
                                                       │  Router      │
                                                       │              │
                                                       │  "आज का      │
                                                       │   मुनाफा    │
                                                       │   बताओ"     │
                                                       │              │
                                                       │  Intent:     │
                                                       │  GET_PROFIT  │
                                                       └──────┬───────┘
                                                              │
                                                              ▼
                                                       ┌──────────────┐
                                                       │  Response    │
                                                       │  Generator   │
                                                       │  + TTS       │
                                                       └──────────────┘
```

### Supported Voice Intents
| Hindi Query | Intent | Action |
|:---|:---|:---|
| "आज का मुनाफा बताओ" | `GET_PROFIT` | Show today's revenue summary |
| "पिछले हफ्ते की बिक्री कितनी?" | `GET_WEEKLY_SALES` | Show 7-day trend |
| "50 ग्राहकों को ऑफर भेजो" | `SEND_CAMPAIGN` | Trigger WhatsApp campaign |
| "लोन की किस्त कितनी कटी?" | `GET_LOAN_STATUS` | Show loan repayment details |
| "मस्टर्ड ऑयल मंगवाओ" | `REORDER_STOCK` | Place stock reorder |

### i18n Architecture
```
i18n/
├── hi.json       → Primary (Hindi)
├── en.json       → English
├── hinglish.json → Hinglish (Latin script Hindi)
├── bn.json       → Bengali
├── ta.json       → Tamil
└── mr.json       → Marathi
```

Example translation keys:
```json
// hi.json
{
  "dashboard": {
    "greeting": "शुभ {{dayOfWeek}}, {{name}} जी",
    "todaysPulse": "आज का हिसाब • Today's Pulse",
    "totalPayments": "कुल पेमेंट्स (Received)",
    "avgBill": "औसत बिल (Avg Bill)"
  },
  "loans": {
    "preApproved": "₹{{amount}} Pre-Approved Loan",
    "dailyCut": "Daily QR Morning Cut",
    "noPenalty": "दुकान बंद रहने पर कोई पेनल्टी नहीं"
  }
}
```

---

## 14. State Management & Data Flow

### Zustand Store Architecture

```javascript
// Store hierarchy:
// authStore     → JWT tokens, login state, merchant identity
// merchantStore → Profile, store, bank, soundbox details (cached)
// dashboardStore → Pulse data, insights, actions (real-time)
// campaignStore → Campaigns, suggestions, templates (API-synced)
// loanStore     → Eligibility, active loan, statement (API-synced)
// uiStore       → Toast queue, drawer state, loading flags
```

### Data Flow Pattern
```
User Action (tap/voice)
       │
       ▼
Component → Hook → Zustand Store → API Service → Backend → DB
                                                     │
                                                     ▼
Component ← Hook ← Zustand Store ← React Query ← Response
       │
       ▼
UI Update (optimistic + confirmed)
```

---

## 15. Testing Strategy

### Testing Pyramid
```
                    ┌─────────┐
                    │  E2E    │  5 critical user journeys
                    │ (Cypress│  - Onboarding → Dashboard
                    │  /PW)   │  - Apply Loan → Disbursal
                    ├─────────┤  - Send Campaign → Analytics
                    │ Integr- │  20+ integration tests
                    │ ation   │  - API contract tests
                    │ Tests   │  - Store + API interaction
                    ├─────────┤
                    │  Unit   │  200+ unit tests
                    │  Tests  │  - Components (Vitest + RTL)
                    │ (Vitest)│  - Hooks, utils, stores
                    └─────────┘
```

### Key Test Scenarios
1. **Loan Calculator**: Slider input → correct daily deduction for all tenure/amount combos
2. **Settlement Logic**: Zero-sales day → no penalty, correct SKIPPED status
3. **Campaign Approval**: 1-tap approve → correct API call → status update in UI
4. **Auth Flow**: OTP → JWT → protected route access → token refresh
5. **Offline Resilience**: Network drop → cached data shown → queue actions for retry

---

## 16. Security & Compliance

### RBI & Financial Compliance
- **NBFC Partnership**: All lending via RBI-regulated NBFC partner (Clix Capital, PayU Finance)
- **KFS (Key Fact Statement)**: Mandatory display before loan agreement
- **Fair Practices Code**: Interest rate, penalties clearly disclosed
- **Grievance Redressal**: In-app support + RBI Ombudsman link
- **Data Localization**: All financial data stored in India (AWS Mumbai / GCP Mumbai)

### Data Security
| Layer | Measure |
|:---|:---|
| **Transport** | TLS 1.3, HSTS, Certificate Pinning |
| **Storage** | AES-256 encryption at rest for PII/financial data |
| **Auth** | JWT + httpOnly cookies, OTP with rate limiting |
| **API** | Rate limiting (100 req/min), request signing |
| **PII** | Customer phones stored as SHA-256 hashes |
| **Audit** | All financial operations logged with immutable audit trail |
| **Access** | RBAC with principle of least privilege |

### WhatsApp Compliance
- Meta Business API guidelines adherence
- Template pre-approval before sending
- User opt-in/opt-out management
- 24h session window for free-form messages

---

## 17. Performance & Optimization

### Performance Budget
| Metric | Target | Current |
|:---|:---|:---|
| **FCP** | <1.5s | ~0.8s (prototype, no API calls) |
| **LCP** | <2.5s | TBD (with real API) |
| **INP** | <200ms | TBD |
| **CLS** | <0.1 | ~0.02 |
| **Bundle Size** | <150KB gzipped | ~15KB (no framework) |
| **API Response** | <300ms p95 | N/A |
| **Time to Interactive** | <3s on 3G | TBD |

### Optimization Strategies
1. **Code Splitting**: Route-based lazy loading (`React.lazy`)
2. **API Caching**: React Query with stale-while-revalidate
3. **Image Optimization**: WebP/AVIF, responsive `srcset`
4. **Service Worker**: Cache-first for static assets, network-first for API
5. **Skeleton Screens**: Shimmer loading states for every data section
6. **Virtual Lists**: For loan statement timeline (100+ entries)
7. **Prefetching**: Predictive data loading on bottom nav hover

---

## 18. DevOps & Deployment

### CI/CD Pipeline
```
Push to main
     │
     ▼
┌────────────┐   ┌────────────┐   ┌────────────┐   ┌────────────┐
│   Lint     │──►│   Test     │──►│   Build    │──►│   Deploy   │
│  (ESLint)  │   │ (Vitest +  │   │ (Vite     │   │ (Staging / │
│            │   │  Cypress)  │   │  Build)    │   │  Prod)     │
└────────────┘   └────────────┘   └────────────┘   └────────────┘
```

### Environment Strategy
| Environment | Purpose | URL |
|:---|:---|:---|
| **Local** | Development | `localhost:5173` |
| **Dev** | Feature testing | `dev.pragati.paytm.com` |
| **Staging** | Pre-production | `staging.pragati.paytm.com` |
| **Production** | Live merchants | `pragati.paytm.com` |

### Infrastructure
- **Frontend**: CloudFront CDN + S3 (or Vercel/Netlify)
- **Backend**: AWS EKS (3-node cluster, auto-scaling 3-10 pods)
- **Database**: AWS RDS PostgreSQL (Multi-AZ, read replicas)
- **Cache**: ElastiCache Redis (cluster mode)
- **Queue**: AWS MSK (Managed Kafka)
- **Storage**: S3 (statements, KFS PDFs)

---

## 19. Monitoring & Observability

### Monitoring Stack
```
┌──────────────────────────────────────────────────┐
│                   Grafana                         │
│  ┌───────────┐ ┌───────────┐ ┌──────────────┐   │
│  │Prometheus │ │ Loki      │ │ Tempo        │   │
│  │ (Metrics) │ │ (Logs)    │ │ (Traces)     │   │
│  └───────────┘ └───────────┘ └──────────────┘   │
└──────────────────────────────────────────────────┘

┌──────────────┐   ┌──────────────┐
│   Sentry     │   │ PagerDuty    │
│ (Error Track)│   │ (Alerting)   │
└──────────────┘   └──────────────┘
```

### Key Dashboards
1. **Business Metrics**: MAU, loan book size, campaign volume, default rate
2. **System Health**: API latency p50/p95/p99, error rate, pod health
3. **Real-time Pipeline**: Kafka consumer lag, WebSocket connections
4. **Financial Ops**: Settlement success rate, IMPS failure rate

### Alert Rules
| Alert | Condition | Severity |
|:---|:---|:---|
| API Error Rate | >1% over 5min | P1 (Page) |
| Settlement Failure | >0.5% failures | P1 (Page) |
| Kafka Consumer Lag | >10K messages | P2 (Notify) |
| Database CPU | >80% for 10min | P2 (Notify) |
| Frontend Error Spike | >5x baseline in 15min | P2 (Notify) |

---

## 20. Rollout Strategy

### Phased Launch

| Phase | Timeline | Scope | Merchants |
|:---|:---|:---|:---|
| **Alpha** | Month 1-2 | Internal + 50 handpicked Kirana stores in Jaipur | 50 |
| **Beta** | Month 3-4 | Rajasthan (Jaipur, Jodhpur, Udaipur) | 5,000 |
| **V1 Launch** | Month 5-6 | Top 5 metros (Delhi, Mumbai, Bangalore, Hyderabad, Chennai) | 100,000 |
| **Scale** | Month 7-12 | Pan-India via Paytm for Business app integration | 2,000,000 |

### Feature Flag Matrix
| Feature | Alpha | Beta | V1 | Scale |
|:---|:---|:---|:---|:---|
| Dashboard + Pulse | ✅ | ✅ | ✅ | ✅ |
| WhatsApp Campaigns | ✅ | ✅ | ✅ | ✅ |
| Micro-Loans | ✅ | ✅ | ✅ | ✅ |
| Voice Assistant | ✅ | ✅ | ✅ | ✅ |
| Stock Predictions | ✅ | ✅ | ⏳ | ✅ |
| Multi-language (6) | ❌ | ✅ | ✅ | ✅ |
| Supplier Integration | ❌ | ❌ | ✅ | ✅ |
| Credit Score Sharing | ❌ | ❌ | ❌ | ✅ |

---

## 21. File Structure (Production)

```
paytm-pragati/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml              → Lint + Test + Build
│   │   ├── deploy-staging.yml  → Auto-deploy to staging
│   │   └── deploy-prod.yml     → Manual approval deploy
│   └── CODEOWNERS
│
├── apps/
│   ├── web/                    → React PWA (Vite)
│   │   ├── public/
│   │   │   ├── manifest.json   → PWA manifest
│   │   │   ├── sw.js           → Service Worker
│   │   │   └── icons/          → App icons (192, 512)
│   │   ├── src/                → [See Section 5.1 above]
│   │   ├── index.html
│   │   ├── vite.config.js
│   │   ├── tailwind.config.js
│   │   └── package.json
│   │
│   └── server/                 → Fastify Backend
│       ├── src/
│       │   ├── app.js
│       │   ├── routes/
│       │   ├── services/
│       │   ├── models/
│       │   ├── middleware/
│       │   ├── jobs/           → Cron: settlement, insights
│       │   └── utils/
│       ├── prisma/
│       │   └── schema.prisma
│       ├── tests/
│       └── package.json
│
├── packages/
│   ├── shared-types/           → TypeScript types shared FE ↔ BE
│   └── design-tokens/          → CSS/JS design tokens
│
├── infra/
│   ├── terraform/              → Infrastructure as Code
│   ├── k8s/                    → Kubernetes manifests
│   └── docker/
│       ├── Dockerfile.web
│       └── Dockerfile.server
│
├── docs/
│   ├── api/                    → OpenAPI specs
│   ├── architecture/           → ADRs (Architecture Decision Records)
│   └── runbooks/               → Operational procedures
│
├── context.md                  → THIS FILE
├── README.md
├── package.json                → Workspace root (npm workspaces)
├── turbo.json                  → Turborepo config
└── .env.example
```

---

## 22. Key Technical Decisions

### ADR-001: React over Vanilla JS
**Decision**: Migrate from Vanilla JS to React 18  
**Rationale**: Component model enables reuse, hooks for data fetching, ecosystem (React Query, Zustand), hiring pool, testing (React Testing Library)  
**Trade-off**: ~50KB bundle increase, but offset by code splitting  

### ADR-002: Zustand over Redux
**Decision**: Use Zustand for state management  
**Rationale**: Minimal boilerplate, no providers, works outside React, TypeScript-friendly, <2KB  
**Trade-off**: Less opinionated than Redux Toolkit, requires team discipline  

### ADR-003: Hash Router → Browser Router
**Decision**: Keep hash routing for Phase 1, migrate to browser router in Phase 2  
**Rationale**: Hash routing works without server-side routing config, simpler CDN deployment  
**Migration**: Add `historyApiFallback` in server config when ready  

### ADR-004: PostgreSQL + TimescaleDB over MongoDB
**Decision**: Use PostgreSQL with TimescaleDB extension  
**Rationale**: Financial data requires ACID compliance, time-series for transaction analytics, mature ecosystem, excellent JSON support when needed  

### ADR-005: Daily Auto-Deduction Architecture
**Decision**: Deduct loan repayment from daily QR settlement, not from bank account  
**Rationale**: Zero behavioral friction (merchant doesn't feel the deduction), virtually eliminates default risk, aligns with cashflow  
**Compliance**: NBFC partner agreement covers this settlement waterfall model  

### ADR-006: TailwindCSS CDN → npm Package
**Decision**: Replace CDN `<script>` with npm-installed TailwindCSS  
**Rationale**: CDN adds ~300KB at runtime, no tree-shaking, no custom plugins, not production-grade  
**Migration**: Move `tailwind.config` from inline `<script>` to `tailwind.config.js`  

---

## 23. Risk Matrix & Mitigations

| Risk | Impact | Probability | Mitigation |
|:---|:---|:---|:---|
| **NBFC partner delays** | High | Medium | Pre-sign 2 NBFC partners, have fallback |
| **WhatsApp template rejection** | Medium | Medium | Pre-test templates, maintain 5+ approved variants |
| **Default rate spike** | Critical | Low | Daily deduction model + credit scoring + early warning |
| **Soundbox data quality** | High | Medium | Fallback to QR-only data, data validation pipeline |
| **Regulatory changes** | High | Low | Legal team on retainer, modular compliance layer |
| **Scale bottleneck** | High | Medium | Load testing at 10x target, horizontal scaling |
| **Hindi STT accuracy** | Medium | High | Fallback to typed input, crowd-sourced correction |
| **Network reliability** | Medium | High | Offline-first PWA, queue-and-retry architecture |

---

## Appendix A: Environment Variables

```env
# Frontend (.env)
VITE_API_BASE_URL=https://api.pragati.paytm.com
VITE_WS_URL=wss://ws.pragati.paytm.com
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx
VITE_GA_ID=G-XXXXXXXXXX

# Backend (.env)
DATABASE_URL=postgresql://user:pass@host:5432/pragati
REDIS_URL=redis://host:6379
KAFKA_BROKERS=broker1:9092,broker2:9092
META_WABA_TOKEN=EAAG...
META_WABA_PHONE_ID=123456789
JWT_SECRET=<256-bit-secret>
NBFC_API_KEY=<partner-key>
SENTRY_DSN=https://xxx@sentry.io/xxx
```

---

## Appendix B: API Response Standards

```json
// Success Response
{
  "status": "success",
  "data": { /* payload */ },
  "meta": {
    "requestId": "req_abc123",
    "timestamp": "2026-09-14T15:42:00Z"
  }
}

// Error Response  
{
  "status": "error",
  "error": {
    "code": "LOAN_LIMIT_EXCEEDED",
    "message": "Requested amount exceeds pre-approved limit",
    "messageHi": "अनुरोधित राशि पूर्व-स्वीकृत सीमा से अधिक है",
    "details": { "maxAllowed": 150000, "requested": 200000 }
  },
  "meta": {
    "requestId": "req_abc124",
    "timestamp": "2026-09-14T15:42:01Z"
  }
}
```

---

> **Note**: This document is a living spec. Updates will be tracked via Git history. For implementation prioritization, refer to the `implementation_plan.md`.
