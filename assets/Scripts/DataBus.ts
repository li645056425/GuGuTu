let instance;

/**
 * 单例全局状态管理器
 */
export default class DataBus {
  private _gameScore = null;

  public userInfoButton = null

  constructor() {
    if (instance) return instance;

    instance = this;

    // 环境信息
    // const { miniProgram } = wx.getAccountInfoSync();
    // this.envVersion = miniProgram.envVersion; //develop、trial、release
    // this.envDevelop = this.envVersion == "develop";
    // this.envDevelop = false;
    // 通用分享信息
    // this.shareInfo = {
    //   title: "红伞伞白杆杆，不要让小兔子躺板板~",
    //   imageUrl: "images/share.png",
    // };
    // // 游戏状态
    // this.highestScore = null;
    // this.userInfo = null;
    this.reset();
  }

  reset() {}
}
