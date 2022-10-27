import {
  _decorator,
  Component,
  Node,
  Vec3,
  Sprite,
  UITransform,
  Prefab,
  instantiate,
} from "cc";
import { getProbablyResult } from "../../Utils/Common";
const { ccclass, property } = _decorator;

@ccclass("RoadController")
export class RoadController extends Component {
  @property({ displayName: "每秒移动距离", type: Number, step: 1 })
  public disPerSec;
  @property({ displayName: "上一个Grass节点", type: Node })
  public beforeGrass: Node | null = null;
  @property({ type: Prefab })
  public grassPrfb: Prefab | null = null;
  @property({ type: Prefab })
  public mushroomPrfb: Prefab | null = null;

  private _curSca: Vec3 = new Vec3(1, 1, 1);
  private _grassNodes = [];
  private _grassCount = 0;

  start() {
    this.node.getScale(this._curSca);
    this.appendRoad();
  }

  update(deltaTime: number) {}

  appendRoad() {
    for (let i = 0; i < 10; i++) {
      const hasMushroom = getProbablyResult(30);
      const grassNode = instantiate(this.grassPrfb);
      grassNode.setPosition(0, -this._grassCount, 0);
      this.node.addChild(grassNode);
      if (hasMushroom) {
        const mushroomNode = instantiate(this.mushroomPrfb);
        mushroomNode.setPosition(0, 0, 1);
        grassNode.addChild(mushroomNode);
      }
      this._grassNodes.push(grassNode);
      this._grassCount++;
    }
  }

  recycleRoad() {
    const deleteNodes = this._grassNodes.splice(0, 10);
    deleteNodes.forEach((node) => {
      this.node.removeChild(node);
    });
  }

  getRoadLength() {
    return this._curSca.y * this._grassCount;
  }
}
