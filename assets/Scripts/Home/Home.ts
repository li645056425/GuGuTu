import { _decorator, Component, Node, Prefab } from "cc";
import DataBus from "../DataBus";
import { getRandomRainNode } from "../Utils/Common";
const { ccclass, property } = _decorator;

const dataBus = new DataBus();
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

    dataBus.wx?.cloud
      .callFunction({ name: "get_my_highest_score_simple" })
      .then((res) => {
        const myHighestScore = res.result;
        if (myHighestScore) {
          const {
            createTime = Date.now(),
            duration = 0,
            scoreNum = 0,
            lingzhiNum = 0,
          } = myHighestScore;
          dataBus.wx.setUserCloudStorage({
            KVDataList: [
              {
                key: "highestScore",
                value: `${createTime}_${duration}_${scoreNum}_${lingzhiNum}`,
              },
            ],
            success: (res) => {
              console.log(res);
            },
            fail: (err) => {
              console.error(err);
            },
          });
        }
      });
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
