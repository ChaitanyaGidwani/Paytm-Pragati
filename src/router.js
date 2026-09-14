// ========================================
// Hash-based Client-side Router
// ========================================

import { isAuthenticated } from './store/appState.js';

const routes = {};
const routeOptions = {};
let currentView = null;
let contentEl = null;

export function registerRoute(path, renderFn, options = {}) {
  routes[path] = renderFn;
  routeOptions[path] = options;
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
    const options = routeOptions[path] || routeOptions['/dashboard'] || {};

    // Auth guard
    if (options.requiresAuth !== false && !isAuthenticated()) {
      window.location.hash = '#/login';
      return;
    }

    // If authenticated and trying to access login, redirect to dashboard
    if (path === '/login' && isAuthenticated()) {
      window.location.hash = '#/dashboard';
      return;
    }

    const renderFn = routes[path] || routes['/dashboard'];

    if (renderFn && contentEl) {
      // Clear current content with exit animation
      contentEl.classList.remove('view-active');
      contentEl.classList.add('view-exit');

      // Short delay for exit animation then render new view
      const renderDelay = currentView ? 100 : 0;
      setTimeout(() => {
        contentEl.innerHTML = '';
        contentEl.classList.remove('view-exit');

        const view = renderFn();
        if (typeof view === 'string') {
          contentEl.innerHTML = view;
        } else if (view instanceof HTMLElement) {
          contentEl.appendChild(view);
        }

        currentView = path;

        // Animate in
        contentEl.classList.add('view-enter');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            contentEl.classList.remove('view-enter');
            contentEl.classList.add('view-active');
          });
        });

        // Update bottom nav
        updateBottomNav(path);

        // Toggle bottom nav visibility
        const bottomNav = document.getElementById('bottom-nav');
        if (bottomNav) {
          if (options.hideNav) {
            bottomNav.classList.add('hidden');
          } else {
            bottomNav.classList.remove('hidden');
          }
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, renderDelay);
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

    const icon = link.querySelector('.material-symbols-outlined');

    if (isActive) {
      link.classList.add('text-primary-container', 'font-bold');
      link.classList.remove('text-on-surface-variant');
      // Fill the active icon
      if (icon) icon.style.fontVariationSettings = "'FILL' 1";
    } else {
      link.classList.remove('text-primary-container', 'font-bold');
      link.classList.add('text-on-surface-variant');
      if (icon) icon.style.fontVariationSettings = "'FILL' 0";
    }
  });
}
