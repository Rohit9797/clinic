/*
  MIT License
  Copyright (c) 2025 ScriptedWebs
*/



/**
 * MedCare Hospital - Doctors JavaScript
 * Handles doctor search, filtering, and profile display functionality
 */

(function() {
    'use strict';

    // Doctors data (in a real application, this would come from an API)
    const doctorsData = [
        {
            id: 'sarah-mitchell',
            name: 'Dr. Sarah Mitchell',
            specialty: 'Internal Medicine',
            department: 'internal-medicine',
            location: 'main',
            image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=300',
            description: 'Board-certified internist with over 15 years of experience in preventive care and chronic disease management.',
            credentials: ['MD - Harvard Medical School', 'Board Certified Internal Medicine', 'Fellow - American College of Physicians'],
            languages: ['English', 'Spanish'],
            education: 'Harvard Medical School',
            residency: 'Massachusetts General Hospital',
            fellowship: 'Preventive Medicine Fellowship',
            specialties: ['Preventive Care', 'Diabetes Management', 'Hypertension', 'Wellness Exams'],
            phone: '+1-555-MEDCARE',
            email: 'sarah.mitchell@medcare-hospital.com'
        },
        {
            id: 'michael-rodriguez',
            name: 'Dr. Michael Rodriguez',
            specialty: 'Cardiac Surgery',
            department: 'cardiology',
            location: 'main',
            image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=300',
            description: 'Leading cardiac surgeon specializing in minimally invasive procedures and robotic surgery.',
            credentials: ['MD - Johns Hopkins', 'Board Certified Cardiac Surgery', 'Fellow - American College of Surgeons'],
            languages: ['English', 'Spanish'],
            education: 'Johns Hopkins School of Medicine',
            residency: 'Johns Hopkins Hospital',
            fellowship: 'Cardiac Surgery Fellowship',
            specialties: ['Robotic Surgery', 'Valve Repair', 'Bypass Surgery', 'Minimally Invasive Procedures'],
            phone: '+1-555-CARDIAC',
            email: 'michael.rodriguez@medcare-hospital.com'
        },
        {
            id: 'emily-chen',
            name: 'Dr. Emily Chen',
            specialty: 'Pediatrics',
            department: 'pediatrics',
            location: 'main',
            image: 'https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg?auto=compress&cs=tinysrgb&w=300',
            description: 'Compassionate pediatrician specializing in developmental pediatrics and adolescent health.',
            credentials: ['MD - Stanford Medical School', 'Board Certified Pediatrics', 'Fellow - American Academy of Pediatrics'],
            languages: ['English', 'Mandarin'],
            education: 'Stanford University School of Medicine',
            residency: 'Stanford Children\'s Hospital',
            fellowship: 'Developmental Pediatrics Fellowship',
            specialties: ['Developmental Pediatrics', 'Adolescent Medicine', 'Well-Child Care', 'Behavioral Health'],
            phone: '+1-555-PEDIATRIC',
            email: 'emily.chen@medcare-hospital.com'
        },
        {
            id: 'robert-chen',
            name: 'Dr. Robert Chen',
            specialty: 'Interventional Cardiology',
            department: 'cardiology',
            location: 'north',
            image: 'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&w=300',
            description: 'Expert in cardiac catheterization and interventional procedures with focus on complex cases.',
            credentials: ['MD - UCLA', 'Board Certified Cardiology', 'Board Certified Interventional Cardiology'],
            languages: ['English', 'Mandarin'],
            education: 'UCLA School of Medicine',
            residency: 'UCLA Medical Center',
            fellowship: 'Interventional Cardiology Fellowship',
            specialties: ['Cardiac Catheterization', 'Angioplasty', 'Stent Placement', 'Complex Interventions'],
            phone: '+1-555-HEART',
            email: 'robert.chen@medcare-hospital.com'
        },
        {
            id: 'maria-gonzalez',
            name: 'Dr. Maria Gonzalez',
            specialty: 'Cardiology',
            department: 'cardiology',
            location: 'south',
            image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300',
            description: 'Preventive cardiologist focused on heart disease prevention and women\'s cardiac health.',
            credentials: ['MD - Mayo Clinic', 'Board Certified Cardiology', 'Certified in Nuclear Cardiology'],
            languages: ['English', 'Spanish'],
            education: 'Mayo Clinic School of Medicine',
            residency: 'Mayo Clinic',
            fellowship: 'Preventive Cardiology Fellowship',
            specialties: ['Preventive Cardiology', 'Women\'s Heart Health', 'Lipid Management', 'Cardiac Risk Assessment'],
            phone: '+1-555-PREVENT',
            email: 'maria.gonzalez@medcare-hospital.com'
        },
        {
            id: 'david-kim',
            name: 'Dr. David Kim',
            specialty: 'Pediatric Surgery',
            department: 'pediatrics',
            location: 'main',
            image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=300',
            description: 'Pediatric surgeon specializing in minimally invasive procedures for children.',
            credentials: ['MD - Children\'s Hospital Boston', 'Board Certified Pediatric Surgery'],
            languages: ['English', 'Korean'],
            education: 'Harvard Medical School',
            residency: 'Boston Children\'s Hospital',
            fellowship: 'Pediatric Surgery Fellowship',
            specialties: ['Minimally Invasive Surgery', 'Neonatal Surgery', 'Pediatric Trauma', 'Congenital Anomalies'],
            phone: '+1-555-PEDSURG',
            email: 'david.kim@medcare-hospital.com'
        },
        {
            id: 'lisa-patel',
            name: 'Dr. Lisa Patel',
            specialty: 'Pediatric Cardiology',
            department: 'pediatrics',
            location: 'east',
            image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300',
            description: 'Pediatric cardiologist specializing in congenital heart disease and fetal cardiology.',
            credentials: ['MD - UCSF', 'Board Certified Pediatric Cardiology'],
            languages: ['English', 'Hindi'],
            education: 'UCSF School of Medicine',
            residency: 'UCSF Benioff Children\'s Hospital',
            fellowship: 'Pediatric Cardiology Fellowship',
            specialties: ['Congenital Heart Disease', 'Fetal Cardiology', 'Pediatric Echocardiography', 'Heart Failure'],
            phone: '+1-555-PEDCARD',
            email: 'lisa.patel@medcare-hospital.com'
        },
        {
            id: 'jennifer-wong',
            name: 'Dr. Jennifer Wong',
            specialty: 'Orthopedic Surgery',
            department: 'orthopedics',
            location: 'main',
            image: 'https://images.pexels.com/photos/5452297/pexels-photo-5452297.jpeg?auto=compress&cs=tinysrgb&w=300',
            description: 'Orthopedic surgeon specializing in joint replacement and sports medicine.',
            credentials: ['MD - Stanford', 'Board Certified Orthopedic Surgery'],
            languages: ['English', 'Cantonese'],
            education: 'Stanford University School of Medicine',
            residency: 'Stanford Hospital',
            fellowship: 'Sports Medicine Fellowship',
            specialties: ['Joint Replacement', 'Sports Medicine', 'Arthroscopic Surgery', 'Trauma Surgery'],
            phone: '+1-555-ORTHO',
            email: 'jennifer.wong@medcare-hospital.com'
        },
        {
            id: 'thomas-brown',
            name: 'Dr. Thomas Brown',
            specialty: 'Spine Surgery',
            department: 'orthopedics',
            location: 'north',
            image: 'https://images.pexels.com/photos/5452290/pexels-photo-5452290.jpeg?auto=compress&cs=tinysrgb&w=300',
            description: 'Spine surgeon specializing in complex spinal deformity and minimally invasive techniques.',
            credentials: ['MD - Northwestern', 'Board Certified Orthopedic Surgery', 'Spine Surgery Fellowship'],
            languages: ['English'],
            education: 'Northwestern University Feinberg School of Medicine',
            residency: 'Northwestern Memorial Hospital',
            fellowship: 'Spine Surgery Fellowship',
            specialties: ['Spinal Deformity', 'Minimally Invasive Spine Surgery', 'Spinal Fusion', 'Disc Replacement'],
            phone: '+1-555-SPINE',
            email: 'thomas.brown@medcare-hospital.com'
        },
        {
            id: 'amanda-taylor',
            name: 'Dr. Amanda Taylor',
            specialty: 'Neurology',
            department: 'neurology',
            location: 'main',
            image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=300',
            description: 'Neurologist specializing in stroke care and neurocritical care medicine.',
            credentials: ['MD - Yale', 'Board Certified Neurology', 'Board Certified Neurocritical Care'],
            languages: ['English', 'French'],
            education: 'Yale School of Medicine',
            residency: 'Yale-New Haven Hospital',
            fellowship: 'Neurocritical Care Fellowship',
            specialties: ['Stroke Care', 'Neurocritical Care', 'Cerebrovascular Disease', 'Neurointensive Care'],
            phone: '+1-555-NEURO',
            email: 'amanda.taylor@medcare-hospital.com'
        },
        {
            id: 'james-wilson',
            name: 'Dr. James Wilson',
            specialty: 'Epilepsy',
            department: 'neurology',
            location: 'south',
            image: 'https://images.pexels.com/photos/5452275/pexels-photo-5452275.jpeg?auto=compress&cs=tinysrgb&w=300',
            description: 'Epileptologist specializing in seizure disorders and epilepsy surgery evaluation.',
            credentials: ['MD - Johns Hopkins', 'Board Certified Neurology', 'Fellowship in Epilepsy'],
            languages: ['English'],
            education: 'Johns Hopkins School of Medicine',
            residency: 'Johns Hopkins Hospital',
            fellowship: 'Epilepsy Fellowship',
            specialties: ['Epilepsy', 'Seizure Disorders', 'EEG Interpretation', 'Epilepsy Surgery Evaluation'],
            phone: '+1-555-EPILEPSY',
            email: 'james.wilson@medcare-hospital.com'
        },
        {
            id: 'rachel-davis',
            name: 'Dr. Rachel Davis',
            specialty: 'Movement Disorders',
            department: 'neurology',
            location: 'east',
            image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=300',
            description: 'Movement disorders specialist focusing on Parkinson\'s disease and deep brain stimulation.',
            credentials: ['MD - UCSF', 'Board Certified Neurology', 'Fellowship in Movement Disorders'],
            languages: ['English', 'Spanish'],
            education: 'UCSF School of Medicine',
            residency: 'UCSF Medical Center',
            fellowship: 'Movement Disorders Fellowship',
            specialties: ['Parkinson\'s Disease', 'Deep Brain Stimulation', 'Tremor Disorders', 'Dystonia'],
            phone: '+1-555-MOVEMENT',
            email: 'rachel.davis@medcare-hospital.com'
        }
    ];

    // State
    const state = {
        filteredDoctors: [...doctorsData],
        currentFilters: {
            search: '',
            specialty: '',
            location: ''
        }
    };

    // DOM elements
    const elements = {
        searchInput: null,
        specialtyFilter: null,
        locationFilter: null,
        clearFiltersBtn: null,
        doctorsGrid: null,
        resultsCount: null,
        noResults: null
    };

    /**
     * Initialize doctors page functionality
     */
    function init() {
        cacheElements();
        setupEventListeners();
        renderDoctors();
        updateResultsCount();
        
        console.log('Doctors module initialized');
    }

    /**
     * Cache DOM elements
     */
    function cacheElements() {
        elements.searchInput = document.getElementById('doctor-name-search');
        elements.specialtyFilter = document.getElementById('specialty-filter');
        elements.locationFilter = document.getElementById('location-filter');
        elements.clearFiltersBtn = document.querySelector('.clear-filters');
        elements.doctorsGrid = document.getElementById('doctors-grid');
        elements.resultsCount = document.getElementById('results-count');
        elements.noResults = document.getElementById('no-results');
    }

    /**
     * Set up event listeners
     */
    function setupEventListeners() {
        // Search input
        if (elements.searchInput) {
            elements.searchInput.addEventListener('input', window.MedCareUtils.debounce(handleSearch, 300));
        }

        // Filter selects
        if (elements.specialtyFilter) {
            elements.specialtyFilter.addEventListener('change', handleSpecialtyFilter);
        }

        if (elements.locationFilter) {
            elements.locationFilter.addEventListener('change', handleLocationFilter);
        }

        // Clear filters button
        if (elements.clearFiltersBtn) {
            elements.clearFiltersBtn.addEventListener('click', clearAllFilters);
        }

        // Search button
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                if (elements.searchInput) {
                    handleSearch({ target: elements.searchInput });
                }
            });
        }
    }

    /**
     * Handle search input
     */
    function handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase().trim();
        state.currentFilters.search = searchTerm;
        applyFilters();
        
        // Announce search results to screen readers
        setTimeout(() => {
            const count = state.filteredDoctors.length;
            const message = count === 0 ? 'No doctors found' : `${count} doctor${count === 1 ? '' : 's'} found`;
            window.MedCareUtils.announceToScreenReader(message);
        }, 100);
    }

    /**
     * Handle specialty filter change
     */
    function handleSpecialtyFilter(event) {
        state.currentFilters.specialty = event.target.value;
        applyFilters();
    }

    /**
     * Handle location filter change
     */
    function handleLocationFilter(event) {
        state.currentFilters.location = event.target.value;
        applyFilters();
    }

    /**
     * Clear all filters
     */
    function clearAllFilters() {
        // Reset form inputs
        if (elements.searchInput) elements.searchInput.value = '';
        if (elements.specialtyFilter) elements.specialtyFilter.value = '';
        if (elements.locationFilter) elements.locationFilter.value = '';

        // Reset state
        state.currentFilters = {
            search: '',
            specialty: '',
            location: ''
        };

        // Apply filters (which will show all doctors)
        applyFilters();
        
        // Focus search input
        if (elements.searchInput) {
            elements.searchInput.focus();
        }

        window.MedCareUtils.announceToScreenReader('All filters cleared');
    }

    /**
     * Apply current filters to doctors list
     */
    function applyFilters() {
        state.filteredDoctors = doctorsData.filter(doctor => {
            // Search filter
            if (state.currentFilters.search) {
                const searchTerm = state.currentFilters.search.toLowerCase();
                const matchesName = doctor.name.toLowerCase().includes(searchTerm);
                const matchesSpecialty = doctor.specialty.toLowerCase().includes(searchTerm);
                const matchesDepartment = doctor.department.toLowerCase().includes(searchTerm);
                
                if (!matchesName && !matchesSpecialty && !matchesDepartment) {
                    return false;
                }
            }

            // Specialty filter
            if (state.currentFilters.specialty && doctor.department !== state.currentFilters.specialty) {
                return false;
            }

            // Location filter
            if (state.currentFilters.location && doctor.location !== state.currentFilters.location) {
                return false;
            }

            return true;
        });

        renderDoctors();
        updateResultsCount();
    }

    /**
     * Render doctors grid
     */
    function renderDoctors() {
        if (!elements.doctorsGrid) return;

        if (state.filteredDoctors.length === 0) {
            elements.doctorsGrid.style.display = 'none';
            if (elements.noResults) {
                elements.noResults.style.display = 'block';
            }
            return;
        }

        elements.doctorsGrid.style.display = 'grid';
        if (elements.noResults) {
            elements.noResults.style.display = 'none';
        }

        elements.doctorsGrid.innerHTML = state.filteredDoctors.map(doctor => createDoctorCard(doctor)).join('');
    }

    /**
     * Create doctor card HTML
     */
    function createDoctorCard(doctor) {
        const locationText = getLocationText(doctor.location);
        
        return `
            <div class="doctor-card" data-doctor-id="${doctor.id}">
                <div class="doctor-card__image">
                    <img src="${doctor.image}" 
                         alt="${doctor.name}" 
                         loading="lazy"
                         width="300" 
                         height="225"
                         class="doctor-card__img">
                </div>
                <div class="doctor-card__content">
                    <h3 class="doctor-card__name">${doctor.name}</h3>
                    <p class="doctor-card__specialty">${doctor.specialty}</p>
                    <p class="doctor-card__description">${doctor.description}</p>
                    <div class="doctor-card__meta">
                        <p class="doctor-card__location">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 10C21 17L12 23L3 17V10L12 1L21 10Z" stroke="currentColor" stroke-width="2"/>
                                <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
                            </svg>
                            ${locationText}
                        </p>
                        <p class="doctor-card__languages">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                                <path d="M2 12H22" stroke="currentColor" stroke-width="2"/>
                                <path d="M12 2A15.3 15.3 0 0 1 16 12A15.3 15.3 0 0 1 12 22A15.3 15.3 0 0 1 8 12A15.3 15.3 0 0 1 12 2Z" stroke="currentColor" stroke-width="2"/>
                            </svg>
                            ${doctor.languages.join(', ')}
                        </p>
                    </div>
                    <div class="doctor-card__actions">
                        <a href="/appointments.html?doctor=${doctor.id}" class="btn btn--primary btn--small">Book Appointment</a>
                        <button class="btn btn--outline btn--small" onclick="showDoctorDetails('${doctor.id}')">View Profile</button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Get location display text
     */
    function getLocationText(location) {
        const locationMap = {
            'main': 'Main Campus',
            'north': 'North Clinic',
            'south': 'South Clinic',
            'east': 'East Campus'
        };
        return locationMap[location] || location;
    }

    /**
     * Update results count display
     */
    function updateResultsCount() {
        if (!elements.resultsCount) return;

        const count = state.filteredDoctors.length;
        const text = count === 1 ? 'Showing 1 doctor' : `Showing ${count} doctors`;
        elements.resultsCount.textContent = text;
    }

    /**
     * Show doctor details modal
     */
    function showDoctorDetails(doctorId) {
        const doctor = doctorsData.find(d => d.id === doctorId);
        if (!doctor) return;

        const modal = document.getElementById('doctor-modal');
        const modalContent = document.getElementById('doctor-modal-content');
        const modalTitle = document.getElementById('doctor-modal-title');

        if (!modal || !modalContent || !modalTitle) return;

        modalTitle.textContent = `${doctor.name} - Profile`;
        modalContent.innerHTML = createDoctorProfileHTML(doctor);

        showModal(modal);
        window.MedCareUtils.announceToScreenReader(`Showing profile for ${doctor.name}`);
    }

    /**
     * Create doctor profile HTML
     */
    function createDoctorProfileHTML(doctor) {
        const locationText = getLocationText(doctor.location);
        
        return `
            <div class="doctor-profile">
                <div class="doctor-profile__header">
                    <div class="doctor-profile__image">
                        <img src="${doctor.image}" 
                             alt="${doctor.name}" 
                             width="150" 
                             height="150"
                             class="doctor-profile__img">
                    </div>
                    <div class="doctor-profile__info">
                        <h3 class="doctor-profile__name">${doctor.name}</h3>
                        <p class="doctor-profile__specialty">${doctor.specialty}</p>
                        <p class="doctor-profile__location">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 10C21 17L12 23L3 17V10L12 1L21 10Z" stroke="currentColor" stroke-width="2"/>
                                <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
                            </svg>
                            ${locationText}
                        </p>
                    </div>
                </div>
                
                <div class="doctor-profile__content">
                    <div class="doctor-profile__section">
                        <h4>About</h4>
                        <p>${doctor.description}</p>
                    </div>
                    
                    <div class="doctor-profile__section">
                        <h4>Education & Training</h4>
                        <ul>
                            <li><strong>Medical School:</strong> ${doctor.education}</li>
                            <li><strong>Residency:</strong> ${doctor.residency}</li>
                            ${doctor.fellowship ? `<li><strong>Fellowship:</strong> ${doctor.fellowship}</li>` : ''}
                        </ul>
                    </div>
                    
                    <div class="doctor-profile__section">
                        <h4>Credentials</h4>
                        <ul>
                            ${doctor.credentials.map(credential => `<li>${credential}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="doctor-profile__section">
                        <h4>Specialties</h4>
                        <ul>
                            ${doctor.specialties.map(specialty => `<li>${specialty}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="doctor-profile__section">
                        <h4>Languages</h4>
                        <p>${doctor.languages.join(', ')}</p>
                    </div>
                    
                    <div class="doctor-profile__section">
                        <h4>Contact Information</h4>
                        <p><strong>Phone:</strong> <a href="tel:${doctor.phone}">${doctor.phone}</a></p>
                        <p><strong>Email:</strong> <a href="mailto:${doctor.email}">${doctor.email}</a></p>
                    </div>
                </div>
                
                <div class="doctor-profile__actions">
                    <a href="/appointments.html?doctor=${doctor.id}" class="btn btn--primary">Book Appointment</a>
                    <button class="btn btn--secondary" onclick="closeDoctorModal()">Close</button>
                </div>
            </div>
        `;
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

    // Global functions for modal controls
    window.showDoctorDetails = showDoctorDetails;
    
    window.closeDoctorModal = function() {
        const modal = document.getElementById('doctor-modal');
        if (modal) closeModal(modal);
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();