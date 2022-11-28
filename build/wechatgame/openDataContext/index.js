const Layout = require("./engine").default;
const renderFriendRankList = require("./render/friendRankList/index");
const { updateHighestScore, setHighestScore } = require("./util");

let __env = GameGlobal.wx || GameGlobal.tt || GameGlobal.swan;

Layout.loadImgs([
  "openDataContext/render/friendRankList/lingzhi.png",
  "openDataContext/render/friendRankList/mushroom.png",
]);

__env.onMessage((data) => {
  console.log("onMessage", data);
  if (data.type === "engine" && data.event === "viewport") {
    Layout.updateViewPort({
      x: data.x,
      y: data.y,
      width: data.width,
      height: data.height,
    });
  } else if (data.type === "renderFriendRankList") {
    /* 渲染好友圈排行榜数据 */
    renderFriendRankList();
  } else if (data.type === "updateHighestScore") {
    /* 更新设置用户托管最高分 */
    updateHighestScore(data.score);
  } else if (data.type === "setHighestScore") {
    /* 直接设置用户托管最高分 */
    setHighestScore(data.score);
  }
});
