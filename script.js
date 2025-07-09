// Language translations
const translations = {
    en: {
        brand: "NirogAI",
        nav: {
            home: "Home",
            symptoms: "Symptoms Checker",
            health: "Health Info",
            languages: "Languages",
            about: "About",
            contact: "Contact"
        },
        hero: {
            title: "Welcome to NirogAI – Your Local AI Health Companion",
            subtitle: "Get instant health insights in your preferred language with AI-powered assistance",
            cta: "Start Checking"
        },
        symptoms: {
            title: "AI Symptoms Checker",
            subtitle: "Describe your symptoms and get instant AI-powered insights",
            label: "Describe your symptoms",
            placeholder: "e.g., I have a headache and fever for 2 days...",
            language: "Select Language",
            submit: "Get Diagnosis",
            loading: "Analyzing your symptoms...",
            result: {
                title: "AI Analysis Result"
            },
            disclaimer: "This is AI-generated information and should not replace professional medical advice.",
            history: {
                title: "Recent Searches"
            }
        },
        health: {
            title: "Health Information",
            subtitle: "Learn about common health conditions and preventive care",
            fever: {
                title: "Fever",
                desc: "Understanding fever causes and management"
            },
            cough: {
                title: "Cough",
                desc: "Types of cough and treatment options"
            },
            diabetes: {
                title: "Diabetes",
                desc: "Managing diabetes and blood sugar levels"
            },
            mental: {
                title: "Mental Health",
                desc: "Mental wellness and stress management"
            },
            firstaid: {
                title: "First Aid",
                desc: "Emergency first aid procedures"
            },
            nutrition: {
                title: "Nutrition",
                desc: "Healthy eating and dietary guidelines"
            }
        },
        languages: {
            title: "Supported Languages",
            subtitle: "Choose your preferred language for better communication"
        },
        about: {
            title: "About NirogAI",
            desc1: "NirogAI is an innovative AI-powered health assistant designed specifically for India's diverse linguistic landscape. Our mission is to make healthcare information accessible to everyone, regardless of their preferred language.",
            desc2: "With support for multiple Indian languages, NirogAI bridges the gap between advanced AI technology and local healthcare needs, providing instant, reliable health insights in your native language.",
            feature1: "Multi-language Support",
            feature2: "AI-Powered Analysis",
            feature3: "Privacy Protected"
        },
        contact: {
            title: "Contact Us",
            subtitle: "Get in touch with our team for support or feedback",
            email: "Email",
            phone: "Phone",
            address: "Address",
            name: "Your Name",
            "email.placeholder": "Your Email",
            message: "Your Message",
            send: "Send Message"
        },
        footer: {
            desc: "Making healthcare accessible through AI and local languages",
            links: "Quick Links",
            legal: "Legal",
            disclaimer: "Disclaimer",
            privacy: "Privacy Policy",
            terms: "Terms of Service",
            social: "Follow Us"
        }
    },
    hi: {
        brand: "निरोगAI",
        nav: {
            home: "होम",
            symptoms: "लक्षण जांच",
            health: "स्वास्थ्य जानकारी",
            languages: "भाषाएं",
            about: "हमारे बारे में",
            contact: "संपर्क"
        },
        hero: {
            title: "निरोगAI में आपका स्वागत है – आपका स्थानीय AI स्वास्थ्य साथी",
            subtitle: "AI-संचालित सहायता के साथ अपनी पसंदीदा भाषा में तुरंत स्वास्थ्य जानकारी प्राप्त करें",
            cta: "जांच शुरू करें"
        },
        symptoms: {
            title: "AI लक्षण जांच",
            subtitle: "अपने लक्षणों का वर्णन करें और तुरंत AI-संचालित जानकारी प्राप्त करें",
            label: "अपने लक्षणों का वर्णन करें",
            placeholder: "जैसे, मुझे 2 दिनों से सिरदर्द और बुखार है...",
            language: "भाषा चुनें",
            submit: "निदान प्राप्त करें",
            loading: "आपके लक्षणों का विश्लेषण हो रहा है...",
            result: {
                title: "AI विश्लेषण परिणाम"
            },
            disclaimer: "यह AI-जनित जानकारी है और इसे पेशेवर चिकित्सा सलाह का विकल्प नहीं माना जाना चाहिए।",
            history: {
                title: "हाल की खोजें"
            }
        },
        // Add more Hindi translations as needed
    }
    // Add more languages as needed
};

// Global variables
let currentLanguage = 'en';
let searchHistory = JSON.parse(localStorage.getItem('nirogai_history')) || [];

// DOM elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const symptomsForm = document.getElementById('symptoms-form');
const loadingElement = document.getElementById('loading');
const resultElement = document.getElementById('result');
const historyList = document.getElementById('history-list');
const modal = document.getElementById('health-modal');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Set up event listeners
    setupEventListeners();
    
    // Initialize language
    updateLanguage(currentLanguage);
    
    // Load search history
    displaySearchHistory();
    
    // Initialize scroll reveal
    initializeScrollReveal();
    
    // Set up smooth scrolling
    setupSmoothScrolling();
}

function setupEventListeners() {
    // Navbar toggle
    navToggle.addEventListener('click', toggleNavbar);
    
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Symptoms form
    symptomsForm.addEventListener('submit', handleSymptomsSubmit);
    
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeHealthModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

function toggleNavbar() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

function setupSmoothScrolling() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function initializeScrollReveal() {
    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.health-tile, .language-card, .contact-item, .about-text, .about-image');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('reveal', 'active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on load
}

async function handleSymptomsSubmit(e) {
    e.preventDefault();
    
    const symptomsInput = document.getElementById('symptoms-input');
    const languageSelect = document.getElementById('language-select');
    
    const symptoms = symptomsInput.value.trim();
    const language = languageSelect.value;
    
    if (!symptoms) {
        alert('Please describe your symptoms');
        return;
    }
    
    // Show loading
    loadingElement.classList.remove('hidden');
    resultElement.classList.add('hidden');
    
    try {
        // Simulate AI processing
        await simulateAIAnalysis(symptoms, language);
        
        // Add to history
        addToHistory(symptoms, language);
        
        // Show result
        displayResult(symptoms, language);
        
    } catch (error) {
        console.error('Error processing symptoms:', error);
        alert('Sorry, there was an error processing your request. Please try again.');
    } finally {
        loadingElement.classList.add('hidden');
    }
}

async function simulateAIAnalysis(symptoms, language) {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // This would be replaced with actual AI API call
    return {
        symptoms: symptoms,
        language: language,
        analysis: generateMockAnalysis(symptoms, language)
    };
}

function generateMockAnalysis(symptoms, language) {
    // Mock AI analysis based on symptoms
    const analyses = {
        en: {
            'headache': 'Based on your symptoms, you may be experiencing tension headaches. Common causes include stress, dehydration, or eye strain. Consider rest, hydration, and pain relief.',
            'fever': 'Fever can indicate various conditions including viral or bacterial infections. Monitor your temperature and stay hydrated. Seek medical attention if fever persists or worsens.',
            'cough': 'Persistent cough may be due to respiratory infections, allergies, or irritants. Stay hydrated and consider warm liquids. Consult a doctor if symptoms persist.',
            'default': 'Based on your symptoms, it\'s recommended to monitor your condition closely. Stay hydrated, get adequate rest, and consider consulting a healthcare professional for proper evaluation.'
        },
        hi: {
            'headache': 'आपके लक्षणों के आधार पर, आपको तनाव से होने वाला सिरदर्द हो सकता है। सामान्य कारणों में तनाव, निर्जलीकरण, या आंखों का तनाव शामिल है।',
            'fever': 'बुखार विभिन्न स्थितियों का संकेत हो सकता है जिसमें वायरल या बैक्टीरियल संक्रमण शामिल है। अपना तापमान मॉनिटर करें और हाइड्रेटेड रहें।',
            'default': 'आपके लक्षणों के आधार पर, यह सुझाव दिया जाता है कि आप अपनी स्थिति की बारीकी से निगरानी करें। हाइड्रेटेड रहें, पर्याप्त आराम करें।'
        }
    };
    
    const langAnalyses = analyses[language] || analyses.en;
    
    // Simple keyword matching
    const lowerSymptoms = symptoms.toLowerCase();
    if (lowerSymptoms.includes('headache') || lowerSymptoms.includes('सिरदर्द')) {
        return langAnalyses.headache || langAnalyses.default;
    } else if (lowerSymptoms.includes('fever') || lowerSymptoms.includes('बुखार')) {
        return langAnalyses.fever || langAnalyses.default;
    } else if (lowerSymptoms.includes('cough') || lowerSymptoms.includes('खांसी')) {
        return langAnalyses.cough || langAnalyses.default;
    }
    
    return langAnalyses.default;
}

function displayResult(symptoms, language) {
    const resultContent = document.getElementById('result-content');
    const analysis = generateMockAnalysis(symptoms, language);
    
    resultContent.innerHTML = `
        <div class="result-summary">
            <h4>Symptoms:</h4>
            <p>${symptoms}</p>
        </div>
        <div class="result-analysis">
            <h4>AI Analysis:</h4>
            <p>${analysis}</p>
        </div>
        <div class="result-recommendations">
            <h4>General Recommendations:</h4>
            <ul>
                <li>Stay hydrated by drinking plenty of water</li>
                <li>Get adequate rest and sleep</li>
                <li>Monitor your symptoms closely</li>
                <li>Consult a healthcare professional if symptoms persist or worsen</li>
            </ul>
        </div>
    `;
    
    resultElement.classList.remove('hidden');
    
    // Scroll to result
    resultElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function addToHistory(symptoms, language) {
    const historyItem = {
        id: Date.now(),
        symptoms: symptoms,
        language: language,
        timestamp: new Date().toLocaleString()
    };
    
    searchHistory.unshift(historyItem);
    
    // Keep only last 5 searches
    if (searchHistory.length > 5) {
        searchHistory = searchHistory.slice(0, 5);
    }
    
    // Save to localStorage
    localStorage.setItem('nirogai_history', JSON.stringify(searchHistory));
    
    // Update display
    displaySearchHistory();
}

function displaySearchHistory() {
    if (searchHistory.length === 0) {
        historyList.innerHTML = '<p class="no-history">No recent searches</p>';
        return;
    }
    
    historyList.innerHTML = searchHistory.map(item => `
        <div class="history-item" onclick="loadHistoryItem(${item.id})">
            <div class="history-symptoms">${item.symptoms.substring(0, 50)}${item.symptoms.length > 50 ? '...' : ''}</div>
            <div class="history-meta">
                <span class="history-language">${item.language}</span>
                <span class="history-time">${item.timestamp}</span>
            </div>
        </div>
    `).join('');
}

function loadHistoryItem(id) {
    const item = searchHistory.find(h => h.id === id);
    if (item) {
        document.getElementById('symptoms-input').value = item.symptoms;
        document.getElementById('language-select').value = item.language;
        
        // Scroll to form
        document.getElementById('symptoms').scrollIntoView({ behavior: 'smooth' });
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    // Simulate form submission
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! We will get back to you soon.');
        e.target.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function changeLanguage(lang) {
    currentLanguage = lang;
    updateLanguage(lang);
    
    // Update active language card
    document.querySelectorAll('.language-card').forEach(card => {
        card.classList.remove('active');
    });
    event.target.closest('.language-card').classList.add('active');
    
    // Save preference
    localStorage.setItem('nirogai_language', lang);
}

function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getTranslation(key, lang);
        if (translation) {
            element.textContent = translation;
        }
    });
    
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        const translation = getTranslation(key, lang);
        if (translation) {
            element.placeholder = translation;
        }
    });
}

function getTranslation(key, lang) {
    const keys = key.split('.');
    let translation = translations[lang];
    
    for (const k of keys) {
        if (translation && translation[k]) {
            translation = translation[k];
        } else {
            // Fallback to English
            translation = translations.en;
            for (const k of keys) {
                if (translation && translation[k]) {
                    translation = translation[k];
                } else {
                    return null;
                }
            }
            break;
        }
    }
    
    return translation;
}

function openHealthModal(topic) {
    const modalBody = document.getElementById('modal-body');
    const content = getHealthContent(topic);
    
    modalBody.innerHTML = content;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeHealthModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function getHealthContent(topic) {
    const healthContent = {
        fever: {
            title: 'Understanding Fever',
            content: `
                <h2>What is Fever?</h2>
                <p>Fever is a temporary increase in body temperature, often due to illness. It's a common symptom that indicates your body is fighting an infection.</p>
                
                <h3>Common Causes:</h3>
                <ul>
                    <li>Viral infections (cold, flu)</li>
                    <li>Bacterial infections</li>
                    <li>Heat exhaustion</li>
                    <li>Certain medications</li>
                    <li>Vaccines</li>
                </ul>
                
                <h3>When to Seek Medical Care:</h3>
                <ul>
                    <li>Temperature above 103°F (39.4°C)</li>
                    <li>Fever lasting more than 3 days</li>
                    <li>Severe headache</li>
                    <li>Difficulty breathing</li>
                    <li>Persistent vomiting</li>
                </ul>
                
                <h3>Home Remedies:</h3>
                <ul>
                    <li>Stay hydrated with water and clear fluids</li>
                    <li>Rest and avoid strenuous activities</li>
                    <li>Use cool compresses</li>
                    <li>Take fever-reducing medications as directed</li>
                </ul>
            `
        },
        cough: {
            title: 'Understanding Cough',
            content: `
                <h2>Types of Cough</h2>
                <p>Coughing is a natural reflex that helps clear your airways. There are different types of coughs with various causes.</p>
                
                <h3>Dry Cough:</h3>
                <p>A dry cough doesn't produce mucus and can be caused by:</p>
                <ul>
                    <li>Allergies</li>
                    <li>Asthma</li>
                    <li>Acid reflux</li>
                    <li>Certain medications</li>
                </ul>
                
                <h3>Wet Cough:</h3>
                <p>A wet cough produces mucus and may indicate:</p>
                <ul>
                    <li>Cold or flu</li>
                    <li>Pneumonia</li>
                    <li>Bronchitis</li>
                </ul>
                
                <h3>Treatment Options:</h3>
                <ul>
                    <li>Stay hydrated</li>
                    <li>Use a humidifier</li>
                    <li>Honey for soothing (not for infants under 1 year)</li>
                    <li>Cough drops or lozenges</li>
                    <li>Avoid irritants like smoke</li>
                </ul>
            `
        },
        diabetes: {
            title: 'Managing Diabetes',
            content: `
                <h2>Understanding Diabetes</h2>
                <p>Diabetes is a chronic condition that affects how your body processes blood sugar (glucose).</p>
                
                <h3>Types of Diabetes:</h3>
                <ul>
                    <li><strong>Type 1:</strong> Body doesn't produce insulin</li>
                    <li><strong>Type 2:</strong> Body doesn't use insulin properly</li>
                    <li><strong>Gestational:</strong> Develops during pregnancy</li>
                </ul>
                
                <h3>Common Symptoms:</h3>
                <ul>
                    <li>Increased thirst and urination</li>
                    <li>Extreme fatigue</li>
                    <li>Blurred vision</li>
                    <li>Slow-healing wounds</li>
                    <li>Unexplained weight loss</li>
                </ul>
                
                <h3>Management Strategies:</h3>
                <ul>
                    <li>Monitor blood sugar levels regularly</li>
                    <li>Follow a balanced diet</li>
                    <li>Exercise regularly</li>
                    <li>Take medications as prescribed</li>
                    <li>Regular medical check-ups</li>
                </ul>
            `
        },
        'mental-health': {
            title: 'Mental Health & Wellness',
            content: `
                <h2>Mental Health Awareness</h2>
                <p>Mental health is just as important as physical health. It affects how we think, feel, and act.</p>
                
                <h3>Common Mental Health Conditions:</h3>
                <ul>
                    <li>Depression</li>
                    <li>Anxiety disorders</li>
                    <li>Stress-related disorders</li>
                    <li>Bipolar disorder</li>
                </ul>
                
                <h3>Warning Signs:</h3>
                <ul>
                    <li>Persistent sadness or anxiety</li>
                    <li>Withdrawal from activities</li>
                    <li>Significant changes in eating or sleeping</li>
                    <li>Difficulty concentrating</li>
                    <li>Thoughts of self-harm</li>
                </ul>
                
                <h3>Self-Care Strategies:</h3>
                <ul>
                    <li>Regular exercise and physical activity</li>
                    <li>Maintain social connections</li>
                    <li>Practice mindfulness and meditation</li>
                    <li>Get adequate sleep</li>
                    <li>Limit alcohol and avoid drugs</li>
                    <li>Seek professional help when needed</li>
                </ul>
                
                <h3>Emergency Resources:</h3>
                <p>If you're having thoughts of self-harm, please reach out immediately:</p>
                <ul>
                    <li>National Suicide Prevention Lifeline: 988</li>
                    <li>Crisis Text Line: Text HOME to 741741</li>
                    <li>Emergency Services: 911</li>
                </ul>
            `
        },
        'first-aid': {
            title: 'First Aid Basics',
            content: `
                <h2>Essential First Aid Knowledge</h2>
                <p>Basic first aid skills can save lives. Here are fundamental techniques everyone should know.</p>
                
                <h3>CPR (Cardiopulmonary Resuscitation):</h3>
                <ol>
                    <li>Check for responsiveness</li>
                    <li>Call for help (911)</li>
                    <li>Place hands on center of chest</li>
                    <li>Push hard and fast at least 2 inches deep</li>
                    <li>Allow complete chest recoil</li>
                    <li>Give 30 compressions, then 2 rescue breaths</li>
                </ol>
                
                <h3>Choking (Heimlich Maneuver):</h3>
                <ol>
                    <li>Stand behind the person</li>
                    <li>Place arms around their waist</li>
                    <li>Make a fist and place above navel</li>
                    <li>Give quick upward thrusts</li>
                </ol>
                
                <h3>Bleeding Control:</h3>
                <ul>
                    <li>Apply direct pressure with clean cloth</li>
                    <li>Elevate the injured area if possible</li>
                    <li>Don't remove embedded objects</li>
                    <li>Seek medical attention for severe bleeding</li>
                </ul>
                
                <h3>Burns:</h3>
                <ul>
                    <li>Cool the burn with cold water</li>
                    <li>Remove jewelry before swelling</li>
                    <li>Don't break blisters</li>
                    <li>Seek medical care for severe burns</li>
                </ul>
            `
        },
        nutrition: {
            title: 'Nutrition & Healthy Eating',
            content: `
                <h2>Fundamentals of Good Nutrition</h2>
                <p>Proper nutrition is essential for maintaining good health and preventing chronic diseases.</p>
                
                <h3>Essential Nutrients:</h3>
                <ul>
                    <li><strong>Proteins:</strong> Building blocks for muscles and tissues</li>
                    <li><strong>Carbohydrates:</strong> Primary energy source</li>
                    <li><strong>Fats:</strong> Essential for hormone production and vitamin absorption</li>
                    <li><strong>Vitamins:</strong> Support various body functions</li>
                    <li><strong>Minerals:</strong> Important for bone health and metabolism</li>
                    <li><strong>Water:</strong> Essential for all body functions</li>
                </ul>
                
                <h3>Healthy Eating Guidelines:</h3>
                <ul>
                    <li>Eat a variety of colorful fruits and vegetables</li>
                    <li>Choose whole grains over refined grains</li>
                    <li>Include lean proteins (fish, poultry, legumes)</li>
                    <li>Limit processed foods and added sugars</li>
                    <li>Stay hydrated with water</li>
                    <li>Practice portion control</li>
                </ul>
                
                <h3>Meal Planning Tips:</h3>
                <ul>
                    <li>Plan meals in advance</li>
                    <li>Prepare healthy snacks</li>
                    <li>Cook at home more often</li>
                    <li>Read nutrition labels</li>
                    <li>Listen to your body's hunger cues</li>
                </ul>
            `
        }
    };
    
    const content = healthContent[topic];
    return content ? content.content : '<p>Content not available</p>';
}

function handleKeyboardNavigation(e) {
    // ESC key to close modal
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeHealthModal();
    }
}

// Load saved language preference
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('nirogai_language');
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
        updateLanguage(currentLanguage);
        
        // Update active language card
        const languageCards = document.querySelectorAll('.language-card');
        languageCards.forEach(card => {
            if (card.onclick.toString().includes(savedLanguage)) {
                card.classList.add('active');
            }
        });
    }
});

// Add some utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll performance
window.addEventListener('scroll', debounce(function() {
    handleNavbarScroll();
}, 10));

// Add loading states for better UX
function addLoadingState(element, originalText) {
    element.disabled = true;
    element.textContent = 'Loading...';
    
    return function removeLoadingState() {
        element.disabled = false;
        element.textContent = originalText;
    };
}

// Add error handling for network requests
function handleNetworkError(error) {
    console.error('Network error:', error);
    alert('Network error. Please check your connection and try again.');
}

// Add analytics tracking (placeholder)
function trackEvent(eventName, eventData) {
    console.log('Analytics event:', eventName, eventData);
    // This would be replaced with actual analytics implementation
}

// Performance monitoring
function measurePerformance(name, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
}

// Service worker registration for offline functionality (placeholder)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

console.log('NirogAI application initialized successfully');
