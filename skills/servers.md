# Solid Servers — Implementations and Live Instances

Choose, configure, and deploy Solid servers. Covers all major implementations and public pod providers.

## Server Implementations

| Server | Language | License | Status | Repository |
|--------|----------|---------|--------|------------|
| [Community Solid Server (CSS)](https://communitysolidserver.github.io/CommunitySolidServer/) | TypeScript | MIT | Active | [github](https://github.com/CommunitySolidServer/CommunitySolidServer) |
| [JavaScriptSolidServer (JSS)](https://github.com/JavaScriptSolidServer/JavaScriptSolidServer) | JavaScript | AGPL-3.0 | Active | [github](https://github.com/JavaScriptSolidServer/JavaScriptSolidServer) |
| [Node Solid Server (NSS)](https://github.com/nodeSolidServer/node-solid-server) | JavaScript | MIT | Maintenance | [github](https://github.com/nodeSolidServer/node-solid-server) |
| [Pivot](https://github.com/solidcommunity/pivot) | TypeScript | MIT | Active | [github](https://github.com/solidcommunity/pivot) |
| [Pod-As-App (PAA)](https://github.com/pdsinterop/php-solid-server) | PHP | MIT | Active | [github](https://github.com/pdsinterop/php-solid-server) |
| [Enterprise Solid Server (ESS)](https://www.inrupt.com/products/enterprise-solid-server) | Java | Proprietary | Active | Closed source |

## Quick Start

### Community Solid Server (CSS)

```bash
npx @solid/community-server
```

Default: http://localhost:3000

With file-based storage:

```bash
npx @solid/community-server -c @css:config/file.json -f ./data
```

### JavaScriptSolidServer (JSS)

```bash
npx jss --port 5420
```

With all protocols:

```bash
npx jss --port 5420 --single-user-name alice --activitypub --idp
```

JSS supports Solid, remoteStorage, ActivityPub, and Solid-OIDC in a single server.

### Node Solid Server (NSS)

```bash
npx solid-server --port 8443
```

NSS is the original Solid server. Multi-user with WebID-TLS and WebID-OIDC.

### Pivot

Pivot is a community fork of CSS used by solidcommunity.net:

```bash
git clone https://github.com/solidcommunity/pivot
cd pivot
npm install
npm start
```

## Live Instances

Public Solid pod providers where users can create accounts:

| Provider | URL | Server | Registration |
|----------|-----|--------|-------------|
| solidcommunity.net | https://solidcommunity.net | Pivot | Open |
| solidweb.org | https://solidweb.org | NSS | Open |
| solidweb.me | https://solidweb.me | CSS | Open |
| solid.social | https://solid.social | NSS | Open |
| inrupt.net | https://inrupt.net | ESS | Open |
| use.id | https://use.id | ESS | Open |
| teamid.live | https://teamid.live | Pivot | Open |
| trinpod.us | https://trinpod.us | Trinpod | Open |
| redpencil.io | https://solid.redpencil.io | CSS | Open |

## Feature Comparison

| Feature | CSS | JSS | NSS | Pivot | ESS |
|---------|:---:|:---:|:---:|:-----:|:---:|
| LDP Containers | ✓ | ✓ | ✓ | ✓ | ✓ |
| WebACL (WAC) | ✓ | ✓ | ✓ | ✓ | ✗ |
| ACP | ✓ | ✗ | ✗ | ✓ | ✓ |
| Solid-OIDC | ✓ | ✓ | ✗ | ✓ | ✓ |
| WebID-TLS | ✗ | ✗ | ✓ | ✗ | ✗ |
| Content Negotiation | ✓ | ✓ | ✓ | ✓ | ✓ |
| PATCH (N3/SPARQL) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Multi-user | ✓ | ✓ | ✓ | ✓ | ✓ |
| Single-user mode | ✓ | ✓ | ✗ | ✗ | ✗ |
| ActivityPub | ✗ | ✓ | ✗ | ✗ | ✗ |
| remoteStorage | ✗ | ✓ | ✗ | ✗ | ✗ |
| File-based storage | ✓ | ✓ | ✓ | ✓ | ✗ |
| Docker image | ✓ | ✗ | ✓ | ✓ | ✓ |
| npm package | ✓ | ✓ | ✓ | ✗ | ✗ |

## Configuration Patterns

### CSS Configuration

CSS uses JSON configuration files to compose components:

```bash
# Default in-memory
npx @solid/community-server

# File storage
npx @solid/community-server -c @css:config/file.json -f ./data

# File storage + WAC
npx @solid/community-server -c @css:config/file-wac.json -f ./data

# Custom port
npx @solid/community-server -p 4000

# With mashlib data browser
npm install css-mashlib
npx @solid/community-server -c @css:config/file.json -f ./data
```

### JSS Configuration

JSS uses CLI flags:

```bash
# Basic
npx jss --port 5420

# Single-user with identity provider
npx jss --port 5420 --single-user-name alice --idp

# Full multi-protocol
npx jss --port 5420 --single-user-name alice --activitypub --idp

# Custom data directory
npx jss --port 5420 --data ./pods
```

### NSS Configuration

NSS uses a config file or CLI flags:

```bash
# Basic
npx solid-server --port 8443

# With config file
npx solid-server --config ./config.json

# Multi-user
npx solid-server --port 8443 --multiuser
```

## Production Deployment

### With PM2

```bash
npm install -g pm2

# CSS
pm2 start npx --name solid -- @solid/community-server -c @css:config/file.json -f ./data

# JSS
pm2 start npx --name jss -- jss --port 5420 --single-user-name alice --idp
```

### With Docker (CSS)

```bash
docker run --rm -p 3000:3000 -v ./data:/data \
  solidproject/community-server -c @css:config/file.json -f /data
```

### Reverse Proxy (nginx)

```nginx
server {
    listen 443 ssl;
    server_name pod.example.com;

    ssl_certificate /etc/letsencrypt/live/pod.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/pod.example.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## WebID Discovery

Given a WebID, find which server hosts it:

```http
GET /profile/card HTTP/1.1
Host: alice.pod.example
Accept: application/ld+json
```

Check the `Link` header:

```
Link: <https://alice.pod.example/>; rel="http://www.w3.org/ns/pim/space#storage"
```

The `Server` response header often identifies the implementation:

| Header Value | Server |
|-------------|--------|
| `CommunitySolidServer` | CSS |
| `JSS` | JSS |
| `solid-server` or `node-solid-server` | NSS |

## Specifications

- [Solid Protocol](https://solidproject.org/TR/protocol) — W3C Solid CG
- [Solid-OIDC](https://solid.github.io/solid-oidc/) — W3C Solid CG
- [Web Access Control](https://solid.github.io/web-access-control-spec/) — W3C Solid CG
- [Linked Data Platform](https://www.w3.org/TR/ldp/) — W3C Recommendation

## License

AGPL-3.0
