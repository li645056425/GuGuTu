const { draw } = require("../../util");
const getStyle = require("./style");
const { getTemplate, getDataTemplate } = require("./template");

module.exports = function renderFriendRankList() {
  const style = getStyle();

  draw({
    template: getTemplate(),
    style,
  });
  getDataTemplate().then((template) => {
    draw({
      template,
      style,
    });
  });
};
