import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.test.ts',
        '**/*.config.ts',
        'src/__tests__/**',
        'src/index.ts'  // Entry point, minimal logic
      ],
      // Coverage thresholds for open-source quality
      thresholds: {
        statements: 70,
        branches: 60,
        functions: 70,
        lines: 70
      }
    },
    // Test timeout for file system operations
    testTimeout: 10000,
    // Helpful for debugging
    logHeapUsage: false
  }
});
