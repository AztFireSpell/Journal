# Detección de fraude con Transformers

> EXP-001 · LAB · 19 AGO 2026

## La pregunta

¿Puede un modelo que considere la secuencia temporal de las transacciones detectar patrones de fraude que un modelo tradicional podría pasar por alto?

## Hipótesis

Las transacciones financieras no son eventos completamente independientes. Una operación individual (por ejemplo, una transferencia de monto inusual) puede cobrar sentido sospechoso cuando se analiza en conjunto con las transacciones que ocurrieron inmediatamente antes (un cambio reciente de contraseña, múltiples consultas de saldo o transferencias pequeñas consecutivas).

Por ello, decidí experimentar estructurando los datos como secuencias temporales y alimentándolos a una arquitectura basada en Transformers.

## Dataset y Preprocesamiento

Para este experimento utilicé el dataset sintético **PaySim**, el cual simula transacciones móviles de dinero basadas en registros financieros reales.

El preprocesamiento implicó:
1. Agrupar las transacciones por cuenta de origen (`nameOrig`).
2. Ordenar cronológicamente por paso de tiempo (`step`).
3. Crear ventanas deslizantes de longitud $N=5$.

```python
sequence_length = 5
features = 9

def build_sequences(user_df, seq_len=5):
    records = user_df[feature_cols].values
    sequences = []
    for i in range(len(records) - seq_len + 1):
        sequences.append(records[i:i + seq_len])
    return np.array(sequences)
```

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
