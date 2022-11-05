import {
  _decorator,
  Component,
  Node,
  Graphics,
  UITransform,
  CCObject,
  Animation,
  AnimationComponent,
  __private,
  view,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

const env = window.wx || window.tt || window.swan;

@ccclass("FriendRankDialog")
export class FriendRankDialog extends Component {
  private _animation: Animation = null;

  start() {
    this.node.active = false;
    this._animation = this.node.getComponent(Animation);
  }

  update(deltaTime: number) {}

  showDialog() {
    if (env) {
      console.log("postMessage renderFriendRankList");
      env.getOpenDataContext().postMessage({
        type: "renderFriendRankList",
      });
      this.node.setScale(new Vec3(0, 0, 1));
      this.node.active = true;
      this._animation.play("Show");
    }
  }

  hideDialog() {
    this._animation.play("Hide");
    this._animation.once("stop", () => {
      this.node.active = false;
    });
  }
}
