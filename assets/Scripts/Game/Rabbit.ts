import {
  _decorator,
  Component,
  Vec3,
  input,
  Input,
  EventMouse,
  Animation,
  EventTouch,
  view,
  Mesh,
  MeshRenderer,
  BoxCollider,
  ITriggerEvent,
  find,
  Node,
} from "cc";
import { ColliderGroup } from "../Constants/Collider";
import { GameOverResult } from "../Constants/GameStatus";
import Manager from "./Manager";
const { ccclass, property } = _decorator;

const manager = new Manager();
const visibleSize = view.getVisibleSize();

@ccclass("Rabbit")
export class Rabbit extends Component {
  @property({ displayName: "路宽", type: Number, step: 1 })
  public roadWidth;
  @property({ type: Animation })
  public animation: Animation | null = null;

  private _touchStartX;

  // 是否接收到跳跃指令
  private _startJump: boolean = false;
  // 是否可以跳跃
  private _canJump: boolean = true;
  // 当前跳跃时间
  private _curJumpTime: number = 0;
  // 每次跳跃时长
  private _jumpTime: number = 0.15;
  // 当前跳跃速度
  private _curJumpSpeed: number = 0;
  // 当前角色位置
  private _curPos: Vec3 = new Vec3();
  // 角色目标位置
  private _targetPos: Vec3 = new Vec3();

  start() {
    manager.rabbit = this;
    this.node.getPosition(this._curPos);
    this.setInputActive(true);
    this.setColliderActive(true);
  }

  update(deltaTime: number) {
    /* 左右跳动 */
    if (this._startJump) {
      this._curJumpTime += deltaTime;
      if (this._curJumpTime > this._jumpTime) {
        // end
        this.node.setPosition(this._targetPos);
        this._startJump = false;
      } else {
        // tween
        this.node.getPosition(this._curPos);
        this._curPos.x += this._curJumpSpeed * deltaTime;
        this.node.setPosition(this._curPos);
      }
    }
  }

  setInputActive(active: boolean) {
    if (active) {
      input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
      input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
      input.on(Input.EventType.TOUCH_END, this.onTouchUp, this);
    } else {
      input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
      input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
      input.off(Input.EventType.TOUCH_END, this.onTouchUp, this);
    }
  }

  setColliderActive(active: boolean) {
    const collider = this.node.getComponent(BoxCollider);
    if (active) {
      collider.on("onTriggerEnter", this.onTriggerEnter, this);
    } else {
      collider.off("onTriggerEnter", this.onTriggerEnter, this);
    }
  }

  onTouchStart(e: EventTouch) {
    this._touchStartX = e.getLocationX();
  }

  onTouchMove(e: EventTouch) {
    // x轴跳跃
    if (!this._startJump && this._canJump) {
      const deltaX = e.getLocationX() - this._touchStartX;
      if (deltaX > visibleSize.width / 10) {
        this.jump(this.roadWidth);
      } else if (deltaX < -visibleSize.width / 10) {
        this.jump(-this.roadWidth);
      }
    }
  }

  onTouchUp(e: EventTouch) {
    this._canJump = true;
  }

  onTriggerEnter(e: ITriggerEvent) {
    if (e.otherCollider.getGroup() == ColliderGroup.Mushroom) {
      const mushroom = (<any>e.otherCollider.node).mushroom;
      // jiafen
      e.otherCollider.node.destroy();

      if (mushroom.isPoison) {
        manager.gameOver(GameOverResult.Poisoned);
      } else {
        manager.basketList
          .refresh(mushroom.level)
          .then(({ lingzhiPlus }) => {
            if (mushroom.isLingzhi) {
              manager.gameScore.lingzhiNum++;
            }
            if (lingzhiPlus) {
              manager.gameScore.lingzhiNum++;
            }
            manager.gameScore.scoreNum++;
            manager.scoreboard.refresh();
          })
          .catch((err) => {
            console.error(err);
            if (err == "Fulled") {
              manager.gameOver(GameOverResult.Fulled);
            }
          });
      }
    }
  }

  jump(step) {
    this.node.getPosition(this._targetPos);
    if (this._targetPos.x <= -this.roadWidth * 2 && step < 0) {
      return;
    }
    if (this._targetPos.x >= this.roadWidth * 2 && step > 0) {
      return;
    }
    console.log("jumpTo", step);
    this._startJump = true;
    this._canJump = false;
    this._curJumpTime = 0;
    this._curJumpSpeed = step / this._jumpTime;
    this._targetPos.x += step;
    if (this.animation) {
      this.animation.play("Jump");
    }
  }
}
