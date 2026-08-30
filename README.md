# Dockerfile Best Practices

Small, production-oriented container build examples for Go, Python and Node.js.

All examples use multi-stage builds, pinned major runtime versions, non-root users, minimal runtime layers, deterministic dependency installation and health checks where appropriate.

```bash
docker build -f python/Dockerfile python/
docker build -f go/Dockerfile go/
docker build -f node/Dockerfile node/
```
