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
  AudioClip,
} from "cc";
import DataBus from "../DataBus";
import { getPositionInfo, getRandomRainNode } from "../Utils/Common";
import { LoadProgress } from "./LoadProgress";
const { ccclass, property } = _decorator;

const visibleSize = view.getVisibleSize();
const dataBus = new DataBus();

@ccclass("Before")
export class Before extends Component {
  @property({ type: Node })
  public bgm: Node = null;
  @property({ type: LoadProgress })
  public loadProgress: LoadProgress = null;

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
    this.initBgm();
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

  initBgm() {
    // setTimeout：等loadProgress初始化结束后再执行
    setTimeout(() => {
      this.loadProgress.canFinish = false;
      this.loadProgress.load();
      dataBus.loadBundles().then(() => {
        dataBus.resourcesBundle.load("bgm", AudioClip, (err, audioClip) => {
          const audioSourceComp = this.bgm.getComponent(AudioSource);
          audioSourceComp.clip = audioClip;
          if (sys.localStorage.getItem("bgmPaused")) {
            audioSourceComp.pause();
          } else {
            audioSourceComp.play();
          }
          dataBus.bgmAudioSource = audioSourceComp;
          this.loadProgress.canFinish = true;
          dataBus.allLoaded = true;
        });
      });
    }, 100);
    director.addPersistRootNode(this.bgm);
  }

  onDestroy() {
    clearInterval(this._rainInterval);
  }
}
