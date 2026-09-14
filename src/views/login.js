// ========================================
// Login & OTP Verification View
// ========================================

import { store, login } from '../store/appState.js';
import { sendOTP, verifyOTP } from '../services/apiService.js';
import { showToast } from '../components/toast.js';
import { navigate } from '../router.js';

export function renderLogin() {
  const html = `
    <main class="flex flex-col min-h-screen bg-gradient-to-b from-[#001645] via-[#002970] to-[#003d99] relative overflow-hidden">
      <!-- Background decorative elements -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-secondary-container/8 blur-3xl"></div>
        <div class="absolute bottom-40 -left-20 w-56 h-56 rounded-full bg-whatsapp-green/6 blur-3xl"></div>
        <div class="absolute top-1/2 right-10 w-32 h-32 rounded-full bg-secondary/10 blur-2xl"></div>
      </div>

      <!-- Top safe area + Logo -->
      <div class="flex-shrink-0 pt-safe px-6 pt-12 pb-6 relative z-10">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/10">
            <svg viewBox="0 0 200 60" class="w-6 h-auto">
              <rect width="200" height="60" rx="8" fill="#ffffff"/>
              <text x="12" y="28" font-family="Plus Jakarta Sans, sans-serif" font-weight="800" font-size="14" fill="#002970">Paytm</text>
              <text x="12" y="46" font-family="Noto Sans, sans-serif" font-weight="600" font-size="10" fill="#006686">for Business AI</text>
            </svg>
          </div>
          <div>
            <h1 class="font-headline text-headline-sm text-white leading-tight tracking-tight">Paytm Pragati</h1>
            <p class="font-label text-label-sm text-blue-200/70">पेटीएम प्रगति • Merchant Growth AI</p>
          </div>
        </div>
      </div>

      <!-- Hero Section -->
      <div class="flex-shrink-0 px-6 pb-8 relative z-10">
        <h2 class="font-headline text-headline-lg text-white leading-snug tracking-tight">
          अपने व्यापार को<br>
          <span class="text-[#2bc6ff]">AI की शक्ति</span> से बढ़ाएं
        </h2>
        <p class="font-body text-body-md text-blue-200/70 mt-2 leading-relaxed max-w-sm">
          Soundbox & QR data से smart insights, WhatsApp campaigns, और instant loans — सब एक जगह।
        </p>

        <!-- Feature pills -->
        <div class="flex flex-wrap gap-2 mt-4">
          <span class="inline-flex items-center gap-1.5 bg-white/8 backdrop-blur-sm border border-white/10 text-blue-100 px-3 py-1.5 rounded-full font-label text-label-sm">
            <span class="material-symbols-outlined text-[14px] text-[#2bc6ff]">smart_toy</span>
            AI Copilot
          </span>
          <span class="inline-flex items-center gap-1.5 bg-white/8 backdrop-blur-sm border border-white/10 text-blue-100 px-3 py-1.5 rounded-full font-label text-label-sm">
            <span class="material-symbols-outlined text-[14px] text-whatsapp-green">chat</span>
            WhatsApp Bot
          </span>
          <span class="inline-flex items-center gap-1.5 bg-white/8 backdrop-blur-sm border border-white/10 text-blue-100 px-3 py-1.5 rounded-full font-label text-label-sm">
            <span class="material-symbols-outlined text-[14px] text-[#ffb74d]">account_balance</span>
            Instant Loans
          </span>
        </div>
      </div>

      <!-- Login Form Card -->
      <div class="flex-1 bg-white rounded-t-[28px] px-6 pt-8 pb-safe relative z-10 shadow-[0_-8px_40px_rgba(0,0,0,0.2)]" id="login-form-container">
        
        <!-- Phone Number Step -->
        <div id="phone-step">
          <div class="flex items-center gap-2 mb-1">
            <span class="material-symbols-outlined text-primary text-[22px]">phone_android</span>
            <h3 class="font-headline text-headline-sm text-on-surface">मर्चेंट लॉगिन</h3>
          </div>
          <p class="font-body text-body-sm text-on-surface-variant mb-6">
            अपने Paytm Business रजिस्टर्ड मोबाइल नंबर से लॉगिन करें
          </p>

          <div class="space-y-4">
            <div>
              <label class="font-label text-label-md text-on-surface-variant block mb-2">Mobile Number / मोबाइल नंबर</label>
              <div class="flex items-center gap-2">
                <div class="flex items-center gap-1 bg-surface-container-low px-3 py-3.5 rounded-xl text-on-surface-variant font-label text-label-lg font-semibold border border-outline-variant/30 flex-shrink-0">
                  <span class="text-[16px]">🇮🇳</span>
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  id="phone-input"
                  maxlength="10"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  placeholder="98765 43210"
                  autocomplete="tel"
                  class="flex-1 bg-surface-container-low px-4 py-3.5 rounded-xl font-body text-body-lg text-on-surface placeholder:text-outline-variant border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all tracking-widest"
                />
              </div>
            </div>

            <button
              id="send-otp-btn"
              class="w-full h-14 rounded-xl bg-[#002970] text-white font-headline text-headline-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              <span>OTP भेजें</span>
              <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>

            <p class="text-center font-body text-body-sm text-outline">
              लॉगिन करके आप Paytm की <span class="text-primary cursor-pointer">Terms of Service</span> और <span class="text-primary cursor-pointer">Privacy Policy</span> से सहमत होते हैं।
            </p>
          </div>
        </div>

        <!-- OTP Verification Step (hidden initially) -->
        <div id="otp-step" class="hidden">
          <button class="flex items-center gap-1 text-primary mb-4 font-label text-label-md active:opacity-70" id="back-to-phone">
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>नंबर बदलें</span>
          </button>

          <div class="flex items-center gap-2 mb-1">
            <span class="material-symbols-outlined text-primary text-[22px]">lock</span>
            <h3 class="font-headline text-headline-sm text-on-surface">OTP दर्ज करें</h3>
          </div>
          <p class="font-body text-body-sm text-on-surface-variant mb-1">
            6-अंकों का कोड <span class="font-semibold text-on-surface" id="otp-phone-display">+91 98765 43210</span> पर भेजा गया
          </p>
          <p class="font-label text-label-sm text-success-green mb-5 flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">info</span>
            डेमो के लिए कोई भी 6-अंकों का OTP डालें (जैसे 123456)
          </p>

          <div class="flex justify-center gap-3 mb-6" id="otp-inputs">
            <input type="tel" maxlength="1" inputmode="numeric" class="otp-box w-12 h-14 text-center font-headline text-headline-md bg-surface-container-low rounded-xl border-2 border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" data-idx="0" />
            <input type="tel" maxlength="1" inputmode="numeric" class="otp-box w-12 h-14 text-center font-headline text-headline-md bg-surface-container-low rounded-xl border-2 border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" data-idx="1" />
            <input type="tel" maxlength="1" inputmode="numeric" class="otp-box w-12 h-14 text-center font-headline text-headline-md bg-surface-container-low rounded-xl border-2 border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" data-idx="2" />
            <input type="tel" maxlength="1" inputmode="numeric" class="otp-box w-12 h-14 text-center font-headline text-headline-md bg-surface-container-low rounded-xl border-2 border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" data-idx="3" />
            <input type="tel" maxlength="1" inputmode="numeric" class="otp-box w-12 h-14 text-center font-headline text-headline-md bg-surface-container-low rounded-xl border-2 border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" data-idx="4" />
            <input type="tel" maxlength="1" inputmode="numeric" class="otp-box w-12 h-14 text-center font-headline text-headline-md bg-surface-container-low rounded-xl border-2 border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" data-idx="5" />
          </div>

          <button
            id="verify-otp-btn"
            class="w-full h-14 rounded-xl bg-[#002970] text-white font-headline text-headline-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-50"
            disabled
          >
            <span class="material-symbols-outlined text-[20px]">verified_user</span>
            <span>Verify & Login</span>
          </button>

          <div class="mt-4 text-center">
            <p class="font-body text-body-sm text-outline" id="resend-text">
              OTP नहीं मिला? <span class="text-primary cursor-pointer font-semibold" id="resend-otp-link">पुनः भेजें (<span id="resend-timer">60</span>s)</span>
            </p>
          </div>
        </div>

        <!-- Trust Badges -->
        <div class="mt-8 pt-4 border-t border-surface-container flex items-center justify-center gap-4 flex-wrap">
          <span class="inline-flex items-center gap-1 font-label text-label-sm text-outline">
            <span class="material-symbols-outlined text-success-green text-[14px]">lock</span>
            256-Bit Encrypted
          </span>
          <span class="inline-flex items-center gap-1 font-label text-label-sm text-outline">
            <span class="material-symbols-outlined text-secondary text-[14px]">account_balance</span>
            RBI Regulated
          </span>
          <span class="inline-flex items-center gap-1 font-label text-label-sm text-outline">
            <span class="material-symbols-outlined text-success-green text-[14px]">shield</span>
            0 Data Sharing
          </span>
        </div>
      </div>
    </main>
  `;

  setTimeout(() => initLoginListeners(), 50);
  return html;
}

function initLoginListeners() {
  const phoneInput = document.getElementById('phone-input');
  const sendOtpBtn = document.getElementById('send-otp-btn');
  const phoneStep = document.getElementById('phone-step');
  const otpStep = document.getElementById('otp-step');
  const verifyBtn = document.getElementById('verify-otp-btn');
  const backBtn = document.getElementById('back-to-phone');
  const otpPhoneDisplay = document.getElementById('otp-phone-display');

  // Phone input validation
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      // Only allow digits
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
      const isValid = e.target.value.length === 10;
      sendOtpBtn.disabled = !isValid;
      if (isValid) {
        sendOtpBtn.classList.add('shadow-xl');
      } else {
        sendOtpBtn.classList.remove('shadow-xl');
      }
    });

    phoneInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && phoneInput.value.length === 10) {
        sendOtpBtn.click();
      }
    });
  }

  // Send OTP
  if (sendOtpBtn) {
    sendOtpBtn.addEventListener('click', async () => {
      const phone = phoneInput.value;
      sendOtpBtn.disabled = true;
      sendOtpBtn.innerHTML = '<span class="material-symbols-outlined text-[20px] animate-spin">progress_activity</span> भेज रहे हैं...';

      const result = await sendOTP(phone);

      if (result.status === 'success') {
        phoneStep.classList.add('hidden');
        otpStep.classList.remove('hidden');
        otpPhoneDisplay.textContent = '+91 ' + phone.replace(/(\d{5})(\d{5})/, '$1 $2');

        // Focus first OTP box
        const firstBox = document.querySelector('.otp-box[data-idx="0"]');
        if (firstBox) firstBox.focus();

        // Start resend timer
        startResendTimer();

        showToast('📱 OTP भेज दिया गया!');
      } else {
        showToast(result.error.messageHi || result.error.message);
        sendOtpBtn.disabled = false;
        sendOtpBtn.innerHTML = '<span>OTP भेजें</span><span class="material-symbols-outlined text-[20px]">arrow_forward</span>';
      }
    });
  }

  // OTP input boxes auto-advance
  const otpBoxes = document.querySelectorAll('.otp-box');
  otpBoxes.forEach((box, idx) => {
    box.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 1);
      if (e.target.value && idx < 5) {
        otpBoxes[idx + 1].focus();
      }
      checkOTPComplete();
    });

    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !e.target.value && idx > 0) {
        otpBoxes[idx - 1].focus();
        otpBoxes[idx - 1].value = '';
      }
    });

    box.addEventListener('paste', (e) => {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 6);
      text.split('').forEach((char, i) => {
        if (otpBoxes[i]) otpBoxes[i].value = char;
      });
      if (text.length === 6) {
        otpBoxes[5].focus();
        checkOTPComplete();
      }
    });
  });

  function checkOTPComplete() {
    const otp = Array.from(otpBoxes).map(b => b.value).join('');
    verifyBtn.disabled = otp.length !== 6;
  }

  // Verify OTP
  if (verifyBtn) {
    verifyBtn.addEventListener('click', async () => {
      const otp = Array.from(otpBoxes).map(b => b.value).join('');
      const phone = phoneInput.value;

      verifyBtn.disabled = true;
      verifyBtn.innerHTML = '<span class="material-symbols-outlined text-[20px] animate-spin">progress_activity</span> Verifying...';

      const result = await verifyOTP(phone, otp);

      if (result.status === 'success') {
        login(phone, result.data.token);

        verifyBtn.classList.remove('bg-[#002970]');
        verifyBtn.classList.add('bg-success-green');
        verifyBtn.innerHTML = '<span class="material-symbols-outlined text-[20px]">check_circle</span> सफल! डैशबोर्ड लोड हो रहा है...';

        showToast('🎉 लॉगिन सफल! स्वागत है राजेश जी');

        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        showToast(result.error.messageHi || result.error.message);
        verifyBtn.disabled = false;
        verifyBtn.innerHTML = '<span class="material-symbols-outlined text-[20px]">verified_user</span> Verify & Login';
        // Shake OTP boxes
        otpBoxes.forEach(b => {
          b.classList.add('border-error', 'animate-shake');
          setTimeout(() => b.classList.remove('border-error', 'animate-shake'), 600);
        });
      }
    });
  }

  // Back button
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      otpStep.classList.add('hidden');
      phoneStep.classList.remove('hidden');
      sendOtpBtn.disabled = false;
      sendOtpBtn.innerHTML = '<span>OTP भेजें</span><span class="material-symbols-outlined text-[20px]">arrow_forward</span>';
    });
  }

  // Resend OTP
  function startResendTimer() {
    let seconds = 60;
    const timerEl = document.getElementById('resend-timer');
    const resendLink = document.getElementById('resend-otp-link');

    if (resendLink) resendLink.style.pointerEvents = 'none';

    const interval = setInterval(() => {
      seconds--;
      if (timerEl) timerEl.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(interval);
        if (resendLink) {
          resendLink.style.pointerEvents = 'auto';
          resendLink.innerHTML = 'पुनः भेजें';
          resendLink.addEventListener('click', async () => {
            const result = await sendOTP(phoneInput.value);
            if (result.status === 'success') {
              showToast('📱 OTP पुनः भेज दिया गया!');
              startResendTimer();
            }
          }, { once: true });
        }
      }
    }, 1000);
  }
}
