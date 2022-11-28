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

const designSize = view.getDesignResolutionSize();

@ccclass("BeginButton")
export class BeginButton extends Component {
  private _buttonClicked = false;

  start() {
    if (!!dataBus.wx) {
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
    const userInfoButton = dataBus.wx.createUserInfoButton({
      type: "image",
      image:
        "https://hzwimspic-1251601690.image.myqcloud.com/10dd9680-6eca-11ed-a84b-e3e5956aeb91_size_298x128",
      style: {
        left,
        top,
        width,
        height,
      },
    });
    userInfoButton.onTap((res) => {
      console.log(res);
      if (!dataBus.allLoaded) {
        return;
      }
      if (this._buttonClicked) {
        return;
      }
      this._buttonClicked = true;
      /* 更新用户信息 */
      // getPositionInfo().then((positionInfo) => {
      //   console.log(positionInfo);
      // });
      this.toHome().then(() => {
        userInfoButton.destroy();
      });
    });
  }

  onClicked() {
    if (!dataBus.allLoaded) {
      return;
    }
    if (this._buttonClicked) {
      return;
    }
    this._buttonClicked = true;
    this.toHome();
  }

  toHome() {
    return new Promise((resolve) => {
      director.loadScene("Home", () => {
        console.log("Success to load Home scene");
        resolve("success");
      });
    });
  }
}
