/**
 * @file access-control.js
 * @description Handles session validation, UI visibility, and data filtering based on user roles.
 */

// 1. Immediate Session Check
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser) {
  // Not logged in, redirect to login page
  window.location.href = 'login.html';
}

// 2. Access Control Logic
document.addEventListener('DOMContentLoaded', () => {
  applyUIPermissions(currentUser);
});

/**
 * Hides or shows UI elements based on the user's role.
 * @param {Object} user 
 */
function applyUIPermissions(user) {
  if (user.role !== 'admin') {
    // Elements to hide for non-admins
    const adminElements = [
      '#editToggleBtn',
      '#dataManagementPanel',
      '#editShapePanel',
      '#passwordManagePanel',
      '.admin-only' // Any other elements with this class
    ];

    adminElements.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.style.display = 'none';
        el.remove(); // Remove from DOM for extra security in UI
      });
    });

    // Update Topbar Text
    const modeInline = document.getElementById('modeInline');
    if (modeInline) {
      modeInline.textContent = `عرض فقط - ${user.fullName}`;
    }

    // Lock the Governorate filter if specific ones are assigned
    if (user.governorate && user.governorate !== 'all') {
      const filterGov = document.getElementById('filterGov');
      if (filterGov) {
        // If user has only ONE governorate, lock the filter.
        // If they have MULTIPLE, we allow them to switch between assigned ones (handled in index.html)
        if (!Array.isArray(user.governorate)) {
            filterGov.disabled = true;
        }
      }
    }
  } else {
    // Admin View
    const modeInline = document.getElementById('modeInline');
    if (modeInline) {
      modeInline.textContent = `مسؤول النظام - ${user.fullName}`;
    }
  }
}

/**
 * Logs the user out and clears the session.
 */
window.logout = function() {
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
};

/**
 * Helper to get assigned governorate(s) for filtering.
 * @returns {string|Array|null}
 */
window.getAssignedGovernorate = function() {
  return (currentUser && currentUser.role !== 'admin') ? currentUser.governorate : null;
};
