const js = require('@eslint/js')
const globals = require('globals')

let tsPlugin = null
let tsParser = null
let security = null
try {
  tsPlugin = require('@typescript-eslint/eslint-plugin')
  tsParser = require('@typescript-eslint/parser')
} catch {
  // TypeScript tooling not installed yet; fall back to JS-only config.
}

try {
  security = require('eslint-plugin-security')
} catch {
  // Security plugin not installed yet; fall back to basic config
}

const configs = [
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**'],
  },
  js.configs.recommended,
]

// Add security config if available
if (security) {
  configs.push(security.configs.recommended)
}

// Base rules configuration
const baseRules = {
  // Complexity gates (AI quality)
  complexity: ['warn', 15],
  'max-depth': ['warn', 4],
  'max-params': ['warn', 5],

  // XSS Prevention patterns - critical for web applications
  'no-eval': 'error',
  'no-implied-eval': 'error',
  'no-new-func': 'error',
  'no-script-url': 'error',
}

// Security rules only if plugin is loaded
const securityRules = security
  ? {
      // Security rules from WFHroulette patterns - adjusted for build tools
      'security/detect-object-injection': 'warn', // Build tools often use dynamic object access
      'security/detect-non-literal-regexp': 'error',
      'security/detect-unsafe-regex': 'error',
      'security/detect-buffer-noassert': 'error',
      'security/detect-child-process': 'warn', // Build tools may spawn processes
      'security/detect-disable-mustache-escape': 'error',
      'security/detect-eval-with-expression': 'error',
      'security/detect-no-csrf-before-method-override': 'error',
      'security/detect-non-literal-fs-filename': 'warn', // Build tools need dynamic file operations
      'security/detect-non-literal-require': 'error',
      'security/detect-possible-timing-attacks': 'error',
      'security/detect-pseudoRandomBytes': 'error',
    }
  : {}

configs.push({
  files: ['**/*.{js,jsx,mjs,cjs}'],
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
  rules: {
    ...baseRules,
    ...securityRules,
  },
})

if (tsPlugin && tsParser) {
  configs.push({
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  })
}

// Import verification (eslint-plugin-n)
let nPlugin = null
try {
  nPlugin = require('eslint-plugin-n')
} catch {
  // eslint-plugin-n not installed
}

if (nPlugin) {
  configs.push({
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { n: nPlugin },
    rules: {
      'n/no-missing-require': 'error',
      'n/no-missing-import': 'off', // Often handled by bundlers
      'n/no-unpublished-require': 'off',
    },
  })
}

module.exports = configs
