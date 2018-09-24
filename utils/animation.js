function scaleAnim() {
  const animation = wx.createAnimation({
    duration: 200,
    timingFunction: 'ease',
  });
  animation.scale(1.2, 1.2).step();
  animation.scale(1, 1).step();
  return animation;
}

module.exports = {
  scaleAnim,
};
