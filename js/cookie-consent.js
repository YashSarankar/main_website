// Cookie Consent Banner - Required for AdSense GDPR Compliance
(function () {
    const CONSENT_KEY = 'sarankar_cookie_consent';

    function hasConsent() {
        return localStorage.getItem(CONSENT_KEY) !== null;
    }

    function setConsent(value) {
        localStorage.setItem(CONSENT_KEY, value);
        document.getElementById('cookie-banner').style.display = 'none';
    }

    function createBanner() {
        if (hasConsent()) return;

        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Cookie consent');
        banner.innerHTML = `
            <div class="cookie-content">
                <div class="cookie-text">
                    <span class="cookie-icon">🍪</span>
                    <p>We use cookies to personalise content and ads, to provide social media features and to analyse our traffic. We also share information about your use of our site with our advertising and analytics partners. By continuing to use this site, you consent to our use of cookies. <a href="privacy.html">Learn more</a></p>
                </div>
                <div class="cookie-actions">
                    <button id="cookie-accept" class="cookie-btn cookie-accept-btn">Accept All</button>
                    <button id="cookie-decline" class="cookie-btn cookie-decline-btn">Necessary Only</button>
                </div>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            #cookie-banner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: 99999;
                background: rgba(15, 23, 42, 0.97);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border-top: 1px solid rgba(59, 130, 246, 0.3);
                padding: 1.2rem 2rem;
                box-shadow: 0 -10px 40px rgba(0,0,0,0.4);
                animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }
            body.light-theme #cookie-banner {
                background: rgba(255, 255, 255, 0.97);
                border-top: 1px solid rgba(59, 130, 246, 0.2);
            }
            @keyframes slideUp {
                from { transform: translateY(100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .cookie-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                gap: 2rem;
                flex-wrap: wrap;
            }
            .cookie-text {
                display: flex;
                align-items: flex-start;
                gap: 0.8rem;
                flex: 1;
                min-width: 280px;
            }
            .cookie-icon {
                font-size: 1.5rem;
                flex-shrink: 0;
                line-height: 1.6;
            }
            .cookie-text p {
                font-family: 'Inter', sans-serif;
                font-size: 0.88rem;
                color: #94a3b8;
                line-height: 1.6;
                margin: 0;
            }
            body.light-theme .cookie-text p { color: #475569; }
            .cookie-text a {
                color: #3b82f6;
                text-decoration: underline;
                font-weight: 600;
            }
            .cookie-actions {
                display: flex;
                gap: 0.8rem;
                flex-shrink: 0;
            }
            .cookie-btn {
                padding: 0.6rem 1.4rem;
                border-radius: 8px;
                font-size: 0.85rem;
                font-weight: 700;
                cursor: pointer;
                border: none;
                font-family: 'Inter', sans-serif;
                transition: all 0.2s ease;
                white-space: nowrap;
            }
            .cookie-accept-btn {
                background: linear-gradient(135deg, #3b82f6, #6366f1);
                color: white;
                box-shadow: 0 4px 12px rgba(59, 130, 246, 0.35);
            }
            .cookie-accept-btn:hover {
                transform: translateY(-1px);
                box-shadow: 0 6px 18px rgba(59, 130, 246, 0.5);
            }
            .cookie-decline-btn {
                background: transparent;
                color: #94a3b8;
                border: 1px solid rgba(255,255,255,0.1);
            }
            body.light-theme .cookie-decline-btn { 
                color: #475569; 
                border-color: rgba(0,0,0,0.15);
            }
            .cookie-decline-btn:hover {
                border-color: #3b82f6;
                color: #3b82f6;
            }
            @media (max-width: 600px) {
                #cookie-banner { padding: 1rem; }
                .cookie-content { gap: 1rem; }
                .cookie-actions { width: 100%; }
                .cookie-btn { flex: 1; }
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(banner);

        document.getElementById('cookie-accept').addEventListener('click', () => setConsent('all'));
        document.getElementById('cookie-decline').addEventListener('click', () => setConsent('necessary'));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createBanner);
    } else {
        createBanner();
    }
})();
