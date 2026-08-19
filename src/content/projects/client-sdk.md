---
title: "Client SDK & Motr Cryptographic Enclave"
startDate: "2022-06-01"
endDate: "2023-08-01"
description: "Architected \"Motr,\" a WebAssembly (WASM) cryptographic enclave compiled from Go, designed to run entirely in client-side Web Workers. This sandboxed environment securely handles Multi-Party Computation (MPC), data signing, and UCAN token generation without ever exposing private keys to the main application thread."
link: "https://pub.dev/packages/motor_flutter"
tags: ["API Design", "React.js", "Flutter", "WebAuthn", "Cryptography", "WebAssembly (WASM)", "TypeScript", "Developer Relations"]
experiences: ["sonr"]
---

- Architected "Motr," a WebAssembly (WASM) cryptographic enclave compiled from Go, designed to run entirely in client-side Web Workers. This sandboxed environment securely handles Multi-Party Computation (MPC), data signing, and UCAN token generation without ever exposing private keys to the main application thread.
- Built an edge-native orchestration layer using Cloudflare Workers, utilizing Durable Objects, KV namespaces, and Service Bindings to manage persistent cross-platform sessions, smart routing, and state synchronization across the decentralized network.
- Pioneered a "Web2-to-Web3" authentication bridge by integrating WebAuthn (Passkeys/Biometrics) and standard OAuth 2.0 flows directly into the SDK, allowing developers to offer passwordless, seed-phrase-free onboarding to their users.
- Implemented account-isolated client persistence leveraging Dexie.js (IndexedDB) to create a robust offline caching layer for cryptographic states, delegated capabilities, and decentralized web node (DWN) records.
