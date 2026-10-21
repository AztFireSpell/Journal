# Detección de fraude con Transformers

> EXP-001 · LAB · 19 AGO 2026

## La pregunta

¿Puede un modelo que considere la secuencia temporal de las transacciones detectar patrones de fraude que un modelo tradicional podría pasar por alto?

## Hipótesis

Las transacciones financieras no son eventos completamente independientes.

Una operación puede tener relación con las operaciones que ocurrieron inmediatamente antes.

Por eso decidí experimentar con secuencias temporales utilizando un Transformer.

## Dataset

Para este experimento utilicé el dataset PaySim.

El objetivo fue transformar las transacciones individuales en secuencias de longitud 5.

```python
sequence_length = 5
features = 9