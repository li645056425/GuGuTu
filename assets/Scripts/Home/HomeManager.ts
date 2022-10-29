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
const { ccclass, property } = _decorator;

const env = window.wx || window.tt || window.swan;

@ccclass("HomeManager")
export class HomeManager extends Component {
  start() {
    console.log("HomeManager start");
    if (env) {
      setTimeout(() => {
        console.log("postMessage");
        env.getOpenDataContext().postMessage({
          type: "renderFriendRankList",
        });
      }, 3000);
    }
  }

  onStartButtonClicked() {
    console.log("onStartButtonClicked");
    director.loadScene("Game", function () {
      console.log("Success to load Game scene");
    });
  }
}
