import { _decorator, Component, Node } from "cc";
import { FriendRankDialog } from "./FriendRankDialog";
const { ccclass, property } = _decorator;

@ccclass("FriendRankCloseButton")
export class FriendRankCloseButton extends Component {
  @property({ type: FriendRankDialog })
  public friendRankDialog: FriendRankDialog | null = null;

  start() {}

  update(deltaTime: number) {}

  onClicked() {
    this.friendRankDialog.hideDialog();
  }
}
