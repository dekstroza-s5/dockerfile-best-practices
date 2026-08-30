# Dockerfile Best Practices

Production-oriented container build examples for Go, Python and Node.js. The examples are intentionally small so image construction and runtime security choices are easy to inspect.

## Comparison

| Example | Build strategy | Runtime user | Runtime base |
|---|---|---|---|
| Go | compiled multi-stage | nonroot | distroless |
| Python | wheel builder | UID 10001 | python slim |
| Node.js | dependency stage | app | node alpine |

## Build

Each directory is a template and expects a minimal application plus its standard dependency files.

```bash
docker build -f python/Dockerfile -t example-python:local python/
docker build -f go/Dockerfile -t example-go:local go/
docker build -f node/Dockerfile -t example-node:local node/
```

## Inspect

```bash
docker image ls
docker history example-python:local
docker inspect example-python:local --format '{{.Config.User}}'
docker run --rm example-python:local id
```

Expected result: the runtime user is not root and build tooling is absent from the final image.

## Principles demonstrated

- deterministic dependency installation;
- build and runtime stages separated;
- only necessary artifacts copied;
- non-root execution;
- smaller, maintained base images;
- no credentials passed through build arguments;
- application logs sent to stdout/stderr.

## CI validation

The GitHub workflow runs Hadolint recursively. A production pipeline should also build every example, scan OS and language dependencies, generate an SBOM and sign released images.

## Troubleshooting

- Go build cannot find `go.sum`: commit dependency metadata after `go mod tidy`.
- Python wheel fails: check compiler requirements and consider a dedicated build image.
- Node native dependency fails on Alpine: use a Debian-based runtime when musl is unsupported.
- container cannot write files: mount a writable volume rather than making the entire filesystem writable.
- large image: inspect `docker history`, build context and cache files.

Image tags in application pipelines should be immutable commit or release identifiers rather than `latest`.
