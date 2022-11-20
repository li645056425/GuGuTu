import {
  _decorator,
  Component,
  Node,
  director,
  UITransform,
  view,
  Widget,
  loader,
  assetManager,
} from "cc";
import DataBus from "../DataBus";
const { ccclass, property } = _decorator;
const dataBus = new DataBus();
const wx = (window as any).wx;

const designSize = view.getDesignResolutionSize();

@ccclass("BeginButton")
export class BeginButton extends Component {
  start() {
    if (!!wx) {
      this.node.active = false;
      this.createUserInfoButton();
    }
  }

  update(deltaTime: number) {}

  createUserInfoButton() {
    const widget = this.node.getComponent(Widget);
    const transform = this.node.getComponent(UITransform);
    console.log(widget.left, widget.right, widget.top, widget.bottom);
    console.log(transform.width, transform.height);
    const left = window.innerWidth * widget.left; // 百分比widget
    const top = window.innerHeight * widget.top;
    const width = window.innerWidth * (1 - widget.left - widget.right);
    const height = width * (transform.height / transform.width);
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

  async toHome(callback?) {
    if (dataBus.loadCanFinish) {
      director.loadScene("Home", () => {
        console.log("Success to load Home scene");
        callback && callback();
      });
    }
  }
}
