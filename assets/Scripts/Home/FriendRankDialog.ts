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
import DataBus from "../DataBus";
import { hideDialog, showDialog } from "../Utils/Common";
const { ccclass, property } = _decorator;

const dataBus = new DataBus();

@ccclass("FriendRankDialog")
export class FriendRankDialog extends Component {
  start() {
    this.node.active = false;
  }

  update(deltaTime: number) {}

  show() {
    console.log("postMessage renderFriendRankList");
    dataBus.wx?.getOpenDataContext().postMessage({
      type: "renderFriendRankList",
    });
    showDialog(this.node);
  }

  hide() {
    hideDialog(this.node);
  }

  onCloseClicked() {
    this.hide();
  }
}
