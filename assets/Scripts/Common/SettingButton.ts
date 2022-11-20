import { SettingDialog } from "./SettingDialog";
import { _decorator, Component, Node } from "cc";
import DataBus from "../DataBus";
import { GameStatus } from "../Constants/GameStatus";
const { ccclass, property } = _decorator;

const dataBus = new DataBus();

@ccclass("SettingButton")
export class SettingButton extends Component {
  @property({ type: SettingDialog })
  public settingDialog: SettingDialog = null;

  start() {}

  update(deltaTime: number) {}

  onClicked() {
    if (dataBus.gameStatus == GameStatus.Playing) {
      dataBus.pauseGame();
    }
    this.settingDialog?.show();
  }
}
