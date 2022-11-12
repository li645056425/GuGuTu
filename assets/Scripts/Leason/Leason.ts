import { _decorator, Component, Node, sys, input, Input, director } from "cc";
import DataBus from "../DataBus";

const { ccclass, property } = _decorator;
const dataBus = new DataBus();

@ccclass("Leason")
export class Leason extends Component {
  @property({ type: Node })
  public leasonList: Node[] = [];

  private _leasonIndex = 0;

  start() {
    this.showLeason();
    input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
  }

  update(deltaTime: number) {}

  showLeason() {
    this.leasonList.forEach((leason, index) => {
      if (index == this._leasonIndex) {
        leason.active = true;
      } else {
        leason.active = false;
      }
    });
  }

  onTouchStart() {
    if (this._leasonIndex < this.leasonList.length - 1) {
      this._leasonIndex++;
      this.showLeason();
    } else {
      sys.localStorage.setItem("leasonLearned", "1");
      dataBus.start();
    }
  }
}
