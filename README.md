# WFHroulette

Randomly (but deterministically) pick one Work-From-Home day per ISO week (Mon-Fri only) and get a sarcastic excuse. Perfect for teams who want fair, consistent WFH day selection.

---

> **Maintainer & Ownership**
> This project is maintained by **BuildProven LLC**, a studio focused on AI-assisted product development, micro-SaaS, and "vibe coding" workflows for solo founders and small teams.
> Learn more at **https://www.buildproven.ai**.

---

## Features

- **Deterministic Selection** - Same seed + ISO week = same WFH day (no arguing!)
- **Dual Interface** - CLI tool and web app share the same logic
- **Sarcastic Excuses** - 20 corporate-humor excuses for your WFH day
- **ISO Week Handling** - Proper business week calculation (Mon-Fri)
- **Zero Dependencies** - Pure Node.js and vanilla JavaScript
- **Team Coordination** - Everyone using the same seed gets the same day

## Target Users

- **Remote/hybrid teams** who need fair WFH day rotation
- **Managers** tired of WFH day disputes
- **Anyone** who appreciates deterministic chaos with corporate humor

## Why Deterministic?

Teams love a bit of chaos, but calendars do not. A deterministic pick lets everyone use the same seed (team name, project, whatever) and get the exact same WFH day and excuse for that ISO week. No more arguing over who "won" - if the hash says Thursday, you grab your sweatpants and roll with it.

## Pricing & Licensing

**Free / Donationware** - Use it, enjoy it, share it.

### License

MIT License - see [LICENSE](LICENSE) for details.

## Tech Stack

| Component    | Technology                      |
| ------------ | ------------------------------- |
| **Runtime**  | Node.js                         |
| **Frontend** | Vanilla JavaScript (ES modules) |
| **Server**   | Simple static file server       |
| **Testing**  | Custom test runner              |

## Getting Started

### Prerequisites

- Node.js 20+

### Installation

```bash
# Clone the repository
git clone https://github.com/buildproven/wfhroulette.git
cd wfhroulette

# Install (no dependencies needed)
npm install

# Link CLI globally
npm link
```

### CLI Usage

```bash
wfhroulette --seed my-team --date 2025-09-25
```

**Options:**

- `--seed <value>` - Team, project, or inside joke to feed the hash (default: `default`)
- `--date YYYY-MM-DD` - Anchor date for the ISO week (default: today)
- `--json` - Emit machine-readable JSON
- `--help` - Show usage information

### Web App Usage

```bash
npm run web
```

Open the printed URL (usually http://localhost:4173/web/). Enter your seed and optional date, hit **Pick**, and bask in your sanctioned remote day and excuse.

## Usage Example

```bash
$ wfhroulette --seed my-team --date 2025-09-25

WFH Day for seed "my-team" (ISO week 2025-W39)
  Thursday, 2025-09-25
Excuse: My ergonomic chair was reassigned to a visiting consultant's emotional support cactus.
```

## Development Commands

| Command                    | Purpose               |
| -------------------------- | --------------------- |
| `npm start`                | Run CLI with defaults |
| `npm run web`              | Start web server      |
| `npm test`                 | Run all tests         |
| `npm run test:unit`        | Core logic tests      |
| `npm run test:integration` | Browser/server tests  |

## Project Structure

```
WFHroulette/
├── src/
│   ├── cli.js           # CLI entry point
│   └── util.js          # Core logic (shared)
├── web/
│   ├── server.js        # Static file server
│   ├── index.html       # Web UI
│   └── app.js           # Frontend JavaScript
├── reasons.json         # Sarcastic excuses
├── test/                # Test suites
└── package.json
```

## Customization

- **Add excuses** - Edit `reasons.json` to add/remove/modify excuses
- **Custom logic** - Edit `src/util.js` to change selection algorithm
- **Publish** - Already configured with `bin` entry for global CLI

## Roadmap

See [ROADMAP.md](ROADMAP.md) for planned features and strategic direction.

## Contributing

Contributions welcome! Please open an issue first to discuss proposed changes.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Legal

- [Privacy Policy](https://buildproven.ai/privacy-policy)
- [Terms of Service](https://buildproven.ai/terms)

---

> **BuildProven LLC** · [buildproven.ai](https://buildproven.ai)
