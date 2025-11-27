# API Automation with Playwright + TypeScript

This project bootstraps API-only automation on top of the Playwright test runner.  
It uses TypeScript, dotenv-based configuration, and simple sample tests against the public `jsonplaceholder.typicode.com` API.

## Prerequisites

- Node.js 18+
- npm 9+

## Getting Started

```bash
npm install
cp env.example .env   # adjust API_BASE_URL / API_AUTH_TOKEN as needed
npm test
```

### Useful scripts

| Command | Description |
| --- | --- |
| `npm test` | Runs the API test suite in headless mode |
| `npm run test:debug` | Runs tests with Playwright debug logs |
| `npm run test:report` | Opens the most recent HTML report |

## Configuration

- `playwright.config.ts` loads `.env` via `dotenv` and exposes `API_BASE_URL` and optional `API_AUTH_TOKEN`.
- Defaults point to `https://jsonplaceholder.typicode.com`, so the suite can run without real credentials.

## Project Structure

```
├── playwright.config.ts
├── tests
│   └── api
│       └── users.spec.ts
├── env.example
└── tsconfig.json
```

Add additional specs under `tests/api/` and share helpers via plain `.ts` modules.

