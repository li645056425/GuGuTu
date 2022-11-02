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
import { getProbablyResult, getRandomInt } from "../Utils/Common";
const { ccclass, property } = _decorator;

const visibleSize = view.getVisibleSize();
@ccclass("Road")
export class Road extends Component {
  @property({ displayName: "移动速度", type: Number, step: 1 })
  public moveSpeed = 125;
  @property({ type: Prefab })
  public grassPrfb: Prefab | null = null;
  @property({ type: Prefab })
  public mushroom1Prfb: Prefab | null = null;
  @property({ type: Prefab })
  public mushroom2Prfb: Prefab | null = null;
  @property({ type: Prefab })
  public mushroom3Prfb: Prefab | null = null;
  @property({ type: Prefab })
  public mushroom4Prfb: Prefab | null = null;
  @property({ type: Prefab })
  public mushroom5Prfb: Prefab | null = null;
  @property({ type: Prefab })
  public poisonPrfb: Prefab | null = null;

  private _curPos: Vec3 = new Vec3();
  private _roadWidth = 75;
  private _grassGroupCount = 7; // 每组草坪的数量，一组能覆盖整个屏幕
  private _grassGroupHeight = 875;
  private _grassCount = 0; // 总共生成的草坪数量
  private _lastAppendY = visibleSize.height; // 上一次扩展草坪时的Y坐标，上一组草坪结束时才扩展
  private _randomMushroomPools = [];

  start() {
    this.node.removeAllChildren();
    this.node.getPosition(this._curPos);
    this._roadWidth = this.node.getComponent(UITransform).width;
    this._grassGroupCount = Math.ceil(visibleSize.height / this._roadWidth); // 每组草坪的数量，一组能覆盖整个屏幕
    this._grassGroupHeight = this._grassGroupCount * this._roadWidth;
    this.initRandomMushroomPools();
    this.appendRoad();
    this.appendRoad();
    this.appendRoad();
    // setTimeout(() => {
    //   this.moveSpeed *= 2;
    // }, 5000);
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

  initRandomMushroomPools() {
    // 30% 25% 15% 10% 5% 15%
    // 6   5   3   2   1  3
    this._randomMushroomPools = [
      this.mushroom1Prfb,
      this.mushroom1Prfb,
      this.mushroom1Prfb,
      this.mushroom1Prfb,
      this.mushroom1Prfb,
      this.mushroom1Prfb,
      this.mushroom2Prfb,
      this.mushroom2Prfb,
      this.mushroom2Prfb,
      this.mushroom2Prfb,
      this.mushroom2Prfb,
      this.mushroom3Prfb,
      this.mushroom3Prfb,
      this.mushroom3Prfb,
      this.mushroom4Prfb,
      this.mushroom4Prfb,
      this.mushroom5Prfb,
      this.poisonPrfb,
      this.poisonPrfb,
      this.poisonPrfb,
    ];
  }

  appendRoad() {
    for (let i = 0; i < this._grassGroupCount; i++) {
      const hasMushroom = getProbablyResult(30);
      const grassNode = instantiate(this.grassPrfb);
      const grassHeight = grassNode.getComponent(UITransform).height;
      grassNode.setPosition(0, -grassHeight * (this._grassCount + 0.5), 0);
      this.node.addChild(grassNode);
      if (hasMushroom) {
        const mushroomNode = instantiate(this.getRandomMushroom());
        grassNode.addChild(mushroomNode);
      }
      this._grassCount++;
    }
  }

  getRandomMushroom() {
    return this._randomMushroomPools[
      getRandomInt(0, this._randomMushroomPools.length)
    ];
  }
}
