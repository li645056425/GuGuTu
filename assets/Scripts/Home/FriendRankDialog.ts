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
import { hideDialog, showDialog } from "../Utils/Common";
const { ccclass, property } = _decorator;

const env = window.wx || window.tt || window.swan;

@ccclass("FriendRankDialog")
export class FriendRankDialog extends Component {
  start() {
    this.node.active = false;
  }

  update(deltaTime: number) {}

  show() {
    if (env) {
      console.log("postMessage renderFriendRankList");
      env.getOpenDataContext().postMessage({
        type: "renderFriendRankList",
      });
      showDialog(this.node);
    }
  }

  hide() {
    hideDialog(this.node);
  }

  onCloseClicked() {
    this.hide();
  }
}
