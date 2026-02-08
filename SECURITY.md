# Security Policy

## Reporting Security Issues

If you discover a security vulnerability in WFHroulette, please email:

**security@buildproven.ai**

Please do not open public issues for security vulnerabilities. We will work with you to assess and address the issue.

## Security Considerations

### Current Implementation

- **No external dependencies**: Reduces supply chain attack surface
- **Client-side only**: No server-side data persistence or user data storage
- **Input validation**: All user inputs are sanitized to prevent XSS attacks
- **Safe DOM manipulation**: Uses `textContent` and `createElement()` instead of `innerHTML`

### Known Limitations

- This is a demonstration/utility project, not a production security service
- Please conduct your own security assessment before deploying in sensitive environments

## Supported Versions

| Version | Supported |
| ------- | --------- |
| Latest  | ✓ Yes     |
| Older   | ✗ No      |

## Security Best Practices

When using WFHroulette:

1. Keep Node.js updated to the latest stable version
2. Review the code before deploying in restricted environments
3. Do not expose sensitive seeds or data through the application
4. Run security audits periodically: `npm audit`

---

> For more information, visit [buildproven.ai](https://buildproven.ai)
