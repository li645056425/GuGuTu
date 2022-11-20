const Layout = require("./engine").default;

const __env = GameGlobal.wx || GameGlobal.tt || GameGlobal.swan;
const sharedCanvas = __env.getSharedCanvas();
const sharedContext = sharedCanvas.getContext("2d");

exports.draw = function ({ template, style }) {
  Layout.clear();
  Layout.init(template, style);
  Layout.layout(sharedContext);
};
