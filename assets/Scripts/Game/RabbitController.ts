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
  /* class member could be defined like this */
  // dummy = '';

  /* use `property` decorator if your want the member to be serializable */
  // @property
  // serializableDummy = 0;

  //   @property({ type: Animation })
  //   public BodyAnim: Animation | null = null;

  // for fake tween
  // 是否接收到跳跃指令
  private _startJump: boolean = false;
  // 跳跃步长
  private _jumpStep: number = 0;
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
    // Your initialization goes here.
    console.log("PlayerController start");
  }

  setInputActive(active: boolean) {
    if (active) {
      input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
    } else {
      input.off(Input.EventType.MOUSE_UP, this.onMouseUp, this);
    }
  }

  onMouseUp(event: EventMouse) {
    this.jumpByStep(-1.5);
    // if (this.BodyAnim && event.getButton() == 2) {
    //   this.BodyAnim.play("JumpRight");
    // }
  }

  jumpByStep(step: number) {
    if (this._startJump) {
      return;
    }
    this._startJump = true;
    this._jumpStep = step;
    this._curJumpTime = 0;
    this._curJumpSpeed = this._jumpStep / this._jumpTime;
    this.node.getPosition(this._curPos);
    Vec3.add(this._targetPos, this._curPos, new Vec3(0, this._jumpStep, 0));
  }

  update(deltaTime: number) {
    if (this._startJump) {
      this._curJumpTime += deltaTime;
      if (this._curJumpTime > this._jumpTime) {
        // end
        this.node.setPosition(this._targetPos);
        this._startJump = false;
      } else {
        // tween
        this.node.getPosition(this._curPos);
        this._deltaPos.y = this._curJumpSpeed * deltaTime;
        Vec3.add(this._curPos, this._curPos, this._deltaPos);
        this.node.setPosition(this._curPos);
      }
    }
  }
}
