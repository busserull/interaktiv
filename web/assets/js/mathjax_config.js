window.MathJax = {
  loader: {
    load: ['[tex]/ams']
  },
  tex: {
    packages: {
      '[+]': ['ams']
    },
    inlineMath: [
      ['$', '$']
    ],
    displayMath: [
      ['$$', '$$']
    ],
    tags: 'ams',
    processEscapes: true,
    processEnvironments: true,
    processRefs: true
  },
  options: {
    renderActions: {
      addMenu: [0, '', '']
    }
  }
}
