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
    let interval = setInterval(() => {
      if (dataBus.allLoaded && dataBus.configData) {
        clearInterval(interval);
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
          image: dataBus.configData?.startButton.imgUrl,
          style: {
            left,
            top,
            width,
            height,
          },
        });
        userInfoButton.onTap((res) => {
          console.log(res);
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
    }, 100);
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
