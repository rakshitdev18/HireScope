const pairs = [
    ["Careers", "Future"],
    ["Roles", "Workplace"],
    ["Skills", "Job Market"]
];

let pairIndex = 0;
let charIndex = 0;
let isTyping = true;

const typeSpeed = 110;
const pause = 1200;

const word1 = document.getElementById("word1");
const word2 = document.getElementById("word2");

function typeEffect() {
    const first = pairs[pairIndex][0];
    const second = pairs[pairIndex][1];

    if (isTyping) {
        word1.textContent = first.slice(0, charIndex++);
        word2.textContent = second;

        if (charIndex > first.length) {
            isTyping = false;
            setTimeout(() => {
                pairIndex = (pairIndex + 1) % pairs.length;
                charIndex = 0;
                isTyping = true;
            }, pause);
        }
    }
    setTimeout(typeEffect, typeSpeed);
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    typeEffect();
});

// ========== PROJECT DATA ==========
const projectData = {
    frontend: {
        name: '🎨 Frontend Developer',
        languages: ['html', 'react', 'flutter'],
        languageLabels: {
            'html': 'HTML/CSS/JS',
            'react': 'React Native',
            'flutter': 'Flutter'
        },
        beginner: [
            'Build responsive layouts with Flexbox/Grid',
            'Create interactive components with JavaScript',
            'Form validation and error handling',
            'CSS animations and transitions',
            'Consume REST APIs with fetch',
            'Deploy to Netlify/Vercel'
        ],
        advanced: [
            'Build a React application from scratch',
            'State management with Redux/Context',
            'Performance optimization & code splitting',
            'Implement authentication flow',
            'Progressive Web App features',
            'Unit testing with Jest'
        ]
    },
    backend: {
        name: '⚙️ Backend Developer',
        languages: ['django', 'node', 'flask'],
        languageLabels: {
            'django': 'Django (Python)',
            'node': 'Node.js',
            'flask': 'Flask (Python)'
        },
        beginner: [
            'Create REST API endpoints',
            'Connect to PostgreSQL database',
            'CRUD operations with Prisma/ORM',
            'Request validation and error handling',
            'Environment configuration',
            'API documentation with Swagger'
        ],
        advanced: [
            'JWT authentication & authorization',
            'Database indexing and optimization',
            'Implement Redis caching',
            'Microservices architecture',
            'WebSocket real-time features',
            'Docker containerization'
        ]
    },
    tester: {
        name: '🧪 Software Tester',
        languages: ['selenium', 'cypress', 'jmeter'],
        languageLabels: {
            'selenium': 'Selenium',
            'cypress': 'Cypress',
            'jmeter': 'JMeter'
        },
        beginner: [
            'Write test cases from requirements',
            'Manual testing and bug reporting',
            'Regression testing',
            'Cross-browser testing',
            'Test plan documentation',
            'Basic SQL for test data'
        ],
        advanced: [
            'Automated testing with Selenium',
            'API testing with Postman/Newman',
            'Performance testing with JMeter',
            'CI/CD pipeline integration',
            'Security testing basics',
            'Test automation framework design'
        ]
    },
    analyst: {
        name: '📊 Data Analyst',
        languages: ['python', 'sql', 'r'],
        languageLabels: {
            'python': 'Python (Pandas)',
            'sql': 'SQL',
            'r': 'R Programming'
        },
        beginner: [
            'Data cleaning with Pandas',
            'Exploratory data analysis',
            'Basic visualizations with Matplotlib',
            'SQL queries for data extraction',
            'Summary statistics',
            'Export insights to Excel'
        ],
        advanced: [
            'Advanced data transformations',
            'Interactive dashboards with Plotly',
            'Time series analysis',
            'A/B testing analysis',
            'Machine learning preprocessing',
            'Deploy analytics as web app'
        ]
    },
    cloud: {
        name: '☁️ Cloud Engineer',
        languages: ['aws', 'azure', 'gcp'],
        languageLabels: {
            'aws': 'AWS',
            'azure': 'Azure',
            'gcp': 'Google Cloud'
        },
        beginner: [ 
            'Set up a virtual machine',
            'Deploy a static website',
            'Configure a managed database',
            'Implement basic security groups',
        ],
        advanced: [
            'Infrastructure as Code with Terraform',
            'Kubernetes cluster setup',
            'Serverless architecture',
            'Cloud monitoring and logging',
            'Auto-scaling configuration',
            'Disaster recovery planning'
        ]
    },
    devops: {
        name: '🔧 DevOps Engineer',
        languages: ['docker', 'kubernetes', 'jenkins'],
        languageLabels: {
            'docker': 'Docker',
            'kubernetes': 'Kubernetes',
            'jenkins': 'Jenkins'
        },
        beginner: [ 
            'Set up a CI/CD pipeline',
            'Containerize an application with Docker',
            'Deploy to a cloud provider',
            'Monitor application performance',
        ],
        advanced: [
            'Infrastructure automation with Ansible',
            'Service mesh implementation',
            'GitOps with ArgoCD',
            'Advanced Kubernetes patterns',
            'Security scanning in CI/CD',
            'Multi-cloud deployments'
        ]
    },

};

// ========== STATE ==========
let currentProject = null;
let currentProjectId = null;
let currentProjectName = null;
let currentLevel = null;
let selectedLanguage = null;

// ========== MODAL FUNCTIONS ==========
function openProject(roleName, roleId) {
    // Store the role information
    currentProjectName = roleName;
    currentProjectId = roleId;

    // Map the role name to the project key for the UI data
    currentProject = mapRoleToProjectKey(roleName);

    document.getElementById('projTitle').textContent = projectData[currentProject].name;
    document.getElementById('levelModal').classList.add('show');

    // Reset state
    currentLevel = null;
    selectedLanguage = null;
    document.querySelectorAll('.level-btn').forEach(b => {
        b.classList.remove('selected');
    });
    document.getElementById('langBox').classList.add('hide');
    
    // Clear and repopulate language dropdown
    const langSelect = document.getElementById('lang');
    langSelect.innerHTML = '';
}

function mapRoleToProjectKey(roleName) {
    // Map the role names from your backend to the projectData keys
    const roleMapping = {
        'Frontend Developer': 'frontend',
        'Backend Developer': 'backend',
        'Software Tester': 'tester',
        'Data Analyst': 'analyst',
        'DevOps Engineer': 'devops',
        'Cloud Engineer': 'cloud',
    };

    return roleMapping[roleName] || 'frontend'; // Default to frontend if not found
}

function populateLanguageDropdown() {
    const langSelect = document.getElementById('lang');
    langSelect.innerHTML = ''; // Clear existing options
    
    if (currentProject && projectData[currentProject]) {
        const project = projectData[currentProject];
        
        // Add default empty option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select a technology';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        langSelect.appendChild(defaultOption);
        
        // Add language options based on project type
        project.languages.forEach(lang => {
            const option = document.createElement('option');
            option.value = lang;
            option.textContent = project.languageLabels[lang] || lang;
            langSelect.appendChild(option);
        });
    }
}

function chooseLevel(level, btn) {
    currentLevel = level;
    // Remove selected class from all level buttons
    document.querySelectorAll('.level-btn').forEach(b => {
        b.classList.remove('selected');
    });

    // Add selected class to clicked button
    btn.classList.add('selected');

    if (level === 'beginner') {
        // For beginner, hide language selection
        document.getElementById('langBox').classList.add('hide');
        selectedLanguage = projectData[currentProject].languages[0]; // Default to first language
    } else {
        // For advanced, show language selection with project-specific options
        populateLanguageDropdown();
        document.getElementById('langBox').classList.remove('hide');
        selectedLanguage = null;
    }
}

function begin() {
    if (!currentLevel) {
        alert('👋 Please select your experience level');
        return;
    }

    // Get language selection for advanced level
    if (currentLevel === 'advanced') {
        selectedLanguage = document.getElementById('lang').value;
        if (!selectedLanguage) {
            alert('👋 Please select a technology to continue');
            return;
        }
    }

    if (!currentProject) {
        alert('👋 Please select a simulation');
        return;
    }

    const project = projectData[currentProject];
    const topics = currentLevel === 'beginner' ? project.beginner : project.advanced;

    // Format level name
    const levelName = currentLevel === 'beginner' ? '🌱 Beginner Path' : '🚀 Advanced Path';
    
    // Get language display name
    const languageDisplay = currentLevel === 'beginner' 
        ? project.languageLabels[selectedLanguage] || selectedLanguage
        : project.languageLabels[selectedLanguage] || selectedLanguage;

    // Display project details
    document.getElementById('details').innerHTML = `
        <div class="info-box">
            <h4>${project.name}</h4>

            <div style="display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap;">
                <span style="background: #3b82f6; color: white; padding: 6px 16px; border-radius: 30px; font-size: 0.9em; font-weight: 600;">
                    ${levelName}
                </span>
                <span style="background: rgba(255,255,255,0.1); color: white; padding: 6px 16px; border-radius: 30px; font-size: 0.9em; font-weight: 600;">
                    💻 ${languageDisplay}
                </span>
            </div>

            <h5 style="color: white; margin-bottom: 16px; font-size: 1.1em;">📋 Your Learning Roadmap:</h5>
            <ul>
                ${topics.map(t => `<li>${t}</li>`).join('')}
            </ul>

            <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); color: #3b82f6; font-weight: 500;">
                ⏱️ Estimated time: ${currentLevel === 'beginner' ? '2-3' : '4-5'} hours • Self-paced
            </div>
        </div>
    `;

    // Close level modal and open details modal
    document.getElementById('levelModal').classList.remove('show');
    document.getElementById('startModal').classList.add('show');
}

function startSimulation() {
    // Prepare data to send to backend
    const simulationData = {
        role_id: currentProjectId,
        role_name: currentProjectName,
        level: currentLevel,
        language: selectedLanguage,
        timestamp: new Date().toISOString()
    };

    // Send data to backend using fetch API
    fetch('/trial/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'), // Include if using Django CSRF protection
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(simulationData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Simulation started successfully:', data);
        
        // Check the role and redirect accordingly
        const frontendRoles = ['Frontend Developer', 'Backend Developer', 'Data Analyst'];
        
        if (frontendRoles.includes(currentProjectName)) {
            // Redirect to tt.html for these roles
            window.location.href = '/sim/';
        } else {
            // For other roles, redirect to a different page or handle differently
            window.location.href = `/simulation/${currentProjectId}/`;
        }
        
        closeModals();
    })
    .catch(error => {
        console.error('Error starting simulation:', error);
        alert('Failed to start simulation. Please try again.');
    });
}

// Helper function to get CSRF token (for Django)
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function closeModals() {
    document.getElementById('levelModal').classList.remove('show');
    document.getElementById('startModal').classList.remove('show');
    document.querySelectorAll('.level-btn').forEach(b => {
        b.classList.remove('selected');
    });
    document.getElementById('langBox').classList.add('hide');
    document.getElementById('lang').innerHTML = '';
    currentLevel = null;
    currentProject = null;
    currentProjectId = null;
    currentProjectName = null;
    selectedLanguage = null;
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('overlay')) {
        closeModals();
    }
}

// Make functions available globally
window.openProject = openProject;
window.chooseLevel = chooseLevel;
window.begin = begin;
window.startSimulation = startSimulation;
window.closeModals = closeModals;

let timeLeft = 10;
const countdownElement = document.getElementById("countdown");

const timer = setInterval(() => {
    timeLeft--;
    countdownElement.textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(timer);
        window.location.href = "/begin/"; // Redirect to the welcome page after countdown
    }
}, 1000);