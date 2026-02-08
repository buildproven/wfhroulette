# WFHroulette - Claude Guide

> Deterministic WFH day picker with sarcastic corporate excuses. Zero dependencies.

## Tech Stack

| Layer   | Technology                     |
| ------- | ------------------------------ |
| Runtime | Node.js 20+ (ES modules)       |
| Testing | Custom test harness (19 tests) |
| Quality | ESLint, Prettier, Stylelint    |

## Key Commands

```bash
npm start               # Run CLI with defaults
npm run web             # Web server (port 4173)
npm test                # All tests (unit + integration)
npm run lint            # ESLint + Stylelint
npm run format          # Prettier
```

## CLI Usage

```bash
wfhroulette --seed my-team --date 2025-09-25
wfhroulette --seed my-team --date 2025-09-25 --employee-id john.doe
wfhroulette --seed my-team --date 2025-09-25 --json
```

## Project Structure

```
WFHroulette/
├── src/
│   ├── cli.js         # CLI entry point
│   └── util.js        # Core logic (ISO week, hashing, selection)
├── web/
│   ├── server.js      # Static file server
│   ├── index.html     # Web UI
│   └── app.js         # Frontend JS
├── test/              # Unit + integration tests
└── reasons.json       # Sarcastic WFH excuses
```

## Core Functions (src/util.js)

- `isoWeekInfo(date)` - ISO year, week number, Monday date
- `pickWFHDay(seed, date)` - Select WFH day (Mon-Fri)
- `pickReason(seed, weekInfo, reasons, employeeId?)` - Select excuse

## What NOT to Do

- Don't add external dependencies (zero-dep design)
- Don't use semicolons (ASI style)
- Don't use `innerHTML` (XSS prevention)
- Don't skip `.js` extension in imports
- Don't modify ISO week calculation (ISO 8601)
- Don't mix timezones (use UTC)

---

_See `docs/` for ARCHITECTURE, TESTING, DEPLOYMENT. Global rules in `~/.claude/CLAUDE.md`._

---

## GitHub Actions Policy

See `.claude-setup/docs/GITHUB-ACTIONS-POLICY.md` — minimal workflow mode, no new workflows.
