import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended, 
  ...tseslint.configs.recommended,
  {
    rules: {
      semi: ['error'],
      "comma-dangle": ['error'],
      "eol-last": 'error',
      "indent": ["error", 2],
      "no-multiple-empty-lines": ["error", { "max": 1, "maxBOF": 1}]
    }
  }
);
