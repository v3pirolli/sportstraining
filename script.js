// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.header');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Validation and EmailJS Integration
class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.successMessage = document.getElementById('formSuccess');
        this.init();
    }

    init() {
        // Initialize EmailJS
        this.initEmailJS();
        
        // Add form event listeners
        this.addEventListeners();
        
        // Add real-time validation
        this.addRealTimeValidation();
    }

    initEmailJS() {
        // Initialize EmailJS with your public key
        // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
        emailjs.init('YOUR_PUBLIC_KEY');
    }

    addEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    addRealTimeValidation() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        if (!this.validateForm()) {
            this.showNotification('Por favor, corrija os erros no formulário.', 'error');
            return;
        }

        // Show loading state
        this.setLoadingState(true);
        
        try {
            // Prepare email data
            const formData = new FormData(this.form);
            const emailData = {
                from_name: formData.get('name'),
                from_email: formData.get('email'),
                phone: formData.get('phone'),
                interest: this.getInterestLabel(formData.get('interest')),
                message: formData.get('message') || 'Nenhuma mensagem adicional',
                to_email: 'contato@sportstraining.com.br' // Seu email
            };

            // Send email via EmailJS
            await emailjs.send(
                'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
                'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
                emailData
            );

            // Success
            this.showSuccessMessage();
            this.form.reset();
            this.clearAllErrors();
            
        } catch (error) {
            console.error('EmailJS Error:', error);
            this.showNotification('Erro ao enviar mensagem. Tente novamente ou entre em contato pelo WhatsApp.', 'error');
        } finally {
            this.setLoadingState(false);
        }
    }

    validateForm() {
        let isValid = true;
        const requiredFields = ['name', 'email', 'phone', 'interest'];
        
        requiredFields.forEach(fieldName => {
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo é obrigatório.';
        }

        // Specific field validations
        if (value && fieldName === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor, insira um e-mail válido.';
            }
        }

        if (value && fieldName === 'phone') {
            const phoneRegex = /^\(?[0-9]{2}\)?[0-9]{4,5}-?[0-9]{4}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor, insira um telefone válido (ex: (54) 99999-9999).';
            }
        }

        if (value && fieldName === 'name') {
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'O nome deve ter pelo menos 2 caracteres.';
            }
        }

        // Update field state
        this.updateFieldState(field, isValid, errorMessage);
        
        return isValid;
    }

    updateFieldState(field, isValid, errorMessage) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        // Remove existing states
        formGroup.classList.remove('error', 'success');
        
        if (isValid) {
            formGroup.classList.add('success');
            errorElement.textContent = '';
        } else {
            formGroup.classList.add('error');
            errorElement.textContent = errorMessage;
        }
    }

    clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error');
        const errorElement = formGroup.querySelector('.error-message');
        errorElement.textContent = '';
    }

    clearAllErrors() {
        const formGroups = this.form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error', 'success');
            const errorElement = group.querySelector('.error-message');
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
    }

    setLoadingState(loading) {
        if (loading) {
            this.submitBtn.classList.add('loading');
            this.submitBtn.disabled = true;
        } else {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
        }
    }

    showSuccessMessage() {
        this.successMessage.style.display = 'flex';
        this.successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            this.successMessage.style.display = 'none';
        }, 5000);
    }

    getInterestLabel(value) {
        const labels = {
            'aula-experimental': 'Aula Experimental',
            'personal-training': 'Personal Training',
            'produtos-digitais': 'Produtos Digitais',
            'outros': 'Outros'
        };
        return labels[value] || value;
    }
}

// Phone number formatting
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
        value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
    }
    
    if (value.length >= 10) {
        value = value.substring(0, 10) + '-' + value.substring(10, 14);
    }
    
    input.value = value;
}

// Add phone formatting to phone input
document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', () => formatPhoneNumber(phoneInput));
    }
});

// Newsletter Form Handler with Mailchimp Integration
class NewsletterHandler {
    constructor() {
        this.form = document.getElementById('newsletterForm');
        this.submitBtn = document.getElementById('newsletterSubmitBtn');
        this.successMessage = document.getElementById('newsletterSuccess');
        this.errorMessage = document.getElementById('newsletterError');
        this.emailInput = document.getElementById('newsletterEmail');
        this.init();
    }

    init() {
        this.addEventListeners();
        this.addRealTimeValidation();
    }

    addEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    addRealTimeValidation() {
        this.emailInput.addEventListener('blur', () => this.validateEmail());
        this.emailInput.addEventListener('input', () => this.clearFieldError());
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Validate email
        if (!this.validateEmail()) {
            this.showError('Por favor, insira um e-mail válido.');
            return;
        }

        // Show loading state
        this.setLoadingState(true);
        this.hideMessages();
        
        try {
            const email = this.emailInput.value.trim();
            
            // Method 1: Mailchimp API Integration
            await this.subscribeToMailchimp(email);
            
            // Success
            this.showSuccess();
            this.form.reset();
            this.clearFieldError();
            
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            this.showError('Erro ao realizar inscrição. Tente novamente ou entre em contato conosco.');
        } finally {
            this.setLoadingState(false);
        }
    }

    async subscribeToMailchimp(email) {
        // Mailchimp API Configuration
        const MAILCHIMP_API_KEY = 'YOUR_MAILCHIMP_API_KEY'; // Replace with your API key
        const MAILCHIMP_LIST_ID = 'YOUR_LIST_ID'; // Replace with your list ID
        const MAILCHIMP_SERVER_PREFIX = 'YOUR_SERVER_PREFIX'; // e.g., 'us1', 'us2', etc.
        
        const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;
        
        const data = {
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: '', // Optional: extract first name from email
                LNAME: ''  // Optional: extract last name from email
            },
            tags: ['website', 'newsletter', 'sports-training']
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${MAILCHIMP_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            
            // Handle specific Mailchimp errors
            if (errorData.title === 'Member Exists') {
                throw new Error('Este e-mail já está inscrito na nossa newsletter.');
            } else if (errorData.title === 'Invalid Resource') {
                throw new Error('E-mail inválido. Verifique e tente novamente.');
            } else {
                throw new Error('Erro ao processar inscrição. Tente novamente.');
            }
        }

        return await response.json();
    }

    // Alternative method using Mailchimp's embedded form (simpler setup)
    async subscribeWithEmbeddedForm(email) {
        // This method uses Mailchimp's embedded form endpoint
        const MAILCHIMP_FORM_ACTION = 'YOUR_MAILCHIMP_FORM_ACTION_URL'; // Get from Mailchimp embed form
        
        const formData = new FormData();
        formData.append('EMAIL', email);
        formData.append('b_YOUR_LIST_ID', ''); // Replace with your list ID
        formData.append('subscribe', 'Subscribe');

        const response = await fetch(MAILCHIMP_FORM_ACTION, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Required for Mailchimp embedded forms
        });

        // Note: With no-cors mode, we can't read the response
        // This method is simpler but provides less error handling
        return true;
    }

    validateEmail() {
        const email = this.emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            this.showFieldError('E-mail é obrigatório.');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            this.showFieldError('Por favor, insira um e-mail válido.');
            return false;
        }
        
        this.showFieldSuccess();
        return true;
    }

    showFieldError(message) {
        this.emailInput.classList.add('error');
        this.emailInput.classList.remove('success');
        const errorElement = document.getElementById('newsletter-email-error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    showFieldSuccess() {
        this.emailInput.classList.add('success');
        this.emailInput.classList.remove('error');
        const errorElement = document.getElementById('newsletter-email-error');
        errorElement.style.display = 'none';
    }

    clearFieldError() {
        this.emailInput.classList.remove('error', 'success');
        const errorElement = document.getElementById('newsletter-email-error');
        errorElement.style.display = 'none';
    }

    setLoadingState(loading) {
        if (loading) {
            this.submitBtn.classList.add('loading');
            this.submitBtn.disabled = true;
        } else {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
        }
    }

    showSuccess() {
        this.successMessage.style.display = 'flex';
        this.errorMessage.style.display = 'none';
        this.successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            this.successMessage.style.display = 'none';
        }, 5000);
    }

    showError(message) {
        this.errorMessage.style.display = 'flex';
        this.successMessage.style.display = 'none';
        this.errorMessage.querySelector('p').textContent = message;
        this.errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide error message after 5 seconds
        setTimeout(() => {
            this.errorMessage.style.display = 'none';
        }, 5000);
    }

    hideMessages() {
        this.successMessage.style.display = 'none';
        this.errorMessage.style.display = 'none';
    }
}

// Product Purchase Handler
function buyProduct(productId) {
    const products = {
        'ebook-funcional': {
            name: 'Guia Completo de Treinamento Funcional',
            price: '67,00',
            description: 'E-book com 50 exercícios funcionais'
        },
        'curso-prevencao': {
            name: 'Curso Online: Prevenção de Lesões',
            price: '197,00',
            description: 'Curso completo sobre prevenção de lesões'
        },
        'app-treinos': {
            name: 'App de Treinos em Casa',
            price: '47,00',
            description: 'Aplicativo com treinos funcionais para casa'
        }
    };
    
    const product = products[productId];
    
    if (product) {
        // Show purchase modal or redirect to checkout
        showPurchaseModal(product);
    }
}

// Purchase Modal
function showPurchaseModal(product) {
    // Create modal HTML
    const modalHTML = `
        <div class="modal-overlay" id="purchaseModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Finalizar Compra</h3>
                    <button class="modal-close" onclick="closeModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="product-summary">
                        <h4>${product.name}</h4>
                        <p>${product.description}</p>
                        <div class="product-price">
                            <span class="price">R$ ${product.price}</span>
                        </div>
                    </div>
                    <form class="purchase-form" id="purchaseForm">
                        <div class="form-group">
                            <input type="text" name="name" placeholder="Nome completo" required>
                        </div>
                        <div class="form-group">
                            <input type="email" name="email" placeholder="Email" required>
                        </div>
                        <div class="form-group">
                            <input type="tel" name="phone" placeholder="Telefone" required>
                        </div>
                        <div class="form-group">
                            <input type="text" name="cpf" placeholder="CPF" required>
                        </div>
                        <button type="submit" class="btn btn-primary btn-purchase">
                            <i class="fas fa-credit-card"></i> Finalizar Compra - R$ ${product.price}
                        </button>
                    </form>
                    <div class="payment-info">
                        <p><i class="fas fa-shield-alt"></i> Compra 100% segura</p>
                        <p><i class="fas fa-lock"></i> Seus dados estão protegidos</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Handle purchase form
    const purchaseForm = document.getElementById('purchaseForm');
    purchaseForm.addEventListener('submit', handlePurchase);
    
    // Add modal styles
    addModalStyles();
}

// Handle purchase form submission
function handlePurchase(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
    submitBtn.disabled = true;
    
    try {
        // Simulate payment processing
        setTimeout(() => {
            showNotification('Compra realizada com sucesso! Você receberá os dados de acesso por email.', 'success');
            closeModal();
        }, 3000);
        
    } catch (error) {
        showNotification('Erro ao processar pagamento. Tente novamente.', 'error');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('purchaseModal');
    if (modal) {
        modal.remove();
    }
}

// Add modal styles
function addModalStyles() {
    const styles = `
        <style>
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background: white;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            animation: slideIn 0.3s ease;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #e0e0e0;
        }
        
        .modal-header h3 {
            margin: 0;
            color: #333;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-body {
            padding: 1.5rem;
        }
        
        .product-summary {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 10px;
            margin-bottom: 1.5rem;
            text-align: center;
        }
        
        .product-summary h4 {
            color: #333;
            margin-bottom: 0.5rem;
        }
        
        .product-summary p {
            color: #666;
            margin-bottom: 1rem;
        }
        
        .product-price .price {
            font-size: 1.5rem;
            font-weight: 700;
            color: #ff6b35;
        }
        
        .purchase-form .form-group {
            margin-bottom: 1rem;
        }
        
        .purchase-form input {
            width: 100%;
            padding: 1rem;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 1rem;
            font-family: inherit;
        }
        
        .purchase-form input:focus {
            outline: none;
            border-color: #ff6b35;
        }
        
        .btn-purchase {
            width: 100%;
            margin-bottom: 1rem;
            font-size: 1.1rem;
            padding: 1rem;
        }
        
        .payment-info {
            text-align: center;
            color: #666;
            font-size: 0.9rem;
        }
        
        .payment-info p {
            margin: 0.5rem 0;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
        
        .payment-info i {
            color: #ff6b35;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @media (max-width: 480px) {
            .modal-content {
                width: 95%;
                margin: 1rem;
            }
            
            .modal-header,
            .modal-body {
                padding: 1rem;
            }
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="closeNotification(this)">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add notification styles if not already added
    if (!document.getElementById('notificationStyles')) {
        addNotificationStyles();
    }
    
    // Add to body
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        closeNotification(notification.querySelector('.notification-close'));
    }, 5000);
}

// Get notification icon based on type
function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

// Close notification
function closeNotification(element) {
    const notification = element.closest('.notification');
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

// Add notification styles
function addNotificationStyles() {
    const styles = `
        <style id="notificationStyles">
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10001;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
            border-left: 4px solid #ff6b35;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-success {
            border-left-color: #28a745;
        }
        
        .notification-error {
            border-left-color: #dc3545;
        }
        
        .notification-warning {
            border-left-color: #ffc107;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem 1.5rem;
        }
        
        .notification-content i:first-child {
            font-size: 1.2rem;
        }
        
        .notification-success .notification-content i:first-child {
            color: #28a745;
        }
        
        .notification-error .notification-content i:first-child {
            color: #dc3545;
        }
        
        .notification-warning .notification-content i:first-child {
            color: #ffc107;
        }
        
        .notification-content span {
            flex: 1;
            color: #333;
            font-weight: 500;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: #666;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.3s ease;
        }
        
        .notification-close:hover {
            background: #f0f0f0;
        }
        
        @media (max-width: 480px) {
            .notification {
                right: 10px;
                left: 10px;
                max-width: none;
                transform: translateY(-100px);
            }
            
            .notification.show {
                transform: translateY(0);
            }
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .product-card, .testimonial-card, .contact-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h4');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Instagram Feed Integration
class InstagramFeed {
    constructor() {
        this.instagramGrid = document.getElementById('instagramGrid');
        this.instagramFallback = document.getElementById('instagramFallback');
        this.instagramUsername = 'sportstrainingct';
        this.maxPosts = 3;
        this.init();
    }

    async init() {
        try {
            // Try to load Instagram posts
            await this.loadInstagramPosts();
        } catch (error) {
            console.log('Instagram API not available, showing fallback content');
            this.showFallbackContent();
        }
    }

    async loadInstagramPosts() {
        // This would typically use Instagram Basic Display API
        // For now, we'll simulate the API call and show fallback content
        // In a real implementation, you would need:
        // 1. Instagram App registration
        // 2. Access token
        // 3. API endpoint to fetch posts
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // For demonstration, we'll show the fallback content
        // In production, replace this with actual API call
        throw new Error('Instagram API not configured');
    }

    showFallbackContent() {
        // Hide loading state
        const loadingElement = this.instagramGrid.querySelector('.instagram-loading');
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }

        // Show fallback content
        this.instagramFallback.style.display = 'block';
        
        // Add click handlers to fallback posts
        this.addFallbackClickHandlers();
    }

    addFallbackClickHandlers() {
        const fallbackPosts = this.instagramFallback.querySelectorAll('.instagram-post-card');
        fallbackPosts.forEach((post, index) => {
            post.addEventListener('click', () => {
                // Open Instagram profile in new tab
                window.open(`https://www.instagram.com/${this.instagramUsername}/`, '_blank');
            });
            
            // Add cursor pointer
            post.style.cursor = 'pointer';
        });
    }

    // Method to create real Instagram post HTML (for when API is available)
    createInstagramPostHTML(post) {
        return `
            <div class="instagram-post" onclick="window.open('${post.permalink}', '_blank')">
                <img src="${post.media_url}" alt="${post.caption || 'Instagram post'}" loading="lazy">
                <div class="instagram-post-content">
                    <p class="instagram-post-text">${this.truncateText(post.caption || '', 150)}</p>
                    <div class="instagram-post-meta">
                        <span class="instagram-post-date">${this.formatDate(post.timestamp)}</span>
                        <div class="instagram-post-stats">
                            <span class="instagram-post-likes">
                                <i class="fas fa-heart"></i>
                                ${this.formatNumber(post.like_count || 0)}
                            </span>
                            <span class="instagram-post-comments">
                                <i class="fas fa-comment"></i>
                                ${this.formatNumber(post.comments_count || 0)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Utility methods
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    formatDate(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'Há 1 dia';
        if (diffDays < 7) return `Há ${diffDays} dias`;
        if (diffDays < 30) return `Há ${Math.ceil(diffDays / 7)} semana${Math.ceil(diffDays / 7) > 1 ? 's' : ''}`;
        return `Há ${Math.ceil(diffDays / 30)} mês${Math.ceil(diffDays / 30) > 1 ? 'es' : ''}`;
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
}

// Instagram Embed Integration (Alternative method using Instagram's embed script)
class InstagramEmbed {
    constructor() {
        this.instagramPosts = [
            'https://www.instagram.com/p/DJptwqstVyW/',
            'https://www.instagram.com/p/DHW6ESAPb_T/',
            'https://www.instagram.com/p/DH4oUOitUyP/',
        ];
        this.init();
    }

    init() {
        // Only initialize if we have post URLs
        if (this.instagramPosts.length > 0) {
            this.loadInstagramEmbeds();
        }
    }

    loadInstagramEmbeds() {
        const instagramGrid = document.getElementById('instagramGrid');
        
        // Clear loading state
        const loadingElement = instagramGrid.querySelector('.instagram-loading');
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }

        // Create embed blocks for each post
        this.instagramPosts.forEach(postUrl => {
            const embedBlock = document.createElement('blockquote');
            embedBlock.className = 'instagram-media';
            embedBlock.setAttribute('data-instgrm-permalink', postUrl);
            embedBlock.setAttribute('data-instgrm-version', '14');
            embedBlock.style.cssText = 'background:#FFF; border:0; margin: 0 auto; max-width:540px; width:100%;';
            
            instagramGrid.appendChild(embedBlock);
        });

        // Load Instagram embed script if not already loaded
        if (!document.querySelector('script[src*="instagram.com/embed.js"]')) {
            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://www.instagram.com/embed.js';
            document.body.appendChild(script);
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('SPORTS TRAINING - Website loaded successfully!');
    
    // Initialize Instagram embeds with real posts
    new InstagramEmbed();
    
    // Initialize contact form handler
    new ContactFormHandler();
    
    // Initialize newsletter handler
    new NewsletterHandler();
    
    // Add any additional initialization code here
});

