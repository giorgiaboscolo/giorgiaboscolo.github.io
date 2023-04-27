module.exports = {
    root: true,
    env: {
        es2021: true,
        "vue/setup-compiler-macros": true
    },
    'extends': [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/eslint-config-typescript/recommended",
        "@vue/eslint-config-prettier"
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        'no-console': import.meta.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': import.meta.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)'
            ],
        }
    ]
}
