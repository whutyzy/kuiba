module.exports = {
  presets: [
    [
      '@kuiba/cli/preset',
      {
        loose: process.env.NODE_ENV === 'compile',
      },
    ],
  ],
}
