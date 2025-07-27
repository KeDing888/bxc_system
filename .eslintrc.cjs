module.exports = {
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'pinia/no-store-without-return-type': 'error'
    },
    extends: [
      'plugin:vue/vue3-essential',
      'eslint:recommended',
      '@vue/typescript/recommended',
      'plugin:pinia/recommended'
    ]
  }