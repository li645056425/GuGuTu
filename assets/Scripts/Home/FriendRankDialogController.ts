import {
  _decorator,
  Component,
  Node,
  Graphics,
  UITransform,
  CCObject,
  Animation,
  AnimationComponent,
  __private,
  view,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

const env = window.wx || window.tt || window.swan;

@ccclass("FriendRankDialogController")
export class FriendRankDialogController extends Component {
  @property({ type: Node })
  public borderNode = null;
  @property({ type: Node })
  public titleNode = null;
  @property({ type: Node })
  public listNode = null;

  private _animation: Animation = null;
  private _listTransform: UITransform = null;
  private _listPos = new Vec3();

  start() {
    this.node.active = false;
    this._animation = this.node.getComponent(Animation);
    this._listTransform = this.listNode.getComponent(UITransform);
    this.drawBorder();
    this.drawTitle();
  }

  update(deltaTime: number) {}

  showDialog() {
    this.node.active = true;
    this._animation.play("Show");
    this._animation.once("stop", () => {
      if (env) {
        console.log("postMessage renderFriendRankList");
        this.listNode.getPosition(this._listPos);
        env.getOpenDataContext().postMessage({
          type: "renderFriendRankList",
          viewport: {
            x: this._listPos.x,
            y: this._listPos.y,
            width: this._listTransform.width,
            height: this._listTransform.height,
          },
        });
      }
    });
  }

  hideDialog() {
    this._animation.play("Hide");
    this._animation.once("stop", () => {
      this.node.active = false;
    });
  }

  drawBorder() {
    const graphics = this.borderNode.getComponent(Graphics);
    const transform = this.borderNode.getComponent(UITransform);
    graphics.roundRect(
      -transform.width / 2,
      -transform.height / 2,
      transform.width,
      transform.height,
      20
    );
    graphics.stroke();
    graphics.fill();
  }

  drawTitle() {
    const graphics = this.titleNode.getComponent(Graphics);
    const transform = this.titleNode.getComponent(UITransform);

    graphics.roundRect(
      -transform.width / 2,
      -transform.height / 2,
      transform.width,
      transform.height,
      16
    );
    graphics.stroke();
    graphics.fill();
  }

  onFriendRankCloseButtonClicked() {
    console.log("onFriendRankCloseButtonClicked");
    this.hideDialog();
  }
}
