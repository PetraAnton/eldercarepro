// Common Utility Functions for Daycare System

// --- Patient Management ---

/**
 * Get all patients from localStorage
 * @returns {Array} Array of patient objects
 */
function getAllPatients() {
    return JSON.parse(localStorage.getItem('mirabocaresync_patients') || '[]');
}

/**
 * Get the currently active patient ID
 * @returns {string} Active patient ID
 */
function getCurrentPatientId() {
    const activePatientId = localStorage.getItem('mirabocaresync_active_patient');

    // If no active patient, check if any patients exist
    if (!activePatientId) {
        const patients = getAllPatients();
        if (patients.length > 0) {
            // Set first patient as active
            setCurrentPatientId(patients[0].id);
            return patients[0].id;
        }
        // No patients exist, return default
        return '001-DAY-23';
    }

    return activePatientId;
}

/**
 * Set the active patient ID
 * @param {string} patientId 
 */
function setCurrentPatientId(patientId) {
    localStorage.setItem('mirabocaresync_active_patient', patientId);
}

/**
 * Create a new patient
 * @param {Object} patientData - Patient information
 * @returns {Object} Created patient object
 */
function createPatient(patientData) {
    const patients = getAllPatients();

    // Generate ID
    const nextNumber = patients.length + 1;
    const patientId = String(nextNumber).padStart(3, '0') + '-DAY-' + new Date().getFullYear().toString().slice(-2);

    const newPatient = {
        id: patientId,
        fullName: patientData.fullName,
        dateOfBirth: patientData.dateOfBirth,
        gender: patientData.gender,
        careLevel: patientData.careLevel || 'Chăm sóc 1',
        active: true,
        status: 'active',
        createdAt: new Date().toISOString()
    };

    patients.push(newPatient);
    localStorage.setItem('mirabocaresync_patients', JSON.stringify(patients));

    // Set as active patient
    setCurrentPatientId(patientId);

    return newPatient;
}

/**
 * Deactivate a patient (soft delete)
 * @param {string} patientId 
 * @param {string} reason - discharged, transferred, deceased, other
 * @param {string} notes - Additional notes
 */
function deactivatePatient(patientId, reason, notes) {
    const patients = getAllPatients();
    const patient = patients.find(p => p.id === patientId);

    if (patient) {
        patient.active = false;
        patient.status = reason === 'deceased' ? 'deceased' : 'inactive';
        patient.deactivatedDate = new Date().toISOString();
        patient.deactivationReason = reason;
        patient.deactivationNotes = notes || '';

        localStorage.setItem('mirabocaresync_patients', JSON.stringify(patients));
        return true;
    }
    return false;
}

/**
 * Reactivate a patient
 * @param {string} patientId 
 */
function reactivatePatient(patientId) {
    const patients = getAllPatients();
    const patient = patients.find(p => p.id === patientId);

    if (patient) {
        patient.active = true;
        patient.status = 'active';
        patient.reactivatedDate = new Date().toISOString();

        localStorage.setItem('mirabocaresync_patients', JSON.stringify(patients));
        return true;
    }
    return false;
}

/**
 * Soft delete an assessment record
 * @param {string} storageKey - localStorage key for the assessments array
 * @param {number} recordIndex - Index of record to delete
 * @param {string} reason - Reason for deletion
 * @param {string} notes - Additional notes
 * @returns {boolean} Success status
 */
function deleteAssessmentRecord(storageKey, recordIndex, reason, notes) {
    const records = JSON.parse(localStorage.getItem(storageKey) || '[]');

    if (recordIndex < 0 || recordIndex >= records.length) {
        return false;
    }

    // Soft delete: mark as deleted
    records[recordIndex].deleted = true;
    records[recordIndex].deletedDate = new Date().toISOString();
    records[recordIndex].deletedReason = reason;
    records[recordIndex].deletedNotes = notes || '';

    localStorage.setItem(storageKey, JSON.stringify(records));
    return true;
}

/**
 * Get patient by ID
 * @param {string} patientId 
 * @returns {Object|null} Patient object or null
 */
function getPatientById(patientId) {
    const patients = getAllPatients();
    return patients.find(p => p.id === patientId) || null;
}

// --- User/Patient Context ---

// --- Form Management ---

/**
 * Sets up change detection on a form to enable/highlight the save button.
 * Only enables save button when actual changes are detected.
 * @param {string} formId 
 * @param {string} saveBtnId 
 * @returns {function} Function to reset the form state (disable save button)
 */
function setupFormChangeDetection(formId, saveBtnId) {
    const form = document.getElementById(formId);
    const saveBtn = document.getElementById(saveBtnId);

    if (!form || !saveBtn) return () => { };

    // Capture initial form state
    let initialState = captureFormState(form);

    // Disable save button initially
    saveBtn.disabled = true;
    saveBtn.classList.add('opacity-50', 'cursor-not-allowed');

    const checkForChanges = () => {
        const currentState = captureFormState(form);
        const hasChanges = !areStatesEqual(initialState, currentState);

        if (hasChanges) {
            // Enable and highlight save button
            saveBtn.disabled = false;
            saveBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            saveBtn.classList.add('ring-4', 'ring-blue-200');
            if (!saveBtn.textContent.includes('*')) {
                saveBtn.textContent = saveBtn.textContent.trim() + ' *';
            }
        } else {
            // Disable and remove highlight
            saveBtn.disabled = true;
            saveBtn.classList.add('opacity-50', 'cursor-not-allowed');
            saveBtn.classList.remove('ring-4', 'ring-blue-200');
            saveBtn.textContent = saveBtn.textContent.replace('*', '').trim();
        }
    };

    form.addEventListener('input', checkForChanges);
    form.addEventListener('change', checkForChanges);

    // Return a reset function
    return () => {
        // Update initial state to current state (after save)
        initialState = captureFormState(form);

        // Reset button to disabled state
        saveBtn.disabled = true;
        saveBtn.classList.add('opacity-50', 'cursor-not-allowed');
        saveBtn.classList.remove('ring-4', 'ring-blue-200');
        saveBtn.textContent = saveBtn.textContent.replace('*', '').trim();
    };
}

/**
 * Capture current form state as a serialized object
 * @param {HTMLFormElement} form 
 * @returns {Object} Form state
 */
function captureFormState(form) {
    const state = {};
    const inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            state[input.id || input.name] = input.checked;
        } else if (input.type === 'radio') {
            if (input.checked) {
                state[input.name] = input.value;
            }
        } else {
            state[input.id || input.name] = input.value;
        }
    });

    return state;
}

/**
 * Compare two form states for equality
 * @param {Object} state1 
 * @param {Object} state2 
 * @returns {boolean} True if states are equal
 */
function areStatesEqual(state1, state2) {
    const keys1 = Object.keys(state1);
    const keys2 = Object.keys(state2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        if (state1[key] !== state2[key]) return false;
    }

    return true;
}

// --- Feedback & Notifications ---

function showToast(message, type = 'success') {
    // Create toast container if not exists
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-3';
        document.body.appendChild(container);
    }

    // Create toast element
    const toast = document.createElement('div');
    const colors = type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white';

    toast.className = `${colors} px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in transform translate-y-10 opacity-0 transition-all duration-300`;
    toast.innerHTML = `
        <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}" class="w-5 h-5"></i>
        <span class="font-bold text-sm">${message}</span>
    `;

    container.appendChild(toast);
    lucide.createIcons();

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    });

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-x-full');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- Module Status ---

function markModuleComplete(patientId, moduleKey) {
    // Save completion status to local storage
    const statusKey = `mirabocaresync_${patientId}_status`;
    const status = JSON.parse(localStorage.getItem(statusKey) || '{}');

    status[moduleKey] = true;
    localStorage.setItem(statusKey, JSON.stringify(status));

    // Update Sidebar UI if possible
    // (This would require the side bar to re-render or check status)
    console.log(`Module ${moduleKey} marked as complete for ${patientId}`);
}
