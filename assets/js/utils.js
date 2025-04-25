/**
 * CodeCraft - Utility Functions
 * Author: Bolt
 */

/**
 * Throttle function to limit the rate at which a function can fire
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Debounce function to group multiple sequential calls into a single execution
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, delay) {
  let debounceTimer;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
}

/**
 * Check if an element is in viewport
 * @param {HTMLElement} el - Element to check
 * @param {number} offset - Offset in pixels
 * @returns {boolean} - True if element is in viewport
 */
function isInViewport(el, offset = 0) {
  if (!el) return false;
  
  const rect = el.getBoundingClientRect();
  
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) + offset &&
    rect.bottom >= 0 - offset &&
    rect.right >= 0 - offset
  );
}

/**
 * Add event listener with options
 * @param {HTMLElement} element - Element to add listener to
 * @param {string} type - Event type
 * @param {Function} handler - Event handler
 * @param {Object} options - Options object
 */
function addEvent(element, type, handler, options = {}) {
  if (element.addEventListener) {
    element.addEventListener(type, handler, options);
  } else if (element.attachEvent) {
    element.attachEvent('on' + type, handler);
  } else {
    element['on' + type] = handler;
  }
}

/**
 * Create an element with attributes and children
 * @param {string} tag - Tag name
 * @param {Object} attrs - Attributes object
 * @param {Array} children - Array of child nodes
 * @returns {HTMLElement} - Created element
 */
function createElement(tag, attrs = {}, children = []) {
  const element = document.createElement(tag);
  
  // Set attributes
  Object.keys(attrs).forEach(key => {
    if (key === 'class' || key === 'className') {
      element.className = attrs[key];
    } else if (key === 'style' && typeof attrs[key] === 'object') {
      Object.assign(element.style, attrs[key]);
    } else {
      element.setAttribute(key, attrs[key]);
    }
  });
  
  // Append children
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      element.appendChild(child);
    }
  });
  
  return element;
}

/**
 * Fetch data with error handling
 * @param {string} url - URL to fetch
 * @param {Object} options - Fetch options
 * @returns {Promise} - Fetch promise
 */
async function fetchData(url, options = {}) {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// Export all utility functions
export {
  throttle,
  debounce,
  isInViewport,
  addEvent,
  createElement,
  fetchData
};