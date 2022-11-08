import { assetManager } from "cc";

let instance;

/**
 * 单例全局状态管理器
 */
export default class DataBus {
  public resourcesBundle = null;
  public scenesBundle = null;

  constructor() {
    if (instance) return instance;

    instance = this;
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
