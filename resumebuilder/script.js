document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const form = document.getElementById('resumeForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const summaryInput = document.getElementById('summary');
    const addEducationBtn = document.getElementById('addEducation');
    const educationFields = document.getElementById('educationFields');
    const addExperienceBtn = document.getElementById('addExperience');
    const experienceFields = document.getElementById('experienceFields');
    const addSkillBtn = document.getElementById('addSkillBtn');
    const customSkillInput = document.getElementById('customSkill');
    const skillsContainer = document.getElementById('skillsContainer');
    const resetBtn = document.getElementById('resetBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const progressBar = document.getElementById('progressBar');
    
    // Preview elements
    const previewName = document.getElementById('previewName');
    const previewEmail = document.getElementById('previewEmail');
    const previewPhone = document.getElementById('previewPhone');
    const previewSummary = document.getElementById('previewSummary');
    const previewEducation = document.getElementById('previewEducation');
    const previewSkills = document.getElementById('previewSkills');
    const previewExperience = document.getElementById('previewExperience');
    
    // Initialize event listeners
    initEventListeners();
    
    function initEventListeners() {
        // Personal info updates
        nameInput.addEventListener('input', updateName);
        emailInput.addEventListener('input', updateEmail);
        phoneInput.addEventListener('input', updatePhone);
        summaryInput.addEventListener('input', updateSummary);
        
        // Education
        addEducationBtn.addEventListener('click', addEducationField);
        educationFields.addEventListener('input', updateEducationPreview);
        
        // Experience
        addExperienceBtn.addEventListener('click', addExperienceField);
        experienceFields.addEventListener('input', updateExperiencePreview);
        
        // Skills
        skillsContainer.addEventListener('change', updateSkillsPreview);
        addSkillBtn.addEventListener('click', addCustomSkill);
        customSkillInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addCustomSkill();
            }
        });
        
        // Form actions
        resetBtn.addEventListener('click', resetForm);
        downloadBtn.addEventListener('click', downloadPDF);
        
        // Track form progress
        form.addEventListener('input', updateProgress);
    }
    
    // Update functions
    function updateName() {
        previewName.textContent = nameInput.value || 'Your Name';
        checkField(nameInput);
    }
    
    function updateEmail() {
        previewEmail.textContent = emailInput.value || 'email@example.com';
        checkField(emailInput);
    }
    
    function updatePhone() {
        previewPhone.textContent = phoneInput.value || '(123) 456-7890';
        checkField(phoneInput);
    }
    
    function updateSummary() {
        previewSummary.textContent = summaryInput.value || 'Brief summary about yourself and your career objectives.';
        checkField(summaryInput);
    }
    
    function updateEducationPreview(e) {
        const educationEntries = educationFields.querySelectorAll('.education-entry');
        previewEducation.innerHTML = '';
        
        educationEntries.forEach(entry => {
            const institution = entry.querySelector('.education-institution').value || 'University Name';
            const degree = entry.querySelector('.education-degree').value || 'Bachelor of Science';
            const field = entry.querySelector('.education-field').value || 'Field of Study';
            const start = entry.querySelector('.education-start').value || 'Start Date';
            const end = entry.querySelector('.education-end').value || 'End Date';
            
            const educationItem = document.createElement('div');
            educationItem.className = 'education-item';
            educationItem.innerHTML = `
                <h3>${institution}</h3>
                <div class="education-details">
                    <span class="degree">${degree} ${field ? 'in ' + field : ''}</span>
                    <span class="dates">${start} - ${end}</span>
                </div>
            `;
            
            previewEducation.appendChild(educationItem);
        });
        
        checkField(e.target);
    }
    
    function updateExperiencePreview(e) {
        const experienceEntries = experienceFields.querySelectorAll('.experience-entry');
        previewExperience.innerHTML = '';
        
        experienceEntries.forEach(entry => {
            const title = entry.querySelector('.experience-title').value || 'Job Title';
            const company = entry.querySelector('.experience-company').value || 'Company Name';
            const start = entry.querySelector('.experience-start').value || 'Start Date';
            const end = entry.querySelector('.experience-end').value || 'End Date';
            const description = entry.querySelector('.experience-description').value || 'Describe your responsibilities and achievements in this role.';
            
            const experienceItem = document.createElement('div');
            experienceItem.className = 'experience-item';
            experienceItem.innerHTML = `
                <h3>${title} <span class="company">at ${company}</span></h3>
                <div class="experience-dates">${start} - ${end}</div>
                <p class="experience-description">${description}</p>
            `;
            
            previewExperience.appendChild(experienceItem);
        });
        
        checkField(e.target);
    }
    
    function updateSkillsPreview() {
        const checkedSkills = Array.from(skillsContainer.querySelectorAll('input[type="checkbox"]:checked'))
            .map(skill => skill.value);
        
        previewSkills.innerHTML = '';
        
        checkedSkills.forEach(skill => {
            const skillTag = document.createElement('span');
            skillTag.className = 'skill-tag';
            skillTag.textContent = skill;
            previewSkills.appendChild(skillTag);
        });
    }
    
    // Field management functions
    function addEducationField() {
        const educationEntry = document.createElement('div');
        educationEntry.className = 'education-entry';
        educationEntry.innerHTML = `
            <div class="form-group">
                <label>Institution</label>
                <input type="text" class="education-institution" placeholder="University Name">
            </div>
            <div class="form-group">
                <label>Degree</label>
                <input type="text" class="education-degree" placeholder="Bachelor of Science">
            </div>
            <div class="form-group">
                <label>Field of Study</label>
                <input type="text" class="education-field" placeholder="Computer Science">
            </div>
            <div class="form-row">
                <div class="form-group half-width">
                    <label>Start Date</label>
                    <input type="text" class="education-start" placeholder="2015">
                </div>
                <div class="form-group half-width">
                    <label>End Date</label>
                    <input type="text" class="education-end" placeholder="2019">
                </div>
            </div>
            <button type="button" class="remove-btn">Remove</button>
        `;
        
        // Add remove button functionality
        const removeBtn = educationEntry.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function() {
            educationEntry.remove();
            updateEducationPreview({target: this});
            updateProgress();
        });
        
        educationFields.appendChild(educationEntry);
        updateProgress();
    }
    
    function addExperienceField() {
        const experienceEntry = document.createElement('div');
        experienceEntry.className = 'experience-entry';
        experienceEntry.innerHTML = `
            <div class="form-group">
                <label>Job Title</label>
                <input type="text" class="experience-title" placeholder="Software Developer">
            </div>
            <div class="form-group">
                <label>Company</label>
                <input type="text" class="experience-company" placeholder="Tech Corp">
            </div>
            <div class="form-row">
                <div class="form-group half-width">
                    <label>Start Date</label>
                    <input type="text" class="experience-start" placeholder="June 2019">
                </div>
                <div class="form-group half-width">
                    <label>End Date</label>
                    <input type="text" class="experience-end" placeholder="Present">
                </div>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea class="experience-description" rows="3" placeholder="Describe your responsibilities and achievements..."></textarea>
            </div>
            <button type="button" class="remove-btn">Remove</button>
        `;
        
        // Add remove button functionality
        const removeBtn = experienceEntry.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function() {
            experienceEntry.remove();
            updateExperiencePreview({target: this});
            updateProgress();
        });
        
        experienceFields.appendChild(experienceEntry);
        updateProgress();
    }
    
    function addCustomSkill() {
        const skillValue = customSkillInput.value.trim();
        if (skillValue) {
            const skillId = 'skill-' + Date.now();
            
            const skillOption = document.createElement('div');
            skillOption.className = 'skill-option';
            skillOption.innerHTML = `
                <input type="checkbox" id="${skillId}" value="${skillValue}" checked>
                <label for="${skillId}">${skillValue}</label>
            `;
            
            skillsContainer.appendChild(skillOption);
            customSkillInput.value = '';
            updateSkillsPreview();
            updateProgress();
        }
    }
    
    // Form progress tracking
    function checkField(field) {
        if (field.value.trim() !== '') {
            if (!field.classList.contains('filled')) {
                field.classList.add('filled');
                updateProgress();
            }
        } else {
            if (field.classList.contains('filled')) {
                field.classList.remove('filled');
                updateProgress();
            }
        }
    }
    
    function updateProgress() {
        // Count filled fields
        let currentFilled = 0;
        
        // Basic fields
        if (nameInput.value.trim()) currentFilled++;
        if (emailInput.value.trim()) currentFilled++;
        if (phoneInput.value.trim()) currentFilled++;
        if (summaryInput.value.trim()) currentFilled++;
        
        // Education fields (at least one institution filled counts as one)
        const hasEducation = Array.from(educationFields.querySelectorAll('.education-institution'))
            .some(input => input.value.trim() !== '');
        if (hasEducation) currentFilled++;
        
        // Skills (at least one selected counts as one)
        const checkedSkills = skillsContainer.querySelectorAll('input[type="checkbox"]:checked').length;
        if (checkedSkills > 0) currentFilled++;
        
        // Experience fields (at least one company filled counts as one)
        const hasExperience = Array.from(experienceFields.querySelectorAll('.experience-company'))
            .some(input => input.value.trim() !== '');
        if (hasExperience) currentFilled++;
        
        // Calculate percentage (7 total sections to fill)
        const progressPercent = (currentFilled / 7) * 100;
        progressBar.style.width = progressPercent + '%';
    }
    
    // Form actions
    function resetForm() {
        form.reset();
        previewName.textContent = 'Your Name';
        previewEmail.textContent = 'email@example.com';
        previewPhone.textContent = '(123) 456-7890';
        previewSummary.textContent = 'Brief summary about yourself and your career objectives.';
        previewEducation.innerHTML = `
            <div class="education-item">
                <h3>University Name</h3>
                <div class="education-details">
                    <span class="degree">Bachelor of Science in Computer Science</span>
                    <span class="dates">2015 - 2019</span>
                </div>
            </div>
        `;
        previewSkills.innerHTML = `
            <span class="skill-tag">HTML</span>
            <span class="skill-tag">CSS</span>
            <span class="skill-tag">JavaScript</span>
        `;
        previewExperience.innerHTML = `
            <div class="experience-item">
                <h3>Software Developer <span class="company">at Tech Corp</span></h3>
                <div class="experience-dates">June 2019 - Present</div>
                <p class="experience-description">Describe your responsibilities and achievements in this role.</p>
            </div>
        `;
        
        // Reset dynamic fields
        educationFields.innerHTML = '';
        experienceFields.innerHTML = '';
        
        // Add back one initial field for education and experience
        addEducationField();
        addExperienceField();
        
        // Reset skills checkboxes
        skillsContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = ['HTML', 'CSS', 'JavaScript'].includes(checkbox.value);
        });
        
        // Reset progress
        progressBar.style.width = '0%';
    }
    
    // PDF Download
    function downloadPDF() {
        const { jsPDF } = window.jspdf;
        const resume = document.getElementById('resumePreview');
        
        // Temporarily hide the download button in the preview
        const originalDisplay = downloadBtn.style.display;
        downloadBtn.style.display = 'none';
        
        html2canvas(resume).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;
            
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            
            pdf.save('resume.pdf');
            downloadBtn.style.display = originalDisplay;
        }).catch(error => {
            console.error('Error generating PDF:', error);
            downloadBtn.style.display = originalDisplay;
            alert('Error generating PDF. Please try again.');
        });
    }
    
    // Initialize form with one education and one experience field
    addEducationField();
    addExperienceField();
});