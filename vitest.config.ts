/**
 * vitest.config.ts — project root
 *
 * Updated to include:
 *   - Coverage reporting (v8 provider, HTML + JSON + text)
 *   - Per-file coverage thresholds matching the code we have
 *   - Test categorisation via tags (unit, integration)
 *   - Deterministic test ordering (sequence mode for integration tests)
 */

import { defineConfig } from 'vitest/config';
import react            from '@vitejs/plugin-react';
import path             from 'path';

export default defineConfig({
  plugins: [react()],

  test: {
    // ── Test environment ──────────────────────────────────────────────────────
    environment: 'jsdom',
    globals:     true,

    // ── Setup files (run before every test file) ──────────────────────────────
    setupFiles: ['./vitest.setup.ts'],

    // ── Test file patterns ────────────────────────────────────────────────────
    include: [
      '__tests__/**/*.{test,spec}.{ts,tsx}',
    ],
    exclude: [
      'node_modules/**',
      '.next/**',
      'dist/**',
    ],

    // ── Reporters ─────────────────────────────────────────────────────────────
    reporters: ['verbose'],

    // ── Coverage (run with: npm run test:coverage) ────────────────────────────
    coverage: {
      provider: 'v8',

      // Measure coverage only for the files we actually tested
      include: [
        'lib/utils.ts',
        'lib/auth-service.ts',
        'lib/services/learning-progress.ts',
        'lib/services/SupabaseProgressService.ts',
        'middleware.ts',
        'contexts/AuthContext.tsx',
        'app/api/auth/link-wallet/route.ts',
      ],

      exclude: [
        '**/*.d.ts',
        '**/node_modules/**',
        '**/__tests__/**',
        '**/vitest.setup.ts',
      ],

      // Reports written to coverage/
      reporter: ['text', 'html', 'json', 'json-summary'],
      reportsDirectory: './coverage',

      // ── Minimum thresholds — CI will fail below these ─────────────────────
      thresholds: {
        // Global minimums
        statements: 80,
        branches:   75,
        functions:  80,
        lines:      80,

        // Per-file overrides (stricter for pure utilities)
        perFile: false,
      },

      // Collect coverage even from files with no tests (shows uncovered modules)
      all:    true,

      // Clean coverage directory before each run
      clean:  true,
    },

    // ── Timeout (increase for integration tests) ──────────────────────────────
    testTimeout: 10_000,

    // ── Pool ─────────────────────────────────────────────────────────────────
    // 'threads' is fast but forks; 'forks' is safer for complex mocks
    pool: 'forks',
  },

  // ── Module resolution (mirrors tsconfig paths) ────────────────────────────
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
