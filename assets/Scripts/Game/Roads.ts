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

@ccclass("Roads")
export class Roads extends Component {
  @property({ displayName: "移动速度", type: Number, step: 1 })
  public moveSpeed = 125;
  @property({ displayName: "路的条数", type: Number, step: 1 })
  public roadCount = 5;
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
  private _roadList = new Array(this.roadCount).fill([]);
  private _roadWidth;
  private _grassGroupCount; // 每组草坪的数量，一组能覆盖整个屏幕
  private _grassGroupHeight;
  private _grassCountList = new Array(this.roadCount).fill(0); // 每条路总共生成的草坪数量
  private _lastAppendY = visibleSize.height; // 上一次扩展草坪时的Y坐标，上一组草坪结束时才扩展
  private _mushroomPools = [];
  private _mushroomRandoms = [];

  start() {
    dataBus.roads = this;
    this.node.removeAllChildren();
    this.node.getPosition(this._curPos);
    this._roadWidth =
      this.node.getComponent(UITransform).width / this.roadCount;
    this._grassGroupCount = Math.ceil(visibleSize.height / this._roadWidth); // 每组草坪的数量，一组能覆盖整个屏幕
    this._grassGroupHeight = this._grassGroupCount * this._roadWidth;

    this.initMushroomPools();
    this.initMushroomRandoms();
    this.appendRoad(false);
    this.appendRoad();
    this.appendRoad();
    // 加速
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

  appendRoad(withMushroom = true) {
    const roadList = new Array(this.roadCount).fill([]);
    for (const roadIndex in roadList) {
      for (
        let grassIndex = 0;
        grassIndex < this._grassGroupCount;
        grassIndex++
      ) {
        const needMushroom = withMushroom && getProbablyResult(50);
        const mushroom = needMushroom
          ? this._mushroomRandoms[getRandomInt(0, this._mushroomRandoms.length)]
          : null;
        roadList[roadIndex].push({
          mushroom,
        });
      }
    }
    for (
      let grassIndex = 0;
      grassIndex <= roadList[0].length - 1;
      grassIndex++
    ) {
      for (let roadIndex = 0; roadIndex <= roadList.length - 1; roadIndex++) {
        if (roadList[roadIndex][grassIndex].mushroom) {
          if (roadList[roadIndex - 1]) {
            if (
              (!roadList[roadIndex - 1][grassIndex - 1] ||
                roadList[roadIndex - 1][grassIndex - 1].mushroom) &&
              (!roadList[roadIndex - 1][grassIndex + 1] ||
                roadList[roadIndex - 1][grassIndex + 1].mushroom)
            ) {
              // 上一层两侧不能都有
              roadList[roadIndex][grassIndex].mushroom = null;
            }
          }
        }
      }
    }
    let roadX = 0;
    for (const road of roadList) {
      let grassY = 0;
      for (const grass of road) {
        const grassNode = instantiate(this.grassPrfb);
        grassNode.getComponent(UITransform).width = this._roadWidth;
        grassNode.getComponent(UITransform).height = this._roadWidth;
        grassNode.setPosition(roadX, grassY, 0);
        if (grass.mushroom) {
          const mushroomNode = instantiate(grass.mushroom.prfb);
          mushroomNode.mushroom = grass.mushroom;
          grassNode.addChild(mushroomNode);
        }
        this.node.addChild(grassNode);
        grassY += this._roadWidth;
      }
      roadX += this._roadWidth;
    }
  }
}
