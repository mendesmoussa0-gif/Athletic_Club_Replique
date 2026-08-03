const siteData = {
    hero: {
        title: 'Transformez Votre Jeu',
        subtitle: 'La meilleure académie de football de la région. Entraînement professionnel pour tous les âges.',
        ctaText: 'Commencez Maintenant',
        videoSrc: 'https://videos.pexels.com/video-files/3356408/3356408-sd_640_360_24fps.mp4'
    },
    about: {
        title: "À Propos de l'Académie",
        heading: 'Excellence en Entraînement',
        paragraphs: [
            "Avec plus de 10 ans d'expérience, l'Académie de Football est dédiée au développement des talents et à la préparation des athlètes pour le succès.",
            "Notre équipe d'entraîneurs spécialisés propose des programmes d'entraînement personnalisés pour tous les âges et niveaux d'expérience.",
            "Nous utilisons des méthodologies modernes et des structures de classe mondiale pour assurer que chaque élève atteigne son potentiel maximal."
        ],
        stats: [
            { value: '500+', label: 'Étudiants Entraînés' },
            { value: '15+', label: 'Entraîneurs' },
            { value: '3', label: 'Terrains' },
            { value: '10+', label: 'Années' }
        ]
    },
    services: [
        {
            icon: 'fas fa-child',
            title: 'École de Base',
            description: 'Entraînement pour enfants de 4 à 10 ans. Développement fondamental de la technique et de la coordination.'
        },
        {
            icon: 'fas fa-running',
            title: 'Catégorie Enfants',
            description: 'Préparation pour enfants de 11 à 14 ans. Focus sur la tactique et le développement physique.'
        },
        {
            icon: 'fas fa-trophy',
            title: 'Catégorie Jeunes',
            description: 'Entraînement avancé pour adolescents de 15 à 17 ans. Préparation aux compétitions.'
        },
        {
            icon: 'fas fa-dumbbell',
            title: 'Adultes',
            description: 'Football récréatif et fitness. Entraînements flexibles pour adultes qui souhaitent rester en forme.'
        },
        {
            icon: 'fas fa-heartbeat',
            title: 'Conditionnement Physique',
            description: 'Programmes de préparation physique et nutrition personnalisés pour les athlètes sérieux.'
        },
        {
            icon: 'fas fa-video',
            title: 'Analyse de Performance',
            description: 'Analyse vidéo professionnelle et rapports de performance pour un développement continu.'
        }
    ],
    gallery: [
        {
            img: 'img/Captura de ecrã 2025-12-10 073057.png',
            alt: 'Entraînement',
            caption: 'Entraînement sur Terrain'
        },
        {
            img: 'img/conjunto 4.png',
            alt: 'Technique',
            caption: 'Développement de Technique'
        },
        {
            img: 'img/59b9cf439f9af1421f56ced6071e0afb.png',
            alt: 'Championnats',
            caption: 'Championnats'
        },
        {
            img: 'img/444fd254bd082c1a026bbc40c4b39b8e.png',
            alt: 'Équipe',
            caption: 'Notre Équipe'
        },
        {
            img: 'img/9ea992cd87c049d3f000b7309b5185e6.png',
            alt: 'Terrain',
            caption: 'Installations'
        },
        {
            img: 'img/a96df5d01a44857bc382cc3a0dec7c34.png',
            alt: 'Événement',
            caption: 'Événements'
        }
    ],
    contact: {
        title: 'Nous Contacter',
        info: [
            {
                icon: 'fas fa-map-marker-alt',
                title: 'Adresse',
                lines: ['KEUR MBAYE FALL', 'MBAO']
            },
            {
                icon: 'fas fa-phone',
                title: 'Téléphone',
                lines: ['(+221) 776460730']
            },
            {
                icon: 'fas fa-envelope',
                title: 'Email',
                lines: ['contact@academiedefootball.com', 'info@academiedefootball.com']
            },
            {
                icon: 'fas fa-clock',
                title: 'Horaires',
                lines: ['Lun - Ven: 07:00 - 22:00', 'Sam - Dim: 08:00 - 18:00']
            }
        ]
    },
    footer: {
        aboutText: 'Développer les talents et transformer les vies grâce au football.',
        socialLinks: [
            { icon: 'fab fa-facebook', href: '#' },
            { icon: 'fab fa-instagram', href: '#' },
            { icon: 'fab fa-whatsapp', href: '#' },
            { icon: 'fab fa-youtube', href: '#' }
        ],
        quickLinks: [
            { text: 'Accueil', href: '#home' },
            { text: 'À Propos', href: '#sobre' },
            { text: 'Services', href: '#servicos' },
            { text: 'Galerie', href: '#galeria' }
        ],
        serviceLinks: [
            { text: 'École de Base', href: '#servicos' },
            { text: 'Catégorie Enfants', href: '#servicos' },
            { text: 'Catégorie Jeunes', href: '#servicos' },
            { text: 'Adultes', href: '#servicos' }
        ],
        newsletterText: 'Recevez des nouvelles et des promotions',
        copyright: '© 2026 Académie de Football. Tous les droits réservés.'
    }
};

function createHtmlElement(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

function renderHero() {
    const heroTitle = document.getElementById('heroTitle');
    const heroSubtitle = document.getElementById('heroSubtitle');
    const ctaButton = document.getElementById('ctaButton');
    const heroVideoSource = document.querySelector('.hero-video source');

    if (heroTitle) heroTitle.textContent = siteData.hero.title;
    if (heroSubtitle) heroSubtitle.textContent = siteData.hero.subtitle;
    if (ctaButton) ctaButton.textContent = siteData.hero.ctaText;
    if (heroVideoSource) {
        heroVideoSource.src = siteData.hero.videoSrc;
        heroVideoSource.parentElement.load();
    }
}

function renderAbout() {
    const aboutTitle = document.getElementById('aboutTitle');
    const aboutText = document.getElementById('aboutText');
    const aboutStats = document.getElementById('aboutStats');

    if (aboutTitle) aboutTitle.textContent = siteData.about.title;
    if (aboutText) {
        aboutText.innerHTML = `<h3>${siteData.about.heading}</h3>` +
            siteData.about.paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('');
    }

    if (aboutStats) {
        aboutStats.innerHTML = siteData.about.stats.map(stat => {
            return `<div class="stat"><h4>${stat.value}</h4><p>${stat.label}</p></div>`;
        }).join('');
    }
}

function renderServices() {
    const servicesTitle = document.getElementById('servicesTitle');
    const servicesGrid = document.getElementById('servicesGrid');

    if (servicesTitle) servicesTitle.textContent = 'Nos Services';
    if (servicesGrid) {
        servicesGrid.innerHTML = siteData.services.map(service => {
            return `
                <div class="servico-card">
                    <i class="${service.icon}"></i>
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                </div>
            `;
        }).join('');
    }
}

function renderGallery() {
    const galleryTitle = document.getElementById('galleryTitle');
    const galleryGrid = document.getElementById('galleryGrid');

    if (galleryTitle) galleryTitle.textContent = 'Galerie';
    if (galleryGrid) {
        galleryGrid.innerHTML = siteData.gallery.map(item => {
            return `
                <div class="galeria-item">
                    <img src="${item.img}" alt="${item.alt}">
                    <div class="galeria-overlay">
                        <p>${item.caption}</p>
                    </div>
                </div>
            `;
        }).join('');
    }
}

function renderContactInfo() {
    const contactTitle = document.getElementById('contactTitle');
    const contactInfo = document.getElementById('contactInfo');

    if (contactTitle) contactTitle.textContent = siteData.contact.title;
    if (contactInfo) {
        contactInfo.innerHTML = siteData.contact.info.map(infoItem => {
            return `
                <div class="info-item">
                    <i class="${infoItem.icon}"></i>
                    <div>
                        <h4>${infoItem.title}</h4>
                        <p>${infoItem.lines.join('<br>')}</p>
                    </div>
                </div>
            `;
        }).join('');
    }
}

function renderFooter() {
    const footerContent = document.getElementById('footerContent');
    const footerCopyright = document.getElementById('footerCopyright');

    if (footerContent) {
        footerContent.innerHTML = `
            <div class="footer-section">
                <h4>Académie de Football</h4>
                <p>${siteData.footer.aboutText}</p>
                <div class="social-links">
                    ${siteData.footer.socialLinks.map(link => `<a href="${link.href}"><i class="${link.icon}"></i></a>`).join('')}
                </div>
            </div>
            <div class="footer-section">
                <h4>Liens Rapides</h4>
                <ul>
                    ${siteData.footer.quickLinks.map(link => `<li><a href="${link.href}">${link.text}</a></li>`).join('')}
                </ul>
            </div>
            <div class="footer-section">
                <h4>Services</h4>
                <ul>
                    ${siteData.footer.serviceLinks.map(link => `<li><a href="${link.href}">${link.text}</a></li>`).join('')}
                </ul>
            </div>
            <div class="footer-section">
                <h4>Infolettre</h4>
                <p>${siteData.footer.newsletterText}</p>
                <form class="newsletter-form">
                    <input type="email" placeholder="Votre email" required>
                    <button type="submit">S'abonner</button>
                </form>
            </div>
        `;
    }

    if (footerCopyright)
        footerCopyright.textContent = siteData.footer.copyright;
}

function setupMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

function setupContactForm() {
    const contatoForm = document.querySelector('.contato-form');
    if (!contatoForm) return;

    contatoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = contatoForm.querySelector('input[type="text"]').value;
        const email = contatoForm.querySelector('input[type="email"]').value;
        const telefone = contatoForm.querySelector('input[type="tel"]').value;
        const mensagem = contatoForm.querySelector('textarea').value;

        if (nome && email && telefone && mensagem) {
            alert(`Merci ${nome}!\n\nVotre message a été reçu avec succès.\nNous vous contacterons bientôt!`);
            contatoForm.reset();
        } else {
            alert('Veuillez remplir tous les champs!');
        }
    });
}

function setupNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;

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

function setupCtaScroll() {
    const ctaBtn = document.getElementById('ctaButton');
    if (!ctaBtn) return;

    ctaBtn.addEventListener('click', () => {
        document.getElementById('servicos').scrollIntoView({ behavior: 'smooth' });
    });
}

function setupScrollAnimations() {
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

    document.querySelectorAll('.servico-card, .galeria-item').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

function setupNavbarShadow() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
}

function setupHeroParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `0px ${scrollPosition * 0.5}px`;
    });
}

function initSite() {
    renderHero();
    renderAbout();
    renderServices();
    renderGallery();
    renderContactInfo();
    renderFooter();
    setupMenuToggle();
    setupContactForm();
    setupNewsletterForm();
    setupCtaScroll();
    setupScrollAnimations();
    setupNavbarShadow();
    setupHeroParallax();
    console.log('Académie de Football - Site dynamique chargé avec succès!');
}

document.addEventListener('DOMContentLoaded', initSite);
