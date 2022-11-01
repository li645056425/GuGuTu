import { _decorator, Component, Node, Vec3, view } from "cc";
const { ccclass, property } = _decorator;

const visibleSize = view.getVisibleSize();

@ccclass("RotateRabbit")
export class RotateRabbit extends Component {
  private _loopTime = 0;
  private _rotateCenterPos = new Vec3(0, 0, 0);
  private _rotateRabbitPos = new Vec3();

  start() {
    this.node.setPosition(this._rotateRabbitPos);
  }

  update(deltaTime: number) {
    this._loopTime += deltaTime;
    // 旋转半径
    const r = visibleSize.width * 0.2;
    // 旋转路径
    this._rotateRabbitPos.x =
      Math.sin(Math.PI * this._loopTime * 0.5) * r + this._rotateCenterPos.x;
    this._rotateRabbitPos.y =
      Math.cos(Math.PI * this._loopTime * 0.5) * r + this._rotateCenterPos.y;
    this.node.setPosition(this._rotateRabbitPos);
  }
}
