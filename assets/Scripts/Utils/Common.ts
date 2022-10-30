import { Animation, instantiate, Vec3, view } from "cc";

const visibleSize = view.getVisibleSize();

/* [min, max)区间随机值 */
export function getRandomInt(min, max) {
  // min最小值，max最大值
  return Math.floor(Math.random() * (max - min) + min);
}

/* 根据概率返回结果 */
export function getProbablyResult(probability) {
  return getRandomInt(0, 100) < probability;
}

export function getRandomRainNode(prebs = []) {
  const x = getRandomInt(
    Math.floor(-visibleSize.width / 2),
    Math.ceil(visibleSize.width / 2)
  );
  const preb = prebs[getRandomInt(0, prebs.length)];
  const node = instantiate(preb);
  node.setPosition(x, visibleSize.height * 0.55, 0);
  setTimeout(() => {
    node.destroy();
  }, 2000);
  return node;
}
