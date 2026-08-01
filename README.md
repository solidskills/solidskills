# solidskills

LLM skills for the Solid ecosystem. Grounded in working code, not theory.

## Skills

| Skill | Description |
|-------|-------------|
| [skills/protocol.md](skills/protocol.md) | Solid Protocol — LDP, WebID, HTTP API, content negotiation |
| [skills/solid-oidc.md](skills/solid-oidc.md) | Solid-OIDC — authentication, DPoP, PKCE, token refresh |
| [skills/servers.md](skills/servers.md) | Solid Servers — CSS, JSS, NSS, Pivot, live instances |
| [skills/solidos.md](skills/solidos.md) | SolidOS — data browser, pane architecture, rdflib.js |
| [skills/webacl.md](skills/webacl.md) | Web Access Control — generate `.acl` files for Solid pods |

## Usage

### As a Claude Code plugin

Build the plugin structure, then point Claude Code at the output:

```bash
npm run build:plugin
claude --plugin-dir ./dist
```

Skills become available as `/solidskills:protocol`, `/solidskills:webacl`, etc.

### As an npm package

```bash
npm install solidskills
```

```js
const { protocol, webacl, servers, solidOidc, solidos } = require('solidskills')
```

### Manual

Point your AI coding assistant at the skill files, or copy them into your project's context.

## License

AGPL-3.0-only
