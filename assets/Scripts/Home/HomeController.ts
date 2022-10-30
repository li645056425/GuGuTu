import {
  _decorator,
  Component,
  director,
  Prefab,
  instantiate,
  Node,
  CCInteger,
  Label,
} from "cc";
import { FriendRankDialogController } from "./FriendRankDialogController";
const { ccclass, property } = _decorator;

@ccclass("HomeController")
export class HomeController extends Component {
  @property({ type: FriendRankDialogController })
  public friendRankDialogCtrl: FriendRankDialogController | null = null;

  start() {}

  onStartButtonClicked() {
    console.log("onStartButtonClicked");
    director.loadScene("Game", function () {
      console.log("Success to load Game scene");
    });
  }

  onFriendRankButtonClicked() {
    console.log("onFriendRankButtonClicked");
    this.friendRankDialogCtrl.showDialog();
  }
}
