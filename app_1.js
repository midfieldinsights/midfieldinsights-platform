// Application Data with comprehensive functionality
const appData = {
  currentUser: null,
  projects: [
    {
      id: 1,
      title: "Consumer Electronics Survey",
      description: "Research on smartphone purchasing behavior and brand preferences among tech-savvy consumers",
      client_id: 1,
      status: "active",
      target_audience: "Adults 25-54 who purchased electronics in last 6 months",
      sample_size: 1000,
      budget: 15000,
      cpc: 15.00,
      completion_rate: 68,
      responses: 680,
      completes: 463,
      created_date: "2025-08-15",
      deadline: "2025-09-20",
      survey_link: "https://surveys.midfieldinsights.com/electronics-study",
      launched: true,
      vendors_assigned: [1, 2, 3],
      redirect_urls: {
        complete: "https://platform.midfieldinsights.com/complete?pid=1&clickid={CLICK_ID}&status=complete&vendor={VENDOR_ID}",
        screenout: "https://platform.midfieldinsights.com/screenout?pid=1&clickid={CLICK_ID}&status=screenout&vendor={VENDOR_ID}",
        quota_full: "https://platform.midfieldinsights.com/quota?pid=1&clickid={CLICK_ID}&status=quota_full&vendor={VENDOR_ID}",
        incomplete: "https://platform.midfieldinsights.com/incomplete?pid=1&clickid={CLICK_ID}&status=incomplete&vendor={VENDOR_ID}"
      }
    },
    {
      id: 2,
      title: "Healthcare Experience Study", 
      description: "Patient satisfaction and healthcare provider evaluation across multiple touchpoints",
      client_id: 1,
      status: "bidding",
      target_audience: "Adults 35+ with chronic health conditions",
      sample_size: 750,
      budget: 12000,
      cpc: 16.00,
      completion_rate: 0,
      responses: 0,
      completes: 0,
      created_date: "2025-09-01",
      deadline: "2025-10-15",
      survey_link: "https://surveys.midfieldinsights.com/healthcare-study",
      launched: false,
      vendors_assigned: [],
      redirect_urls: {
        complete: "",
        screenout: "",
        quota_full: "",
        incomplete: ""
      }
    }
  ],
  vendors: [
    {
      id: 1,
      name: "PanelCo Research",
      contact_email: "partnerships@panelco.com",
      contact_person: "Sarah Johnson",
      phone: "+1-555-0123",
      specialty: "Consumer Electronics, Technology",
      rating: 4.8,
      completion_rate: 85,
      avg_cpc: 14.50,
      panel_size: 50000,
      countries: ["US", "CA", "UK"],
      status: "active"
    },
    {
      id: 2,
      name: "Healthcare Insights Panel",
      contact_email: "sales@healthpanel.com", 
      contact_person: "Dr. Michael Chen",
      phone: "+1-555-0456",
      specialty: "Healthcare, Medical Research",
      rating: 4.9,
      completion_rate: 92,
      avg_cpc: 18.00,
      panel_size: 25000,
      countries: ["US", "CA"],
      status: "active"
    },
    {
      id: 3,
      name: "Global Survey Solutions",
      contact_email: "hello@globalsurv.com",
      contact_person: "Amanda Rodriguez", 
      phone: "+1-555-0789",
      specialty: "General Population, B2B",
      rating: 4.6,
      completion_rate: 78,
      avg_cpc: 12.75,
      panel_size: 100000,
      countries: ["US", "CA", "UK", "AU", "DE"],
      status: "active"
    }
  ],
  surveys: [
    {
      id: 1,
      project_id: 1,
      name: "Electronics Purchase Survey",
      status: "active",
      response_count: 680,
      completion_rate: 68,
      avg_completion_time: "12 minutes",
      created_date: "2025-08-15"
    }
  ],
  prescreener_questions: [
    {
      id: 1,
      project_id: 1,
      question: "Have you purchased any electronics in the past 6 months?",
      type: "single_choice",
      options: ["Yes", "No"],
      qualifying_answers: ["Yes"],
      order: 1,
      required: true
    },
    {
      id: 2, 
      project_id: 1,
      question: "What is your age range?",
      type: "single_choice",
      options: ["18-24", "25-34", "35-44", "45-54", "55+"],
      qualifying_answers: ["25-34", "35-44", "45-54"],
      order: 2,
      required: true
    }
  ],
  vendor_invitations: [
    {
      id: 1,
      project_id: 1,
      vendor_id: 1,
      status: "sent",
      sent_date: "2025-08-15",
      message: "We invite you to participate in our Consumer Electronics Survey."
    },
    {
      id: 2,
      project_id: 1,
      vendor_id: 2,
      status: "accepted",
      sent_date: "2025-08-15",
      message: "We invite you to participate in our Consumer Electronics Survey."
    }
  ],
  analytics_data: {
    daily_responses: [
      {"date": "2025-09-01", "responses": 85, "completes": 58, "cost": 870},
      {"date": "2025-09-02", "responses": 94, "completes": 67, "cost": 1005}, 
      {"date": "2025-09-03", "responses": 76, "completes": 52, "cost": 780},
      {"date": "2025-09-04", "responses": 103, "completes": 73, "cost": 1095},
      {"date": "2025-09-05", "responses": 88, "completes": 61, "cost": 915},
      {"date": "2025-09-06", "responses": 67, "completes": 48, "cost": 720}
    ],
    vendor_performance: [
      {"vendor": "PanelCo Research", "responses": 285, "completes": 198, "cost": 2970, "avg_cpc": 15.00},
      {"vendor": "Healthcare Insights Panel", "responses": 156, "completes": 143, "cost": 2574, "avg_cpc": 18.00},
      {"vendor": "Global Survey Solutions", "responses": 242, "completes": 178, "cost": 2269, "avg_cpc": 12.75}
    ]
  }
};

// Global state
let currentUser = null;
let currentRole = null;
let currentProject = null;
let filteredVendors = [];

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing app...');
  initializeApp();
});

function initializeApp() {
  try {
    console.log('Starting app initialization...');
    
    // Initialize filtered vendors
    filteredVendors = [...appData.vendors];
    
    // Setup all event listeners
    setupAllEventListeners();
    
    // Show login screen
    showLoginScreen();
    
    console.log('App initialized successfully');
  } catch (error) {
    console.error('Error initializing app:', error);
  }
}

function setupAllEventListeners() {
  console.log('Setting up all event listeners...');
  
  // Role selection buttons - direct binding
  setTimeout(() => {
    const roleButtons = document.querySelectorAll('.role-btn');
    console.log('Found role buttons:', roleButtons.length);
    
    roleButtons.forEach((button, index) => {
      const role = button.getAttribute('data-role');
      console.log('Setting up button', index, 'for role:', role);
      
      button.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Role button clicked:', role);
        handleRoleSelection(role);
      });
    });
  }, 100);

  // Navigation tabs
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('nav-tab')) {
      e.preventDefault();
      const tabName = e.target.getAttribute('data-tab');
      console.log('Tab clicked:', tabName);
      showTab(tabName);
    }
  });

  // Logout button
  document.addEventListener('click', function(e) {
    if (e.target.id === 'logout-btn') {
      e.preventDefault();
      logout();
    }
  });

  // Modal close buttons
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('close-modal')) {
      e.preventDefault();
      closeAllModals();
    }
    
    if (e.target.classList.contains('modal-overlay')) {
      closeAllModals();
    }
  });

  // Create project button
  document.addEventListener('click', function(e) {
    if (e.target.id === 'create-project-btn') {
      e.preventDefault();
      openModal('create-project-modal');
    }
  });

  // Add vendor button
  document.addEventListener('click', function(e) {
    if (e.target.id === 'add-vendor-btn') {
      e.preventDefault();
      openModal('add-vendor-modal');
    }
  });

  // Create survey button
  document.addEventListener('click', function(e) {
    if (e.target.id === 'create-survey-btn') {
      e.preventDefault();
      openSurveyBuilder();
    }
  });

  // Save vendor assignments button
  document.addEventListener('click', function(e) {
    if (e.target.id === 'save-vendor-assignments') {
      e.preventDefault();
      saveVendorAssignments();
    }
  });

  // Save redirects button
  document.addEventListener('click', function(e) {
    if (e.target.id === 'save-redirects') {
      e.preventDefault();
      saveRedirectUrls();
    }
  });

  // Launch survey button
  document.addEventListener('click', function(e) {
    if (e.target.id === 'launch-survey-btn') {
      e.preventDefault();
      launchSurvey();
    }
  });

  // Pause survey button
  document.addEventListener('click', function(e) {
    if (e.target.id === 'pause-survey-btn') {
      e.preventDefault();
      pauseSurvey();
    }
  });

  // Send invitations button
  document.addEventListener('click', function(e) {
    if (e.target.id === 'send-invitations-btn') {
      e.preventDefault();
      showVendorInvitationModal();
    }
  });

  // Add question button
  document.addEventListener('click', function(e) {
    if (e.target.id === 'add-question-btn') {
      e.preventDefault();
      addQuestion();
    }
  });

  // Save survey button
  document.addEventListener('click', function(e) {
    if (e.target.id === 'save-survey-btn') {
      e.preventDefault();
      saveSurvey();
    }
  });

  // Form submissions
  document.addEventListener('submit', function(e) {
    if (e.target.id === 'create-project-form') {
      e.preventDefault();
      handleCreateProject(e);
    }
    
    if (e.target.id === 'add-vendor-form') {
      e.preventDefault();
      handleAddVendor(e);
    }
    
    if (e.target.id === 'vendor-invitation-form') {
      e.preventDefault();
      handleSendInvitations(e);
    }
  });

  // Vendor filters
  document.addEventListener('input', function(e) {
    if (e.target.id === 'vendor-search') {
      filterVendors();
    }
  });
  
  document.addEventListener('change', function(e) {
    if (e.target.id === 'vendor-specialty-filter' || e.target.id === 'vendor-status-filter') {
      filterVendors();
    }
  });

  console.log('All event listeners setup complete');
}

function handleRoleSelection(role) {
  console.log('Handling role selection for:', role);
  
  try {
    currentRole = role;
    
    // Create mock user based on role
    currentUser = {
      id: role === 'client' ? 1 : role === 'supplier' ? 2 : 3,
      name: role === 'client' ? 'John Smith' : role === 'supplier' ? 'Sarah Johnson' : 'Mike Chen',
      role: role,
      email: `${role}@example.com`
    };
    
    appData.currentUser = currentUser;
    
    console.log('User created:', currentUser);
    console.log('Showing main app...');
    
    // Show main app
    showMainApp();
    
    console.log('Setting up user interface...');
    // Setup user interface
    setupUserInterface();
    
    console.log('Loading dashboard...');
    // Load dashboard
    loadDashboard();
    
    console.log('Role selection completed successfully');
  } catch (error) {
    console.error('Error in handleRoleSelection:', error);
    showNotification('Error selecting role: ' + error.message, 'error');
  }
}

function showLoginScreen() {
  console.log('Showing login screen');
  const loginScreen = document.getElementById('login-screen');
  const mainApp = document.getElementById('main-app');
  
  if (loginScreen) {
    loginScreen.classList.remove('hidden');
  }
  if (mainApp) {
    mainApp.classList.add('hidden');
  }
}

function showMainApp() {
  console.log('Showing main app');
  const loginScreen = document.getElementById('login-screen');
  const mainApp = document.getElementById('main-app');
  
  if (loginScreen) {
    loginScreen.classList.add('hidden');
    console.log('Login screen hidden');
  }
  if (mainApp) {
    mainApp.classList.remove('hidden');
    console.log('Main app shown');
  }
}

function logout() {
  console.log('Logging out');
  currentUser = null;
  currentRole = null;
  appData.currentUser = null;
  showLoginScreen();
}

function setupUserInterface() {
  console.log('Setting up user interface for:', currentUser.name, currentRole);
  
  const currentUserElement = document.getElementById('current-user');
  if (currentUserElement) {
    currentUserElement.textContent = `Welcome, ${currentUser.name}`;
    console.log('User name updated in header');
  }
}

function showTab(tabName) {
  console.log('Showing tab:', tabName);
  
  // Update active tab
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  
  const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
  if (activeTab) {
    activeTab.classList.add('active');
  }

  // Show content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  
  const tabContent = document.getElementById(`${tabName}-tab`);
  if (tabContent) {
    tabContent.classList.add('active');
  }

  // Load content based on tab
  switch(tabName) {
    case 'dashboard':
      loadDashboard();
      break;
    case 'projects':
      loadProjects();
      break;
    case 'vendors':
      loadVendors();
      break;
    case 'surveys':
      loadSurveys();
      break;
    case 'analytics':
      loadAnalytics();
      break;
  }
}

// Dashboard Functions
function loadDashboard() {
  console.log('Loading dashboard...');
  loadDashboardMetrics();
  loadRecentActivity();
  loadQuickActions();
}

function loadDashboardMetrics() {
  const activeProjects = appData.projects.filter(p => p.status === 'active').length;
  const totalVendors = appData.vendors.filter(v => v.status === 'active').length;
  const totalResponses = appData.projects.reduce((sum, project) => sum + project.responses, 0);
  const avgCompletionRate = Math.round(appData.projects.reduce((sum, project) => sum + project.completion_rate, 0) / appData.projects.length);

  updateElement('active-projects-count', activeProjects);
  updateElement('total-vendors-count', totalVendors);
  updateElement('total-responses-count', totalResponses);
  updateElement('completion-rate', `${avgCompletionRate}%`);
}

function loadRecentActivity() {
  const activityList = document.getElementById('activity-list');
  if (!activityList) return;
  
  const activities = [
    { title: 'Electronics Survey launched', time: '2 hours ago' },
    { title: 'New vendor "PanelCo Research" added', time: '5 hours ago' },
    { title: '463 survey responses completed', time: '1 day ago' },
    { title: 'Healthcare Study project created', time: '2 days ago' }
  ];

  activityList.innerHTML = activities.map(activity => `
    <div class="activity-item">
      <div class="activity-info">
        <div class="activity-title">${activity.title}</div>
        <div class="activity-time">${activity.time}</div>
      </div>
    </div>
  `).join('');
}

function loadQuickActions() {
  const actionButtons = document.getElementById('action-buttons');
  if (!actionButtons) return;
  
  let actions = [];

  if (currentRole === 'client') {
    actions = [
      { text: 'Create New Project', action: 'create-project' },
      { text: 'Manage Vendors', action: 'view-vendors' },
      { text: 'View Analytics', action: 'view-analytics' },
      { text: 'Launch Survey', action: 'launch-survey' }
    ];
  } else if (currentRole === 'supplier') {
    actions = [
      { text: 'Browse Projects', action: 'view-projects' },
      { text: 'Manage Surveys', action: 'view-surveys' },
      { text: 'Update Profile', action: 'update-profile' },
      { text: 'View Reports', action: 'view-analytics' }
    ];
  } else if (currentRole === 'admin') {
    actions = [
      { text: 'Monitor Platform', action: 'view-analytics' },
      { text: 'Manage Vendors', action: 'view-vendors' },
      { text: 'System Reports', action: 'view-reports' },
      { text: 'User Management', action: 'manage-users' }
    ];
  }

  actionButtons.innerHTML = actions.map(action => `
    <button class="btn btn--outline" onclick="handleQuickAction('${action.action}')">${action.text}</button>
  `).join('');
}

function handleQuickAction(action) {
  switch(action) {
    case 'create-project':
      openModal('create-project-modal');
      break;
    case 'view-vendors':
      showTab('vendors');
      break;
    case 'view-analytics':
      showTab('analytics');
      break;
    case 'view-projects':
      showTab('projects');
      break;
    case 'view-surveys':
      showTab('surveys');
      break;
    case 'launch-survey':
      const activeProject = appData.projects.find(p => p.status === 'active');
      if (activeProject) {
        viewProjectDetails(activeProject.id, 'launch');
      } else {
        showNotification('No active projects to launch', 'info');
      }
      break;
    default:
      showNotification('Feature coming soon', 'info');
  }
}

// Project Functions
function loadProjects() {
  console.log('Loading projects...');
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid) return;
  
  if (appData.projects.length === 0) {
    projectsGrid.innerHTML = '<div class="empty-state"><h3>No projects found</h3><p>Create your first project to get started.</p></div>';
    return;
  }

  projectsGrid.innerHTML = appData.projects.map(project => `
    <div class="project-card card">
      <div class="card__body">
        <div class="project-header">
          <h3 class="project-title">${project.title}</h3>
          <span class="status status--${getStatusClass(project.status)}">${project.status}</span>
        </div>
        
        <p class="mb-16">${project.description}</p>
        
        <div class="project-details">
          <div class="project-detail">
            <span class="project-detail-label">Target Audience:</span>
            <span class="project-detail-value">${project.target_audience}</span>
          </div>
          <div class="project-detail">
            <span class="project-detail-label">Sample Size:</span>
            <span class="project-detail-value">${project.sample_size.toLocaleString()}</span>
          </div>
          <div class="project-detail">
            <span class="project-detail-label">Budget:</span>
            <span class="project-detail-value">$${project.budget.toLocaleString()}</span>
          </div>
          <div class="project-detail">
            <span class="project-detail-label">CPC:</span>
            <span class="project-detail-value">$${project.cpc}</span>
          </div>
          <div class="project-detail">
            <span class="project-detail-label">Deadline:</span>
            <span class="project-detail-value">${formatDate(project.deadline)}</span>
          </div>
        </div>
        
        ${project.status === 'active' ? `
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${project.completion_rate}%"></div>
          </div>
          <div class="text-center text-sm">
            ${project.responses} responses • ${project.completes} completes • ${project.completion_rate}% complete
          </div>
        ` : ''}
        
        <div class="project-actions">
          <button class="btn btn--primary btn--sm" onclick="viewProjectDetails(${project.id})">Manage</button>
          ${project.status === 'bidding' ? '<button class="btn btn--outline btn--sm" onclick="deleteProject(' + project.id + ')">Delete</button>' : ''}
        </div>
      </div>
    </div>
  `).join('');
}

function handleCreateProject(e) {
  console.log('Creating project...');
  
  const formData = new FormData(e.target);
  const projectData = {
    id: Math.max(...appData.projects.map(p => p.id), 0) + 1,
    title: formData.get('title'),
    description: formData.get('description'),
    target_audience: formData.get('target_audience'),
    sample_size: parseInt(formData.get('sample_size')),
    budget: parseInt(formData.get('budget')),
    cpc: parseFloat(formData.get('cpc')),
    deadline: formData.get('deadline'),
    survey_link: formData.get('survey_link'),
    client_id: currentUser.id,
    status: 'bidding',
    completion_rate: 0,
    responses: 0,
    completes: 0,
    created_date: new Date().toISOString().split('T')[0],
    launched: false,
    vendors_assigned: [],
    redirect_urls: {
      complete: "",
      screenout: "",
      quota_full: "",
      incomplete: ""
    }
  };

  appData.projects.push(projectData);
  closeAllModals();
  showNotification('Project created successfully!', 'success');
  loadProjects();
  loadDashboard();
  e.target.reset();
}

function viewProjectDetails(projectId, activeTab = 'overview') {
  const project = appData.projects.find(p => p.id === projectId);
  if (!project) return;

  currentProject = project;
  
  updateElement('project-details-title', `${project.title} - Details`);
  
  // Setup tabs
  setupProjectDetailsTabs(activeTab);
  
  // Load content
  loadProjectOverview(project);
  loadVendorAssignment(project);
  loadRedirectConfiguration(project);
  loadLaunchManagement(project);
  
  openModal('project-details-modal');
}

function setupProjectDetailsTabs(activeTab) {
  // Set up tab click handlers
  setTimeout(() => {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const tab = this.getAttribute('data-detail-tab');
        showProjectDetailTab(tab);
      });
    });
  }, 100);
  
  showProjectDetailTab(activeTab);
}

function showProjectDetailTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelectorAll('.detail-tab-content').forEach(content => {
    content.classList.remove('active');
  });
  
  const tabBtn = document.querySelector(`[data-detail-tab="${tab}"]`);
  const tabContent = document.getElementById(`${tab}-detail`);
  
  if (tabBtn) tabBtn.classList.add('active');
  if (tabContent) tabContent.classList.add('active');
}

function loadProjectOverview(project) {
  const overviewContent = document.getElementById('project-overview-content');
  if (!overviewContent) return;

  const assignedVendors = appData.vendors.filter(v => project.vendors_assigned.includes(v.id));

  overviewContent.innerHTML = `
    <div class="project-overview">
      <div class="project-details">
        <div class="project-detail">
          <span class="project-detail-label">Status:</span>
          <span class="status status--${getStatusClass(project.status)}">${project.status}</span>
        </div>
        <div class="project-detail">
          <span class="project-detail-label">Target Audience:</span>
          <span class="project-detail-value">${project.target_audience}</span>
        </div>
        <div class="project-detail">
          <span class="project-detail-label">Sample Size:</span>
          <span class="project-detail-value">${project.sample_size.toLocaleString()}</span>
        </div>
        <div class="project-detail">
          <span class="project-detail-label">Budget:</span>
          <span class="project-detail-value">$${project.budget.toLocaleString()}</span>
        </div>
        <div class="project-detail">
          <span class="project-detail-label">Cost per Complete:</span>
          <span class="project-detail-value">$${project.cpc}</span>
        </div>
        <div class="project-detail">
          <span class="project-detail-label">Survey Link:</span>
          <span class="project-detail-value"><a href="${project.survey_link}" target="_blank">View Survey</a></span>
        </div>
        <div class="project-detail">
          <span class="project-detail-label">Assigned Vendors:</span>
          <span class="project-detail-value">${assignedVendors.length > 0 ? assignedVendors.map(v => v.name).join(', ') : 'None'}</span>
        </div>
        ${project.status === 'active' ? `
          <div class="project-detail">
            <span class="project-detail-label">Responses:</span>
            <span class="project-detail-value">${project.responses}</span>
          </div>
          <div class="project-detail">
            <span class="project-detail-label">Completes:</span>
            <span class="project-detail-value">${project.completes}</span>
          </div>
          <div class="project-detail">
            <span class="project-detail-label">Completion Rate:</span>
            <span class="project-detail-value">${project.completion_rate}%</span>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

function deleteProject(projectId) {
  if (confirm('Are you sure you want to delete this project?')) {
    appData.projects = appData.projects.filter(p => p.id !== projectId);
    showNotification('Project deleted successfully', 'success');
    loadProjects();
    loadDashboard();
  }
}

// Vendor Functions
function loadVendors() {
  console.log('Loading vendors...');
  const vendorsGrid = document.getElementById('vendors-grid');
  if (!vendorsGrid) return;
  
  if (filteredVendors.length === 0) {
    vendorsGrid.innerHTML = '<div class="empty-state"><h3>No vendors found</h3><p>Add your first vendor to get started.</p></div>';
    return;
  }

  vendorsGrid.innerHTML = filteredVendors.map(vendor => `
    <div class="vendor-card card">
      <div class="card__body">
        <div class="vendor-header">
          <h3 class="vendor-name">${vendor.name}</h3>
          <div class="vendor-rating">
            ⭐ ${vendor.rating}
          </div>
        </div>
        
        <div class="vendor-contact">
          <div class="vendor-contact-item">
            <span class="project-detail-label">Contact:</span>
            <span class="project-detail-value">${vendor.contact_person}</span>
          </div>
          <div class="vendor-contact-item">
            <span class="project-detail-label">Email:</span>
            <span class="project-detail-value">${vendor.contact_email}</span>
          </div>
          <div class="vendor-contact-item">
            <span class="project-detail-label">Phone:</span>
            <span class="project-detail-value">${vendor.phone}</span>
          </div>
          <div class="vendor-contact-item">
            <span class="project-detail-label">Specialty:</span>
            <span class="project-detail-value">${vendor.specialty}</span>
          </div>
        </div>
        
        <div class="vendor-stats">
          <div class="vendor-stat">
            <span class="vendor-stat-value">${vendor.panel_size.toLocaleString()}</span>
            <span class="vendor-stat-label">Panel Size</span>
          </div>
          <div class="vendor-stat">
            <span class="vendor-stat-value">${vendor.completion_rate}%</span>
            <span class="vendor-stat-label">Completion Rate</span>
          </div>
          <div class="vendor-stat">
            <span class="vendor-stat-value">$${vendor.avg_cpc}</span>
            <span class="vendor-stat-label">Avg CPC</span>
          </div>
          <div class="vendor-stat">
            <span class="status status--${vendor.status === 'active' ? 'success' : 'error'}">${vendor.status}</span>
            <span class="vendor-stat-label">Status</span>
          </div>
        </div>
        
        <div class="vendor-countries">
          ${vendor.countries.map(country => `<span class="country-tag">${country}</span>`).join('')}
        </div>
        
        <div class="project-actions">
          <button class="btn btn--outline btn--sm" onclick="editVendor(${vendor.id})">Edit</button>
          <button class="btn btn--primary btn--sm" onclick="contactVendor(${vendor.id})">Contact</button>
        </div>
      </div>
    </div>
  `).join('');
}

function filterVendors() {
  const searchTerm = document.getElementById('vendor-search')?.value.toLowerCase() || '';
  const specialty = document.getElementById('vendor-specialty-filter')?.value || '';
  const status = document.getElementById('vendor-status-filter')?.value || '';

  filteredVendors = appData.vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm) || 
                         vendor.specialty.toLowerCase().includes(searchTerm);
    const matchesSpecialty = !specialty || vendor.specialty.includes(specialty);
    const matchesStatus = !status || vendor.status === status;

    return matchesSearch && matchesSpecialty && matchesStatus;
  });

  loadVendors();
}

function handleAddVendor(e) {
  console.log('Adding vendor...');
  
  const formData = new FormData(e.target);
  const vendorData = {
    id: Math.max(...appData.vendors.map(v => v.id), 0) + 1,
    name: formData.get('name'),
    contact_email: formData.get('contact_email'),
    contact_person: formData.get('contact_person'),
    phone: formData.get('phone'),
    specialty: formData.get('specialty'),
    panel_size: parseInt(formData.get('panel_size')),
    avg_cpc: parseFloat(formData.get('avg_cpc')),
    countries: formData.get('countries').split(',').map(c => c.trim()),
    rating: 0,
    completion_rate: 0,
    status: 'active'
  };

  appData.vendors.push(vendorData);
  filteredVendors = [...appData.vendors];
  closeAllModals();
  showNotification('Vendor added successfully!', 'success');
  loadVendors();
  loadDashboard();
  e.target.reset();
}

function loadVendorAssignment(project) {
  const vendorList = document.getElementById('vendor-assignment-list');
  if (!vendorList) return;

  vendorList.innerHTML = appData.vendors.map(vendor => `
    <div class="vendor-assignment-item">
      <input type="checkbox" class="vendor-assignment-checkbox" 
             data-vendor-id="${vendor.id}" 
             ${project.vendors_assigned.includes(vendor.id) ? 'checked' : ''}>
      <div class="vendor-assignment-info">
        <div class="vendor-assignment-name">${vendor.name}</div>
        <div class="vendor-assignment-details">
          ${vendor.specialty} • ${vendor.panel_size.toLocaleString()} panel • $${vendor.avg_cpc} avg CPC
        </div>
      </div>
    </div>
  `).join('');
}

function saveVendorAssignments() {
  if (!currentProject) return;

  const checkboxes = document.querySelectorAll('.vendor-assignment-checkbox:checked');
  const selectedVendorIds = Array.from(checkboxes).map(cb => parseInt(cb.dataset.vendorId));

  const project = appData.projects.find(p => p.id === currentProject.id);
  if (project) {
    project.vendors_assigned = selectedVendorIds;
    showNotification('Vendor assignments saved successfully!', 'success');
    loadProjectOverview(project);
  }
}

function editVendor(vendorId) {
  showNotification('Vendor editing feature coming soon', 'info');
}

function contactVendor(vendorId) {
  const vendor = appData.vendors.find(v => v.id === vendorId);
  if (vendor) {
    window.open(`mailto:${vendor.contact_email}?subject=Partnership Opportunity`, '_blank');
  }
}

// Redirect URL Functions
function loadRedirectConfiguration(project) {
  updateElement('complete-redirect', project.redirect_urls.complete);
  updateElement('screenout-redirect', project.redirect_urls.screenout);
  updateElement('quota-redirect', project.redirect_urls.quota_full);
  updateElement('incomplete-redirect', project.redirect_urls.incomplete);
}

function saveRedirectUrls() {
  if (!currentProject) return;

  const project = appData.projects.find(p => p.id === currentProject.id);
  if (project) {
    project.redirect_urls = {
      complete: document.getElementById('complete-redirect').value,
      screenout: document.getElementById('screenout-redirect').value,
      quota_full: document.getElementById('quota-redirect').value,
      incomplete: document.getElementById('incomplete-redirect').value
    };
    showNotification('Redirect URLs saved successfully!', 'success');
  }
}

// Survey Launch Functions  
function loadLaunchManagement(project) {
  const launchStatus = document.getElementById('launch-status');
  const launchBtn = document.getElementById('launch-survey-btn');
  const pauseBtn = document.getElementById('pause-survey-btn');

  if (launchStatus) {
    launchStatus.innerHTML = `
      <h5>Launch Status</h5>
      <p><strong>Status:</strong> ${project.launched ? 'Active' : 'Not Launched'}</p>
      <p><strong>Assigned Vendors:</strong> ${project.vendors_assigned.length}</p>
      <p><strong>Survey Link:</strong> <a href="${project.survey_link}" target="_blank">View</a></p>
      ${project.launched ? `
        <p><strong>Responses:</strong> ${project.responses}</p>
        <p><strong>Completes:</strong> ${project.completes}</p>
      ` : ''}
    `;
  }

  if (launchBtn) {
    launchBtn.textContent = project.launched ? 'Relaunch Survey' : 'Launch Survey';
    launchBtn.disabled = project.vendors_assigned.length === 0;
  }

  if (pauseBtn) {
    pauseBtn.style.display = project.launched ? 'inline-block' : 'none';
  }

  loadVendorInvitations(project);
}

function loadVendorInvitations(project) {
  const invitationList = document.getElementById('invitation-list');
  if (!invitationList) return;

  const invitations = appData.vendor_invitations.filter(inv => inv.project_id === project.id);
  
  invitationList.innerHTML = invitations.length > 0 ? 
    invitations.map(invitation => {
      const vendor = appData.vendors.find(v => v.id === invitation.vendor_id);
      return `
        <div class="invitation-item">
          <div class="invitation-vendor-name">${vendor ? vendor.name : 'Unknown Vendor'}</div>
          <span class="status status--${invitation.status === 'accepted' ? 'success' : invitation.status === 'sent' ? 'warning' : 'info'}">${invitation.status}</span>
        </div>
      `;
    }).join('') : '<p class="text-sm text-center">No invitations sent yet</p>';
}

function launchSurvey() {
  if (!currentProject) return;

  const project = appData.projects.find(p => p.id === currentProject.id);
  if (!project) return;

  if (project.vendors_assigned.length === 0) {
    showNotification('Please assign vendors before launching', 'error');
    return;
  }

  project.launched = true;
  project.status = 'active';
  
  // Simulate initial responses for demo
  if (project.responses === 0) {
    project.responses = Math.floor(Math.random() * 100) + 50;
    project.completes = Math.floor(project.responses * 0.7);
    project.completion_rate = Math.floor((project.completes / project.responses) * 100);
  }

  showNotification('Survey launched successfully!', 'success');
  loadLaunchManagement(project);
  loadProjects();
  loadDashboard();
}

function pauseSurvey() {
  if (!currentProject) return;

  const project = appData.projects.find(p => p.id === currentProject.id);
  if (project) {
    project.launched = false;
    project.status = 'paused';
    showNotification('Survey paused', 'info');
    loadLaunchManagement(project);
    loadProjects();
  }
}

function showVendorInvitationModal() {
  if (!currentProject || currentProject.vendors_assigned.length === 0) {
    showNotification('Please assign vendors first', 'error');
    return;
  }

  const selectedVendorsList = document.getElementById('selected-vendors-list');
  const assignedVendors = appData.vendors.filter(v => currentProject.vendors_assigned.includes(v.id));
  
  if (selectedVendorsList) {
    selectedVendorsList.innerHTML = `
      <h5>Selected Vendors:</h5>
      ${assignedVendors.map(vendor => `
        <div class="selected-vendor-item">
          <span>${vendor.name}</span>
          <span>${vendor.contact_email}</span>
        </div>
      `).join('')}
    `;
  }

  openModal('vendor-invitation-modal');
}

function handleSendInvitations(e) {
  console.log('Sending invitations...');
  
  if (!currentProject) return;

  const formData = new FormData(e.target);
  const message = formData.get('message') || `We invite you to participate in our ${currentProject.title} project.`;

  // Create invitations for all assigned vendors
  currentProject.vendors_assigned.forEach(vendorId => {
    const existingInvitation = appData.vendor_invitations.find(
      inv => inv.project_id === currentProject.id && inv.vendor_id === vendorId
    );

    if (!existingInvitation) {
      appData.vendor_invitations.push({
        id: Math.max(...appData.vendor_invitations.map(inv => inv.id), 0) + 1,
        project_id: currentProject.id,
        vendor_id: vendorId,
        status: 'sent',
        sent_date: new Date().toISOString().split('T')[0],
        message: message
      });
    }
  });

  closeAllModals();
  showNotification('Invitations sent successfully!', 'success');
  loadVendorInvitations(currentProject);
  e.target.reset();
}

// Survey Functions
function loadSurveys() {
  console.log('Loading surveys...');
  const surveysGrid = document.getElementById('surveys-grid');
  if (!surveysGrid) return;
  
  if (appData.surveys.length === 0) {
    surveysGrid.innerHTML = '<div class="empty-state"><h3>No surveys found</h3><p>Create your first survey to get started.</p></div>';
    return;
  }

  surveysGrid.innerHTML = appData.surveys.map(survey => {
    const project = appData.projects.find(p => p.id === survey.project_id);
    return `
      <div class="survey-card card">
        <div class="card__body">
          <div class="project-header">
            <h3 class="project-title">${survey.name}</h3>
            <span class="status status--${survey.status === 'active' ? 'success' : 'info'}">${survey.status}</span>
          </div>
          
          <p class="text-sm mb-16">Project: ${project ? project.title : 'Unknown Project'}</p>
          
          <div class="survey-stats">
            <div class="survey-stat">
              <span class="survey-stat-value">${survey.response_count}</span>
              <span class="survey-stat-label">Responses</span>
            </div>
            <div class="survey-stat">
              <span class="survey-stat-value">${survey.completion_rate}%</span>
              <span class="survey-stat-label">Completion</span>
            </div>
            <div class="survey-stat">
              <span class="survey-stat-value">${survey.avg_completion_time}</span>
              <span class="survey-stat-label">Avg Time</span>
            </div>
          </div>
          
          <div class="project-actions">
            <button class="btn btn--outline btn--sm" onclick="viewSurveyDetails(${survey.id})">View Details</button>
            <button class="btn btn--primary btn--sm" onclick="manageSurvey(${survey.id})">Manage</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function openSurveyBuilder() {
  const projectSelect = document.getElementById('survey-project');
  if (projectSelect) {
    projectSelect.innerHTML = '<option value="">Select a project</option>' +
      appData.projects.map(project => 
        `<option value="${project.id}">${project.title}</option>`
      ).join('');
  }

  document.getElementById('questions-list').innerHTML = '';
  openModal('survey-builder-modal');
}

function addQuestion() {
  const questionsList = document.getElementById('questions-list');
  if (!questionsList) return;
  
  const questionId = Date.now();
  
  const questionHTML = `
    <div class="question-item" data-question-id="${questionId}">
      <div class="question-header">
        <input type="text" class="form-control" placeholder="Enter your question" name="question-text">
        <button type="button" class="btn btn--outline btn--sm" onclick="removeQuestion(${questionId})">Remove</button>
      </div>
      
      <div class="question-type-select">
        <select class="form-control" name="question-type" onchange="updateQuestionType(${questionId})">
          <option value="single_choice">Single Choice</option>
          <option value="multiple_choice">Multiple Choice</option>
          <option value="text">Text Input</option>
          <option value="rating">Rating Scale</option>
        </select>
      </div>
      
      <div class="options-section">
        <div class="options-list" id="options-${questionId}">
          <div class="option-input">
            <input type="text" class="form-control" placeholder="Option 1" name="option">
            <button type="button" class="remove-option" onclick="removeOption(this)">Remove</button>
          </div>
          <div class="option-input">
            <input type="text" class="form-control" placeholder="Option 2" name="option">
            <button type="button" class="remove-option" onclick="removeOption(this)">Remove</button>
          </div>
        </div>
        <button type="button" class="btn btn--outline btn--sm add-option" onclick="addOption(${questionId})">Add Option</button>
      </div>
    </div>
  `;
  
  questionsList.insertAdjacentHTML('beforeend', questionHTML);
}

function removeQuestion(questionId) {
  const element = document.querySelector(`[data-question-id="${questionId}"]`);
  if (element) {
    element.remove();
  }
}

function updateQuestionType(questionId) {
  const questionItem = document.querySelector(`[data-question-id="${questionId}"]`);
  if (!questionItem) return;
  
  const typeSelect = questionItem.querySelector('[name="question-type"]');
  const optionsSection = questionItem.querySelector('.options-section');
  
  if (typeSelect && optionsSection) {
    const type = typeSelect.value;
    optionsSection.style.display = type === 'text' ? 'none' : 'block';
  }
}

function addOption(questionId) {
  const optionsList = document.getElementById(`options-${questionId}`);
  if (!optionsList) return;
  
  const optionCount = optionsList.children.length + 1;
  
  const optionHTML = `
    <div class="option-input">
      <input type="text" class="form-control" placeholder="Option ${optionCount}" name="option">
      <button type="button" class="remove-option" onclick="removeOption(this)">Remove</button>
    </div>
  `;
  
  optionsList.insertAdjacentHTML('beforeend', optionHTML);
}

function removeOption(button) {
  if (button && button.parentElement) {
    button.parentElement.remove();
  }
}

function saveSurvey() {
  const surveyName = document.getElementById('survey-name').value;
  const projectId = document.getElementById('survey-project').value;
  
  if (!surveyName.trim()) {
    showNotification('Please enter a survey name', 'error');
    return;
  }

  if (!projectId) {
    showNotification('Please select a project', 'error');
    return;
  }

  // Create new survey
  const surveyData = {
    id: Math.max(...appData.surveys.map(s => s.id), 0) + 1,
    project_id: parseInt(projectId),
    name: surveyName,
    status: 'draft',
    response_count: 0,
    completion_rate: 0,
    avg_completion_time: '0 minutes',
    created_date: new Date().toISOString().split('T')[0]
  };

  appData.surveys.push(surveyData);
  closeAllModals();
  showNotification('Survey created successfully!', 'success');
  loadSurveys();
}

function viewSurveyDetails(surveyId) {
  showNotification('Survey details view coming soon', 'info');
}

function manageSurvey(surveyId) {
  showNotification('Survey management features coming soon', 'info');
}

// Analytics Functions
function loadAnalytics() {
  console.log('Loading analytics...');
  setTimeout(() => {
    loadResponseChart();
    loadVendorChart();
  }, 100);
}

function loadResponseChart() {
  const canvas = document.getElementById('response-chart');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: appData.analytics_data.daily_responses.map(d => formatDate(d.date)),
      datasets: [
        {
          label: 'Total Responses',
          data: appData.analytics_data.daily_responses.map(d => d.responses),
          borderColor: '#1FB8CD',
          backgroundColor: 'rgba(31, 184, 205, 0.1)',
          fill: true
        },
        {
          label: 'Completes',
          data: appData.analytics_data.daily_responses.map(d => d.completes),
          borderColor: '#FFC185',
          backgroundColor: 'rgba(255, 193, 133, 0.1)',
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
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

function loadVendorChart() {
  const canvas = document.getElementById('vendor-chart');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: appData.analytics_data.vendor_performance.map(v => v.vendor),
      datasets: [
        {
          label: 'Responses',
          data: appData.analytics_data.vendor_performance.map(v => v.responses),
          backgroundColor: '#1FB8CD'
        },
        {
          label: 'Completes',
          data: appData.analytics_data.vendor_performance.map(v => v.completes),
          backgroundColor: '#FFC185'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
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

// Utility Functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.add('hidden');
  });
}

function updateElement(id, value) {
  const element = document.getElementById(id);
  if (element) {
    if (element.tagName === 'INPUT') {
      element.value = value;
    } else {
      element.textContent = value;
    }
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

function getStatusClass(status) {
  const statusClasses = {
    'active': 'success',
    'bidding': 'warning', 
    'paused': 'info',
    'completed': 'success',
    'draft': 'info'
  };
  return statusClasses[status] || 'info';
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}