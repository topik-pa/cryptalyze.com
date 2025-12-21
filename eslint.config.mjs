/**
 * ESLint rules configuration object.
 * 
 * @type {Object.<string, string|Array>}
 * @property {Array} eqeqeq - Enforces strict equality operators (===, !==).
 * @property {Array} semi - Disallows semicolons at the end of statements.
 * @property {Array} quotes - Enforces single quotes for strings.
 * @property {Array} indent - Enforces 2-space indentation.
 * @property {Array} comma-dangle - Disallows trailing commas.
 * @property {Array} linebreak-style - Enforces Unix line endings (LF).
 * @property {string} no-var - Disallows var declarations, requires let or const.
 * @property {string} prefer-const - Warns when variables could be const instead of let.
 * @property {Array} no-unused-vars - Warns on unused variables, ignores vars starting with underscore.
 * @property {string} no-debugger - Disallows debugger statements.
 * @property {Array} space-before-function-paren - Disallows space before function parentheses.
 * @property {Array} object-curly-spacing - Enforces spacing inside object literal braces.
 * @property {Array} arrow-spacing - Enforces spacing before and after arrow functions.
 * @property {string} no-console - Warns on console statements.
 * @property {Array} max-len - Enforces maximum line length of 120 characters.
 */

import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'


const rules = {
  eqeqeq: ['error', 'always'],
  semi: ['error', 'never'],
  quotes: ['error', 'single'],
  indent: ['error', 2],
  'comma-dangle': ['error', 'never'],
  'linebreak-style': ['error', 'unix'],
  'no-var': 'error',
  'prefer-const': 'warn',
  'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
  'no-debugger': 'error',
  'space-before-function-paren': ['error', 'never'],
  'object-curly-spacing': ['error', 'always'],
  'arrow-spacing': ['error', { before: true, after: true }],
  'no-console': 'warn',
  'max-len': ['error', { 'code': 120 } ]
}


export default defineConfig([
  { files: ['**/*.{js,mjs,cjs}'], plugins: { js }, extends: ['js/recommended'], rules: rules },
  { files: ['**/*.{js,mjs,cjs}'], languageOptions: { globals: globals.node } },
  {
    files: [
      'app/scripts/**/*.{js,mjs,cjs}',
      'app/views/**/*.{js,mjs,cjs}'
    ],
    languageOptions: { globals: globals.browser }
  },
  {
    ignores: ['app/scripts/vendors/datatables.min.js']
  }
])
