module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: 'module'
    },
    plugins: [
        'ember'
    ],
    extends: [
        'eslint:recommended',
        'plugin:ember/recommended'
    ],
    env: {
        browser: true,
        es6: true
    },
    globals: {
        setBreakpoint: true
    },
    overrides: [
        // node files
        {
            files: [
                '.eslintrc.js',
                '.template-lintrc.js',
                'testem.js',
                'ember-cli-build.js',
                'config/**/*.js',
                'lib/*/index.js'
            ],
            parserOptions: {
                sourceType: 'script',
                ecmaVersion: 2015
            },
            env: {
                browser: false,
                node: true
            }
        }
    ],
    rules: {
        'ember/no-global-jquery': 'off', // turned off due to conflict with ember/new-module-imports
        indent: [
            'error',
            2,
            {
                ignoredNodes: ["TemplateLiteral"],
                SwitchCase: 1
            }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        semi: [
            'error',
            'always'
        ],
        quotes: [
            'error',
            'single'
        ],
        'brace-style': [
            'error',
            '1tbs',
            {
                allowSingleLine: true
            }
        ],
        'keyword-spacing': [
            'error',
            {
                before: true,
                after: true
            }
        ],
        'newline-before-return': [
            'error'
        ],
        'no-trailing-spaces': [
            'error'
        ],
        'object-curly-spacing': [
            'error',
            'always'
        ],
        'array-bracket-spacing': [
            'error',
            'always'
        ],
        'block-spacing': [
            'error'
        ],
        'no-lonely-if': [
            'error'
        ],
        'no-use-before-define': [
            2, 'nofunc'
        ],
        'no-unused-expressions': [
            2,
            {
                allowShortCircuit: true,
                allowTernary: true
            }
        ],
        'prefer-const': [
            'error'
        ],
        'comma-dangle': [
            'error',
            'never'
        ],
        'arrow-parens': [
            'error',
            'always'
        ],
        'require-jsdoc': [
            'error',
            {
                'require': {
                    FunctionDeclaration: true,
                    MethodDefinition: true,
                    ClassDeclaration: true
                }
            }
        ],
        'no-template-curly-in-string': [
            'error'
        ],
        curly: [
            'error',
            'all'
        ],
        eqeqeq: [
            'error',
            'always'
        ],
        'eol-last': [
            'error',
            'always'
        ],
        'comma-spacing': [
            'error'
        ],
        'no-multi-spaces': [
            'error',
            {
                ignoreEOLComments: true
            }
        ],
        'no-else-return': [
            'error'
        ],
        'no-self-compare': [
            'error'
        ],
        'no-lone-blocks': [
            'error'
        ],
        'no-return-assign': [
            'error'
        ],
        'space-in-parens': [
            'error'
        ],
        'space-infix-ops': [
            'error'
        ],
        'space-unary-ops': [
            'error'
        ],
        'switch-colon-spacing': [
            'error'
        ],
        'arrow-spacing': [
            'error'
        ],
        'no-useless-computed-key': [
            'error'
        ],
        'no-useless-rename': [
            'error'
        ],
        'rest-spread-spacing': [
            'error'
        ],
        'dot-location': [
            'error',
            'property'
        ],
        'comma-style': [
            'error'
        ],
        'computed-property-spacing': [
            'error',
            'never'
        ],
        'template-curly-spacing': 'off',
        'dot-notation': [
            'error'
        ],
        'require-await': [
            'error'
        ],
        'generator-star-spacing': [
            'error',
            {
                before: true,
                after: true
            }
        ],
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always'
            }
        ],
        'no-multiple-empty-lines': [
            'error',
            {
                max: 1,
                maxEOF: 1
            }
        ],
        'no-duplicate-imports': [
            'error'
        ]
    }
};
