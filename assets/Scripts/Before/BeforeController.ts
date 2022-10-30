import { _decorator, Component, Node, view, director } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BeforeController")
export class BeforeController extends Component {
  private _userInfoButton = null;
  private _userInfoButtonDisable = false;

  start() {
    console.log("BeforeController");
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
    }
  }

  update(deltaTime: number) {}

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
