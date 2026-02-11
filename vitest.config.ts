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
        'src/index.ts',  // Entry point, minimal logic
        'src/templates/arc42-reference.ts'  // Infrastructure code for submodule version detection
      ],
      // Coverage thresholds for open-source quality
      // Note: Branch coverage limited by ESM module mocking constraints
      // for error handling paths in file system operations
      thresholds: {
        statements: 80,
        branches: 75,
        functions: 90,
        lines: 80
      }
    },
    // Test timeout for file system operations
    testTimeout: 10000,
    // Helpful for debugging
    logHeapUsage: false
  }
});
