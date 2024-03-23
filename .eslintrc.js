module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    ecmaVersion: "latest",
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    "perfectionist",
    "unused-imports",
    "@typescript-eslint",
    "prettier"
  ],
  extends: [
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "prettier"
  ],
  settings: {
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true
      }
    }
  },
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "no-alert": 0,
    "camelcase": 0,
    "no-console": 0,
    "no-unused-vars": 0,
    "no-param-reassign": 0,
    "no-underscore-dangle": 0,
    "no-restricted-exports": 0,
    "react/no-children-prop": 0,
    "react/react-in-jsx-scope": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "react/no-array-index-key": 0,
    "no-promise-executor-return": 0,
    "react/require-default-props": 0,
    "react/jsx-props-no-spreading": 0,
    "import/prefer-default-export": 0,
    "react/function-component-definition": 0,
    "@typescript-eslint/naming-convention": 0,
    "jsx-a11y/control-has-associated-label": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "react/jsx-no-useless-fragment": [
      1,
      {
        "allowExpressions": true
      }
    ],
    "prefer-destructuring": [
      1,
      {
        "object": true,
        "array": false
      }
    ],
    "react/no-unstable-nested-components": [
      1,
      {
        "allowAsProps": true
      }
    ],
    "@typescript-eslint/no-unused-vars": [
      1,
      {
        "args": "none"
      }
    ],
    "react/jsx-no-duplicate-props": [
      1,
      {
        "ignoreCase": false
      }
    ],
    // unused-imports
    // https://www.npmjs.com/package/eslint-plugin-unused-imports
    "unused-imports/no-unused-imports": 1,
    "unused-imports/no-unused-vars": [
      0,
      {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }
    ],
    // perfectionist
    // https://eslint-plugin-perfectionist.azat.io/
    "perfectionist/sort-named-imports": [
      1,
      {
        "order": "asc",
        "type": "line-length"
      }
    ],
    "perfectionist/sort-named-exports": [
      1,
      {
        "order": "asc",
        "type": "line-length"
      }
    ],
    "perfectionist/sort-exports": [
      1,
      {
        "order": "asc",
        "type": "line-length"
      }
    ],
    "perfectionist/sort-imports": [
      1,
      {
        "order": "asc",
        "type": "line-length",
        "newlines-between": "always",
        "groups": [
          [
            "builtin",
            "external"
          ],
          "custom-utils",
          "internal",
          "custom-types",
          [
            "parent",
            "sibling",
            "index"
          ],
          "object",
          "unknown"
        ],
        "custom-groups": {
          "value": {
            "custom-utils": "src/utils/**",
            "custom-types": "src/types/**"
          }
        },
        "internal-pattern": [
          "src/**"
        ]
      }
    ]
  },
};