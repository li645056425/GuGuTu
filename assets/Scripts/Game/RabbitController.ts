import {
  _decorator,
  Component,
  Vec3,
  input,
  Input,
  EventMouse,
  Animation,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("RabbitController")
export class RabbitController extends Component {
  @property({ displayName: "每秒移动距离", type: Number, step: 1 })
  public moveSpeed;
  @property({ displayName: "路宽", type: Number, step: 1 })
  public roadWidth;
  @property({ type: Animation })
  public animation: Animation | null = null;

  // 是否接收到跳跃指令
  private _startJump: boolean = false;
  // 是否可以跳跃
  private _canJump: boolean = false;
  // 当前跳跃时间
  private _curJumpTime: number = 0;
  // 每次跳跃时长
  private _jumpTime: number = 0.1;
  // 当前跳跃速度
  private _curJumpSpeed: number = 0;
  // 当前角色位置
  private _curPos: Vec3 = new Vec3();
  // 每次跳跃过程中，当前帧移动位置差
  private _deltaPos: Vec3 = new Vec3(0, 0, 0);
  // 角色目标位置
  private _targetPos: Vec3 = new Vec3();

  start() {
    console.log("RabbitController start");
    this._curPos = this.node.getPosition();
    this.setInputActive(true);
  }

  update(deltaTime: number) {
    /* 向前移动 */
    this._curPos.y += (this.moveSpeed / 1000) * deltaTime;
    this.node.setPosition(this._curPos);
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
        this._deltaPos.x = this._curJumpSpeed * deltaTime;
        Vec3.add(this._curPos, this._curPos, this._deltaPos);
        this.node.setPosition(this._curPos);
      }
    }
  }

  setInputActive(active: boolean) {
    if (active) {
      input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
      input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
    } else {
      input.off(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
      input.off(Input.EventType.MOUSE_UP, this.onMouseUp, this);
    }
  }

  onMouseMove(e: EventMouse) {
    // x轴跳跃
    if (!this._startJump && this._canJump) {
      if (e.getUIDeltaX() > this.roadWidth / 2) {
        this.jumpTo(this.roadWidth);
      } else if (e.getUIDeltaX() < -this.roadWidth / 2) {
        this.jumpTo(-this.roadWidth);
      }
    }
  }

  onMouseUp(e: EventMouse) {
    this._canJump = true;
  }

  jumpTo(step) {
    this._startJump = true;
    this._canJump = false;
    this._curJumpTime = 0;
    this._curJumpSpeed = step / this._jumpTime;
    this.node.getPosition(this._curPos);
    Vec3.add(this._targetPos, this._curPos, new Vec3(0, step, 0));
    if (this.animation) {
      this.animation.play("Jump");
    }
  }
}
