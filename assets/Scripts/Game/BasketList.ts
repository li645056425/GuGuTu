import {
  _decorator,
  Component,
  Node,
  resources,
  SpriteFrame,
  Sprite,
  UITransform,
} from "cc";
import { MushroomTypes } from "../../Constants/Mushroom";
import Manager from "./Manager";
const { ccclass, property } = _decorator;

const manager = new Manager();

@ccclass("BasketList")
export class BasketList extends Component {
  private _stashMushroomLevelNums = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  };
  private _lingzhiLevel = MushroomTypes.find((mushroom) => mushroom.isLingzhi)
    .level;

  start() {
    manager.basketList = this;
  }

  update(deltaTime: number) {}

  reset() {
    this._stashMushroomLevelNums = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
    };
    this.refresh();
  }

  refresh(newLevel?): Promise<{ lingzhiPlus }> {
    newLevel && this._stashMushroomLevelNums[newLevel]++;
    return new Promise((resolve, reject) => {
      let lingzhiPlus = false;
      const stashlevelEnums = Object.keys(this._stashMushroomLevelNums).sort(
        (l1: string, l2: string) => Number(l1) - Number(l2)
      );
      for (let level of stashlevelEnums) {
        if (this._stashMushroomLevelNums[+level] >= 3) {
          // 三个消除
          this._stashMushroomLevelNums[+level] -= 3;
          if (+level < this._lingzhiLevel) {
            this._stashMushroomLevelNums[+level + 1]++;
            if (+level + 1 == this._lingzhiLevel) {
              lingzhiPlus = true;
            }
          }
        }
      }
      const newStashLevels = [];
      for (let level of stashlevelEnums) {
        for (let i = 0; i < this._stashMushroomLevelNums[+level]; i++) {
          newStashLevels.push(level);
        }
      }
      newStashLevels.sort((l1, l2) => l2 - l1);
      if (newStashLevels.length > 7) {
        reject("Fulled");
      } else {
        for (let index = 0; index < 7; index++) {
          const level = newStashLevels[index];
          const stashItem = this.node.children[index];
          const stashItemSprite = stashItem.getComponent(Sprite);
          const stashItemSize = stashItem.getComponent(UITransform);
          if (level) {
            const spriteName = MushroomTypes.find(
              (mushroom) => mushroom.level == level
            ).spriteName;
            resources.load(
              `${spriteName}/spriteFrame`,
              SpriteFrame,
              (err, spriteFrame) => {
                stashItemSprite.spriteFrame = spriteFrame;
                stashItemSize.height = stashItemSize.width / 1.5;
              }
            );
          } else {
            resources.load(
              `basket/spriteFrame`,
              SpriteFrame,
              (err, spriteFrame) => {
                stashItemSprite.spriteFrame = spriteFrame;
                stashItemSize.height = stashItemSize.width;
              }
            );
          }
        }
        resolve({ lingzhiPlus });
      }
    });
  }
}
