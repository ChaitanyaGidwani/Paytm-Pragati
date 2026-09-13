// ========================================
// Hash-based Client-side Router
// ========================================

const routes = {};
let currentView = null;
let contentEl = null;

export function registerRoute(path, renderFn) {
  routes[path] = renderFn;
}

export function navigate(path) {
  window.location.hash = path;
}

export function getCurrentRoute() {
  const hash = window.location.hash.slice(1) || '/dashboard';
  return hash;
}

export function initRouter(mountSelector) {
  contentEl = document.querySelector(mountSelector);

  const handleRoute = () => {
    const path = getCurrentRoute();
    const renderFn = routes[path] || routes['/dashboard'];

    if (renderFn) {
      // Clear current content
      if (contentEl) {
        contentEl.innerHTML = '';
        const view = renderFn();
        if (typeof view === 'string') {
          contentEl.innerHTML = view;
        } else if (view instanceof HTMLElement) {
          contentEl.appendChild(view);
        }

        // Animate in
        contentEl.classList.add('view-enter');
        requestAnimationFrame(() => {
          contentEl.classList.remove('view-enter');
          contentEl.classList.add('view-active');
        });

        // Update bottom nav
        updateBottomNav(path);

        // Scroll to top
        window.scrollTo(0, 0);
      }
    }
  };

  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

function updateBottomNav(path) {
  const navLinks = document.querySelectorAll('[data-nav-path]');
  navLinks.forEach(link => {
    const navPath = link.getAttribute('data-nav-path');
    const isActive = path === navPath ||
      (navPath === '/dashboard' && (path === '/' || path === '/dashboard'));

    if (isActive) {
      link.classList.add('text-primary-container', 'font-bold');
      link.classList.remove('text-on-surface-variant');
    } else {
      link.classList.remove('text-primary-container', 'font-bold');
      link.classList.add('text-on-surface-variant');
    }
  });
}
