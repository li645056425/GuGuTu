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
  @property({ type: Node })
  public progressBarNode: Node = null;
  @property({ type: Node })
  public rotateRabbitNode: Node = null;
  @property({ type: Node })
  public rotateMushroomNode: Node = null;
  @property({ type: Node })
  public rotateLingzhiNode: Node = null;

  private _userInfoButton = null;
  private _userInfoButtonDisable = true;
  private _resourceLoaded = false;
  private _loopTime = 0;
  private _rotateCenterPos = new Vec3(0, 0, 0);
  private _rotateRabbitPos = new Vec3();
  private _rotateMushroomPos = new Vec3();
  private _rotateLingzhiPos = new Vec3();

  start() {
    console.log("BeforeController start");
    this.initRains();
    this.initProgressBar();
    this.initRotatePoses();
    this.createUserInfoButton();
  }

  update(deltaTime: number) {
    this._loopTime += deltaTime;
    this.rotateRabbit();
    this.rotateMushroom();
    this.rotateLingzhi();
  }

  initRains() {
    setInterval(() => {
      const rainNode = getRandomRainNode([
        this.rain1Prefabs,
        this.rain2Prefabs,
      ]);
      this.node.addChild(rainNode);
    }, 100);
  }

  initRotatePoses() {
    this.rotateRabbitNode.setPosition(this._rotateRabbitPos);
    this.rotateMushroomNode.setPosition(this._rotateMushroomPos);
    this.rotateLingzhiNode.setPosition(this._rotateLingzhiPos);
  }

  rotateRabbit() {
    // 旋转半径
    const r = visibleSize.width * 0.2;
    // 旋转路径
    this._rotateRabbitPos.x =
      Math.sin(Math.PI * this._loopTime * 0.5) * r + this._rotateCenterPos.x;
    this._rotateRabbitPos.y =
      Math.cos(Math.PI * this._loopTime * 0.5) * r + this._rotateCenterPos.y;
    this.rotateRabbitNode.setPosition(this._rotateRabbitPos);
  }

  rotateMushroom() {
    // 旋转半径
    const r = visibleSize.width * 0.3;
    // 旋转路径
    this._rotateMushroomPos.x =
      Math.sin(Math.PI * this._loopTime * 0.4) * r + this._rotateCenterPos.x;
    this._rotateMushroomPos.y =
      Math.cos(Math.PI * this._loopTime * 0.4) * r + this._rotateCenterPos.y;
    this.rotateMushroomNode.setPosition(this._rotateMushroomPos);
  }

  rotateLingzhi() {
    // 旋转半径
    const r = visibleSize.width * 0.4;
    // 旋转路径
    this._rotateLingzhiPos.x =
      Math.sin(Math.PI * this._loopTime * 0.45) * r + this._rotateCenterPos.x;
    this._rotateLingzhiPos.y =
      Math.cos(Math.PI * this._loopTime * 0.45) * r + this._rotateCenterPos.y;
    this.rotateLingzhiNode.setPosition(this._rotateLingzhiPos);
  }

  initProgressBar() {
    const bar = this.progressBarNode
      .getChildByName("Bar")
      .getComponent(ProgressBar);
    bar.progress = 0;
    let interval = setInterval(() => {
      if (bar.progress < 0.7) {
        bar.progress += 0.02;
      } else if (bar.progress < 1) {
        if (this._resourceLoaded) {
          bar.progress += 0.02;
        }
      } else {
        this._userInfoButtonDisable = false;
        bar.progress = 1;
        clearInterval(interval);
        interval = null;
      }
    }, 20);
  }

  createUserInfoButton() {
    try {
      const systemInfo = wx.getSystemInfoSync();
      const safeArea = systemInfo.safeArea;
      const buttonWidth = safeArea.width / 2;
      const buttonHeight = buttonWidth / 2;
      this._userInfoButton = wx.createUserInfoButton({
        type: "image",
        image:
          "https://636c-cloud1-2grx9roq71df4f92-1314029866.tcb.qcloud.la/hssbgg/begin.png?sign=4b1a191b062e6914aa7f402a01b09306&t=1667011522",
        style: {
          left: safeArea.width / 2 - buttonWidth / 2,
          top: safeArea.top + safeArea.height - buttonHeight * 2,
          width: buttonWidth,
          height: buttonHeight,
        },
      });
      this._userInfoButton.onTap(this.onUserInfoButtonTap.bind(this));
    } catch (error) {
      console.error(error);
    } finally {
      this._resourceLoaded = true;
    }
  }

  onUserInfoButtonTap(res) {
    if (this._userInfoButtonDisable) {
      return;
    }
    this._userInfoButtonDisable = true;
    console.log("onUserInfoButtonTap", res);
    director.loadScene("Home", () => {
      console.log("Success to load Home scene");
      this._userInfoButton.destroy();
      this._userInfoButtonDisable = false;
    });
  }
}
