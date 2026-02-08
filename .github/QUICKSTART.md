# Claude Code Integration - Quick Start

## ✅ Setup Complete

Your repository is now configured for Claude Code GitHub integration!

## 🔑 Final Step: Configure API Key

Run this command to add your Anthropic API key:

```bash
gh secret set ANTHROPIC_API_KEY
```

Or run the setup script:

```bash
./.github/setup-claude-integration.sh
```

Get your API key from: https://console.anthropic.com/settings/keys

## 📱 Usage from GitHub Mobile

### Create an Issue

```
Title: Add new feature
Body: @claude please add a dark mode theme to the web interface
```

### Comment on Existing Issue

```
@claude run the test suite and report results
```

### Example Requests

- `@claude run tests` - Execute test suite
- `@claude add excuse about coffee` - Add new excuse to reasons.json
- `@claude fix issue #42` - Work on a specific issue
- `@claude update README` - Documentation updates

## 🤖 What Happens

1. **Detection**: Workflow detects `@claude` mention
2. **Acknowledgment**: Posts "Processing..." comment
3. **Execution**: Runs automated tasks (tests, checks, simple edits)
4. **Results**: Posts completion status and summary

## 🛠️ For Complex Tasks

The bot will suggest running Claude Code locally:

```bash
cd ~/Projects/WFHroulette
claude
```

Then reference the issue: "Please help with issue #123"

## 📊 Workflow Status

Check workflow runs: https://github.com/buildproven/wfhroulette/actions

## 📚 Full Documentation

See `.github/CLAUDE_INTEGRATION.md` for complete details.

---

**Next Step**: Run `gh secret set ANTHROPIC_API_KEY` to complete setup!
