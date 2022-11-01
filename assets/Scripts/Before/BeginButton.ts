import {
  _decorator,
  Component,
  Node,
  director,
  UITransform,
  view,
  Widget,
} from "cc";
const { ccclass, property } = _decorator;

const wx = (window as any).wx;

const designSize = view.getDesignResolutionSize();

@ccclass("BeginButton")
export class BeginButton extends Component {
  start() {
    if (!!wx) {
      this.createUserInfoButton();
    }
  }

  update(deltaTime: number) {}

  createUserInfoButton() {
    const widget = this.node.getComponent(Widget);
    console.log(widget, designSize, window.innerWidth, window.innerHeight);
    const left = window.innerWidth * (widget.left / designSize.width);
    const right = window.innerWidth * (widget.right / designSize.width);
    const top = window.innerHeight * (widget.top / designSize.height);
    const bottom = window.innerHeight * (widget.bottom / designSize.height);
    const width = window.innerWidth - left - right;
    const height = width / 2.343;
    const userInfoButton = wx.createUserInfoButton({
      type: "image",
      image:
        "https://636c-cloud1-2grx9roq71df4f92-1314029866.tcb.qcloud.la/hssbgg/begin.png?sign=4b1a191b062e6914aa7f402a01b09306&t=1667011522",
      style: {
        left,
        top,
        width,
        height,
      },
    });
    this.node.active = false;
    let userInfoButtonDisable = false;
    userInfoButton.onTap((res) => {
      console.log(res);
      if (userInfoButtonDisable) {
        return;
      }
      userInfoButtonDisable = true;
      this.toHome(() => {
        userInfoButton.destroy();
      });
    });
  }

  onClicked() {
    this.toHome();
  }

  toHome(callback?) {
    director.loadScene("Home", function () {
      console.log("Success to load Home scene");
      callback && callback();
    });
  }
}
