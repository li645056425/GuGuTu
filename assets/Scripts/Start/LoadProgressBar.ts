import {
  _decorator,
  Component,
  Node,
  ProgressBar,
  ProgressBarComponent,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("LoadProgressBar")
export class LoadProgressBar extends Component {
  private _bar = null;

  public canFinish = true;
  private _loadInterval = null;

  start() {
    this._bar = this.node.getComponent(ProgressBar);
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
      if (this.canFinish) {
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
