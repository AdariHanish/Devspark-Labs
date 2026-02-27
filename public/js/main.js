// ═══════════════════════════════════════════════════════════
// DevSpark Labs - Main JavaScript (Complete Bug-Free Version)
// ═══════════════════════════════════════════════════════════

// Scroll to top on page load
window.addEventListener('load', function() {
    window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', function() {
    initLoader();
    initCursor();
    initTheme();
    initNavbar();
    initMobileMenu();
    initParticles();
    initScrollReveal();
    initStatsCounter();
    initProjectsFilter();
    initTestimonialsSlider();
    fetchProjects();
    fetchReviews();
    initForms();
    initQRModal();
    initStarRating();
    initFileUpload();
});

// ============ Fetch Projects ============
async function fetchProjects() {
    const grid = document.querySelector('.projects-grid');
    if (!grid) return;

    try {
        const response = await fetch('/api/projects');
        const projects = await response.json();

        if (projects.length > 0) {
            // Check if we're on the homepage (limit to 6) or projects page (show all)
            const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
            const displayProjects = isHomePage ? projects.filter(p => p.is_popular).slice(0, 6) : projects;

            grid.innerHTML = displayProjects.map((project, index) => `
                <div class="project-card ${project.is_popular ? 'popular' : ''} reveal" 
                     data-category="${project.category}" 
                     data-year="${project.year_type}"
                     style="animation-delay: ${index * 0.1}s">
                    <span class="project-category">${formatCategory(project.category)} • ${formatYearType(project.year_type)}</span>
                    <h3 class="project-title">${escapeHtml(project.title)}</h3>
                    <p class="project-description">${escapeHtml(project.description)}</p>
                    <div class="project-features">
                        ${project.features.split(',').map(f => `<span class="project-feature">${escapeHtml(f.trim())}</span>`).join('')}
                    </div>
                    <div class="project-footer">
                        <span class="project-price">₹${project.price.toLocaleString()}</span>
                        <a href="contact.html" class="project-btn">Get Started</a>
                    </div>
                </div>
            `).join('');

            // Re-initialize reveal animation for new elements
            setTimeout(initScrollReveal, 100);
        }
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
}

// ============ Fetch Reviews ============
async function fetchReviews() {
    const track = document.querySelector('.testimonials-track');
    if (!track) return;

    try {
        const response = await fetch('/api/reviews');
        const reviews = await response.json();

        if (reviews.length > 0) {
            const reviewsHtml = reviews.map(review => `
                <div class="testimonial-card">
                    <div class="testimonial-header">
                        <div class="testimonial-avatar">${review.student_name.charAt(0)}</div>
                        <div class="testimonial-info">
                            <h4>${escapeHtml(review.student_name)}</h4>
                            <p>${escapeHtml(review.college_name)} • ${escapeHtml(review.year_of_study)}</p>
                        </div>
                    </div>
                    <div class="testimonial-rating"><span>${'⭐'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span></div>
                    <p class="testimonial-text">"${escapeHtml(review.experience)}"</p>
                    <span class="testimonial-project">📂 ${escapeHtml(review.project_name)}</span>
                </div>
            `).join('');

            // Duplicate for infinite scroll if needed
            track.innerHTML = reviewsHtml + reviewsHtml;
        }
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
}

function formatCategory(category) {
    const map = {
        'aiml': 'AI/ML',
        'datascience': 'Data Science',
        'fullstack': 'Full Stack',
        'cybersecurity': 'Cybersecurity',
        'python': 'Python'
    };
    return map[category] || category;
}

function formatYearType(yearType) {
    const map = {
        'mini': 'Mini Project',
        'third': '3rd Year',
        'major': 'Major Project'
    };
    return map[yearType] || yearType;
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============ Loader ============
function initLoader() {
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 2000);
        });
        
        // Fallback
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 3500);
    }
}

// ============ Custom Cursor ============
function initCursor() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.style.cursor = 'auto';
        return;
    }
    
    let cursor = document.querySelector('.cursor');
    let cursorGlow = document.querySelector('.cursor-glow');
    
    if (!cursor) {
        cursor = document.createElement('div');
        cursor.className = 'cursor';
        document.body.appendChild(cursor);
    }
    
    if (!cursorGlow) {
        cursorGlow = document.createElement('div');
        cursorGlow.className = 'cursor-glow';
        document.body.appendChild(cursorGlow);
    }
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let isVisible = true;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!isVisible) {
            cursor.style.opacity = '1';
            cursorGlow.style.opacity = '1';
            isVisible = true;
        }
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorGlow.style.opacity = '0';
        isVisible = false;
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorGlow.style.opacity = '1';
        isVisible = true;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        cursorGlow.style.left = cursorX + 'px';
        cursorGlow.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effects
    const hoverSelectors = 'a, button, .btn, input, textarea, select, .project-card, .service-card, .pricing-card, .testimonial-card, .filter-btn, .stat-card, .contact-item, .qr-image, .file-upload, label[for]';
    
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(hoverSelectors)) {
            cursor.classList.add('hovering');
            cursorGlow.classList.add('hovering');
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(hoverSelectors)) {
            cursor.classList.remove('hovering');
            cursorGlow.classList.remove('hovering');
        }
    });
}

// ============ Theme Toggle ============
function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

// ============ Navbar ============
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // Set active link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ============ Mobile Menu ============
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
        
        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
            });
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
            }
        });
    }
}

// ============ Particles ============
function initParticles() {
    const container = document.querySelector('.particles-container');
    if (!container) return;
    
    // Clear existing particles
    container.innerHTML = '';
    
    const particleCount = window.innerWidth < 768 ? 20 : 40;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            left: ${Math.random() * 100}%;
            width: ${Math.random() * 4 + 2}px;
            height: ${particle.style.width};
            animation-delay: ${Math.random() * 15}s;
            animation-duration: ${Math.random() * 10 + 15}s;
        `;
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

// ============ Scroll Reveal ============
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    if (revealElements.length === 0) return;
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementBottom = el.getBoundingClientRect().bottom;
            
            if (elementTop < windowHeight - revealPoint && elementBottom > 0) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll, { passive: true });
    window.addEventListener('resize', revealOnScroll, { passive: true });
    
    // Initial check
    setTimeout(revealOnScroll, 100);
}

// ============ Stats Counter ============
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number[data-target]');
    
    if (stats.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target')) || 0;
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeProgress * target);
        
        element.textContent = current + '+';
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// ============ Projects Filter ============
function initProjectsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length === 0 || projectCards.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                const year = card.getAttribute('data-year');
                
                const shouldShow = filter === 'all' || category === filter || year === filter;
                
                if (shouldShow) {
                    card.style.display = 'block';
                    card.style.animation = `fadeInUp 0.5s ease ${index * 0.05}s forwards`;
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ============ Testimonials Slider ============
function initTestimonialsSlider() {
    const track = document.querySelector('.testimonials-track');
    if (!track) return;
    
    const cards = track.querySelectorAll('.testimonial-card');
    if (cards.length === 0) return;
    
    // Pause on hover
    track.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });
    
    track.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });
}

// ============ Forms ============
function initForms() {
    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Payment Form
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', handlePaymentSubmit);
    }
    
    // Review Form
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', handleReviewSubmit);
    }
}

async function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch('/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification('Form submitted successfully! We will contact you soon.', 'success');
            form.reset();
        } else {
            showNotification(result.error || 'Error submitting form. Please try again.', 'error');
        }
    } catch (error) {
        showNotification('Error submitting form. Please try again.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

async function handlePaymentSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch('/api/payments', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification('Payment submitted! We will verify and contact you within 24 hours.', 'success');
            form.reset();
            const preview = document.querySelector('.file-preview');
            if (preview) preview.remove();
        } else {
            showNotification(result.error || 'Error submitting payment. Please try again.', 'error');
        }
    } catch (error) {
        showNotification('Error submitting payment. Please try again.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

async function handleReviewSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Get rating
    const selectedRating = document.querySelector('.star-rating input:checked');
    if (!selectedRating) {
        showNotification('Please select a rating', 'error');
        return;
    }
    data.rating = parseInt(selectedRating.value);
    
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch('/api/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification('Review submitted! It will be visible after approval.', 'success');
            form.reset();
            // Reset stars to default (5)
            const star5 = document.getElementById('star5');
            if (star5) star5.checked = true;
        } else {
            showNotification(result.error || 'Error submitting review. Please try again.', 'error');
        }
    } catch (error) {
        showNotification('Error submitting review. Please try again.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// ============ QR Modal - FIXED ============
function initQRModal() {
    const qrImage = document.querySelector('.qr-image');
    const qrModal = document.querySelector('.qr-modal');
    const qrClose = document.querySelector('.qr-modal-close');
    
    if (!qrImage || !qrModal) {
        console.log('QR elements not found on this page');
        return;
    }
    
    // Open modal when clicking QR image
    qrImage.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('QR clicked - opening modal');
        qrModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close modal function
    function closeQRModal() {
        console.log('Closing QR modal');
        qrModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Close button click
    if (qrClose) {
        qrClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeQRModal();
        });
    }
    
    // Click outside to close
    qrModal.addEventListener('click', function(e) {
        if (e.target === qrModal) {
            closeQRModal();
        }
    });
    
    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && qrModal.classList.contains('active')) {
            closeQRModal();
        }
    });
    
    console.log('QR Modal initialized successfully');
}
// ============ Star Rating ============
function initStarRating() {
    const starRating = document.querySelector('.star-rating');
    if (!starRating) return;
    
    // Set default to 5 stars
    const star5 = document.getElementById('star5');
    if (star5) star5.checked = true;
}

// ============ File Upload ============
function initFileUpload() {
    const fileInput = document.getElementById('screenshot');
    const fileUpload = document.querySelector('.file-upload');
    
    if (!fileInput || !fileUpload) return;
    
    fileInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        fileUpload.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        fileUpload.addEventListener(eventName, () => {
            fileUpload.style.borderColor = 'var(--accent-primary)';
            fileUpload.style.background = 'rgba(220, 38, 38, 0.05)';
        });
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        fileUpload.addEventListener(eventName, () => {
            fileUpload.style.borderColor = '';
            fileUpload.style.background = '';
        });
    });
    
    fileUpload.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            handleFileSelect({ target: fileInput });
        }
    });
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate
    if (!file.type.match(/image\/(jpeg|jpg|png|gif|webp)/)) {
        showNotification('Please select a valid image file', 'error');
        e.target.value = '';
        return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
        showNotification('File size must be less than 5MB', 'error');
        e.target.value = '';
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
        const fileUpload = document.querySelector('.file-upload');
        let preview = fileUpload.querySelector('.file-preview');
        
        if (!preview) {
            preview = document.createElement('div');
            preview.className = 'file-preview';
            fileUpload.appendChild(preview);
        }
        
        preview.innerHTML = `
            <img src="${event.target.result}" alt="Preview">
            <p>${file.name}</p>
        `;
    };
    reader.readAsDataURL(file);
}

// ============ Notification ============
function showNotification(message, type = 'info') {
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideOut {
        to { transform: translateX(120%); opacity: 0; }
    }
`;
document.head.appendChild(styleSheet);

// Global access
window.showNotification = showNotification;