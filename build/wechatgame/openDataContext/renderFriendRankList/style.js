const sharedCanvas = wx.getSharedCanvas();
const canvasWidth = sharedCanvas.width;
const canvasHeight = sharedCanvas.height;

const rowWidth = canvasWidth;
const rowHeight = canvasHeight * 0.1;
const imgSize = rowHeight * 0.5;
const fontSize = canvasWidth / 14;

module.exports = {
  list: {
    width: canvasWidth,
    height: canvasHeight,
  },

  listItem: {
    width: rowWidth,
    height: rowHeight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  grayBg: {
    backgroundColor: "#f0f0f0",
  },

  listItemUser: {
    height: rowHeight,
    flexDirection: "row",
    alignItems: "center",
  },

  listItemAvatar: {
    width: imgSize,
    height: imgSize,
    borderRadius: imgSize * 0.5,
  },

  listItemName: {
    width: fontSize * 4,
    height: rowHeight,
    fontSize,
    lineHeight: rowHeight,
    textOverflow: "ellipsis",
    marginLeft: fontSize * 0.5,
  },

  listItemLingzhi: {
    height: rowHeight,
    flexDirection: "row",
    alignItems: "center",
  },

  listItemLingzhiImg: {
    width: imgSize,
    height: imgSize / 1.5,
  },

  listItemLingzhiNum: {
    width: fontSize * 2,
    height: rowHeight,
    fontSize,
    lineHeight: rowHeight,
  },

  listItemScore: {
    height: rowHeight,
    flexDirection: "row",
    alignItems: "center",
  },

  listItemScoreImg: {
    width: imgSize,
    height: imgSize / 1.5,
  },

  listItemScoreNum: {
    width: fontSize * 3,
    height: rowHeight,
    fontSize,
    lineHeight: rowHeight,
  },
};
