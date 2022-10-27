/* [min, max)区间随机值 */
export function getRandomInt(min, max) {
  // min最小值，max最大值
  return Math.floor(Math.random() * (max - min) + min);
}

/* 根据概率返回结果 */
export function getProbablyResult(probability) {
  return getRandomInt(0, 100) < probability;
}
