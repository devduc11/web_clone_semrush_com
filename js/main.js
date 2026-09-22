/**
 * Semrush Clone - Core Interactive Features
 * Modern Vanilla JS implementation matching Semrush.com UX
 */

(function () {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', () => {
        initHeaderDropdowns();
        initMobileMenu();
        initStickyHeader();
        initHeroSearch();
        initPromoBlock();
        initToolkits();
        initStats();
        initResourcesSlider();
        initFooter();
    });

    /* =========================================================================
       1. HEADER DROPDOWNS & MEGA MENUS (Desktop)
       ========================================================================= */
    function initHeaderDropdowns() {
        const header = document.getElementById('srf-header');
        if (!header) return;

        const menuItems = header.querySelectorAll('button.srf-header__menu-item[popovertarget]');
        const popovers = document.querySelectorAll('srf-header-dropdown-items.srf-header-dropdown-popover');

        let closeTimeout = null;

        function closeAllPopovers() {
            popovers.forEach(pop => {
                if (pop.matches(':popover-open')) {
                    pop.hidePopover();
                }
                pop.classList.remove('is-active');
            });
            menuItems.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
        }

        menuItems.forEach(btn => {
            const targetId = btn.getAttribute('popovertarget');
            const targetPopover = document.getElementById(targetId);
            if (!targetPopover) return;

            // Handle Popover native toggle event to sync aria-expanded
            targetPopover.addEventListener('toggle', (e) => {
                const isOpen = e.newState === 'open';
                btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                if (isOpen) {
                    targetPopover.classList.add('is-active');
                    // Close other popovers
                    popovers.forEach(other => {
                        if (other !== targetPopover && other.matches(':popover-open')) {
                            other.hidePopover();
                        }
                    });
                } else {
                    targetPopover.classList.remove('is-active');
                }
            });

            // Desktop Hover interactions
            btn.addEventListener('mouseenter', () => {
                clearTimeout(closeTimeout);
                // Open this popover
                if (!targetPopover.matches(':popover-open')) {
                    try {
                        targetPopover.showPopover();
                    } catch (e) {
                        targetPopover.classList.add('is-active');
                    }
                }
                btn.setAttribute('aria-expanded', 'true');
            });

            btn.addEventListener('mouseleave', (e) => {
                closeTimeout = setTimeout(() => {
                    if (!targetPopover.matches(':hover') && !btn.matches(':hover')) {
                        if (targetPopover.matches(':popover-open')) {
                            targetPopover.hidePopover();
                        }
                        btn.setAttribute('aria-expanded', 'false');
                    }
                }, 200);
            });

            targetPopover.addEventListener('mouseenter', () => {
                clearTimeout(closeTimeout);
            });

            targetPopover.addEventListener('mouseleave', () => {
                closeTimeout = setTimeout(() => {
                    if (!targetPopover.matches(':hover') && !btn.matches(':hover')) {
                        if (targetPopover.matches(':popover-open')) {
                            targetPopover.hidePopover();
                        }
                        btn.setAttribute('aria-expanded', 'false');
                    }
                }, 200);
            });
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeAllPopovers();
            }
        });
    }

    /* =========================================================================
       2. MOBILE MENU & DRAWER NAVIGATION
       ========================================================================= */
    function initMobileMenu() {
        const burgerBtn = document.querySelector('.srf-header__burger');
        const mobileContainer = document.getElementById('srf-header-mobile-menu-container');
        const closeBtn = document.querySelector('.srf-header__mobile-menu-close');
        const backBtn = document.querySelector('.srf-header__mobile-menu-back');
        const contentContainer = document.getElementById('srf-header-mobile-menu-content');
        const srfHeader = document.querySelector('srf-header');

        if (!mobileContainer || !contentContainer) return;

        // Populate mobile menu content dynamically if empty
        if (!contentContainer.hasChildNodes() || contentContainer.children.length === 0) {
            buildMobileMenuContent(contentContainer);
        }

        // Open burger
        if (burgerBtn) {
            burgerBtn.addEventListener('click', (e) => {
                e.preventDefault();
                try {
                    mobileContainer.showPopover();
                } catch (err) {
                    mobileContainer.classList.add('is-open');
                }
                document.body.style.overflow = 'hidden';
                if (srfHeader) srfHeader.setAttribute('mobile-view', 'menu');
            });
        }

        // Close button
        function closeMobileMenu() {
            try {
                mobileContainer.hidePopover();
            } catch (err) {
                mobileContainer.classList.remove('is-open');
            }
            document.body.style.overflow = '';
            resetMobileSubmenu();
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', closeMobileMenu);
        }

        // Mobile container popover toggle
        mobileContainer.addEventListener('toggle', (e) => {
            if (e.newState === 'closed') {
                document.body.style.overflow = '';
                resetMobileSubmenu();
            }
        });

        // Submenu navigation in mobile
        function resetMobileSubmenu() {
            if (backBtn) backBtn.setAttribute('hidden', '');
            if (srfHeader) srfHeader.setAttribute('mobile-view', 'menu');
            const subPanels = contentContainer.querySelectorAll('.srf-mobile-submenu-panel');
            subPanels.forEach(p => p.classList.remove('is-visible'));
            const mainPanel = contentContainer.querySelector('.srf-mobile-main-panel');
            if (mainPanel) mainPanel.classList.remove('is-hidden');
        }

        if (backBtn) {
            backBtn.addEventListener('click', () => {
                resetMobileSubmenu();
            });
        }
    }

    function buildMobileMenuContent(container) {
        container.innerHTML = `
            <div class="srf-mobile-main-panel">
                <nav class="srf-mobile-nav" aria-label="Mobile menu">
                    <ul class="srf-mobile-nav__list">
                        <li>
                            <button class="srf-mobile-nav__item srf-mobile-nav__item--expandable" data-submenu="products">
                                <span>Product</span>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M6 3l5 5-5 5V3z"/></svg>
                            </button>
                        </li>
                        <li>
                            <a href="/pricing/" class="srf-mobile-nav__item">Pricing</a>
                        </li>
                        <li>
                            <button class="srf-mobile-nav__item srf-mobile-nav__item--expandable" data-submenu="solutions">
                                <span>Solutions</span>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M6 3l5 5-5 5V3z"/></svg>
                            </button>
                        </li>
                        <li>
                            <button class="srf-mobile-nav__item srf-mobile-nav__item--expandable" data-submenu="resources">
                                <span>Resources</span>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M6 3l5 5-5 5V3z"/></svg>
                            </button>
                        </li>
                        <li>
                            <a href="https://enterprise.semrush.com/" class="srf-mobile-nav__item" target="_blank">Enterprise</a>
                        </li>
                    </ul>
                </nav>
                <div class="srf-header__buttons srf-mobile-buttons">
                    <a href="/login/?src=header" class="srf-header__link-button srf-login-btn" data-variant="primary-outlined">Log In</a>
                    <a href="/signup/?src=header" class="srf-header__link-button srf-register-btn" data-variant="primary-filled">Start for free</a>
                </div>
            </div>

            <!-- Submenu: Product -->
            <div class="srf-mobile-submenu-panel" id="srf-mobile-submenu-products">
                <div class="srf-mobile-submenu-title">Product</div>
                <div class="srf-mobile-submenu-group">
                    <h4>Get started</h4>
                    <a href="/one/">Semrush One</a>
                    <a href="/enterprise/">Enterprise</a>
                    <a href="/mcp/">Semrush MCP</a>
                    <a href="/stats/">Stats and Facts</a>
                </div>
                <div class="srf-mobile-submenu-group">
                    <h4>Discover</h4>
                    <a href="/features/keyword-research/">Keyword Research</a>
                    <a href="/features/competitor-analysis/">Competitor Analysis</a>
                    <a href="/features/ai-visibility/">AI Visibility</a>
                    <a href="/features/prompt-research/">Prompt Research</a>
                    <a href="/features/local-seo/">Local SEO</a>
                </div>
            </div>

            <!-- Submenu: Solutions -->
            <div class="srf-mobile-submenu-panel" id="srf-mobile-submenu-solutions">
                <div class="srf-mobile-submenu-title">Solutions</div>
                <div class="srf-mobile-submenu-group">
                    <h4>Use cases</h4>
                    <a href="/solutions/search-visibility/">Search visibility</a>
                    <a href="/solutions/ai-visibility/">AI visibility</a>
                    <a href="/solutions/analyze-competitors-market/">Competitive intelligence</a>
                    <a href="/solutions/local-search/">Local search</a>
                    <a href="/solutions/create-content/">Content production</a>
                </div>
                <div class="srf-mobile-submenu-group">
                    <h4>By role</h4>
                    <a href="/solutions/business-owners/">Business owners</a>
                    <a href="/solutions/seo-professionals/">SEO professionals</a>
                    <a href="/solutions/content-marketers/">Content marketers</a>
                    <a href="/solutions/growth-marketers/">Growth marketers</a>
                </div>
            </div>

            <!-- Submenu: Resources -->
            <div class="srf-mobile-submenu-panel" id="srf-mobile-submenu-resources">
                <div class="srf-mobile-submenu-title">Resources</div>
                <div class="srf-mobile-submenu-group">
                    <h4>Grow with Semrush</h4>
                    <a href="/blog/">Blog</a>
                    <a href="/kb/">Knowledge Base</a>
                    <a href="/academy/">Academy</a>
                    <a href="/company/stories/">Customer Stories</a>
                    <a href="/academy/webinars/">Webinars</a>
                </div>
            </div>
        `;

        const backBtn = document.querySelector('.srf-header__mobile-menu-back');
        const srfHeader = document.querySelector('srf-header');
        const mainPanel = container.querySelector('.srf-mobile-main-panel');
        const expandableBtns = container.querySelectorAll('.srf-mobile-nav__item--expandable');

        expandableBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const subId = btn.getAttribute('data-submenu');
                const targetPanel = container.querySelector(`#srf-mobile-submenu-${subId}`);
                if (targetPanel) {
                    mainPanel.classList.add('is-hidden');
                    targetPanel.classList.add('is-visible');
                    if (backBtn) backBtn.removeAttribute('hidden');
                    if (srfHeader) srfHeader.setAttribute('mobile-view', 'menu-submenu');
                }
            });
        });
    }

    /* =========================================================================
       3. STICKY HEADER & SCROLL BEHAVIOR
       ========================================================================= */
    function initStickyHeader() {
        const header = document.getElementById('srf-header');
        if (!header) return;

        function onScroll() {
            if (window.scrollY > 20) {
                header.classList.add('srf-header--scrolled');
            } else {
                header.classList.remove('srf-header--scrolled');
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* =========================================================================
       4. HERO SEARCH & INSTANT ANALYTICS PREVIEW MODAL
       ========================================================================= */
    function initHeroSearch() {
        const searchForm = document.querySelector('.js-fake-search');
        if (!searchForm) return;

        const input = searchForm.querySelector('.mp-search__input-value');
        const submitBtn = searchForm.querySelector('button[type="submit"]');
        const inputWrapper = searchForm.querySelector('.js-fake-input-new') || input.parentElement;

        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const rawVal = input ? input.value.trim() : '';
            const domain = cleanDomain(rawVal);

            if (!rawVal) {
                // Shake animation for empty input
                inputWrapper.classList.add('mp-search__input--error');
                if (input) input.focus();
                setTimeout(() => {
                    inputWrapper.classList.remove('mp-search__input--error');
                }, 800);
                return;
            }

            // Loading state on button
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span class="mp-btn-spinner"></span>
                <span>Analyzing...</span>
            `;

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                showAnalyticsModal(domain);
            }, 700);
        });
    }

    function cleanDomain(url) {
        let domain = url.toLowerCase().replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0];
        if (!domain.includes('.')) domain += '.com';
        return domain;
    }

    function showAnalyticsModal(domain) {
        let modal = document.getElementById('semrush-analysis-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'semrush-analysis-modal';
            modal.className = 'semrush-modal-backdrop';
            document.body.appendChild(modal);
        }

        // Generate semi-realistic randomized stats based on domain hash
        const seed = domain.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const authorityScore = Math.min(96, Math.max(35, (seed % 60) + 38));
        const organicTraffic = ((seed % 15) + 1.8).toFixed(1) + 'M';
        const backlinks = ((seed % 35) + 2.4).toFixed(1) + 'M';
        const keywords = ((seed % 80) + 12.5).toFixed(1) + 'K';

        modal.innerHTML = `
            <div class="semrush-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                <button class="semrush-modal-close" aria-label="Close modal">&times;</button>
                <div class="semrush-modal-header">
                    <div class="semrush-modal-badge">
                        <span class="badge-dot"></span> Live SEO Overview
                    </div>
                    <h2 id="modal-title" class="semrush-modal-domain">${escapeHtml(domain)}</h2>
                    <p class="semrush-modal-subtitle">Domain Overview & Competitive Brand Visibility in AI & Google Search</p>
                </div>

                <div class="semrush-modal-metrics">
                    <div class="semrush-metric-card">
                        <span class="semrush-metric-label">Authority Score</span>
                        <div class="semrush-metric-val font-accent">${authorityScore}<span>/100</span></div>
                        <span class="semrush-metric-trend up">+4 pts last mo.</span>
                    </div>
                    <div class="semrush-metric-card">
                        <span class="semrush-metric-label">Organic Search Traffic</span>
                        <div class="semrush-metric-val">${organicTraffic}</div>
                        <span class="semrush-metric-trend up">+14.6% growth</span>
                    </div>
                    <div class="semrush-metric-card">
                        <span class="semrush-metric-label">Total Backlinks</span>
                        <div class="semrush-metric-val">${backlinks}</div>
                        <span class="semrush-metric-trend up">High Quality</span>
                    </div>
                    <div class="semrush-metric-card">
                        <span class="semrush-metric-label">Ranking Keywords</span>
                        <div class="semrush-metric-val">${keywords}</div>
                        <span class="semrush-metric-trend up">Across 142 Geos</span>
                    </div>
                </div>

                <div class="semrush-modal-keywords">
                    <div class="keywords-title">Top Organic Keywords Detected:</div>
                    <div class="keywords-tags">
                        <span class="kw-tag">${escapeHtml(domain.split('.')[0])} review</span>
                        <span class="kw-tag">${escapeHtml(domain.split('.')[0])} pricing</span>
                        <span class="kw-tag">best ${escapeHtml(domain.split('.')[0])} alternatives</span>
                        <span class="kw-tag">${escapeHtml(domain.split('.')[0])} online</span>
                    </div>
                </div>

                <div class="semrush-modal-footer">
                    <a href="/signup/?src=analysis_modal&domain=${encodeURIComponent(domain)}" class="mp-button semrush-modal-cta">
                        Start 7-Day Free Trial to Unlock Full Report
                    </a>
                    <button class="semrush-modal-btn-secondary semrush-close-trigger">Check Another Website</button>
                </div>
            </div>
        `;

        modal.classList.add('is-visible');
        document.body.style.overflow = 'hidden';

        const closeBtn = modal.querySelector('.semrush-modal-close');
        const secondaryClose = modal.querySelector('.semrush-close-trigger');

        function closeModal() {
            modal.classList.remove('is-visible');
            document.body.style.overflow = '';
        }

        if (closeBtn) closeBtn.onclick = closeModal;
        if (secondaryClose) secondaryClose.onclick = closeModal;
        modal.onclick = (e) => {
            if (e.target === modal) closeModal();
        };
    }

    function escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    /* =========================================================================
       5. PROMO BLOCK CARDS TOGGLE (Semrush One vs Semrush MCP)
       ========================================================================= */
    function initPromoBlock() {
        const cards = document.querySelectorAll('.mp-promo-block__card');
        if (!cards || cards.length < 2) return;

        cards.forEach(card => {
            function activateCard() {
                cards.forEach(c => c.classList.remove('mp-promo-block__card--expanded'));
                card.classList.add('mp-promo-block__card--expanded');
            }

            card.addEventListener('click', activateCard);
            card.addEventListener('mouseenter', activateCard);
        });
    }

    /* =========================================================================
       6. TOOLKITS ACCORDION & HORIZONTAL SLIDER
       ========================================================================= */
    function initToolkits() {
        // A. Accordion expand/collapse
        const triggers = document.querySelectorAll('.mp-toolkit__trigger');
        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
                const parentSlide = trigger.closest('.mp-toolkit');

                if (isExpanded) {
                    // Collapse
                    trigger.setAttribute('aria-expanded', 'false');
                } else {
                    // Expand this one
                    trigger.setAttribute('aria-expanded', 'true');

                    // Smooth scroll toolkit into view
                    if (parentSlide) {
                        setTimeout(() => {
                            parentSlide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                        }, 150);
                    }
                }
            });
        });

        // B. Horizontal slider navigation
        const toolkitsSlider = document.querySelector('.mp-toolkits-slider');
        if (toolkitsSlider) {
            const list = toolkitsSlider.querySelector('.mp-toolkits__list');
            const prevBtns = document.querySelectorAll('.swiper-button-prev[data-ga4-path="toolkits"]');
            const nextBtns = document.querySelectorAll('.swiper-button-next[data-ga4-path="toolkits"]');

            const scrollAmount = 400;

            prevBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (list) list.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                });
            });

            nextBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (list) list.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                });
            });

            // Enable mouse drag scroll on slider
            setupDragScroll(list);
        }
    }

    /* =========================================================================
       7. STATS SECTION (Counter Animation & Active Item Switcher)
       ========================================================================= */
    function initStats() {
        const statItems = document.querySelectorAll('.js-stats-item');
        if (!statItems || statItems.length === 0) return;

        // Hover / Click to switch active stat item
        statItems.forEach(item => {
            function activateStat() {
                statItems.forEach(s => s.classList.remove('active'));
                item.classList.add('active');
            }

            item.addEventListener('mouseenter', activateStat);
            item.addEventListener('click', activateStat);
        });

        // Number Counter Animation via IntersectionObserver
        const statsSection = document.querySelector('.mp-stats') || statItems[0].closest('section') || statItems[0].parentElement;
        if (!statsSection || !('IntersectionObserver' in window)) return;

        let animated = false;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    statItems.forEach(item => {
                        const countEl = item.querySelector('.mp-stats__item-count');
                        if (countEl) {
                            animateStatCounter(countEl);
                        }
                    });
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(statsSection);
    }

    function animateStatCounter(element) {
        const text = element.innerText.trim();
        const match = text.match(/^(\d+(?:\.\d+)?)(.*)$/);
        if (!match) return;

        const targetNum = parseFloat(match[1]);
        const suffix = match[2]; // B, T, M, +, etc.
        const duration = 1500;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.round(targetNum * easeOut);

            element.innerText = currentVal + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.innerText = text;
            }
        }

        requestAnimationFrame(update);
    }

    /* =========================================================================
       8. RESOURCES ARTICLE CAROUSEL
       ========================================================================= */
    function initResourcesSlider() {
        const resourcesSwiper = document.querySelector('.mp-resources-swiper');
        if (!resourcesSwiper) return;

        const list = resourcesSwiper.querySelector('.mp-resources__list');
        const prevBtns = document.querySelectorAll('.swiper-button-prev[data-ga4-path="resources"]');
        const nextBtns = document.querySelectorAll('.swiper-button-next[data-ga4-path="resources"]');

        const cardWidth = 380;

        prevBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (list) list.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            });
        });

        nextBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (list) list.scrollBy({ left: cardWidth, behavior: 'smooth' });
            });
        });

        setupDragScroll(list);
    }

    /* =========================================================================
       9. FOOTER ACCORDIONS & LANGUAGE SELECTOR
       ========================================================================= */
    function initFooter() {
        // A. Footer Mobile Accordions
        const footerBlockTitles = document.querySelectorAll('.srf-footer__menu-block-title, .srf-footer__legal-title');
        footerBlockTitles.forEach(titleBtn => {
            titleBtn.addEventListener('click', (e) => {
                // Only on small screen
                if (window.innerWidth >= 768) return;

                const parent = titleBtn.parentElement;
                const list = parent ? parent.querySelector('.srf-footer__menu-list, .srf-footer__legal-list') : null;

                if (list) {
                    const isActive = list.classList.contains('srf-footer__menu-list--active');
                    list.classList.toggle('srf-footer__menu-list--active', !isActive);
                    titleBtn.classList.toggle('srf-footer__menu-block-title--active', !isActive);
                }
            });
        });

        // B. Footer Language Dropdown
        const langBtn = document.querySelector('.srf-footer__button--lang');
        const langList = document.querySelector('.srf-footer__lang-list');

        if (langBtn && langList) {
            langBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                langList.classList.toggle('srf-footer__lang-list--active');
            });

            const langItems = langList.querySelectorAll('.srf-footer__lang-button');
            langItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    langItems.forEach(b => b.classList.remove('srf-footer__lang-button--active'));
                    item.classList.add('srf-footer__lang-button--active');

                    // Update button label
                    langBtn.innerText = item.innerText.trim();
                    langList.classList.remove('srf-footer__lang-list--active');
                });
            });

            // Close on click outside
            document.addEventListener('click', (e) => {
                if (!langBtn.contains(e.target) && !langList.contains(e.target)) {
                    langList.classList.remove('srf-footer__lang-list--active');
                }
            });
        }
    }

    /* =========================================================================
       HELPER: DRAG TO SCROLL (Mouse and Touch)
       ========================================================================= */
    function setupDragScroll(element) {
        if (!element) return;

        let isDown = false;
        let startX;
        let scrollLeft;

        element.addEventListener('mousedown', (e) => {
            // Ignore if clicking on buttons or links
            if (e.target.closest('button') || e.target.closest('a')) return;

            isDown = true;
            element.style.cursor = 'grabbing';
            startX = e.pageX - element.offsetLeft;
            scrollLeft = element.scrollLeft;
        });

        element.addEventListener('mouseleave', () => {
            isDown = false;
            element.style.cursor = '';
        });

        element.addEventListener('mouseup', () => {
            isDown = false;
            element.style.cursor = '';
        });

        element.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - element.offsetLeft;
            const walk = (x - startX) * 1.5;
            element.scrollLeft = scrollLeft - walk;
        });
    }

})();
