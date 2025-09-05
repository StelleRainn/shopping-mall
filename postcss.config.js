module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // 标准屏幕宽度
      // 设计图750 → 调成1倍，适应375屏幕
      // 设计图640 → 调成1倍，适应320屏幕
      viewportWidth: 375
    }
  }
}
