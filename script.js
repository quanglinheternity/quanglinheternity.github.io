function initLanguage() {
    const savedLang = localStorage.getItem('portfolio-lang') || 'en';
    setLanguage(savedLang);
}

let typingInterval;

function typeEffect(element, text, speed = 50) {
    element.innerHTML = "";
    let i = 0;
    clearInterval(typingInterval);
    typingInterval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
        }
    }, speed);
}

function setLanguage(lang) {
    localStorage.setItem('portfolio-lang', lang);

    // Update active button state
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Translate elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (el.classList.contains('typewriter-text')) return; // Handle separately

            // Using innerHTML to support <strong> tags in some translations
            el.innerHTML = translations[lang][key];
        }
    });

    // Handle typewriter prefix if it exists
    const typewriterText = document.querySelector('.typewriter-text');
    if (typewriterText) {
        const title = translations[lang]['hero-title'] || "";
        typeEffect(typewriterText, title);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initLanguage();

    // Language switcher event listeners
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setLanguage(lang);
        });
    });
});
