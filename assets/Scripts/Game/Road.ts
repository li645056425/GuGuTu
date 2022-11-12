import { MushroomTypes } from "./../Constants/Mushroom";
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
import DataBus from "../DataBus";
const { ccclass, property } = _decorator;

const dataBus = new DataBus();
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
  public lingzhiPrfb: Prefab | null = null;
  @property({ type: Prefab })
  public poisonPrfb: Prefab | null = null;

  public paused = false;

  private _curPos: Vec3 = new Vec3();
  private _roadWidth = 75;
  private _grassGroupCount = 7; // 每组草坪的数量，一组能覆盖整个屏幕
  private _grassGroupHeight = 875;
  private _grassCount = 0; // 总共生成的草坪数量
  private _lastAppendY = visibleSize.height; // 上一次扩展草坪时的Y坐标，上一组草坪结束时才扩展
  private _mushroomPools = [];
  private _mushroomRandoms = [];

  start() {
    dataBus.roads.push(this);
    this.node.removeAllChildren();
    this.node.getPosition(this._curPos);
    this._roadWidth = this.node.getComponent(UITransform).width;
    this._grassGroupCount = Math.ceil(visibleSize.height / this._roadWidth); // 每组草坪的数量，一组能覆盖整个屏幕
    this._grassGroupHeight = this._grassGroupCount * this._roadWidth;
    this.initMushroomPools();
    this.initMushroomRandoms();
    this.appendRoad(false);
    this.appendRoad();
    this.appendRoad();
    // setTimeout(() => {
    //   this.moveSpeed *= 2;
    // }, 5000);
  }

  update(deltaTime: number) {
    if (!this.paused) {
      /* 向后移动 */
      this._curPos.y += this.moveSpeed * deltaTime;
      this.node.setPosition(this._curPos);
      /* 每移动一组草坪长度，扩展草坪 */
      if (this._curPos.y - this._lastAppendY > this._grassGroupHeight) {
        this._lastAppendY = this._curPos.y;
        this.appendRoad();
      }
    }
  }

  initMushroomPools() {
    this._mushroomPools = MushroomTypes.map((mushroom) => ({
      ...mushroom,
      prfb: mushroom.isLingzhi
        ? this.lingzhiPrfb
        : mushroom.isPoison
        ? this.poisonPrfb
        : this[`mushroom${mushroom.level}Prfb`],
    }));
  }

  initMushroomRandoms() {
    const level1Mushroom = this._mushroomPools.find(
      (mushroom) => mushroom.level == 1
    );
    const level2Mushroom = this._mushroomPools.find(
      (mushroom) => mushroom.level == 2
    );
    const level3Mushroom = this._mushroomPools.find(
      (mushroom) => mushroom.level == 3
    );
    const level4Mushroom = this._mushroomPools.find(
      (mushroom) => mushroom.level == 4
    );
    const level5Mushroom = this._mushroomPools.find(
      (mushroom) => mushroom.level == 5
    );
    const poisonMushroom = this._mushroomPools.find(
      (mushroom) => mushroom.isPoison
    );
    const lingzhiMushroom = this._mushroomPools.find(
      (mushroom) => mushroom.isLingzhi
    );
    // 30% 25% 15% 10% 5% 15%
    // 6   5   3   2   1  3
    this._mushroomRandoms = [
      level1Mushroom,
      level1Mushroom,
      level1Mushroom,
      level1Mushroom,
      level1Mushroom,
      level1Mushroom,
      level2Mushroom,
      level2Mushroom,
      level2Mushroom,
      level2Mushroom,
      level2Mushroom,
      level3Mushroom,
      level3Mushroom,
      level3Mushroom,
      level4Mushroom,
      level4Mushroom,
      level5Mushroom,
      poisonMushroom,
      poisonMushroom,
      poisonMushroom,
    ];
  }

  appendRoad(withMushrooms = true) {
    for (let i = 0; i < this._grassGroupCount; i++) {
      const grassNode = instantiate(this.grassPrfb);
      const grassHeight = grassNode.getComponent(UITransform).height;
      grassNode.setPosition(0, -grassHeight * (this._grassCount + 0.5), 0);

      const lastGrassNoMushroom =
        this.node.children[this.node.children.length - 1]?.children.length == 0;
      const needMushroom =
        withMushrooms && lastGrassNoMushroom && getProbablyResult(50);
      if (needMushroom) {
        const mushroom =
          this._mushroomRandoms[getRandomInt(0, this._mushroomRandoms.length)];
        const mushroomNode = instantiate(mushroom.prfb);
        mushroomNode.mushroom = mushroom;
        grassNode.addChild(mushroomNode);
      }

      this.node.addChild(grassNode);
      this._grassCount++;
    }
  }
}
