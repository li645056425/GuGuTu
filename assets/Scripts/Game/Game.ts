import {
  _decorator,
  Component,
  Prefab,
  instantiate,
  Node,
  CCInteger,
  Vec3,
  view,
} from "cc";

const { ccclass, property } = _decorator;

@ccclass("Game")
export class Game extends Component {
  start() {
    console.log("Game start");
  }

  update(deltaTime: number) {}
}
