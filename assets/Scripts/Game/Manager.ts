import { _decorator, Component, Node, Label, Animation, director } from "cc";
import { GameOverResult, GameStatus } from "../../Constants/GameStatus";
import { BasketList } from "./BasketList";
import { Rabbit } from "./Rabbit";
import { ResultDialog } from "./ResultDialog";
import { Road } from "./Road";
import { Scoreboard } from "./Scoreboard";

let instance;

export default class Manager {
  public gameScore = {
    scoreNum: 0,
    lingzhiNum: 0,
    duration: 0,
  };
  public gameStatus = GameStatus.Playing;
  public gameOverResult = GameOverResult.Notover;

  public relifeTime = 1;

  public rabbit: Rabbit = null;
  public basketList: BasketList = null;
  public scoreboard: Scoreboard = null;
  public roads: Road[] = [];
  public resultDialog: ResultDialog = null;

  public shareInfo = {
    title: "红伞伞白杆杆，不要让小兔子躺板板~",
    imageUrl: "images/share.png",
  };

  constructor() {
    if (instance) return instance;

    instance = this;
  }

  reset() {
    this.gameScore = {
      scoreNum: 0,
      lingzhiNum: 0,
      duration: 0,
    };
    this.gameStatus = GameStatus.Playing;
    this.gameOverResult = GameOverResult.Notover;
    this.relifeTime = 1;
    this.rabbit = null;
    this.basketList = null;
    this.scoreboard = null;
    this.roads = [];
    this.resultDialog = null;
  }

  pause() {
    console.log("pause");
    this.rabbit.setInputActive(false);
    this.roads.forEach((road) => {
      road.paused = true;
    });
  }

  continue() {
    console.log("continue");
    this.rabbit.setInputActive(true);
    this.roads.forEach((road) => {
      road.paused = false;
    });
  }

  gameOver(result: GameOverResult) {
    console.log("gameOver", result);
    this.gameStatus = GameStatus.Over;
    this.gameOverResult = result;
    this.resultDialog.show();
    this.pause();
  }
  restart() {
    this.reset();
    director.loadScene("Home", function () {
      console.log("Success to load Home scene");
    });
  }

  /* 复活，保留灵芝数，清空篮子 */
  relife() {
    console.log("relife");
    this.basketList.reset();
    this.gameStatus = GameStatus.Playing;
    this.gameOverResult = GameOverResult.Notover;
    this.resultDialog.hide();
    this.continue();
  }
}
