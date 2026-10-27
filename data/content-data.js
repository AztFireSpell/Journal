window.JOURNAL_CONTENT = {
    "content": [
        {
            "id": "exp-001",
            "type": "experiment",
            "category": "LAB",
            "title": {
                "es": "Detección de fraude con Transformers",
                "en": "Fraud Detection with Transformers"
            },
            "description": {
                "es": "Explorando si los patrones temporales pueden mejorar la detección de fraude financiero.",
                "en": "Exploring whether temporal patterns can improve financial fraud detection."
            },
            "date": "2026-08-19",
            "image": "",
            "slug": "fraud-detection-transformers",
            "tags": [
                "Python",
                "Machine Learning",
                "Transformers",
                "Data Science"
            ],
            "status": "complete",
            "featured": true,
            "path": {
                "es": "content/lab/fraud-detection-transformers.es.md",
                "en": "content/lab/fraud-detection-transformers.en.md"
            },
            "markdown": {
                "es": `# Detección de fraude con Transformers

> EXP-001 · LAB · 19 AGO 2026

## La pregunta

¿Puede un modelo que considere la secuencia temporal de las transacciones detectar patrones de fraude que un modelo tradicional podría pasar por alto?

## Hipótesis

Las transacciones financieras no son eventos completamente independientes. Una operación individual (por ejemplo, una transferencia de monto inusual) puede cobrar sentido sospechoso cuando se analiza en conjunto con las transacciones que ocurrieron inmediatamente antes (un cambio reciente de contraseña, múltiples consultas de saldo o transferencias pequeñas consecutivas).

Por ello, decidí experimentar estructurando los datos como secuencias temporales y alimentándolos a una arquitectura basada en Transformers.

## Dataset y Preprocesamiento

Para este experimento utilicé el dataset sintético **PaySim**, el cual simula transacciones móviles de dinero basadas en registros financieros reales.

El preprocesamiento implicó:
1. Agrupar las transacciones por cuenta de origen (\`nameOrig\`).
2. Ordenar cronológicamente por paso de tiempo (\`step\`).
3. Crear ventanas deslizantes de longitud $N=5$.

\`\`\`python
sequence_length = 5
features = 9

def build_sequences(user_df, seq_len=5):
    records = user_df[feature_cols].values
    sequences = []
    for i in range(len(records) - seq_len + 1):
        sequences.append(records[i:i + seq_len])
    return np.array(sequences)
\`\`\`

## Arquitectura

El modelo consta de:
- **Capa de Proyección Linear:** proyecta las 9 características a una dimensión latente $d_{model}=64$.
- **Positional Encoding:** para retener el orden relativo de los eventos.
- **Transformer Encoder (2 capas):** Multi-Head Attention con 4 cabezales y Dropout del 0.1.
- **Global Average Pooling 1D:** condensando la secuencia en un vector representativo.
- **Clasificador Final:** Capa densa con activación sigmoide para predecir la probabilidad de fraude.

## Resultados

Al evaluar sobre el conjunto de prueba balanceado con submuestreo de la clase mayoritaria:

| Métrica | Valor |
| :--- | :--- |
| **ROC-AUC** | **0.993** |
| **Recall (Fraude)** | **0.897** |
| **Precision** | **0.644** |

## Conclusiones

Modelar la temporalidad permitió capturar fraudes sutiles que modelos de árboles tabulares (como XGBoost evaluando transacciones aisladas) clasificaban como falsos negativos. La principal limitación sigue siendo el costo computacional de inferencia en tiempo real sobre millones de transacciones por segundo.
`,
                "en": `# Fraud Detection with Transformers

> EXP-001 · LAB · AUG 19, 2026

## The Question

Can a model that considers the temporal sequence of transactions detect fraud patterns that traditional tabular models might overlook?

## Hypothesis

Financial transactions are rarely completely independent events. An isolated operation (such as an unusual transfer amount) often looks suspicious only when evaluated alongside what happened immediately beforehand (e.g., recent password change, repeated balance checks, or tiny consecutive probe transfers).

To test this, I experimented with structuring the transaction log as temporal sequences and training a lightweight Transformer Encoder.

## Dataset & Preprocessing

For this experiment, I utilized the synthetic **PaySim** dataset, which simulates mobile financial money transfers based on real-world logs.

Key preprocessing steps:
1. Group transactions by originating account (\`nameOrig\`).
2. Sort chronologically by step (\`step\`).
3. Generate rolling time windows of length $N=5$.

\`\`\`python
sequence_length = 5
features = 9

def build_sequences(user_df, seq_len=5):
    records = user_df[feature_cols].values
    sequences = []
    for i in range(len(records) - seq_len + 1):
        sequences.append(records[i:i + seq_len])
    return np.array(sequences)
\`\`\`

## Architecture

The model architecture includes:
- **Linear Projection Layer:** Projects the 9 input features to a latent dimension $d_{model}=64$.
- **Positional Encoding:** Retains the sequential order of transactions.
- **Transformer Encoder (2 layers):** Multi-Head Attention with 4 heads and 0.1 dropout.
- **Global Average Pooling 1D:** Condenses the sequence into a fixed-length representation.
- **Final Classification Head:** Dense sigmoid layer outputting fraud probability.

## Results

Evaluation on a balanced test set with undersampling of legitimate transactions yielded:

| Metric | Score |
| :--- | :--- |
| **ROC-AUC** | **0.993** |
| **Recall (Fraud)** | **0.897** |
| **Precision** | **0.644** |

## Takeaways

Capturing temporal context significantly reduced false negatives compared to isolated tabular trees (like XGBoost without historical window aggregations). The main trade-off remains inference latency when scaling to high-throughput real-time streaming architectures.
`
            }
        },
        {
            "id": "journal-001",
            "type": "journal",
            "category": "JOURNAL",
            "title": {
                "es": "Construyendo mi laboratorio digital",
                "en": "Building my digital laboratory"
            },
            "description": {
                "es": "Por qué decidí convertir mi portafolio en un espacio para experimentar y documentar.",
                "en": "Why I decided to turn my portfolio into a place to experiment and document."
            },
            "date": "2026-08-18",
            "image": "",
            "slug": "construyendo-mi-laboratorio",
            "tags": [
                "Journal",
                "Web",
                "Personal"
            ],
            "status": "complete",
            "featured": true,
            "path": {
                "es": "content/journal/construyendo-mi-laboratorio.es.md",
                "en": "content/journal/construyendo-mi-laboratorio.en.md"
            },
            "markdown": {
                "es": `# Construyendo mi laboratorio digital

> JOURNAL-001 · DIARIO · 18 AGO 2026

## ¿Por qué un laboratorio y no otro portafolio?

Durante mucho tiempo pensé en el portafolio típico: una lista estática de proyectos impecablemente terminados, capturas de pantalla perfectas y descripciones resumidas en tres viñetas.

Pero la realidad de la ingeniería de software y la ciencia de datos nunca se ve así.

La mayor parte del trabajo valioso ocurre en los márgenes:
- En las hipótesis que resultaron ser falsas.
- En los scripts de depuración a las 2:00 a.m.
- En la comprensión íntima de por qué un sistema falla bajo carga.
- En la curiosidad constante por desarmar una tecnología para ver cómo funciona por dentro.

Un **journal / laboratorio** es un compromiso con el proceso, no solo con el resultado final.

## El valor del soporte técnico y los sistemas

Antes de profundizar en modelos de Machine Learning y arquitecturas distribuidas, pasé años trabajando en soporte técnico, infraestructura y administración de sistemas.

Muchas personas ven el soporte técnico como un escalón inicial del que hay que salir rápido. Para mí fue la mejor escuela de pensamiento sistémico:
1. **La realidad no miente:** Si el log dice que falló la conexión al socket, no importa qué tan elegante sea tu algoritmo.
2. **Los datos nacen sucios:** Los sistemas reales lidian con entradas corruptas, desconexiones y casos extremos que ningún tutorial contempla.
3. **Optimizar a ciegas es inútil:** Antes de tocar una sola línea de optimización, debes tener visibilidad e instrumentación confiable.

## Los pilares de este espacio

He estructurado este espacio alrededor de cuatro ejes fundamentales:

1. **Systems:** Comprender la fontanería digital — Linux, redes, bases de datos, APIs y fiabilidad.
2. **Data:** Tomar el flujo caótico de información y transformarlo en estructuras analizables y accionables.
3. **Lab:** Experimentos rápidos, hipótesis cuantificables y pruebas de concepto.
4. **Journal:** Reflexiones técnicas y lecciones aprendidas durante el camino.

## El stack: Simpleza intencional

Decidí construir este sitio intencionalmente sin frameworks pesados ni herramientas complejas de compilación: **HTML semántico, CSS puro y JavaScript moderno**.

El contenido se almacena en Markdown, lo que me permite escribir con la misma facilidad con la que tomo notas en mi terminal. Un simple motor en JavaScript compila y presenta las entradas al vuelo.

Menos dependencias significa menos fricción para publicar y experimentar.
`,
                "en": `# Building My Digital Laboratory

> JOURNAL-001 · JOURNAL · AUG 18, 2026

## Why a laboratory instead of another portfolio?

For a long time, I considered the traditional developer portfolio: a static grid of polished project screenshots, brief bullet-point summaries, and clean metrics.

Yet the reality of software engineering and data science rarely looks like that.

Most of the real breakthroughs occur along the edges:
- In hypotheses that turned out to be completely wrong.
- In 2:00 AM debugging scripts.
- In intimately understanding why a system breaks under strain.
- In the persistent itch to tear apart a technology just to see how its gears turn.

A **journal / laboratory** represents a commitment to the process, not just the final trophy.

## The foundation: Technical support and systems

Before diving deep into machine learning models and distributed data pipelines, I spent years working in IT support, infrastructure, and systems administration.

Some consider support a stepping stone to leave behind as quickly as possible. To me, it was the ultimate masterclass in systems thinking:
1. **Reality never lies:** If a socket connection error is logged, it doesn't matter how elegant your theoretical code was.
2. **Data always starts dirty:** Real-world systems deal with corrupted inputs, unexpected dropouts, and edge cases absent from textbooks.
3. **Never optimize blind:** Before writing a single line of optimization, you must have transparent telemetry and instrumentation.

## The pillars of this space

I've structured this platform around four core areas:

1. **Systems:** Understanding digital plumbing — Linux, networks, databases, APIs, and reliability.
2. **Data:** Transforming chaotic streams into clean, interpretable, and actionable information.
3. **Lab:** Rapid experiments, quantifiable hypotheses, and working prototypes.
4. **Journal:** Technical reflections and architectural lessons learned along the way.

## The stack: Intentional simplicity

I chose to build this site without heavy frameworks or build pipelines: **Semantic HTML, clean CSS, and modern vanilla JavaScript**.

Articles live in Markdown files, allowing me to draft entries as fluidly as taking notes in a terminal. A lightweight client-side engine renders them on demand.

Fewer dependencies mean less friction to build, learn, and experiment.
`
            }
        },
        {
            "id": "project-001",
            "type": "project",
            "category": "PROJECT",
            "title": {
                "es": "Sistema de gestión para Moodle",
                "en": "Moodle Management System"
            },
            "description": {
                "es": "Sistema para automatizar procesos relacionados con usuarios, cursos y cargas de información.",
                "en": "A system for automating processes related to users, courses and data uploads."
            },
            "date": "2026-08-10",
            "image": "",
            "slug": "moodle-management-system",
            "tags": [
                "Python",
                "SQLite",
                "Moodle",
                "Automation"
            ],
            "status": "complete",
            "featured": true,
            "path": {
                "es": "content/projects/moodle-management-system.es.md",
                "en": "content/projects/moodle-management-system.en.md"
            },
            "markdown": {
                "es": `# Sistema de gestión para Moodle

> PROJECT-001 · PROYECTO · 10 AGO 2026

## Contexto y Desafío

En entornos educativos y corporativos con cientos o miles de usuarios activos, la administración de una plataforma LMS como Moodle a través de su interfaz web puede volverse repetitiva, lenta y propensa a errores humanos:

- Creación masiva y matriculación de usuarios por periodos académicos.
- Generación y sincronización de reportes de finalización de cursos.
- Auditoría de logs de actividad e inactividad.
- Copias de seguridad automáticas y depuración periódica.

El objetivo fue desarrollar una suite de automatización en Python que se comunique directamente con las APIs de Moodle y la base de datos subyacente para reducir los tiempos operativos en un 80%.

## Arquitectura de la Solución

El sistema se diseñó con un enfoque modular y resiliente:

1. **Capa de Conexión y API:** Cliente HTTP con manejo de reintentos exponenciales contra los endpoints REST de Moodle (\`core_user_create_users\`, \`enrol_manual_enrol_users\`, etc.).
2. **Base de Datos Local (SQLite / Cache):** Registra el estado de las cargas, hashes de archivos procesados y logs de auditoría para evitar duplicación de tareas ante caídas de red.
3. **Mecanismo de Ingesta:** Validador de esquemas con \`pydantic\` o expresiones regulares para asegurar la integridad de los datos antes de emitir solicitudes a Moodle.
4. **CLI interactivo:** Interfaz por consola sencilla para operadores no técnicos.

\`\`\`python
import sqlite3
import requests

class MoodleClient:
    def __init__(self, endpoint: str, token: str):
        self.endpoint = endpoint
        self.token = token

    def call_function(self, wsfunction: str, params: dict):
        payload = {
            "wstoken": self.token,
            "wsfunction": wsfunction,
            "moodlewsrestformat": "json",
            **params
        }
        response = requests.post(self.endpoint, data=payload, timeout=15)
        response.raise_for_status()
        return response.json()
\`\`\`

## Resultados y Aprendizajes

- **Eficiencia:** Tareas que antes tomaban 4 a 6 horas manuales al inicio de cada ciclo escolar ahora se completan en menos de 5 minutos.
- **Trazabilidad:** Cada acción ejecutada genera un registro detallado en SQLite con marca de tiempo, usuario responsable y respuesta del servidor.
- **Resiliencia:** En caso de fallas de red a mitad de una carga masiva, el sistema reanuda automáticamente solo las operaciones pendientes gracias a la persistencia local.
`,
                "en": `# Moodle Management System

> PROJECT-001 · PROJECT · AUG 10, 2026

## Context & Challenge

In educational and corporate environments with hundreds or thousands of active learners, managing a Learning Management System (LMS) like Moodle solely through its web GUI quickly turns into a tedious, slow, and error-prone bottleneck:

- Bulk user onboarding and cohort enrollments each term.
- Course completion tracking and custom report generation.
- Activity audit logging and dormancy monitoring.
- Automated course archiving and scheduled backups.

The goal of this project was to design and implement a Python automation toolkit interfacing directly with Moodle's REST web services and an auxiliary local database, slashing manual administrative overhead by over 80%.

## Architecture

The system was structured for modularity and fault tolerance:

1. **API Client Layer:** Resilient HTTP wrapper with exponential backoff handling Moodle REST functions (\`core_user_create_users\`, \`enrol_manual_enrol_users\`, etc.).
2. **Local Persistence (SQLite):** Tracks batch job states, incoming file checksums, and execution audit trails to prevent duplicate execution during network hiccups.
3. **Ingestion & Validation Pipeline:** Strict schema validation to ensure clean data before dispatching network payloads.
4. **Interactive CLI:** Frictionless command-line utility for team operators.

\`\`\`python
import sqlite3
import requests

class MoodleClient:
    def __init__(self, endpoint: str, token: str):
        self.endpoint = endpoint
        self.token = token

    def call_function(self, wsfunction: str, params: dict):
        payload = {
            "wstoken": self.token,
            "wsfunction": wsfunction,
            "moodlewsrestformat": "json",
            **params
        }
        response = requests.post(self.endpoint, data=payload, timeout=15)
        response.raise_for_status()
        return response.json()
\`\`\`

## Results & Takeaways

- **Efficiency:** Routine onboarding batches that previously took 4–6 hours of manual clicking are completed in under 5 minutes.
- **Auditability:** Every transaction is logged locally with timestamps, status codes, and user IDs.
- **Idempotency:** Batch operations can be retried safely without creating duplicate users or courses.
`
            }
        }
    ]
};
