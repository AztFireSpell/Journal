# Sistema de gestión para Moodle

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

1. **Capa de Conexión y API:** Cliente HTTP con manejo de reintentos exponenciales contra los endpoints REST de Moodle (`core_user_create_users`, `enrol_manual_enrol_users`, etc.).
2. **Base de Datos Local (SQLite / Cache):** Registra el estado de las cargas, hashes de archivos procesados y logs de auditoría para evitar duplicación de tareas ante caídas de red.
3. **Mecanismo de Ingesta:** Validador de esquemas con `pydantic` o expresiones regulares para asegurar la integridad de los datos antes de emitir solicitudes a Moodle.
4. **CLI interactivo:** Interfaz por consola sencilla para operadores no técnicos.

```python
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
```

## Resultados y Aprendizajes

- **Eficiencia:** Tareas que antes tomaban 4 a 6 horas manuales al inicio de cada ciclo escolar ahora se completan en menos de 5 minutos.
- **Trazabilidad:** Cada acción ejecutada genera un registro detallado en SQLite con marca de tiempo, usuario responsable y respuesta del servidor.
- **Resiliencia:** En caso de fallas de red a mitad de una carga masiva, el sistema reanuda automáticamente solo las operaciones pendientes gracias a la persistencia local.
