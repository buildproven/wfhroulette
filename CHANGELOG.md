# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial project structure with CLI and web interface
- Deterministic WFH day selection based on seed and ISO week
- 20 sarcastic corporate excuses
- Comprehensive test suite (unit and integration tests)
- Security fixes for XSS prevention
- Web interface with responsive design
- CLI tool with multiple command-line options

### Security

- XSS vulnerability elimination with safe DOM manipulation
- Input sanitization for user-provided seeds
- Path traversal protection in static file server

## [1.0.0] - 2025-01-01

### Added

- Initial release of WFHroulette
- CLI utility for selecting WFH days
- Web application interface
- ISO week calculation logic
- Sarcastic excuse generation
- Zero-dependency Node.js implementation

---

For a complete list of changes, see the [git history](https://github.com/buildproven/wfhroulette).

> **BuildProven LLC** · [buildproven.ai](https://buildproven.ai)
