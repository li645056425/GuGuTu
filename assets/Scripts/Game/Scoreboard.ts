import {
  _decorator,
  Component,
  Node,
  Label,
  resources,
  SpriteFrame,
  Sprite,
} from "cc";
import DataBus from "../DataBus";
const { ccclass, property } = _decorator;

const dataBus = new DataBus();

@ccclass("Scoreboard")
export class Scoreboard extends Component {
  private _lingzhiList: Node = null;
  private _lingzhiNum: Node = null;

  start() {
    dataBus.scoreboard = this;
    this._lingzhiList = this.node.getChildByName("LingzhiList");
    this._lingzhiNum = this.node.getChildByName("LingzhiNum");
    this._lingzhiNum.active = false;
  }

  update(deltaTime: number) {}

  refresh() {
    if (dataBus.gameScore.lingzhiNum > 7) {
      this._lingzhiNum
        .getChildByName("Num")
        .getComponent(Label).string = `x ${dataBus.gameScore.lingzhiNum}`;
      this._lingzhiList.active = false;
      this._lingzhiNum.active = true;
    } else {
      if (dataBus.gameScore.lingzhiNum > 0) {
        dataBus.resourcesBundle.load(
          `lingzhi/spriteFrame`,
          SpriteFrame,
          (err, spriteFrame) => {
            for (let index = 0; index < dataBus.gameScore.lingzhiNum; index++) {
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
