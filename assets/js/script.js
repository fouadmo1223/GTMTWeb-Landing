/**
 * CodeCraft - Software Company Website
 * Author: Bolt
 */

// Initialize AOS (Animate on Scroll)
function initAOS() {
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
}

// Initialize Swiper for Work Portfolio
function initWorkSwiper() {
  const workSwiper = new Swiper('.work-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      }
    }
  });
}

// Initialize Swiper for Testimonials
function initTestimonialsSwiper() {
  const testimonialSwiper = new Swiper('.testimonial-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      }
    }
  });
}

// Header scroll effect
function headerScrollEffect() {
  const header = document.getElementById('header');
  const scrollTrigger = 100;

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollTrigger) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });
}

// Portfolio/Work filtering functionality
function initWorkFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workItems = document.querySelectorAll('.work-item');

  // Set all to active initially
  const workSwiper = document.querySelector('.work-swiper').swiper;
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      btn.classList.add('active');
      
      // Get filter value
      const filterValue = btn.getAttribute('data-filter');
      
      // Filter work items
      workItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filterValue === 'all' || filterValue === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
      
      // Update swiper after filtering
      workSwiper.update();
    });
  });
}

// Form validation
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Simple validation
      let valid = true;
      const inputs = contactForm.querySelectorAll('input, textarea');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('is-invalid');
          valid = false;
        } else {
          input.classList.remove('is-invalid');
        }
      });
      
      // Email validation
      const emailField = document.getElementById('email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!emailRegex.test(email)) {
        emailField.classList.add('is-invalid');
        valid = false;
      }
      
      if (valid) {
        // In a real implementation, you would send the form data to a server
        // For this demo, we'll just show a success message
        formMessage.innerHTML = '<div class="alert alert-success">Your message has been sent. Thank you!</div>';
        contactForm.reset();
        
        // Hide the success message after 5 seconds
        setTimeout(() => {
          formMessage.innerHTML = '';
        }, 5000);
      } else {
        formMessage.innerHTML = '<div class="alert alert-danger">Please fill in all required fields correctly.</div>';
      }
    });
    
    // Live validation as user types
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', function() {
        if (this.value.trim()) {
          this.classList.remove('is-invalid');
        }
      });
    });
    
    // Email validation as user types
    const emailField = document.getElementById('email');
    emailField.addEventListener('input', function() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (this.value && !emailRegex.test(this.value)) {
        this.classList.add('is-invalid');
      } else if (this.value) {
        this.classList.remove('is-invalid');
      }
    });
  }
}

// Mobile nav toggler
function initMobileNav() {
  const navLinks = document.querySelectorAll('.nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992) {
        navbarCollapse.classList.remove('show');
      }
    });
  });
}

// Back to top button
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = 'flex';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });
    
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// Initialize all functions when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initAOS();
  initWorkSwiper();
  initTestimonialsSwiper();
  headerScrollEffect();
  initWorkFilter();
  initContactForm();
  initMobileNav();
  initBackToTop();
  
  // Add smooth scrolling to all links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Handle window resize events
window.addEventListener('resize', () => {
  AOS.refresh();
});