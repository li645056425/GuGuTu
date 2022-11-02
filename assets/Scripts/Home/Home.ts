import { _decorator, Component, Node, Prefab } from "cc";
import { getRandomRainNode } from "../Utils/Common";
const { ccclass, property } = _decorator;

@ccclass("Home")
export class Home extends Component {
  @property({ type: Prefab })
  public rain1Prefabs: Prefab | null = null;
  @property({ type: Prefab })
  public rain2Prefabs: Prefab | null = null;
  @property({ type: Prefab })
  public rain3Prefabs: Prefab | null = null;
  @property({ type: Prefab })
  public rain4Prefabs: Prefab | null = null;
  @property({ type: Prefab })
  public rain5Prefabs: Prefab | null = null;

  private _rainInterval = null;

  start() {
    console.log("Home start");
    this.initRains();
  }

  update(deltaTime: number) {}

  initRains() {
    this._rainInterval = setInterval(() => {
      const rainNode = getRandomRainNode([
        this.rain1Prefabs,
        this.rain2Prefabs,
        this.rain3Prefabs,
        this.rain4Prefabs,
        this.rain5Prefabs,
      ]);
      this.node.addChild(rainNode);
    }, 100);
  }

  onDestroy() {
    clearInterval(this._rainInterval);
  }
}
