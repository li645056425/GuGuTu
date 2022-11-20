import {
  _decorator,
  Component,
  Node,
  Animation,
  Label,
  director,
  UIOpacity,
  Vec3,
} from "cc";
import { GameOverResult } from "../Constants/GameStatus";
import DataBus from "../DataBus";
import { hideDialog, showDialog } from "../Utils/Common";

const { ccclass, property } = _decorator;

const dataBus = new DataBus();
const wx = (window as any).wx;

@ccclass("ResultDialog")
export class ResultDialog extends Component {
  start() {
    dataBus.resultDialog = this;
    this.node.active = false;
  }

  update(deltaTime: number) {}

  show() {
    this.refreshTitle();
    this.refreshScore();
    this.refreshLingzhi();
    this.refreshDuration();
    this.refreshRelifeButton();
    showDialog(this.node);
  }

  hide() {
    hideDialog(this.node);
  }

  refreshTitle() {
    this.node.getChildByPath("Content/Title").getComponent(Label).string =
      dataBus.gameOverResult == GameOverResult.Poisoned
        ? "兔兔被毒了！"
        : dataBus.gameOverResult == GameOverResult.Fulled
        ? "兔兔吃撑了！"
        : "兔兔失败了！";
  }

  refreshScore() {
    this.node
      .getChildByPath("Content/Score/Num")
      .getComponent(Label).string = `x ${dataBus.gameScore.scoreNum}`;
  }

  refreshLingzhi() {
    this.node
      .getChildByPath("Content/Lingzhi/Num")
      .getComponent(Label).string = `x ${dataBus.gameScore.lingzhiNum}`;
  }

  refreshDuration() {
    this.node
      .getChildByPath("Content/Duration/Num")
      .getComponent(Label).string = `${dataBus.gameScore.duration / 1000} s`;
  }

  refreshRelifeButton() {
    this.node
      .getChildByPath("Content/RelifetButton/Label")
      .getComponent(Label).string = `复活 x ${dataBus.relifeTime}`;
    this.node
      .getChildByPath("Content/RelifetButton")
      .getComponent(UIOpacity).opacity =
      255 * (dataBus.relifeTime <= 0 ? 0.5 : 1);
  }

  restartClicked() {
    dataBus.restart();
  }

  relifeClicked() {
    if (dataBus.relifeTime > 0) {
      if (wx) {
        wx.showLoading({
          title: "分享中...",
        });
        wx.shareAppMessage({
          ...dataBus.shareInfo,
        });
        const shareFinished = () => {
          console.log("shareFinished");
          wx.offShow(shareFinished);
          dataBus.relifeTime--;
          this.refreshRelifeButton();
          wx.showToast({
            title: "分享成功，即将为您保留分数 & 清空篮子并复活",
            icon: "none",
            mask: true,
            duration: 3000,
          });
          setTimeout(() => {
            dataBus.relife();
          }, 3000);
        };
        wx.onShow(shareFinished);
      } else {
        dataBus.relifeTime--;
        this.refreshRelifeButton();
        dataBus.relife();
      }
    }
  }
}
