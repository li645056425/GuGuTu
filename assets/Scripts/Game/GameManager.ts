import {
  _decorator,
  Component,
  Prefab,
  instantiate,
  Node,
  CCInteger,
  Vec3,
} from "cc";
import { RabbitController } from "./RabbitController";
const { ccclass, property } = _decorator;

// 赛道格子类型，坑（BT_NONE）或者实路（BT_STONE）
enum BlockType {
  BT_NONE,
  BT_STONE,
}

@ccclass("GameManager")
export class GameManager extends Component {
  @property({ type: RabbitController })
  public rabbitCtrl: RabbitController | null = null;
  // 赛道预制
  @property({ type: Prefab })
  public cubePrfb: Prefab | null = null;
  // 赛道长度
  @property
  public roadLength = 50;
  private _road: BlockType[] = [];

  start() {
    console.log("GameManager start");
    this.generateRoad();
    // 禁止接收用户操作人物移动指令
    this.rabbitCtrl.setInputActive(true);
    // 重置人物位置
    this.rabbitCtrl.node.setPosition(Vec3.ZERO);
  }

  generateRoad() {
    // 防止游戏重新开始时，赛道还是旧的赛道
    // 因此，需要移除旧赛道，清除旧赛道数据
    this.node.removeAllChildren();
    this._road = [];
    // 确保游戏运行时，人物一定站在实路上
    this._road.push(BlockType.BT_STONE);

    // 确定好每一格赛道类型
    for (let i = 1; i < this.roadLength; i++) {
      // 如果上一格赛道是坑，那么这一格一定不能为坑
      if (this._road[i - 1] === BlockType.BT_NONE) {
        this._road.push(BlockType.BT_STONE);
      } else {
        this._road.push(Math.floor(Math.random() * 2));
      }
    }

    // 根据赛道类型生成赛道
    for (let j = 0; j < this._road.length; j++) {
      let block: Node = this.spawnBlockByType(this._road[j]);
      // 判断是否生成了道路，因为 spawnBlockByType 有可能返回坑（值为 null）
      if (block) {
        this.node.addChild(block);
        block.setPosition(0, -1.5 * (j + 1), 0);
      }
    }
  }

  spawnBlockByType(type: BlockType) {
    if (!this.cubePrfb) {
      return null;
    }

    let block: Node | null = null;
    // 赛道类型为实路才生成
    switch (type) {
      case BlockType.BT_STONE:
        block = instantiate(this.cubePrfb);
        break;
    }

    return block;
  }

  // update (deltaTime: number) {
  //     // Your update function goes here.
  // }
}
