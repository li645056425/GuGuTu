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
import Manager from "./Manager";
const { ccclass, property } = _decorator;

const manager = new Manager();
const wx = (window as any).wx;

@ccclass("ResultDialog")
export class ResultDialog extends Component {
  start() {
    manager.resultDialog = this;
    this.node.active = false;
  }

  update(deltaTime: number) {}

  show() {
    this.refreshTitle();
    this.refreshScore();
    this.refreshLingzhi();
    this.refreshDuration();
    this.refreshRelifeButton();
    this.node.setScale(new Vec3(0, 0, 1));
    this.node.active = true;
    this.node.getComponent(Animation)?.play("Show");
  }

  hide() {
    this.node.getComponent(Animation)?.play("Hide");
    this.node.getComponent(Animation)?.once("stop", () => {
      this.node.active = false;
    });
  }

  refreshTitle() {
    this.node.getChildByPath("Title").getComponent(Label).string =
      manager.gameOverResult == GameOverResult.Poisoned
        ? "兔兔被毒了！"
        : "兔兔吃撑了！";
  }

  refreshScore() {
    this.node
      .getChildByPath("Score/Num")
      .getComponent(Label).string = `${manager.gameScore.scoreNum}`;
  }

  refreshLingzhi() {
    this.node
      .getChildByPath("Lingzhi/Num")
      .getComponent(Label).string = `${manager.gameScore.lingzhiNum}`;
  }

  refreshDuration() {
    this.node.getChildByPath("Duration/Num").getComponent(Label).string = `${
      manager.gameScore.duration / 1000
    }`;
  }

  refreshRelifeButton() {
    this.node
      .getChildByPath("RelifetButton/Label")
      .getComponent(Label).string = `复活 x ${manager.relifeTime}`;
    this.node.getChildByPath("RelifetButton").getComponent(UIOpacity).opacity =
      255 * (manager.relifeTime <= 0 ? 0.5 : 1);
  }

  restartClicked() {
    manager.restart();
  }

  relifeClicked() {
    if (manager.relifeTime > 0) {
      if (wx) {
        wx.showLoading({
          title: "分享中...",
        });
        wx.shareAppMessage({
          ...manager.shareInfo,
        });
        const shareFinished = () => {
          console.log("shareFinished");
          wx.offShow(shareFinished);
          manager.relifeTime--;
          this.refreshRelifeButton();
          wx.showToast({
            title: "分享成功，即将为您保留分数 & 清空篮子并复活",
            icon: "none",
            mask: true,
            duration: 3000,
          });
          setTimeout(() => {
            manager.relife();
          }, 3000);
        };
        wx.onShow(shareFinished);
      } else {
        manager.relifeTime--;
        this.refreshRelifeButton();
        manager.relife();
      }
    }
  }
}
