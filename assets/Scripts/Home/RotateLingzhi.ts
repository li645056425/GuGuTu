import { _decorator, Component, Node, Vec3, view } from "cc";
const { ccclass, property } = _decorator;

const visibleSize = view.getVisibleSize();

@ccclass("RotateLingzhi")
export class RotateLingzhi extends Component {
  private _loopTime = 0;
  private _rotateCenterPos = new Vec3(0, 60, 0);
  private _rotateLingzhiPos = new Vec3();

  start() {
    this.node.setPosition(this._rotateLingzhiPos);
  }

  update(deltaTime: number) {
    this._loopTime += deltaTime;
    // 旋转半径
    const r = visibleSize.width * 0.4;
    // 旋转路径
    this._rotateLingzhiPos.x =
      Math.sin(Math.PI * this._loopTime * 0.45) * r + this._rotateCenterPos.x;
    this._rotateLingzhiPos.y =
      Math.cos(Math.PI * this._loopTime * 0.45) * r + this._rotateCenterPos.y;
    this.node.setPosition(this._rotateLingzhiPos);
  }
}
