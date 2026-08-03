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
                    <div class="service-image">
                        <img src="${service.img}" alt="${service.alt}">
                    </div>
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
