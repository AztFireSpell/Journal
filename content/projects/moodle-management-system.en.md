# Moodle Management System

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

1. **API Client Layer:** Resilient HTTP wrapper with exponential backoff handling Moodle REST functions (`core_user_create_users`, `enrol_manual_enrol_users`, etc.).
2. **Local Persistence (SQLite):** Tracks batch job states, incoming file checksums, and execution audit trails to prevent duplicate execution during network hiccups.
3. **Ingestion & Validation Pipeline:** Strict schema validation to ensure clean data before dispatching network payloads.
4. **Interactive CLI:** Frictionless command-line utility for team operators.

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

## Results & Takeaways

- **Efficiency:** Routine onboarding batches that previously took 4–6 hours of manual clicking are completed in under 5 minutes.
- **Auditability:** Every transaction is logged locally with timestamps, status codes, and user IDs.
- **Idempotency:** Batch operations can be retried safely without creating duplicate users or courses.
