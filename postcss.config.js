module.exports = {
  plugins: {
    'postcss-preset-env': {
      stage: 0,
      feature: {
        'nesting-rules': true
      }
    },
    tailwindcss: {},
    autoprefixer: {}
  }
}
