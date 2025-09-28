/*
  MIT License
  Copyright (c) 2025 ScriptedWebs
*/



/**
 * MedCare Hospital - Forms JavaScript
 * Handles form validation, submission, and interactive form elements
 */

(function() {
    'use strict';

    // Form state
    const formState = {
        appointmentForm: null,
        contactForm: null,
        isSubmitting: false
    };

    // Department to doctor mapping
    const departmentDoctors = {
        'cardiology': [
            { value: 'sarah-mitchell', text: 'Dr. Sarah Mitchell' },
            { value: 'robert-chen', text: 'Dr. Robert Chen' },
            { value: 'maria-gonzalez', text: 'Dr. Maria Gonzalez' }
        ],
        'pediatrics': [
            { value: 'emily-chen', text: 'Dr. Emily Chen' },
            { value: 'david-kim', text: 'Dr. David Kim' },
            { value: 'lisa-patel', text: 'Dr. Lisa Patel' }
        ],
        'orthopedics': [
            { value: 'michael-rodriguez', text: 'Dr. Michael Rodriguez' },
            { value: 'jennifer-wong', text: 'Dr. Jennifer Wong' },
            { value: 'thomas-brown', text: 'Dr. Thomas Brown' }
        ],
        'neurology': [
            { value: 'amanda-taylor', text: 'Dr. Amanda Taylor' },
            { value: 'james-wilson', text: 'Dr. James Wilson' },
            { value: 'rachel-davis', text: 'Dr. Rachel Davis' }
        ],
        'oncology': [
            { value: 'steven-lee', text: 'Dr. Steven Lee' },
            { value: 'patricia-martinez', text: 'Dr. Patricia Martinez' },
            { value: 'kevin-anderson', text: 'Dr. Kevin Anderson' }
        ],
        'womens-health': [
            { value: 'michelle-johnson', text: 'Dr. Michelle Johnson' },
            { value: 'laura-thompson', text: 'Dr. Laura Thompson' },
            { value: 'stephanie-white', text: 'Dr. Stephanie White' }
        ],
        'emergency': [
            { value: 'emergency-team', text: 'Emergency Team' }
        ],
        'internal-medicine': [
            { value: 'sarah-mitchell', text: 'Dr. Sarah Mitchell' },
            { value: 'john-smith', text: 'Dr. John Smith' },
            { value: 'mary-jones', text: 'Dr. Mary Jones' }
        ]
    };

    /**
     * Initialize forms functionality
     */
    function init() {
        cacheElements();
        setupEventListeners();
        initializeFormValidation();
        setupDependentDropdowns();
        setupPhoneFormatting();
        
        console.log('Forms module initialized');
    }

    /**
     * Cache form elements
     */
    function cacheElements() {
        formState.appointmentForm = document.getElementById('appointment-form');
        formState.contactForm = document.getElementById('contact-form');
    }

    /**
     * Set up event listeners
     */
    function setupEventListeners() {
        // Appointment form
        if (formState.appointmentForm) {
            formState.appointmentForm.addEventListener('submit', handleAppointmentSubmit);
            
            // Department change handler
            const departmentSelect = document.getElementById('department');
            if (departmentSelect) {
                departmentSelect.addEventListener('change', handleDepartmentChange);
            }
        }

        // Contact form
        if (formState.contactForm) {
            formState.contactForm.addEventListener('submit', handleContactSubmit);
        }

        // Global form reset handler
        document.addEventListener('click', (e) => {
            if (e.target.matches('[onclick="resetForm()"]')) {
                e.preventDefault();
                resetCurrentForm(e.target);
            }
        });
    }

    /**
     * Initialize form validation
     */
    function initializeFormValidation() {
        // Add real-time validation to all form inputs
        const forms = [formState.appointmentForm, formState.contactForm].filter(Boolean);
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                // Validate on blur
                input.addEventListener('blur', () => validateField(input));
                
                // Clear errors on input
                input.addEventListener('input', () => clearFieldError(input));
            });
        });
    }

    /**
     * Set up dependent dropdowns (department -> doctor)
     */
    function setupDependentDropdowns() {
        const departmentSelect = document.getElementById('department');
        const doctorSelect = document.getElementById('doctor');
        
        if (!departmentSelect || !doctorSelect) return;

        // Check URL parameters for pre-selection
        const urlParams = new URLSearchParams(window.location.search);
        const preselectedDepartment = urlParams.get('department');
        const preselectedDoctor = urlParams.get('doctor');

        if (preselectedDepartment) {
            departmentSelect.value = preselectedDepartment;
            handleDepartmentChange({ target: departmentSelect });
            
            if (preselectedDoctor) {
                setTimeout(() => {
                    doctorSelect.value = preselectedDoctor;
                }, 100);
            }
        }
    }

    /**
     * Handle department selection change
     */
    function handleDepartmentChange(event) {
        const departmentSelect = event.target;
        const doctorSelect = document.getElementById('doctor');
        const doctorHelp = document.getElementById('doctor-help');
        
        if (!doctorSelect) return;

        const selectedDepartment = departmentSelect.value;
        
        // Clear current options
        doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
        
        if (selectedDepartment && departmentDoctors[selectedDepartment]) {
            // Enable doctor select and populate options
            doctorSelect.disabled = false;
            
            departmentDoctors[selectedDepartment].forEach(doctor => {
                const option = document.createElement('option');
                option.value = doctor.value;
                option.textContent = doctor.text;
                doctorSelect.appendChild(option);
            });
            
            if (doctorHelp) {
                doctorHelp.textContent = 'Select your preferred doctor from the available options';
            }
        } else {
            // Disable doctor select
            doctorSelect.disabled = true;
            
            if (doctorHelp) {
                doctorHelp.textContent = 'Select a department first to see available doctors';
            }
        }
        
        // Clear any existing validation errors
        clearFieldError(doctorSelect);
    }

    /**
     * Set up phone number formatting
     */
    function setupPhoneFormatting() {
        const phoneInputs = document.querySelectorAll('input[type="tel"]');
        
        phoneInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const formatted = window.MedCareUtils.formatPhoneNumber(e.target.value);
                e.target.value = formatted;
            });
        });
    }

    /**
     * Handle appointment form submission
     */
    async function handleAppointmentSubmit(event) {
        event.preventDefault();
        
        if (formState.isSubmitting) return;
        
        const form = event.target;
        const isValid = validateForm(form);
        
        if (!isValid) {
            // Focus first invalid field
            const firstError = form.querySelector('.form__input[aria-invalid="true"], .form__select[aria-invalid="true"], .form__textarea[aria-invalid="true"]');
            if (firstError) {
                firstError.focus();
                window.MedCareUtils.announceToScreenReader('Please correct the errors in the form');
            }
            return;
        }

        try {
            formState.isSubmitting = true;
            showSubmitLoading(form);
            
            // Simulate API call
            await simulateFormSubmission();
            
            // Get form data for success message
            const formData = new FormData(form);
            const appointmentData = {
                name: `${formData.get('firstName')} ${formData.get('lastName')}`,
                department: formData.get('department'),
                doctor: formData.get('doctor'),
                date: formData.get('appointmentDate'),
                time: formData.get('appointmentTime'),
                type: formData.get('appointmentType')
            };
            
            showAppointmentSuccess(appointmentData);
            form.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            showFormError('There was an error scheduling your appointment. Please try again.');
        } finally {
            formState.isSubmitting = false;
            hideSubmitLoading(form);
        }
    }

    /**
     * Handle contact form submission
     */
    async function handleContactSubmit(event) {
        event.preventDefault();
        
        if (formState.isSubmitting) return;
        
        const form = event.target;
        const isValid = validateForm(form);
        
        if (!isValid) {
            const firstError = form.querySelector('.form__input[aria-invalid="true"], .form__select[aria-invalid="true"], .form__textarea[aria-invalid="true"]');
            if (firstError) {
                firstError.focus();
                window.MedCareUtils.announceToScreenReader('Please correct the errors in the form');
            }
            return;
        }

        try {
            formState.isSubmitting = true;
            showSubmitLoading(form);
            
            // Simulate API call
            await simulateFormSubmission();
            
            showContactSuccess();
            form.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            showFormError('There was an error sending your message. Please try again.');
        } finally {
            formState.isSubmitting = false;
            hideSubmitLoading(form);
        }
    }

    /**
     * Validate entire form
     */
    function validateForm(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    /**
     * Validate individual field
     */
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const isRequired = field.hasAttribute('required');
        let isValid = true;
        let errorMessage = '';

        // Clear previous error state
        clearFieldError(field);

        // Required field validation
        if (isRequired && !value) {
            errorMessage = `${getFieldLabel(field)} is required`;
            isValid = false;
        }
        // Type-specific validation
        else if (value) {
            switch (field.type) {
                case 'email':
                    if (!window.MedCareUtils.isValidEmail(value)) {
                        errorMessage = 'Please enter a valid email address';
                        isValid = false;
                    }
                    break;
                    
                case 'tel':
                    if (!window.MedCareUtils.isValidPhone(value)) {
                        errorMessage = 'Please enter a valid phone number';
                        isValid = false;
                    }
                    break;
                    
                case 'date':
                    if (fieldName === 'dateOfBirth') {
                        const birthDate = new Date(value);
                        const today = new Date();
                        const age = today.getFullYear() - birthDate.getFullYear();
                        
                        if (birthDate > today) {
                            errorMessage = 'Date of birth cannot be in the future';
                            isValid = false;
                        } else if (age > 150) {
                            errorMessage = 'Please enter a valid date of birth';
                            isValid = false;
                        }
                    } else if (fieldName === 'appointmentDate') {
                        const appointmentDate = new Date(value);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        
                        if (appointmentDate < today) {
                            errorMessage = 'Appointment date cannot be in the past';
                            isValid = false;
                        }
                        
                        // Check if it's too far in the future (6 months)
                        const sixMonthsFromNow = new Date();
                        sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
                        
                        if (appointmentDate > sixMonthsFromNow) {
                            errorMessage = 'Please select a date within the next 6 months';
                            isValid = false;
                        }
                    }
                    break;
            }
        }

        // Custom validation for specific fields
        if (isValid && value) {
            switch (fieldName) {
                case 'firstName':
                case 'lastName':
                case 'emergencyName':
                    if (value.length < 2) {
                        errorMessage = `${getFieldLabel(field)} must be at least 2 characters long`;
                        isValid = false;
                    } else if (!/^[a-zA-Z\s'-]+$/.test(value)) {
                        errorMessage = `${getFieldLabel(field)} can only contain letters, spaces, hyphens, and apostrophes`;
                        isValid = false;
                    }
                    break;
                    
                case 'reason':
                case 'message':
                    if (value.length < 10) {
                        errorMessage = `${getFieldLabel(field)} must be at least 10 characters long`;
                        isValid = false;
                    }
                    break;
            }
        }

        if (!isValid) {
            showFieldError(field, errorMessage);
        }

        return isValid;
    }

    /**
     * Show field error
     */
    function showFieldError(field, message) {
        field.setAttribute('aria-invalid', 'true');
        field.classList.add('form__input--error');
        
        const errorElement = document.getElementById(field.getAttribute('aria-describedby'));
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.setAttribute('role', 'alert');
        }
    }

    /**
     * Clear field error
     */
    function clearFieldError(field) {
        field.removeAttribute('aria-invalid');
        field.classList.remove('form__input--error');
        
        const errorElement = document.getElementById(field.getAttribute('aria-describedby'));
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.removeAttribute('role');
        }
    }

    /**
     * Get field label text
     */
    function getFieldLabel(field) {
        const label = document.querySelector(`label[for="${field.id}"]`);
        if (label) {
            return label.textContent.replace('*', '').trim();
        }
        return field.name;
    }

    /**
     * Show submit loading state
     */
    function showSubmitLoading(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            
            const btnText = submitBtn.querySelector('.btn__text');
            const btnLoader = submitBtn.querySelector('.btn__loader');
            
            if (btnText) btnText.style.display = 'none';
            if (btnLoader) btnLoader.style.display = 'inline-block';
        }
    }

    /**
     * Hide submit loading state
     */
    function hideSubmitLoading(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = false;
            
            const btnText = submitBtn.querySelector('.btn__text');
            const btnLoader = submitBtn.querySelector('.btn__loader');
            
            if (btnText) btnText.style.display = 'inline';
            if (btnLoader) btnLoader.style.display = 'none';
        }
    }

    /**
     * Show appointment success modal
     */
    function showAppointmentSuccess(appointmentData) {
        const modal = document.getElementById('success-modal');
        const detailsContainer = document.getElementById('appointment-details');
        
        if (modal && detailsContainer) {
            // Populate appointment details
            const departmentText = document.querySelector(`#department option[value="${appointmentData.department}"]`)?.textContent || appointmentData.department;
            const doctorText = document.querySelector(`#doctor option[value="${appointmentData.doctor}"]`)?.textContent || appointmentData.doctor;
            const typeText = document.querySelector(`#appointment-type option[value="${appointmentData.type}"]`)?.textContent || appointmentData.type;
            
            detailsContainer.innerHTML = `
                <div class="appointment-summary">
                    <h3>Appointment Details</h3>
                    <p><strong>Patient:</strong> ${appointmentData.name}</p>
                    <p><strong>Department:</strong> ${departmentText}</p>
                    ${appointmentData.doctor ? `<p><strong>Doctor:</strong> ${doctorText}</p>` : ''}
                    <p><strong>Date:</strong> ${formatDate(appointmentData.date)}</p>
                    <p><strong>Time:</strong> ${formatTime(appointmentData.time)}</p>
                    <p><strong>Type:</strong> ${typeText}</p>
                </div>
            `;
            
            showModal(modal);
            window.MedCareUtils.announceToScreenReader('Appointment scheduled successfully');
        }
    }

    /**
     * Show contact success modal
     */
    function showContactSuccess() {
        const modal = document.getElementById('contact-success-modal');
        if (modal) {
            showModal(modal);
            window.MedCareUtils.announceToScreenReader('Message sent successfully');
        }
    }

    /**
     * Show modal
     */
    function showModal(modal) {
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        
        // Focus the modal
        const focusableElement = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElement) {
            focusableElement.focus();
        }
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
        
        // Close on escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal(modal);
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    /**
     * Close modal
     */
    function closeModal(modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    /**
     * Show form error
     */
    function showFormError(message) {
        // Create or update error message
        let errorDiv = document.querySelector('.form-error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'form-error-message';
            errorDiv.setAttribute('role', 'alert');
            errorDiv.style.cssText = `
                position: fixed;
                top: 100px;
                left: 50%;
                transform: translateX(-50%);
                background-color: var(--color-error);
                color: white;
                padding: var(--space-md) var(--space-lg);
                border-radius: var(--border-radius-md);
                box-shadow: var(--shadow-lg);
                z-index: 1000;
                max-width: 90%;
                text-align: center;
            `;
            document.body.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }

    /**
     * Reset current form
     */
    function resetCurrentForm(button) {
        const form = button.closest('form');
        if (form) {
            form.reset();
            
            // Clear all validation errors
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(clearFieldError);
            
            // Reset dependent dropdowns
            const departmentSelect = form.querySelector('#department');
            const doctorSelect = form.querySelector('#doctor');
            
            if (departmentSelect && doctorSelect) {
                doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
                doctorSelect.disabled = true;
                
                const doctorHelp = document.getElementById('doctor-help');
                if (doctorHelp) {
                    doctorHelp.textContent = 'Select a department first to see available doctors';
                }
            }
            
            window.MedCareUtils.announceToScreenReader('Form has been reset');
        }
    }

    /**
     * Simulate form submission (replace with actual API call)
     */
    function simulateFormSubmission() {
        return new Promise((resolve) => {
            setTimeout(resolve, 2000); // Simulate 2-second API call
        });
    }

    /**
     * Format date for display
     */
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    /**
     * Format time for display
     */
    function formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    // Global functions for modal controls
    window.closeSuccessModal = function() {
        const modal = document.getElementById('success-modal');
        if (modal) closeModal(modal);
    };

    window.closeContactModal = function() {
        const modal = document.getElementById('contact-success-modal');
        if (modal) closeModal(modal);
    };

    window.scheduleAnother = function() {
        window.closeSuccessModal();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.resetForm = function() {
        // This function is called by onclick handlers
        // The actual implementation is in resetCurrentForm
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();