import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const rawBaseUrl = process.env.API_BASE_URL ?? 'https://restful-booker.herokuapp.com';
const API_BASE_URL = rawBaseUrl.endsWith('/') ? rawBaseUrl : `${rawBaseUrl}/`;
const defaultHeaders: Record<string, string> = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

if (process.env.API_AUTH_TOKEN) {
  defaultHeaders.Authorization = `Bearer ${process.env.API_AUTH_TOKEN}`;
}

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000
  },
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: API_BASE_URL,
    extraHTTPHeaders: defaultHeaders,
    trace: 'retain-on-failure'
  },
  projects: [{ name: 'api' }]
});

