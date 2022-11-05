import {
  _decorator,
  Component,
  Node,
  Label,
  resources,
  SpriteFrame,
  Sprite,
} from "cc";
import Manager from "./Manager";
const { ccclass, property } = _decorator;

const manager = new Manager();

@ccclass("Scoreboard")
export class Scoreboard extends Component {
  private _lingzhiList: Node = null;
  private _lingzhiNum: Node = null;

  start() {
    manager.scoreboard = this;
    this._lingzhiList = this.node.getChildByName("LingzhiList");
    this._lingzhiNum = this.node.getChildByName("LingzhiNum");
    this._lingzhiNum.active = false;
  }

  update(deltaTime: number) {}

  refresh() {
    if (manager.gameScore.lingzhiNum > 7) {
      this._lingzhiNum
        .getChildByName("Num")
        .getComponent(Label).string = `x ${manager.gameScore.lingzhiNum}`;
      this._lingzhiList.active = false;
      this._lingzhiNum.active = true;
    } else {
      if (manager.gameScore.lingzhiNum > 0) {
        resources.load(
          `lingzhi/spriteFrame`,
          SpriteFrame,
          (err, spriteFrame) => {
            for (let index = 0; index < manager.gameScore.lingzhiNum; index++) {
              this._lingzhiList.children[index].getComponent(
                Sprite
              ).spriteFrame = spriteFrame;
            }
          }
        );
      }
      this._lingzhiList.active = true;
      this._lingzhiNum.active = false;
    }
  }
}
