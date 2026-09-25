// Flat config for ESLint v9+
import eslintPluginAstro from 'eslint-plugin-astro';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    ignores: [
      'dist/**',
      '.astro/**',
      '.vercel/**',
      '.output/**',
      'node_modules/**',
      'public/**',
    ],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    },
  },
  ...eslintPluginAstro.configs.recommended,
];
