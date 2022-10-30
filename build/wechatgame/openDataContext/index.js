const getRenderFriendRankListStyle = require("./renderFriendRankList/style");
const {
  getTemplate: getRenderFriendRankListTemplate,
  getDataTemplate: getRenderFriendRankListDataTemplate,
} = require("./renderFriendRankList/template");
const Layout = require("./engine").default;

let __env = GameGlobal.wx || GameGlobal.tt || GameGlobal.swan;
let sharedCanvas = __env.getSharedCanvas();
let sharedContext = sharedCanvas.getContext("2d");

Layout.loadImgs([
  "openDataContext/renderFriendRankList/lingzhi.png",
  "openDataContext/renderFriendRankList/mushroom.png",
]);

function draw({ template, style }) {
  Layout.clear();
  Layout.init(template, style);
  Layout.layout(sharedContext);
}

function updateViewPort(data) {
  Layout.updateViewPort({
    x: data.x,
    y: data.y,
    width: data.width,
    height: data.height,
  });
}

__env.onMessage((data) => {
  console.log("onMessage", data);
  if (data.type === "engine" && data.event === "viewport") {
    updateViewPort(data);
  } else if (data.type === "renderFriendRankList") {
    const style = getRenderFriendRankListStyle();
    draw({
      template: getRenderFriendRankListTemplate(),
      style,
    });
    getRenderFriendRankListDataTemplate().then((template) => {
      draw({
        template,
        style,
      });
    });
  }
});
