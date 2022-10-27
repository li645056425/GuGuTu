import {
  _decorator,
  Component,
  Prefab,
  instantiate,
  Node,
  CCInteger,
  Vec3,
} from "cc";
import { RabbitController } from "./RabbitController";
import { RoadController } from "./RoadController";
const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
  @property({ type: RabbitController })
  public rabbitCtrl: RabbitController | null = null;
  @property({ type: RoadController })
  public roadCtrl: RoadController | null = null;

  private _rabbitPos: Vec3 = new Vec3();

  start() {
    console.log("GameManager start");
  }

  update(deltaTime: number) {
    this.rabbitCtrl.node.getPosition(this._rabbitPos);
    if (this._rabbitPos.y >= this.roadCtrl.getRoadLength()) {
      this.roadCtrl.appendRoad();
      this.roadCtrl.recycleRoad();
    }
  }
}
