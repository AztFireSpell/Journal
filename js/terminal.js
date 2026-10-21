const cliInterface =
    document.getElementById("cli-interface");

const cliTrigger =
    document.getElementById("cli-trigger");

const heroCli =
    document.getElementById("hero-cli");

const closeCli =
    document.getElementById("close-cli");

const terminalOutput =
    document.getElementById("terminal-output");

const terminalInput =
    document.getElementById("terminal-input");


const commandHistory = [];


/* ==========================================================
   OPEN / CLOSE
========================================================== */

function openTerminal() {

    document.body.classList.add(
        "cli-active"
    );

    cliInterface.classList.add(
        "active"
    );


    gsap.fromTo(
        ".cli-window",

        {
            opacity: 0,
            scale: .96,
            y: 30
        },

        {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: .5,
            ease: "power3.out"
        }
    );


    setTimeout(() => {

        terminalInput.focus();

    }, 500);

}


function closeTerminal() {

    gsap.to(
        ".cli-window",

        {

            opacity: 0,

            scale: 1.02,

            y: -20,

            duration: .3,

            ease: "power2.in",

            onComplete: () => {

                cliInterface.classList.remove(
                    "active"
                );

                document.body.classList.remove(
                    "cli-active"
                );

                terminalInput.value = "";

            }

        }
    );

}


/* ==========================================================
   OUTPUT
========================================================== */

function print(text) {

    const element =
        document.createElement("div");

    element.style.whiteSpace =
        "pre-wrap";

    element.textContent = text;

    terminalOutput.appendChild(
        element
    );

    terminalOutput.scrollTop =
        terminalOutput.scrollHeight;

}


/* ==========================================================
   COMMANDS
========================================================== */

const commands = {


    help() {

        print(`

AVAILABLE COMMANDS

about       → About Alonso
systems     → Engineering & infrastructure
data        → Data science
lab         → Experiments
journal     → Journal
projects    → Projects
contact     → Contact

ls          → List directories
clear       → Clear terminal
history     → Command history
neofetch    → System information

open 001    → Open experiment 001

gui         → Restore graphical interface
exit        → Restore graphical interface

`);

    },


    about() {

        print(`

ALONSO

Software Engineer
Data Scientist
Machine Learning enthusiast

Building systems.
Understanding data.
Exploring what comes next.

`);

    },


    systems() {

        print(`

SYSTEMS

Linux
Backend
Databases
APIs
Infrastructure
Automation
DevOps

`);

    },


    data() {

        print(`

DATA

Python
SQL
Pandas
Statistics
Machine Learning
Artificial Intelligence

`);

    },


    lab() {

        print(`

LAB

[001] Fraud Detection with Transformers
[002] Sentiment Analysis
[003] Monte Carlo Simulation

Use:

open 001

`);

    },


    journal() {

        print(`

JOURNAL

Technical notes
Programming
Data Science
Work experiences
Personal reflections

`);

    },


    projects() {

        print(`

PROJECTS

DATA & SYSTEMS

Moodle automation
Data pipelines
Machine Learning experiments

`);

    },


    contact() {

        print(`

CONTACT

Communication channel
under construction.

`);

    },


    ls() {

        print(`

about/
systems/
data/
lab/
journal/
projects/

`);

    },


    clear() {

        terminalOutput.innerHTML = "";

    },


    history() {

        print(
            commandHistory.length
                ? commandHistory.join("\n")
                : "No commands yet."
        );

    },


    neofetch() {

        print(`

        ALONSO
    DATA & SYSTEMS

OS ............ Curiosity OS
ROLE .......... Engineer / Data Scientist
STACK ......... Python · SQL · Linux
FOCUS ......... Data · ML · Systems
STATUS ........ Learning

`);

    },


    gui() {

        closeTerminal();

    },


    exit() {

        closeTerminal();

    }

};


/* ==========================================================
   SPECIAL COMMANDS
========================================================== */

function executeCommand(
    rawCommand
) {

    const command =
        rawCommand
            .trim()
            .toLowerCase();


    if (!command) {
        return;
    }


    commandHistory.push(
        command
    );


    print(
        `\nalonso@data-systems:~$ ${command}`
    );


    /* Standard command */

    if (
        commands[command]
    ) {

        commands[command]();

        return;

    }


    /* open 001 */

    if (
        command === "open 001"
    ) {

        print(`

Opening EXP-001...

Fraud Detection
with Transformers

ROC-AUC ........ 0.993
Recall ......... 0.897
Precision ...... 0.644

`);

        return;

    }


    /* coffee */

    if (
        command === "coffee"
    ) {

        print(`

☕ Brewing...

████████████████████ 100%

Coffee ready.
Productivity +42

`);

        return;

    }


    /* hire Alonso */

    if (
        command === "sudo hire alonso"
    ) {

        print(`

sudo: permission granted

✓ Resume found
✓ Experience found
✓ Curiosity found

Opening contact...

`);

        return;

    }


    /* rm */

    if (
        command === "sudo rm -rf /"
    ) {

        print(`

Nice try.

This system is protected.

I appreciate the confidence.

`);

        return;

    }


    /* matrix */

    if (
        command === "matrix"
    ) {

        print(`

Wake up, Alonso...

The Matrix is not real.

But this website is.

`);

        return;

    }


    /* Unknown */

    print(`

Command not found:

${command}

Type 'help' to see
available commands.

`);

}


/* ==========================================================
   INPUT
========================================================== */

terminalInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Enter"
        ) {
            return;
        }


        executeCommand(
            terminalInput.value
        );


        terminalInput.value = "";

    }
);


/* ==========================================================
   BUTTONS
========================================================== */

cliTrigger.addEventListener(
    "click",
    openTerminal
);


heroCli.addEventListener(
    "click",
    openTerminal
);


closeCli.addEventListener(
    "click",
    closeTerminal
);


/* ==========================================================
   ESC
========================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            cliInterface.classList.contains(
                "active"
            )
        ) {

            closeTerminal();

        }

    }
);