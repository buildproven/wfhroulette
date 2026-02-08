# Architecture

## Overview

WFHroulette is a deterministic WFH day selection tool with dual interfaces (CLI and web app). The architecture emphasizes simplicity, zero external dependencies, and shared business logic.

## Design Principles

- **Shared Logic**: Core functionality lives in `src/util.js` and is used by both CLI and web interfaces
- **Zero Dependencies**: Pure Node.js and vanilla JavaScript
- **Deterministic**: Same input always produces the same output
- **Stateless**: No server-side state, all computation is ephemeral
- **ES Modules**: Modern JavaScript module system with explicit imports

## Directory Structure

```
WFHroulette/
├── src/
│   ├── cli.js           # CLI entry point (argument parsing, output formatting)
│   └── util.js          # Core business logic (shared by CLI and web)
├── web/
│   ├── server.js        # Static file server (Node.js)
│   ├── index.html       # Web UI (HTML)
│   ├── app.js           # Frontend JavaScript (imports from src/util.js)
│   └── style.css        # Styling
├── test/
│   ├── util.test.js     # Unit tests for core logic
│   ├── integration.test.js  # Browser/server integration tests
│   └── test-runner.js   # Custom test harness
├── reasons.json         # Array of sarcastic WFH excuses
├── package.json         # Project configuration
└── README.md            # User documentation
```

## Core Logic (`src/util.js`)

### Key Functions

#### `isoWeekInfo(date)`

Calculates ISO year, week number, and Monday date for a given date.

- Input: JavaScript Date object
- Output: `{ isoYear, isoWeek, mondayDate }`
- Uses UTC to avoid timezone issues

#### `simpleHash(value)`

Deterministic hash function for string values.

- Input: String (seed)
- Output: Number (0-1000000)
- Same input always produces same output

#### `pickWFHDay(seed, date)`

Selects WFH day (Mon-Fri) for the ISO week containing the given date.

- Input: seed (string), date (Date or string)
- Output: JavaScript Date object (guaranteed to be Mon-Fri)
- Uses ISO week calculation and hash function

#### `pickReason(seed, weekInfo, reasons)`

Selects sarcastic excuse from reasons array based on seed and ISO week.

- Input: seed, weekInfo object, reasons array
- Output: String (one excuse)
- Deterministic selection based on week number

#### `formatDay(date)`

Formats date as human-readable string.

- Input: JavaScript Date object
- Output: String like "Thursday, 2025-09-25"

## CLI Interface (`src/cli.js`)

### Entry Point

- Parses command-line arguments
- Calls core logic from `src/util.js`
- Formats output (text or JSON)
- Handles errors gracefully

### Supported Arguments

```bash
wfhroulette --seed my-team --date 2025-09-25 --json --help
```

- `--seed <value>`: Seed for deterministic selection (default: "default")
- `--date YYYY-MM-DD`: Anchor date (default: today)
- `--json`: Output as JSON
- `--help`: Show usage information

### Output Formats

- **Text**: Human-readable output with formatted date and excuse
- **JSON**: Machine-readable output with structured data

## Web Interface (`web/`)

### Architecture

- **Frontend**: Single-page app with vanilla JavaScript
- **Backend**: Simple static file server (not a full framework)
- **API**: Loads JSON data (reasons.json), falls back to embedded array
- **Security**: XSS protection with safe DOM manipulation

### File Roles

#### `index.html`

- Single page application structure
- Form inputs for seed and date
- Display area for results
- Meta tags for social sharing (Open Graph)

#### `app.js`

- Imports core logic from `src/util.js`
- Event listeners for form submission
- DOM manipulation with safe methods (textContent, createElement)
- Fetch and display reasons with fallback

#### `server.js`

- Simple Node.js HTTP server
- Serves static files with correct MIME types
- Listens on `process.env.PORT` (default: 4173)
- No complex routing, just file serving

## Data Flow

### CLI Flow

```
User Input
  ↓
Argument Parsing (src/cli.js)
  ↓
Core Logic (src/util.js)
  ├─ isoWeekInfo()
  ├─ simpleHash()
  └─ pickWFHDay() + pickReason()
  ↓
Format Output
  ↓
Console Output
```

### Web Flow

```
User Input (Form)
  ↓
Event Handler (web/app.js)
  ↓
Core Logic (src/util.js)
  ├─ isoWeekInfo()
  ├─ simpleHash()
  └─ pickWFHDay() + pickReason()
  ↓
Fetch reasons.json (with fallback)
  ↓
DOM Manipulation
  ↓
Display in Browser
```

## Key Design Decisions

### Why Deterministic?

Teams need consistency for calendar coordination. Given the same seed and date, everyone gets the same WFH day and excuse.

### Why Zero Dependencies?

- Reduces security surface
- Simplifies deployment
- No version conflicts
- Smaller bundle size
- Works anywhere Node.js is available

### Why UTC Date Handling?

Avoids timezone-related bugs when different team members are in different time zones.

### Why Both CLI and Web?

- CLI: Easy integration, automation, scripting
- Web: User-friendly, no setup, accessible to non-technical users

## Testing Strategy

### Unit Tests (`test/util.test.js`)

Tests core logic functions in isolation:

- Hash consistency
- ISO week calculations
- Day selection determinism
- Reason selection logic
- Date formatting

### Integration Tests (`test/integration.test.js`)

Tests end-to-end functionality:

- Server startup/shutdown
- Asset loading and accessibility
- HTML structure validation
- Security scanning (XSS patterns)
- HTTP response validation

### Test Coverage

- 19 automated tests
- Unit tests for all public functions
- Browser/server integration tests
- CI-safe mode for sandbox environments

## Security Considerations

### Input Validation

- User-provided seeds are sanitized
- HTML escaping prevents XSS attacks
- DOM manipulation uses safe methods (`textContent`, `createElement`)

### No Sensitive Data

- No persistence
- No user tracking
- No server-side state
- All operations are ephemeral

### Code Review Points

- Path traversal in file server (restricted to project root)
- DOM manipulation safety
- Input sanitization

---

For detailed development information, see [TESTING.md](TESTING.md) and [DEPLOYMENT.md](DEPLOYMENT.md).

> **BuildProven LLC** · [buildproven.ai](https://buildproven.ai)
