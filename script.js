// Menu Mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Fermer le menu en cliquant sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Formulaire de Contact
const contatoForm = document.querySelector('.contato-form');

if (contatoForm) {
    contatoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Récupérer les valeurs
        const nome = contatoForm.querySelector('input[type="text"]').value;
        const email = contatoForm.querySelector('input[type="email"]').value;
        const telefone = contatoForm.querySelector('input[type="tel"]').value;
        const mensagem = contatoForm.querySelector('textarea').value;
        
        // Validation simple
        if (nome && email && telefone && mensagem) {
            alert(`Merci ${nome}!\n\nVotre message a été reçu avec succès.\nNous vous contacterons bientôt!`);
            contatoForm.reset();
        } else {
            alert('Veuillez remplir tous les champs!');
        }
    });
}

// Infolettre
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (email) {
            alert(`Succès! ${email} a été inscrit à l'infolettre.`);
            newsletterForm.reset();
        } else {
            alert('Veuillez entrer une adresse e-mail valide!');
        }
    });
}

// Boutons CTA
const ctaBtn = document.querySelector('.cta-btn');
if (ctaBtn) {
    ctaBtn.addEventListener('click', function() {
        document.getElementById('servicos').scrollIntoView({ behavior: 'smooth' });
    });
}

// Animation de défilement
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Ajouter animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Observer les éléments
document.querySelectorAll('.servico-card, .galeria-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Défilement de la barre de navigation
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Effet parallaxe sur le héros
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    let scrollPosition = window.pageYOffset;
    hero.style.backgroundPosition = `0px ${scrollPosition * 0.5}px`;
});

console.log('Académie de Football - Site Chargé avec Succès!');
