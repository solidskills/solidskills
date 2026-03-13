#!/usr/bin/env node

/**
 * Generates Claude Code plugin structure from flat skill files.
 *
 * Reads package.json + skills/*.md, produces a complete plugin in dist/:
 *
 *   dist/.claude-plugin/plugin.json
 *   dist/skills/{name}/SKILL.md
 *
 * Usage:
 *   node build-plugin.js
 *   claude --plugin-dir ./dist
 */

const { readFileSync, writeFileSync, mkdirSync } = require('fs')
const { join } = require('path')

const pkg = JSON.parse(readFileSync(join(__dirname, 'package.json'), 'utf8'))

const distDir = join(__dirname, 'dist')

const skills = [
  {
    file: 'protocol.md',
    name: 'protocol',
    description:
      'Solid Protocol reference — LDP containers, WebID profiles, HTTP CRUD operations, content negotiation, ETags, and Link headers for building apps on Solid pods.'
  },
  {
    file: 'servers.md',
    name: 'servers',
    description:
      'Solid server implementations and live instances — CSS, JSS, NSS, Pivot, ESS. Quick start, configuration, deployment, and feature comparison.'
  },
  {
    file: 'solid-oidc.md',
    name: 'solid-oidc',
    description:
      'Solid-OIDC authentication for Solid apps — login flow, DPoP tokens, PKCE, token refresh, and authenticated fetch. Use when implementing Solid authentication.'
  },
  {
    file: 'solidos.md',
    name: 'solidos',
    description:
      'SolidOS data browser — pane architecture, rdflib.js, mashlib embedding, type indexes, and solid-ui widgets for building Solid pod interfaces.'
  },
  {
    file: 'webacl.md',
    name: 'webacl',
    description:
      'Generate .acl files for Solid pods using the WAC (Web Access Control) specification. Use when working with Solid access control, permissions, or authorization resources.'
  }
]

// Create dist/.claude-plugin/plugin.json
const pluginDir = join(distDir, '.claude-plugin')
mkdirSync(pluginDir, { recursive: true })

writeFileSync(
  join(pluginDir, 'plugin.json'),
  JSON.stringify(
    {
      name: pkg.name,
      version: pkg.version,
      description: pkg.description,
      author: { name: pkg.author },
      repository: pkg.repository.url,
      license: pkg.license,
      keywords: pkg.keywords
    },
    null,
    2
  ) + '\n'
)

// Create dist/skills/{name}/SKILL.md for each skill
const skillsSrcDir = join(__dirname, 'skills')

for (const skill of skills) {
  const content = readFileSync(join(skillsSrcDir, skill.file), 'utf8')
  const outDir = join(distDir, 'skills', skill.name)
  mkdirSync(outDir, { recursive: true })

  const frontmatter = [
    '---',
    `name: ${skill.name}`,
    `description: ${skill.description}`,
    '---',
    ''
  ].join('\n')

  writeFileSync(join(outDir, 'SKILL.md'), frontmatter + content)
}

const count = skills.length
console.log(`Built plugin: ${count} skills → dist/`)
