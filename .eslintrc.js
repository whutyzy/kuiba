module.exports = {
    env: {
        browser: true,
        node: true
    },
    extends: ['plugin:vue/essential', 'eslint:recommended'],
    parserOptions: {
        parser: '@babel/eslint-parser'
    },
    rules: {
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        'no-console': 'off'
    }
}
