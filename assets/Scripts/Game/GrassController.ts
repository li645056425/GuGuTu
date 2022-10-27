import { _decorator, Component, Node, Vec3, Sprite, UITransform } from "cc";
const { ccclass, property } = _decorator;

@ccclass("GrassController")
export class GrassController extends Component {
  @property({ displayName: "每秒移动距离", type: Number, step: 1 })
  public disPerSec;
  @property({ displayName: "上一个Grass节点", type: Node })
  public beforeGrass: Node | null = null;

  private _curPos: Vec3 = new Vec3();
  private _height;

  start() {
    this._curPos = this.node.getPosition();
    this._height = this.node.getComponent(UITransform).height;
  }

  update(deltaTime: number) {
    this._curPos.y += this.disPerSec * deltaTime;
    if (this._curPos.y >= this._height) {
      this._curPos.y = this.beforeGrass.getPosition().y - this._height / 2;
    }
    this.node.setPosition(this._curPos);
  }
}
