---
title: "Core Cryptography Library (ZKP & MPC Infrastructure)"
startDate: "2022-01-01"
endDate: "2026-02-01"
description: "Implemented advanced Zero-Knowledge Proof (ZKP) systems, including Bulletproofs (Range Proofs and Inner Product Proofs) and cryptographic accumulators, leveraging the Fiat-Shamir heuristic for efficient, non-interactive verification."
repo: "https://github.com/sonr-io/crypto"
tags: ["Go", "Security Testing", "Quantum Computing", "Cryptography"]
experiences: ["sonr"]
---

- Implemented advanced Zero-Knowledge Proof (ZKP) systems, including Bulletproofs (Range Proofs and Inner Product Proofs) and cryptographic accumulators, leveraging the Fiat-Shamir heuristic for efficient, non-interactive verification.
- Designed Multi-Party Computation (MPC) and Distributed Key Generation (DKG) protocols, enabling decentralized infrastructure through Threshold ECDSA/Ed25519, FROST, and Gennaro signature schemes without single points of failure.
- Engineered highly secure, constant-time elliptic curve arithmetic across multiple standards (secp256k1, Ed25519, BLS12-381, NIST P-Curves), strictly enforcing safeguards against side-channel timing attacks, signature malleability, and nonce reuse.
- Hardened system security by integrating AES-GCM authenticated encryption and Argon2id memory-hard key derivation, backed by an exhaustive suite of automated security tests, race-condition checks, and performance benchmarks.
