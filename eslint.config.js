import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import * as tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import eslintPluginBoundaries from 'eslint-plugin-boundaries';
export default tseslint.config(
  { ignores: ['dist'] },
  {
    files: ['/.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.browser, React: 'readonly' },
      parser: tseslint.parser,
      parserOptions: { project: true, ecmaFeatures: { jsx: true } },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
      boundaries: eslintPluginBoundaries,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: ['shared'], allow: [] },
            { from: ['entities'], allow: ['shared'] },
            { from: ['pages'], allow: ['entities', 'shared'] },
            { from: ['app'], allow: ['pages', 'entities', 'shared'] },
          ],
        },
      ],
      'import/no-cycle': 'error',
      'import/no-self-import': 'error',
      'import/no-relative-parent-imports': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/entities//ui/', '@/entities//domain/*'],
              message: 'Import only through entity public API (index.ts)',
            },
          ],
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            { pattern: '@/', group: 'internal', position: 'before' },
            { pattern: '@/entities/*', group: 'internal', position: 'before' },
            { pattern: '@/pages/*', group: 'internal', position: 'before' },
            { pattern: '@/shared/*', group: 'internal', position: 'before' },
            { pattern: '@/app/*', group: 'internal', position: 'before' },
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc' },
        },
      ],
    },
    settings: {
      'boundaries/elements': [
        { type: 'app', pattern: 'app/' },
        { type: 'shared', pattern: 'shared/' },
        { type: 'entity', pattern: 'entities/' },
        { type: 'pages', pattern: 'pages/' },
      ],
      'import/resolver': { typescript: { alwaysTryTypes: true } },
    },
  },
);
