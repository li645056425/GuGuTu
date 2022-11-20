import { Animation, instantiate, Node, UIOpacity, Vec3, view } from "cc";

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

/* 获取随机位置的雨节点 */
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

/* 显示弹窗 */
export function showDialog(dialog: Node) {
  dialog.active = true;
  const mask = dialog.getChildByName("Mask");
  const content = dialog.getChildByName("Content");
  if (mask) {
    const opacityComp = mask.getComponent(UIOpacity);
    if (opacityComp) {
      opacityComp.opacity = 0;
      let interval = setInterval(() => {
        opacityComp.opacity += 25.5;
        if (opacityComp.opacity >= 255) {
          opacityComp.opacity = 255;
          clearInterval(interval);
        }
      }, 20);
    }
  }
  if (content) {
    const animationComp = content.getComponent(Animation);
    if (animationComp) {
      content.setScale(new Vec3(0, 0, 1));
      animationComp.play("Show");
    }
  }
}

/* 隐藏弹窗 */
export function hideDialog(dialog: Node) {
  const mask = dialog.getChildByName("Mask");
  const content = dialog.getChildByName("Content");
  if (mask) {
    const opacityComp = mask.getComponent(UIOpacity);
    if (opacityComp) {
      opacityComp.opacity = 255;
      let interval = setInterval(() => {
        opacityComp.opacity -= 25.5;
        if (opacityComp.opacity <= 0) {
          opacityComp.opacity = 0;
          clearInterval(interval);
        }
      }, 20);
    }
  }
  if (content) {
    const animationComp = content.getComponent(Animation);
    if (animationComp) {
      animationComp.play("Hide");
      animationComp.once("stop", () => {
        dialog.active = false;
      });
    }
  }
}
