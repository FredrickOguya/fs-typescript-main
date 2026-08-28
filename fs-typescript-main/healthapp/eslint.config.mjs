import tseslint from 'typescript-eslint'
import eslint from '@eslint/js'

export default tseslint.config({
  files: ['**/*.ts'],
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta.dirname,
    }
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
  }
})