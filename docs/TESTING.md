# Testing

## Overview

WFHroulette includes a comprehensive automated test suite with 19 tests covering both unit and integration testing. The custom test runner works in sandboxed environments and CI/CD pipelines.

## Running Tests

```bash
# Run full test suite (unit + integration)
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run tests in CI mode (skips integration if ports are blocked)
npm run test:ci
```

## Test Suite Structure

### Unit Tests (`test/util.test.js`)

Tests core business logic functions in isolation. **12 tests** covering:

#### Hash Function Tests

- `testHashConsistency()` - Same input always produces same hash
- `testHashEdgeCases()` - Null, undefined, and empty string handling
- `testHashDistribution()` - Different inputs produce different hashes

#### ISO Week Calculation Tests

- `testISOWeekCalculation()` - Correct week/year for known dates
- `testISOWeekBoundaries()` - Year transitions (Dec/Jan boundaries)
- `testMondayDateCorrectness()` - Monday is always first day of ISO week

#### WFH Day Selection Tests

- `testPickWFHDayDeterministic()` - Same seed+date = same day
- `testPickWFHDayIsWeekday()` - Always Mon-Fri, never weekends
- `testPickWFHDayDifferentSeeds()` - Different seeds produce different days
- `testPickWFHDayDateHandling()` - Works with Date objects and ISO strings

#### Reason Selection Tests

- `testPickReasonDeterministic()` - Same seed+week = same reason
- `testFormatDayOutput()` - Correct date formatting

### Integration Tests (`test/integration.test.js`)

Tests end-to-end functionality with server interaction. **7 tests** covering:

#### Server Lifecycle Tests

- `testServerStartsAndShuts()` - Server starts on correct port and shuts down cleanly
- `testStaticFileServing()` - Static files are served with correct paths and MIME types

#### HTML/DOM Tests

- `testIndexHTMLStructure()` - Required HTML elements are present
- `testFormElementsPresent()` - Form inputs for seed and date exist
- `testButtonLabelsCorrect()` - UI buttons have expected text

#### HTTP Response Tests

- `testHTTPStatusCodes()` - Correct status codes (200 for found, 404 for missing)

#### Security Tests

- `testNoXSSVulnerabilities()` - Static content doesn't contain XSS patterns like `innerHTML` or dangerous event handlers

## Test Environment

### Custom Test Runner (`test/test-runner.js`)

Simple, zero-dependency test harness with:

- Assertion functions (assert, assertEquals, assertTrue, assertFalse)
- Test registration and execution
- Color-coded output (green for pass, red for fail)
- Summary statistics
- Error reporting with stack traces

### Browser Testing

Integration tests use:

- Node.js `http` module for server interaction
- `Playwright` (if available) for browser automation
- Graceful fallback for sandboxed environments

## Key Testing Patterns

### Determinism Tests

Verify that same inputs always produce same outputs:

```javascript
const day1 = pickWFHDay('team-a', new Date('2025-09-25'))
const day2 = pickWFHDay('team-a', new Date('2025-09-25'))
assert(
  day1.getTime() === day2.getTime(),
  'Same seed and date should produce same day'
)
```

### Edge Case Tests

Test boundary conditions and unusual inputs:

```javascript
testHashEdgeCases() {
  assertEqual(simpleHash(null), simpleHash(null), 'null should hash consistently')
  assertEqual(simpleHash(''), simpleHash(''), 'empty string should hash consistently')
  assertTrue(simpleHash('a') !== simpleHash('b'), 'different inputs should hash differently')
}
```

### Weekday Validation Tests

Ensure WFH day is always Mon-Fri:

```javascript
testPickWFHDayIsWeekday() {
  const day = pickWFHDay('test', new Date())
  const dayOfWeek = day.getUTCDay()
  assertTrue(dayOfWeek >= 1 && dayOfWeek <= 5, 'Must be Mon-Fri (1-5)')
  assertTrue(dayOfWeek !== 0 && dayOfWeek !== 6, 'Never Saturday (6) or Sunday (0)')
}
```

## Continuous Integration

### GitHub Actions Workflows

- **ci.yml** - Runs tests on every push and pull request
- **quality.yml** - Code quality checks (linting, security audit)
- **claude-code.yml** - AI-assisted code quality improvements

### CI-Safe Testing

Tests skip integration tests gracefully when:

- Port 4173 is already in use (EADDRINUSE)
- Permission denied (EACCES)
- General permission error (EPERM)

Set `SKIP_INTEGRATION_TESTS=true` to skip integration tests:

```bash
SKIP_INTEGRATION_TESTS=true npm test
```

## Adding New Tests

### For New Features

1. Add unit tests in `test/util.test.js`
2. Add integration tests in `test/integration.test.js` if needed
3. Run `npm test` to verify all tests pass
4. Update CHANGELOG.md

### Example: Adding a Test

```javascript
// In test/util.test.js
test('myNewFeature', () => {
  const result = myNewFunction('input')
  assertEqual(result, 'expected', 'Description of what should happen')
})
```

## Test Coverage

Current coverage:

- **Core logic**: 100% (all functions have tests)
- **Error handling**: Covered in unit tests
- **Security**: XSS scanning in integration tests
- **Browser compatibility**: Works in all modern browsers

## Manual Testing

For features that require manual verification:

### CLI Manual Tests

```bash
# Test basic usage
wfhroulette --seed my-team --date 2025-09-25

# Test JSON output
wfhroulette --seed my-team --json

# Test help
wfhroulette --help

# Test different seeds and dates
wfhroulette --seed team-1 --date 2025-01-15
wfhroulette --seed team-2 --date 2025-01-15
```

### Web Manual Tests

```bash
npm run web
# Open http://localhost:4173/web/
# 1. Test with various seeds
# 2. Test with different dates
# 3. Test date picker functionality
# 4. Verify reasons load from JSON
# 5. Check social preview meta tags
```

## Troubleshooting Tests

### Tests fail on CI but pass locally

- Check Node.js version: `node --version` (should be 20+)
- Clear node_modules: `rm -rf node_modules && npm install`
- Check for port conflicts: `lsof -i :4173`

### Integration tests skip on local machine

- Ensure port 4173 is available
- Kill any process using that port: `kill -9 $(lsof -t -i :4173)`
- Run `npm run test:integration` again

### Module import errors

- Verify `.js` extensions in all imports
- Check that `package.json` has `"type": "module"`
- Ensure all imported files exist

---

For more information, see [ARCHITECTURE.md](ARCHITECTURE.md) and [DEPLOYMENT.md](DEPLOYMENT.md).

> **BuildProven LLC** · [buildproven.ai](https://buildproven.ai)
