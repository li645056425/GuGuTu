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

  public canFinish = false;

  start() {
    this.bar = this.node.getComponent(ProgressBar);
    this.bar.progress = 0;
  }

  update(deltaTime: number) {}

  begin(callback) {
    let interval = setInterval(() => {
      if (this.bar.progress < 0.7) {
        this.bar.progress += 0.02;
      } else if (this.bar.progress < 1) {
        if (this.canFinish) {
          this.bar.progress += 0.02;
        }
      } else {
        this.bar.progress = 1;
        clearInterval(interval);
        callback && callback();
      }
    }, 20);
  }
}
