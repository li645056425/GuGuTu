import {
  _decorator,
  Component,
  Node,
  view,
  director,
  ProgressBar,
  UITransform,
  Vec3,
  Prefab,
} from "cc";
import { getRandomRainNode } from "../Utils/Common";
const { ccclass, property } = _decorator;

const visibleSize = view.getVisibleSize();

@ccclass("BeforeController")
export class BeforeController extends Component {
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
    console.log("BeforeController start");
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
