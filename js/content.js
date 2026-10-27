const ContentEngine = {
    data: window.JOURNAL_CONTENT || null,
    language: localStorage.getItem("language") || "es",

    async init() {
        if (!localStorage.getItem("language")) {
            localStorage.setItem("language", "es");
        }

        // Apply translations to static DOM elements immediately
        this.updateLanguage();
        this.setupLanguageButtons();

        // Render immediately with bundled data if available
        if (this.data) {
            this.renderHome();
            await this.renderContentPage();
        }

        // Attempt to fetch fresh data/content.json in case it was updated on a server
        try {
            const response = await fetch("data/content.json");
            if (response.ok) {
                const freshData = await response.json();
                if (freshData && freshData.content) {
                    this.data = freshData;
                    this.renderHome();
                    await this.renderContentPage();
                }
            }
        } catch (error) {
            // Silently fall back to window.JOURNAL_CONTENT (e.g. file:// protocol)
            if (!this.data) {
                console.warn("CONTENT ENGINE: Running in fallback mode without content.json:", error);
            }
        }

        // If still no content rendered on home, show empty notice
        const container = document.querySelector("#latest-content");
        if (container && (!this.items || this.items.length === 0)) {
            container.innerHTML = `
                <div class="content-loading">
                    ${this.language === "es" ? "No se pudo cargar el índice de contenido." : "Could not load content index."}
                </div>
            `;
        }
    },

    get items() {
        return this.data?.content || window.JOURNAL_CONTENT?.content || [];
    },

    getText(value) {
        if (!value) return "";
        if (typeof value === "string") return value;
        return value[this.language] || value.es || value.en || "";
    },

    getPath(path) {
        if (!path) return "";
        if (typeof path === "string") return path;
        return path[this.language] || path.es || path.en || "";
    },

    formatDate(date) {
        if (!date) return "";
        const dateObject = new Date(date + "T12:00:00");
        return dateObject.toLocaleDateString(
            this.language === "es" ? "es-MX" : "en-US",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        ).toUpperCase();
    },

    getLatest(limit = 6) {
        return [...this.items]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    },

    getBySlug(slug) {
        if (!slug) return null;
        const normalized = slug.trim().toLowerCase();
        return this.items.find(item => item.slug && item.slug.toLowerCase() === normalized);
    },

    renderHome() {
        const container = document.querySelector("#latest-content");
        if (!container) return;

        const items = this.getLatest(6);

        if (!items || items.length === 0) {
            container.innerHTML = `
                <div class="content-loading">
                    ${this.language === "es" ? "No hay entradas disponibles todavía." : "No entries available yet."}
                </div>
            `;
            return;
        }

        container.innerHTML = items.map(item => this.createCard(item)).join("");
        this.animateCards();
    },

    createCard(item) {
        const title = this.getText(item.title);
        const description = this.getText(item.description);
        const category = item.category || "JOURNAL";
        const readMoreText = I18N[this.language]?.["card.read"] || (this.language === "es" ? "Explorar entrada →" : "Explore entry →");

        const image = item.image
            ? `
                <div class="content-card-image">
                    <img
                        src="${item.image}"
                        alt="${title}"
                        loading="lazy"
                        onerror="this.parentElement.style.display='none'"
                    >
                </div>
              `
            : "";

        const tagsHtml = (item.tags || [])
            .map(tag => `<span>${tag}</span>`)
            .join("");

        return `
            <article class="content-card" data-type="${item.type || 'entry'}">
                ${image}
                <div class="content-card-body">
                    <div class="content-card-meta">
                        <span>${category}</span>
                        <time>${this.formatDate(item.date)}</time>
                    </div>

                    <h3>${title}</h3>

                    <p>${description}</p>

                    <div class="content-card-tags">
                        ${tagsHtml}
                    </div>

                    <a href="article.html?slug=${encodeURIComponent(item.slug)}" class="content-card-link">
                        ${readMoreText}
                    </a>
                </div>
            </article>
        `;
    },

    async renderContentPage() {
        const container = document.querySelector("#article-content");
        if (!container) return;

        const params = new URLSearchParams(window.location.search);
        let slug = params.get("slug");

        // If no slug provided, list all available articles
        if (!slug) {
            const listItems = this.items.map(it => `
                <div style="margin: 20px 0; padding: 20px; border: 1px solid var(--border); background: var(--surface);">
                    <span style="color:var(--accent); font-family:var(--mono); font-size:0.75rem;">${it.category} · ${this.formatDate(it.date)}</span>
                    <h3 style="margin: 10px 0;"><a href="article.html?slug=${encodeURIComponent(it.slug)}" style="color:var(--text); text-decoration:none;">${this.getText(it.title)}</a></h3>
                    <p style="color:var(--muted); font-size:0.9rem;">${this.getText(it.description)}</p>
                    <a href="article.html?slug=${encodeURIComponent(it.slug)}" class="content-card-link" style="margin-top:10px;">${this.language === 'es' ? 'Leer artículo →' : 'Read article →'}</a>
                </div>
            `).join("");

            container.innerHTML = `
                <div class="article-error">
                    <a href="index.html" class="article-back-link">${I18N[this.language]?.["article.back"] || "← Volver al inicio"}</a>
                    <h1 style="font-size:2rem; margin-bottom:20px;">${this.language === 'es' ? 'Índice de Publicaciones' : 'Index of Publications'}</h1>
                    <p class="article-description">${this.language === 'es' ? 'Selecciona una entrada para leerla:' : 'Select an entry to read:'}</p>
                    <div style="margin-top:30px;">${listItems}</div>
                </div>
            `;
            return;
        }

        const item = this.getBySlug(slug);

        if (!item) {
            const notFoundTitle = I18N[this.language]?.["article.notFound"] || "Contenido no encontrado";
            const notFoundDesc = I18N[this.language]?.["article.notFoundDesc"] || "El artículo solicitado no existe.";
            container.innerHTML = `
                <div class="article-error">
                    <a href="index.html" class="article-back-link">${I18N[this.language]?.["article.back"] || "← Volver al inicio"}</a>
                    <span>404</span>
                    <h1>${notFoundTitle}</h1>
                    <p class="article-description">${notFoundDesc}</p>
                    <div style="margin-top:25px;">
                        <a href="article.html" class="content-card-link">${this.language === 'es' ? 'Ver todas las publicaciones →' : 'View all publications →'}</a>
                    </div>
                </div>
            `;
            return;
        }

        const titleText = this.getText(item.title);
        const descText = this.getText(item.description);
        const statusLabel = I18N[this.language]?.["article.status"] || "STATUS:";
        const backText = I18N[this.language]?.["article.back"] || "← Volver al inicio";

        document.title = `${titleText} — ALONSO DATA & SYSTEMS`;

        let html = "";
        try {
            const markdownPath = this.getPath(item.path);
            const markdown = await this.loadMarkdown(markdownPath, item);
            if (typeof marked !== "undefined") {
                html = marked.parse(markdown);
            } else {
                html = `<pre>${markdown}</pre>`;
            }
        } catch (error) {
            console.error("Failed to load article markdown:", error);
            html = `<p class="article-error-msg">${this.language === "es" ? "No se pudo cargar el archivo markdown." : "Could not load markdown file."}</p>`;
        }

        const coverImage = item.image
            ? `<img class="article-cover" src="${item.image}" alt="${titleText}" onerror="this.style.display='none'">`
            : "";

        container.innerHTML = `
            <a href="index.html" class="article-back-link">${backText}</a>

            <header class="article-header">
                <div class="article-category">
                    ${item.category || 'LOG'}
                </div>

                <h1>
                    ${titleText}
                </h1>

                <p class="article-description">
                    ${descText}
                </p>

                <div class="article-meta">
                    <span>
                        ${this.formatDate(item.date)}
                    </span>
                    <span>
                        ${statusLabel} ${(item.status || "COMPLETE").toUpperCase()}
                    </span>
                </div>

                ${coverImage}
            </header>

            <div class="article-body">
                ${html}
            </div>
        `;
    },

    async loadMarkdown(path, item) {
        // Try network fetch first (works when running through http server)
        if (path) {
            try {
                const response = await fetch(path);
                if (response.ok) {
                    return await response.text();
                }
            } catch (err) {
                // If fetch failed (e.g. file:// CORS), fall back to embedded content
            }
        }

        // Fallback to embedded markdown in item
        if (item && item.markdown) {
            if (typeof item.markdown === "string") return item.markdown;
            return item.markdown[this.language] || item.markdown.es || item.markdown.en || "";
        }

        // Fallback to item description if no markdown at all
        return `# ${this.getText(item?.title)}\n\n${this.getText(item?.description)}`;
    },

    setLanguage(language) {
        this.language = language;
        localStorage.setItem("language", language);
        this.updateLanguage();
        this.renderHome();
        this.renderContentPage();
    },

    updateLanguage() {
        if (typeof I18N === "undefined") return;

        const dict = I18N[this.language] || I18N.es;
        if (!dict) return;

        document.querySelectorAll("[data-i18n]").forEach(element => {
            const key = element.dataset.i18n;
            const translation = dict[key];
            if (translation !== undefined) {
                element.innerHTML = translation;
            }
        });

        document.querySelectorAll(".language-button").forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.language === this.language
            );
        });

        document.documentElement.lang = this.language;
    },

    setupLanguageButtons() {
        document.querySelectorAll(".language-button").forEach(button => {
            button.onclick = (e) => {
                e.preventDefault();
                const lang = button.dataset.language;
                if (lang) {
                    this.setLanguage(lang);
                }
            };
        });
    },

    animateCards() {
        if (typeof gsap === "undefined") return;
        gsap.from(".content-card", {
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out"
        });
    }
};

// Make accessible globally
window.ContentEngine = ContentEngine;

document.addEventListener("DOMContentLoaded", () => {
    ContentEngine.init();
});
