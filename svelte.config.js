// svelte.config.js
const preprocess = require('svelte-preprocess')

module.exports = {
    preprocess: preprocess({
        renderSync: true,
        implementation: 'sass',
    }),
}
