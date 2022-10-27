import {
  _decorator,
  Component,
  director,
  Prefab,
  instantiate,
  Node,
  CCInteger,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("HomeManager")
export class HomeManager extends Component {
  start() {
    console.log("HomeManager start");
  }

  onStartButtonClicked() {
    console.log("onStartButtonClicked");
    director.loadScene("Game", function () {
      console.log("Success to load Game scene");
    });
  }
}
