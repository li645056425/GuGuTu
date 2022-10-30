module.exports = function () {
  const sharedCanvas = wx.getSharedCanvas();
  const canvasWidth = sharedCanvas.width;
  const canvasHeight = sharedCanvas.height;

  const dialogWidth = canvasWidth * 0.8;
  const dialogHeight = canvasWidth * 1.5;
  const titleWidth = dialogWidth * 0.5;
  const titleHeight = titleWidth * 0.3;
  const listWidth = dialogWidth - 20;
  const listWHeight = dialogHeight - titleHeight / 2;
  const rowWidth = listWidth;
  const rowHeight = rowWidth * 0.2;
  const rowNoWidth = rowHeight * 0.7;
  const rowWrapWidth = rowWidth - rowNoWidth * 1.2;
  const imgSize = rowHeight * 0.5;
  const fontSize = rowWidth * 0.05;

  return {
    container: {
      width: canvasWidth,
      height: canvasHeight,
      alignItems: "center",
      justifyContent: "center",
    },

    dialog: {
      position: "relative",
      width: dialogWidth,
      height: dialogHeight,
      borderWidth: 5,
      borderColor: "#000000",
      borderRadius: dialogWidth * 0.1,
      paddingLeft: 10,
      paddingRgiht: 10,
      paddingTop: titleHeight / 2,
    },

    title: {
      position: "absolute",
      width: titleWidth,
      height: titleHeight,
      left: (dialogWidth - titleWidth) / 2,
      top: -titleHeight / 2,
    },

    close: {
      position: "absolute",
      width: titleHeight,
      height: titleHeight,
      right: -titleHeight / 2,
      top: -titleHeight / 2,
    },

    list: {
      width: listWidth,
      height: listWHeight,
    },

    listItem: {
      width: rowWidth,
      height: rowHeight,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: rowHeight * 0.2,
    },

    listItemNo: {
      width: rowNoWidth,
      height: rowNoWidth,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f0f0f0",
      borderRadius: rowNoWidth * 0.5,
    },

    listItemNo0: {
      backgroundColor: "#FFB83A",
    },

    listItemNo1: {
      backgroundColor: "#88d0ff",
    },

    listItemNo2: {
      backgroundColor: "#bbbbbb",
    },

    listItemNoNum: {
      width: rowNoWidth,
      height: rowNoWidth,
      fontSize,
      lineHeight: rowNoWidth,
      textAlign: "center",
    },

    listItemWrap: {
      width: rowWrapWidth,
      height: rowHeight,
      paddingLeft: imgSize * 0.3,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: rowHeight * 0.3,
      backgroundColor: "#f0f0f0",
    },

    listItemWrap0: {
      backgroundColor: "#FFB83A",
    },

    listItemWrap1: {
      backgroundColor: "#88d0ff",
    },

    listItemWrap2: {
      backgroundColor: "#bbbbbb",
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
      marginLeft: fontSize * 0.3,
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
};
