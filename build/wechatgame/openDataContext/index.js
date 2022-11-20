const Layout = require("./engine").default;
const renderFriendRankList = require("./render/friendRankList/index");

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
    renderFriendRankList();
  }
});
