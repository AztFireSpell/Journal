const ContentEngine = {

    data: null,

    language: localStorage.getItem("language") || "es",

    async init() {

        try {

            const response =
                await fetch("data/content.json");

            this.data =
                await response.json();

            this.renderHome();

            this.renderContentPage();

            this.updateLanguage();

        } catch (error) {

            console.error(
                "CONTENT ENGINE ERROR:",
                error
            );

        }

    },


    get items() {

        return this.data?.content || [];

    },


    getText(value) {

        if (!value) return "";

        if (typeof value === "string") {
            return value;
        }

        return (
            value[this.language] ||
            value.es ||
            value.en ||
            ""
        );

    },


    formatDate(date) {

        const dateObject =
            new Date(date + "T12:00:00");

        return dateObject.toLocaleDateString(
            this.language === "es"
                ? "es-MX"
                : "en-US",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        ).toUpperCase();

    },


    getLatest(limit = 6) {

        return [...this.items]

            .sort(
                (a, b) =>
                    new Date(b.date) -
                    new Date(a.date)
            )

            .slice(0, limit);

    },


    getBySlug(slug) {

        return this.items.find(
            item =>
                item.slug === slug
        );

    },


    renderHome() {

        const container =
            document.querySelector(
                "#latest-content"
            );

        if (!container) return;

        const items =
            this.getLatest(6);

        container.innerHTML =
            items.map(
                item =>
                    this.createCard(item)
            ).join("");

        this.animateCards();

    },


    createCard(item) {

        const title =
            this.getText(item.title);

        const description =
            this.getText(item.description);

        const category =
            item.category;

        const image =
            item.image
                ? `
                    <div class="content-card-image">
                        <img
                            src="${item.image}"
                            alt="${title}"
                            loading="lazy"
                        >
                    </div>
                  `
                : "";


        return `

            <article
                class="content-card"
                data-type="${item.type}"
            >

                ${image}

                <div class="content-card-body">

                    <div class="content-card-meta">

                        <span>
                            ${category}
                        </span>

                        <time>
                            ${this.formatDate(item.date)}
                        </time>

                    </div>


                    <h3>
                        ${title}
                    </h3>


                    <p>
                        ${description}
                    </p>


                    <div class="content-card-tags">

                        ${item.tags
                            .map(
                                tag =>
                                    `<span>${tag}</span>`
                            )
                            .join("")
                        }

                    </div>


                    <a
                        href="article.html?slug=${item.slug}"
                        class="content-card-link"
                    >

                        ${this.language === "es"
                            ? "Explorar experimento →"
                            : "Explore experiment →"
                        }

                    </a>

                </div>

            </article>

        `;

    },


    async renderContentPage() {

        const container =
            document.querySelector(
                "#article-content"
            );

        if (!container) return;


        const params =
            new URLSearchParams(
                window.location.search
            );


        const slug =
            params.get("slug");


        if (!slug) {

            container.innerHTML =
                "<p>Contenido no encontrado.</p>";

            return;

        }


        const item =
            this.getBySlug(slug);


        if (!item) {

            container.innerHTML = `

                <div class="article-error">

                    <span>404</span>

                    <h1>
                        Contenido no encontrado
                    </h1>

                </div>

            `;

            return;

        }


        document.title =
            `${this.getText(item.title)}
            — ALONSO DATA & SYSTEMS`;


        const markdown =
            await this.loadMarkdown(
                item.path
            );


        const html =
            marked.parse(markdown);


        container.innerHTML = `

            <header class="article-header">

                <div class="article-category">

                    ${item.category}

                </div>


                <h1>
                    ${this.getText(item.title)}
                </h1>


                <p class="article-description">

                    ${this.getText(item.description)}

                </p>


                <div class="article-meta">

                    <span>
                        ${this.formatDate(item.date)}
                    </span>

                    <span>
                        STATUS: ${item.status.toUpperCase()}
                    </span>

                </div>


                ${
                    item.image
                    ?
                    `
                    <img
                        class="article-cover"
                        src="${item.image}"
                        alt="${this.getText(item.title)}"
                    >
                    `
                    :
                    ""
                }

            </header>


            <div class="article-body">

                ${html}

            </div>

        `;

    },


    async loadMarkdown(path) {

        const response =
            await fetch(path);

        if (!response.ok) {

            throw new Error(
                `Unable to load ${path}`
            );

        }

        return await response.text();

    },


    setLanguage(language) {

        this.language =
            language;

        localStorage.setItem(
            "language",
            language
        );

        this.updateLanguage();

        this.renderHome();

        this.renderContentPage();

    },


    updateLanguage() {

        document
            .querySelectorAll(
                "[data-i18n]"
            )
            .forEach(element => {

                const key =
                    element.dataset.i18n;

                const translation =
                    I18N[
                        this.language
                    ]?.[key];

                if (translation) {

                    element.textContent =
                        translation;

                }

            });


        document
            .querySelectorAll(
                ".language-button"
            )
            .forEach(button => {

                button.classList.toggle(
                    "active",
                    button.dataset.language ===
                    this.language
                );

            });

    },


    animateCards() {

        if (
            typeof gsap === "undefined"
        ) {
            return;
        }

        gsap.from(
            ".content-card",
            {

                opacity: 0,

                y: 40,

                stagger: .12,

                duration: .7,

                ease: "power3.out"

            }
        );

    }

};


document.addEventListener(
    "DOMContentLoaded",
    () => {

        ContentEngine.init();

    }
);