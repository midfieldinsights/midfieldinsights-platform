// Market Research Platform - Full Application
class MarketResearchPlatform {
    constructor() {
        this.currentUser = null;
        this.currentSection = 'dashboard';
        this.projects = [
            {
                id: 1,
                title: "Consumer Electronics Survey",
                description: "Research on smartphone purchasing behavior",
                status: "active",
                targetAudience: "Adults 25-54 who purchased electronics in last 6 months",
                sampleSize: 1000,
                budget: 15000,
                responses: 680,
                completes: 463,
                createdDate: "2025-08-15",
                deadline: "2025-09-20",
                surveyLink: "https://surveys.midfieldinsights.com/electronics-study",
                redirectUrls: {
                    complete: "https://platform.midfieldinsights.com/complete?pid=1&clickid={CLICK_ID}&status=complete",
                    screenout: "https://platform.midfieldinsights.com/screenout?pid=1&clickid={CLICK_ID}&status=screenout",
                    quotaFull: "https://platform.midfieldinsights.com/quota?pid=1&clickid={CLICK_ID}&status=quota_full",
                    incomplete: "https://platform.midfieldinsights.com/incomplete?pid=1&clickid={CLICK_ID}&status=incomplete"
                },
                vendorsAssigned: [1, 2],
                prescreenerQuestions: [
                    {
                        id: 1,
                        question: "Have you purchased any electronics in the past 6 months?",
                        type: "single_choice",
                        options: ["Yes", "No"],
                        qualifyingAnswers: ["Yes"]
                    },
                    {
                        id: 2,
                        question: "What is your age range?",
                        type: "single_choice",
                        options: ["18-24", "25-34", "35-44", "45-54", "55+"],
                        qualifyingAnswers: ["25-34", "35-44", "45-54"]
                    }
                ]
            },
            {
                id: 2,
                title: "Healthcare Experience Study",
                description: "Patient satisfaction survey",
                status: "bidding",
                targetAudience: "Adults 35+ with chronic health conditions",
                sampleSize: 750,
                budget: 12000,
                responses: 0,
                completes: 0,
                createdDate: "2025-09-01",
                deadline: "2025-10-15",
                surveyLink: "",
                redirectUrls: {},
                vendorsAssigned: [],
                prescreenerQuestions: []
            }
        ];
        
        this.vendors = [
            {
                id: 1,
                name: "PanelCo Research",
                contactEmail: "partnerships@panelco.com",
                contactPerson: "Sarah Johnson",
                phone: "+1-555-0123",
                specialty: "Consumer Electronics, Technology",
                rating: 4.8,
                completionRate: 85,
                panelSize: 50000,
                status: "active"
            },
            {
                id: 2,
                name: "Healthcare Insights Panel",
                contactEmail: "sales@healthpanel.com",
                contactPerson: "Dr. Michael Chen",
                phone: "+1-555-0456",
                specialty: "Healthcare, Medical Research",
                rating: 4.9,
                completionRate: 92,
                panelSize: 25000,
                status: "active"
            }
        ];
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.showLoginScreen();
    }

    bindEvents() {
        // Role selection
        document.querySelectorAll('.role-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const role = e.currentTarget.getAttribute('data-role');
                this.login(role);
            });
        });

        // Logout
        document.getElementById('logout-btn').addEventListener('click', () => {
            this.logout();
        });

        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.currentTarget.getAttribute('data-section');
                this.showSection(section);
            });
        });

        // Create project button
        document.getElementById('create-project-btn').addEventListener('click', () => {
            this.showCreateProjectModal();
        });

        // Add vendor button
        document.getElementById('add-vendor-btn').addEventListener('click', () => {
            this.showAddVendorModal();
        });

        // Project form submission
        document.getElementById('project-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.createProject();
        });

        // Vendor form submission
        document.getElementById('vendor-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addVendor();
        });

        // Close modal buttons
        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.closeModal(e.target.closest('.modal'));
            });
        });

        // Modal backdrop clicks
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });
    }

    login(role) {
        this.currentUser = { role: role };
        document.getElementById('user-role').textContent = role.charAt(0).toUpperCase() + role.slice(1);
        this.showMainApp();
        this.updateDashboard();
    }

    logout() {
        this.currentUser = null;
        this.showLoginScreen();
    }

    showLoginScreen() {
        document.getElementById('login-screen').classList.remove('hidden');
        document.getElementById('main-app').classList.add('hidden');
    }

    showMainApp() {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-app').classList.remove('hidden');
        this.showSection('dashboard');
    }

    showSection(section) {
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // Update content sections
        document.querySelectorAll('.content-section').forEach(sec => {
            sec.classList.remove('active');
        });
        document.getElementById(`${section}-section`).classList.add('active');

        this.currentSection = section;

        // Load section-specific content
        switch(section) {
            case 'dashboard':
                this.updateDashboard();
                break;
            case 'projects':
                this.renderProjects();
                break;
            case 'vendors':
                this.renderVendors();
                break;
            case 'surveys':
                this.renderSurveys();
                break;
            case 'reports':
                this.renderReports();
                break;
        }
    }

    updateDashboard() {
        const activeProjects = this.projects.filter(p => p.status === 'active').length;
        const totalResponses = this.projects.reduce((sum, p) => sum + p.responses, 0);
        const totalCompletes = this.projects.reduce((sum, p) => sum + p.completes, 0);
        const completionRate = totalResponses > 0 ? Math.round((totalCompletes / totalResponses) * 100) : 0;
        const activeVendors = this.vendors.filter(v => v.status === 'active').length;

        document.getElementById('active-projects').textContent = activeProjects;
        document.getElementById('total-responses').textContent = totalResponses.toLocaleString();
        document.getElementById('completion-rate').textContent = completionRate + '%';
        document.getElementById('active-vendors').textContent = activeVendors;

        this.renderResponseChart();
    }

    renderResponseChart() {
        const ctx = document.getElementById('responseChart').getContext('2d');
        
        // Sample data for the last 7 days
        const data = {
            labels: ['Sep 1', 'Sep 2', 'Sep 3', 'Sep 4', 'Sep 5', 'Sep 6', 'Today'],
            datasets: [{
                label: 'Responses',
                data: [85, 94, 76, 103, 88, 67, 45],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4
            }, {
                label: 'Completes',
                data: [58, 67, 52, 73, 61, 48, 32],
                borderColor: '#27ae60',
                backgroundColor: 'rgba(39, 174, 96, 0.1)',
                tension: 0.4
            }]
        };

        new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Daily Response Trends'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    renderProjects() {
        const container = document.getElementById('projects-list');
        container.innerHTML = '';

        this.projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            
            const statusClass = {
                'active': 'status-active',
                'bidding': 'status-bidding',
                'completed': 'status-completed'
            }[project.status] || 'status-active';

            const completionRate = project.responses > 0 ? Math.round((project.completes / project.responses) * 100) : 0;

            projectCard.innerHTML = `
                <div class="project-header">
                    <div>
                        <div class="project-title">${project.title}</div>
                        <div style="color: #666; font-size: 0.9rem;">${project.description}</div>
                    </div>
                    <span class="project-status ${statusClass}">${project.status}</span>
                </div>
                <div class="project-meta">
                    <div><strong>Sample Size:</strong> ${project.sampleSize.toLocaleString()}</div>
                    <div><strong>Budget:</strong> $${project.budget.toLocaleString()}</div>
                    <div><strong>Responses:</strong> ${project.responses.toLocaleString()}</div>
                    <div><strong>Completion:</strong> ${completionRate}%</div>
                </div>
                <div class="project-actions">
                    <button class="btn btn-primary btn-small" onclick="app.viewProjectDetails(${project.id})">View Details</button>
                    <button class="btn btn-secondary btn-small" onclick="app.editProject(${project.id})">Edit</button>
                    ${project.status === 'active' ? '<button class="btn btn-success btn-small" onclick="app.launchSurvey(' + project.id + ')">Manage Launch</button>' : ''}
                </div>
            `;

            container.appendChild(projectCard);
        });
    }

    renderVendors() {
        const container = document.getElementById('vendors-list');
        container.innerHTML = '';

        this.vendors.forEach(vendor => {
            const vendorCard = document.createElement('div');
            vendorCard.className = 'vendor-card';

            vendorCard.innerHTML = `
                <div class="vendor-header">
                    <div class="vendor-name">${vendor.name}</div>
                    <div class="vendor-rating">★ ${vendor.rating}</div>
                </div>
                <div class="vendor-details">
                    <div><strong>Contact:</strong> ${vendor.contactPerson}</div>
                    <div><strong>Email:</strong> ${vendor.contactEmail}</div>
                    <div><strong>Phone:</strong> ${vendor.phone}</div>
                    <div><strong>Specialty:</strong> ${vendor.specialty}</div>
                    <div><strong>Panel Size:</strong> ${vendor.panelSize.toLocaleString()}</div>
                    <div><strong>Completion Rate:</strong> ${vendor.completionRate}%</div>
                </div>
                <div style="margin-top: 15px;">
                    <button class="btn btn-primary btn-small" onclick="app.assignVendor(${vendor.id})">Assign to Project</button>
                    <button class="btn btn-secondary btn-small" onclick="app.editVendor(${vendor.id})">Edit</button>
                </div>
            `;

            container.appendChild(vendorCard);
        });
    }

    renderSurveys() {
        const container = document.getElementById('surveys-list');
        container.innerHTML = '';

        this.projects.forEach(project => {
            if (project.status === 'active' && project.surveyLink) {
                const surveyCard = document.createElement('div');
                surveyCard.className = 'survey-card';

                const completionRate = project.responses > 0 ? Math.round((project.completes / project.responses) * 100) : 0;

                surveyCard.innerHTML = `
                    <div class="survey-header">
                        <h3>${project.title}</h3>
                        <span class="project-status status-active">${project.status}</span>
                    </div>
                    <div class="survey-stats">
                        <div class="stat-item">
                            <div class="stat-value">${project.responses}</div>
                            <div class="stat-label">Responses</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${project.completes}</div>
                            <div class="stat-label">Completes</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${completionRate}%</div>
                            <div class="stat-label">Completion Rate</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${project.vendorsAssigned.length}</div>
                            <div class="stat-label">Vendors</div>
                        </div>
                    </div>
                    <div class="redirect-urls">
                        <h4>Redirect URLs</h4>
                        ${Object.entries(project.redirectUrls).map(([type, url]) => `
                            <div class="redirect-item">
                                <span class="redirect-type">${type.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                                <span class="redirect-url">${url}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div style="margin-top: 15px;">
                        <button class="btn btn-primary btn-small" onclick="app.managePrescreeners(${project.id})">Manage Pre-screeners</button>
                        <button class="btn btn-success btn-small" onclick="app.launchSurvey(${project.id})">Launch Survey</button>
                    </div>
                `;

                container.appendChild(surveyCard);
            }
        });
    }

    renderReports() {
        // Render project performance chart
        const projectCtx = document.getElementById('projectChart').getContext('2d');
        
        const projectData = {
            labels: this.projects.map(p => p.title),
            datasets: [{
                label: 'Completion Rate (%)',
                data: this.projects.map(p => p.responses > 0 ? Math.round((p.completes / p.responses) * 100) : 0),
                backgroundColor: ['#3498db', '#27ae60', '#f39c12', '#e74c3c'],
            }]
        };

        new Chart(projectCtx, {
            type: 'bar',
            data: projectData,
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Project Completion Rates'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });

        // Render vendor performance chart
        const vendorCtx = document.getElementById('vendorChart').getContext('2d');
        
        const vendorData = {
            labels: this.vendors.map(v => v.name),
            datasets: [{
                label: 'Rating',
                data: this.vendors.map(v => v.rating),
                backgroundColor: '#27ae60',
            }, {
                label: 'Completion Rate (%)',
                data: this.vendors.map(v => v.completionRate),
                backgroundColor: '#3498db',
            }]
        };

        new Chart(vendorCtx, {
            type: 'radar',
            data: vendorData,
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Vendor Performance Comparison'
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    showCreateProjectModal() {
        document.getElementById('project-modal').classList.remove('hidden');
    }

    showAddVendorModal() {
        document.getElementById('vendor-modal').classList.remove('hidden');
    }

    createProject() {
        const formData = {
            id: this.projects.length + 1,
            title: document.getElementById('project-title').value,
            description: document.getElementById('project-description').value,
            targetAudience: document.getElementById('project-audience').value,
            sampleSize: parseInt(document.getElementById('project-sample-size').value),
            budget: parseFloat(document.getElementById('project-budget').value),
            deadline: document.getElementById('project-deadline').value,
            surveyLink: document.getElementById('project-survey-link').value,
            status: 'bidding',
            responses: 0,
            completes: 0,
            createdDate: new Date().toISOString().split('T')[0],
            vendorsAssigned: [],
            prescreenerQuestions: [],
            redirectUrls: {}
        };

        this.projects.push(formData);
        this.closeModal(document.getElementById('project-modal'));
        document.getElementById('project-form').reset();
        
        if (this.currentSection === 'projects') {
            this.renderProjects();
        }
        this.updateDashboard();
        
        alert('Project created successfully!');
    }

    addVendor() {
        const formData = {
            id: this.vendors.length + 1,
            name: document.getElementById('vendor-name').value,
            contactEmail: document.getElementById('vendor-email').value,
            contactPerson: document.getElementById('vendor-contact').value,
            phone: document.getElementById('vendor-phone').value,
            specialty: document.getElementById('vendor-specialty').value,
            panelSize: parseInt(document.getElementById('vendor-panel-size').value),
            rating: 0,
            completionRate: 0,
            status: 'active'
        };

        this.vendors.push(formData);
        this.closeModal(document.getElementById('vendor-modal'));
        document.getElementById('vendor-form').reset();
        
        if (this.currentSection === 'vendors') {
            this.renderVendors();
        }
        this.updateDashboard();
        
        alert('Vendor added successfully!');
    }

    viewProjectDetails(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        const modal = document.getElementById('project-details-modal');
        const content = document.getElementById('project-details-content');
        
        const assignedVendors = this.vendors.filter(v => project.vendorsAssigned.includes(v.id));
        const completionRate = project.responses > 0 ? Math.round((project.completes / project.responses) * 100) : 0;

        content.innerHTML = `
            <div style="margin-bottom: 30px;">
                <h2>${project.title}</h2>
                <p style="color: #666; margin-bottom: 20px;">${project.description}</p>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
                    <div>
                        <strong>Status:</strong> <span class="project-status status-${project.status}">${project.status}</span>
                    </div>
                    <div><strong>Sample Size:</strong> ${project.sampleSize.toLocaleString()}</div>
                    <div><strong>Budget:</strong> $${project.budget.toLocaleString()}</div>
                    <div><strong>Responses:</strong> ${project.responses.toLocaleString()}</div>
                    <div><strong>Completes:</strong> ${project.completes.toLocaleString()}</div>
                    <div><strong>Completion Rate:</strong> ${completionRate}%</div>
                </div>
            </div>

            <div style="margin-bottom: 30px;">
                <h3>Survey Details</h3>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                    <div><strong>Target Audience:</strong> ${project.targetAudience}</div>
                    <div style="margin-top: 10px;"><strong>Survey Link:</strong> <a href="${project.surveyLink}" target="_blank">${project.surveyLink}</a></div>
                    <div><strong>Created:</strong> ${project.createdDate}</div>
                    <div><strong>Deadline:</strong> ${project.deadline}</div>
                </div>
            </div>

            ${Object.keys(project.redirectUrls).length > 0 ? `
                <div style="margin-bottom: 30px;">
                    <h3>Redirect URLs</h3>
                    <div class="redirect-urls">
                        ${Object.entries(project.redirectUrls).map(([type, url]) => `
                            <div class="redirect-item">
                                <span class="redirect-type">${type.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                                <span class="redirect-url">${url}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            ${assignedVendors.length > 0 ? `
                <div style="margin-bottom: 30px;">
                    <h3>Assigned Vendors</h3>
                    <div style="display: grid; gap: 15px;">
                        ${assignedVendors.map(vendor => `
                            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                                <strong>${vendor.name}</strong> - ${vendor.contactPerson}<br>
                                <span style="color: #666;">${vendor.contactEmail} | ${vendor.specialty}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            ${project.prescreenerQuestions.length > 0 ? `
                <div>
                    <h3>Pre-screener Questions</h3>
                    <div class="prescreener-section">
                        ${project.prescreenerQuestions.map((q, index) => `
                            <div class="question-item">
                                <div class="question-text">${index + 1}. ${q.question}</div>
                                <div class="question-options">
                                    ${q.options.map(option => `
                                        <span class="option-tag ${q.qualifyingAnswers.includes(option) ? 'qualifying-tag' : ''}">${option}</span>
                                    `).join('')}
                                </div>
                                <div style="margin-top: 10px; font-size: 0.9rem; color: #666;">
                                    <strong>Qualifying answers:</strong> ${q.qualifyingAnswers.join(', ')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        `;

        modal.classList.remove('hidden');
    }

    launchSurvey(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        alert(`Survey launch management for "${project.title}"\n\nFeatures available:\n• Assign vendors\n• Configure redirect URLs\n• Set quotas and targeting\n• Monitor real-time progress`);
    }

    managePrescreeners(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        alert(`Pre-screener management for "${project.title}"\n\nFeatures available:\n• Add/edit screening questions\n• Set qualification logic\n• Configure skip patterns\n• Set demographic quotas`);
    }

    assignVendor(vendorId) {
        const vendor = this.vendors.find(v => v.id === vendorId);
        if (!vendor) return;

        alert(`Vendor assignment for "${vendor.name}"\n\nFeatures available:\n• Assign to active projects\n• Set pricing and terms\n• Configure sample allocation\n• Send invitations`);
    }

    editProject(projectId) {
        alert('Project editing functionality - opens detailed edit form');
    }

    editVendor(vendorId) {
        alert('Vendor editing functionality - opens vendor details form');
    }

    closeModal(modal) {
        modal.classList.add('hidden');
    }
}

// Initialize the application
const app = new MarketResearchPlatform();
