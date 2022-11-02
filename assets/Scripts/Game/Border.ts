import { _decorator, Component, Node, BoxCollider, ITriggerEvent } from "cc";
import { ColliderGroup } from "../../Constants/Collider";
const { ccclass, property } = _decorator;

@ccclass("Border")
export class Border extends Component {
  start() {
    const collider = this.node.getComponent(BoxCollider);
    collider.on("onTriggerEnter", this.onTriggerEnter, this);
  }

  update(deltaTime: number) {}

  onTriggerEnter(e: ITriggerEvent) {
    if (e.otherCollider.getGroup() == ColliderGroup.GRAASS) {
      e.otherCollider.node.destroy();
    }
  }
}
