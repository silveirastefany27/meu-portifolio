// ===== TEMA ESCURO/CLARO =====
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'light';

// Aplicar tema salvo
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ===== MENU MOBILE =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===== NAVEGAÇÃO ATIVA =====
const sections = document.querySelectorAll('.section');
const navLinksArray = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== BOTÃO VOLTAR AO TOPO =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== ANIMAÇÃO DE SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar todas as seções
sections.forEach(section => {
    observer.observe(section);
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ===== DOWNLOAD CV (Placeholder) =====
const downloadCV = document.getElementById('downloadCV');
if (downloadCV) {
    downloadCV.addEventListener('click', (e) => {
        e.preventDefault();
        // Aqui você pode adicionar a lógica para download do CV
        // Por exemplo: window.open('caminho/para/cv.pdf', '_blank');
        alert('Funcionalidade de download do CV será implementada em breve!');
    });
}

// ===== ANIMAÇÃO DE TYPING NO HEADER (Opcional) =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar delay nas animações das seções
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Atualizar navegação ativa ao carregar
    updateActiveNav();
});

// ===== PREVENIR COMPORTAMENTO PADRÃO DE LINKS VAZIOS =====
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// ===== MELHORIAS DE PERFORMANCE =====
// Debounce para eventos de scroll
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

// Aplicar debounce nas funções de scroll
const debouncedUpdateActiveNav = debounce(updateActiveNav, 100);
window.addEventListener('scroll', debouncedUpdateActiveNav);

// ===== VALIDAÇÃO DE FORMULÁRIO (Se adicionar formulário no futuro) =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== COPIAR EMAIL PARA CLIPBOARD =====
document.querySelectorAll('.contact-card').forEach(card => {
    const emailCard = card.querySelector('p');
    if (emailCard && emailCard.textContent.includes('@')) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const email = emailCard.textContent.trim();
            navigator.clipboard.writeText(email).then(() => {
                // Feedback visual
                const originalBg = card.style.background;
                card.style.background = 'var(--accent-color)';
                card.style.color = 'white';
                setTimeout(() => {
                    card.style.background = originalBg;
                    card.style.color = '';
                }, 1000);
            });
        });
    }
});
