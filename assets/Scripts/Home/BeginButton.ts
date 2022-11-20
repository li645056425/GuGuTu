import { _decorator, Component, Node, director, sys } from "cc";
import { GameStatus } from "../Constants/GameStatus";
import DataBus from "../DataBus";
const { ccclass, property } = _decorator;

const dataBus = new DataBus();
@ccclass("BeginButton")
export class BeginButton extends Component {
  start() {}

  update(deltaTime: number) {}

  onClicked() {
    const leasonLearned = sys.localStorage.getItem("leasonLearned");
    if (leasonLearned) {
      dataBus.startGame();
    } else {
      dataBus.learnLeason();
    }
  }
}
