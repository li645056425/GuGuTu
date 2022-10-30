import {
  _decorator,
  Component,
  Node,
  Vec3,
  Sprite,
  UITransform,
  Prefab,
  instantiate,
  view,
} from "cc";
import { getProbablyResult } from "../Utils/Common";
const { ccclass, property } = _decorator;

const visibleSize = view.getVisibleSize();
@ccclass("RoadController")
export class RoadController extends Component {
  @property({ displayName: "移动速度", type: Number, step: 1 })
  public moveSpeed = 125;
  @property({ type: Prefab })
  public grassPrfb: Prefab | null = null;
  @property({ type: Prefab })
  public mushroomPrfb: Prefab | null = null;

  private _curPos: Vec3 = new Vec3();
  private _roadWidth = 125;
  private _grassGroupCount = 7; // 每组草坪的数量，一组能覆盖整个屏幕
  private _grassGroupHeight = 875;
  private _grassCount = 0; // 总共生成的草坪数量
  private _lastAppendY = visibleSize.height; // 上一次扩展草坪时的Y坐标，上一组草坪结束时才扩展

  start() {
    this.node.getPosition(this._curPos);
    this.node.removeAllChildren();
    this._roadWidth = this.node
      .getComponent(UITransform)
      .getBoundingBox().width;
    this._grassGroupCount = Math.ceil(visibleSize.height / this._roadWidth); // 每组草坪的数量，一组能覆盖整个屏幕
    this._grassGroupHeight = this._grassGroupCount * this._roadWidth;
    this.appendRoad();
    this.appendRoad();
    this.appendRoad();
  }

  update(deltaTime: number) {
    /* 向后移动 */
    this._curPos.y += this.moveSpeed * deltaTime;
    this.node.setPosition(this._curPos);
    /* 每移动一组草坪长度，扩展草坪 */
    if (this._curPos.y - this._lastAppendY > this._grassGroupHeight) {
      this._lastAppendY = this._curPos.y;
      this.appendRoad();
    }
  }

  appendRoad() {
    for (let i = 0; i < this._grassGroupCount; i++) {
      const hasMushroom = getProbablyResult(10);
      const grassNode = instantiate(this.grassPrfb);
      const grassHeight = grassNode
        .getComponent(UITransform)
        .getBoundingBox().height;
      grassNode.setPosition(0, -grassHeight * (this._grassCount + 0.5), 0);
      this.node.addChild(grassNode);
      if (hasMushroom) {
        const mushroomNode = instantiate(this.mushroomPrfb);
        grassNode.addChild(mushroomNode);
      }
      this._grassCount++;
    }
  }
}
