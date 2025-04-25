/**
 * CodeCraft - Custom Animations
 * Author: Bolt
 */

/**
 * Parallax effect for elements when scrolling
 * @param {string} selector - CSS selector for target elements
 * @param {number} speed - Effect speed (1 is default, higher values increase effect)
 */
function initParallax(selector = '.parallax', speed = 0.5) {
  const elements = document.querySelectorAll(selector);
  
  if (!elements.length) return;
  
  function updatePositions() {
    const scrollTop = window.pageYOffset;
    
    elements.forEach(element => {
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const screenHeight = window.innerHeight;
      
      // Check if element is in view
      if (
        scrollTop + screenHeight > elementTop &&
        scrollTop < elementTop + elementHeight
      ) {
        const yPos = (scrollTop - elementTop) * speed;
        element.style.transform = `translateY(${yPos}px)`;
      }
    });
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', () => {
    window.requestAnimationFrame(updatePositions);
  });
  
  // Initial position update
  updatePositions();
}

/**
 * Typewriter effect for text elements
 * @param {string} selector - CSS selector for target element
 * @param {Array} strings - Array of strings to type
 * @param {number} typeSpeed - Typing speed in milliseconds
 * @param {number} backSpeed - Backspace speed in milliseconds
 * @param {number} backDelay - Delay before backspacing in milliseconds
 * @param {boolean} loop - Whether to loop through strings
 */
function initTypewriter(selector, strings = [], options = {}) {
  const element = document.querySelector(selector);
  if (!element || !strings.length) return;
  
  const defaults = {
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 1500,
    loop: true,
    startDelay: 700
  };
  
  const settings = { ...defaults, ...options };
  let currentStringIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let timeout;
  
  function type() {
    const currentString = strings[currentStringIndex];
    const currentText = currentString.substring(0, currentCharIndex);
    
    element.textContent = currentText;
    
    // If in deleting state
    if (isDeleting) {
      currentCharIndex--;
    } else {
      currentCharIndex++;
    }
    
    // If completed typing current string
    if (!isDeleting && currentCharIndex === currentString.length) {
      isDeleting = true;
      timeout = setTimeout(type, settings.backDelay);
    }
    // If completed deleting current string
    else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentStringIndex = (currentStringIndex + 1) % strings.length;
      
      // If reached the end and loop is false, stop
      if (currentStringIndex === 0 && !settings.loop) {
        return;
      }
      
      timeout = setTimeout(type, settings.startDelay);
    }
    // Continue typing or deleting
    else {
      const typingSpeed = isDeleting ? settings.backSpeed : settings.typeSpeed;
      timeout = setTimeout(type, typingSpeed);
    }
  }
  
  // Start the typewriter effect
  clearTimeout(timeout);
  setTimeout(type, settings.startDelay);
}

/**
 * Fade-in animation when elements enter viewport
 * @param {string} selector - CSS selector for target elements
 * @param {Object} options - Animation options
 */
function initFadeIn(selector = '.fade-in', options = {}) {
  const defaults = {
    threshold: 0.1,
    rootMargin: '0px',
    duration: '1s',
    easing: 'ease',
    delay: '0s'
  };
  
  const settings = { ...defaults, ...options };
  const elements = document.querySelectorAll(selector);
  
  if (!elements.length) return;
  
  // Set initial styles
  elements.forEach(element => {
    element.style.opacity = '0';
    element.style.transition = `opacity ${settings.duration} ${settings.easing} ${settings.delay}`;
  });
  
  // Create intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: settings.threshold,
    rootMargin: settings.rootMargin
  });
  
  // Observe elements
  elements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Counter animation for number elements
 * @param {string} selector - CSS selector for target elements
 * @param {Object} options - Animation options
 */
function initCounter(selector = '.counter', options = {}) {
  const defaults = {
    duration: 2000,
    easing: 'easeOutExpo'
  };
  
  const settings = { ...defaults, ...options };
  const elements = document.querySelectorAll(selector);
  
  if (!elements.length) return;
  
  // Easing functions
  const easings = {
    linear: t => t,
    easeInQuad: t => t * t,
    easeOutQuad: t => t * (2 - t),
    easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeOutExpo: t => (t === 1) ? 1 : 1 - Math.pow(2, -10 * t)
  };
  
  // Animate counter
  function animateCounter(element, target, duration) {
    const start = 0;
    const startTime = performance.now();
    const easingFn = easings[settings.easing] || easings.easeOutExpo;
    
    function updateCount(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easingFn(progress);
      const value = Math.floor(easedProgress * (target - start) + start);
      
      element.textContent = value.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    }
    
    requestAnimationFrame(updateCount);
  }
  
  // Create intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target') || '0', 10);
        animateCounter(entry.target, target, settings.duration);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  // Observe elements
  elements.forEach(element => {
    observer.observe(element);
  });
}

// Export all animation functions
export {
  initParallax,
  initTypewriter,
  initFadeIn,
  initCounter
};