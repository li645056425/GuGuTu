import {
  _decorator,
  Component,
  Node,
  Label,
  Animation,
  director,
  assetManager,
} from "cc";
import { GameOverResult, GameStatus } from "./Constants/GameStatus";
import { BasketList } from "./Game/BasketList";
import { Rabbit } from "./Game/Rabbit";
import { ResultDialog } from "./Game/ResultDialog";
import { Road } from "./Game/Road";
import { Scoreboard } from "./Game/Scoreboard";

let instance;

/**
 * 单例全局状态管理器
 */
export default class DataBus {
  /* 环境 */
  public wx = (window as any).wx;
  public db = null;

  public resourcesBundle = null;
  public scenesBundle = null;
  public allLoaded = false;

  public bgm = null;
  public bgmAudioSource = null;

  public roadWidth = 125;
  public roadNum = 3;
  public gameScore = {
    scoreNum: 0,
    lingzhiNum: 0,
    duration: 0,
  };
  public startTime = Date.now();
  public highestScore = 0;
  public gameStatus = GameStatus.Unstarted;
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

    if (this.wx) {
      /* 云开发初始化 */
      this.wx.cloud.init({
        env: "cloud1-2grx9roq71df4f92",
      });
      this.db = this.wx.cloud.database();
      this.wx.cloud.callFunction({ name: "get_share_info" }).then((res) => {
        this.shareInfo = res.result;
      });
    }
  }

  startGame() {
    this.roads = [];
    this.gameScore = {
      scoreNum: 0,
      lingzhiNum: 0,
      duration: 0,
    };
    this.relifeTime = 1;
    this.roadWidth = 75;
    this.roadNum = 5;
    director.loadScene("Game-5", () => {
      console.log("Success to load Game scene");
      this.gameStatus = GameStatus.Playing;
      this.startTime = Date.now();
    });
  }

  learnLeason() {
    director.loadScene("Leason", () => {
      console.log("Success to load Leason scene");
      this.gameStatus = GameStatus.Learning;
    });
  }

  pauseGame() {
    console.log("pause");
    this.gameScore.duration += Date.now() - this.startTime;
    this.gameStatus = GameStatus.Paused;
    this.pauseGameSprites();
  }

  pauseGameSprites() {
    this.rabbit.setInputActive(false);
    this.roads.forEach((road) => {
      road.paused = true;
    });
  }

  continueGame() {
    console.log("continue");
    this.gameStatus = GameStatus.Playing;
    this.continueGameSprites();
    this.startTime = Date.now();
  }

  continueGameSprites() {
    this.rabbit.setInputActive(true);
    this.roads.forEach((road) => {
      road.paused = false;
    });
  }

  overGame(result: GameOverResult) {
    console.log("over", result);
    this.pauseGameSprites();
    this.gameScore.duration += Date.now() - this.startTime;
    this.gameStatus = GameStatus.Over;
    this.gameOverResult = result;
    this.resultDialog.show();
    this.wx?.cloud.callFunction({
      name: "add_score",
      data: this.gameScore,
    });
  }

  backHome() {
    director.loadScene("Home", () => {
      console.log("Success to load Home scene");
      this.gameStatus = GameStatus.Unstarted;
      this.gameOverResult = GameOverResult.Notover;
    });
  }

  /* 复活，保留灵芝数，清空篮子 */
  relifeGame() {
    console.log("relife");
    this.basketList.reset();
    this.gameStatus = GameStatus.Playing;
    this.gameOverResult = GameOverResult.Notover;
    this.resultDialog.hide();
    this.continueGameSprites();
    this.startTime = Date.now();
  }

  loadBundles() {
    return new Promise((resolve, reject) => {
      const checkAllLoaded = () => {
        if (bundlesLoadedNum == 2) {
          resolve(true);
        }
      };
      let bundlesLoadedNum = 0;
      assetManager.loadBundle("Scenes", (err, bundle) => {
        this.scenesBundle = bundle;
        bundlesLoadedNum++;
        checkAllLoaded();
      });
      assetManager.loadBundle("ResourcesDefault", (err, bundle) => {
        this.resourcesBundle = bundle;
        bundlesLoadedNum++;
        checkAllLoaded();
      });
    });
  }
}
