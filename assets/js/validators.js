/**
 * CodeCraft - Form Validation Functions
 * Author: Bolt
 */

/**
 * Check if a value is empty
 * @param {string} value - Value to check
 * @returns {boolean} - True if value is empty
 */
function isEmpty(value) {
  return value === null || value === undefined || value.trim() === '';
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if email is valid
 */
function isValidEmail(email) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if phone number is valid
 */
function isValidPhone(phone) {
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return regex.test(String(phone));
}

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} - True if URL is valid
 */
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @param {Object} options - Validation options
 * @returns {Object} - Validation result with isValid flag and message
 */
function validatePassword(password, options = {}) {
  const defaults = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecial: true
  };
  
  const settings = { ...defaults, ...options };
  let message = '';
  
  // Check length
  if (password.length < settings.minLength) {
    message = `Password must be at least ${settings.minLength} characters long`;
    return { isValid: false, message };
  }
  
  // Check for uppercase letters
  if (settings.requireUppercase && !/[A-Z]/.test(password)) {
    message = 'Password must contain at least one uppercase letter';
    return { isValid: false, message };
  }
  
  // Check for lowercase letters
  if (settings.requireLowercase && !/[a-z]/.test(password)) {
    message = 'Password must contain at least one lowercase letter';
    return { isValid: false, message };
  }
  
  // Check for numbers
  if (settings.requireNumbers && !/[0-9]/.test(password)) {
    message = 'Password must contain at least one number';
    return { isValid: false, message };
  }
  
  // Check for special characters
  if (settings.requireSpecial && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    message = 'Password must contain at least one special character';
    return { isValid: false, message };
  }
  
  return { isValid: true, message: 'Password meets requirements' };
}

/**
 * Validate form input
 * @param {HTMLElement} formElement - Form element to validate
 * @returns {Object} - Validation result with isValid flag and errors
 */
function validateForm(formElement) {
  const inputs = formElement.querySelectorAll('input, textarea, select');
  let isValid = true;
  const errors = {};
  
  inputs.forEach(input => {
    const { name, value, type, required } = input;
    
    // Skip validation for non-required empty fields
    if (!required && isEmpty(value)) {
      return;
    }
    
    // Required field validation
    if (required && isEmpty(value)) {
      isValid = false;
      errors[name] = 'This field is required';
      return;
    }
    
    // Type-specific validation
    switch (type) {
      case 'email':
        if (!isValidEmail(value)) {
          isValid = false;
          errors[name] = 'Please enter a valid email address';
        }
        break;
        
      case 'tel':
        if (!isValidPhone(value)) {
          isValid = false;
          errors[name] = 'Please enter a valid phone number';
        }
        break;
        
      case 'url':
        if (!isValidUrl(value)) {
          isValid = false;
          errors[name] = 'Please enter a valid URL';
        }
        break;
        
      case 'password':
        const validation = validatePassword(value);
        if (!validation.isValid) {
          isValid = false;
          errors[name] = validation.message;
        }
        break;
    }
    
    // Custom validation based on data attributes
    if (input.dataset.minLength && value.length < parseInt(input.dataset.minLength, 10)) {
      isValid = false;
      errors[name] = `Must be at least ${input.dataset.minLength} characters long`;
    }
    
    if (input.dataset.maxLength && value.length > parseInt(input.dataset.maxLength, 10)) {
      isValid = false;
      errors[name] = `Must be no more than ${input.dataset.maxLength} characters long`;
    }
    
    if (input.dataset.pattern) {
      const regex = new RegExp(input.dataset.pattern);
      if (!regex.test(value)) {
        isValid = false;
        errors[name] = input.dataset.patternMessage || 'Invalid format';
      }
    }
  });
  
  return { isValid, errors };
}

/**
 * Display validation errors next to form fields
 * @param {HTMLElement} formElement - Form element
 * @param {Object} errors - Errors object from validateForm
 */
function displayValidationErrors(formElement, errors) {
  // Clear previous errors
  const errorElements = formElement.querySelectorAll('.invalid-feedback');
  errorElements.forEach(el => {
    el.textContent = '';
    el.style.display = 'none';
  });
  
  // Remove invalid class from all inputs
  const inputs = formElement.querySelectorAll('.is-invalid');
  inputs.forEach(input => {
    input.classList.remove('is-invalid');
  });
  
  // Display new errors
  Object.keys(errors).forEach(fieldName => {
    const field = formElement.querySelector(`[name="${fieldName}"]`);
    if (field) {
      field.classList.add('is-invalid');
      
      // Find or create error element
      let errorElement = formElement.querySelector(`[data-error-for="${fieldName}"]`);
      
      if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'invalid-feedback';
        errorElement.setAttribute('data-error-for', fieldName);
        field.parentNode.appendChild(errorElement);
      }
      
      errorElement.textContent = errors[fieldName];
      errorElement.style.display = 'block';
    }
  });
}

// Export all validator functions
export {
  isEmpty,
  isValidEmail,
  isValidPhone,
  isValidUrl,
  validatePassword,
  validateForm,
  displayValidationErrors
};