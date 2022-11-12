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
  sys,
  AudioSource,
} from "cc";
import DataBus from "../DataBus";
import { getRandomRainNode } from "../Utils/Common";
import { LoadProgressBar } from "./LoadProgressBar";
const { ccclass, property } = _decorator;

const visibleSize = view.getVisibleSize();
const dataBus = new DataBus();

@ccclass("Before")
export class Before extends Component {
  @property({ type: Node })
  public bgm: Node = null;
  @property({ type: LoadProgressBar })
  public loadProgressBar: LoadProgressBar = null;

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
    console.log("Before start");
    this.initRains();
    setTimeout(() => {
      this.loadProgressBar.canFinish = false;
      this.loadProgressBar.load();
      dataBus.loadBundles().then(() => {
        this.loadProgressBar.canFinish = true;
      });
    }, 100);
    director.addPersistRootNode(this.bgm);
    dataBus.bgm = this.bgm;
    if (sys.localStorage.getItem("bgmPaused")) {
      this.bgm.getComponent(AudioSource).pause();
    } else {
      this.bgm.getComponent(AudioSource).play();
    }
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
