const Layout = require("./engine").default;

const __env = GameGlobal.wx || GameGlobal.tt || GameGlobal.swan;
const sharedCanvas = __env.getSharedCanvas();
const sharedContext = sharedCanvas.getContext("2d");

function draw({ template, style }) {
  Layout.clear();
  Layout.init(template, style);
  Layout.layout(sharedContext);
}

function getScoreWeight({ lingzhiNum, scoreNum, duration }) {
  return lingzhiNum * 1000 + scoreNum + 60000 / duration;
}

function getScore(kvDataList) {
  const scoreData = kvDataList.find((item) => item.key == "highestScore");
  const duration = +scoreData?.value.split("_")[1] || 0;
  const scoreNum = +scoreData?.value.split("_")[2] || 0;
  const lingzhiNum = +scoreData?.value.split("_")[3] || 0;
  return {
    duration,
    scoreNum,
    lingzhiNum,
    scoreWeight: getScoreWeight({ lingzhiNum, scoreNum, duration }),
  };
}

function updateHighestScore(score) {
  wx.getUserCloudStorage({
    keyList: ["highestScore"],
    success: (res) => {
      console.log("getUserCloudStorage", res);
      const highestScore = getScore(res.KVDataList);
      if (highestScore.scoreWeight < getScoreWeight(score)) {
        setHighestScore(score);
      }
    },
    fail: (err) => {
      console.error("getUserCloudStorage", err);
    },
  });
}

function setHighestScore(score) {
  wx.setUserCloudStorage({
    KVDataList: [
      {
        key: "highestScore",
        value: `${Date.now()}_${score.duration}_${score.scoreNum}_${
          score.lingzhiNum
        }`,
      },
    ],
    success: (res) => {
      console.log("setUserCloudStorage", res);
    },
    fail: (err) => {
      console.error("setUserCloudStorage", err);
    },
  });
}

exports.draw = draw;
exports.getScore = getScore;
exports.updateHighestScore = updateHighestScore;
exports.setHighestScore = setHighestScore;
