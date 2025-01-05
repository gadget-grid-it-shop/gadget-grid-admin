/* eslint-env node */

const prettierCheck = 'prettier --write';
const eslintFix = 'eslint --fix';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    '*.{js,jsx,ts,tsx}': [eslintFix, prettierCheck],
    // '*.{css,scss}': [stylelintCheck, prettierCheck],
};
