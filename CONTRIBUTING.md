# Contributing to WFHroulette

Thanks for your interest in contributing to WFHroulette! We welcome contributions from everyone.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/wfhroulette.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes: `npm test`
6. Commit with clear messages: `git commit -m "description of changes"`
7. Push to your fork and open a pull request

## Development Setup

```bash
npm install
npm link              # Make CLI available globally
npm test             # Run all tests
npm run web          # Start development server
```

## Code Style

- 2-space indentation
- No semicolons (ASI style)
- ES modules with explicit `.js` extensions
- Use `const`/`let`, not `var`
- Clear, descriptive variable names

## Testing

All changes should include tests:

```bash
npm test             # Run full test suite
npm run test:unit    # Unit tests only
npm run test:integration  # Integration tests only
```

## Types of Contributions

### Bug Reports

Please open an issue with:

- Clear description of the bug
- Steps to reproduce
- Expected vs. actual behavior
- Your environment (Node.js version, OS)

### Feature Requests

Before proposing a feature, please open an issue for discussion. We want to maintain the project's simplicity and zero-dependency philosophy.

### Documentation

- Improve README.md clarity
- Add usage examples
- Fix typos and broken links
- Contribute to the docs/ folder

### Code Improvements

- Performance optimizations
- Code refactoring
- Security enhancements
- Test coverage improvements

## Before You Submit

1. Run `npm test` to ensure all tests pass
2. Run `npm audit` to check for security issues
3. Update documentation if you change functionality
4. Add tests for new features
5. Follow the existing code style

## Pull Request Process

1. Update the CHANGELOG.md with your changes
2. Ensure tests pass locally
3. Write a clear PR description explaining the changes
4. Link any related issues
5. Be responsive to review feedback

## Questions?

Feel free to open an issue with the label `question` if you have any questions about contributing.

## Code of Conduct

Please be respectful and constructive in all interactions. We're here to build great tools together.

---

> **BuildProven LLC** · [buildproven.ai](https://buildproven.ai)
