import { _decorator, Component, Node, director } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BeginButton")
export class BeginButton extends Component {
  start() {}

  update(deltaTime: number) {}

  onClicked() {
    director.loadScene("Game", function () {
      console.log("Success to load Game scene");
    });
  }
}
