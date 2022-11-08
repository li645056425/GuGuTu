import { _decorator, Component, Node, director } from "cc";
import Manager from "../Game/Manager";
const { ccclass, property } = _decorator;

const manager = new Manager();
@ccclass("BeginButton")
export class BeginButton extends Component {
  start() {}

  update(deltaTime: number) {}

  onClicked() {
    manager.roadNum = 5;
    director.loadScene("Game-5", function () {
      console.log("Success to load Game scene");
    });
  }
}
