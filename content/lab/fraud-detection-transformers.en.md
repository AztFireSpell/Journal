# Fraud Detection with Transformers

> EXP-001 · LAB · AUG 19, 2026

## The Question

Can a model that considers the temporal sequence of transactions detect fraud patterns that traditional tabular models might overlook?

## Hypothesis

Financial transactions are rarely completely independent events. An isolated operation (such as an unusual transfer amount) often looks suspicious only when evaluated alongside what happened immediately beforehand (e.g., recent password change, repeated balance checks, or tiny consecutive probe transfers).

To test this, I experimented with structuring the transaction log as temporal sequences and training a lightweight Transformer Encoder.

## Dataset & Preprocessing

For this experiment, I utilized the synthetic **PaySim** dataset, which simulates mobile financial money transfers based on real-world logs.

Key preprocessing steps:
1. Group transactions by originating account (`nameOrig`).
2. Sort chronologically by step (`step`).
3. Generate rolling time windows of length $N=5$.

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
