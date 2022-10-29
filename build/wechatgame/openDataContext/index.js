const friendRankListStyle = require("./renderFriendRankList/style");
const getFriendRankListTemplate = require("./renderFriendRankList/template");
const Layout = require("./engine").default;

let __env = GameGlobal.wx || GameGlobal.tt || GameGlobal.swan;
let sharedCanvas = __env.getSharedCanvas();
let sharedContext = sharedCanvas.getContext("2d");
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

__env.onMessage(async (data) => {
  if (data.type === "engine" && data.event === "viewport") {
    updateViewPort(data);
  } else if (data.type == "renderFriendRankList") {
    draw({
      template: await getFriendRankListTemplate(),
      style: friendRankListStyle,
    });
  }
});
