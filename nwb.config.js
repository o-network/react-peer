module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'PeerCommunication',
      externals: {
        react: 'React'
      }
    }
  }
}
