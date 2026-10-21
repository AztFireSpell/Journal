gsap.registerPlugin(
    ScrollTrigger,
    ScrollToPlugin
);


/* ==========================================================
   GLOBAL
========================================================== */

const sections =
    document.querySelectorAll("section[id]");


const navLinks =
    document.querySelectorAll(
        ".navigation a"
    );


/* ==========================================================
   HERO
========================================================== */

const heroTimeline =
    gsap.timeline();


heroTimeline

    .from(".terminal-label", {

        opacity: 0,

        y: 20,

        duration: .8

    })

    .from(".hero h1", {

        opacity: 0,

        y: 50,

        duration: 1.2,

        ease: "power4.out"

    }, "-=.4")

    .from(".hero-description", {

        opacity: 0,

        y: 20,

        duration: .8

    }, "-=.6")

    .from(".hero-actions", {

        opacity: 0,

        y: 20,

        duration: .8

    }, "-=.5")

    .from(".hero-system", {

        opacity: 0,

        x: 100,

        rotateY: 20,

        duration: 1.2,

        ease: "power4.out"

    }, "-=.8");


/* ==========================================================
   HERO PARALLAX
========================================================== */

gsap.to(".hero-content", {

    yPercent: -20,

    opacity: .2,

    scrollTrigger: {

        trigger: "#home",

        start: "top top",

        end: "bottom top",

        scrub: true

    }

});


gsap.to(".hero-system", {

    yPercent: 25,

    rotateY: -2,

    scrollTrigger: {

        trigger: "#home",

        start: "top top",

        end: "bottom top",

        scrub: true

    }

});


/* ==========================================================
   FLOATING SYSTEM WINDOW
========================================================== */

gsap.to(".system-window", {

    y: -12,

    duration: 3,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut"

});


/* ==========================================================
   SYSTEMS
========================================================== */

const systemsTimeline =
    gsap.timeline({

        scrollTrigger: {

            trigger: "#systems",

            start: "top 70%",

            end: "bottom 60%",

            toggleActions:
                "play none none reverse"

        }

    });


systemsTimeline

    .from(
        "#systems .section-heading",
        {

            opacity: 0,

            y: 50,

            duration: .8,

            ease: "power3.out"

        }
    )

    .from(
        ".sketch-container",
        {

            opacity: 0,

            scale: .94,

            duration: .8

        },
        "-=.4"
    )

    .from(
        ".sketch-node",
        {

            opacity: 0,

            scale: .7,

            transformOrigin: "center",

            stagger: .2,

            duration: .5,

            ease: "back.out(1.7)"

        }
    );


/* ==========================================================
   DRAW SVG LINES
========================================================== */

const sketchLines =
    document.querySelectorAll(
        ".sketch-line"
    );


sketchLines.forEach(line => {

    const length =
        line.getTotalLength();

    gsap.set(line, {

        strokeDasharray:
            length,

        strokeDashoffset:
            length

    });

});


sketchLines.forEach(
    (line, index) => {

        gsap.to(line, {

            strokeDashoffset: 0,

            duration: 1,

            ease: "power2.inOut",

            scrollTrigger: {

                trigger: "#systems",

                start:
                    `${20 + index * 8}% 65%`,

                toggleActions:
                    "play none none reverse"

            }

        });

    }
);


/* ==========================================================
   SYSTEM TEXT
========================================================== */

gsap.from(
    ".sketch-text, .sketch-question",
    {

        opacity: 0,

        duration: .6,

        stagger: .15,

        scrollTrigger: {

            trigger: "#systems",

            start: "top 45%",

            toggleActions:
                "play none none reverse"

        }

    }
);


/* ==========================================================
   SYSTEM COPY
========================================================== */

gsap.from(
    ".systems-copy",
    {

        opacity: 0,

        x: 60,

        duration: 1,

        ease: "power3.out",

        scrollTrigger: {

            trigger: "#systems",

            start: "top 55%",

            toggleActions:
                "play none none reverse"

        }

    }
);


/* ==========================================================
   SYSTEM PARALLAX
========================================================== */

gsap.to(
    ".sketch-container",
    {

        yPercent: -8,

        ease: "none",

        scrollTrigger: {

            trigger: "#systems",

            start: "top bottom",

            end: "bottom top",

            scrub: true

        }

    }
);


/* ==========================================================
   DATA
========================================================== */

const dataTimeline =
    gsap.timeline({

        scrollTrigger: {

            trigger: "#data",

            start: "top 65%",

            toggleActions:
                "play none none reverse"

        }

    });


dataTimeline

    .from(
        "#data .section-heading",
        {

            opacity: 0,

            y: 50,

            duration: .8

        }
    )

    .from(
        ".prototype-terminal",
        {

            opacity: 0,

            x: -80,

            duration: 1,

            ease: "power3.out"

        },
        "-=.4"
    )

    .from(
        ".pipeline",
        {

            opacity: 0,

            scale: .9,

            duration: 1

        },
        "-=.7"
    )

    .from(
        ".pipeline-node",
        {

            opacity: 0,

            y: 30,

            stagger: .15,

            duration: .5

        },
        "-=.5"
    )

    .from(
        ".prototype-code",
        {

            opacity: 0,

            y: 40,

            duration: .8

        },
        "-=.5"
    );


/* ==========================================================
   DATA COUNTERS
========================================================== */

document
    .querySelectorAll(".counter")
    .forEach(counter => {

        const target =
            Number(
                counter.dataset.target
            );


        const object = {
            value: 0
        };


        gsap.to(object, {

            value: target,

            duration: 2,

            ease: "power2.out",

            scrollTrigger: {

                trigger: counter,

                start: "top 85%",

                once: true

            },

            onUpdate: () => {

                counter.textContent =
                    Math.floor(
                        object.value
                    ).toLocaleString();

            }

        });

    });


/* ==========================================================
   DATA FLOW
========================================================== */

function createDataFlow(
    top,
    delay
) {

    const line =
        document.createElement(
            "div"
        );


    line.className =
        "data-flow";


    line.style.top =
        `${top}%`;


    document
        .querySelector(".data-section")
        .appendChild(line);


    gsap.to(line, {

        scaleX: 1,

        duration: 1.4,

        delay,

        ease: "power3.inOut",

        scrollTrigger: {

            trigger: "#data",

            start: "top 60%",

            toggleActions:
                "play none none reverse"

        }

    });

}


createDataFlow(35, 0);
createDataFlow(50, .3);
createDataFlow(65, .6);


/* ==========================================================
   PIPELINE PULSE
========================================================== */

gsap.to(
    ".pipeline-node.active",
    {

        boxShadow:
            "0 0 40px rgba(140,255,193,.25)",

        duration: 1.5,

        repeat: -1,

        yoyo: true,

        ease: "sine.inOut"

    }
);


/* ==========================================================
   LAB
========================================================== */

const labTimeline =
    gsap.timeline({

        scrollTrigger: {

            trigger: "#lab",

            start: "top 65%",

            toggleActions:
                "play none none reverse"

        }

    });


labTimeline

    .from(
        "#lab .section-heading",
        {

            opacity: 0,

            y: 50,

            duration: .8

        }
    )

    .from(
        ".lab-intro",
        {

            opacity: 0,

            x: -30,

            duration: .7

        },
        "-=.4"
    )

    .from(
        ".experiment-card",
        {

            opacity: 0,

            y: 80,

            rotateX: 10,

            stagger: .25,

            duration: 1,

            ease: "power4.out"

        },
        "-=.3"
    );


/* ==========================================================
   EXPERIMENT CARD TILT
========================================================== */

document
    .querySelectorAll(".experiment-card")
    .forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateY =
                    ((x / rect.width) - .5)
                    * 8;


                const rotateX =
                    -(
                        (y / rect.height) - .5
                    )
                    * 8;


                gsap.to(card, {

                    rotateX,

                    rotateY,

                    duration: .3,

                    ease: "power2.out"

                });

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                gsap.to(card, {

                    rotateX: 0,

                    rotateY: 0,

                    duration: .5,

                    ease: "power3.out"

                });

            }
        );

    });


/* ==========================================================
   JOURNAL
========================================================== */

gsap.from(
    ".journal-entry",
    {

        opacity: 0,

        x: 60,

        stagger: .35,

        duration: 1,

        ease: "power3.out",

        scrollTrigger: {

            trigger: "#journal",

            start: "top 70%",

            toggleActions:
                "play none none reverse"

        }

    }
);


/* ==========================================================
   JOURNAL LINE
========================================================== */

gsap.from(
    ".journal-line",
    {

        scaleY: 0,

        transformOrigin: "top",

        duration: 1.5,

        ease: "power3.inOut",

        scrollTrigger: {

            trigger: "#journal",

            start: "top 70%",

            end: "bottom 70%",

            scrub: true

        }

    }
);


/* ==========================================================
   NAVIGATION
========================================================== */

sections.forEach(section => {

    ScrollTrigger.create({

        trigger: section,

        start: "top 45%",

        end: "bottom 45%",

        onEnter: () =>
            setActiveNavigation(
                section.id
            ),

        onEnterBack: () =>
            setActiveNavigation(
                section.id
            )

    });

});


function setActiveNavigation(id) {

    navLinks.forEach(link => {

        link.classList.toggle(

            "active",

            link.getAttribute(
                "href"
            ) === `#${id}`

        );

    });


    document
        .querySelectorAll(
            ".scroll-marker span"
        )
        .forEach(dot => {

            dot.classList.toggle(

                "active",

                dot.dataset.section === id

            );

        });

}


/* ==========================================================
   NAVIGATION CLICK
========================================================== */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const target =
                    document.querySelector(
                        link.getAttribute("href")
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                gsap.to(window, {

                    duration: 1.2,

                    scrollTo: {

                        y: target,

                        offsetY: 0

                    },

                    ease: "power4.inOut"

                });

            }
        );

    });


/* ==========================================================
   SCROLL PROGRESS
========================================================== */

gsap.to(
    ".scroll-progress span",
    {

        width: "100%",

        ease: "none",

        scrollTrigger: {

            start: 0,

            end: "max",

            scrub: .2

        }

    }
);


/* ==========================================================
   MOUSE GLOW
========================================================== */

const glow =
    document.createElement("div");


glow.className =
    "mouse-glow";


document.body.appendChild(
    glow
);


gsap.set(glow, {

    xPercent: -50,

    yPercent: -50

});


document.addEventListener(
    "mousemove",
    event => {

        gsap.to(glow, {

            x: event.clientX,

            y: event.clientY,

            duration: .5,

            ease: "power3.out"

        });

    }
);


/* ==========================================================
   CONSOLE
========================================================== */

console.log(
    "%cALONSO — DATA & SYSTEMS",
    `
    color:#8cffc1;
    font-family:monospace;
    font-size:18px;
    font-weight:bold;
    `
);

console.log(
    "%cYou found the developer console.",
    `
    color:#e7efeb;
    font-family:monospace;
    font-size:13px;
    `
);

console.log(
    "%cThere are probably things here you haven't discovered yet.",
    `
    color:#77817d;
    font-family:monospace;
    font-size:12px;
    `
);
