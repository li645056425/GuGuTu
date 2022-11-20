import {
  _decorator,
  Component,
  Node,
  ProgressBar,
  ProgressBarComponent,
} from "cc";
import DataBus from "../DataBus";
const { ccclass, property } = _decorator;

const dataBus = new DataBus();

@ccclass("LoadProgress")
export class LoadProgress extends Component {
  private _bar = null;

  private _loadInterval = null;

  start() {
    this._bar = this.node
      .getChildByName("ProgressBar")
      .getComponent(ProgressBar);
    this._bar.progress = 0;
  }

  update(deltaTime: number) {}

  load(finish?) {
    this._bar.progress += 0.02;
    this._loadInterval = setInterval(() => {
      if (this._bar.progress < 1) {
        this._bar.progress += 0.02;
        this._bar.progress = Math.min(1, this._bar.progress);
      }
      if (dataBus.loadCanFinish) {
        this._bar.progress = 1;
        clearInterval(this._loadInterval);
        finish && finish();
      }
    }, 20);
  }

  onDestroy() {
    clearInterval(this._loadInterval);
  }
}
