import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      prettier: pluginPrettier,
    },
  },
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-var': 'error',
      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'auto',
        },
      ],

      semi: ['warn', 'always'],
      quotes: ['warn', 'single', { avoidEscape: true }],
      'jsx-quotes': ['warn', 'prefer-double'],
      'object-curly-spacing': ['warn', 'always'],
      // 'comma-dangle': ['error', 'always-multiline'],
      indent: ['error', 2, { SwitchCase: 1 }],
      'arrow-parens': ['warn', 'always'],
    },
  },
];
