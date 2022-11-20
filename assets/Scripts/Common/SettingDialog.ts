import {
  _decorator,
  Component,
  Node,
  Animation,
  Toggle,
  AudioSource,
  sys,
} from "cc";
import { GameOverResult, GameStatus } from "../Constants/GameStatus";
import DataBus from "../DataBus";
import { hideDialog, showDialog } from "../Utils/Common";
const { ccclass, property } = _decorator;

const dataBus = new DataBus();

@ccclass("SettingDialog")
export class SettingDialog extends Component {
  start() {
    this.node.active = false;
  }

  update(deltaTime: number) {}
  show() {
    this.node
      .getChildByPath("Content/MusicToggle/Toggle")
      ?.getComponent(Toggle)
      ?.setIsCheckedWithoutNotify(dataBus.bgmAudioSource.playing);
    showDialog(this.node);
  }
  hide() {
    if (dataBus.gameStatus == GameStatus.Paused) {
      dataBus.continue();
    }
    hideDialog(this.node);
  }
  onMusicToggled(musicToggleNode: Node) {
    const isChecked = musicToggleNode.getComponent(Toggle).isChecked;
    if (isChecked) {
      dataBus.bgmAudioSource.play();
      sys.localStorage.removeItem("bgmPaused");
    } else {
      dataBus.bgmAudioSource.pause();
      sys.localStorage.setItem("bgmPaused", "1");
    }
  }
  onFinishClicked() {
    hideDialog(this.node);
    dataBus.gameOver(GameOverResult.Failed);
  }
}
