// ========================================
// Toast Notification System
// ========================================

let toastTimeout = null;

export function showToast(message) {
  let toast = document.getElementById('global-toast');

  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] bg-inverse-surface text-inverse-on-surface px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 font-body text-body-sm whitespace-nowrap toast-enter';
    toast.style.maxWidth = '390px';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span class="material-symbols-outlined text-whatsapp-green text-[18px]">check_circle</span>
    <span>${message}</span>
  `;

  toast.classList.remove('hidden', 'toast-exit');
  toast.classList.add('flex', 'toast-enter');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('toast-enter');
    toast.classList.add('toast-exit');
    setTimeout(() => {
      toast.classList.add('hidden');
      toast.classList.remove('flex', 'toast-exit');
    }, 300);
  }, 3000);
}
